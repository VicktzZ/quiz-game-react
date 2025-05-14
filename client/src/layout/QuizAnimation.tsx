import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function QuizAnimation() {
    const [ show, setShow ] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 1500)
    }, [ ])

    return (
        <AnimatePresence>
            {show ? (
                <motion.div
                    className="flex items-center justify-center bg-black h-screen w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-6xl font-bold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Quizzy
                    </motion.h1>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}