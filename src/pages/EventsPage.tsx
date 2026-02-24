import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useEvents, TechEvent } from "@/hooks/useEvents";
import {
    Calendar,
    MapPin,
    Trophy,
    ExternalLink,
    Search,
    Loader2,
    Zap,
    Sparkles,
    Globe,
    Cpu,
    Clock,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format, isPast, differenceInDays } from "date-fns";

// ─── HARDCODED DEMO EVENTS ─────────────────────────────────────────────────────
const DEMO_EVENTS: TechEvent[] = [
    {
        id: "demo-1",
        title: "Smart India Hackathon 2026",
        description: "The world's biggest open innovation model. Students solve pressing national problems across 6 categories. Prize pool: ₹1 Crore+. Top solutions get government implementation.",
        event_type: "hackathon",
        organizer: "Government of India · MIC",
        location: "Pan India",
        start_date: "2026-08-15T09:00:00+05:30",
        end_date: "2026-08-17T18:00:00+05:30",
        registration_deadline: "2026-07-30T23:59:59+05:30",
        registration_url: "https://sih.gov.in",
        banner_url: null,
        tags: ["GovTech", "Innovation", "Nation-wide", "₹1Cr+ Prize"],
        is_featured: true,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-2",
        title: "Builder's Monsoon Hack '26",
        description: "A 48-hour intense build sprint for AI-first SaaS products. Top 3 teams get equity rounds and Futora Labs incubation. Real mentors, real product feedback.",
        event_type: "hackathon",
        organizer: "Futora Labs",
        location: "Pune / Hybrid",
        start_date: "2026-04-10T10:00:00+05:30",
        end_date: "2026-04-12T10:00:00+05:30",
        registration_deadline: "2026-04-05T23:59:59+05:30",
        registration_url: "#register",
        banner_url: null,
        tags: ["AI", "SaaS", "Equity", "48H Build"],
        is_featured: true,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-3",
        title: "Elite AI Dev Meetup",
        description: "Invite-only gathering for top AI builders in Mumbai. Discuss LLM fine-tuning, multi-agent systems, and AI productization. Includes dinner + demo night.",
        event_type: "meetup",
        organizer: "Futora Elite Network",
        location: "Mumbai, Maharashtra",
        start_date: "2026-03-25T18:00:00+05:30",
        end_date: "2026-03-25T22:00:00+05:30",
        registration_deadline: "2026-03-24T23:59:59+05:30",
        registration_url: "#ai-meetup",
        banner_url: null,
        tags: ["AI", "LLM", "Networking", "Invite-Only"],
        is_featured: true,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-4",
        title: "Google I/O Extended Delhi 2026",
        description: "Local developer community event organized by GDG New Delhi. Watch Google I/O together, attend hands-on AI and Android labs, and network with 500+ engineers.",
        event_type: "workshop",
        organizer: "GDG New Delhi",
        location: "New Delhi / Hybrid",
        start_date: "2026-06-20T09:30:00+05:30",
        end_date: "2026-06-20T18:00:00+05:30",
        registration_deadline: "2026-06-15T23:59:59+05:30",
        registration_url: "https://gdg.community.dev",
        banner_url: null,
        tags: ["Google", "AI", "Android", "Cloud", "Hands-on"],
        is_featured: false,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-5",
        title: "Unstop Ignite Challenge",
        description: "A pan-India competition for engineering students to crack real-world industry case studies. Winners receive pre-placement interview invites from Fortune 500 companies.",
        event_type: "hackathon",
        organizer: "Unstop",
        location: "Online · All India",
        start_date: "2026-05-12T10:00:00+05:30",
        end_date: "2026-05-20T23:59:59+05:30",
        registration_deadline: "2026-05-01T23:59:59+05:30",
        registration_url: "https://unstop.com",
        banner_url: null,
        tags: ["Case Study", "Engineering", "PPO", "Online"],
        is_featured: false,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-6",
        title: "India Blockchain Week 2026",
        description: "India's premier Web3 conference. 3 days, 80+ speakers, 3000+ attendees. Featuring global founders, DeFi protocols, NFT launches, and hackathon side events.",
        event_type: "conference",
        organizer: "IBW DAO Foundation",
        location: "Bangalore, Karnataka",
        start_date: "2026-11-05T10:00:00+05:30",
        end_date: "2026-11-07T20:00:00+05:30",
        registration_deadline: "2026-10-25T23:59:59+05:30",
        registration_url: "https://indiablockchainweek.com",
        banner_url: null,
        tags: ["Web3", "Blockchain", "DeFi", "Bangalore"],
        is_featured: true,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-7",
        title: "HackWithInfy 2026",
        description: "Infosys' flagship coding and innovation hackathon for college students across India. Compete in AI, data science, and full-stack tracks. Winners get direct PPO.",
        event_type: "hackathon",
        organizer: "Infosys",
        location: "Online + Mysore Finals",
        start_date: "2026-07-01T09:00:00+05:30",
        end_date: "2026-07-15T18:00:00+05:30",
        registration_deadline: "2026-06-25T23:59:59+05:30",
        registration_url: "https://hackwithinfy.com",
        banner_url: null,
        tags: ["Infosys", "AI", "Full-Stack", "PPO", "Data Science"],
        is_featured: false,
        created_at: new Date().toISOString(),
    },
    {
        id: "demo-8",
        title: "Microsoft Imagine Cup India 2026",
        description: "Student tech competition by Microsoft. Build innovative solutions using Azure, AI, and mixed reality. National finalists pitch at Microsoft India HQ. Global finals in Seattle.",
        event_type: "hackathon",
        organizer: "Microsoft India",
        location: "Online / Hyderabad",
        start_date: "2026-09-10T09:00:00+05:30",
        end_date: "2026-09-30T18:00:00+05:30",
        registration_deadline: "2026-09-01T23:59:59+05:30",
        registration_url: "https://imaginecup.microsoft.com",
        banner_url: null,
        tags: ["Microsoft", "Azure", "AI", "Global", "Student"],
        is_featured: true,
        created_at: new Date().toISOString(),
    },
];

