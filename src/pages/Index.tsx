
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Login from '@/components/Login';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import SystemAdminDashboard from '@/components/Dashboard/SystemAdminDashboard';
import SchoolAdminDashboard from '@/components/Dashboard/SchoolAdminDashboard';
import TeacherDashboard from '@/components/Dashboard/TeacherDashboard';
import StudentDashboard from '@/components/Dashboard/StudentDashboard';
import ParentDashboard from '@/components/Dashboard/ParentDashboard';

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'system_admin':
        return <SystemAdminDashboard />;
      case 'school_admin':
        return <SchoolAdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <DashboardLayout>
      {getDashboardComponent()}
    </DashboardLayout>
  );
};

export default Index;
