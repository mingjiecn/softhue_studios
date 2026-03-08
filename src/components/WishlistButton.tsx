"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

export function WishlistButton() {
  const { items } = useWishlist();
  const count = items.length;

  return (
    <Link
      href="/wishlist"
      className="relative flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border border-stone-200 bg-white/80 hover:bg-stone-50 transition-colors text-charcoal touch-manipulation"
      aria-label="Wishlist"
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
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs font-semibold min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
