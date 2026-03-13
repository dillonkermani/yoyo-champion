"use client";

import React from "react";
import { getRecentNews } from "@yoyo/data";
import type { NewsItem } from "@yoyo/data";

const TYPE_COLORS: Record<NewsItem["type"], { bg: string; text: string }> = {
  announcement: { bg: "bg-blue-100", text: "text-blue-700" },
  update: { bg: "bg-green-100", text: "text-green-700" },
  new_video: { bg: "bg-purple-100", text: "text-purple-700" },
};

const TYPE_LABELS: Record<NewsItem["type"], string> = {
  announcement: "Announcement",
  update: "Update",
  new_video: "New Video",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsPage() {
  const news = getRecentNews(8);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">
          News &amp; Announcements
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => {
            const colors = TYPE_COLORS[item.type];
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text}`}
                  >
                    {TYPE_LABELS[item.type]}
                  </span>
                  <time
                    className="text-xs text-gray-400"
                    dateTime={item.createdAt.toISOString()}
                  >
                    {formatDate(item.createdAt)}
                  </time>
                </div>

                <h2 className="mb-2 text-lg font-bold text-gray-900 leading-snug">
                  {item.title}
                </h2>

                <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
