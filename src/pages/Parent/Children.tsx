
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, User, Calendar, Award, BookOpen, Phone, Mail } from 'lucide-react';

const ParentChildren = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState(null);

  const children = [
    {
      id: 1,
      name: 'Mike Wilson',
      grade: 'Grade 8A',
      rollNumber: '8A015',
      class: 'Grade 8A',
      attendance: 94.2,
      gpa: 3.7,
      currentGrade: 'A-',
      pendingFees: 340,
      avatar: '/placeholder.svg',
      nextClass: 'Mathematics - 9:00 AM',
      teacher: 'Ms. Johnson',
      recentGrades: [
        { subject: 'Mathematics', grade: 'A-', score: '88/100', date: '2024-01-10' },
        { subject: 'English', grade: 'B+', score: '85/100', date: '2024-01-08' },
        { subject: 'Science', grade: 'A', score: '92/100', date: '2024-01-05' }
      ],
      assignments: [
        { title: 'Math Homework - Chapter 5', subject: 'Mathematics', dueDate: 'Today', status: 'pending' },
        { title: 'Essay on Climate Change', subject: 'English', dueDate: 'Tomorrow', status: 'in_progress' },
        { title: 'Science Lab Report', subject: 'Science', dueDate: '2024-01-20', status: 'pending' }
      ],
      schedule: [
        { time: '09:00 AM', subject: 'Mathematics', teacher: 'Ms. Johnson', room: '204' },
        { time: '10:30 AM', subject: 'English', teacher: 'Mr. Smith', room: '108' },
        { time: '01:00 PM', subject: 'Science', teacher: 'Dr. Wilson', room: '301' },
        { time: '02:30 PM', subject: 'History', teacher: 'Mrs. Brown', room: '205' }
      ]
    },
    {
      id: 2,
      name: 'Emma Wilson',
      grade: 'Grade 5B',
      rollNumber: '5B008',
      class: 'Grade 5B',
      attendance: 96.8,
      gpa: 3.9,
      currentGrade: 'A',
      pendingFees: 0,
      avatar: '/placeholder.svg',
      nextClass: 'English - 10:00 AM',
      teacher: 'Mrs. Davis',
      recentGrades: [
        { subject: 'English', grade: 'A', score: '95/100', date: '2024-01-10' },
        { subject: 'Mathematics', grade: 'A-', score: '90/100', date: '2024-01-08' },
        { subject: 'Science', grade: 'A+', score: '98/100', date: '2024-01-05' }
      ],
      assignments: [
        { title: 'Reading Comprehension', subject: 'English', dueDate: 'Tomorrow', status: 'completed' },
        { title: 'Math Practice Sheet', subject: 'Mathematics', dueDate: '2024-01-18', status: 'in_progress' }
      ],
      schedule: [
        { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Thompson', room: '104' },
        { time: '10:00 AM', subject: 'English', teacher: 'Mrs. Davis', room: '105' },
        { time: '11:00 AM', subject: 'Science', teacher: 'Ms. Parker', room: '201' },
        { time: '01:00 PM', subject: 'Art', teacher: 'Mr. Garcia', room: '301' }
      ]
    }
  ];

  const ChildDetailsDialog = ({ child, isOpen, onClose }) => {
    if (!child) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{child.name}</span>
            </DialogTitle>
            <DialogDescription>{child.grade} • {child.rollNumber}</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Current Grade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{child.currentGrade}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">GPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{child.gpa}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{child.attendance}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Pending Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ${child.pendingFees || 'Paid'}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Next Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <BookOpen className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-lg">{child.nextClass}</p>
                      <p className="text-gray-600">Class Teacher: {child.teacher}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Grades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.recentGrades.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{grade.subject}</p>
                          <p className="text-sm text-gray-600">{grade.date}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            grade.grade.startsWith('A') ? 'text-green-600' :
                            grade.grade.startsWith('B') ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {grade.grade}
                          </div>
                          <p className="text-sm text-gray-500">{grade.score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.assignments.map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            assignment.status === 'completed' ? 'default' :
                            assignment.status === 'in_progress' ? 'secondary' : 'destructive'
                          }>
                            {assignment.status === 'completed' ? 'Completed' :
                             assignment.status === 'in_progress' ? 'In Progress' : 'Pending'}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.schedule.map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-center">
                            <div className="font-medium">{period.time}</div>
                          </div>
                          <div>
                            <p className="font-medium">{period.subject}</p>
                            <p className="text-sm text-gray-600">{period.teacher} • Room {period.room}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <ProtectedRoute allowedRoles={['parent']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
            <p className="text-gray-600 mt-2">Monitor your children's academic progress</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {children.map((child) => (
              <Card key={child.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback className="bg-blue-500 text-white text-lg">
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{child.name}</CardTitle>
                      <CardDescription className="text-lg">{child.grade}</CardDescription>
                      <Badge className="mt-1">
                        {child.rollNumber}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{child.attendance}%</div>
                      <div className="text-sm text-gray-600">Attendance</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{child.currentGrade}</div>
                      <div className="text-sm text-gray-600">Current Grade</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>GPA</span>
                      <span className="font-medium">{child.gpa}/4.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending Fees</span>
                      <span className={`font-medium ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${child.pendingFees || 'Paid'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-1">Next Class:</p>
                    <p className="font-medium">{child.nextClass}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedChild(child)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {child.pendingFees > 0 && (
                      <Button className="flex-1">
                        Pay Fees
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <ChildDetailsDialog
          child={selectedChild}
          isOpen={!!selectedChild}
          onClose={() => setSelectedChild(null)}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ParentChildren;
