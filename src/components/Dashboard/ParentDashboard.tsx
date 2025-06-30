
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, FileText, CreditCard, Award, Bell, AlertTriangle } from 'lucide-react';

const ParentDashboard = () => {
  const children = [
    {
      id: '1',
      name: 'Mike Wilson',
      grade: 'Grade 8A',
      attendance: 94.2,
      gpa: 3.7,
      pendingFees: 340,
      avatar: '/placeholder.svg',
      recentGrade: 'A-',
      status: 'good'
    },
    {
      id: '2',
      name: 'Emma Wilson',
      grade: 'Grade 5B',
      attendance: 96.8,
      gpa: 3.9,
      pendingFees: 0,
      avatar: '/placeholder.svg',
      recentGrade: 'A',
      status: 'excellent'
    }
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Meeting', child: 'Mike Wilson', date: 'Dec 15, 2023', time: '10:00 AM' },
    { event: 'School Science Fair', child: 'Emma Wilson', date: 'Dec 18, 2023', time: '2:00 PM' },
    { event: 'Winter Break Starts', child: 'Both Children', date: 'Dec 25, 2023', time: 'All Day' },
  ];

  const recentActivity = [
    { activity: 'Assignment Submitted', child: 'Mike Wilson', subject: 'Mathematics', time: '2 hours ago', type: 'assignment' },
    { activity: 'Grade Received', child: 'Emma Wilson', subject: 'Science - A+', time: '4 hours ago', type: 'grade' },
    { activity: 'Attendance Marked', child: 'Mike Wilson', status: 'Present', time: '1 day ago', type: 'attendance' },
    { activity: 'Fee Payment Due', child: 'Mike Wilson', amount: '$340', time: '2 days ago', type: 'fee' },
  ];

  const notifications = [
    { title: 'Fee Payment Reminder', content: 'Mike\'s tuition fee of $340 is due today', priority: 'high', time: '2 hours ago' },
    { title: 'Parent-Teacher Meeting', content: 'Scheduled for Dec 15th at 10:00 AM', priority: 'medium', time: '1 day ago' },
    { title: 'School Holiday Notice', content: 'Winter break from Dec 25th to Jan 8th', priority: 'low', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your children's academic progress and school activities</p>
      </div>

      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children.map((child) => (
          <Card key={child.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <CardDescription>{child.grade}</CardDescription>
                </div>
                <Badge variant={child.status === 'excellent' ? 'default' : 'secondary'}>
                  {child.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-xl font-bold text-green-600">{child.attendance}%</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">GPA</p>
                  <p className="text-xl font-bold text-blue-600">{child.gpa}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Recent Grade</p>
                  <p className="text-lg font-semibold text-purple-600">{child.recentGrade}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pending Fees</p>
                  <p className={`text-lg font-semibold ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${child.pendingFees || 'Paid'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Progress
                </Button>
                {child.pendingFees > 0 && (
                  <Button size="sm" className="flex-1">
                    Pay Fees
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </CardTitle>
            <CardDescription>Important dates and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.event}</h4>
                    <p className="text-sm text-gray-600">{event.child}</p>
                    <p className="text-xs text-gray-400">{event.date} at {event.time}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates from your children</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'grade' ? 'bg-green-500' :
                    activity.type === 'assignment' ? 'bg-blue-500' :
                    activity.type === 'attendance' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.activity}</p>
                    <p className="text-sm text-gray-600">{activity.child}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Fee Summary</span>
          </CardTitle>
          <CardDescription>Payment status and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800">Outstanding</h3>
              <p className="text-2xl font-bold text-red-600">$340</p>
              <p className="text-sm text-red-600">Mike Wilson - Tuition</p>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800">Paid This Month</h3>
              <p className="text-2xl font-bold text-green-600">$680</p>
              <p className="text-sm text-green-600">Both children</p>
            </div>
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800">Next Due</h3>
              <p className="text-2xl font-bold text-blue-600">Jan 15</p>
              <p className="text-sm text-blue-600">Monthly fees</p>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <Button className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Outstanding Fees
            </Button>
            <Button variant="outline" className="flex-1">
              View Payment History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${
                notification.priority === 'high' ? 'bg-red-50 border-red-200' :
                notification.priority === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${
                    notification.priority === 'high' ? 'text-red-800' :
                    notification.priority === 'medium' ? 'text-amber-800' : 'text-blue-800'
                  }`}>
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600">{notification.content}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
                <Badge variant={
                  notification.priority === 'high' ? 'destructive' :
                  notification.priority === 'medium' ? 'secondary' : 'outline'
                }>
                  {notification.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;
