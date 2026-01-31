import { cn } from "@/lib/utils";

interface VisionTagProps {
  children: React.ReactNode;
  className?: string;
}

export function VisionTag({ children, className }: VisionTagProps) {
  return (
    <span className={cn("vision-tag", className)}>
      {children}
    </span>
  );
}
