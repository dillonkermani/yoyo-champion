"use client";

import { useEffect, useRef, useState } from "react";
import type { User } from "firebase/auth";
import { TRICK_LADDER } from "@yoyo/data";
import {
  watchAuth,
  adminSignIn,
  adminSignOut,
  isAdmin,
  watchPendingQueue,
  decide,
  type CheckRequest,
} from "@/lib/learn/ladder-client";

const TIPS = ["Throw harder and straighter", "Needs more spin", "Tug more gently", "Watch the video again"];

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(
    () =>
      watchAuth((u) => {
        setUser(u);
        setAdmin(null);
        if (u && !u.isAnonymous) isAdmin(u.uid).then(setAdmin).catch(() => setAdmin(false));
      }),
    [],
  );

  if (user === undefined) return <p className="m-auto text-slate">Loading…</p>;

  if (!user || user.isAnonymous) {
    return (
      <div className="m-auto flex w-full flex-col gap-4 text-center">
        <h1 className="text-3xl font-extrabold">Club admin</h1>
        <p className="text-slate">Sign in to approve trick check-offs.</p>
        <button className="rounded-2xl bg-ink py-4 text-lg font-extrabold text-white" onClick={() => adminSignIn()}>
          Sign in with Google
        </button>
      </div>
    );
  }

  if (admin === null) return <p className="m-auto text-slate">Checking admin access…</p>;

  if (!admin) {
    return (
      <div className="m-auto flex w-full flex-col gap-3 text-center">
        <h1 className="text-2xl font-extrabold">Not an admin yet</h1>
        <p className="text-slate">
          Signed in as {user.email}. To make this account an admin, create a document in the Firebase console at{" "}
          <code className="rounded bg-sky px-1">admins/{user.uid}</code>.
        </p>
        <button className="text-sm underline" onClick={() => navigator.clipboard?.writeText(user.uid)}>Copy my user ID</button>
        <button className="text-sm text-slate underline" onClick={() => adminSignOut()}>Sign out</button>
      </div>
    );
  }

  return <Queue admin={user} />;
}

function Queue({ admin }: { admin: User }) {
  const [queue, setQueue] = useState<CheckRequest[]>([]);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const seen = useRef<Set<string> | null>(null);

  useEffect(
    () =>
      watchPendingQueue((reqs) => {
        const isNew = seen.current !== null && reqs.some((r) => !seen.current!.has(r.id));
        seen.current = new Set(reqs.map((r) => r.id));
        if (isNew) navigator.vibrate?.(200);
        setQueue(reqs);
      }),
    [],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Check-offs</h1>
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${queue.length ? "bg-red-100 text-red-700" : "bg-sky text-aqua-deep"}`}>
          {queue.length} waiting
        </span>
      </div>
      <p className="mb-4 text-sm text-slate">Signed in as {admin.displayName ?? admin.email}</p>

      {queue.length === 0 && <p className="m-auto text-center text-slate">No one is waiting. New requests show up here instantly.</p>}

      <ul className="flex flex-col gap-3">
        {queue.map((req) => (
          <li key={req.id} className="rounded-2xl border-2 border-line p-4">
            <p className="text-xl font-extrabold">{req.name}</p>
            <p className="text-slate">
              Trick {req.rung + 1}: {TRICK_LADDER[req.rung]?.name} · <Ago req={req} />
            </p>
            {rejecting === req.id ? (
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-sm font-bold">Send a tip:</p>
                {TIPS.map((tip) => (
                  <button
                    key={tip}
                    className="rounded-xl border-2 border-line py-2.5 font-bold"
                    onClick={() => decide(req, admin, false, tip).then(() => setRejecting(null))}
                  >
                    {tip}
                  </button>
                ))}
                <button className="text-sm text-slate underline" onClick={() => setRejecting(null)}>Back</button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-[1fr_1.4fr] gap-2">
                <button className="rounded-xl border-2 border-line py-3 font-bold" onClick={() => setRejecting(req.id)}>
                  Not yet
                </button>
                <button className="rounded-xl bg-green-500 py-3 font-extrabold text-white" onClick={() => decide(req, admin, true)}>
                  Approve
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="mt-auto pt-6 text-sm text-slate underline" onClick={() => adminSignOut()}>Sign out</button>
    </>
  );
}

function Ago({ req }: { req: CheckRequest }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 10_000);
    return () => clearInterval(t);
  }, []);
  const ms = req.createdAt ? Date.now() - req.createdAt.toMillis() : 0;
  const s = Math.max(0, Math.round(ms / 1000));
  return <>{s < 60 ? "just now" : `${Math.round(s / 60)} min ago`}</>;
}
