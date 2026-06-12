THIS_SHOULD_BREAK;
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function proxy(request: NextRequest) {
    console.log("PROXY RUNNING");
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        );
        const { payload } = await jwtVerify(token, secret);
        console.log("Payload:", payload);
        console.log("Role:", payload.role);

        if (payload.role !== "ADMIN") {
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