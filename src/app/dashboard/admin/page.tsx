import Changerole from "@/app/component/changerole";
import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/database";
import { Role } from "@/app/type";
import Link from "next/link";

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <div className="text-center"> <Link href="/login" className="hover:text-blue-700 hover:underline">Please login</Link></div>;
    }
    if (currentUser.role === Role.ADMIN) {

        const users = await prisma.user.findMany({
            where: {
                role: {
                    not: Role.ADMIN
                }
            }
        });

        return (
            <div className="relative min-h-screen overflow-hidden bg-[#0B1120]">

                {/* Background Blur */}
                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />
                <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[160px]" />
                <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px]" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">

                    {/* Header */}

                    <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">

                        <div>
                            <h1 className="text-5xl font-bold text-white">
                                Admin Dashboard
                            </h1>

                            <p className="mt-2 text-gray-400">
                                Manage users and their permissions
                            </p>
                        </div>

                        <Link
                            href="/dashboard/admin/createuser"
                            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-cyan-500/30"
                        >
                            + Create User
                        </Link>

                    </div>

                    {/* Admin Information */}

                    <div className="mb-12 grid gap-6 md:grid-cols-3">

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl transition hover:-translate-y-2">

                            <p className="text-sm uppercase tracking-wider text-gray-400">
                                Name
                            </p>

                            <p className="mt-3 text-xl font-semibold text-white">
                                {currentUser.name}
                            </p>

                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl transition hover:-translate-y-2">

                            <p className="text-sm uppercase tracking-wider text-gray-400">
                                Email
                            </p>

                            <p className="mt-3 break-all text-lg text-white">
                                {currentUser.email}
                            </p>

                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl transition hover:-translate-y-2">

                            <p className="text-sm uppercase tracking-wider text-gray-400">
                                Role
                            </p>

                            <span className="mt-4 inline-flex rounded-full bg-cyan-500/20 px-4 py-2 font-semibold text-cyan-300">
                                {currentUser.role}
                            </span>

                        </div>

                    </div>

                    {/* User Table */}

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

                        <div className="mb-8 flex items-center justify-between">

                            <h2 className="text-3xl font-bold text-white">
                                Users
                            </h2>

                            <span
                                className="
        inline-flex
        items-center
        rounded-full
        border
        border-cyan-400/30
        bg-cyan-500/10
        px-4
        py-2
        text-sm
        font-semibold
        text-cyan-300
        backdrop-blur-md
        transition-all
        duration-300
        hover:scale-105
        hover:border-cyan-400
        hover:bg-cyan-500/20
        hover:text-white
        hover:shadow-lg
        hover:shadow-cyan-500/30
    "
                            >
                                👥 {users.length} Users
                            </span>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b border-white/10 text-gray-300">

                                        <th className="px-6 py-4 text-left font-semibold">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold">
                                            Role
                                        </th>

                                        <th className="px-6 py-4 text-center font-semibold">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map((user) => (

                                        <tr
                                            key={user.id}
                                            className="border-b border-white/5 transition duration-300 hover:bg-white/5"
                                        >

                                            <td className="px-6 py-5 font-medium text-white capitalize">
                                                {user.name}
                                            </td>

                                            <td className="px-6 py-5 text-gray-300">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${user.role === "ADMIN"
                                                            ? "bg-red-500/20 text-red-300 hover:shadow-md hover:shadow-red-400 hover:text-white"
                                                        : "bg-green-500/20 text-green-300 hover:shadow-md hover:shadow-green-400 hover:text-white"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5 text-center">
                                                <Changerole userdata={user} />
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
