import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Internship } from "@/data/jobs";
import { cn } from "@/lib/utils";

interface InternshipCardProps {
  internship: Internship;
  index?: number;
}

export function InternshipCard({ internship, index = 0 }: InternshipCardProps) {
  return (
    <motion.div
      className="clean-card p-6 group cursor-pointer hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {internship.title}
              </h3>
              {internship.isPaid && (
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                  Paid
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

        {/* Vision */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {internship.vision}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {internship.skills.map((skill) => (
            <span key={skill} className="skill-chip">{skill}</span>
          ))}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {internship.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {internship.duration}
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <IndianRupee className="h-3 w-3" />
            {internship.stipend}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">{internship.posted}</span>
          <Link to={`/apply/${internship.id}`}>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group/btn"
            >
              Apply
              <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
