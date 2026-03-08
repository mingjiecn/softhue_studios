import Link from "next/link";
import { Header } from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header subtitle="Contact Info" />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl border border-stone-200/60 p-8 shadow-sm">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
            Contact Us
          </h1>
          <p className="text-warm-gray leading-relaxed mb-6">
            Questions about an order, custom design, or our artwork? We&apos;d love to hear from you.
          </p>
          <ul className="space-y-3 text-warm-gray">
            <li>
              <span className="font-medium text-charcoal">Email:</span>{" "}
              <a href="mailto:xiguagou17@gmail.com" className="text-terracotta hover:underline">
                xiguagou17@gmail.com
              </a>
            </li>
            <li>
              <span className="font-medium text-charcoal">Orders:</span> Use the checkout flow
              or reply to your order confirmation email.
            </li>
            <li>
              <span className="font-medium text-charcoal">Custom requests:</span>{" "}
              <Link href="/custom-design" className="text-terracotta hover:underline">
                Submit a custom design request
              </Link>
            </li>
          </ul>
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
