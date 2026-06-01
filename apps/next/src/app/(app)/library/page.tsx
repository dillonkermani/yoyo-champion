"use client";
import { useState, useMemo } from 'react';
import { LearnScreen } from '@yoyo/ui';
import { mockTricks } from '@yoyo/data';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const tricks = useMemo(() => {
    let list = mockTricks;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q));
    }
    return list.map((t) => ({
      id: t.id,
      name: t.name,
      level: t.level,
      durationSec: t.durationSec,
      thumbnails: t.thumbnails,
    }));
  }, [searchQuery]);

  return (
    <LearnScreen
      tricks={tricks}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      onTrickPress={(id) => {
        const trick = mockTricks.find((t) => t.id === id);
        if (trick) router.push(`/trick/${trick.slug}`);
      }}
    />
  );
}
