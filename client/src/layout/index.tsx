import { useTheme } from "@/theme";
import BottomBar from "./BottomBar";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { motion } from "framer-motion"

export function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()

    return (
        <LoaderProvider>
            <div className="w-screen h-screen flex items-center justify-center bg-[url('./public/bg.svg')] dark:bg-[url('./public/dark-bg.svg')] bg-cover">
                <motion.div 
                    className={`flex flex-col justify-between w-[90%] h-[90%] max-w-md rounded-x shadow-lg ${theme === "dark" ? "dark-card" : "light-card"}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    <div className="h-full w-full p-2 scroll-auto overflow-auto">
                        {children}
                    </div>
                    <BottomBar />
                </motion.div>
            </div>
        </LoaderProvider>
    )
}