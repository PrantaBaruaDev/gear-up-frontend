"use client";

import { useEffect } from "react";
import { clearRentalOrdersCache } from "../../_action/PaymentAction";

export default function RevalidateOrders() {
  useEffect(() => {
    clearRentalOrdersCache();
  }, []);

  return null;
}