"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-6 py-3 text-center">
          <p className="text-charcoal font-medium tracking-wide">
            🎨 <span className="font-semibold text-amber-800">Opening Sale</span> — 20% off sitewide
          </p>
        </div>
      </div>

      <Header subtitle="Your Cart" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200/60 p-12 text-center">
            <p className="text-warm-gray text-lg mb-6">Your cart is empty.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg border border-stone-200/60 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-stone-100 relative flex items-center justify-center">
                    {item.image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <WatermarkOverlay size="sm" />
                      </>
                    ) : (
                      <span className="text-3xl text-stone-300">✎</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm">
                      ${item.price} each
                      {item.originalPrice && (
                        <span className="ml-1 line-through">${item.originalPrice}</span>
                      )}
                    </p>
                    {item.customDescription && (
                      <p className="text-warm-gray text-xs mt-1 italic line-clamp-2">
                        {item.customDescription}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <label className="flex items-center gap-1">
                      <span className="text-sm text-warm-gray">Qty</span>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                        }
                        className="w-14 px-2 py-1 border border-stone-200 rounded text-center text-sm"
                      />
                    </label>
                    <span className="font-semibold text-charcoal w-16 text-right">
                      ${item.price * item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="min-h-[44px] min-w-[44px] px-3 text-warm-gray hover:text-red-600 hover:bg-red-50 text-sm rounded-lg transition-colors touch-manipulation"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-white rounded-lg border border-stone-200/60 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="font-display text-xl font-semibold text-charcoal">
                Total: ${total}
              </p>
              <div className="flex gap-3">
                <Link
                  href="/"
                  className="px-6 py-3 border border-stone-200 text-charcoal font-medium rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/checkout"
                  className="px-6 py-3 bg-charcoal text-cream font-medium rounded-lg hover:bg-stone-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios. All rights reserved.
      </footer>
    </div>
  );
}
