import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SnackbarProvider } from "notistack"
import { ThemeProvider } from "@/theme"
import { LoaderProvider } from "@/contexts/LoaderContext"
import { QuizProvider } from "@/contexts/QuizContext"

const queryClient = new QueryClient()

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <QuizProvider>
                <LoaderProvider>
                    <ThemeProvider>
                        <SnackbarProvider>
                            {children}
                        </SnackbarProvider>
                    </ThemeProvider>
                </LoaderProvider>
            </QuizProvider>
        </QueryClientProvider>
    )
}