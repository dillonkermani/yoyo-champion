// Runs against the Firestore emulator: `pnpm --filter @yoyo/next test:rules`.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, setDoc, updateDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';

let env: RulesTestEnvironment;

const PLAYER = 'player-1';
const OTHER = 'player-2';
const ADMIN = 'admin-1';

const pending = (uid: string) => ({
  uid,
  name: 'Maya',
  rung: 0,
  slug: 'sleeper',
  status: 'pending',
  createdAt: serverTimestamp(),
});

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-yoyo-rules',
    firestore: {
      rules: readFileSync(resolve(__dirname, '../../../../config/firebase/firestore.rules'), 'utf8'),
    },
  });
});

afterAll(async () => {
  await env.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'admins', ADMIN), { name: 'Club Admin' });
    await setDoc(doc(ctx.firestore(), 'checkRequests', 'req-1'), { ...pending(PLAYER), createdAt: new Date() });
  });
});

const db = (uid?: string) =>
  uid ? env.authenticatedContext(uid).firestore() : env.unauthenticatedContext().firestore();

describe('check-off requests', () => {
  it('lets a player ask for their own check-off', async () => {
    await assertSucceeds(setDoc(doc(db(PLAYER), 'checkRequests', 'new'), pending(PLAYER)));
  });

  it('rejects a request created already approved', async () => {
    await assertFails(setDoc(doc(db(PLAYER), 'checkRequests', 'new'), { ...pending(PLAYER), status: 'approved' }));
  });

  it("rejects a request filed under someone else's uid", async () => {
    await assertFails(setDoc(doc(db(PLAYER), 'checkRequests', 'new'), pending(OTHER)));
  });

  it('rejects a signed-out request', async () => {
    await assertFails(setDoc(doc(db(), 'checkRequests', 'new'), pending(PLAYER)));
  });

  it('does not let a player approve their own request', async () => {
    await assertFails(updateDoc(doc(db(PLAYER), 'checkRequests', 'req-1'), { status: 'approved' }));
  });

  it('lets an admin approve a pending request', async () => {
    await assertSucceeds(
      updateDoc(doc(db(ADMIN), 'checkRequests', 'req-1'), {
        status: 'approved',
        decidedBy: ADMIN,
        decidedByName: 'Club Admin',
        decidedAt: serverTimestamp(),
      }),
    );
  });

  it('does not let an admin rewrite who asked', async () => {
    await assertFails(updateDoc(doc(db(ADMIN), 'checkRequests', 'req-1'), { status: 'approved', uid: OTHER }));
  });

  it('lets a player cancel their own pending request, not someone else', async () => {
    await assertFails(deleteDoc(doc(db(OTHER), 'checkRequests', 'req-1')));
    await assertSucceeds(deleteDoc(doc(db(PLAYER), 'checkRequests', 'req-1')));
  });

  it("hides a player's request from other players", async () => {
    await assertFails(getDoc(doc(db(OTHER), 'checkRequests', 'req-1')));
    await assertSucceeds(getDoc(doc(db(PLAYER), 'checkRequests', 'req-1')));
  });
});

describe('progress', () => {
  it('only admins can write ladder progress', async () => {
    await assertFails(setDoc(doc(db(PLAYER), 'progress', PLAYER), { approved: ['sleeper'] }));
    await assertSucceeds(setDoc(doc(db(ADMIN), 'progress', PLAYER), { approved: ['sleeper'] }));
  });

  it('a player can read their own progress but not another player', async () => {
    await assertSucceeds(getDoc(doc(db(PLAYER), 'progress', PLAYER)));
    await assertFails(getDoc(doc(db(PLAYER), 'progress', OTHER)));
  });
});

describe('admins', () => {
  it('nobody can make themselves an admin', async () => {
    await assertFails(setDoc(doc(db(PLAYER), 'admins', PLAYER), { name: 'me' }));
  });
});

describe('players', () => {
  const profile = { name: 'Maya', email: 'parent@example.com', emailIsParent: true, newsletter: true, createdAt: new Date() };

  it('a player can save their own profile', async () => {
    await assertSucceeds(setDoc(doc(db(PLAYER), 'players', PLAYER), profile));
  });

  it("a player cannot write another player's profile", async () => {
    await assertFails(setDoc(doc(db(PLAYER), 'players', OTHER), profile));
  });

  it('rejects a malformed email', async () => {
    await assertFails(setDoc(doc(db(PLAYER), 'players', PLAYER), { ...profile, email: 'not-an-email' }));
  });
});
