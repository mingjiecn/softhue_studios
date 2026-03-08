"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { WishlistStarButton } from "@/components/WishlistStarButton";

export type Painting = {
  id: number;
  title: string;
  artist: string;
  price: number;
  originalPrice: number;
  image: string;
};

export function PaintingCard({ painting }: { painting: Painting }) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: painting.id,
      title: painting.title,
      price: painting.price,
      image: painting.image,
    });
    router.push("/cart");
  };

  return (
    <article className="group bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200/60 hover:shadow-lg hover:border-stone-300/80 transition-all duration-300">
      <Link href={`/product/${painting.id}`} className="block aspect-[4/5] relative overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={painting.image}
          alt={painting.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 z-10">
          <WishlistStarButton
            product={{
              id: painting.id,
              title: painting.title,
              price: painting.price,
              image: painting.image,
            }}
          />
        </div>
        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
          -20%
        </div>
        <WatermarkOverlay size="md" />
      </Link>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-charcoal">
          {painting.title}
        </h3>
        <p className="text-sm text-warm-gray mb-2">{painting.artist}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-charcoal">
            ${painting.price}
          </span>
          <span className="text-sm text-stone-400 line-through">
            ${painting.originalPrice}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full py-2.5 bg-charcoal text-cream text-sm font-medium rounded hover:bg-stone-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
