import { getRentalOrders } from "@/app/(dashboardGroup)/_action/RentalOrdersAction";
import { RentalOrder } from "@/lib/types/gear-order-type";
import PaymentsHistoryPage from "@/app/(dashboardGroup)/dashboard/customer/payments/page";
import { OrderListPageComponent } from "../../_components/orders/orders-table";
import { Role } from "@/lib/types/users-type";


export default async function CustomerDashboardPage() {
  const result = await getRentalOrders();

  const orders: RentalOrder[] = Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result?.data?.data)
    ? result.data.data
    : [];

  if (!result?.success || orders.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <p className="py-12 text-center text-muted-foreground border rounded-lg bg-card">
          {result?.message || "No rental orders found."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <OrderListPageComponent
          orders={orders}
          userRole={Role.CUSTOMER} 
        />
      </div>
      <div>
        <PaymentsHistoryPage />
      </div>

    </div>
  );
}