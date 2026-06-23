import { eventlist } from "@/app/action/groqreqforevent";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const {resumecontent} = await req.json();
       

        if (!resumecontent) {
            return NextResponse.json(
                {
                    success: false,
                    message: "content required",
                },
                { status: 400 }
            );
        }

        const events = await eventlist(resumecontent) ;

        return NextResponse.json(
            {
                success: true,
                events,
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