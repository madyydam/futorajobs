export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string | null
          cover_note: string | null
          id: string
          internship_id: string | null
          job_id: string | null
          readiness_score: number | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          cover_note?: string | null
          id?: string
          internship_id?: string | null
          job_id?: string | null
          readiness_score?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          applied_at?: string | null
          cover_note?: string | null
          id?: string
          internship_id?: string | null
          job_id?: string | null
          readiness_score?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      career_path_skills: {
        Row: {
          career_path_id: string
          id: string
          skill_id: string
          target_level: number | null
        }
        Insert: {
          career_path_id: string
          id?: string
          skill_id: string
          target_level?: number | null
        }
        Update: {
          career_path_id?: string
          id?: string
          skill_id?: string
          target_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "career_path_skills_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "career_path_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      career_paths: {
        Row: {
          category: Database["public"]["Enums"]["content_category"]
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          duration_weeks: number | null
          icon: string | null
          id: string
          title: string
          total_courses: number | null
          total_internships: number | null
          total_jobs: number | null
          total_projects: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          duration_weeks?: number | null
          icon?: string | null
          id?: string
          title: string
          total_courses?: number | null
          total_internships?: number | null
          total_jobs?: number | null
          total_projects?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          duration_weeks?: number | null
          icon?: string | null
          id?: string
          title?: string
          total_courses?: number | null
          total_internships?: number | null
          total_jobs?: number | null
          total_projects?: number | null
        }
        Relationships: []
      }
      course_skills: {
        Row: {
          course_id: string
          id: string
          skill_id: string
          skill_points: number | null
        }
        Insert: {
          course_id: string
          id?: string
          skill_id: string
          skill_points?: number | null
        }
        Update: {
          course_id?: string
          id?: string
          skill_id?: string
          skill_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_skills_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: Database["public"]["Enums"]["content_category"]
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          duration: string | null
          id: string
          instructor_avatar: string | null
          instructor_name: string | null
          lessons_count: number | null
          title: string
          unlocks_internships: number | null
          unlocks_jobs: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          duration?: string | null
          id?: string
          instructor_avatar?: string | null
          instructor_name?: string | null
          lessons_count?: number | null
          title: string
          unlocks_internships?: number | null
          unlocks_jobs?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          duration?: string | null
          id?: string
          instructor_avatar?: string | null
          instructor_name?: string | null
          lessons_count?: number | null
          title?: string
          unlocks_internships?: number | null
          unlocks_jobs?: number | null
        }
        Relationships: []
      }
      internship_requirements: {
        Row: {
          id: string
          internship_id: string
          project_id: string | null
          required_skill_level: number | null
          skill_id: string | null
        }
        Insert: {
          id?: string
          internship_id: string
          project_id?: string | null
          required_skill_level?: number | null
          skill_id?: string | null
        }
        Update: {
          id?: string
          internship_id?: string
          project_id?: string | null
          required_skill_level?: number | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "internship_requirements_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "internship_requirements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "internship_requirements_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          category: Database["public"]["Enums"]["content_category"]
          company: string
          company_logo: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          is_remote: boolean | null
          location: string | null
          min_readiness_score: number | null
          stipend: string | null
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["content_category"]
          company: string
          company_logo?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_remote?: boolean | null
          location?: string | null
          min_readiness_score?: number | null
          stipend?: string | null
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["content_category"]
          company?: string
          company_logo?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_remote?: boolean | null
          location?: string | null
          min_readiness_score?: number | null
          stipend?: string | null
          title?: string
        }
        Relationships: []
      }
      job_requirements: {
        Row: {
          id: string
          job_id: string
          project_id: string | null
          required_skill_level: number | null
          skill_id: string | null
        }
        Insert: {
          id?: string
          job_id: string
          project_id?: string | null
          required_skill_level?: number | null
          skill_id?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          project_id?: string | null
          required_skill_level?: number | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_requirements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_requirements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_requirements_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          category: Database["public"]["Enums"]["content_category"]
          company: string
          company_logo: string | null
          created_at: string | null
          description: string | null
          experience_level: string | null
          id: string
          is_remote: boolean | null
          location: string | null
          min_readiness_score: number | null
          salary_range: string | null
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["content_category"]
          company: string
          company_logo?: string | null
          created_at?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          is_remote?: boolean | null
          location?: string | null
          min_readiness_score?: number | null
          salary_range?: string | null
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["content_category"]
          company?: string
          company_logo?: string | null
          created_at?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          is_remote?: boolean | null
          location?: string | null
          min_readiness_score?: number | null
          salary_range?: string | null
          title?: string
        }
        Relationships: []
      }
      learning_activities: {
        Row: {
          activity_date: string
          courses_touched: number | null
          created_at: string | null
          id: string
          lessons_completed: number | null
          minutes_spent: number | null
          user_id: string
        }
        Insert: {
          activity_date?: string
          courses_touched?: number | null
          created_at?: string | null
          id?: string
          lessons_completed?: number | null
          minutes_spent?: number | null
          user_id: string
        }
        Update: {
          activity_date?: string
          courses_touched?: number | null
          created_at?: string | null
          id?: string
          lessons_completed?: number | null
          minutes_spent?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          availability: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          current_streak: number | null
          email: string | null
          full_name: string
          github_url: string | null
          id: string
          last_activity_date: string | null
          linkedin_url: string | null
          longest_streak: number | null
          role: string | null
          total_learning_days: number | null
          twitter_url: string | null
          updated_at: string | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_streak?: number | null
          email?: string | null
          full_name: string
          github_url?: string | null
          id?: string
          last_activity_date?: string | null
          linkedin_url?: string | null
          longest_streak?: number | null
          role?: string | null
          total_learning_days?: number | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_streak?: number | null
          email?: string | null
          full_name?: string
          github_url?: string | null
          id?: string
          last_activity_date?: string | null
          linkedin_url?: string | null
          longest_streak?: number | null
          role?: string | null
          total_learning_days?: number | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      project_skills: {
        Row: {
          id: string
          project_id: string
          required_level: number | null
          skill_id: string
        }
        Insert: {
          id?: string
          project_id: string
          required_level?: number | null
          skill_id: string
        }
        Update: {
          id?: string
          project_id?: string
          required_level?: number | null
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_skills_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: Database["public"]["Enums"]["content_category"]
          created_at: string | null
          deliverables: string[] | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          duration: string | null
          id: string
          title: string
          unlocks_internships: number | null
          unlocks_jobs: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          deliverables?: string[] | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          duration?: string | null
          id?: string
          title: string
          unlocks_internships?: number | null
          unlocks_jobs?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          deliverables?: string[] | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          duration?: string | null
          id?: string
          title?: string
          unlocks_internships?: number | null
          unlocks_jobs?: number | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["content_category"]
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: Database["public"]["Enums"]["content_category"]
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_career_paths: {
        Row: {
          career_path_id: string
          completed_at: string | null
          current_step: string | null
          id: string
          progress_percentage: number | null
          started_at: string | null
          user_id: string
        }
        Insert: {
          career_path_id: string
          completed_at?: string | null
          current_step?: string | null
          id?: string
          progress_percentage?: number | null
          started_at?: string | null
          user_id: string
        }
        Update: {
          career_path_id?: string
          completed_at?: string | null
          current_step?: string | null
          id?: string
          progress_percentage?: number | null
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_career_paths_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_courses: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          id: string
          progress_percentage: number | null
          started_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          id?: string
          progress_percentage?: number | null
          started_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          id?: string
          progress_percentage?: number | null
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_projects: {
        Row: {
          approved_at: string | null
          demo_url: string | null
          github_url: string | null
          id: string
          project_id: string
          status: string | null
          submission_url: string | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          demo_url?: string | null
          github_url?: string | null
          id?: string
          project_id: string
          status?: string | null
          submission_url?: string | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          approved_at?: string | null
          demo_url?: string | null
          github_url?: string | null
          id?: string
          project_id?: string
          status?: string | null
          submission_url?: string | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          courses_completed: number | null
          id: string
          last_updated: string | null
          level: number | null
          projects_completed: number | null
          skill_id: string
          user_id: string
        }
        Insert: {
          courses_completed?: number | null
          id?: string
          last_updated?: string | null
          level?: number | null
          projects_completed?: number | null
          skill_id: string
          user_id: string
        }
        Update: {
          courses_completed?: number | null
          id?: string
          last_updated?: string | null
          level?: number | null
          projects_completed?: number | null
          skill_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_readiness_score: {
        Args: { p_internship_id?: string; p_job_id?: string; p_user_id: string }
        Returns: number
      }
      is_internship_unlocked: {
        Args: { p_internship_id: string; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      application_status:
        | "pending"
        | "reviewing"
        | "shortlisted"
        | "rejected"
        | "accepted"
      content_category: "ai" | "development" | "design" | "growth"
      difficulty_level: "beginner" | "intermediate" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "pending",
        "reviewing",
        "shortlisted",
        "rejected",
        "accepted",
      ],
      content_category: ["ai", "development", "design", "growth"],
      difficulty_level: ["beginner", "intermediate", "advanced"],
    },
  },
} as const
