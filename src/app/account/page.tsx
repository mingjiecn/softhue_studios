"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { useAccount } from "@/context/AccountContext";
import Link from "next/link";

export default function AccountPage() {
  const { profile, orders, updateProfile, cancelOrder, confirmOrder } = useAccount();
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-6 py-3 text-center">
          <p className="text-charcoal font-medium tracking-wide">
            🎨 <span className="font-semibold text-amber-800">Opening Sale: 20% off sitewide! Ends 4/16</span>
          </p>
        </div>
      </div>

      <Header subtitle="My Account" />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Profile Form */}
        <section className="bg-white rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-6">
            Profile Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-warm-gray mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-warm-gray mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-warm-gray mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-warm-gray mb-1">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-warm-gray mb-1">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="city" className="block text-sm font-medium text-warm-gray mb-1">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-warm-gray mb-1">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-warm-gray mb-1">
                  ZIP
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              {saved ? "Saved ✓" : "Save changes"}
            </button>
          </form>
        </section>

        {/* Order History */}
        <section className="bg-white rounded-xl border border-stone-200/60 p-8 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-2">
            Order History
          </h2>
          <p className="text-sm text-warm-gray mb-6">
            Pending orders can be cancelled before confirmation. Store owner: use &quot;Mark as confirmed&quot; once you&apos;ve confirmed an order.
          </p>
          {orders.length === 0 ? (
            <p className="text-warm-gray mb-6">No orders yet.</p>
          ) : (
            <ul className="space-y-6">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="border-b border-stone-200/60 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                    <span className="text-sm text-warm-gray">
                      Order #{order.id.replace("ord-", "")} · {order.date}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          order.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-stone-100 text-warm-gray"
                        }`}
                      >
                        {order.status === "pending" ? "Pending" : "Confirmed"}
                      </span>
                      <span className="font-semibold text-charcoal">${order.total}</span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm text-charcoal">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.title} × {item.quantity} —{" "}
                        {item.originalPrice ? (
                          <>
                            <span className="line-through text-warm-gray">${item.originalPrice * item.quantity}</span>
                            {" "}${item.price * item.quantity}
                          </>
                        ) : (
                          `$${item.price * item.quantity}`
                        )}
                        {item.customDescription && (
                          <p className="text-warm-gray text-xs mt-0.5 italic truncate max-w-md">
                            {item.customDescription}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex gap-3">
                    {order.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => cancelOrder(order.id)}
                        className="text-sm text-red-600 hover:text-red-700 hover:underline"
                      >
                        Cancel order
                      </button>
                    )}
                    {order.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => confirmOrder(order.id)}
                        className="text-sm text-warm-gray hover:text-charcoal hover:underline"
                        title="Store owner: mark as confirmed after you've confirmed this order"
                      >
                        Mark as confirmed
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/"
            className="inline-block mt-6 text-terracotta hover:underline text-sm font-medium"
          >
            ← Continue shopping
          </Link>
        </section>
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios. All rights reserved.
      </footer>
    </div>
  );
}
