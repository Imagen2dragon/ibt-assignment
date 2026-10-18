"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems, isLoaded } = useCart();

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-extrabold text-xl tracking-tight text-amber-950 min-h-[44px] inline-flex items-center rounded focus:outline-none focus:ring-2 focus:ring-amber-900"
        >
          Addis Bean Co.
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/products"
            className="text-stone-700 hover:text-amber-950 font-medium px-3 py-2 min-h-[44px] inline-flex items-center rounded focus:outline-none focus:ring-2 focus:ring-amber-900"
          >
            Catalogue
          </Link>
          <Link
            href="/cart"
            aria-label={`Shopping cart containing ${isLoaded ? totalItems : 0} items`}
            className="flex items-center gap-2 bg-amber-900 text-white px-4 py-2 rounded-md hover:bg-amber-800 min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900 focus:ring-offset-2"
          >
            <span>Cart</span>
            <span className="bg-amber-100 text-amber-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {isLoaded ? totalItems : 0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
