import { generalquestion } from "@/app/action/groqreqgeneral";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {content} = await req.json();
       

        if (!content) {
            return NextResponse.json(
                {
                    success: false,
                    message: "content required",
                },
                { status: 400 }
            );
        }

        const response = await generalquestion(content);

        return NextResponse.json(
            {
                success: true,
                response,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Internal Server Error",
            },
            { status: 500 }
        );
    }
}