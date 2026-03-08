"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { WishlistStarButton } from "@/components/WishlistStarButton";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = (item: { id: number; title: string; price: number; image: string }) => {
    addItem(item);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-6 py-3 text-center">
          <p className="text-charcoal font-medium tracking-wide">
            🎨 <span className="font-semibold text-amber-800">Opening Sale: 20% off sitewide! Ends 4/16</span>
          </p>
        </div>
      </div>

      <Header subtitle="Wishlist" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200/60 p-12 text-center">
            <p className="text-warm-gray text-lg mb-6">Your wishlist is empty.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg border border-stone-200/60 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-stone-100 relative block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <WatermarkOverlay size="sm" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-display font-semibold text-charcoal hover:text-terracotta">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-warm-gray text-sm">${item.price}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <WishlistStarButton product={item} />
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="min-h-[44px] px-4 py-2 bg-charcoal text-cream text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors touch-manipulation"
                    >
                      Add to Cart
                    </button>
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
            <Link
              href="/"
              className="inline-block text-terracotta hover:underline text-sm font-medium"
            >
              ← Continue shopping
            </Link>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios. All rights reserved.
      </footer>
    </div>
  );
}
