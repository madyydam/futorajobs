 import { Layout } from "@/components/layout/Layout";
 import { InternshipCard } from "@/components/internships/InternshipCard";
 import { useInternships } from "@/hooks/useInternships";
 import { Input } from "@/components/ui/input";
 import { Search, Lock, Unlock, Loader2 } from "lucide-react";
 import { motion } from "framer-motion";
 import { useState } from "react";
 import { cn } from "@/lib/utils";
 
 const categories = ["All", "AI", "Development", "Design", "Growth"];
 const filters = ["All", "Remote", "Unlocked"];
 
 const InternshipsPage = () => {
   const { internships, isLoading } = useInternships();
   const [searchQuery, setSearchQuery] = useState("");
   const [activeCategory, setActiveCategory] = useState("All");
   const [activeFilter, setActiveFilter] = useState("All");
 
   const filteredInternships = internships.filter((internship) => {
     const matchesSearch =
       internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       internship.company.toLowerCase().includes(searchQuery.toLowerCase());
 
     const matchesCategory =
       activeCategory === "All" ||
       internship.category.toLowerCase() === activeCategory.toLowerCase();
 
     const matchesFilter =
       activeFilter === "All" ||
       (activeFilter === "Remote" && internship.is_remote) ||
       (activeFilter === "Unlocked" && internship.is_unlocked);
 
     return matchesSearch && matchesCategory && matchesFilter;
   });
 
   const unlockedCount = internships.filter((i) => i.is_unlocked).length;
   const lockedCount = internships.length - unlockedCount;
 
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
             Internships
           </h1>
           <p className="text-muted-foreground mb-4">
             Complete courses and projects to unlock internship opportunities.
           </p>
 
           {/* Stats */}
           <div className="flex gap-4">
             <div className="flex items-center gap-2 text-sm">
               <Unlock className="h-4 w-4 text-primary" />
               <span className="text-foreground font-medium">{unlockedCount}</span>
               <span className="text-muted-foreground">Unlocked</span>
             </div>
             <div className="flex items-center gap-2 text-sm">
               <Lock className="h-4 w-4 text-muted-foreground" />
               <span className="text-foreground font-medium">{lockedCount}</span>
               <span className="text-muted-foreground">Locked</span>
             </div>
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
               placeholder="Search internships..."
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
 
         {/* Internships Grid */}
         {!isLoading && (
           <div className="grid md:grid-cols-2 gap-4">
             {filteredInternships.map((internship, index) => (
               <InternshipCard key={internship.id} internship={internship} index={index} />
             ))}
           </div>
         )}
 
         {!isLoading && filteredInternships.length === 0 && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-center py-20"
           >
             <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
             <p className="text-muted-foreground mb-2">
               No internships found matching your criteria.
             </p>
             <p className="text-sm text-muted-foreground">
               Complete more courses and projects to unlock opportunities!
             </p>
           </motion.div>
         )}
       </div>
     </Layout>
   );
 };
 
 export default InternshipsPage;
