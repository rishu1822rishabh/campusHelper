import { analyseresume } from "@/app/action/groqres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { resumeContent} = await req.json();

        if (!resumeContent) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Resume data is required.",
                },
                { status: 400 }
            );
        }

        const analysis = await analyseresume(resumeContent);

        return NextResponse.json(
            {
                success: true,
                analysis,
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