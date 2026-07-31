import { NavGroup } from "@/lib/types/navbar-types";
import { List, PlusCircle, ShieldAlert, ShoppingBasket } from "lucide-react";

const BASE_ROUTE = '/dashboard/admin';

export const ADMIN_SIDEBAR_ITEMS: NavGroup[] = [
    {
        groupLabel: "Dashboards",
        items: [
            { title: "Admin Dashboard", url: `${BASE_ROUTE}`, icon: ShieldAlert },
        ],
    },
    {
        groupLabel: "Management",
        
        items: [
            {
                title: "Category Item List",
                url: `${BASE_ROUTE}/category`,
                icon: List,
            },
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
                        url: `${BASE_ROUTE}/gear/new`,
                        icon: PlusCircle,
                    },
                ],
            },
            { title: "Rental Orders List", url: `${BASE_ROUTE}/orders`, icon: List },
        ],
    },
];
