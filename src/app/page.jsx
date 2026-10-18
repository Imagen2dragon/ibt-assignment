import Image from "next/image";
import Link from "next/link";
import { products } from "../data/products";
import AddToCartButton from "../components/AddToCartButton";
import { formatETB } from "../lib/format";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      <section className="bg-amber-950 text-amber-50 py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">Freshly Roasted Specialty Coffee in Addis Ababa.</h1>
            <p className="mt-4 text-amber-200 text-lg">Directly sourced from Yirgacheffe, Sidama, and Guji.</p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-md min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-amber-800">
            <Image
              src="/images/hero-coffee.jpg"
              alt="Fresh Ethiopian coffee beans"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">Featured Harvests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <article key={product.id} className="border border-stone-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
              <div className="relative aspect-[4/3] w-full bg-stone-100">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="font-bold text-lg"><Link href={`/products/${product.id}`}>{product.name}</Link></h3>
                <p className="text-stone-600 text-sm mt-2">{product.description}</p>
              </div>
              <div className="p-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-extrabold text-stone-900">{formatETB(product.price)}</span>
                </div>
                <AddToCartButton product={product} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
