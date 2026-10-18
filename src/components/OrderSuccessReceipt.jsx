"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatETB, formatAddisTime } from "../lib/format";
import { toCsv, downloadCsv } from "../lib/csv";

export default function OrderSuccessReceipt({ searchRef }) {
  const [order, setOrder] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = sessionStorage.getItem("last_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
  }, []);

  const reference = searchRef || order?.reference || "ABC-CONFIRMED";

  function handleExportCsv() {
    if (!order || !order.items) return;

    const rows = order.items.map((item) => ({
      OrderReference: reference,
      CustomerName: order.customer?.fullName || "",
      CustomerPhone: order.customer?.phone || "",
      DeliveryAddress: order.customer?.address || "",
      OrderDate: formatAddisTime(order.placedAt),
      ProductName: item.name,
      Category: item.category,
      UnitPriceETB: item.price,
      Quantity: item.quantity,
      LineTotalETB: item.price * item.quantity,
    }));

    // Add delivery row
    rows.push({
      OrderReference: reference,
      CustomerName: order.customer?.fullName || "",
      CustomerPhone: order.customer?.phone || "",
      DeliveryAddress: order.customer?.address || "",
      OrderDate: formatAddisTime(order.placedAt),
      ProductName: "Delivery Fee (Addis Ababa)",
      Category: "Service",
      UnitPriceETB: order.deliveryFee || 100,
      Quantity: 1,
      LineTotalETB: order.deliveryFee || 100,
    });

    const csvContent = toCsv(rows);
    downloadCsv(csvContent, `AddisBean-${reference}.csv`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 text-2xl font-bold mb-3">
          ✓
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900">Order Confirmed!</h1>
        <p className="text-stone-600 mt-2">
          Thank you for choosing Addis Bean Co. Your freshly roasted beans are being prepared.
        </p>
        <div className="mt-4 inline-block bg-amber-50 border border-amber-300 rounded-lg px-4 py-2 text-sm text-amber-950 font-mono font-bold">
          Reference: {reference}
        </div>
      </div>

      {mounted && order ? (
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-stone-200 text-sm">
            <div>
              <h2 className="font-bold text-stone-900 mb-2">Delivery Information</h2>
              <p className="text-stone-700"><strong>Name:</strong> {order.customer?.fullName}</p>
              <p className="text-stone-700"><strong>Phone:</strong> {order.customer?.phone}</p>
              <p className="text-stone-700"><strong>Address:</strong> {order.customer?.address}</p>
            </div>
            <div>
              <h2 className="font-bold text-stone-900 mb-2">Order Summary</h2>
              {/* Day 46 & 47: Native browser Intl.DateTimeFormat with Addis Ababa timezone */}
              <p className="text-stone-700">
                <strong>Placed:</strong> {formatAddisTime(order.placedAt) || "Just now"}
              </p>
              <p className="text-stone-700">
                <strong>Payment Method:</strong> Cash on Delivery
              </p>
              <p className="text-stone-700">
                <strong>City:</strong> Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          {/* Day 46 & 47: Semantic HTML Table for order line items */}
          {order.items && order.items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <caption className="sr-only">Order Confirmation Line Items</caption>
                <thead>
                  <tr className="border-b border-stone-200 text-stone-600">
                    <th scope="col" className="py-2.5 px-2 font-semibold">
                      Coffee Roast
                    </th>
                    <th scope="col" className="py-2.5 px-2 font-semibold text-center">
                      Unit Price
                    </th>
                    <th scope="col" className="py-2.5 px-2 font-semibold text-center">
                      Qty
                    </th>
                    <th scope="col" className="py-2.5 px-2 font-semibold text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {order.items.map((item) => (
                    <tr key={item.id} className="text-stone-800">
                      <td className="py-3 px-2 font-medium">
                        {item.name}
                        <span className="block text-xs text-stone-500">{item.category}</span>
                      </td>
                      <td className="py-3 px-2 text-center text-stone-600">
                        {formatETB(item.price)}
                      </td>
                      <td className="py-3 px-2 text-center">{item.quantity}</td>
                      <td className="py-3 px-2 text-right font-semibold text-stone-900">
                        {formatETB(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-stone-200 text-stone-600">
                    <th scope="row" colSpan={3} className="py-2 px-2 text-right font-medium">
                      Subtotal
                    </th>
                    <td className="py-2 px-2 text-right font-medium">
                      {formatETB(order.subtotal || order.total - 100)}
                    </td>
                  </tr>
                  <tr className="text-stone-600">
                    <th scope="row" colSpan={3} className="py-2 px-2 text-right font-medium">
                      Delivery Fee (Addis Ababa)
                    </th>
                    <td className="py-2 px-2 text-right font-medium">
                      {formatETB(order.deliveryFee || 100)}
                    </td>
                  </tr>
                  <tr className="border-t border-stone-300 text-stone-900 text-base font-extrabold">
                    <th scope="row" colSpan={3} className="py-3 px-2 text-right">
                      Total Due on Delivery
                    </th>
                    <td className="py-3 px-2 text-right text-amber-900">
                      {formatETB(order.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Day 47 CSV Export */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-3 justify-between items-center">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold px-4 py-2.5 rounded-md min-h-[44px] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              📄 Download Receipt (CSV)
            </button>
            <p className="text-xs text-stone-500">
              Please have exact cash ready upon delivery.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg p-6 text-center text-sm text-stone-600">
          <p>
            Your order has been recorded with reference <strong>{reference}</strong>.
            Our team will contact you prior to delivery.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/products"
          className="bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-md min-h-[44px] inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-900"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

