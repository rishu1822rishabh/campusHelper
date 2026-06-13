'use client';

import { apiClient } from "@/app/lib/apiclient";
import Link from "next/link";
import { useActionState } from "react";
import toast from "react-hot-toast";

export type EditState = {
    error?: string;
    success?: boolean;
};

const EditFunction = () => {
    const [state, editAction, isPending] = useActionState(
        async (
            prevState: EditState,
            formData: FormData
        ): Promise<EditState> => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const name = formData.get("name") as string;

            try {
                await apiClient.edit({
                    email,
                    name,
                    password,
                });
                toast.success(`for user ${name} profile edit successfully !`, {
                    position: "top-center"
                })
                setTimeout(() => {
                    window.location.href = "/";

                }, 1000)


                return {
                    success: true,
                };
            } catch (error) {
                toast.error(`${error instanceof Error
                    ? error.message
                    : "not able to edit profile"}`, {
                    position: "top-center"
                })
                return {
                    error:
                        error instanceof Error
                            ? error.message
                            : "not able to edit profile",
                };
            }
        },
        {
            error: undefined,
            success: undefined,
        }
    );

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
            <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-800 p-8">
                <div className="mb-8 text-center">
                    <h2 className="mb-6 text-center text-3xl font-bold text-white">
                        Edit Your Profile
                    </h2>
                </div>

                <form action={editAction} className="space-y-4">
                    {/* Name */}
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
                            placeholder="enter name"
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

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-slate-300"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    {state.error && (
                        <div className="rounded-md bg-red-500/10 p-2 text-sm text-red-400">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? "changing..." : "edit profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}


export default EditFunction;