// Parses the spec lines that gentrystein.com product descriptions carry
// ("Diameter: 56mm", "Weight - 66.8 grams", "Bearing | CBC Large Center Trac").
// Anything not stated on the product page stays undefined — never invented.

export interface YoyoSpecs {
  diameterMm?: number;
  widthMm?: number;
  weightG?: number;
  gapMm?: number;
  bearing?: string;
  response?: string;
  body?: string;
  rims?: string;
}

const LINE_RE = /^\s*(diameter|width|weight|gap width|in gap|bearing|response|body|rims)\s*[:|\-–]\s*(.+?)\s*$/i;

function toNumber(raw: string): number | undefined {
  const m = raw.replace(',', '.').match(/-?\d+(\.\d+)?/);
  if (!m) return undefined;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : undefined;
}

// Inches show up once in the catalog ('in gap : 0.17"'); normalise to mm.
function toMm(raw: string): number | undefined {
  const n = toNumber(raw);
  if (n === undefined) return undefined;
  return /"|inch/i.test(raw) ? Math.round(n * 25.4 * 10) / 10 : n;
}

export function parseSpecs(plainText: string): YoyoSpecs {
  const specs: YoyoSpecs = {};
  const setNumber = (key: 'diameterMm' | 'widthMm' | 'weightG' | 'gapMm', n: number | undefined) => {
    if (n !== undefined && specs[key] === undefined) specs[key] = n;
  };
  for (const line of plainText.split('\n')) {
    const m = line.match(LINE_RE);
    if (!m) continue;
    const key = m[1]!.toLowerCase();
    const value = m[2]!;
    switch (key) {
      case 'diameter':
        setNumber('diameterMm', toMm(value));
        break;
      case 'width':
        setNumber('widthMm', toMm(value));
        break;
      case 'weight':
        setNumber('weightG', toNumber(value));
        break;
      case 'gap width':
      case 'in gap':
        setNumber('gapMm', toMm(value));
        break;
      case 'bearing':
        specs.bearing ??= value;
        break;
      case 'response':
        specs.response ??= value;
        break;
      case 'body':
        specs.body ??= value;
        break;
      case 'rims':
        specs.rims ??= value;
        break;
    }
  }
  return specs;
}

export function hasDimensions(s: YoyoSpecs): s is YoyoSpecs & { diameterMm: number; widthMm: number } {
  return typeof s.diameterMm === 'number' && typeof s.widthMm === 'number';
}
