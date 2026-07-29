import { NavGroup } from "@/lib/types/navbar-types";
import { List, PlusCircle, ShoppingBasket, UserCheck } from "lucide-react";

const BASE_ROUTE = '/dashboard/provider';

export const PROVIDER_SIDEBAR_ITEMS: NavGroup[] = [
  {
    groupLabel: "Dashboards",
    items: [
      { title: "Provider Dashboard", url: `${BASE_ROUTE}`, icon: UserCheck },
    ],
  },
  {
    groupLabel: "Management",
    items: [
      {
        title: "Gears",
        icon: ShoppingBasket,
        children: [
          {
            title: "Gear Item List",
            url: `${BASE_ROUTE}/gear`,
            icon: List,
          },
          {
            title: "Create Gear",
            url: `${BASE_ROUTE}/gear/create`,
            icon: PlusCircle,
          },
        ],
      },
      {
        title: "Orders",
        icon: ShoppingBasket,
        children: [
          {
            title: "Orders List",
            url: `${BASE_ROUTE}/orders`,
            icon: List,
          },
          {
            title: "Create Gear",
            url: `${BASE_ROUTE}/orders/create`,
            icon: PlusCircle,
          },
        ],
      },
    ],
  },
];
