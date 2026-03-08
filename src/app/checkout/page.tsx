"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAccount } from "@/context/AccountContext";
import { Header } from "@/components/Header";

const inputClass =
  "w-full px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { profile, updateProfile, addOrder } = useAccount();
  const [orderInfo, setOrderInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    expeditedShipping: false,
    promoCode: "",
    additionalNotes: "",
  });
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    setOrderInfo((prev) => ({
      ...prev,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      zip: profile.zip,
    }));
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setOrderInfo((prev) => ({ ...prev, [target.name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderTotal = orderInfo.expeditedShipping ? total + 15 : total;
    const orderLines = items.flatMap((i) => {
      const line = `${i.title} × ${i.quantity} — $${i.price * i.quantity}`;
      const cartItem = i as { customDescription?: string };
      return cartItem.customDescription
        ? [line, `  Details: ${cartItem.customDescription}`]
        : [line];
    });
    const body = [
      `Order from SoftHue Studios`,
      ``,
      `--- Contact ---`,
      `Name: ${orderInfo.firstName} ${orderInfo.lastName}`,
      `Email: ${orderInfo.email}`,
      `Phone: ${orderInfo.phone}`,
      ``,
      `--- Shipping Address ---`,
      `${orderInfo.address}`,
      `${orderInfo.city}, ${orderInfo.state} ${orderInfo.zip}`,
      orderInfo.expeditedShipping ? `Expedited shipping: Yes (+$15)` : ``,
      ``,
      `--- Order ---`,
      ...orderLines,
      orderInfo.expeditedShipping ? `Expedited shipping: $15` : ``,
      orderInfo.promoCode ? `Promo code: ${orderInfo.promoCode}` : ``,
      ``,
      `Total: $${orderTotal}`,
      ``,
      `--- Additional Notes ---`,
      ``,
      orderInfo.additionalNotes ? orderInfo.additionalNotes : `(Add any additional notes or special requests here)`,
      ``,
      ``,
      ``,
    ].join("\n");
    const subject = encodeURIComponent(`Order from ${orderInfo.firstName} ${orderInfo.lastName} - SoftHue Studios`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=xiguagou17@gmail.com&su=${subject}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
    addOrder({
      items: items.map((i) => ({
        productId: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        ...(i.customDescription && { customDescription: i.customDescription }),
        ...(i.originalPrice && { originalPrice: i.originalPrice }),
      })),
      total: orderTotal,
    });
    updateProfile({
      firstName: orderInfo.firstName,
      lastName: orderInfo.lastName,
      email: orderInfo.email,
      phone: orderInfo.phone,
      address: orderInfo.address,
      city: orderInfo.city,
      state: orderInfo.state,
      zip: orderInfo.zip,
    });
    clearCart();
    setPlaced(true);
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header subtitle="Checkout" />
        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <p className="text-warm-gray text-lg mb-6">Your cart is empty.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </main>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen">
        <Header subtitle="Order Confirmed" />
        <main className="max-w-xl mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-xl border border-stone-200/60 p-12 shadow-sm">
            <p className="text-5xl mb-4">✓</p>
            <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">
              Thank you for your order!
            </h2>
            <p className="text-warm-gray mb-8">
              Gmail has been opened with your order details. Send the email to
              complete your order. We&apos;ll be in touch soon. You can view
              this order in your account history.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/account"
                className="px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                View Order History
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-stone-200 text-charcoal font-medium rounded-lg hover:bg-stone-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-6 py-3 text-center">
          <p className="text-charcoal font-medium tracking-wide">
            🎨 <span className="font-semibold text-amber-800">Opening Sale: 20% off sitewide! Ends 4/16</span>
          </p>
        </div>
      </div>

      <Header subtitle="Checkout" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Info */}
            <div className="space-y-6">
              <section className="bg-white rounded-xl border border-stone-200/60 p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-warm-gray mb-1">
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={orderInfo.firstName}
                        onChange={handleChange}
                        required
                        className={inputClass}
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
                        value={orderInfo.lastName}
                        onChange={handleChange}
                        required
                        className={inputClass}
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
                      value={orderInfo.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
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
                      value={orderInfo.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-stone-200/60 p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-warm-gray mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={orderInfo.address}
                      onChange={handleChange}
                      required
                      placeholder="Street address"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-warm-gray mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={orderInfo.city}
                        onChange={handleChange}
                        required
                        className={inputClass}
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
                        value={orderInfo.state}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-warm-gray mb-1">
                      ZIP code
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={orderInfo.zip}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="expeditedShipping"
                      checked={orderInfo.expeditedShipping}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-stone-200 text-terracotta focus:ring-terracotta"
                    />
                    <span className="text-charcoal">Expedited shipping</span>
                    <span className="text-warm-gray text-sm">(+$15)</span>
                  </label>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-stone-200/60 p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                  Promo Code
                </h2>
                <input
                  name="promoCode"
                  type="text"
                  value={orderInfo.promoCode}
                  onChange={handleChange}
                  placeholder="Enter promo code"
                  className={inputClass}
                />
              </section>

              <section className="bg-white rounded-xl border border-stone-200/60 p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                  Additional Notes
                </h2>
                <p className="text-warm-gray text-sm mb-4">
                  These will be included in your order email. Add any special
                  requests or notes for us.
                </p>
                <textarea
                  name="additionalNotes"
                  value={orderInfo.additionalNotes}
                  onChange={handleChange}
                  placeholder="Special instructions, gift message, timing preferences..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </section>

              <section className="bg-white rounded-xl border border-stone-200/60 p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                  Complete Your Order
                </h2>
                <p className="text-warm-gray text-sm mb-4">
                  Click &quot;Place Order&quot; to open Gmail with your order
                  details. Send the email to{" "}
                  <a
                    href="mailto:xiguagou17@gmail.com"
                    className="text-terracotta hover:underline"
                  >
                    xiguagou17@gmail.com
                  </a>{" "}
                  to place your order. Please use Gmail to send. We&apos;ll
                  confirm and arrange payment with you directly.
                </p>
              </section>
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <section className="bg-white rounded-xl border border-stone-200/60 p-6 shadow-sm md:sticky md:top-24">
                <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                  Order Summary
                </h2>
                <ul className="space-y-3 mb-6">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="text-sm text-charcoal"
                    >
                      <div className="flex justify-between">
                        <span>
                          {item.title} × {item.quantity}
                        </span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                      {item.customDescription && (
                        <p className="text-warm-gray text-xs mt-0.5 italic truncate">
                          {item.customDescription}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                {orderInfo.expeditedShipping && (
                  <p className="flex justify-between text-sm text-charcoal mb-2">
                    <span>Expedited shipping</span>
                    <span>$15</span>
                  </p>
                )}
                <p className="flex justify-between font-display font-semibold text-lg text-charcoal border-t border-stone-200 pt-4">
                  <span>Total</span>
                  <span>
                    $
                    {orderInfo.expeditedShipping
                      ? total + 15
                      : total}
                  </span>
                </p>
                <button
                  type="submit"
                  className="mt-6 w-full min-h-[48px] py-3 bg-charcoal text-cream font-medium rounded-lg hover:bg-stone-700 transition-colors touch-manipulation"
                >
                  Place Order (Send via Email)
                </button>
                <Link
                  href="/cart"
                  className="block mt-3 text-center text-warm-gray text-sm hover:text-charcoal"
                >
                  ← Back to cart
                </Link>
              </section>
            </div>
          </div>
        </form>
      </main>

      <footer className="border-t border-stone-200/60 mt-16 py-8 text-center text-warm-gray text-sm">
        © {new Date().getFullYear()} SoftHue Studios. All rights reserved.
      </footer>
    </div>
  );
}
