import Link from "next/link";
import Image from "next/image";
import { products } from "../../data/products";
import AddToCartButton from "../../components/AddToCartButton";
import { formatETB } from "../../lib/format";

export const metadata = {
  title: "Coffee Catalogue",
  description: "Browse our single-origin and natural process Ethiopian specialty coffee beans.",
};

const CATEGORIES = ["all", "Single Origin", "Natural Process", "Traditional"];
const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A–Z" },
];

function buildQuery(cat, srt) {
  const params = new URLSearchParams();
  if (cat && cat !== "all") params.set("category", cat);
  if (srt && srt !== "featured") params.set("sort", srt);
  const q = params.toString();
  return q ? `/products?${q}` : "/products";
}

export default function ProductsPage({ searchParams }) {
  const category = searchParams?.category || "all";
  const sort = searchParams?.sort || "featured";

  // Filter by category
  let list = category === "all" ? [...products] : products.filter((p) => p.category === category);

  // Sort per URL query state
  if (sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default: featured items first
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-stone-900">Coffee Catalogue</h1>
        <p className="text-stone-600 mt-1">Single-origin and traditionally roasted Ethiopian beans.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
        <div>
          <span className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
            Filter by Category
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <Link
                  key={cat}
                  href={buildQuery(cat, sort)}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900 ${
                    active ? "bg-amber-900 text-white" : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                  }`}
                >
                  {cat === "all" ? "All Coffees" : cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sort options */}
        <div>
          <span className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
            Sort by
          </span>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => {
              const active = sort === opt.id;
              return (
                <Link
                  key={opt.id}
                  href={buildQuery(category, opt.id)}
                  className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold min-h-[44px] border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900 ${
                    active
                      ? "border-amber-900 bg-amber-50 text-amber-900"
                      : "border-stone-300 bg-white hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((product) => (
          <article
            key={product.id}
            className="border border-stone-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full bg-stone-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              {product.featured && (
                <span className="absolute top-2 right-2 bg-amber-900 text-amber-50 text-xs px-2.5 py-1 rounded font-bold shadow">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4 flex-grow">
              <span className="text-xs uppercase text-amber-800 font-bold">{product.category}</span>
              <h2 className="font-bold text-lg mt-1">
                <Link
                  href={`/products/${product.id}`}
                  className="hover:text-amber-800 focus:outline-none focus:underline"
                >
                  {product.name}
                </Link>
              </h2>
              <p className="text-stone-600 text-sm mt-2 line-clamp-2">{product.description}</p>
            </div>
            <div className="p-4 pt-0">
              <div className="flex justify-between items-center mb-4">
                <p className="font-extrabold text-stone-900 text-lg">{formatETB(product.price)}</p>
                {!product.available && (
                  <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    Out of stock
                  </span>
                )}
              </div>
              <AddToCartButton product={product} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
