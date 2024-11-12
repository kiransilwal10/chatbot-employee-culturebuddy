import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from './ui/calendar'
import ChatWidget from './ChatWidget'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MessageCircle, Send, Calendar as CalendarIcon } from "lucide-react"

type Message = {
    id: number
    text: string
    sender: 'user' | 'contact'
}

type Contact = {
    id: number
    name: string
    avatar: string
    lastMessage: string
}

type Chat = {
    contactId: number
    messages: Message[]
}

const initialContacts: Contact[] = [
    { id: 1, name: "Alex", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hey there!" },
    { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "How's it going?" },
    { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "See you later!" },
    { id: 4, name: "David", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Good morning!" },
    { id: 5, name: "Eva", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hello!" },
    { id: 6, name: "Frank", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Catch you later!" },
    { id: 7, name: "Grace", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hi there!" },
    { id: 8, name: "Hank", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "What's up?" },
    { id: 9, name: "Ivy", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Nice to see you!" },
    { id: 10, name: "Jack", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Take care!" },
]

const initialChats: Chat[] = [
    {
        contactId: 1,
        messages: [
            { id: 1, text: "Hi Alex! How was the meeting?", sender: 'user' },
            { id: 2, text: "It went great! We discussed the new project plans.", sender: 'contact' },
            { id: 3, text: "That's awesome. Also, happy early birthday!", sender: 'user' },
            { id: 4, text: "Thank you! Let's celebrate soon.", sender: 'contact' },
        ]
    },
    {
        contactId: 2,
        messages: [
            { id: 1, text: "Hey Bob! Did you try that new Italian restaurant?", sender: 'user' },
            { id: 2, text: "Yes! It was amazing. Their pasta is top-notch.", sender: 'contact' },
            { id: 3, text: "I have to check it out then!", sender: 'user' },
        ]
    },
    {
        contactId: 3,
        messages: [
            { id: 1, text: "Hi Charlie, are we still on for the weekend hike?", sender: 'user' },
            { id: 2, text: "Can't wait to get out there.", sender: 'contact' },
            { id: 3, text: "Me too! Let's grab coffee after?", sender: 'user' },
            { id: 4, text: "Sounds like a plan.", sender: 'contact' },
        ]
    }
]

export default function ChatApp() {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts)
    const [chats, setChats] = useState<Chat[]>(initialChats)
    const [activeContact, setActiveContact] = useState<Contact | null>(null)
    const [inputMessage, setInputMessage] = useState('')

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '' && activeContact) {
            const newMessage: Message = {
                id: Date.now(),
                text: inputMessage,
                sender: 'user'
            }

            setChats(prevChats => {
                const chatIndex = prevChats.findIndex(chat => chat.contactId === activeContact.id)
                if (chatIndex > -1) {
                    const updatedChat = {
                        ...prevChats[chatIndex],
                        messages: [...prevChats[chatIndex].messages, newMessage]
                    }
                    return [
                        ...prevChats.slice(0, chatIndex),
                        updatedChat,
                        ...prevChats.slice(chatIndex + 1)
                    ]
                } else {
                    return [...prevChats, { contactId: activeContact.id, messages: [newMessage] }]
                }
            })

            setContacts(prevContacts =>
                prevContacts.map(contact =>
                    contact.id === activeContact.id
                        ? { ...contact, lastMessage: inputMessage }
                        : contact
                )
            )

            setInputMessage('')

            // Simulate a response
            setTimeout(() => {
                const responseMessage: Message = {
                    id: Date.now(),
                    text: `This is a response from ${activeContact.name}`,
                    sender: 'contact'
                }
                setChats(prevChats => {
                    const chatIndex = prevChats.findIndex(chat => chat.contactId === activeContact.id)
                    const updatedChat = {
                        ...prevChats[chatIndex],
                        messages: [...prevChats[chatIndex].messages, responseMessage]
                    }
                    return [
                        ...prevChats.slice(0, chatIndex),
                        updatedChat,
                        ...prevChats.slice(chatIndex + 1)
                    ]
                })
            }, 1000)
            const storedUser = sessionStorage.getItem('emailData')
            const user = JSON.parse(storedUser as string)
            saveChatMessage(user.name, inputMessage.trim(), activeContact.name)
        }
    }

    const saveChatMessage = async (userId: string, message: string, receiver: string) => {
        const apiUrl = 'http://localhost:3000/api/companies/chat'

        const body = {
            userId,
            message,
            receiver,
            time: new Date().toISOString(),
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error saving chat message:', errorData.error)
                throw new Error(errorData.error)
            }

            const responseData = await response.json()
            console.log('Success:', responseData.message)
            return responseData
        } catch (error) {
            console.error('Error calling saveChatMessage API:', error)
            throw error
        }
    }

    const handleContactClick = (contact: Contact) => {
        setActiveContact(contact)
    }
    // Generate a random number for 1/3 chance



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto space-y-8"
            >
                <h1 className="text-4xl font-bold text-center text-purple-800">Company Internal Chat</h1>
                <Card className="shadow-xl overflow-hidden">
                    <div className="flex h-[600px]">
                        {/* Contacts Panel (Left) */}
                        <div className="w-1/4 bg-white border-r border-gray-200">
                            <CardHeader className="border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-purple-800">Chats</h2>
                            </CardHeader>
                            <ScrollArea className="h-[calc(600px-56px)]">
                                {contacts.map(contact => (
                                    <div
                                        key={contact.id}
                                        className={`flex items-center space-x-4 p-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100 ${activeContact?.id === contact.id ? 'bg-pink-100' : ''}`}
                                        onClick={() => handleContactClick(contact)}
                                    >
                                        <Avatar>
                                            <AvatarImage src={contact.avatar} alt={contact.name} />
                                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-purple-800">{contact.name}</div>
                                            <div className="text-sm text-gray-600">{contact.lastMessage}</div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>

                        {/* Chat Area (Center) */}
                        <div className="flex-1 flex flex-col bg-white">
                            {activeContact ? (
                                <>
                                    <CardHeader className="border-b border-gray-200 bg-white">
                                        <h2 className="text-xl font-semibold text-purple-800">{activeContact.name}</h2>
                                    </CardHeader>
                                    <ScrollArea className="flex-1 p-4">
                                        {chats.find(chat => chat.contactId === activeContact.id)?.messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex items-end mb-4 ${
                                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                                }`}
                                            >
                                                {message.sender === 'contact' && (
                                                    <Avatar className="mr-2">
                                                        <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                                                        <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div
                                                    className={`p-2 rounded-lg ${
                                                        message.sender === 'user'
                                                            ? 'bg-purple-500 text-white'
                                                            : 'bg-pink-100 text-purple-800'
                                                    } max-w-[80%]`}
                                                >
                                                    {message.text}
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                    <CardContent className="border-t border-gray-200 p-4">
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                placeholder="Type a message"
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                className="flex-grow"
                                            />
                                            <Button onClick={handleSendMessage} className="bg-purple-500 hover:bg-purple-600">
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                <div className="flex-1 flex justify-center items-center text-gray-500">
                                    <MessageCircle className="h-12 w-12 mr-2" />
                                    Select a contact to start chatting
                                </div>
                            )}
                        </div>

                        {/* Calendar Panel (Right) */}
                        <div className="w-1/4 bg-white border-l border-gray-200">
                            <CardHeader className="border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-purple-800 flex items-center">
                                    <CalendarIcon className="h-5 w-5 mr-2" /> Calendar
                                </h2>
                            </CardHeader>
                            <CardContent className="p-4">
                                <Calendar />
                            </CardContent>
                        </div>
                    </div>
                </Card>
                <ChatWidget />
            </motion.div>
        </div>
    )
}