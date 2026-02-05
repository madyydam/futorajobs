 import { Layout } from "@/components/layout/Layout";
 import { JobCard } from "@/components/jobs/JobCard";
 import { useJobs } from "@/hooks/useJobs";
 import { Input } from "@/components/ui/input";
 import { Search, TrendingUp, Loader2 } from "lucide-react";
 import { motion } from "framer-motion";
 import { useState } from "react";
 import { cn } from "@/lib/utils";
 
 const categories = ["All", "AI", "Development", "Design", "Growth"];
 const filters = ["All", "Remote", "Ready to Apply"];
 
 const JobsPage = () => {
   const { jobs, isLoading } = useJobs();
   const [searchQuery, setSearchQuery] = useState("");
   const [activeCategory, setActiveCategory] = useState("All");
   const [activeFilter, setActiveFilter] = useState("All");
 
   const filteredJobs = jobs.filter((job) => {
     const matchesSearch =
       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       job.company.toLowerCase().includes(searchQuery.toLowerCase());
 
     const matchesCategory =
       activeCategory === "All" ||
       job.category.toLowerCase() === activeCategory.toLowerCase();
 
     const matchesFilter =
       activeFilter === "All" ||
       (activeFilter === "Remote" && job.is_remote) ||
       (activeFilter === "Ready to Apply" && job.is_ready);
 
     return matchesSearch && matchesCategory && matchesFilter;
   });
 
   const readyCount = jobs.filter((j) => j.is_ready).length;
 
   return (
     <Layout>
       <div className="max-w-6xl mx-auto">
         {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
         >
           <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
             Jobs
           </h1>
           <p className="text-muted-foreground mb-4">
             Build your skills, increase your readiness score, and land your dream job.
           </p>
 
           {/* Stats */}
           <div className="flex items-center gap-2 text-sm">
             <TrendingUp className="h-4 w-4 text-primary" />
             <span className="text-foreground font-medium">{readyCount}</span>
             <span className="text-muted-foreground">jobs you're ready for</span>
           </div>
         </motion.div>
 
         {/* Search & Filters */}
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="space-y-4 mb-8"
         >
           {/* Search */}
           <div className="relative max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder="Search roles or companies..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10 bg-card border-border"
             />
           </div>
 
           {/* Category Chips */}
           <div className="flex flex-wrap gap-2">
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={cn(
                   "px-4 py-2 text-sm font-medium rounded-full transition-all",
                   activeCategory === category
                     ? "bg-primary text-primary-foreground"
                     : "bg-secondary text-secondary-foreground hover:bg-accent"
                 )}
               >
                 {category}
               </button>
             ))}
           </div>
 
           {/* Filter Chips */}
           <div className="flex flex-wrap gap-2">
             {filters.map((filter) => (
               <button
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={cn(
                   "px-3 py-1.5 text-xs font-medium rounded-full transition-all border",
                   activeFilter === filter
                     ? "bg-accent border-primary text-foreground"
                     : "bg-background border-border text-muted-foreground hover:border-primary/50"
                 )}
               >
                 {filter}
               </button>
             ))}
           </div>
         </motion.div>
 
         {/* Loading State */}
         {isLoading && (
           <div className="flex items-center justify-center py-20">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
           </div>
         )}
 
         {/* Jobs Grid */}
         {!isLoading && (
           <div className="grid md:grid-cols-2 gap-4">
             {filteredJobs.map((job, index) => (
               <JobCard key={job.id} job={job} index={index} />
             ))}
           </div>
         )}
 
         {!isLoading && filteredJobs.length === 0 && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-center py-20"
           >
             <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
             <p className="text-muted-foreground mb-2">
               No jobs found matching your criteria.
             </p>
             <p className="text-sm text-muted-foreground">
               Keep learning to increase your readiness score!
             </p>
           </motion.div>
         )}
       </div>
     </Layout>
   );
 };
 
 export default JobsPage;
