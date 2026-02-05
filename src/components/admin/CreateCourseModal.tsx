import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CreateCourseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CreateCourseModal = ({ open, onOpenChange }: CreateCourseModalProps) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        category: "development" | "design" | "ai" | "growth";
        difficulty: "beginner" | "intermediate" | "advanced";
        duration: string;
        instructor_name: string;
        lessons_count: number;
    }>({
        title: "",
        description: "",
        category: "development",
        difficulty: "beginner",
        duration: "",
        instructor_name: "Futora AI",
        lessons_count: 0
    });

    const createMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const { error } = await supabase
                .from('courses')
                .insert([data]);
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Course Initialized Successfully");
            queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
            onOpenChange(false);
            setFormData({
                title: "",
                description: "",
                category: "development",
                difficulty: "beginner",
                duration: "",
                instructor_name: "Futora AI",
                lessons_count: 0
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create course");
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
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">Deploy New Course</DialogTitle>
                    <DialogDescription>
                        Create a new learning unit for the curriculum.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Title</Label>
                            <Input
                                id="title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g. Advanced System Design"
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</Label>
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

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</Label>
                        <Textarea
                            id="description"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="What will students learn?"
                            className="h-24 resize-none font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="difficulty" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Difficulty</Label>
                            <Select
                                value={formData.difficulty}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, difficulty: val as "beginner" | "intermediate" | "advanced" }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Est. Duration</Label>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                placeholder="e.g. 4 Weeks"
                                className="font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="instructor" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Instructor Name</Label>
                            <Input
                                id="instructor"
                                value={formData.instructor_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, instructor_name: e.target.value }))}
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lessons" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lesson Count</Label>
                            <Input
                                id="lessons"
                                type="number"
                                min="0"
                                value={formData.lessons_count}
                                onChange={(e) => setFormData(prev => ({ ...prev, lessons_count: parseInt(e.target.value) || 0 }))}
                                className="font-medium"
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={createMutation.isPending} className="font-bold">
                            {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            DEPLOY COURSE
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
