// config/routes.ts (or inside proxy.ts)

import { Role } from "@/lib/types/users-type";

// 1. Routes accessible without authentication
export const PUBLIC_ROUTES = ["/", "/news", "/about", "/contact"];

// 2. Auth routes (login/register) - redirected away if logged in
export const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

// 3. Centralized Role-Based Access Control Map
// Define paths and allowed roles for each section
export const ROLE_BASED_ROUTES: Record<string, Role[]> = {
    "/admin-dashboard": [Role.ADMIN],
    "/provider-dashboard": [Role.PROVIDER, Role.ADMIN],
    "/dashboard": [Role.CUSTOMER],
    "/profile": [Role.PROVIDER, Role.ADMIN, Role.CUSTOMER],
    "/admin-dashboard/gear-item": [Role.ADMIN],
    "/provider-dashboard/gear-item": [Role.PROVIDER],
};