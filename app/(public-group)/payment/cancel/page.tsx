import Link from "next/link";
import { CheckCircle2, CircleX } from "lucide-react";

interface FailedPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentCancelPage({ searchParams }: FailedPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto min-h-screen p-6 text-center">
      <div className="p-4 bg-red-100 rounded-full text-red-600 mb-4">
        <CircleX className="w-12 h-12" />
      </div>

      <h1 className="text-2xl font-bold">Payment Cancel or Fail!</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Your payment transaction has been failed and cancel.
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