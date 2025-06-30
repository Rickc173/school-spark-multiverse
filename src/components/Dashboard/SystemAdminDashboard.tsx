
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Home, Users, Settings, Bell } from 'lucide-react';

const SystemAdminDashboard = () => {
  const systemStats = [
    { label: 'Total Schools', value: '25', change: '+3 this month', color: 'bg-blue-500' },
    { label: 'Active Users', value: '1,247', change: '+89 this week', color: 'bg-green-500' },
    { label: 'System Health', value: '98.5%', change: 'All systems operational', color: 'bg-emerald-500' },
    { label: 'Storage Used', value: '67%', change: '2.3TB of 3.5TB', color: 'bg-orange-500' },
  ];

  const recentSchools = [
    { name: 'Greenwood High School', status: 'Active', users: 234, added: '2 days ago' },
    { name: 'Sunrise Elementary', status: 'Pending Setup', users: 0, added: '1 week ago' },
    { name: 'Mountain View Academy', status: 'Active', users: 456, added: '2 weeks ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all schools in the system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Schools */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Schools</CardTitle>
            <CardDescription>Newly added schools to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSchools.map((school, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{school.name}</h4>
                    <p className="text-sm text-gray-600">{school.users} users • Added {school.added}</p>
                  </div>
                  <Badge variant={school.status === 'Active' ? 'default' : 'secondary'}>
                    {school.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Schools
            </Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health Monitor</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>API Response Time</span>
                <span>120ms</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-green-600 mt-1">Excellent</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Database Performance</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-green-600 mt-1">Good</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Server Load</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-blue-600 mt-1">Normal</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Home className="h-6 w-6" />
              <span>Add School</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Bell className="h-6 w-6" />
              <span>Send Alert</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAdminDashboard;
