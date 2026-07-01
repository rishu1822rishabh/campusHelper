'use client';

import { apiClient } from "@/app/lib/apiclient";
import Link from "next/link";
import { useActionState } from "react";
import toast from "react-hot-toast";

export type RegisterState = {
    error?: string;
    success?: boolean;
};

const RegisterFunction = () => {
    const [state, registerAction, isPending] = useActionState(
        async (
            prevState: RegisterState,
            formData: FormData
        ): Promise<RegisterState> => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const name = formData.get("name") as string;

            try {
                await apiClient.register({
                    email,
                    name,
                    password,
                });
                toast.success(`${name} registration completed !`, {
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
                    : "Registration failed"}`, {
                    position: "top-center"
                })
                return {
                    error:
                        error instanceof Error
                            ? error.message
                            : "Registration failed",
                };
            }
        },
        {
            error: undefined,
            success: undefined,
        }
    );

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6">

            {/* Background */}
            <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />
            <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />
            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="mb-8 text-center">
                    <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
                        Join Campus Helper
                    </span>

                    <h2 className="mt-5 text-2xl font-bold text-white">
                        Create New Account
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Or{" "}
                        <Link
                            href="/login"
                            className="font-medium text-cyan-300 hover:text-cyan-200"
                        >
                            Sign in to existing account
                        </Link>
                    </p>
                </div>

                <form action={registerAction} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none backdrop-blur-xl placeholder:text-gray-500 focus:border-cyan-400/50"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none backdrop-blur-xl placeholder:text-gray-500 focus:border-cyan-400/50"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Create Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create your password"
                            required
                            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none backdrop-blur-xl placeholder:text-gray-500 focus:border-cyan-400/50"
                        />
                    </div>

                    {state.error && (
                        <div className="rounded-md border border-red-500/20 bg-red-500/10 p-2 text-sm text-red-300 backdrop-blur-xl">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 py-2 font-medium text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40 disabled:opacity-50"
                    >
                        {isPending ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterFunction;