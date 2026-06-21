import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/", "/login", "/register"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    // User not logged in
    if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        );

        const { payload } = await jwtVerify(
            token,
            secret
        );

        // Admin route protection
        if (
            pathname.startsWith("/dashboard/admin") &&
            payload.userrole !== "ADMIN"
        ) {
            return NextResponse.redirect(
                new URL("/dashboard/user", request.url)
            );
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};