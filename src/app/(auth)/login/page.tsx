'use client';

import { apiClient } from "@/app/lib/apiclient";
import Link from "next/link";
import { useActionState } from "react";
import toast from "react-hot-toast";

export type LoginState = {
    error?: string;
    
    success?: boolean;
};

const Loginfunction = () => {
    const [state, loginAction, isPending] = useActionState(
        async (
            prevState: LoginState,
            formData: FormData
        ): Promise<LoginState> => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            try {
                await apiClient.login(email, password);
                toast.success("login successful !", {
                    position: "top-center",
                })


                setTimeout(()=>{
                    window.location.href="/"
                },1000)

                return {
                    success: true,
                };
            } catch (error) {
                toast.error("login failed !!", {
                    position: "top-center",
                })
                return {
                    error:
                        error instanceof Error
                            ? JSON.parse(error.message).message
                            : "Login failed",
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
                    <h2 className="text-2xl font-bold text-white">
                        Login to your account
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Or{" "}
                        <Link
                            href="/register"
                            className="font-medium text-blue-400 hover:text-blue-300"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                <form action={loginAction} className="space-y-4">
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
                        {isPending ? "signing in..." : "sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Loginfunction;