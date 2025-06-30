
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, FileText, Clock, CheckSquare, AlertTriangle } from 'lucide-react';

const TeacherDashboard = () => {
  const teacherStats = [
    { label: 'My Classes', value: '6', change: 'Grades 7, 8, 9', icon: Users, color: 'text-blue-600' },
    { label: 'Total Students', value: '156', change: 'Across all classes', icon: Users, color: 'text-green-600' },
    { label: 'Pending Assignments', value: '23', change: 'To be graded', icon: FileText, color: 'text-orange-600' },
    { label: 'Today\'s Classes', value: '4', change: 'Next at 10:30 AM', icon: Clock, color: 'text-purple-600' },
  ];

  const todaySchedule = [
    { time: '09:00 AM', subject: 'Mathematics', class: 'Grade 8A', room: '204', status: 'upcoming' },
    { time: '10:30 AM', subject: 'Mathematics', class: 'Grade 7B', room: '201', status: 'next' },
    { time: '01:00 PM', subject: 'Algebra', class: 'Grade 9A', room: '205', status: 'upcoming' },
    { time: '02:30 PM', subject: 'Geometry', class: 'Grade 8B', room: '204', status: 'upcoming' },
  ];

  const recentAssignments = [
    { title: 'Quadratic Equations Practice', class: 'Grade 9A', submissions: 28, total: 32, dueDate: 'Today' },
    { title: 'Geometry Worksheet', class: 'Grade 8A', submissions: 22, total: 29, dueDate: 'Yesterday' },
    { title: 'Linear Functions Quiz', class: 'Grade 8B', submissions: 25, total: 27, dueDate: '2 days ago' },
  ];

  const upcomingTasks = [
    { task: 'Grade Math Quiz - 8A', priority: 'high', due: 'Today' },
    { task: 'Prepare lesson plan for tomorrow', priority: 'medium', due: 'Today' },
    { task: 'Parent-teacher meeting prep', priority: 'medium', due: 'Tomorrow' },
    { task: 'Submit monthly report', priority: 'low', due: 'This week' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">Good morning, Sarah! Ready for another great day of teaching?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teacherStats.map((stat, index) => (
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
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>Your classes for December 11, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${
                  schedule.status === 'next' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{schedule.time}</span>
                      {schedule.status === 'next' && (
                        <Badge variant="default" className="text-xs">Next</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{schedule.subject} - {schedule.class}</p>
                    <p className="text-xs text-gray-400">Room {schedule.room}</p>
                  </div>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Recent Assignments</span>
            </CardTitle>
            <CardDescription>Submission status for your assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{assignment.title}</h4>
                    <Badge variant="outline" className="text-xs">{assignment.class}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Submissions</span>
                      <span>{assignment.submissions}/{assignment.total}</span>
                    </div>
                    <Progress value={(assignment.submissions / assignment.total) * 100} className="h-1" />
                    <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Assignments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-16 flex-col space-y-2" variant="outline">
                <CheckSquare className="h-5 w-5" />
                <span className="text-xs">Take Attendance</span>
              </Button>
              <Button className="h-16 flex-col space-y-2" variant="outline">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Create Assignment</span>
              </Button>
              <Button className="h-16 flex-col space-y-2" variant="outline">
                <Users className="h-5 w-5" />
                <span className="text-xs">Grade Students</span>
              </Button>
              <Button className="h-16 flex-col space-y-2" variant="outline">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">View Timetable</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Upcoming Tasks</span>
            </CardTitle>
            <CardDescription>Things that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
