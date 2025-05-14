import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLoader } from "@/contexts/LoaderContext"
import { useUserSession } from "@/hooks"
import { userService } from "@/services/userService"
import { checkCPF } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { enqueueSnackbar } from "notistack"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function UserAvatar() {
    return (
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex cursor-pointer items-center justify-center">
            <svg className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
    )
}

export default function UserInfo() {
    const { user, login, logout } = useUserSession()
    const { setLoading } = useLoader()

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof schema>) => userService.POST(data),
    })

    const schema = z.object({
        username: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
        cpf: z.string().min(11, "CPF deve ter 11 caracteres").refine(checkCPF, "CPF inválido"),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })  

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true)
        mutation.mutate(data)
    }

    useEffect(() => {
        if (mutation.isSuccess) {
            login(mutation.data.data)
            enqueueSnackbar(`Você logou como ${mutation.data.data.username}`, { variant: "success" })
        }

        setLoading(false)
    }, [ mutation.isSuccess ])

    return (
        <div className="flex items-center gap-4">
            {user ? (
                <div className="relative flex items-center gap-2 bottom-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div>
                                <UserAvatar />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover dark:bg-gray-900 shadow-lg rounded-sm border max-w-52 animate-in-slide-up-fade data-[state=closed]:animate-out-slide-down-fade">
                            <p className="p-2 text-sm font-medium">{user.username}</p>
                            <DropdownMenuSeparator />
                            <div onClick={() => logout()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                                <LogOut className="h-4 w-4" />
                                <DropdownMenuLabel className="text-sm font-medium">Logout</DropdownMenuLabel>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <Dialog>
                    <DialogTrigger>
                        <Button className="flex flex-col bg-accent border-accent-foreground text-accent-foreground hover:bg-accent/80">Sign In</Button>
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogOverlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                        <DialogContent className="fixed top-1/2 left-1/2 z-50 max-w-md px-4 py-6 sm:px-6 lg:px-8 bg-popover dark:bg-popover-foreground rounded-lg shadow-lg" style={{ transform: "translate(-50%, -50%)" }}>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <Input type="text" placeholder="Username" required {...register("username")} />
                                    <p className="text-red-500">{errors.username?.message}</p>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                                    <Input 
                                        type="text" 
                                        placeholder="00000000000" 
                                        pattern="\d{11}" 
                                        maxLength={11}
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                        }}
                                        {...register("cpf")}
                                        required 
                                    />
                                    <p className="text-red-500">{errors.cpf?.message}</p>
                                </div>
                                <Button type="submit" className="w-full rounded-lg p-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In/Up</Button>
                            </form>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            )}
        </div>
    )
}