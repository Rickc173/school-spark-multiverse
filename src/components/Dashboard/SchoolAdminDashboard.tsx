
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, FileText, Calendar, Bell, TrendingUp, AlertCircle, GraduationCap, BookOpen, DollarSign, UserCheck } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const schoolStats = [
    { label: 'Total Students', value: '847', change: '+12 this week', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Total Teachers', value: '52', change: '+2 this month', icon: UserCheck, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Active Classes', value: '28', change: 'All running', icon: GraduationCap, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Monthly Revenue', value: '$87,550', change: '+8.2% from last month', icon: DollarSign, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const quickStats = [
    { label: 'Present Today', value: '789', total: '847', percentage: 93.2, color: 'green' },
    { label: 'Fee Collection', value: '$87,550', total: '$100,000', percentage: 87.6, color: 'blue' },
    { label: 'Assignments Due', value: '23', total: '150', percentage: 15.3, color: 'yellow' },
    { label: 'Parent Meetings', value: '8', total: '15', percentage: 53.3, color: 'purple' }
  ];

  const recentActivities = [
    { activity: 'New student admission', details: 'John Doe admitted to Grade 8A', time: '2 hours ago', type: 'admission' },
    { activity: 'Fee payment received', details: 'Sarah Wilson - $340 tuition fee', time: '4 hours ago', type: 'payment' },
    { activity: 'Teacher added', details: 'Emma Johnson joined as Math teacher', time: '1 day ago', type: 'staff' },
    { activity: 'Assignment submitted', details: '25 students submitted Physics lab report', time: '1 day ago', type: 'academic' },
    { activity: 'Announcement published', details: 'Annual Sports Day schedule released', time: '2 days ago', type: 'announcement' },
    { activity: 'Parent meeting scheduled', details: '15 meetings for Grade 10 parents', time: '3 days ago', type: 'meeting' }
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Meeting', date: 'Dec 15, 2023', time: '9:00 AM', type: 'meeting', priority: 'high' },
    { event: 'Mathematics Exam', date: 'Dec 18, 2023', time: '10:00 AM', type: 'exam', priority: 'high' },
    { event: 'Annual Sports Day', date: 'Dec 20, 2023', time: '8:00 AM', type: 'event', priority: 'medium' },
    { event: 'Science Fair', date: 'Dec 22, 2023', time: '2:00 PM', type: 'event', priority: 'medium' },
    { event: 'Winter Break Starts', date: 'Dec 25, 2023', time: 'All Day', type: 'holiday', priority: 'low' }
  ];

  const classPerformance = [
    { class: 'Grade 10A', students: 32, avgGrade: 'B+', attendance: 94, teacher: 'Dr. Sarah Johnson' },
    { class: 'Grade 10B', students: 28, avgGrade: 'B', attendance: 91, teacher: 'Mr. Michael Brown' },
    { class: 'Grade 9A', students: 30, avgGrade: 'A-', attendance: 96, teacher: 'Ms. Emily Davis' },
    { class: 'Grade 11A', students: 25, avgGrade: 'B+', attendance: 89, teacher: 'Mr. John Wilson' }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'admission': return 'bg-blue-500';
      case 'payment': return 'bg-green-500';
      case 'staff': return 'bg-purple-500';
      case 'academic': return 'bg-orange-500';
      case 'announcement': return 'bg-yellow-500';
      case 'meeting': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">School Administration Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at Greenwood High School</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {schoolStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{stat.label}</span>
                <span className="text-sm text-gray-600">{stat.value}</span>
              </div>
              <Progress value={stat.percentage} className="h-2 mb-1" />
              <p className="text-xs text-gray-500">{stat.percentage.toFixed(1)}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities across your school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${getActivityColor(activity.type)}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{activity.activity}</h4>
                    <p className="text-sm text-gray-600 truncate">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {upcomingEvents.map((event, index) => (
                <div key={index} className={`p-3 border-l-4 rounded-lg ${getPriorityColor(event.priority)}`}>
                  <h4 className="font-medium text-sm">{event.event}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Overview</CardTitle>
          <CardDescription>Academic performance summary by class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classPerformance.map((cls, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{cls.class}</h3>
                  <Badge variant="outline">{cls.students} students</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Grade:</span>
                    <span className="font-medium">{cls.avgGrade}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Attendance:</span>
                    <span className="font-medium">{cls.attendance}%</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-600">Teacher: {cls.teacher}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                <p className="text-sm text-amber-600">Mid-term examination dates need to be finalized for 5 classes</p>
              </div>
              <Button size="sm" variant="outline">Review</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">New Admission Applications</p>
                <p className="text-sm text-blue-600">15 new applications awaiting review and approval</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Outstanding Fees</p>
                <p className="text-sm text-red-600">$12,450 in overdue payments from 23 students</p>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolAdminDashboard;
