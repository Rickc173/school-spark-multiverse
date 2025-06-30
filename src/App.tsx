
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// System Admin Pages
import SystemAdminSchools from "./pages/SystemAdmin/Schools";
import SystemAdminUsers from "./pages/SystemAdmin/Users";
import SystemAdminSettings from "./pages/SystemAdmin/Settings";

// School Admin Pages
import SchoolAdminStudents from "./pages/SchoolAdmin/Students";
import SchoolAdminTeachers from "./pages/SchoolAdmin/Teachers";
import SchoolAdminClasses from "./pages/SchoolAdmin/Classes";
import SchoolAdminFees from "./pages/SchoolAdmin/Fees";
import SchoolAdminAnnouncements from "./pages/SchoolAdmin/Announcements";
import SchoolAdminSettings from "./pages/SchoolAdmin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* System Admin Routes */}
            <Route path="/system-admin/schools" element={<SystemAdminSchools />} />
            <Route path="/system-admin/users" element={<SystemAdminUsers />} />
            <Route path="/system-admin/settings" element={<SystemAdminSettings />} />
            
            {/* School Admin Routes */}
            <Route path="/school-admin/students" element={<SchoolAdminStudents />} />
            <Route path="/school-admin/teachers" element={<SchoolAdminTeachers />} />
            <Route path="/school-admin/classes" element={<SchoolAdminClasses />} />
            <Route path="/school-admin/fees" element={<SchoolAdminFees />} />
            <Route path="/school-admin/announcements" element={<SchoolAdminAnnouncements />} />
            <Route path="/school-admin/settings" element={<SchoolAdminSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
