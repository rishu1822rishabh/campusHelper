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
                className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-300 backdrop-blur-xl transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-200"
            >
                Logout
            </button>
        </form>
    );
}