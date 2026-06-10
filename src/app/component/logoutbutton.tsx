import { logoutAction } from "../action/logout";


export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
                Logout
            </button>
        </form>
    );
}