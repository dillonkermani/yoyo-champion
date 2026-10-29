import Link from "next/link";
import Image from "next/image";
import {
  getProductByHandle,
  getLimitedEditions,
  getPacks,
  getTrickBySlug,
  hasDimensions,
} from "@yoyo/data";
import { ProductCard } from "@/components/store/product-card";
import { YoyoSilhouette } from "@/components/store/yoyo-silhouette";
import { LevelPicker } from "./level-picker";
import { shopifyImage } from "@yoyo/data";

// Trick → the yo-yo its own description says it is for.
const TRICK_PAIRS: { slug: string; handle: string }[] = [
  { slug: "forward-pass", handle: "arrow-dna" },
  { slug: "rock-the-baby", handle: "yoyo-master-pack" },
  { slug: "trapeze", handle: "arrow-dna" },
  { slug: "bind-an-unresponsive-yoyo", handle: "replay-pro" },
  { slug: "atomic-bomb", handle: "shutter" },
  { slug: "grinds", handle: "shutter" },
];

const PROOF: { handle: string; claim: string }[] = [
  { handle: "shutter", claim: "Won Gentry's first World Yo-Yo Title and two US National titles." },
  { handle: "replay-pro", claim: "Took first place at the National Yo-Yo Contest. It costs $15.99." },
  { handle: "shutter-elite-yoyo", claim: "Broke the world record for the longest continuous trick in one throw." },
];

export default function StoreHome() {
  const hero = getProductByHandle("g-force-yoyo")!;
  const limited = getLimitedEditions().filter((p) => p.meta.kind === "yoyo");
  const packs = getPacks().filter((p) => p.available);
  const pairs = TRICK_PAIRS.map((p) => ({ trick: getTrickBySlug(p.slug), product: getProductByHandle(p.handle) })).filter(
    (p) => p.trick && p.product,
  );

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl">
              Yo-yos built by a World Champion.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Gentry Stein&apos;s signature line, from your first throw to the contest stage. Every yo-yo here shows its
              real size, weight and who it is for, so you buy the right one the first time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/store/finder"
                className="inline-flex items-center rounded-full bg-aqua px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-aqua-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2"
              >
                Find my yo-yo
              </Link>
              <Link
                href="/store/yoyos"
                className="inline-flex items-center rounded-full border border-line px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-aqua hover:bg-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2"
              >
                Shop all yo-yos
              </Link>
            </div>
          </div>

          <Link href={`/store/products/${hero.handle}`} className="group block rounded-[2rem] bg-sky p-6 sm:p-10">
            <div className="relative mx-auto aspect-square max-w-sm">
              <Image
                src={shopifyImage(hero.images[0]!, 1200)}
                alt={hero.title}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-ink">{hero.title}</p>
                <p className="text-sm text-slate">
                  {hero.specs.diameterMm} mm diameter, {hero.specs.widthMm} mm wide, {hero.specs.weightG} g
                </p>
              </div>
              {hasDimensions(hero.specs) && (
                <YoyoSilhouette diameterMm={hero.specs.diameterMm} widthMm={hero.specs.widthMm} scale={1} />
              )}
            </div>
          </Link>
        </div>
      </section>

      {/* Level picker */}
      <section className="border-t border-line bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Where are you right now?</h2>
          <p className="mt-2 max-w-xl text-slate">Pick your level. These are the yo-yos whose own description says they are for you.</p>
          <LevelPicker />
        </div>
      </section>

      {/* Trick to yo-yo */}
      <section className="bg-sky/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Pick the trick, get the yo-yo.</h2>
          <p className="mt-2 max-w-xl text-slate">Gentry&apos;s own tutorials, each paired with the yo-yo built to learn it on.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pairs.map(({ trick, product }) => (
              <li key={trick!.slug} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
                <a
                  href={`https://www.youtube.com/watch?v=${trick!.ytId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video bg-ink"
                  aria-label={`Watch the ${trick!.name} tutorial on YouTube`}
                >
                  <Image src={trick!.thumbnails.hq} alt="" fill sizes="33vw" className="object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M4 2.5v11l9-5.5z" />
                      </svg>
                    </span>
                  </span>
                </a>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-semibold text-ink">{trick!.name}</p>
                    <p className="text-sm text-slate">{trick!.level === "beginner" ? "Beginner tutorial" : "Unresponsive tutorial"}</p>
                  </div>
                  <Link
                    href={`/store/products/${product!.handle}`}
                    className="shrink-0 rounded-full bg-sky px-3.5 py-2 text-sm font-semibold text-aqua-deep hover:bg-aqua-soft"
                  >
                    Learn it on the {product!.title.replace(/ Yoyo$/i, "")}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Proven on stage, not in a slogan.</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {PROOF.map(({ handle, claim }) => {
              const p = getProductByHandle(handle)!;
              return (
                <li key={handle}>
                  <Link href={`/store/products/${handle}`} className="flex h-full gap-4 rounded-3xl border border-line p-4 transition-colors hover:border-aqua">
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sky">
                      <Image src={shopifyImage(p.images[0]!, 160)} alt="" fill sizes="80px" className="object-contain p-1" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{p.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate">{claim}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Limited runs */}
      {limited.length > 0 && (
        <section className="border-t border-line py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Limited runs.</h2>
                <p className="mt-2 max-w-xl text-slate">Numbered editions. When the page says sold out, it stays up so you can see what you missed.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {limited.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packs */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Packs that grow with you.</h2>
          <p className="mt-2 max-w-xl text-slate">Responsive to unresponsive in one box, with string included.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packs.slice(0, 4).map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
