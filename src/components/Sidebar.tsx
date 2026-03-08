"use client";

import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { href: "/about", label: "About Us", icon: "✦" },
  { href: "/contact", label: "Contact Info", icon: "✉" },
  { href: "/shipping", label: "Shipping Info", icon: "📦" },
  { href: "/promotions", label: "Promotions", icon: "🎨" },
];

export function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Backdrop when open */}
      {isOpen && (
        <button
          type="button"
          onClick={close}
          className="fixed inset-0 bg-black/20 z-40 md:bg-transparent"
          aria-label="Close menu"
        />
      )}

      {/* Sidebar panel - below top 2 banners (promo + header ≈ 10rem) */}
      <aside
        className={`fixed left-0 top-[10rem] bottom-0 w-56 bg-white border-r border-stone-200/60 shadow-lg z-50 transform transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="py-6 px-4 space-y-1" aria-label="Site information">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal rounded-lg hover:bg-stone-100/80 hover:text-terracotta transition-colors"
            >
              <span className="text-terracotta" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
