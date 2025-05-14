import { useTheme } from "@/theme"

export default function Card({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const { theme } = useTheme()

    return (
        <div className={`rounded-xl bg-white dark:bg-gray-800 shadow-lg ${theme === "dark" ? "dark-card" : "light-card"} ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}