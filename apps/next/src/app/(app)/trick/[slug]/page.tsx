import { mockTricks } from '@yoyo/data';
import TrickClient from './trick-client';

export function generateStaticParams() {
  return mockTricks.map((t) => ({ slug: t.slug }));
}

export default function TrickPage() {
  return <TrickClient />;
}
