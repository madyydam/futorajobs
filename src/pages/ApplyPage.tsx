import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Check, Briefcase, Link2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockJobs } from "@/data/jobs";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Intent", icon: Briefcase },
  { id: 2, title: "Proof of Work", icon: Link2 },
  { id: 3, title: "Availability", icon: Clock },
];

const ApplyPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    intent: "",
    portfolio: "",
    github: "",
    otherLink: "",
    availability: "full-time",
  });
  const [submitted, setSubmitted] = useState(false);

  const job = mockJobs.find((j) => j.id === jobId);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.intent.trim().length > 20;
      case 2:
        return formData.portfolio.trim() || formData.github.trim();
      case 3:
        return formData.availability;
      default:
        return false;
    }
  };

  if (!job) {
    return (
      <Layout>
        <div className="container max-w-2xl px-4 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
        </div>
      </Layout>
    );
  }

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
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                Application Submitted! 🚀
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Your application for <span className="text-foreground font-medium">{job.title}</span> at{" "}
                <span className="text-foreground font-medium">{job.company}</span> has been received.
                We'll get back to you soon.
              </p>
              <Button
                onClick={() => navigate("/jobs")}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                Explore More Roles
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-10">
        {/* Job Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground mb-2">Applying for</p>
          <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
          <p className="text-muted-foreground">{job.company}</p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive && "bg-primary/20 text-primary",
                  isCompleted && "bg-primary/10 text-primary/70",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Form Steps */}
        <GlassCard className="p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-2">Your Intent</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Why do you want to build this future? What draws you to this role?
                </p>
                <Textarea
                  placeholder="I want to join because..."
                  value={formData.intent}
                  onChange={(e) =>
                    setFormData({ ...formData, intent: e.target.value })
                  }
                  className="min-h-[180px] bg-secondary/30 border-border/50 focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Minimum 20 characters. Be authentic.
                </p>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-2">Proof of Work</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Show us what you've built. Links speak louder than resumes.
                </p>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="portfolio" className="text-sm text-muted-foreground">
                      Portfolio / Personal Site
                    </Label>
                    <Input
                      id="portfolio"
                      placeholder="https://yoursite.com"
                      value={formData.portfolio}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolio: e.target.value })
                      }
                      className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github" className="text-sm text-muted-foreground">
                      GitHub / GitLab
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/username"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="other" className="text-sm text-muted-foreground">
                      Other Link (Twitter, Product, etc.)
                    </Label>
                    <Input
                      id="other"
                      placeholder="https://..."
                      value={formData.otherLink}
                      onChange={(e) =>
                        setFormData({ ...formData, otherLink: e.target.value })
                      }
                      className="mt-2 bg-secondary/30 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-2">Availability</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  How much time can you commit to this role?
                </p>
                <RadioGroup
                  value={formData.availability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, availability: value })
                  }
                  className="space-y-3"
                >
                  {[
                    { value: "full-time", label: "Full-time", desc: "40+ hours/week" },
                    { value: "part-time", label: "Part-time", desc: "20-30 hours/week" },
                    { value: "intern", label: "Internship", desc: "Learning + building" },
                    { value: "collab", label: "Collaboration", desc: "Project-based" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                        formData.availability === option.value
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/50 hover:border-border"
                      )}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.desc}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {currentStep === 3 ? "Submit Application" : "Continue"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default ApplyPage;
