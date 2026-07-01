"use client"
import React from 'react'
import { apiClient } from '../lib/apiclient'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { User } from '../type';

const Changerole = ( userdata :User) => {
    const route=useRouter()
    const changerole = async () => {

        try {
            const res = await apiClient.changeRole(userdata.id);
            toast.success(`${userdata.name} promoted to admin`);
            setTimeout(() => { route.push("/dashboard/admin") })
            return ({
                success: true
            })
        } catch (error) {
            toast.error(`not able to update user role`);
            setTimeout(() => { route.push("/dashboard/admin") })
            return ({
                success: false
            })


        }
    }
    return (
        <div
            onClick={changerole}
            className="
        inline-flex
        cursor-pointer
        items-center
        justify-center
        rounded-xl
        border
        border-cyan-400/30
        bg-gradient-to-r
        from-cyan-500/20
        to-blue-500/20
        px-5
        py-2.5
        text-sm
        font-semibold
        text-cyan-300
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-400/60
        hover:bg-cyan-500/20
        hover:text-white
        hover:shadow-lg
        hover:shadow-cyan-500/30
        active:scale-95
    "
        >
            Change Role
        </div>
    )
}

export default Changerole