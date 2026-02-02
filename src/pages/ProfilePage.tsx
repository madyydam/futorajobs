import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Github,
  Twitter,
  Globe,
  Linkedin,
  Mail,
  Edit3,
  Save,
  X,
  Briefcase,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Builder",
    role: "Full-Stack Developer",
    bio: "Building the future, one commit at a time. Obsessed with AI, great UX, and shipping fast.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AI/ML"],
    visionTags: ["AI-first", "Remote-native", "Open-source"],
    links: {
      website: "https://alexbuilder.dev",
      github: "https://github.com/alexbuilder",
      twitter: "https://twitter.com/alexbuilder",
      linkedin: "https://linkedin.com/in/alexbuilder",
    },
    email: "alex@builder.dev",
    availability: "Open to opportunities",
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const applications = [
    { role: "AI Engineer", company: "Futora Labs", status: "reviewing", date: "Jan 28" },
    { role: "Full-Stack Developer", company: "BuildersHQ", status: "shortlisted", date: "Jan 25" },
    { role: "Product Designer", company: "Nexus Studio", status: "closed", date: "Jan 20" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Your builder identity in the Futora ecosystem
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="clean-card p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      {isEditing ? (
                        <Input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="text-xl font-bold mb-1 bg-card border-border"
                        />
                      ) : (
                        <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                      )}
                      {isEditing ? (
                        <Input
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({ ...editForm, role: e.target.value })
                          }
                          className="text-sm text-muted-foreground bg-card border-border"
                        />
                      ) : (
                        <p className="text-muted-foreground">{profile.role}</p>
                      )}
                    </div>
                  </div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    About
                  </h3>
                  {isEditing ? (
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                      className="bg-card border-border"
                    />
                  ) : (
                    <p className="text-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span key={skill} className="skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Vision Tags */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    What I'm looking for
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.visionTags.map((tag) => (
                      <span key={tag} className="vision-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Links
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.links.website && (
                      <a
                        href={profile.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    )}
                    {profile.links.github && (
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {profile.links.twitter && (
                      <a
                        href={profile.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    )}
                    {profile.links.linkedin && (
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="clean-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Status
                </h3>
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">{profile.availability}</span>
                </div>
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="clean-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Applications
                  </h3>
                </div>
                <div className="space-y-4">
                  {applications.map((app, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium text-foreground">{app.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {app.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            app.status === "shortlisted" && "text-primary",
                            app.status === "reviewing" && "text-muted-foreground",
                            app.status === "closed" && "text-muted-foreground"
                          )}
                        >
                          {app.status === "shortlisted" && (
                            <CheckCircle className="inline h-3 w-3 mr-1" />
                          )}
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <p className="text-xs text-muted-foreground">{app.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="clean-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Contact
                  </h3>
                </div>
                <p className="text-sm text-foreground">{profile.email}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
