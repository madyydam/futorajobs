import { GlassCard } from "@/components/ui/GlassCard";
import { SkillChip } from "@/components/ui/SkillChip";
import { VisionTag } from "@/components/ui/VisionTag";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Job {
  id: string;
  title: string;
  company: string;
  vision: string;
  skills: string[];
  location: string;
  type: string;
  visionTags?: string[];
  posted?: string;
}

interface JobCardProps {
  job: Job;
  index?: number;
}

export function JobCard({ job, index = 0 }: JobCardProps) {
  return (
    <GlassCard
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-gradient-primary/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold gradient-text">
              {job.company.charAt(0)}
            </span>
          </div>
        </div>

        {/* Vision */}
        <p className="text-sm text-secondary-foreground leading-relaxed">
          {job.vision}
        </p>

        {/* Vision Tags */}
        {job.visionTags && job.visionTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.visionTags.map((tag) => (
              <VisionTag key={tag}>{tag}</VisionTag>
            ))}
          </div>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <SkillChip key={skill}>{skill}</SkillChip>
          ))}
        </div>

        {/* Meta & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {job.type}
            </span>
          </div>
          
          <Link to={`/apply/${job.id}`}>
            <Button 
              size="sm" 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity group/btn"
            >
              Apply
              <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
