"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useCart } from "@/context/CartContext";

const CUSTOM_PAINTING_BEFORE_SALE = 45;
const SALE_DISCOUNT = 0.8; // 20% off

export default function CustomDesignPage() {
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const customPrice = Math.round(CUSTOM_PAINTING_BEFORE_SALE * SALE_DISCOUNT);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      id: -Date.now(),
      title: "Custom Design Request",
      price: customPrice,
      image: "",
      quantity: 1,
      customDescription: description,
      originalPrice: CUSTOM_PAINTING_BEFORE_SALE,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header subtitle="Added to Cart" />
        <main className="flex-1 max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-xl border border-stone-200/60 p-12 shadow-sm">
            <p className="text-4xl mb-4">✓</p>
            <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">
              Added to Cart
            </h2>
            <p className="text-warm-gray mb-8">
              Your custom design request has been added to your cart. Proceed to
              checkout and send the order email to complete your request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/cart"
                className="inline-block px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                View Cart
              </Link>
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="inline-block px-6 py-3 border border-stone-200 text-charcoal font-medium rounded-lg hover:bg-stone-50 transition-colors"
              >
                Checkout
              </button>
              <Link
                href="/"
                className="inline-block px-6 py-3 text-warm-gray hover:text-charcoal font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <footer className="border-t border-stone-200/60 py-8 text-center text-warm-gray text-sm">
          © {new Date().getFullYear()} SoftHue Studios
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header subtitle="Custom Design Request" />

      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="request"
              className="block font-display text-lg font-semibold text-charcoal mb-2"
            >
              Describe your custom design
            </label>
            <textarea
              id="request"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your vision: size, colors, subject matter, style, or any reference ideas..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta resize-none"
            />
          </div>

          <div>
            <label className="block font-display text-lg font-semibold text-charcoal mb-2">
              Add a reference image <span className="font-normal text-warm-gray">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-warm-gray file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-stone-100 file:text-charcoal file:font-medium hover:file:bg-stone-200"
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-warm-gray mb-2">Preview:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Reference preview"
                  className="max-h-48 rounded-lg border border-stone-200 object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  className="mt-2 text-sm text-terracotta hover:underline"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <p className="text-sm text-warm-gray">
            Custom design: <span className="line-through">${CUSTOM_PAINTING_BEFORE_SALE}</span>{" "}
            <span className="font-medium text-charcoal">${customPrice}</span> (20% off during our opening sale)
          </p>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              Add to Cart
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-stone-200 text-charcoal font-medium rounded-lg hover:bg-stone-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios
      </footer>
    </div>
  );
}
