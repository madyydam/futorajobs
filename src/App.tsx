import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Loader2 } from "lucide-react";
import { AdminRoute } from "./components/admin/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const JobsPage = lazy(() => import("@/pages/JobsPage"));
const InternshipsPage = lazy(() => import("@/pages/InternshipsPage"));
const ApplyPage = lazy(() => import("@/pages/ApplyPage"));
const PostPage = lazy(() => import("@/pages/PostPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetailPage"));
const CoursesPage = lazy(() => import("@/pages/CoursesPage"));
const CareerPathsPage = lazy(() => import("@/pages/CareerPathsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const CareerPathPage = lazy(() => import("@/pages/CareerPathPage"));
const PuneJobs = lazy(() => import("@/pages/PuneJobs"));
const PuneInternships = lazy(() => import("@/pages/PuneInternships"));
const FounderPage = lazy(() => import("@/pages/FounderPage"));
const InterviewCoach = lazy(() => import("@/pages/InterviewCoach"));
const ChatPage = lazy(() => import("@/pages/Chat"));
const InterviewFeedback = lazy(() => import("@/pages/InterviewFeedback"));

// Marketplace
const FreelancingPage = lazy(() => import("@/pages/Freelancing"));
const CreateService = lazy(() => import("@/pages/marketplace/CreateService"));
const FreelancerDashboard = lazy(() => import("@/pages/marketplace/FreelancerDashboard"));
const ClientDashboard = lazy(() => import("@/pages/marketplace/ClientDashboard"));
const AICopilotPage = lazy(() => import("@/pages/AICopilot"));
const RecruiterDashboard = lazy(() => import("@/pages/RecruiterDashboard"));
const PublicPortfolio = lazy(() => import("@/pages/Portfolio"));
const CategoryPage = lazy(() => import("@/pages/marketplace/CategoryPage"));
const ServicePage = lazy(() => import("@/pages/marketplace/ServicePage"));

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminUserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));

const StartupCommunity = lazy(() => import("@/pages/StartupCommunity"));
const LearningGovernance = lazy(() => import("@/pages/admin/LearningGovernance"));
const CareerOS = lazy(() => import("@/pages/admin/CareerOS"));
const JobManagement = lazy(() => import("@/pages/admin/JobManagement"));
const InternshipControl = lazy(() => import("@/pages/admin/InternshipControl"));
const SystemSettings = lazy(() => import("@/pages/admin/SystemSettings"));
const ProjectEngine = lazy(() => import("@/pages/admin/ProjectEngine"));
const CertificateEngine = lazy(() => import("@/pages/admin/CertificateEngine"));
const AIEngine = lazy(() => import("@/pages/admin/AIEngine"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const Payments = lazy(() => import("@/pages/admin/Payments"));

const VideoHub = lazy(() => import("@/pages/learning/VideoHub"));
const CategoryDetail = lazy(() => import("@/pages/learning/CategoryDetail"));
const SubCategoryVideos = lazy(() => import("@/pages/learning/SubCategoryVideos"));
const CoursePlayer = lazy(() => import("@/pages/learning/CoursePlayer"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const VirtualInternship = lazy(() => import("@/pages/VirtualInternship"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route path="/career-paths" element={<CareerPathsPage />} />
              <Route path="/career-path/:pathId" element={<CareerPathPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/internships" element={<InternshipsPage />} />

              {/* Pune Domination SEO Routes */}
              <Route path="/pune-jobs" element={<PuneJobs />} />
              <Route path="/jobs-in-pune" element={<PuneJobs />} />
              <Route path="/pune-internships" element={<PuneInternships />} />
              <Route path="/internships-in-pune" element={<PuneInternships />} />
              <Route path="/career-pune" element={<Index />} />

              {/* Persona / Brand SEO */}
              <Route path="/madhur-dhadve" element={<FounderPage />} />

              {/* Admin OS Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUserManagement />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/learning"
                element={
                  <AdminRoute>
                    <LearningGovernance />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/career-paths"
                element={
                  <AdminRoute>
                    <CareerOS />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminRoute>
                    <JobManagement />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/internships"
                element={
                  <AdminRoute>
                    <InternshipControl />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <AdminRoute>
                    <SystemSettings />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <AdminRoute>
                    <ProjectEngine />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/certificates"
                element={
                  <AdminRoute>
                    <CertificateEngine />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/ai-engine"
                element={
                  <AdminRoute>
                    <AIEngine />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <AdminRoute>
                    <Analytics />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <AdminRoute>
                    <Payments />
                  </AdminRoute>
                }
              />

              <Route path="/apply/:jobId" element={<ApplyPage />} />
              <Route path="/apply/internship/:internshipId" element={<ApplyPage />} />
              <Route path="/apply/job/:jobId" element={<ApplyPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/post-job" element={<PostPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/community" element={<StartupCommunity />} />
              <Route path="/interview-coach" element={<InterviewCoach />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/interview-feedback/:sessionId" element={<InterviewFeedback />} />
              <Route path="/learning" element={<VideoHub />} />
              <Route path="/learning/:categorySlug" element={<CategoryDetail />} />
              <Route path="/learning/:categorySlug/:subSlug" element={<SubCategoryVideos />} />
              <Route path="/learning/video/:courseId" element={<CoursePlayer />} />
              <Route path="/ai-copilot" element={<AICopilotPage />} />
              <Route path="/recruiter" element={<RecruiterDashboard />} />

              <Route path="/portfolio/:id" element={<PublicPortfolio />} />
              <Route path="/freelancing" element={<FreelancingPage />} />
              <Route path="/freelancing/create" element={<CreateService />} />
              <Route path="/freelancing/dashboard" element={<FreelancerDashboard />} />
              <Route path="/freelancing/client-dashboard" element={<ClientDashboard />} />
              <Route path="/freelancing/category/:slug" element={<CategoryPage />} />
              <Route path="/freelancing/service/:id" element={<ServicePage />} />
              <Route path="/virtual-internship/:id" element={<VirtualInternship />} />


              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}


              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
