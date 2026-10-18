"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { formatETB } from "../lib/format";

export default function CartView() {
  const { cart, updateQuantity, removeFromCart, subtotal, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-stone-600">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <h1 className="text-3xl font-extrabold text-stone-900">Your cart is empty</h1>
        <p className="text-stone-600 mt-3">
          Explore our single-origin and natural process Ethiopian roasts.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-md min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-stone-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Day 46 & 47: Semantic HTML Table with thead and th scope="col" */}
        <div className="lg:col-span-2 overflow-x-auto bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">Shopping Cart Items</caption>
            <thead>
              <tr className="border-b border-stone-200 text-stone-600 text-sm">
                <th scope="col" className="py-3 px-2 font-semibold">
                  Product
                </th>
                <th scope="col" className="py-3 px-2 font-semibold text-center">
                  Unit Price
                </th>
                <th scope="col" className="py-3 px-2 font-semibold text-center">
                  Quantity
                </th>
                <th scope="col" className="py-3 px-2 font-semibold text-right">
                  Total
                </th>
                <th scope="col" className="py-3 px-2 font-semibold text-center">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {cart.map((item) => (
                <tr key={item.id} className="text-stone-800">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/products/${item.id}`}
                          className="font-bold text-stone-900 hover:text-amber-900 focus:outline-none focus:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-stone-500 uppercase tracking-wider">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center text-sm font-medium">
                    {formatETB(item.price)}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="inline-flex items-center border border-stone-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity for ${item.name}`}
                        className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100 transition-colors rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold text-sm" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity for ${item.name}`}
                        className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100 transition-colors rounded-r-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-stone-900">
                    {formatETB(item.price * item.quantity)}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="inline-flex items-center justify-center text-rose-700 hover:text-rose-900 hover:underline text-sm font-semibold min-h-[44px] min-w-[44px] px-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <aside className="bg-white p-6 border border-stone-200 rounded-lg h-fit shadow-sm">
          <h2 className="font-bold text-xl text-stone-900 mb-4 pb-2 border-b border-stone-100">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Items Total ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
              <span>{formatETB(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery (Addis Ababa)</span>
              <span className="text-stone-700 font-medium">{formatETB(100)}</span>
            </div>
          </div>
          <div className="flex justify-between font-extrabold text-lg mt-4 pt-4 border-t border-stone-200 text-stone-900">
            <span>Estimated Total</span>
            <span>{formatETB(subtotal + 100)}</span>
          </div>
          <p className="text-xs text-stone-500 mt-2">
            Payment Method: Cash-on-Delivery (pay when your beans arrive).
          </p>
          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded-md font-semibold min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900"
          >
            Proceed to Checkout
          </Link>
          <div className="mt-4 text-center">
            <Link
              href="/products"
              className="text-sm text-stone-600 hover:text-amber-900 inline-block min-h-[44px] py-2.5 focus:outline-none focus:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

