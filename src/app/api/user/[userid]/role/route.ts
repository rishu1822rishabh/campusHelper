import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/database";
import { Role } from "@/generated/prisma/enums";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ userid: string }> }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        if (currentUser.role !== Role.Admin) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Only admins can change roles",
                },
                { status: 403 }
            );
        }

        const { userid } = await params;

        if (currentUser.id === userid) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "You cannot change your own role",
                },
                { status: 403 }
            );
        }

        const { role } = await request.json();

        const validRoles = [Role.Admin, Role.user];

        if (!validRoles.includes(role as Role)) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Invalid role",
                },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userid },
        });

        if (!user) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: userid },
            data: {
                role: role as Role,
            },
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
                message: "Role updated successfully",
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