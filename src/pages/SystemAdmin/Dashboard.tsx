
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import SystemAdminDashboard from '@/components/Dashboard/SystemAdminDashboard';

const SystemAdminDashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={['system_admin']}>
      <DashboardLayout>
        <SystemAdminDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SystemAdminDashboardPage;
