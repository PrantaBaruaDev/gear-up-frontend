import { NavGroup } from "@/lib/types/navbar-types";
import { List, PlusCircle, ShieldAlert, ShoppingBasket } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: NavGroup[] = [
    {
        groupLabel: "Dashboards",
        items: [
        { title: "Admin Dashboard", url: "/admin-dashboard", icon: ShieldAlert },
        ],
    },
    {
        groupLabel: "Management",
        items: [
            {
                title: "Category",
                icon: ShoppingBasket,
                children: [
                    {
                        title: "Category Item List",
                        url: `/admin-dashboard/category-item`,
                        icon: List,
                    },
                    {
                        title: "Create Gear",
                        url: `/admin-dashboard/category-item/create`,
                        icon: PlusCircle,
                    },
                ],
            },
            {
                title: "Gears",
                icon: ShoppingBasket,
                children: [
                    {
                        title: "Gear Item List",
                        url: `/admin-dashboard/gear-item`,
                        icon: List,
                    },
                    {
                        title: "Create Gear",
                        url: `/admin-dashboard/gear-item/create`,
                        icon: PlusCircle,
                    },
                ],
            },
        ],
    },
];
