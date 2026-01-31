import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Check } from "lucide-react";

const visionTags = [
  "AI-first",
  "Open-source",
  "Remote-native",
  "Early-stage chaos",
  "Long-term builders",
  "Design-led",
  "Growth mindset",
];

const PostJobPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    vision: "",
    skills: "",
    location: "Remote",
    type: "Full-time",
    selectedTags: [] as string[],
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container max-w-2xl px-4 py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard glow className="text-center py-16 px-8">
              <div className="w-20 h-20 rounded-full bg-gradient-primary/20 flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                Role Posted! 🎉
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Your role <span className="text-foreground font-medium">{formData.title}</span> is now
                live. Great builders will find you soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/jobs")}
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                >
                  View All Jobs
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
                      selectedTags: [],
                      email: "",
                    });
                  }}
                >
                  Post Another
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Post a <span className="gradient-text">Role</span>
          </h1>
          <p className="text-muted-foreground">
            Find exceptional builders. No noise, just signal.
          </p>
        </motion.div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Role Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., AI Engineer, Full-Stack Developer"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
              />
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company" className="text-sm font-medium">
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
                className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
              />
            </div>

            {/* Vision */}
            <div>
              <Label htmlFor="vision" className="text-sm font-medium">
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
                className="mt-1 bg-secondary/30 border-border/50 focus:border-primary/50 min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {formData.vision.length}/150
              </p>
            </div>

            {/* Skills */}
            <div>
              <Label htmlFor="skills" className="text-sm font-medium">
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
                className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
              />
            </div>

            {/* Location & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border/50 focus:border-primary/50 focus:outline-none text-sm"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              <div>
                <Label htmlFor="type" className="text-sm font-medium">
                  Type
                </Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border/50 focus:border-primary/50 focus:outline-none text-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Vision Tags */}
            <div>
              <Label className="text-sm font-medium">Vision Tags</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Select tags that describe your culture
              </p>
              <div className="flex flex-wrap gap-2">
                {visionTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      formData.selectedTags.includes(tag)
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-secondary/50 text-muted-foreground border border-border/50 hover:border-border"
                    }`}
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
              <Label htmlFor="email" className="text-sm font-medium">
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
                className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 py-6 text-base"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Publish Role
            </Button>
          </form>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default PostJobPage;
