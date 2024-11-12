import { motion } from 'framer-motion'
import { Heart, Users, X } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface CommonInterestMessageProps {
    user1: string
    user2: string
    interest: string
    avatarUrl1?: string
    avatarUrl2?: string
    onClose: () => void
}

export default function Component({
                                      user1 = "Alice",
                                      user2 = "Bob",
                                      interest = "hiking",
                                      avatarUrl1 = "/placeholder.svg?height=40&width=40",
                                      avatarUrl2 = "/placeholder.svg?height=40&width=40",
                                      onClose = () => {},
                                  }: CommonInterestMessageProps) {
    return (
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
            <CardContent className="p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </button>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-4"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-purple-500">
                            <AvatarImage src={avatarUrl1} alt={user1} />
                            <AvatarFallback>{user1[0]}</AvatarFallback>
                        </Avatar>
                        <Users className="w-6 h-6 text-purple-500" />
                        <Avatar className="w-12 h-12 border-2 border-pink-500">
                            <AvatarImage src={avatarUrl2} alt={user2} />
                            <AvatarFallback>{user2[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    >
                    </motion.div>
                    <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-200">
                        Great news! {user1} and {user2} both enjoy <span className="font-bold text-purple-600 dark:text-purple-400">{interest}</span>!
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                        This could be a great topic for us to discuss and connect over.
                    </p>
                    <p className="text-center text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2">
                        Why not plan a {interest} activity together?
                    </p>
                </motion.div>
            </CardContent>
        </Card>
    )
}