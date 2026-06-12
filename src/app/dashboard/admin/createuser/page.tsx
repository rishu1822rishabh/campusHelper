"use client"
import { createUser } from '@/app/action/createuser'
// import { getCurrentUser } from '@/app/lib/auth';
import { Role } from '@/app/type';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const page = async() => {
    const route=useRouter();
    const createuseraction=async(formData:FormData)=>{
        const res=await createUser(formData);
        if(!res.success){
            toast.error("not able to resister user",{
                position:"top-center"
            })
            setTimeout(()=>{
                route.push("/dashboard/admin")
            },1000);
            return;
            
        }
        toast.success("user resistered and crendatial send", {
            position: "top-center"
        })
        setTimeout(() => {
            route.push("/dashboard/admin")
        }, 1000);
        return 


    }
  return (
      <div><form action={createuseraction} className="space-y-4">
          <div>
              <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-slate-300"
              >
                  Name
              </label>

              <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-blue-500"
              />
          </div>

          {/* Email */}
          <div>
              <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-300"
              >
                  Email
              </label>

              <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-blue-500"
              />
          </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            create user
          </button>
      </form></div>
  )
}

export default page