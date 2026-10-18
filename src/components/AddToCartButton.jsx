"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    if (!product.available) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!product.available}
      className={`w-full py-2.5 px-4 rounded-md font-semibold text-sm transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-900 focus:ring-offset-2 ${
        !product.available ? "bg-stone-200 text-stone-500 cursor-not-allowed" :
        justAdded ? "bg-emerald-700 text-white" :
        "bg-amber-900 hover:bg-amber-800 text-white"
      }`}
    >
      {!product.available ? "Out of Stock" : justAdded ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
