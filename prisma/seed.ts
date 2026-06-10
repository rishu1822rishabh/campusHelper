import "dotenv/config";
import argon2 from "argon2";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { Role } from "@/app/type";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
});

async function main() {
    const adminPassword = await argon2.hash("admin123");
    const userPassword = await argon2.hash("user123");

    await prisma.user.createMany({
        data: [
            {
                name: "Admin User",
                email: "admin@example.com",
                password: adminPassword,
                role:Role.ADMIN,
            },
            {
                name: "Rishabh",
                email: "rishabh@example.com",
                password: userPassword,
                role: Role.USER,
            },
            {
                name: "John Doe",
                email: "john@example.com",
                password: userPassword,
                role:Role.USER
            },
        ],
    });

    console.log("✅ Database seeded successfully");
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });