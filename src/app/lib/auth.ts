import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { prisma } from "./database";
import { Role, User } from "../type";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(
    password: string
): Promise<string> {
    return await argon2.hash(password);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
}

export function getToken(userid: string,userrole:string): string {
    return jwt.sign(
        { userid,
        userrole},
        JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
}

export function verifyToken(
    token: string
): { userid: string } | null {
    try {
        return jwt.verify(
            token,
            JWT_SECRET
        ) as { userid: string };
    } catch {
        return null;
    }
}
export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return null;
    }

    const userFromDb = await prisma.user.findUnique({
        where: {
            id: decoded.userid,
        },
    });

    if (!userFromDb) {
        return null;
    }

    const { password, ...user } = userFromDb;

    return user as User;
}
export function userPermission(
    user: User,
    requiredRole: Role
): boolean {
    const roleHierarchy = {
        [Role.ADMIN]: 1,
        [Role.USER]: 0,
    };

    return (
        roleHierarchy[user.role] >=
        roleHierarchy[requiredRole]
    );
}