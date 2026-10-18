import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s · Addis Bean Co.",
    default: "Addis Bean Co. — Specialty Ethiopian Coffee",
  },
  description: "Freshly roasted Ethiopian coffee beans delivered in Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="border-t border-stone-200 bg-stone-100 py-8 text-center text-sm text-stone-600 mt-12">
            <p className="font-semibold text-stone-800">Addis Bean Co. • Addis Ababa, Ethiopia</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
