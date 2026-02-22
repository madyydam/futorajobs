import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Check, Briefcase, GraduationCap, Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const visionTags = [
  "AI-first",
  "Open-source",
  "Remote-native",
  "Early-stage chaos",
  "Long-term builders",
  "Design-led",
  "Growth mindset",
];

const PostPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [postType, setPostType] = useState<"job" | "internship">("job");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    vision: "",
    skills: "",
    location: "Remote",
    type: "Full-time",
    duration: "3 months",
    stipend: "",
    selectedTags: [] as string[],
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a role.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (postType === "job") {
        const { error } = await supabase.from("jobs").insert({
          title: formData.title,
          company: formData.company,
          description: formData.vision,
          location: formData.location,
          category: (formData.selectedTags[0]?.toLowerCase() || "development") as "ai" | "development" | "design" | "growth",
          is_remote: formData.location === "Remote",
          min_readiness_score: 50,
          salary_range: "To be discussed",
          experience_level: formData.type,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("internships").insert({
          title: formData.title,
          company: formData.company,
          description: formData.vision,
          location: formData.location,
          category: (formData.selectedTags[0]?.toLowerCase() || "development") as "ai" | "development" | "design" | "growth",
          is_remote: formData.location === "Remote",
          min_readiness_score: 30,
          stipend: formData.stipend,
          duration: formData.duration,
        });
        if (error) throw error;
      }

      setSubmitted(true);
      toast.success(`${postType === "job" ? "Job" : "Internship"} posted successfully!`);
    } catch (error: any) {
      toast.error(error.message || "Failed to post role");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="clean-card p-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Post a Role</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to FutoraCareer to find exceptional builders for your projects.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="px-8"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In to Continue
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="clean-card text-center py-16 px-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {postType === "job" ? "Job Posted!" : "Internship Posted!"} 🎉
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Your {postType} <span className="text-foreground font-medium">{formData.title}</span> is now
                live. Great builders will find you soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate(postType === "job" ? "/jobs" : "/internships")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View All {postType === "job" ? "Jobs" : "Internships"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      title: "",
                      company: "",
                      vision: "",
                      skills: "",
                      location: "Remote",
                      type: "Full-time",
                      duration: "3 months",
                      stipend: "",
                      selectedTags: [],
                      email: "",
                    });
                  }}
                  className="border-border hover:bg-accent"
                >
                  Post Another
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Post a Role
          </h1>
          <p className="text-muted-foreground">
            Find exceptional builders. No noise, just signal.
          </p>
        </motion.div>

        {/* Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          <button
            type="button"
            onClick={() => setPostType("job")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all flex-1 justify-center",
              postType === "job"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            <Briefcase className="h-5 w-5" />
            Post Job
          </button>
          <button
            type="button"
            onClick={() => setPostType("internship")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all flex-1 justify-center",
              postType === "internship"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            <GraduationCap className="h-5 w-5" />
            Post Internship
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="clean-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  {postType === "job" ? "Role Title" : "Internship Title"} *
                </Label>
                <Input
                  id="title"
                  placeholder={postType === "job" ? "e.g., AI Engineer, Full-Stack Developer" : "e.g., Frontend Intern, Marketing Intern"}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="mt-2 bg-card border-border"
                />
              </div>

              {/* Company */}
              <div>
                <Label htmlFor="company" className="text-sm font-medium text-foreground">
                  Company / Project *
                </Label>
                <Input
                  id="company"
                  placeholder="Your company or project name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                  className="mt-2 bg-card border-border"
                />
              </div>

              {/* Vision */}
              <div>
                <Label htmlFor="vision" className="text-sm font-medium text-foreground">
                  Vision Line *
                </Label>
                <p className="text-xs text-muted-foreground mb-2">
                  One powerful sentence about what you're building
                </p>
                <Textarea
                  id="vision"
                  placeholder="We're building the future of..."
                  value={formData.vision}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                  required
                  maxLength={150}
                  className="mt-1 bg-card border-border min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formData.vision.length}/150
                </p>
              </div>

              {/* Skills */}
              <div>
                <Label htmlFor="skills" className="text-sm font-medium text-foreground">
                  Required Skills *
                </Label>
                <Input
                  id="skills"
                  placeholder="React, TypeScript, Node.js (comma-separated)"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  required
                  className="mt-2 bg-card border-border"
                />
              </div>

              {/* Location & Type / Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-foreground">
                    Location
                  </Label>
                  <select
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                <div>
                  {postType === "job" ? (
                    <>
                      <Label htmlFor="type" className="text-sm font-medium text-foreground">
                        Type
                      </Label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        className="mt-2 w-full px-3 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                        Duration
                      </Label>
                      <select
                        id="duration"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        className="mt-2 w-full px-3 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                      >
                        <option value="1 month">1 month</option>
                        <option value="2 months">2 months</option>
                        <option value="3 months">3 months</option>
                        <option value="4 months">4 months</option>
                        <option value="6 months">6 months</option>
                      </select>
                    </>
                  )}
                </div>
              </div>

              {/* Stipend (for internships) */}
              {postType === "internship" && (
                <div>
                  <Label htmlFor="stipend" className="text-sm font-medium text-foreground">
                    Stipend
                  </Label>
                  <Input
                    id="stipend"
                    placeholder="e.g., ₹20,000/month or Unpaid"
                    value={formData.stipend}
                    onChange={(e) =>
                      setFormData({ ...formData, stipend: e.target.value })
                    }
                    className="mt-2 bg-card border-border"
                  />
                </div>
              )}

              {/* Vision Tags */}
              <div>
                <Label className="text-sm font-medium text-foreground">Vision Tags</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Select tags that describe your culture
                </p>
                <div className="flex flex-wrap gap-2">
                  {visionTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                        formData.selectedTags.includes(tag)
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-secondary text-secondary-foreground border-border hover:border-muted-foreground"
                      )}
                    >
                      {formData.selectedTags.includes(tag) && (
                        <Check className="inline h-3 w-3 mr-1" />
                      )}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Contact Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hiring@yourcompany.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="mt-2 bg-card border-border"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Rocket className="h-5 w-5 mr-2" />
                )}
                Publish {postType === "job" ? "Job" : "Internship"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div >
    </Layout >
  );
};

export default PostPage;
