"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { User } from "firebase/auth";
import {
  TRICK_LADDER,
  ladderReward,
  nextRungIndex,
  isLadderComplete,
  productUrl,
  formatMoney,
  shopifyImage,
  MIN_NEWSLETTER_AGE,
} from "@yoyo/data";
import {
  ensurePlayer,
  watchProgress,
  watchProfile,
  watchMyRequests,
  saveProfile,
  requestCheck,
  cancelRequest,
  type CheckRequest,
  type PlayerProfile,
} from "@/lib/learn/ladder-client";

const btn =
  "block w-full rounded-2xl bg-aqua py-4 text-center text-lg font-extrabold text-white shadow-[0_4px_0_#0B8ED1] active:translate-y-[2px] active:shadow-[0_2px_0_#0B8ED1] disabled:opacity-50";
const linkBtn = "mt-3 block w-full text-center text-sm text-slate underline";

// `step` comes from the URL (/learn/<trick-slug> or /learn/done). Progress lives in Firestore,
// so the URL only says "this player already started"; the real rung always wins.
export default function LearnPlayer({ step }: { step?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState<string[] | null>(null);
  const [profile, setProfile] = useState<PlayerProfile | null | undefined>(undefined);
  const [requests, setRequests] = useState<CheckRequest[]>([]);
  const [started, setStarted] = useState(step !== undefined);
  const [signingUp, setSigningUp] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const prevApproved = useRef<number | null>(null);

  useEffect(() => {
    ensurePlayer()
      .then(setUser)
      .catch((e: Error) => setError(e.message));
  }, []);

  useEffect(() => {
    if (approved === null) return;
    if (prevApproved.current !== null && approved.length > prevApproved.current) {
      const just = TRICK_LADDER.find((r) => r.slug === approved[approved.length - 1]);
      setToast(`${just?.name ?? "Trick"} approved!`);
      navigator.vibrate?.([80, 60, 80]);
      const t = setTimeout(() => setToast(null), 2600);
      prevApproved.current = approved.length;
      return () => clearTimeout(t);
    }
    prevApproved.current = approved.length;
    return undefined;
  }, [approved]);

  useEffect(() => {
    if (!user) return;
    const offs = [
      watchProgress(user.uid, setApproved),
      watchProfile(user.uid, setProfile),
      watchMyRequests(user.uid, setRequests),
    ];
    return () => offs.forEach((off) => off());
  }, [user]);

  const ready = user !== null && approved !== null && profile !== undefined;
  const path = !ready
    ? null
    : isLadderComplete(approved)
      ? "/learn/done"
      : started || approved.length > 0 || requests.length > 0
        ? `/learn/${TRICK_LADDER[nextRungIndex(approved)]!.slug}`
        : "/learn";
  useEffect(() => {
    if (path && window.location.pathname !== path) window.history.replaceState(null, "", path);
  }, [path]);

  if (error) {
    return (
      <Centered>
        <p className="text-xl font-extrabold">The trick ladder isn&apos;t reachable right now.</p>
        <p className="text-center text-slate">Ask a club admin, or try again in a minute.</p>
        <p className="text-center text-xs text-slate/70">{error}</p>
      </Centered>
    );
  }
  if (!user || approved === null || profile === undefined) return <Centered><Spinner /></Centered>;

  const rung = nextRungIndex(approved);
  const pending = requests.find((r) => r.status === "pending");

  if (isLadderComplete(approved)) {
    return showReward ? <Reward user={user} profile={profile} /> : <Complete name={profile?.name} onNext={() => setShowReward(true)} />;
  }
  if (pending) return <Waiting req={pending} />;
  if (signingUp) {
    return (
      <SignUp
        onDone={async (p) => {
          await saveProfile(user.uid, p);
          await requestCheck(user.uid, p.name, rung);
          setSigningUp(false);
        }}
      />
    );
  }
  if (!started && approved.length === 0 && requests.length === 0) return <Landing onStart={() => setStarted(true)} />;

  const lastForRung = requests.find((r) => r.rung === rung);
  return (
    <>
      {toast && (
        <div role="status" className="fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-fit animate-in fade-in slide-in-from-top-4 rounded-full bg-green-500 px-5 py-2.5 font-extrabold text-white shadow-lg">
          ✓ {toast}
        </div>
      )}
      <Trick
      index={rung}
      approvedCount={approved.length}
      rejected={lastForRung?.status === "rejected" ? lastForRung : undefined}
      onLanded={() => (profile ? requestCheck(user.uid, profile.name, rung) : setSigningUp(true))}
      />
    </>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col items-center justify-center gap-4">{children}</div>;
}

function Spinner() {
  return <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-aqua" aria-label="Loading" />;
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Image src="/images/logo.avif" alt="YoYoChampion" width={200} height={89} className="h-9 w-auto" priority />
        <span className="rounded-full bg-aqua-soft px-3 py-1 text-xs font-bold text-aqua-deep">Sac Yoyo Club</span>
      </div>
      <h1 className="mt-6 text-4xl font-extrabold leading-tight">
        Land 5 tricks.
        <br />
        Keep the yo-yo.
      </h1>
      <ol className="my-6 flex flex-1 flex-col justify-center gap-2 rounded-3xl bg-sky p-5">
        {TRICK_LADDER.map((r, i) => (
          <li key={r.slug} className="flex items-center gap-3 text-lg font-bold">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm text-aqua-deep">{i + 1}</span>
            {r.name}
          </li>
        ))}
      </ol>
      <button className={btn} onClick={onStart}>Start trick 1</button>
      <p className="mt-2 text-center text-xs text-slate">No sign-up yet</p>
    </>
  );
}

function Progress({ done, current }: { done: number; current: number }) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={TRICK_LADDER.length} aria-valuenow={done}>
      {TRICK_LADDER.map((r, i) => (
        <span
          key={r.slug}
          className={`h-2 flex-1 rounded-full ${i < done ? "bg-green-500" : i === current ? "bg-aqua" : "bg-line"}`}
        />
      ))}
    </div>
  );
}

