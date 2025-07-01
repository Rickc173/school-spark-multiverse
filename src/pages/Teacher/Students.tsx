
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, Users, User, BookOpen, Calendar, Award, Phone, Mail } from 'lucide-react';

const TeacherStudents = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const classes = [
    'Grade 8A - Mathematics',
    'Grade 7B - Mathematics', 
    'Grade 9A - Algebra'
  ];

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      rollNumber: '8A001',
      class: 'Grade 8A - Mathematics',
      email: 'alice.johnson@school.edu',
      phone: '+1 234-567-8901',
      parentPhone: '+1 234-567-8900',
      attendance: 95.2,
      currentGrade: 'A-',
      gpa: 3.7,
      assignments: {
        submitted: 12,
        total: 15,
        avgScore: 88
      },
      recentGrades: [
        { subject: 'Quiz 1', score: 92, date: '2024-01-10' },
        { subject: 'Assignment 1', score: 85, date: '2024-01-08' },
        { subject: 'Test 1', score: 90, date: '2024-01-05' }
      ]
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNumber: '8A002',
      class: 'Grade 8A - Mathematics',
      email: 'bob.smith@school.edu',
      phone: '+1 234-567-8902',
      parentPhone: '+1 234-567-8903',
      attendance: 92.1,
      currentGrade: 'B+',
      gpa: 3.4,
      assignments: {
        submitted: 13,
        total: 15,
        avgScore: 82
      },
      recentGrades: [
        { subject: 'Quiz 1', score: 88, date: '2024-01-10' },
        { subject: 'Assignment 1', score: 78, date: '2024-01-08' },
        { subject: 'Test 1', score: 85, date: '2024-01-05' }
      ]
    },
    {
      id: 3,
      name: 'Carol Davis',
      rollNumber: '7B001',
      class: 'Grade 7B - Mathematics',
      email: 'carol.davis@school.edu',
      phone: '+1 234-567-8904',
      parentPhone: '+1 234-567-8905',
      attendance: 98.5,
      currentGrade: 'A',
      gpa: 3.9,
      assignments: {
        submitted: 10,
        total: 12,
        avgScore: 94
      },
      recentGrades: [
        { subject: 'Quiz 1', score: 96, date: '2024-01-10' },
        { subject: 'Assignment 1', score: 92, date: '2024-01-08' },
        { subject: 'Test 1', score: 95, date: '2024-01-05' }
      ]
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const StudentDetailsDialog = ({ student, isOpen, onClose }) => {
    if (!student) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{student.name}</span>
            </DialogTitle>
            <DialogDescription>{student.class} • {student.rollNumber}</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Current Grade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{student.currentGrade}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">GPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{student.gpa}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{student.attendance}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Avg Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{student.assignments.avgScore}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Assignments Submitted</span>
                      <span>{student.assignments.submitted}/{student.assignments.total}</span>
                    </div>
                    <Progress value={(student.assignments.submitted / student.assignments.total) * 100} className="h-2" />
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
                    {student.recentGrades.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{grade.subject}</p>
                          <p className="text-sm text-gray-600">{grade.date}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            grade.score >= 90 ? 'text-green-600' :
                            grade.score >= 80 ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {grade.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{student.attendance}%</div>
                      <p className="text-gray-600">Overall Attendance Rate</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">95</div>
                        <p className="text-sm text-gray-600">Present</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">5</div>
                        <p className="text-sm text-gray-600">Absent</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-600">100</div>
                        <p className="text-sm text-gray-600">Total Days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Student Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Student Phone</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Parent Phone</p>
                      <p className="font-medium">{student.parentPhone}</p>
                    </div>
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
            <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
            <p className="text-gray-600 mt-2">View and manage your students</p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.rollNumber}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{student.currentGrade}</div>
                      <div className="text-gray-600">Grade</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{student.attendance}%</div>
                      <div className="text-gray-600">Attendance</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Assignments</span>
                      <span>{student.assignments.submitted}/{student.assignments.total}</span>
                    </div>
                    <Progress value={(student.assignments.submitted / student.assignments.total) * 100} className="h-1" />
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <StudentDetailsDialog
          student={selectedStudent}
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TeacherStudents;
