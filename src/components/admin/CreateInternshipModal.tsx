import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CreateInternshipModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CreateInternshipModal = ({ open, onOpenChange }: CreateInternshipModalProps) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<{
        title: string;
        company: string;
        description: string;
        location: string;
        stipend: string;
        duration: string;
        category: "development" | "design" | "ai" | "growth";
        is_remote: boolean;
        min_readiness_score: number;
    }>({
        title: "",
        company: "",
        description: "",
        location: "",
        stipend: "",
        duration: "",
        category: "development",
        is_remote: true,
        min_readiness_score: 60
    });

    const createMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const { error } = await supabase
                .from('internships')
                .insert([data]);
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Internship Initialized Successfully");
            queryClient.invalidateQueries({ queryKey: ['admin-internships'] });
            onOpenChange(false);
            setFormData({
                title: "",
                company: "",
                description: "",
                location: "",
                stipend: "",
                duration: "",
                category: "development",
                is_remote: true,
                min_readiness_score: 60
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create internship");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">Initiate Internship Program</DialogTitle>
                    <DialogDescription>
                        Deploy a new talent pipeline for the ecosystem.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Program Title</Label>
                            <Input
                                id="title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g. Frontend Engineering Intern"
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Host Company</Label>
                            <Input
                                id="company"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                placeholder="e.g. Futora Labs"
                                className="font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Brief</Label>
                        <Textarea
                            id="description"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe the role and key responsibilities..."
                            className="h-24 resize-none font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                placeholder="e.g. San Francisco / Remote"
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sector</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, category: val as "development" | "design" | "ai" | "growth" }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="development">Development</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="ai">AI / ML</SelectItem>
                                    <SelectItem value="growth">Growth</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="stipend" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stipend</Label>
                            <Input
                                id="stipend"
                                value={formData.stipend}
                                onChange={(e) => setFormData(prev => ({ ...prev, stipend: e.target.value }))}
                                placeholder="e.g. $2000/mo"
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</Label>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                placeholder="e.g. 3 Months"
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="score" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Min. Score</Label>
                            <Input
                                id="score"
                                type="number"
                                min="0"
                                max="100"
                                value={formData.min_readiness_score}
                                onChange={(e) => setFormData(prev => ({ ...prev, min_readiness_score: parseInt(e.target.value) || 0 }))}
                                className="font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-bold text-foreground">Remote Eligible</Label>
                            <div className="text-[10px] text-muted-foreground">Is this role available for remote candidates?</div>
                        </div>
                        <Switch
                            checked={formData.is_remote}
                            onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_remote: c }))}
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={createMutation.isPending} className="font-bold">
                            {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            LAUNCH PROGRAM
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
