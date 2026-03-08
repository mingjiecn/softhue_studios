import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { Header } from "@/components/Header";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { WishlistStarButton } from "@/components/WishlistStarButton";

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const productId = parseInt(params.id, 10);
  const product = getProduct(productId);

  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-6 py-3 text-center">
          <p className="text-charcoal font-medium tracking-wide">
            🎨 <span className="font-semibold text-amber-800">Opening Sale: 20% off sitewide! Ends 4/16</span>
          </p>
        </div>
      </div>

      <Header subtitle={product.title} />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-block text-warm-gray text-sm hover:text-charcoal mb-8"
        >
          ← Back to shop
        </Link>

        <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="md:w-1/2 aspect-[4/5] md:aspect-auto md:min-h-[28rem] relative bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10">
              <WishlistStarButton
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                }}
              />
            </div>
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-semibold px-3 py-1.5 rounded">
              -20%
            </div>
            <WatermarkOverlay size="lg" />
          </div>
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <p className="text-sm text-warm-gray uppercase tracking-widest mb-2">
              {product.category === "painting" ? "Original Painting" : "Digital Art Print"}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-2">
              {product.title}
            </h1>
            <p className="text-warm-gray mb-6">{product.artist}</p>
            <p className="text-charcoal leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl font-semibold text-charcoal">
                ${product.price}
              </span>
              <span className="text-lg text-stone-400 line-through">
                ${product.originalPrice}
              </span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios. All rights reserved.
      </footer>
    </div>
  );
}
