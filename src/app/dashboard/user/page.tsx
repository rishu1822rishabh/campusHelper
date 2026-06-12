import { getCurrentUser } from '@/app/lib/auth';
import { Role } from '@/app/type';
import Link from 'next/link';
import React from 'react'

const Userdashboard = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <div className="text-center"> <Link href="/login" className="hover:text-blue-700 hover:underline">Please login</Link></div>;
    }
    if (currentUser.role === Role.USER) {

        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
                <div className="w-full max-w-md rounded-xl bg-slate-800 p-8 shadow-lg border border-slate-700">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">
                        User Dashboard
                    </h1>

                    <div className="space-y-4">
                        <div className="rounded-lg bg-slate-700 p-4">
                            <p className="text-sm text-slate-400">Name</p>
                            <p className="text-lg font-medium text-white">
                                {currentUser.name}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-700 p-4">
                            <p className="text-sm text-slate-400">Email</p>
                            <p className="text-lg font-medium text-white">
                                {currentUser.email}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-700 p-4">
                            <p className="text-sm text-slate-400">Role</p>
                            <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                                {currentUser.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Userdashboard;