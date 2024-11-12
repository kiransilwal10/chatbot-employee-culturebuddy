import { motion } from 'framer-motion'
import { Cake, Calendar, Star, X } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface BirthdayWishProps {
    userName: string
    avatarUrl?: string
    onSendWish: () => void
    onClose: () => void
}

export default function BirthdayWish({
                                         userName = "Alex",
                                         avatarUrl = "/placeholder.svg?height=100&width=100",
                                         onSendWish = () => console.log("Birthday wish sent!"),
                                         onClose
                                     }: BirthdayWishProps) {
    const confetti = Array.from({ length: 50 }, (_, i) => (
        <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500 rounded-full"
            initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 200 - 400,
                opacity: 1
            }}
            animate={{
                y: 200,
                opacity: 0
            }}
            transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatDelay: Math.random() * 2
            }}
        />
    ))

    return (
        <Card className="w-full max-w-md max-h-[500px] mt-4 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 overflow-hidden relative">
            {confetti}
            <Button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 bg-transparent hover:bg-pink-200 dark:hover:bg-pink-800 rounded-full"
            >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </Button>
            <CardContent className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-4"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <Avatar className="w-24 h-24 border-4 border-yellow-400">
                            <AvatarImage src={avatarUrl} alt={userName} />
                            <AvatarFallback>{userName[0]}</AvatarFallback>
                        </Avatar>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <Cake className="w-12 h-12 text-pink-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                        {userName}'s Birthday is Tomorrow!
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Let's make {userName}'s day special by sending birthday wishes!
                    </p>
                    <div className="flex items-center space-x-2 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-6 h-6 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                </motion.div>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-white dark:bg-gray-800 p-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
                <Button
                    onClick={onSendWish}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                    Send Birthday Wish
                </Button>
            </CardFooter>
        </Card>
    )
}