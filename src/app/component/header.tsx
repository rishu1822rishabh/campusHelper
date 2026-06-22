import React from 'react'
import { Role, User } from '../type';
import Link from 'next/link';
import LogoutButton from './logoutbutton';
interface headerprop {
    user: User | null
}

const Header = ({ user }: headerprop) => {
    return (
        <header className="border-b border-slate-700 bg-slate-900">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex h-11 w-fit items-center p-1 px-2.5 justify-center rounded-full bg-blue-600 text-xl font-bold text-white hover:bg-blue-800"
                >
                    Campus Helper
                </Link>

                {/* Right Side */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-slate-300">
                            Welcome, <span className="font-semibold">{user.name}</span>
                        </span>

                       <LogoutButton/>
                        <Link href='/dashboard/user' className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" >Go to user dashboard</Link>
                        { user.role===Role.ADMIN &&(<Link href='/dashboard/admin' className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" >Go to Admin dashboard</Link>)}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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