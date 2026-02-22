import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Send, Bot, User, ArrowLeft, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Message {
    id: string;
    role: "bot" | "user";
    content: string;
    timestamp: Date;
}

const InterviewCoach = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hello! I'm your AI Interview Coach. I can help you practice for your upcoming startup interviews. Which role are you preparing for today?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = useCallback(() => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: `That's great! Let's start practicing for a ${inputValue} role. I'll ask you a few questions and provide feedback on your answers. \n\nFirst question: Can you tell me about a challenging project you've worked on recently?`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    }, [inputValue]);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto h-[calc(100vh-11rem)] md:h-[calc(100vh-8rem)] flex flex-col">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8 md:h-10 md:w-10"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary animate-pulse" />
                                AI Interview Coach
                            </h1>
                            <p className="text-[10px] md:text-sm text-muted-foreground">Master your startup interviews</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])} className="gap-2 text-xs h-8 md:h-9">
                        <RefreshCw className="h-3 w-3" />
                        Reset
                    </Button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-card/50 backdrop-blur-sm border border-border rounded-xl md:rounded-2xl overflow-hidden flex flex-col shadow-xl">
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 scrollbar-hide"
                    >
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-3 max-w-[85%] mr-auto"
                            >
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                    <Bot className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="bg-muted p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 md:p-4 bg-background/50 border-t border-border">
                        <div className="relative">
                            <textarea
                                rows={1}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Type your response here..."
                                className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none max-h-32 transition-all"
                            />
                            <Button
                                size="icon"
                                className="absolute right-2 bottom-2 h-8 w-8 rounded-lg"
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 text-center">
                            AI Coach can provide feedback on your technical and cultural fit.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const ChatMessage = memo(({ message }: { message: Message }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
            "flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%]",
            message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
        )}
    >
        <div className={cn(
            "h-7 w-7 md:h-8 md:w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
            {message.role === "user" ? <User className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Bot className="h-3.5 w-3.5 md:h-4 md:w-4" />}
        </div>
        <div className={cn(
            "p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm leading-relaxed",
            message.role === "user"
                ? "bg-primary text-primary-foreground rounded-tr-none"
                : "bg-muted text-foreground rounded-tl-none"
        )}>
            {message.content}
        </div>
    </motion.div>
));

export default InterviewCoach;
