import { createFileRoute } from '@tanstack/react-router'
import { useUserSession } from '@/hooks'
import { UserAvatar } from '@/layout/UserInfo'
import Card from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Download, Plus } from 'lucide-react'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { user } = useUserSession()

    return (
        <div className='h-full w-full flex flex-col justify-between rounded-xl font-family[Inter]'>
            <div>
                <div className='flex items-center justify-between p-4'>
                    <div className='text-3xl'>Hi {user?.username}</div>
                    <UserAvatar />
                </div>
                <hr className='mb-4 border-gray-200 dark:border-gray-700' />
                <div className='flex flex-col gap-4'>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Quizzy jogado(s)</div>
                        <div>0</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Quizzy vencido(s)</div>
                        <div>0</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões respondida(s)</div>
                        <div>0</div>
                    </Card>
                    <Button disabled={!user} className='w-full'>
                        <Download />
                        Exportar dados
                    </Button>
                </div>
            </div>
            <Button disabled={!user} className='w-full'>
                <Plus />
                Novo Quizzy
            </Button>
        </div>
    )
}