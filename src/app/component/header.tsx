import React from 'react'
import { Role, User } from '../type';
import Link from 'next/link';
import LogoutButton from './logoutbutton';
interface headerprop {
    user: User | null
}

const Header = ({ user }: headerprop) => {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#ffffff]/5 backdrop-blur-3xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex h-11 w-fit items-center p-1 px-2.5 justify-center rounded-full border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40"
                >
                    Campus Helper
                </Link>

                {/* Right Side */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">
                            Welcome, <span className="font-semibold text-white">{user.name}</span>
                        </span>

                        <LogoutButton />
                        <Link href='/dashboard/user' className="rounded-md border border-white/10 bg-gradient-to-r from-white/5 to-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition duration-300 hover:bg-white/10 shadow-lg shadow-gray-500/20  hover:shadow-gray-500/40" >Go to user dashboard</Link>
                        {user.role === Role.ADMIN && (<Link href='/dashboard/admin' className="rounded-md border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40" >Go to Admin dashboard</Link>)}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl transition duration-300 hover:bg-white/10 hover:text-white"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-md border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header