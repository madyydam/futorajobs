import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JobsPage from "./pages/JobsPage";
import InternshipsPage from "./pages/InternshipsPage";
import ApplyPage from "./pages/ApplyPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import NotFound from "./pages/NotFound";
 import AuthPage from "./pages/AuthPage";
 import CareerPathPage from "./pages/CareerPathPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
           <Route path="/career-path/:pathId" element={<CareerPathPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/apply/:jobId" element={<ApplyPage />} />
           <Route path="/apply/internship/:internshipId" element={<ApplyPage />} />
           <Route path="/apply/job/:jobId" element={<ApplyPage />} />
           <Route path="/auth" element={<AuthPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post-job" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
