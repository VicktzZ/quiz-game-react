import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUserSession } from '@/hooks'
import { UserAvatar } from '@/layout/UserInfo'
import Card from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Download, Plus } from 'lucide-react'
import { useQuizContext } from '@/contexts/QuizContext'
import { useMutation } from '@tanstack/react-query'
import { questionService } from '@/services/questionService'
import { useLoader } from '@/contexts/LoaderContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { user } = useUserSession()
    const { setQuestions, questionsAmount, reset } = useQuizContext()
    const { setLoading } = useLoader()
    const mutation = useMutation({
        mutationFn: () => questionService.takeRandom(questionsAmount)
    })

    const navigate = useNavigate()

    useEffect(() => {
        reset()
    }, [])

    const createQuiz = () => {  
        setLoading(true)
        mutation.mutate(undefined, {
            onSuccess: ({ data }) => {
                setQuestions(data)
                console.log(data)
                navigate({ to: '/quiz' })
                setLoading(false)
            },
            onError: () => {
                console.error('error')
                setLoading(false)
            }
        })
    }

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
                        <div>{user?.quizzes_played || 0}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Quizzy vencido(s)</div>
                        <div>{user?.quizzes_won || 0}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões respondida(s)</div>
                        <div>{user?.questions_answered || 0}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões acertada(s)</div>
                        <div>{user?.questions_correct || 0}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões errada(s)</div>
                        <div>{user?.questions_wrong || 0}</div>
                    </Card>
                    <Button variant="outline" disabled={!user} className='w-full'>
                        <Download />
                        Exportar dados
                    </Button>
                </div>
            </div>
            <Button onClick={createQuiz} disabled={!user || mutation.isPending} className='w-full'>
                <Plus />
                Novo Quizzy
            </Button>
        </div>
    )
}