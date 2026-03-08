import Link from "next/link";
import { Header } from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header subtitle="About Us" />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl border border-stone-200/60 p-8 shadow-sm">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
            About SoftHue Studios
          </h1>
          <p className="text-warm-gray leading-relaxed mb-4">
            SoftHue Studios creates original paintings and digital art with a focus on warmth,
            calm, and handcrafted quality. Each piece is made with care to bring beauty and
            serenity into your space.
          </p>
          <p className="text-warm-gray leading-relaxed mb-6">
            From landscape paintings to modern digital prints, we offer a range of artwork
            for every style. We also welcome custom commissions—work with us to bring your
            vision to life.
          </p>
          <Link
            href="/"
            className="inline-block text-terracotta hover:underline font-medium"
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
