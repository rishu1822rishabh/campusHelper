import { getCurrentUser } from "@/app/lib/auth";
import { Role } from "@/app/type";
import { prisma } from "@/app/lib/database";
import { Prisma } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json(
            { status: "You are not authorized" },
            { status: 401 }
        );
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");

    const where: Prisma.UserWhereInput = {};

    if (user.role !== Role.ADMIN) {
        where.role = {
            not: Role.ADMIN,
        };
    } else if (role) {
        where.role = role as Role;
    }

    const users = await prisma.user.findMany({
        where,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(users);
}