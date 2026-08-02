import { getRentalOrders } from "@/app/(dashboardGroup)/_action/RentalOrdersAction";
import { RentalOrder } from "@/lib/types/gear-order-type";
import {OrderListPageComponent} from "@/app/(dashboardGroup)/_components/orders/orders-table";

export default async function OrderListPage() {
  const result = await getRentalOrders();

  const orders: RentalOrder[] = Array.isArray(result?.data)
    ? result.data : [];

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
      <OrderListPageComponent 
        orders={orders} 
        userRole="ADMIN" 
      />
    </div>
  );
}
