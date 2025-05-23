import { useState } from "react";
import type { User } from "@/types";

interface UserSession {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export default function useUserSession(): UserSession {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user") || "null"))

    const login = (user: User) => {
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
        window.location.href = "/"
    }

    return { user, login, logout }
}