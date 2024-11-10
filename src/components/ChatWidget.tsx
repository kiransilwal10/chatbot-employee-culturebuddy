import React, { useState, useEffect, useRef } from 'react';
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
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import BotAvatar from '@/assets/chatbot.jpg';
import UserAvatar from '@/assets/user.jpg';
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

interface QuestionnaireAnswer {
    question: string;
    answer: string;
}

const initialQuestions = [
    "I'd love to know when your special day is! When's your birthday?",
    "What kind of activities do you enjoy in your free time? Any fun hobbies?",
    "I'm curious about what fascinates you. What are some of your interests?",
    "Is there anything else you'd like your coworkers to know about you? Feel free to share!"
];

const welcomeMessage = "Hey there! 👋 I'm so excited to chat with you! Before we dive in, I'd love to get to know you a bit better. Mind if I ask a few quick questions?";

export default function ChatWidget() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
    const [isQuestionnaireDone, setIsQuestionnaireDone] = useState<boolean>(false);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswer[]>([]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const askNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < initialQuestions.length) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: Date.now(), text: initialQuestions[nextIndex], sender: 'bot' }
            ]);
            setCurrentQuestionIndex(nextIndex);
        } else {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: Date.now(), text: "Thank you so much for sharing! I feel like I know you better now. How can I assist you today?", sender: 'bot' }
            ]);
            setIsQuestionnaireDone(true);
            console.log("Questionnaire Answers:", questionnaireAnswers);
        }
    };

    const handleSubmit = () => {
        if (inputValue.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: Date.now(), text: inputValue, sender: 'user' }
            ]);

            if (!isQuestionnaireDone) {
                setQuestionnaireAnswers(prevAnswers => [
                    ...prevAnswers,
                    { question: initialQuestions[currentQuestionIndex], answer: inputValue }
                ]);
                setTimeout(askNextQuestion, 1000);
            } else {
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { id: Date.now(), text: 'Thank you for your message! I\'ll get back to you shortly.', sender: 'bot' }
                    ]);
                }, 1500);
            }

            setInputValue('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (isExpanded && messages.length === 0) {
            setMessages([{ id: Date.now(), text: welcomeMessage, sender: 'bot' }]);
            setTimeout(askNextQuestion, 1000);
        }
    }, [isExpanded]);

    // Auto-scroll to the bottom of chat when messages change
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div>
            {!isExpanded && (
                <Button onClick={() => setIsExpanded(true)} className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-900 shadow-lg">
                    Chat with Us
                </Button>
            )}

            {isExpanded && (
                <ExpandableChat size="lg" position="bottom-right">
                    <ExpandableChatHeader className="flex items-center justify-center py-6 bg-gray-700 text-white rounded-t-lg shadow-md">
                        <span className="text-3xl mr-3">👋</span>
                        <h1 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>Chat with Chance</h1>
                    </ExpandableChatHeader>
                    <ExpandableChatBody className="p-4 bg-gray-100 overflow-y-auto no-scrollbar" style={{ backgroundImage: 'url(/path-to-your-pattern.png)', backgroundSize: 'cover', opacity: 0.9 }}>
                        <ChatMessageList>
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <ChatBubble className={`${message.sender === 'bot' ? 'bg-gray-200 text-gray-700 text-left' : 'bg-gray-200 text-gray-700 text-left'} max-w-xs p-3 rounded-lg shadow-sm`}>
                                            <div className="flex items-center space-x-2">
                                                {message.sender === 'bot' && <ChatBubbleAvatar src={BotAvatar} fallback="Bot" />}
                                                <ChatBubbleMessage>{message.text}</ChatBubbleMessage>
                                                {message.sender === 'user' && <ChatBubbleAvatar src={UserAvatar} fallback="User" />}
                                            </div>
                                        </ChatBubble>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={chatEndRef} /> {/* Empty div for auto-scrolling */}
                        </ChatMessageList>
                    </ExpandableChatBody>
                    <ExpandableChatFooter className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <ChatInput
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
                                placeholder={isQuestionnaireDone ? "Type your message..." : "Type your answer..."}
                                className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-left align-middle focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <Button onClick={handleSubmit} type="submit" size="icon" className="rounded-full bg-gray-800 text-white hover:bg-gray-900">
                                <Send className="w-5 h-5" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </div>
                    </ExpandableChatFooter>
                </ExpandableChat>
            )}
        </div>
    );
}
