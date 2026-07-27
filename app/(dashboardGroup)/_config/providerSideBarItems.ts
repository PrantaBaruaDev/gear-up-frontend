import { NavGroup } from "@/lib/types/navbar-types";
import { List, PlusCircle, ShoppingBasket, UserCheck } from "lucide-react";

export const PROVIDER_SIDEBAR_ITEMS: NavGroup[] = [
  {
    groupLabel: "Dashboards",
    items: [
      { title: "Provider Dashboard", url: "/provider-dashboard", icon: UserCheck },
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
            url: `/provider-dashboard/gear-item`,
            icon: List,
          },
          {
            title: "Create Gear",
            url: `/provider-dashboard/gear-item/create`,
            icon: PlusCircle,
          },
        ],
      },
    ],
  },
];
