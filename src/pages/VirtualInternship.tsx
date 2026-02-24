import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useInternships } from "@/hooks/useInternships";
import { useVirtualInternship } from "@/hooks/useVirtualInternship";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    Trophy,
    FileText,
    ExternalLink,
    Loader2,
    Briefcase,
    ShieldCheck,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const VirtualInternshipPage = () => {
    const { id } = useParams();
    const { internships, isLoading: isLoadingInternships } = useInternships();
    const {
        submissions,
        isLoadingSubmissions,
        certificate,
        isLoadingCertificate,
        submitTask,
        claimCertificate
    } = useVirtualInternship(id);

    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);
    const [submissionContent, setSubmissionContent] = useState("");
    const [submissionUrl, setSubmissionUrl] = useState("");

    const internship = internships.find(i => i.id === id);

    if (isLoadingInternships || isLoadingSubmissions || isLoadingCertificate) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    if (!internship || !internship.is_virtual) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Virtual Internship Not Found</h1>
                    <Button asChild>
                        <Link to="/internships">Back to Internships</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    const tasks = internship.tasks || [];
    const completedTasksCount = submissions.filter(s => s.status === 'completed' || s.status === 'approved').length;
    const isAllTasksCompleted = completedTasksCount === tasks.length && tasks.length > 0;

    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTaskIndex === null) return;

        await submitTask.mutateAsync({
            taskIndex: activeTaskIndex,
            content: submissionContent,
            url: submissionUrl
        });

        setActiveTaskIndex(null);
        setSubmissionContent("");
        setSubmissionUrl("");
    };

    const handleClaimCertificate = async () => {
        if (!internship.certificate_template) return;

        await claimCertificate.mutateAsync({
            title: internship.certificate_template.title,
            issuer: internship.certificate_template.issuer
        });
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link to="/internships" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        BACK TO INTERNSHIPS
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-500 uppercase tracking-widest">
                                    Virtual Task-Based
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{internship.company}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                                {internship.title}
                            </h1>
                        </div>

                        {certificate ? (
                            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                                <Trophy className="h-6 w-6 text-primary" />
                                <div>
                                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Certificate Earned!</div>
                                    <div className="text-sm font-bold text-white">{(certificate as any).title}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex justify-between items-center mb-2 gap-8">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Progress</span>
                                    <span className="text-sm font-bold text-white">{completedTasksCount}/{tasks.length}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${(completedTasksCount / tasks.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Tasks List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            INTERNSHIP TASKS
                        </h2>

                        {tasks.map((task: any, index: number) => {
                            const submission = (submissions as any[]).find(s => s.task_index === index);
                            const isCompleted = submission?.status === 'completed' || submission?.status === 'approved';

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "p-6 rounded-3xl border transition-all",
                                        isCompleted
                                            ? "bg-primary/5 border-primary/20"
                                            : "bg-white/5 border-white/10 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="mt-1">
                                                {isCompleted ? (
                                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                                ) : (
                                                    <Circle className="h-6 w-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className={cn(
                                                    "text-lg font-bold mb-1 uppercase tracking-tight",
                                                    isCompleted ? "text-primary/80" : "text-white"
                                                )}>
                                                    Task {index + 1}: {task.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {task.description}
                                                </p>

                                                {isCompleted && submission.submission_url && (
                                                    <a
                                                        href={submission.submission_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[10px] font-bold text-primary mt-4 uppercase hover:underline"
                                                    >
                                                        View Submission <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {!isCompleted && !certificate && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setActiveTaskIndex(activeTaskIndex === index ? null : index)}
                                                className="rounded-xl border-white/10 hover:bg-white/5 font-bold text-[10px]"
                                            >
                                                {activeTaskIndex === index ? "CANCEL" : "SUBMIT"}
                                            </Button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {activeTaskIndex === index && (
                                            <motion.form
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                onSubmit={handleTaskSubmit}
                                                className="mt-6 pt-6 border-t border-white/10 space-y-4 overflow-hidden"
                                            >
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Write your findings or summary (Optional)</label>
                                                    <Textarea
                                                        value={submissionContent}
                                                        onChange={(e) => setSubmissionContent(e.target.value)}
                                                        placeholder="How did you complete this task?"
                                                        className="bg-black/40 border-white/10 rounded-xl resize-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Submission Link (Figma, GitHub, Drive, etc.)</label>
                                                    <Input
                                                        value={submissionUrl}
                                                        onChange={(e) => setSubmissionUrl(e.target.value)}
                                                        placeholder="https://..."
                                                        className="bg-black/40 border-white/10 rounded-xl"
                                                        required
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    disabled={submitTask.isPending}
                                                    className="w-full bg-primary text-black font-black uppercase tracking-widest rounded-xl"
                                                >
                                                    {submitTask.isPending ? "SUBMITTING..." : "COMPLETE TASK"}
                                                </Button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <section className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-xl">
                            <h3 className="text-sm font-black italic uppercase tracking-[0.2em] text-primary/60 mb-6 flex items-center gap-2">
                                <div className="h-4 w-1 bg-primary rounded-full" />
                                About
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                {internship.description}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    {internship.category.toUpperCase()}
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    Verified Agency
                                </div>
                            </div>
                        </section>

                        <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 shadow-xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                <Trophy className="h-40 w-40" />
                            </div>

                            <h3 className="text-lg font-black italic uppercase tracking-tighter text-amber-500 mb-4">CERTIFICATION</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                                Complete all tasks successfully to unlock your digital certificate from {internship.company}.
                            </p>

                            {certificate ? (
                                <Button className="w-full bg-amber-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-amber-600">
                                    VIEW CERTIFICATE
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleClaimCertificate}
                                    disabled={!isAllTasksCompleted || claimCertificate.isPending}
                                    className={cn(
                                        "w-full font-black uppercase tracking-widest rounded-xl transition-all",
                                        isAllTasksCompleted
                                            ? "bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                                            : "bg-white/5 text-muted-foreground cursor-not-allowed border border-white/10"
                                    )}
                                >
                                    {isAllTasksCompleted ? "CLAIM CERTIFICATE" : "LOCKED"}
                                    {!isAllTasksCompleted && <Lock className="h-4 w-4 ml-2" />}
                                </Button>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VirtualInternshipPage;
