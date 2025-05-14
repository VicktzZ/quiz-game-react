import { useState } from "react";
import type { User } from "@/types";

export default function useUserSession() {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user") || "null"))

    const login = (user: User) => {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.reload()
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
        window.location.href = "/"
    }

    return { user, login, logout }
}