"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleClick = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    router.push("/cart");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 px-6 bg-charcoal text-cream font-medium rounded-lg hover:bg-stone-700 transition-colors"
    >
      Add to Cart
    </button>
  );
}
