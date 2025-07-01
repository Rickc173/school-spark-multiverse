
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, BookOpen, Clock, FileText, CheckSquare } from 'lucide-react';

const TeacherClasses = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);

  const classes = [
    {
      id: 1,
      name: 'Grade 8A - Mathematics',
      subject: 'Mathematics',
      grade: 'Grade 8A',
      students: 28,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: '204',
      nextClass: '2024-01-15 09:00',
      attendance: 94.2,
      assignments: 5,
      students_list: [
        { id: 1, name: 'Alice Johnson', rollNumber: '8A001', attendance: 95 },
        { id: 2, name: 'Bob Smith', rollNumber: '8A002', attendance: 92 },
        { id: 3, name: 'Carol Davis', rollNumber: '8A003', attendance: 98 }
      ]
    },
    {
      id: 2,
      name: 'Grade 7B - Mathematics',
      subject: 'Mathematics',
      grade: 'Grade 7B',
      students: 25,
      schedule: 'Tue, Thu - 10:30 AM',
      room: '201',
      nextClass: '2024-01-16 10:30',
      attendance: 96.8,
      assignments: 3,
      students_list: [
        { id: 4, name: 'David Wilson', rollNumber: '7B001', attendance: 97 },
        { id: 5, name: 'Emma Brown', rollNumber: '7B002', attendance: 95 },
        { id: 6, name: 'Frank Miller', rollNumber: '7B003', attendance: 99 }
      ]
    },
    {
      id: 3,
      name: 'Grade 9A - Algebra',
      subject: 'Algebra',
      grade: 'Grade 9A',
      students: 32,
      schedule: 'Mon, Wed, Fri - 1:00 PM',
      room: '205',
      nextClass: '2024-01-15 13:00',
      attendance: 91.5,
      assignments: 7,
      students_list: [
        { id: 7, name: 'Grace Taylor', rollNumber: '9A001', attendance: 93 },
        { id: 8, name: 'Henry Davis', rollNumber: '9A002', attendance: 89 },
        { id: 9, name: 'Ivy Wilson', rollNumber: '9A003', attendance: 96 }
      ]
    }
  ];

  const ClassDetailsDialog = ({ classData, isOpen, onClose }) => {
    if (!classData) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{classData.name}</DialogTitle>
            <DialogDescription>Class details and student information</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{classData.students}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{classData.attendance}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{classData.assignments}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Room</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{classData.room}</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="space-y-3">
                {classData.students_list.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{student.attendance}% attendance</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Class Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Schedule:</strong> {classData.schedule}</p>
                    <p><strong>Room:</strong> {classData.room}</p>
                    <p><strong>Next Class:</strong> {new Date(classData.nextClass).toLocaleString()}</p>
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
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-600 mt-2">Manage your assigned classes and students</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <CardDescription>{classItem.grade}</CardDescription>
                    </div>
                    <Badge variant="outline">{classItem.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{classItem.students} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Room {classItem.room}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance Rate</span>
                      <span className="font-medium text-green-600">{classItem.attendance}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Assignments</span>
                      <span className="font-medium">{classItem.assignments}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-2">Next Class:</p>
                    <p className="text-sm font-medium">{new Date(classItem.nextClass).toLocaleString()}</p>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedClass(classItem)}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      <CheckSquare className="h-4 w-4 mr-1" />
                      Take Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <ClassDetailsDialog
          classData={selectedClass}
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TeacherClasses;
