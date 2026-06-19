"use client"
import React from 'react'
import { apiClient } from '../lib/apiclient'
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
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
        <div className = "rounded-md w-fit bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 duration-100" onClick={changerole}>changerole</div>
    )
}

export default Changerole