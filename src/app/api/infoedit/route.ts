import { getCurrentUser, hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { name, email, password } = await request.json();
        if(!name||!email||!password){
            return NextResponse.json(
                { message: "all field necessary" },
                { status: 401 }
            );
        }
        const hashpass=await hashPassword(password)

        const data: any = {
            name,
            email,
            password:hashpass,
            role:user.role
        };

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return NextResponse.json(
            {
                status: "success",
                message: "User updated successfully",
                data: updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                status: "error",
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}