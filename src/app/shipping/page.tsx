import Link from "next/link";
import { Header } from "@/components/Header";

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Header subtitle="Shipping Info" />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl border border-stone-200/60 p-8 shadow-sm">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
            Shipping Information
          </h1>
          <div className="space-y-6 text-warm-gray leading-relaxed">
            <p>
              We ship within the continental US. Standard shipping is included on orders
              over a certain threshold. Expedited shipping is available at checkout for
              an additional fee.
            </p>
            <p>
              Original paintings and prints are carefully packaged to ensure they arrive
              in perfect condition. Processing typically takes 2–3 business days before
              your order ships.
            </p>
            <p>
              Custom design orders may have longer lead times—we&apos;ll discuss timing
              when we confirm your request.
            </p>
            <p>
              For shipping questions or special requests, please{" "}
              <Link href="/contact" className="text-terracotta hover:underline">
                contact us
              </Link>
              .
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
