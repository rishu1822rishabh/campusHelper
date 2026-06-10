'use client'
import { apiClient } from "@/app/lib/apiclient"
import Link from "next/link"
import { useActionState } from "react"
export type resisterState = {
    error?: string,
    success?: boolean
}
const resisterfunction = () => {
    const [State, resisterAction, isPending] = useActionState(async (prevState: resisterState,
        formData: FormData
    ): Promise<resisterState> => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        console.log(isPending);
        try {
            await apiClient.register({ email, name, password });
            window.location.href = "/"
            return { success: true };

        } catch (error) {
            return { error: error instanceof Error ? error.message : "Resistration failed" };

        }
    }, { error: undefined, success: undefined });
    return (<div className="flex min-h-screen items-center justify-center bg-slate-900">      <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-800 p-8">        <div className="mb-8 text-center">          <h2 className="text-2xl font-bold text-white">            Create New Account          </h2>          <p className="mt-2 text-sm text-slate-400">            Or{" "}            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300"            >              Sign in to existing account            </Link>          </p>        </div>        <form action={resisterAction} className="space-y-4">          {/* Name */}          <div>            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-300"            >              Name            </label>            <input id="name" name="name" type="text" placeholder="Enter your name" required className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-blue-500" />          </div>          {/* Email */}          <div>            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-300"            >              Email            </label>            <input id="email" name="email" type="email" placeholder="Enter your email" required className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-blue-500" />          </div>          {/* Password */}          <div>            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-300"            >              Password            </label>            <input id="password" name="password" type="password" placeholder="Enter your password" required className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-blue-500" />          </div>          <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
    >
        {isPending ? "Registering..." : "Register"}
    </button>       </form>  
        {State.error && <div className="mt-1 text-red-700">error in resistration</div>}    </div>    </div>);
}
export default resisterfunction;