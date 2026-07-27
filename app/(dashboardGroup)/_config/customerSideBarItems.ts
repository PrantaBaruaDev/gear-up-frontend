import { NavGroup } from "@/lib/types/navbar-types";
import { HomeIcon, List, PlusCircle, ShoppingBasket } from "lucide-react";
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSideBarItems";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSideBarItems";


const CUSTOMER_SIDEBAR_ITEMS: NavGroup[] = [
    {
      groupLabel: "Dashboards",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: HomeIcon },
      ], 
    },
    {
      groupLabel: "Management",
      items: [
        {
          title: "Gears",
          icon: ShoppingBasket,
          children: [
            { title: "Gear Item List", url: `/dashboard/gear-item`, icon: List },
            { title: "Create Gear", url: `/dashboard/gear-item/create`, icon: PlusCircle },
          ],
        },
      ],
    },
];

export const sidebarMenuItems = {
    CUSTOMER : CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER : PROVIDER_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}