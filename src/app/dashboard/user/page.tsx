import { getCurrentUser } from '@/app/lib/auth';
import { Role } from '@/app/type';
import Link from 'next/link';
import React from 'react'

const Userdashboard = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6">
                <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />
                <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

                <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 px-8 py-6 text-center backdrop-blur-2xl">
                    <Link href="/login" className="text-cyan-300 hover:text-cyan-200 hover:underline">
                        Please login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] p-6">

            {/* Background */}
            <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />
            <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />
            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="mb-8 text-center">
                    <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
                        Your Account
                    </span>

                    <h1 className="mt-5 text-3xl font-bold text-white">
                        User Dashboard
                    </h1>
                </div>

                <div className="space-y-4">
                    <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="text-lg font-medium text-white">
                            {currentUser.name}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-lg font-medium text-white">
                            {currentUser.email}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl flex ml-1 justify-between">
                        <p className="text-xl text-gray-400">Role</p>
                        <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
                            {currentUser.role}
                        </span>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        className="inline-block rounded-full border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-2.5 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                        href="/dashboard/user/edit"
                    >
                        Edit Your Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default Userdashboard;