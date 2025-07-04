
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, UserCheck, Shield, Bell, Calendar } from 'lucide-react';

const PrincipalDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '1,245',
      change: '+12 this month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Teachers',
      value: '86',
      change: '+3 this month',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Active Classes',
      value: '42',
      change: '+2 this semester',
      icon: BookOpen,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Approvals',
      value: '7',
      change: '3 urgent',
      icon: Shield,
      color: 'text-red-600'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Teacher Registration',
      description: 'New Math Teacher - Sarah Miller',
      priority: 'High',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'Student Deletion',
      description: 'Remove John Doe from Grade 10A',
      priority: 'Medium',
      date: '2024-01-14'
    },
    {
      id: 3,
      type: 'Class Assignment',
      description: 'Assign Grade 9B to Ms. Johnson',
      priority: 'Low',
      date: '2024-01-13'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      activity: 'Approved new teacher registration',
      user: 'Dr. Emily Watson',
      time: '2 hours ago'
    },
    {
      id: 2,
      activity: 'Updated school settings',
      user: 'System',
      time: '4 hours ago'
    },
    {
      id: 3,
      activity: 'Class assignment completed',
      user: 'Grade 8A -> Mr. Anderson',
      time: '1 day ago'
    }
  ];

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Principal Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Pending Approvals</span>
                </CardTitle>
                <CardDescription>Items requiring your approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{approval.type}</h4>
                        <p className="text-sm text-gray-600">{approval.description}</p>
                        <p className="text-xs text-gray-500">{approval.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={approval.priority === 'High' ? 'destructive' : approval.priority === 'Medium' ? 'default' : 'secondary'}>
                          {approval.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
                <CardDescription>Latest school activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-gray-600">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PrincipalDashboard;
