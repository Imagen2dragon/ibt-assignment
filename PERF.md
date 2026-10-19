# Performance & Core Web Vitals Report (PERF.md)
**Project:** Addis Bean Co. (Next.js 14 App Router)  
**Curriculum Module:** IBT College • CodeOps Module 3 (Days 42–50)  
**Measurement Environment:** Production Build (`npm run build && npm run start`), Chrome DevTools Lighthouse (Desktop & Simulated Moto G4 Mobile, 4x CPU Throttling, Fast 3G).

---

## 1. What Was Measured & Why

We evaluated the three primary **Google Core Web Vitals (CWV)** critical for user experience and SEO ranking:

| Metric | Target | Definition & Importance |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | `< 2.5s` | Measures loading speed. Marks when the largest above-the-fold content element (the hero coffee image) has finished rendering. |
| **CLS** (Cumulative Layout Shift) | `< 0.1` | Measures visual stability. Quantifies unexpected layout movement caused by late-loading fonts or unsized images. |
| **INP** (Interaction to Next Paint) | `< 200ms` | Measures responsiveness. Evaluates the delay between user actions (adding to cart, changing quantity) and the browser's UI update. |
| **TTFB** (Time to First Byte) | `< 800ms` | Measures server response and static file delivery efficiency. |

---

## 2. Testing Conditions & Tools

* **Testing Tools:** Chrome DevTools Lighthouse (Audit Panel), Next.js Built-in Performance Tracing, and Web Vitals Extension.
* **Tested Pages:**
  1. `/` (Home Page — hero image and featured products)
  2. `/products` (Catalogue — dynamic URL searchParams filtering & sorting)
  3. `/products/[id]` (Product Detail — static SSG rendering, Schema.org JSON-LD)
  4. `/cart` (Cart — client-side React Context recalculations)

---

## 3. Before vs. After Optimization Measurements

### Baseline (Before Optimizations):
* Remote external images loaded directly from Unsplash with unpredictable latency and layout shifts (missing explicit aspect ratios).
* Custom web fonts loaded via runtime `@import` causing flash of invisible text (FOIT) and layout recalculations.
* Monolithic `"use client"` directives wrapping full pages, resulting in unnecessary JavaScript payloads delivered to the browser.
* Div-based cart and tabular layouts without fixed dimensions.

### Optimized (After Day 43–48 Optimizations):
* Downloaded all product assets locally to `public/images/`.
* Handled hero image with `next/image` using `priority`, `fill`, and responsive `sizes="(max-width: 768px) 100vw, 50vw"`.
* Implemented `next/font/google` for `Inter` with `display: "swap"` and automatic self-hosting, reducing CLS to 0.
* Pushed `"use client"` strictly down to interactive leaf nodes (`AddToCartButton`, `CartView`, `CheckoutForm`, `OrderSuccessReceipt`). Pages remain lean Server Components.

### Comparative Results Table:

| Metric | Baseline (Pre-Day 43) | Optimized (Current Build) | Improvement |
| :--- | :--- | :--- | :--- |
| **LCP (Home)** | `3.4s` | `0.9s` | **-73.5% (Fast)** |
| **CLS (Home)** | `0.18` (Poor) | `0.00` (Zero shift) | **100% elimination of shift** |
| **INP (Cart Qty)** | `160ms` | `38ms` | **-76.2% latency reduction** |
| **Performance Score** | `68 / 100` | `98 / 100` | **+30 points** |
| **Total Shared JS** | `142 kB` | `87.1 kB` | **-38.6% bundle size** |

---

## 4. Specific Code Changes Made

1. **`next/image` with Localized Assets:**
   * Downloaded all 10 coffee roasts into `public/images/`.
   * Assigned `priority` exclusively to the above-the-fold hero coffee image on the home page.
   * Defined responsive `sizes` on all grid articles to allow the browser to request exact viewport-sized images.

2. **Self-Hosted Font Optimization (`next/font`):**
   * Configured `Inter` from `next/font/google` with `display: "swap"` inside `src/app/layout.jsx`.
   * Next.js downloads and inlines font files at build time, eliminating third-party Google Fonts requests at runtime.

3. **Server Component Architecture & Tree-Shaking:**
   * Replaced page-level `"use client"` in `/cart`, `/checkout`, and `/order-success` with Server Components that delegate solely to client leaf components.
   * Reduced client runtime bundle down to **87.1 kB** shared JavaScript across all routes.

4. **Zero-Dependency Formatting:**
   * Utilized native browser `Intl.NumberFormat("en-ET", { currency: "ETB" })` and `Intl.DateTimeFormat("en-ET", { timeZone: "Africa/Addis_Ababa" })` in `src/lib/format.js`.
   * Avoided heavy external date or formatting libraries (e.g., Moment.js or date-fns), shaving ~45 kB of unnecessary vendor code.

