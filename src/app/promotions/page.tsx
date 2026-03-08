import Link from "next/link";
import { Header } from "@/components/Header";

export default function PromotionsPage() {
  return (
    <div className="min-h-screen">
      <Header subtitle="Promotions" />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl border border-stone-200/60 p-8 shadow-sm">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
            Current Promotions
          </h1>
          <div className="space-y-6 text-warm-gray leading-relaxed">
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/50 rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold text-amber-800 mb-2">
                Opening Sale: 20% Off
              </h2>
              <p>
                Enjoy 20% off sitewide during our opening sale. Applies to all original
                paintings, digital prints, and custom design requests. Ends April 16.
              </p>
            </div>
            <p>
              Check the banner on our homepage for the latest offers. New promotions
              are added from time to time—shop early for the best selection.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block mt-8 text-terracotta hover:underline font-medium"
          >
            ← Back to shop
          </Link>
        </section>
      </main>
      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios
      </footer>
    </div>
  );
}
