import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme"
import { FaCog, FaMoon, FaSun, FaTimes } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import UserInfo from "./UserInfo"
import Card from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { useQuizContext } from "@/contexts/QuizContext"

export default function BottomBar() {
    const { theme, setTheme } = useTheme()
    const { timerDuration, setTimerDuration, questionsAmount, setQuestionsAmount } = useQuizContext()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleThemeChange = (theme: 'dark' | 'light') => {
        setTheme(theme)
    }

    const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value >= 0 && value <= 30) {
            setTimerDuration(value)
        }
    }

    const handleQuestionsAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value >= 0 && value <= 30) {
            setQuestionsAmount(value)
        }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <Card className={`w-full h-16 flex items-center justify-center`}>
            <div className="flex items-center gap-2 justify-between w-full p-4">
                <UserInfo />
                <div className="flex items-center gap-2"> 
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
                        className="text-foreground"
                    >
                        {theme === "dark" ? <FaMoon /> : <FaSun />}
                    </Button>
                    
                    <div className="relative" ref={dropdownRef}>
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-foreground"
                        >
                            <FaCog className="w-5 h-5" />
                        </Button>
                        
                        {isDropdownOpen && (
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-card rounded-md shadow-lg border border-border z-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium">Configurações</h4>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </Button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label 
                                            htmlFor="timer" 
                                            className="block text-sm font-medium mb-1 text-muted-foreground"
                                        >
                                            Tempo (segundos)
                                        </label>
                                        <Input
                                            id="timer"
                                            type="number"
                                            min="0"
                                            max="30"
                                            value={timerDuration}
                                            onChange={handleTimerChange}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label 
                                            htmlFor="questions" 
                                            className="block text-sm font-medium mb-1 text-muted-foreground"
                                        >
                                            Questoes
                                        </label>
                                        <Input
                                            id="questions"
                                            type="number"
                                            min="0"
                                            max="30"
                                            value={questionsAmount}
                                            onChange={handleQuestionsAmountChange}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}