function Trick({
  index,
  approvedCount,
  rejected,
  onLanded,
}: {
  index: number;
  approvedCount: number;
  rejected?: CheckRequest | undefined;
  onLanded: () => unknown;
}) {
  const r = TRICK_LADDER[index]!;
  const [showTip, setShowTip] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <>
      <Progress done={approvedCount} current={index} />
      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate">Trick {index + 1} of {TRICK_LADDER.length}</p>
      <h1 className="text-3xl font-extrabold">{r.name}</h1>

      {rejected && (
        <div className="mt-3 rounded-2xl border-2 border-gold bg-[#FFFBEB] p-3 text-sm">
          <b>Not yet.</b> {rejected.tip ? <>Tip from {rejected.decidedByName ?? "your admin"}: {rejected.tip}</> : "Keep practicing and try again."}
        </div>
      )}

      <div className="my-4 flex-1">
        {r.ytId ? (
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${r.ytId}?rel=0&playsinline=1`}
              title={`${r.name} tutorial`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="rounded-2xl bg-sky p-5 text-lg leading-relaxed">{r.tip}</div>
        )}
        {r.ytId && showTip && <p className="mt-3 rounded-2xl bg-sky p-4">{r.tip}</p>}
      </div>

      <button
        className={btn}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setErr(null);
          try {
            await onLanded();
          } catch {
            setErr("That didn't go through. Check your connection and tap again.");
          } finally {
            setBusy(false);
          }
        }}
      >
        I landed it
      </button>
      {err && <p role="alert" className="mt-2 text-center text-sm font-bold text-red-600">{err}</p>}
      {r.ytId && (
        <button className={linkBtn} onClick={() => setShowTip((s) => !s)}>
          {showTip ? "Hide tip" : "Stuck? Get a tip"}
        </button>
      )}
    </>
  );
}

function SignUp({ onDone }: { onDone: (p: PlayerProfile) => Promise<void> }) {
  const [name, setName] = useState("");
  const [over13, setOver13] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const valid = name.trim().length > 0 && over13 !== null && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  const choice = (on: boolean) =>
    `flex-1 rounded-xl border-2 py-3 font-bold ${on ? "border-aqua bg-sky text-aqua-deep" : "border-line"}`;

  return (
    <form
      className="flex flex-1 flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid || over13 === null) return;
        setBusy(true);
        setErr(null);
        try {
          await onDone({ name: name.trim(), email: email.trim(), emailIsParent: !over13, newsletter });
        } catch (e) {
          setErr((e as Error).message);
          setBusy(false);
        }
      }}
    >
      <h1 className="text-3xl font-extrabold">Save your progress</h1>
      <p className="-mt-2 text-slate">So an admin can check you off.</p>

      <label className="flex flex-col gap-1 font-bold">
        First name
        <input
          className="rounded-xl border-2 border-line px-3 py-3 font-normal"
          value={name}
          maxLength={40}
          autoComplete="given-name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 font-bold">Are you {MIN_NEWSLETTER_AGE} or older?</legend>
        <div className="flex gap-3">
          <button type="button" className={choice(over13 === true)} aria-pressed={over13 === true} onClick={() => setOver13(true)}>Yes</button>
          <button type="button" className={choice(over13 === false)} aria-pressed={over13 === false} onClick={() => setOver13(false)}>No</button>
        </div>
      </fieldset>

      {over13 !== null && (
        <>
          <label className="flex flex-col gap-1 font-bold">
            {over13 ? "Email" : "Parent's email"}
            <input
              className="rounded-xl border-2 border-line px-3 py-3 font-normal"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-aqua" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
            {over13 ? "Email me new tricks and club news" : "Email my parent new tricks and club news"}
          </label>
        </>
      )}

      {err && <p className="text-sm text-red-600">{err}</p>}
      <button className={`${btn} mt-auto`} disabled={!valid || busy}>Get checked off</button>
    </form>
  );
}

function Waiting({ req }: { req: CheckRequest }) {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#FFFBEB]">
      <div className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-3 px-5 py-6 text-center">
      <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold">Waiting for an admin</span>
      <h1 className="text-5xl font-extrabold">{req.name}</h1>
      <p className="text-xl font-bold">{TRICK_LADDER[req.rung]?.name}</p>
      <div className="my-2 h-12 w-12 animate-spin rounded-full border-[5px] border-[#FDE68A] border-t-[#D9A900]" />
      <p className="text-slate">
        Do the trick for an admin.
        <br />
        This turns green when they approve.
      </p>
      <button className={linkBtn} onClick={() => cancelRequest(req.id)}>Cancel request</button>
      </div>
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="rounded-lg bg-black/20 px-3 py-1 font-mono text-sm font-bold">
      LIVE · {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

function Complete({ name, onNext }: { name?: string | undefined; onNext: () => void }) {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-b from-green-600 to-green-500 text-white">
      <div className="mx-auto flex min-h-full max-w-md flex-col items-center gap-4 px-5 pb-6 pt-4 text-center">
      <div className="mt-auto grid h-36 w-36 animate-[pulse-ring_1.6s_ease-in-out_infinite] place-items-center rounded-full bg-white motion-reduce:animate-none">
        <svg viewBox="0 0 24 24" className="w-20" fill="none" stroke="#16A34A" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold">It&apos;s yours!</h1>
      {name && <p className="text-lg font-bold">{name} · 5 / 5 tricks</p>}
      <LiveClock />
      <button className="mt-auto w-full rounded-2xl bg-white py-4 text-lg font-extrabold text-green-700" onClick={onNext}>
        See your secret trick
      </button>
      <style>{`@keyframes pulse-ring { 50% { transform: scale(1.07); box-shadow: 0 0 0 14px rgba(255,255,255,.25); } }`}</style>
      </div>
    </div>
  );
}

function Reward({ user, profile }: { user: User; profile: PlayerProfile | null }) {
  const product = ladderReward();
  const [subscribed, setSubscribed] = useState(profile?.newsletter ?? false);
  return (
    <>
      <div className="rounded-2xl bg-ink p-4 text-white">
        <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-ink">Unlocked</span>
        <h1 className="mt-2 text-2xl font-extrabold">The DNA 🧬</h1>
        <p className="text-sm text-white/80">Your yo-yo can&apos;t do this one. This one can:</p>
      </div>
      <a
        href={productUrl(product)}
        className="my-4 flex flex-1 flex-col items-center justify-center gap-1 rounded-3xl border-2 border-[#CE82FF] bg-[#FBF5FF] p-4 text-center"
      >
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shopifyImage(product.images[0], 600)} alt={product.title} className="max-h-56 w-full rounded-2xl bg-white object-contain" />
        )}
        <b className="mt-2 text-lg">{product.title}</b>
        <span className="text-sm text-slate">Yo-yo + 3 DNA strings</span>
        <b className="text-2xl">{formatMoney(product.priceFrom)}</b>
      </a>
      <a className={btn} href={productUrl(product)}>Get the DNA pack</a>
      {profile && !subscribed ? (
        <button
          className={linkBtn}
          onClick={async () => {
            await saveProfile(user.uid, { ...profile, newsletter: true });
            setSubscribed(true);
          }}
        >
          Not now · email me the next trick
        </button>
      ) : (
        <p className="mt-3 text-center text-sm text-slate">You&apos;ll get the next trick by email.</p>
      )}
    </>
  );
}
