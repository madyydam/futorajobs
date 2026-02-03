import { BookOpen, Target, Hammer } from "lucide-react";
import { motion } from "framer-motion";

const learningModes = [
  {
    icon: BookOpen,
    title: "Courses",
    description: "Short, practical skill courses designed for real-world application.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Target,
    title: "Career Tracks",
    description: "Structured paths from learning to your dream role.",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Hammer,
    title: "Projects & Proof",
    description: "Build real things that prove your skills to employers.",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

export function LearningModesSection() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Choose How You Want to Learn
        </h2>
        <p className="text-muted-foreground text-sm">
          Multiple paths, one destination: getting hired.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {learningModes.map((mode, index) => {
          const Icon = mode.icon;
          return (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="clean-card p-6 hover-lift cursor-pointer group text-center h-full">
                <div className={`w-14 h-14 rounded-2xl ${mode.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {mode.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mode.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
