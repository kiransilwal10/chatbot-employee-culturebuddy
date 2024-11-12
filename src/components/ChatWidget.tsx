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
import { Button } from "@/components/ui/button.tsx";
import { Send } from "lucide-react";
import BotAvatar from '@/assets/chatbot.jpg';
import UserAvatar from '@/assets/user.jpg';
import MessageLoading from "@/components/ui/chat/message-loading.tsx";

interface Message {
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
    const [messages, setMessages] = useState<Message[]>([{ text: welcomeMessage, sender: 'bot' }]);
    const [inputValue, setInputValue] = useState<string>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
    var [isQuestionnaireDone, setIsQuestionnaireDone] = useState<boolean>(false);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasStartedQuestionnaire, setHasStartedQuestionnaire] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const askNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < initialQuestions.length) {
            setIsLoading(true);
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: initialQuestions[nextIndex], sender: 'bot' }
                ]);
                setCurrentQuestionIndex(nextIndex);
                setIsLoading(false);
            }, 1000);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: "Thank you so much for sharing! I feel like I know you better now. How can I assist you today?", sender: 'bot' }
                ]);
                setIsQuestionnaireDone(true);
                setIsLoading(false);
                console.log("Questionnaire Answers:", questionnaireAnswers);
                const questionnaireAnswersString = questionnaireAnswers
                    .map(answer => `${answer.question}: ${answer.answer}`)
                    .join("\n");

                const storedUser = sessionStorage.getItem('emailData');
                const user = JSON.parse(storedUser as string);
                const storedCalendar= sessionStorage.getItem('calenderData');
                const calendar = JSON.parse(storedCalendar as string);
                
                saveUser(user.name,user.email,questionnaireAnswersString,calendar)
            }, 1000);
        }
    };

    const saveUser = async (name:string, email:string ,about:string ,calendar:string) => {
        const userData = {
            name,       // Variable passed to function
            email,      // Variable passed to function
            about,      // Variable passed to function
            calendar    // Variable passed to function
          };
        const url = 'http://localhost:3000/api/users/save'; // Replace with your actual URL
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to save user: ${errorData.error}`);
          }
      
          const responseData = await response.json();
          console.log('User saved successfully:', responseData);
          return responseData; // Return the response data for further use
        } catch (error) {
          console.error('Error calling saveUser API:', error);
          throw error; // Re-throw to handle the error in the calling code
        }
      };
      

    const  handleClick = async() => {
        if (inputValue.trim()) {
            const storedUser = sessionStorage.getItem('emailData');
                const user = JSON.parse(storedUser as string);
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            isQuestionnaireDone = user.isUser;

            if (!isQuestionnaireDone) {
                if (!hasStartedQuestionnaire) {
                    setHasStartedQuestionnaire(true);
                    askNextQuestion();
                } else {
                    setQuestionnaireAnswers(prevAnswers => [
                        ...prevAnswers,
                        { question: initialQuestions[currentQuestionIndex], answer: inputValue }
                    ]);
                    setTimeout(askNextQuestion, 500);
                }
            } else {
                setIsLoading(true);
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: 'Thank you for your message! I\'ll get back to you shortly.', sender: 'bot' }
                    ]);
                    setIsLoading(false);
                }, 1500);
            }
            setInputValue('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleClick();
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setInputValue('');
        setCurrentQuestionIndex(-1);
        setIsQuestionnaireDone(false);
        setQuestionnaireAnswers([]);
        setIsLoading(false);
        setHasStartedQuestionnaire(false);
    };

    return (
        <ExpandableChat size="lg" position="bottom-right">
            <ExpandableChatHeader className="flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Chat with Chance ✨</h1>
                <p>Ask any question for Chance to Answer</p>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ChatMessageList>
                    {messages.map((message, index) => (
                        <ChatBubble
                            key={index}
                            variant={message.sender === 'user' ? 'sent' : 'received'}
                        >
                            <ChatBubbleAvatar
                                src={message.sender === 'user' ? UserAvatar : BotAvatar}
                                fallback={message.sender === 'user' ? 'User' : 'Bot'}
                            />
                            <ChatBubbleMessage>
                                {message.text}

                            </ChatBubbleMessage>
                        </ChatBubble>
                    ))}
                    {isLoading && (
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src={BotAvatar} fallback="Bot" />
                            <ChatBubbleMessage>
                                <MessageLoading />
                            </ChatBubbleMessage>
                        </ChatBubble>
                    )}
                    <div ref={messagesEndRef} />
                </ChatMessageList>
            </ExpandableChatBody>
            <ExpandableChatFooter>
                <div className="flex items-center space-x-2">
                    <ChatInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={isQuestionnaireDone ? "Type your message..." : "Type your answer..."}
                        className="flex-grow rounded-full border border-gray-300 px-4 py-3 text-left align-left focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <Button onClick={handleClick} type="submit" size="icon" className="rounded-full bg-black text-white hover:bg-gray-900">
                        <Send className="w-5 h-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}