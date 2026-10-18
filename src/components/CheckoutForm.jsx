"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { formatETB } from "../lib/format";

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, subtotal, clearCart, isLoaded } = useCart();
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "" });
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isLoaded) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center text-stone-600">
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="text-stone-600 mt-2">Add items to your cart before proceeding to checkout.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-md min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-900"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const deliveryFee = 100;
  const grandTotal = subtotal + deliveryFee;

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage("Please fill out all required delivery fields.");
      return;
    }

    // Day 48: Prevent double submits with pending state
    setIsPending(true);

    const order = {
      reference: `ABC-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      },
      items: cart,
      subtotal,
      deliveryFee,
      total: grandTotal,
      placedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("last_order", JSON.stringify(order));
      clearCart();
      router.push(`/order-success?ref=${encodeURIComponent(order.reference)}`);
    } catch {
      setErrorMessage("Could not save your order. Please try again.");
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          href="/cart"
          className="text-amber-900 hover:text-amber-800 font-semibold inline-flex items-center min-h-[44px] focus:outline-none focus:underline"
        >
          ← Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold text-stone-900 mb-2">Checkout & Delivery</h1>
      <p className="text-stone-600 mb-8">
        We deliver freshly roasted beans directly to your door anywhere in Addis Ababa.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium"
            >
              {errorMessage}
            </div>
          )}

          {/* Day 48: <form onSubmit={...}> (never onClick on submit) */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-6 rounded-lg border border-stone-200 shadow-sm"
          >
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-stone-800 mb-1">
                Full Name <span className="text-rose-700">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Abebe Bikila"
                className="w-full border border-stone-300 rounded-md p-3 min-h-[44px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-stone-800 mb-1">
                Phone Number <span className="text-rose-700">*</span>
              </label>
              {/* Day 48: type="tel" and inputMode="numeric" */}
              <input
                id="phone"
                name="phone"
                required
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0911234567"
                className="w-full border border-stone-300 rounded-md p-3 min-h-[44px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              />
              <span className="text-xs text-stone-500 mt-1 block">
                Used by the courier for delivery coordination.
              </span>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-stone-800 mb-1">
                Delivery Address in Addis Ababa <span className="text-rose-700">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                autoComplete="street-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Sub-city, Woreda, Landmark or House Number (e.g. Bole Medhanialem, near Edna Mall)"
                className="w-full border border-stone-300 rounded-md p-3 min-h-[44px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              ></textarea>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-900 mb-4">
                <strong>Cash on Delivery:</strong> No card or online payment required. Inspect your beans and pay our courier in cash upon arrival.
              </div>

              {/* Day 48: Disabled while pending to prevent double-submits */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3.5 px-4 rounded-md font-bold text-white min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900 ${
                  isPending
                    ? "bg-stone-400 cursor-not-allowed"
                    : "bg-amber-900 hover:bg-amber-800"
                }`}
              >
                {isPending ? "Submitting Order Request..." : "Confirm Order (Cash on Delivery)"}
              </button>
            </div>
          </form>
        </div>

        {/* Order review sidebar */}
        <aside className="bg-white p-5 border border-stone-200 rounded-lg h-fit shadow-sm text-stone-800 text-sm">
          <h2 className="font-bold text-base mb-3 pb-2 border-b border-stone-100">Order Items</h2>
          <ul className="divide-y divide-stone-100 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between gap-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold">{formatETB(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 pt-2 border-t border-stone-200">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{formatETB(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span>{formatETB(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-base pt-2 border-t border-stone-100 text-stone-900">
              <span>Total Due</span>
              <span>{formatETB(grandTotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

