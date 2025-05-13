import { useTheme } from "@/theme";
import { Routes } from "react-router-dom";
import BottomBar from "./BottomBar";

export function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center bg-[url('./public/bg.svg')] dark:bg-[url('./public/dark-bg.svg')] bg-cover">
                <div className={`flex flex-col justify-between w-[90%] h-[90%] max-w-md rounded-x shadow-lg ${theme === "dark" ? "dark-card" : "light-card"}`}>
                    <div className="p-4">
                        <Routes>
                            {children}
                        </Routes> 
                    </div>
                    <BottomBar />
                </div>
            </div>
        </>
    )
}