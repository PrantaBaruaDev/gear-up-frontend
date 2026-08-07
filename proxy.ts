import { NextResponse, NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';
import { PUBLIC_ROUTES, AUTH_ROUTES, ROLE_BASED_ROUTES } from './config/routes';


export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken 
        ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) 
        : null;

    const decodedRefreshToken = refreshToken 
        ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) 
        : null;

    // 1. Refresh Token Strategy
    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    // Clear stale cookie if token remains invalid
    if (!decodedAccessToken?.success) {
        cookieStore.delete("accessToken");
        accessToken = undefined;
    }

    // Extract user role
    const userRole = (decodedAccessToken?.data as JwtPayload)?.role ?? null;

    // 2. Redirect authenticated users away from Auth routes (/login, /register)
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
    
    if (accessToken && isAuthRoute) {
        const defaultRoleRedirects: Record<string, string> = {
            CUSTOMER: '/dashboard/customer',
            ADMIN: '/dashboard/admin',
            PROVIDER: '/dashboard/provider',
        };

        const redirectUrl = defaultRoleRedirects[userRole] || '/';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // 3. Unauthenticated User Protection for Private Routes
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 4. Role-Based Access Control (RBAC) Check
    const matchedRoutePrefix = Object.keys(ROLE_BASED_ROUTES).find((route) =>
        pathname === route || pathname.startsWith(route + "/")
    );

    if (matchedRoutePrefix) {
        const allowedRoles = ROLE_BASED_ROUTES[matchedRoutePrefix];
        
        // If user has no role or their role isn't allowed for this path
        if (!userRole || !allowedRoles.includes(userRole)) {
            return NextResponse.redirect(new URL('/not-found', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};