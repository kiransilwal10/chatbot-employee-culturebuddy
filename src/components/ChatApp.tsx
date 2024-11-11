import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatWidget from './ChatWidget'
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
    { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hey there!" },
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
            { id: 1, text: "Hi Alice! How was the meeting?", sender: 'user' },
            { id: 2, text: "It went great! We discussed the new project plans.", sender: 'contact' },
            { id: 3, text: "That’s awesome. Also, happy early birthday!", sender: 'user' },
            { id: 4, text: "Thank you! Let’s celebrate soon.", sender: 'contact' },
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
            { id: 2, text: "Absolutely! Can't wait to get out there.", sender: 'contact' },
            { id: 3, text: "Me too! Let’s grab coffee after?", sender: 'user' },
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
        }
    }

    const handleContactClick = (contact: Contact) => {
        setActiveContact(contact)
    }

    return (
        <>
            <h1 className="text-3xl font-semibold text-center mb-8">Company Internal Chat</h1>
            <div className="flex w-screen max-w-[1000px] max-h-[570px] mx-auto border rounded-lg overflow-hidden">

                {/* Contacts Panel */}
                <div className="w-1/3 bg-background border-r">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Chats</h2>
                    </div>
                    <ScrollArea className="h-[calc(100vh-5rem)]">
                        {contacts.map(contact => (
                            <div
                                key={contact.id}
                                className={`flex items-center space-x-4 p-3 hover:bg-accent cursor-pointer border-b-2 ${activeContact?.id === contact.id ? 'bg-accent' : ''}`}
                                onClick={() => handleContactClick(contact)}
                            >
                                <Avatar>
                                    <AvatarImage src={contact.avatar} alt={contact.name} />
                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">{contact.name}</div>
                                    <div className="text-sm text-muted-foreground">{contact.lastMessage}</div>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {activeContact ? (
                        <>
                            <header className="p-4 border-b bg-background">
                                <h2 className="text-xl font-semibold">{activeContact.name}</h2>
                            </header>
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
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-secondary text-secondary-foreground'
                                            } max-w-[80%]`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}

                            </ScrollArea>
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <Input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type a message"
                                    />
                                    <Button onClick={handleSendMessage}>Send</Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center flex-1">
                            <p className="text-muted-foreground">Select a contact to start chatting</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ChatWidget positioned at the bottom right */}
            <div className="fixed bottom-4 right-4 z-10">
                <ChatWidget />
            </div>
        </>
    )
}
