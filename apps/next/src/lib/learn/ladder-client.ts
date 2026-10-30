"use client";

import { app } from "@/lib/firebase";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  arrayUnion,
  type Timestamp,
} from "firebase/firestore";
import { TRICK_LADDER } from "@yoyo/data";

// The admin page runs on its own Firebase app so its Google sign-in never replaces the
// player's anonymous session when both are used in the same browser.
const adminApp = getApps().find((a) => a.name === "learn-admin") ?? initializeApp(app.options, "learn-admin");

export const auth = getAuth(app);
export const db = getFirestore(app);
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);

// Local end-to-end testing against `firebase emulators:start` (ports from firebase.json).
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "1") {
  for (const a of [auth, adminAuth]) connectAuthEmulator(a, "http://127.0.0.1:9287", { disableWarnings: true });
  for (const d of [db, adminDb]) connectFirestoreEmulator(d, "127.0.0.1", 8287);
  // Popups can't be driven by browser automation; lets local tests sign an admin in directly.
  if (typeof window !== "undefined") {
    (window as unknown as { __learnSignIn?: unknown }).__learnSignIn = (email: string, password: string) =>
      signInWithEmailAndPassword(adminAuth, email, password);
  }
}

export type RequestStatus = "pending" | "approved" | "rejected";

export interface CheckRequest {
  id: string;
  uid: string;
  name: string;
  rung: number;
  slug: string;
  status: RequestStatus;
  createdAt?: Timestamp | null;
  decidedByName?: string;
  tip?: string;
}

export interface PlayerProfile {
  name: string;
  email: string;
  emailIsParent: boolean;
  newsletter: boolean;
}

export const watchAdmin = (cb: (user: User | null) => void) => onAuthStateChanged(adminAuth, cb);

// Players never see a login: an anonymous account keeps their progress on this phone.
// Wait for the saved session first, or a refresh would start a brand-new player.
export async function ensurePlayer(): Promise<User> {
  await auth.authStateReady();
  if (auth.currentUser?.isAnonymous) return auth.currentUser;
  return (await signInAnonymously(auth)).user;
}

export const adminSignIn = () => signInWithPopup(adminAuth, new GoogleAuthProvider());
export const adminSignOut = () => signOut(adminAuth);

export const isAdmin = async (uid: string): Promise<boolean> =>
  (await getDoc(doc(adminDb, "admins", uid))).exists();

export function watchProgress(uid: string, cb: (approved: string[]) => void) {
  return onSnapshot(doc(db, "progress", uid), (snap) => cb((snap.data()?.["approved"] as string[]) ?? []));
}

export function watchProfile(uid: string, cb: (p: PlayerProfile | null) => void) {
  return onSnapshot(doc(db, "players", uid), (snap) => cb((snap.data() as PlayerProfile) ?? null));
}

export const saveProfile = (uid: string, p: PlayerProfile) =>
  setDoc(doc(db, "players", uid), { ...p, createdAt: serverTimestamp() });

const toRequest = (id: string, data: Record<string, unknown>) => ({ id, ...data }) as CheckRequest;
const newestFirst = (a: CheckRequest, b: CheckRequest) =>
  (b.createdAt?.toMillis() ?? Date.now()) - (a.createdAt?.toMillis() ?? Date.now());

export function watchMyRequests(uid: string, cb: (reqs: CheckRequest[]) => void) {
  return onSnapshot(query(collection(db, "checkRequests"), where("uid", "==", uid)), (snap) =>
    cb(snap.docs.map((d) => toRequest(d.id, d.data())).sort(newestFirst)),
  );
}

export async function requestCheck(uid: string, name: string, rung: number) {
  const r = TRICK_LADDER[rung];
  if (!r) throw new Error(`No ladder rung ${rung}`);
  await addDoc(collection(db, "checkRequests"), {
    uid,
    name,
    rung,
    slug: r.slug,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export const cancelRequest = (id: string) => deleteDoc(doc(db, "checkRequests", id));

export function watchPendingQueue(cb: (reqs: CheckRequest[]) => void) {
  return onSnapshot(query(collection(adminDb, "checkRequests"), where("status", "==", "pending")), (snap) =>
    cb(snap.docs.map((d) => toRequest(d.id, d.data())).sort((a, b) => -newestFirst(a, b))),
  );
}

export async function decide(req: CheckRequest, admin: User, approve: boolean, tip?: string) {
  const batch = writeBatch(adminDb);
  batch.update(doc(adminDb, "checkRequests", req.id), {
    status: approve ? "approved" : "rejected",
    decidedBy: admin.uid,
    decidedByName: admin.displayName ?? "Club admin",
    decidedAt: serverTimestamp(),
    ...(tip ? { tip } : {}),
  });
  if (approve) {
    batch.set(doc(adminDb, "progress", req.uid), { approved: arrayUnion(req.slug) }, { merge: true });
  }
  await batch.commit();
}
