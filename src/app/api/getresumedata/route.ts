import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/database";
import pdfParse from "pdf-parse";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return Response.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(
            await file.arrayBuffer()
        );

        const data = await pdfParse(buffer);
        const user=await getCurrentUser();
        if(!user){
            return Response.json(
                { message: "No user found" },
                { status: 400 }
            );

        }
        const updatedUser = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        resumedata:data.text,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                });


        return Response.json({
            text: data.text,
            user:updatedUser
        });
    } catch (error) {
        return Response.json(
            {
                message: "Failed to extract PDF text",
                error: String(error),
            },
            { status: 500 }
        );
    }
}