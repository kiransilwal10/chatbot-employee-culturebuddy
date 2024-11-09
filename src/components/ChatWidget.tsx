import React, { useState } from 'react';
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button.tsx";
import { Send } from "lucide-react";
import BotAvatar from '@/assets/chatbot.jpg';
import UserAvatar from '@/assets/user.jpg';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

export default function ChatWidget() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleClick = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
            // Simulate bot response
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: 'Bot response', sender: 'bot' }]);
            }, 1000);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <ExpandableChat size="lg" position="bottom-right">
            <ExpandableChatHeader className="flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Chat with Chance ✨</h1>
                <p>Ask any question for Chance to Answer</p>
                <div className="flex gap-2 items-center pt-2">
                    <Button variant="secondary">New Chat</Button>
                    <Button variant="secondary">See FAQ</Button>
                </div>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ChatMessageList>
                    {messages.map((message, index) => (
                        <ChatBubble key={index}>
                            <ChatBubbleAvatar
                                src={message.sender === 'bot' ? BotAvatar : UserAvatar}
                                fallback={message.sender === 'bot' ? 'Bot' : 'User'}
                            />
                            <ChatBubbleMessage>{message.text}</ChatBubbleMessage>
                        </ChatBubble>
                    ))}
                </ChatMessageList>
            </ExpandableChatBody>
            <ExpandableChatFooter>
                <ChatInput value={inputValue} onChange={handleInputChange} />
                <Button onClick={handleClick} type="submit" size="icon">
                    <Send className="size-4" />
                </Button>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}