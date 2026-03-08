"use client";

import Link from "next/link";
import { CartButton } from "@/components/CartButton";
import { AccountButton } from "@/components/AccountButton";
import { WishlistButton } from "@/components/WishlistButton";
import { useSidebar } from "@/context/SidebarContext";

export function Header({ subtitle = "Original Art • Handcrafted with Care" }: { subtitle?: string }) {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-10">
      <div className="border-b border-stone-200/60 bg-white/70 backdrop-blur-sm relative min-h-[5rem] flex items-center">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={toggle}
            className="flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 text-charcoal hover:bg-stone-100 rounded-lg transition-colors touch-manipulation"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-[50vw] min-w-0"
          >
            <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-semibold text-charcoal tracking-tight truncate">
              SoftHue Studios
            </h1>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 ml-auto flex-shrink-0">
            <WishlistButton />
            <AccountButton />
            <CartButton />
          </div>
        </div>
      </div>
      <div className="bg-stone-100 border-b border-stone-200/60">
        <p className="text-center text-warm-gray text-sm tracking-widest uppercase py-2 px-6">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
