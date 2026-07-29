import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import RevalidateOrders from "../../_components/payment/RevalidateOrders";

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto min-h-screen p-6 text-center">
      <RevalidateOrders />

      <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Thank you for your order. Your transaction has been completed.
      </p>

      {session_id && (
        <div className="mt-4 p-3 bg-muted rounded-lg border text-xs font-mono text-muted-foreground">
          Session ID: {session_id}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Link
          href="/dashboard/customer/orders"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}