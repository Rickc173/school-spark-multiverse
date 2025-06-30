
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, FileText, Calendar, Bell, TrendingUp, AlertCircle } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const schoolStats = [
    { label: 'Total Students', value: '847', change: '+12 this week', icon: Users, color: 'text-blue-600' },
    { label: 'Total Teachers', value: '52', change: '+2 this month', icon: Users, color: 'text-green-600' },
    { label: 'Active Classes', value: '28', change: 'All running', icon: Calendar, color: 'text-purple-600' },
    { label: 'Pending Fees', value: '$12,450', change: '-5% from last month', icon: FileText, color: 'text-orange-600' },
  ];

  const recentActivities = [
    { activity: 'New student admission', details: 'John Doe admitted to Grade 8A', time: '2 hours ago', type: 'admission' },
    { activity: 'Fee payment received', details: 'Sarah Wilson - $340 tuition fee', time: '4 hours ago', type: 'payment' },
    { activity: 'Teacher added', details: 'Emma Johnson joined as Math teacher', time: '1 day ago', type: 'staff' },
    { activity: 'Announcement published', details: 'Annual Sports Day schedule released', time: '2 days ago', type: 'announcement' },
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Meeting', date: 'Dec 15, 2023', time: '9:00 AM', type: 'meeting' },
    { event: 'Annual Sports Day', date: 'Dec 20, 2023', time: '8:00 AM', type: 'event' },
    { event: 'Winter Break Starts', date: 'Dec 25, 2023', time: 'All Day', type: 'holiday' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">School Administration</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at Greenwood High School</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {schoolStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities in your school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'admission' ? 'bg-blue-500' :
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'staff' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.activity}</h4>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{event.event}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-400">{event.time}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Attendance & Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Overall school attendance summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Students Present</span>
                <span>789/847 (93.2%)</span>
              </div>
              <Progress value={93.2} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Teachers Present</span>
                <span>48/52 (92.3%)</span>
              </div>
              <Progress value={92.3} className="h-2" />
            </div>
            <div className="pt-2">
              <Badge variant="secondary" className="mr-2">58 Absent Students</Badge>
              <Badge variant="outline">4 Absent Teachers</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Status</CardTitle>
            <CardDescription>Monthly fee collection progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">$87,550</p>
                <p className="text-sm text-gray-600">Collected this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Collection Progress</span>
                <span>87.6%</span>
              </div>
              <Progress value={87.6} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">$12,450 pending collection</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm">Send Reminders</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span>Alerts & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div>
                <p className="font-medium text-amber-800">Exam Schedule Pending</p>
                <p className="text-sm text-amber-600">Mid-term examination dates need to be finalized</p>
              </div>
              <Button size="sm" variant="outline">Review</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">New Admission Applications</p>
                <p className="text-sm text-blue-600">15 new applications awaiting review</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolAdminDashboard;
