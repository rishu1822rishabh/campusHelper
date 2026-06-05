import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
export const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})
export async function Connectionwithdatabase(): Promise<boolean> {
    try {
        await prisma.$queryRaw`select 1`;
        return true;
    } catch (error) {
        console.error("error is connecting");
        return false;

    }

}
