import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUserSession } from '@/hooks'
import { UserAvatar } from '@/layout/UserInfo'
import Card from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Download, Plus } from 'lucide-react'
import { useQuizContext } from '@/contexts/QuizContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { questionService } from '@/services/questionService'
import { useLoader } from '@/contexts/LoaderContext'
import { useEffect, useMemo } from 'react'
import { quizResultsService } from '@/services/quizResultsService'
import { exportDataToXlsx } from '@/utils'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { user } = useUserSession()
    const { setQuestions, questionsAmount, reset } = useQuizContext()
    const { setLoading } = useLoader()
    const navigate = useNavigate()
    
    const randomQuestionsMutation = useMutation({
        mutationFn: () => questionService.takeRandom(questionsAmount),
        onSuccess: ({ data }) => {
            setQuestions(data)
            navigate({ to: '/quiz' })
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
        }

    })

    const { data: quizHistory, isPending, refetch } = useQuery({
        queryKey: ['quiz-history', user?.id],
        queryFn: async () => (await quizResultsService.getQuizHistory(user?.id || 0)).data,
        staleTime: Infinity,
        enabled: !!user,
    })

    setLoading(isPending)

    const quizzyHistoryInfo = useMemo(() => {
        const played = quizHistory?.length || 0
        const won = quizHistory?.filter((quiz) => quiz.score === quiz.totalQuestions).length || 0
        const respondedQuestions = quizHistory?.reduce((total, quiz) => total + quiz.answers.length, 0) || 0
        const correctAnswers = quizHistory?.reduce((total, quiz) => total + quiz.answers.filter((answer) => answer.isCorrect).length, 0) || 0
        const wrongAnswers = quizHistory?.reduce((total, quiz) => total + quiz.answers.filter((answer) => !answer.isCorrect).length, 0) || 0

        return {
            played,
            won,
            respondedQuestions,
            correctAnswers,
            wrongAnswers
        }
    }, [quizHistory])


    useEffect(() => {
        reset()
        refetch()
    }, [])

    const createQuiz = () => {  
        setLoading(true)
        randomQuestionsMutation.mutate()
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
                        <div>{quizzyHistoryInfo.played}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Quizzy vencido(s)</div>
                        <div>{quizzyHistoryInfo.won}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões respondida(s)</div>
                        <div>{quizzyHistoryInfo.respondedQuestions}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões acertada(s)</div>
                        <div>{quizzyHistoryInfo.correctAnswers}</div>
                    </Card>
                    <Card className='flex items-center justify-between p-4'>
                        <div>Questões errada(s)</div>
                        <div>{quizzyHistoryInfo.wrongAnswers}</div>
                    </Card>
                    <Button onClick={() => exportDataToXlsx(quizHistory || [])} variant="outline" disabled={!user} className='w-full'>
                        <Download />
                        Exportar dados
                    </Button>
                </div>
            </div>
            <Button onClick={createQuiz} disabled={!user || randomQuestionsMutation.isPending} className='w-full'>
                <Plus />
                Novo Quizzy
            </Button>
        </div>
    )
}