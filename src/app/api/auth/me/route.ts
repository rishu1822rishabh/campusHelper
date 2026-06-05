import { getCurrentUser } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET(response:NextResponse){
    const user=await getCurrentUser();
    if(!user){
        return NextResponse.json({
            status:"you are not authanticated"
        },{status:409})
    }
    return NextResponse.json(user);

}