import React from "react";
import { IPayment } from "@/lib/types/payment-type";
import { getAllPayments } from "@/app/(dashboardGroup)/_action/payment";
import PaymentsHistoryListPage from "@/app/(dashboardGroup)/_components/payment/payment-table-list";

export default async function PaymentsHistoryPage() {
  const result = await getAllPayments();
  const payments: IPayment[] = Array.isArray(result?.data) ? result.data : [];
  

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PaymentsHistoryListPage payments={payments} />
    </div>
  );
}