# Addis Bean Co. — Specialty Ethiopian Coffee Store

A full-featured, responsive, accessible, and high-performance **Next.js 14 App Router** web application built for the **IBT College • CodeOps Curriculum** (Module 3 Capstone, Days 42–50).

---

## 1. Project Overview & Audience

* **Audience Statement:** *"Our store helps coffee enthusiasts in Addis Ababa find and buy freshly roasted, single-origin Ethiopian coffee beans with reliable Cash-on-Delivery."*
* **Core Value Proposition:** Single-origin, natural process, and traditional micro-lot coffee beans direct from Yirgacheffe, Sidama, Guji, Harar, and Kaffa.
* **Payment Scope:** In strict accordance with the Module 3 specification, this store operates on **Cash-on-Delivery (COD)**. No sensitive credit card details, CVVs, or bank PINs are requested or stored.

---

## 2. Complete Customer Journey

```
Home (/) ──► Catalogue (/products) ──► Product Detail (/products/[id])
                                                │
                                                ▼
Order Confirmed (◄── Checkout Form (◄── Shopping Cart (/cart)
/order-success)      /checkout)
```

1. **Home (`/`):** Hero section with above-the-fold image (`priority`), brand mission, and featured harvests.
2. **Catalogue (`/products`):** 10 authentic Ethiopian coffee roasts with URL-driven filtering (`?category=...`) and sorting (`?sort=...`).
3. **Product Detail (`/products/[id]`):** In-depth flavor notes, pricing, stock status, JSON-LD Schema.org structured data, and Add-to-Cart action.
4. **Shopping Cart (`/cart`):** Semantic `<table>` layout with quantity updates (`+` / `-`), item removal, live ETB subtotal, and empty-state messaging.
5. **Checkout & Delivery (`/checkout`):** Full name, Ethiopian phone number (`type="tel" inputMode="numeric"`), delivery address, double-submit protection, and order review.
6. **Order Confirmation (`/order-success`):** Confirmation reference, Addis Ababa delivery time (`Intl.DateTimeFormat`), order line items `<table>`, and one-click **CSV Receipt Export**.

---

## 3. Technology Stack & Curriculum Principles

* **Framework:** Next.js 14.2 (App Router with Server Components by default)
* **Styling:** Tailwind CSS (Mobile-first responsive design, accessible contrast, 44×44px touch targets)
* **Fonts:** `Inter` self-hosted via `next/font/google` (`display: "swap"`, zero Cumulative Layout Shift)
* **Images:** `next/image` with local assets in `public/images/`, responsive `sizes`, and single `priority` hero.
* **SEO & Metadata:** Dynamic `robots.js` (blocking `/cart` & `/checkout`), dynamic `sitemap.js`, and JSON-LD `Product` schema.
* **Formatting:** Native browser `Intl` APIs (`Intl.NumberFormat` for ETB, `Intl.DateTimeFormat` with `timeZone: "Africa/Addis_Ababa"`). Zero external date/money dependencies.

---

## 4. Project Directory Structure

```
addis-bean-store/
├── public/
│   └── images/                    # Local optimized JPEG assets for all 10 products + hero
├── src/
│   ├── app/
│   │   ├── layout.jsx             # Root layout: Inter font, CartProvider, metadataBase
│   │   ├── page.jsx               # Home page (Server Component)
│   │   ├── not-found.jsx          # Custom branded 404 page
│   │   ├── robots.js              # Dynamic robots.txt generator
│   │   ├── sitemap.js             # Dynamic sitemap.xml generator
│   │   ├── products/
│   │   │   ├── page.jsx           # Catalog page (URL-driven state)
│   │   │   └── [id]/page.jsx      # Product detail (SSG + JSON-LD)
│   │   ├── cart/
│   │   │   └── page.jsx           # Server component delegating to CartView
│   │   ├── checkout/
│   │   │   └── page.jsx           # Server component delegating to CheckoutForm
│   │   └── order-success/
│   │       └── page.jsx           # Server component delegating to OrderSuccessReceipt
│   ├── components/
│   │   ├── AddToCartButton.jsx    # Client leaf for adding items with feedback
│   │   ├── CartView.jsx           # Client leaf for cart table and quantities
│   │   ├── CheckoutForm.jsx       # Client leaf for accessible form & pending state
│   │   ├── Navbar.jsx             # Accessible header with live cart count badge
│   │   ├── OrderSuccessReceipt.jsx# Client leaf for receipt table & CSV export
│   │   └── ProductCard.jsx        # Reusable Server Component for product cards
│   ├── context/
│   │   └── CartContext.jsx        # React Context + localStorage persistence
│   ├── data/
│   │   └── products.js            # Single source of truth (10 coffee objects)
│   └── lib/
│       ├── csv.js                 # Pure helper to generate and trigger CSV downloads
│       └── format.js              # Native Intl currency and Addis Ababa time formatters
├── .env.example                   # Safe environment variable documentation
├── PERF.md                        # Core Web Vitals and performance test report
└── README.md                      # Comprehensive project documentation
```

---
