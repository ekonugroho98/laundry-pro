"use client";

import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissBadge } from "@/components/ui/badge";

export default function BlogPage() {
  const posts = [
    {
      id: "1",
      title: "Tips Mencuci Pakaian Putih",
      date: "2023-10-01",
      category: "Tips",
    },
    {
      id: "2",
      title: "Mengapa Laundry Profesional Lebih Baik?",
      date: "2023-10-05",
      category: "Info",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[rgb(var(--swiss-paper))]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-12">
          <SwissBadge>News & Updates</SwissBadge>
          <h1 className="swiss-display text-4xl mt-2">Laundry Insights</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block p-6 border border-[rgb(var(--swiss-rule))] hover:bg-[rgb(var(--swiss-surface))] transition-colors"
            >
              <p className="swiss-eyebrow mb-1">{post.date} • {post.category}</p>
              <h2 className="swiss-display text-2xl group-hover:underline">
                {post.title}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
