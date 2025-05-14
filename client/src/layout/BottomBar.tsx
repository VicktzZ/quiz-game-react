import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme"
import { FaCog, FaMoon, FaSun } from "react-icons/fa"
import UserInfo from "./UserInfo"
import Card from "@/components/ui/Card"

export default function BottomBar() {
    const { theme, setTheme } = useTheme()

    const handleThemeChange = (theme: 'dark' | 'light') => {
        setTheme(theme)
    }

    return (
        <Card className={`w-full h-16 flex items-center justify-center`}>
            <div className="flex items-center gap-2 justify-between w-full p-4">
                <UserInfo />
                <div className="flex items-center gap-2"> 
                    <Button onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <FaMoon /> : <FaSun />}
                    </Button>
                    <Button>
                        <FaCog />
                    </Button>
                </div>
            </div>
        </Card>
    )
}