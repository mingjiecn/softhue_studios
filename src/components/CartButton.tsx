"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link
      href="/cart"
      className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-stone-200 bg-white/80 hover:bg-stone-50 transition-colors text-charcoal font-medium touch-manipulation"
    >
      <span aria-hidden>🛒</span>
      <span>Cart</span>
      {count > 0 && (
        <span className="bg-terracotta text-white text-xs font-semibold min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1">
          {count}
        </span>
      )}
    </Link>
  );
}
