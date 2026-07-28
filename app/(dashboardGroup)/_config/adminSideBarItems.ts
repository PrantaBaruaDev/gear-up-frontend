import { NavGroup } from "@/lib/types/navbar-types";
import { List, PlusCircle, ShieldAlert, ShoppingBasket } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: NavGroup[] = [
    {
        groupLabel: "Dashboards",
        items: [
        { title: "Admin Dashboard", url: "/dashboard/admin", icon: ShieldAlert },
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
                        url: `/dashboard/admin/category-item`,
                        icon: List,
                    },
                    {
                        title: "Create Gear",
                        url: `/dashboard/admin/category-item/create`,
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
                        url: `/dashboard/admin/gear`,
                        icon: List,
                    },
                    {
                        title: "Create Gear",
                        url: `/dashboard/admin/gear/create`,
                        icon: PlusCircle,
                    },
                ],
            },
        ],
    },
];
