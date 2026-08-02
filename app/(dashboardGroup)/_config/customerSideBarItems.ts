import { NavGroup } from "@/lib/types/navbar-types";
import { HomeIcon, List, PlusCircle, ShoppingBasket } from "lucide-react";
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSideBarItems";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSideBarItems";

const BASE_ROUTE = '/dashboard/customer';

const CUSTOMER_SIDEBAR_ITEMS: NavGroup[] = [
    {
      groupLabel: "Dashboards",
      items: [
        { title: "Dashboard", url: `${BASE_ROUTE}`, icon: HomeIcon },
      ], 
    },
    {
      groupLabel: "Management",
      items: [
        { title: "Rental Orders List", url: `${BASE_ROUTE}/orders`, icon: List },
        { title: "Payment History", url: `${BASE_ROUTE}/payments`, icon: List },
      ],
    },
];

export const sidebarMenuItems = {
    CUSTOMER : CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER : PROVIDER_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}