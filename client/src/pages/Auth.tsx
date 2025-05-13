import { Input } from "@/components/ui/input"
import { useTheme } from "@/theme"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function Auth() {
    const schema = z.object({
        username: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
        password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    })

    const { theme } = useTheme()
    const [ isSignIn, setIsSignIn ] = useState(true)
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data)
    }

    return (
        <div className="flex h-screen items-center justify-center bg-[url('./public/bg.svg')] bg-cover">
            <div className={`w-3/4 h-3/4 max-w-md rounded-x p-6 shadow-lg ${theme === "dark" ? "dark-card" : "light-card"}`}>
                <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white text-center" style={{ letterSpacing: "3px" }}>QUIZZY</h2>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <Input type="text" placeholder="Username" required {...register("username")}/>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Input type="password" placeholder="••••••••" required {...register("password")}/>
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-blue-500 p-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                </form>
            </div>
        </div>
    )
}