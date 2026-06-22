import { analyseresumeforjd } from "@/app/action/groqreqjd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { resumeContent,jobdescription} = await req.json();
       

        if (!resumeContent||!jobdescription) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Resume data and job discription is required.",
                },
                { status: 400 }
            );
        }

        const jdanalysis = await analyseresumeforjd(resumeContent,jobdescription);

        return NextResponse.json(
            {
                success: true,
                jdanalysis,
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