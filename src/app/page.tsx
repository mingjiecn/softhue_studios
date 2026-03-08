import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchableProductGallery } from "@/components/SearchableProductGallery";
import { WelcomeGreeting } from "@/components/WelcomeGreeting";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Promotion Banner - 20% Off */}
      <div className="bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-center">
          <p className="text-charcoal font-medium tracking-wide">
            🎨 <span className="font-semibold text-amber-800">Opening Sale: 20% off sitewide! Ends 4/16</span>
          </p>
        </div>
      </div>

      {/* Header with Studio Name + Cart */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <WelcomeGreeting />
        <SearchableProductGallery />

        {/* Custom Design Section */}
        <section className="bg-white rounded-xl border border-stone-200/60 p-6 sm:p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-4">
                Custom Design
              </h2>
              <p className="text-warm-gray leading-relaxed mb-6">
                Have a vision in mind? Commission a one-of-a-kind piece tailored to your space and style. 
                Our artists work closely with you to bring your ideas to life—from color palettes to 
                subjects and dimensions. Each custom painting is made exclusively for you.
              </p>
              <ul className="space-y-2 text-warm-gray mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-terracotta">✦</span> Choose your size and medium
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terracotta">✦</span> Personal consultation included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terracotta">✦</span> 20% off applies to custom orders
                </li>
              </ul>
              <Link
                href="/custom-design"
                className="inline-block px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                Request Custom Design
              </Link>
            </div>
            <div className="flex-1 aspect-square max-w-sm mx-auto bg-gradient-to-br from-stone-200 to-stone-100 rounded-lg flex items-center justify-center">
              <span className="text-stone-400 font-display text-6xl">✎</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios. All rights reserved.
      </footer>
    </div>
  );
}
