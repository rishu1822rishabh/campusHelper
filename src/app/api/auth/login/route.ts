import { getToken, hashPassword, verifyPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/database";
import { Role } from "@/app/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    if ( !email || !password) {
        return NextResponse.json({
            status: "email and password are required"
        }, { status: 400 })

    }
    const user=await prisma.user.findUnique({where:{email}});
    if(!user){
        return NextResponse.json({
            status: "user with this mail does not exist"
        }, { status: 400 })
    }
    const isvalispass = await verifyPassword(password,user.password)
    if(!isvalispass){
        return NextResponse.json({
            status: "password error"
        }, { status: 407 })

    }
    const token = getToken(user.id);
    const response = NextResponse.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
    })
    return response;
   

}