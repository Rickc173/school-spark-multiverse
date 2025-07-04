
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// System Admin Pages
import SystemAdminDashboard from "./pages/SystemAdmin/Dashboard";
import SystemAdminSchools from "./pages/SystemAdmin/Schools";
import SystemAdminUsers from "./pages/SystemAdmin/Users";
import SystemAdminSettings from "./pages/SystemAdmin/Settings";

// Principal Pages
import PrincipalDashboard from "./pages/Principal/Dashboard";
import PrincipalTeachers from "./pages/Principal/Teachers";
import PrincipalApprovals from "./pages/Principal/Approvals";
import PrincipalClasses from "./pages/Principal/Classes";
import PrincipalStudents from "./pages/Principal/Students";
import PrincipalSettings from "./pages/Principal/Settings";
import PrincipalAnnouncements from "./pages/Principal/Announcements";

// School Admin Pages
import SchoolAdminStudents from "./pages/SchoolAdmin/Students";
import SchoolAdminTeachers from "./pages/SchoolAdmin/Teachers";
import SchoolAdminClasses from "./pages/SchoolAdmin/Classes";
import SchoolAdminFees from "./pages/SchoolAdmin/Fees";
import SchoolAdminAnnouncements from "./pages/SchoolAdmin/Announcements";
import SchoolAdminSettings from "./pages/SchoolAdmin/Settings";

// Teacher Pages
import TeacherClasses from "./pages/Teacher/Classes";
import TeacherAssignments from "./pages/Teacher/Assignments";
import TeacherAttendance from "./pages/Teacher/Attendance";
import TeacherStudents from "./pages/Teacher/Students";

// Student Pages
import StudentAssignments from "./pages/Student/Assignments";
import StudentGrades from "./pages/Student/Grades";
import StudentAttendance from "./pages/Student/Attendance";
import StudentAnnouncements from "./pages/Student/Announcements";

// Parent Pages
import ParentChildren from "./pages/Parent/Children";
import ParentFees from "./pages/Parent/Fees";
import ParentAttendance from "./pages/Parent/Attendance";
import ParentAnnouncements from "./pages/Parent/Announcements";

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
            <Route path="/system-admin" element={<SystemAdminDashboard />} />
            <Route path="/system-admin/schools" element={<SystemAdminSchools />} />
            <Route path="/system-admin/users" element={<SystemAdminUsers />} />
            <Route path="/system-admin/settings" element={<SystemAdminSettings />} />
            
            {/* Principal Routes */}
            <Route path="/principal" element={<PrincipalDashboard />} />
            <Route path="/principal/teachers" element={<PrincipalTeachers />} />
            <Route path="/principal/classes" element={<PrincipalClasses />} />
            <Route path="/principal/students" element={<PrincipalStudents />} />
            <Route path="/principal/approvals" element={<PrincipalApprovals />} />
            <Route path="/principal/settings" element={<PrincipalSettings />} />
            <Route path="/principal/announcements" element={<PrincipalAnnouncements />} />
            
            {/* School Admin Routes */}
            <Route path="/school-admin" element={<SchoolAdminStudents />} />
            <Route path="/school-admin/students" element={<SchoolAdminStudents />} />
            <Route path="/school-admin/teachers" element={<SchoolAdminTeachers />} />
            <Route path="/school-admin/classes" element={<SchoolAdminClasses />} />
            <Route path="/school-admin/fees" element={<SchoolAdminFees />} />
            <Route path="/school-admin/announcements" element={<SchoolAdminAnnouncements />} />
            <Route path="/school-admin/settings" element={<SchoolAdminSettings />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher/classes" element={<TeacherClasses />} />
            <Route path="/teacher/assignments" element={<TeacherAssignments />} />
            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher/students" element={<TeacherStudents />} />
            
            {/* Student Routes */}
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/grades" element={<StudentGrades />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path="/student/announcements" element={<StudentAnnouncements />} />
            
            {/* Parent Routes */}
            <Route path="/parent/children" element={<ParentChildren />} />
            <Route path="/parent/fees" element={<ParentFees />} />
            <Route path="/parent/attendance" element={<ParentAttendance />} />
            <Route path="/parent/announcements" element={<ParentAnnouncements />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
