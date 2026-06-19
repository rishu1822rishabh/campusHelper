import { Role } from "../type";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000";

class ApiClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    async request(
        endpoint: string,
        options: RequestInit = {}
    ) {
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        if (response.status === 401) {
            return null;
        }

        if (!response.ok) {
            const text = await response.text();
            console.log("Status:", response.status);
            console.log("Response:", text);

            throw new Error(text);
        }

        return response.json();
    }

    async login(email: string, password: string) {
        return this.request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }

    async register(userdata:unknown) {
        return this.request("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(userdata),
        });
    }
    
    async edit(userdata:unknown) {
        return this.request("/api/infoedit", {
            method: "PUT",
            body: JSON.stringify(userdata),
        });
    }
    

    async logout() {
        return this.request("/api/auth/logout", {
            method: "POST",
        });
    }

    async getCurrentUser() {
        return this.request("/api/auth/me");
    }

    async getUsers() {
        return this.request("/api/user");
    }

    async changeRole(userId: string) {
        return this.request(`/api/user/${userId}/role`, {
            method: "PATCH",
            body: JSON.stringify({ role:Role.ADMIN }),
        });
    }
    async analyseresume(resumeContent:string) {
        return this.request("/api/analysedres", {
            method: "POST",
            body: JSON.stringify({resumeContent}),
        });
    }
}

export const apiClient = new ApiClient();