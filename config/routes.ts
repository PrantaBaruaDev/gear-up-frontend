import { Role } from "@/lib/types/users-type";
import { LayoutDashboardIcon, Settings, ShoppingBag, User } from "lucide-react";

export const PUBLIC_ROUTES = ["/", "/gear", "/about", "/payment"];

export const AUTH_ROUTES = ["/auth/login", "/auth/register"];


export const ROLE_BASED_ROUTES: Record<string, Role[]> = {
    "/dashboard/admin": [Role.ADMIN],
    '/dashboard/admin/category': [Role.ADMIN],
    "/dashboard/provider": [Role.PROVIDER, Role.ADMIN],
    "/dashboard/customer": [Role.CUSTOMER],
    "/profile": [Role.PROVIDER, Role.ADMIN, Role.CUSTOMER],
    "/dashboard/admin/gear": [Role.ADMIN],
    "/dashboard/provider/gear": [Role.PROVIDER],
    '/checkout': [Role.ADMIN, Role.CUSTOMER, Role.PROVIDER],
};

// Navigation items configuration
export const navItems = [
  { label: "Home", href: "/" },
  { label: "Gear", href: "/gear" },
  { label: "About", href: "/about" },
];

// User menu items configuration
export const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboardIcon, action: "dashboard" },
  { label: "Checkout", icon: ShoppingBag, action: "checkout" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];