import { Connectionwithdatabase } from "@/app/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
    const isconnected=await Connectionwithdatabase()
    if(!isconnected){
        return NextResponse.json({
            "status":"error",
            "message":"fail to connect to database"

        },{status:503})
    }
    else{
       return NextResponse.json({
            "status": "success",
            "message": "success to connect to database"

        }, { status: 200})


    }

}