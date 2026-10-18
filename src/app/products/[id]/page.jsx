import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import { formatETB } from "../../../lib/format";
import AddToCartButton from "../../../components/AddToCartButton";

import Link from "next/link";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · Addis Bean Co.`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  // Day 44: JSON-LD Schema.org Product structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ETB",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6">
        <Link
          href="/products"
          className="text-amber-900 hover:text-amber-800 font-semibold inline-flex items-center gap-1 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-900 rounded px-1"
        >
          ← Back to Catalogue
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase text-amber-800">{product.category}</span>
          <h1 className="text-3xl font-extrabold text-stone-900 mt-2">{product.name}</h1>
          <p className="text-2xl font-extrabold text-stone-900 mt-4">{formatETB(product.price)}</p>
          <p className="text-stone-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
