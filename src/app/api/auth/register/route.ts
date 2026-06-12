import { getToken, hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/database";
import { Role } from "@/app/type";
import { BaseNextResponse } from "next/dist/server/base-http";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
        return NextResponse.json({
            status: "email name and password are required"
        }, { status: 400 })

    }
    const alreadyuser = await prisma.user.findUnique({ where: { email } });
    if (alreadyuser) {
        return NextResponse.json({
            status: "user already exist"
        }, { status: 409 })
    }
    const hashpass = await hashPassword(password);
    const count = await prisma.user.count()
    const role = (count == 0) ? Role.ADMIN : Role.USER;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashpass,
            role
        }
    })
    const token=getToken(user.id,user.role);
    const response=NextResponse.json({
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    })
    response.cookies.set("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        maxAge:60*60*24*7
    })
    return response;


}