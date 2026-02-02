import { Layout } from "@/components/layout/Layout";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { mockInternships } from "@/data/jobs";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filters = ["All", "Remote", "Paid", "3 months", "6 months"];

const InternshipsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredInternships = mockInternships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Remote" && internship.location === "Remote") ||
      (activeFilter === "Paid" && internship.isPaid) ||
      (activeFilter === "3 months" && internship.duration === "3 months") ||
      (activeFilter === "6 months" && internship.duration === "6 months");

    return matchesSearch && matchesFilter;
  });

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
          <p className="text-muted-foreground">
            Kickstart your career with meaningful internships at top startups.
          </p>
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

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Internships Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredInternships.map((internship, index) => (
            <InternshipCard key={internship.id} internship={internship} index={index} />
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground">
              No internships found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default InternshipsPage;
