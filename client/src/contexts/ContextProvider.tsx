import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SnackbarProvider } from "notistack"
import { ThemeProvider } from "@/theme"
import { LoaderProvider } from "@/contexts/LoaderContext"
import { QuizProvider } from "@/contexts/QuizContext"
import { UserProvider } from "@/contexts/UserContext"

const queryClient = new QueryClient()

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <QuizProvider>
                    <LoaderProvider>
                        <ThemeProvider>
                            <SnackbarProvider>
                                {children}
                            </SnackbarProvider>
                        </ThemeProvider>
                    </LoaderProvider>
                </QuizProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}