import { useTheme } from "@/theme"

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    const { theme } = useTheme()

    return (
        <div className={`rounded-xl bg-white dark:bg-gray-800 shadow-lg ${theme === "dark" ? "dark-card" : "light-card"} ${className}`}>
            {children}
        </div>
    )
}