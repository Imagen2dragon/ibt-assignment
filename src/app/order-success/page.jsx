import OrderSuccessReceipt from "../../components/OrderSuccessReceipt";

export const metadata = {
  title: "Order Confirmed",
  description: "Your Addis Bean Co. order has been received and confirmed.",
};

export default function OrderSuccessPage({ searchParams }) {
  const ref = searchParams?.ref || "";
  return <OrderSuccessReceipt searchRef={ref} />;
}