// ─── COUNTDOWN BADGE ─────────────────────────────────────────────────────────
const CountdownBadge = ({ deadline }: { deadline: string | null }) => {
    if (!deadline) return null;
    const d = new Date(deadline);
    if (isPast(d)) return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[9px] font-black uppercase">CLOSED</span>;
    const days = differenceInDays(d, new Date());
    return (
        <span className={cn(
            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1",
            days <= 7 ? "bg-red-500/20 text-red-400" : days <= 30 ? "bg-amber-500/20 text-amber-400" : "bg-primary/10 text-primary"
        )}>
            <Clock className="h-2.5 w-2.5" />
            {days <= 0 ? "Today!" : `${days}d left`}
        </span>
    );
};

// ─── EVENT TYPE ICON ───────────────────────────────────────────────────────────
const EventTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'hackathon': return <Zap className="h-40 w-40" />;
        case 'conference': return <Users className="h-40 w-40" />;
        case 'workshop': return <Cpu className="h-40 w-40" />;
        default: return <Globe className="h-40 w-40" />;
    }
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const EventsPage = () => {
    const { data: dbEvents } = useEvents();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    // Merge live DB events on top of hardcoded demo events
    const allEvents = [...DEMO_EVENTS, ...(dbEvents || [])];

    const filteredEvents = allEvents.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filter === "all" || event.event_type === filter;
        return matchesSearch && matchesFilter;
    });

    const featuredEvents = filteredEvents.filter(e => e.is_featured);
    const regularEvents = filteredEvents.filter(e => !e.is_featured);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">

                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />

                {/* ── HEADER ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 px-2">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                <Trophy className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Events Hub 🇮🇳</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-foreground italic uppercase tracking-tighter leading-[0.85]">
                            HACKATHONS<br /><span className="text-primary/40 dark:text-primary/20">& EVENTS</span>
                        </h1>
                        <p className="text-muted-foreground font-bold italic mt-4 max-w-xl text-base md:text-lg">
                            The pulse of Indian tech. Discover, register, and compete at the biggest hackathons and conferences across the country.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="p-6 rounded-[2.5rem] bg-card border border-border shadow-sm text-center flex flex-col justify-center min-w-[100px]">
                            <div className="text-3xl font-black text-foreground italic tracking-tighter">{allEvents.length}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Events Listed</div>
                        </div>
                        <Button className="h-20 px-8 rounded-[2.5rem] bg-primary text-black font-black italic uppercase tracking-tighter shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-sm">
                            HOST YOUR<br />EVENT
                        </Button>
                    </motion.div>
                </div>

                {/* ── SEARCH + FILTER ── */}
                <div className="flex flex-col md:flex-row gap-3 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search hackathons, tags, or organizers..."
                            className="pl-12 h-14 bg-card border-border rounded-2xl text-foreground font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['all', 'hackathon', 'conference', 'workshop', 'meetup'].map(type => (
                            <Button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={cn(
                                    "px-5 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                                    filter === type
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "bg-card text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* ── FEATURED EVENTS ── */}
                {featuredEvents.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Featured & Hot</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {featuredEvents.map((event, idx) => (
                                <EventCard key={event.id} event={event} idx={idx} featured />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── ALL OTHER EVENTS ── */}
                {regularEvents.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">All Upcoming Events</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularEvents.map((event, idx) => (
                                <EventCard key={event.id} event={event} idx={idx} />
                            ))}
                        </div>
                    </div>
                )}

                {filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <Cpu className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <h3 className="text-xl font-black text-foreground italic uppercase tracking-tighter">No Events Found</h3>
                        <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

// ─── EVENT CARD ───────────────────────────────────────────────────────────────
const EventCard = ({ event, idx, featured = false }: { event: TechEvent; idx: number; featured?: boolean }) => {
    const typeColors: Record<string, string> = {
        hackathon: "text-primary border-primary/20 bg-primary/10",
        conference: "text-blue-400 border-blue-400/20 bg-blue-400/10",
        workshop: "text-purple-400 border-purple-400/20 bg-purple-400/10",
        meetup: "text-orange-400 border-orange-400/20 bg-orange-400/10",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className={cn(
                "group relative flex flex-col p-8 rounded-[3rem] border transition-all duration-300 overflow-hidden",
                featured
                    ? "bg-gradient-to-br from-card to-background border-border hover:border-primary/40 dark:from-[#0D111C] dark:to-[#111827] dark:border-white/10"
                    : "bg-card border-border hover:border-primary/40 dark:bg-[#0D111C] dark:border-white/5"
            )}
        >
            {/* Background icon */}
            <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                {event.event_type === 'hackathon' && <Zap className="h-48 w-48" />}
                {event.event_type === 'conference' && <Users className="h-48 w-48" />}
                {event.event_type === 'workshop' && <Cpu className="h-48 w-48" />}
                {event.event_type === 'meetup' && <Globe className="h-48 w-48" />}
            </div>

            {/* Top row */}
            <div className="flex justify-between items-start mb-5">
                <div className={cn("px-3 py-1 rounded-full border text-[10px] font-black uppercase", typeColors[event.event_type] || "text-white/60 border-white/10 bg-white/5")}>
                    {event.event_type}
                </div>
                <div className="flex items-center gap-2">
                    {event.is_featured && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-amber-400 uppercase">
                            <Sparkles className="h-3 w-3 fill-amber-400" />
                            Hot
                        </span>
                    )}
                    <CountdownBadge deadline={event.registration_deadline} />
                </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-black text-foreground italic uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">
                {event.title}
            </h3>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 italic">by {event.organizer}</p>

            {/* Description */}
            <p className="text-muted-foreground text-sm italic leading-relaxed line-clamp-3 mb-6">
                {event.description}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    <span>{format(new Date(event.start_date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground text-foreground/60">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">{event.location}</span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/50 uppercase">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <Button asChild className="mt-auto w-full rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] h-12 hover:opacity-90 transition-all shadow-xl shadow-primary/10">
                <a href={event.registration_url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    REGISTER NOW
                    <ExternalLink className="h-4 w-4" />
                </a>
            </Button>
        </motion.div>
    );
};

export default EventsPage;
