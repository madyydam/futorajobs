import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight, IndianRupee, Lock, Unlock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReadinessScore } from "@/components/career/ReadinessScore";

export interface InternshipCardData {
  id: string;
  title: string;
  company: string;
  company_logo?: string | null;
  description?: string | null;
  location?: string | null;
  stipend?: string | null;
  duration?: string | null;
  category: string;
  is_remote: boolean;
  min_readiness_score: number;
  readiness_score?: number;
  is_unlocked?: boolean;
}

interface InternshipCardProps {
  internship: InternshipCardData;
  index?: number;
  showReadiness?: boolean;
}

export function InternshipCard({ internship, index = 0, showReadiness = true }: InternshipCardProps) {
  const isUnlocked = internship.is_unlocked;
  const readinessScore = internship.readiness_score ?? 0;

  return (
    <motion.div
      className={cn(
        "clean-card p-6 group cursor-pointer hover-lift relative overflow-hidden",
        !isUnlocked && "opacity-75"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <div className="text-center p-4">
            <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
              {internship.min_readiness_score}% readiness required
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {internship.title}
              </h3>
              {internship.is_remote && (
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                  Remote
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{internship.company}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">
              {internship.company.charAt(0)}
            </span>
          </div>
        </div>

        {/* Description */}
        {internship.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {internship.description}
          </p>
        )}

        {/* Category Badge */}
        <div className="flex flex-wrap gap-2">
          <span className="skill-chip capitalize">{internship.category}</span>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {internship.location || "Remote"}
          </div>
          {internship.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {internship.duration}
            </div>
          )}
          {internship.stipend && (
            <div className="flex items-center gap-1 col-span-2">
              <IndianRupee className="h-3 w-3" />
              {internship.stipend}
            </div>
          )}
        </div>

        {/* Readiness Score */}
        {showReadiness && (
          <ReadinessScore
            score={readinessScore}
            minRequired={internship.min_readiness_score}
            type="internship"
          />
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-xs">
            {isUnlocked ? (
              <>
                <Unlock className="h-3 w-3 text-primary" />
                <span className="text-primary font-medium">Unlocked</span>
              </>
            ) : (
              <>
                <Lock className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Locked</span>
              </>
            )}
          </div>
          <Link to={isUnlocked ? `/apply/internship/${internship.id}` : "#"}>
            <Button
              size="sm"
              disabled={!isUnlocked}
              className={cn(
                "transition-colors group/btn",
                isUnlocked
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {isUnlocked ? "Apply" : "Locked"}
              {isUnlocked && <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
