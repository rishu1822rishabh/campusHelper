"use client"
import toast from "react-hot-toast";
import { logoutAction } from "../action/logout";
import { redirect } from "next/navigation";


export default function LogoutButton() {
    const handlelogout=async()=>{
        const result=await logoutAction();
        if(result.success){
            toast.success("logout successfully!!",{
                position:"top-center"
            })
            setTimeout(()=>{
                redirect("/")

            },1000)
           
        }

    }
    return (
        <form action={handlelogout}>
            <button
                type="submit"
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
                Logout
            </button>
        </form>
    );
}