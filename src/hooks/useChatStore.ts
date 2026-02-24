import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

export interface ChatPartner {
    id: string;
    name: string;
    role: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
}

interface ChatState {
    partners: ChatPartner[];
    messages: Record<string, Message[]>;
    activePartnerId: string | null;

    // Actions
    setActivePartner: (id: string) => void;
    sendMessage: (partnerId: string, content: string) => void;
    startNewChat: (partner: ChatPartner, initialMessage?: string) => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            partners: [
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
                }
            ],
            messages: {
                "1": [
                    { id: "1", senderId: "1", content: "Hey! I saw your portfolio on FutoraCareer. Great stuff.", timestamp: new Date(Date.now() - 3600000).toISOString() },
                    { id: "2", senderId: "me", content: "Thanks Sahil! Glad you liked it.", timestamp: new Date(Date.now() - 3000000).toISOString() },
                    { id: "3", senderId: "1", content: "The project looks promising. When can we chat?", timestamp: new Date(Date.now() - 2500000).toISOString() },
                ],
                "2": [
                    { id: "4", senderId: "2", content: "Thanks for applying! We'll review it.", timestamp: new Date(Date.now() - 86400000).toISOString() },
                ]
            },
            activePartnerId: "1",

            setActivePartner: (id) => set({ activePartnerId: id }),

            sendMessage: (partnerId, content) => set((state) => {
                const newMessage: Message = {
                    id: Date.now().toString(),
                    senderId: "me",
                    content,
                    timestamp: new Date().toISOString(),
                };

                const updatedMessages = {
                    ...state.messages,
                    [partnerId]: [...(state.messages[partnerId] || []), newMessage]
                };

                const updatedPartners = state.partners.map(p =>
                    p.id === partnerId
                        ? { ...p, lastMessage: content, time: "Just now" }
                        : p
                );

                return {
                    messages: updatedMessages,
                    partners: updatedPartners
                };
            }),

            startNewChat: (partner, initialMessage) => set((state) => {
                const existingPartner = state.partners.find(p => p.id === partner.id);

                let updatedPartners = state.partners;
                let updatedMessages = state.messages;

                if (!existingPartner) {
                    updatedPartners = [partner, ...state.partners];
                }

                if (initialMessage) {
                    const newMessage: Message = {
                        id: Date.now().toString(),
                        senderId: "me",
                        content: initialMessage,
                        timestamp: new Date().toISOString()
                    };
                    updatedMessages = {
                        ...state.messages,
                        [partner.id]: [...(state.messages[partner.id] || []), newMessage]
                    };
                }

                return {
                    partners: updatedPartners,
                    messages: updatedMessages,
                    activePartnerId: partner.id
                };
            })
        }),
        {
            name: 'futoracareer-chat-storage',
        }
    )
);
