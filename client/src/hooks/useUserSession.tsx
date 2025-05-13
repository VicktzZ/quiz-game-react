import { useState } from "react";

export default function useUserSession() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"))

    const login = (user: string) => {
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return { user, login, logout }
}