"use client";

import Link from "next/link";
import { SwissButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[rgb(var(--swiss-paper))] text-center">
      <h1 className="swiss-display text-9xl mb-4">404</h1>
      <p className="swiss-display text-2xl mb-8">Halaman tidak ditemukan.</p>
      <Link href="/">
        <SwissButton size="lg">Kembali ke Beranda</SwissButton>
      </Link>
    </div>
  );
}
