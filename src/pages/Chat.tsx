import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Bot, Search, MoreVertical, Phone, Video, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ChatPartner {
    id: string;
    name: string;
    role: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
}

interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
}

const Chat = () => {
    const [partners] = useState<ChatPartner[]>([
        {
            id: "1",
            name: "Sahil (Founder, AutoAI)",
            role: "CEO & Founder",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            lastMessage: "The project looks promising. When can we chat?",
            time: "10:30 AM",
            unread: 2,
            online: true,
        },
        {
            id: "2",
            name: "Priya (HR, DevStream)",
            role: "Recruitment Lead",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            lastMessage: "Thanks for applying! We'll review it.",
            time: "Yesterday",
            unread: 0,
            online: false,
        },
        {
            id: "3",
            name: "Rahul (CTO, PuneTech)",
            role: "CTO",
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
            lastMessage: "Can you send your GitHub profile?",
            time: "2 days ago",
            unread: 0,
            online: true,
        },
    ]);

    const [activePartnerId, setActivePartnerId] = useState(partners[0].id);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", senderId: "1", content: "Hey! I saw your portfolio on FutoraCareer. Great stuff.", timestamp: new Date(Date.now() - 3600000) },
        { id: "2", senderId: "me", content: "Thanks Sahil! Glad you liked it.", timestamp: new Date(Date.now() - 3000000) },
        { id: "3", senderId: "1", content: "The project looks promising. When can we chat?", timestamp: new Date(Date.now() - 2500000) },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [showMobileChat, setShowMobileChat] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const activePartner = partners.find(p => p.id === activePartnerId) || partners[0];

    const handleSend = useCallback(() => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: "me",
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
    }, [inputValue]);

    const handleSelectPartner = useCallback((id: string) => {
        setActivePartnerId(id);
        setShowMobileChat(true);
    }, []);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col md:flex-row bg-card/50 backdrop-blur-md border border-border rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Sidebar - Conversations List */}
                <div className={cn(
                    "w-full md:w-80 border-r border-border flex flex-col transition-all duration-300",
                    showMobileChat ? "hidden md:flex" : "flex"
                )}>
                    <div className="p-4 border-b border-border">
                        <h1 className="text-xl font-bold mb-4">Messages</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search conversations..."
                                className="pl-9 bg-muted/50 border-none rounded-xl h-11"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {partners.map((partner) => (
                            <ChatPartnerItem
                                key={partner.id}
                                partner={partner}
                                isActive={activePartnerId === partner.id}
                                onClick={handleSelectPartner}
                            />
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className={cn(
                    "flex-1 flex flex-col min-w-0 bg-background/30",
                    !showMobileChat ? "hidden md:flex" : "flex"
                )}>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-border flex items-center justify-between bg-card/30 sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden -ml-2 h-9 w-9 rounded-xl"
                                onClick={() => setShowMobileChat(false)}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <div className="relative">
                                <img src={activePartner.avatar} alt={activePartner.name} className="h-10 w-10 rounded-xl object-cover" />
                                {activePartner.online && (
                                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-card rounded-full" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <h2 className="font-bold text-sm truncate">{activePartner.name}</h2>
                                <p className="text-[10px] text-muted-foreground">{activePartner.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><Phone className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><Video className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl md:flex hidden"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide"
                    >
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className={cn(
                                        "flex flex-col max-w-[75%]",
                                        message.senderId === "me" ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-4 py-2.5 rounded-2xl text-sm",
                                        message.senderId === "me"
                                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/20"
                                            : "bg-muted text-foreground rounded-tl-none"
                                    )}>
                                        {message.content}
                                    </div>
                                    <span className="text-[9px] text-muted-foreground mt-1 px-1">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border bg-card/30">
                        <div className="flex gap-2 items-center">
                            <div className="flex-1 relative">
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
                                    placeholder="Write a message..."
                                    className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none max-h-32 transition-all overflow-hidden"
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-2 bottom-2 h-8 w-8 rounded-lg shadow-md"
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const ChatPartnerItem = memo(({ partner, isActive, onClick }: { partner: ChatPartner, isActive: boolean, onClick: (id: string) => void }) => (
    <button
        onClick={() => onClick(partner.id)}
        className={cn(
            "w-full p-4 flex gap-3 hover:bg-muted/50 transition-colors border-b border-border/50",
            isActive && "bg-primary/5 border-l-4 border-l-primary"
        )}
    >
        <div className="relative shrink-0">
            <img src={partner.avatar} alt={partner.name} className="h-12 w-12 rounded-2xl object-cover" />
            {partner.online && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 border-2 border-card rounded-full" />
            )}
        </div>
        <div className="flex-1 text-left min-w-0">
            <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm truncate">{partner.name}</span>
                <span className="text-[10px] text-muted-foreground">{partner.time}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{partner.lastMessage}</p>
        </div>
        {partner.unread > 0 && (
            <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-[10px] text-primary-foreground font-bold">{partner.unread}</span>
            </div>
        )}
    </button>
));

export default Chat;
