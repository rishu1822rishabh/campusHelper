"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function logoutAction() {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    return{
        success:"logout successfully",
        "status":200
    }
}