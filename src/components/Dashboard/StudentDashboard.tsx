
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, FileText, Clock, Award, BookOpen, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  const studentStats = [
    { label: 'Current Grade', value: 'Grade 8A', change: 'Section A', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Attendance', value: '94.2%', change: 'Great attendance!', icon: Calendar, color: 'text-green-600' },
    { label: 'Assignments Due', value: '3', change: 'This week', icon: FileText, color: 'text-orange-600' },
    { label: 'Overall GPA', value: '3.7', change: '+0.2 from last term', icon: Award, color: 'text-purple-600' },
  ];

  const todaySchedule = [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Ms. Johnson', room: '204', status: 'completed' },
    { time: '10:30 AM', subject: 'English Literature', teacher: 'Mr. Smith', room: '108', status: 'current' },
    { time: '01:00 PM', subject: 'Science', teacher: 'Dr. Wilson', room: '301', status: 'upcoming' },
    { time: '02:30 PM', subject: 'History', teacher: 'Mrs. Brown', room: '205', status: 'upcoming' },
  ];

  const assignments = [
    { 
      title: 'Math Homework - Chapter 5', 
      subject: 'Mathematics', 
      dueDate: 'Today', 
      status: 'pending',
      progress: 0 
    },
    { 
      title: 'Essay on Climate Change', 
      subject: 'English', 
      dueDate: 'Tomorrow', 
      status: 'in_progress',
      progress: 60 
    },
    { 
      title: 'Science Lab Report', 
      subject: 'Science', 
      dueDate: 'Dec 15', 
      status: 'pending',
      progress: 0 
    },
  ];

  const recentGrades = [
    { subject: 'Mathematics', assignment: 'Quiz 4', grade: 'A-', score: '88/100', date: 'Dec 8' },
    { subject: 'English', assignment: 'Book Report', grade: 'B+', score: '85/100', date: 'Dec 6' },
    { subject: 'Science', assignment: 'Lab Test', grade: 'A', score: '92/100', date: 'Dec 4' },
  ];

  const announcements = [
    { title: 'Winter Break Schedule', content: 'Classes will end on December 22nd', type: 'info', date: '2 hours ago' },
    { title: 'Sports Day Registration', content: 'Sign up for annual sports day events', type: 'event', date: '1 day ago' },
    { title: 'Library Hours Extended', content: 'Library now open until 8 PM', type: 'info', date: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Mike! Here's your academic overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Today's Classes</span>
            </CardTitle>
            <CardDescription>Monday, December 11, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${
                  schedule.status === 'current' ? 'bg-blue-50 border-blue-200' :
                  schedule.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{schedule.time}</span>
                      <Badge variant={
                        schedule.status === 'current' ? 'default' :
                        schedule.status === 'completed' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {schedule.status === 'current' ? 'Now' : 
                         schedule.status === 'completed' ? 'Done' : 'Upcoming'}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{schedule.subject}</p>
                    <p className="text-xs text-gray-500">{schedule.teacher} • Room {schedule.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Assignments</span>
            </CardTitle>
            <CardDescription>Your current assignments and homework</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{assignment.title}</h4>
                      <p className="text-xs text-gray-500">{assignment.subject}</p>
                    </div>
                    <Badge variant={assignment.status === 'pending' ? 'destructive' : 'secondary'} className="text-xs">
                      Due {assignment.dueDate}
                    </Badge>
                  </div>
                  {assignment.progress > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Assignments
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Recent Grades</span>
            </CardTitle>
            <CardDescription>Your latest assignment and test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{grade.subject}</p>
                    <p className="text-xs text-gray-500">{grade.assignment}</p>
                    <p className="text-xs text-gray-400">{grade.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      grade.grade.startsWith('A') ? 'text-green-600' :
                      grade.grade.startsWith('B') ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {grade.grade}
                    </div>
                    <p className="text-xs text-gray-500">{grade.score}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View Full Report Card
            </Button>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Announcements</span>
            </CardTitle>
            <CardDescription>Important updates from school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{announcement.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-400">{announcement.date}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
