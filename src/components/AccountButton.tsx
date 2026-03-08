"use client";

import Link from "next/link";

export function AccountButton() {
  return (
    <Link
      href="/account"
      className="flex items-center justify-center w-10 h-10 rounded-lg border border-stone-200 bg-white/80 hover:bg-stone-50 transition-colors text-charcoal"
      aria-label="Account"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    </Link>
  );
}
