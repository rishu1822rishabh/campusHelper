import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function proxy(request: NextRequest){
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        );
        const { payload } = await jwtVerify(token, secret);

        if (payload.userrole !== "ADMIN") {
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
    matcher: ["/dashboard/admin/:path*"],
};