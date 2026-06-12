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
            <div>
                <h1 className="text-center mx-1 text-3xl font-bold text-blue-600">Admin Dashboard</h1>
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
                <h1 className="text-3xl font-bold mx-1 text-center"> Other users</h1>

                <table className="w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-800 text-white shadow-lg">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Role
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="transition-colors hover:bg-gray-700"
                            >
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "ADMIN"
                                            ? "bg-red-500/20 text-red-400"
                                            : "bg-green-500/20 text-green-400"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
