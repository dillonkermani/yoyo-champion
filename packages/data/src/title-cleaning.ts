// Pure functions for cleaning YouTube playlist titles into trick names + slugs.
// Kept separate from the scraper so they can be unit-tested without network.

const EPISODE_RE = /\bEp(?:isode)?\.?\s*\d+/gi;
const YOYO_TRICK_RE = /\b(?:Yoyo|Yo-?Yo)\s+(?:Trick|Tutorial)!?/gi;
const SHOW_TITLE_RE = /(?:LEARN TO YOYO|Learn to Yoyo)\s+With\s+World\s+(?:Yoyo\s+)?Champion(?:\s+Gentry\s+Stein)?/gi;
const CHAMPION_TAIL_RE = /(?:With|with)\s+(?:the\s+)?World\s+(?:Yoyo\s+)?Champion(?:\s+Gentry\s+Stein)?/gi;
const LEADING_RE = /^(?:Learn\s+How\s+to|Learn\s+how\s+to|Learn\s+to\s+do|Learn\s+to|Learn|How\s+to|How\s+To|how\s+to)\s+/i;
const LEADING_DO_YOYO_RE = /^do\s+Yoyo\s+/i;

export function cleanTitle(raw: string): string {
  let s = raw;
  // 1. Drop bracketed and parenthesized marketing text.
  s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/\([^)]*\)/g, '');
  // 2. Drop episode tags ("Episode 7", "Ep. 18").
  s = s.replace(EPISODE_RE, '');
  // 3. Drop the show title even when not bracketed.
  s = s.replace(SHOW_TITLE_RE, '');
  s = s.replace(CHAMPION_TAIL_RE, '');
  // 4. Drop "Yoyo Trick" / "Yoyo Tutorial" anywhere.
  s = s.replace(YOYO_TRICK_RE, '');
  // 5. Strip leading "How to" / "Learn …" once.
  s = s.replace(LEADING_RE, '');
  // 6. After step 5 a title like "Learn to do Yoyo Grinds" becomes "do Yoyo Grinds";
  //    strip residual "do Yoyo ".
  s = s.replace(LEADING_DO_YOYO_RE, '');
  // 7. Slash → space (e.g. "UFO/Flying Saucer").
  s = s.replace(/[/]/g, ' ');
  // 8. Collapse whitespace and strip residual punctuation at the edges.
  s = s.replace(/\s+/g, ' ').trim();
  s = s.replace(/^[-–—:,!?\s]+/, '');
  s = s.replace(/[-–—:,!?\s]+$/, '');
  return s;
}

export function parseEpisode(raw: string): number | undefined {
  const m = raw.match(/Ep(?:isode)?\.?\s*(\d+)/i);
  if (!m) return undefined;
  return Number(m[1]);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Titles that are not actual trick tutorials. The scraper drops these.
const SKIP_PATTERNS: RegExp[] = [
  /pewdiepie/i,
  /epic yoyo footage/i,
  /incredible yoyo tricks/i,
  /maintain your yoyo/i,
  /clean(?:ing)? bearing/i,
  /super fast yoyo wind/i,
  /choosing a good yoyo/i,
  /setup your yoyo/i,
  /^LEARN TO YOYO With World Yoyo Champion Gentry Stein\s*-\s*Episode 1$/i,
];

export function isSkippableTitle(raw: string): boolean {
  return SKIP_PATTERNS.some((re) => re.test(raw));
}
