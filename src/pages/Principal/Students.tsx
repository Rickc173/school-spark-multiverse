
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, User, Mail, Phone, Calendar, BookOpen, Users } from 'lucide-react';

const PrincipalStudents = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.j@student.greenwood.edu',
      phone: '(555) 123-4567',
      rollNumber: '10A001',
      class: 'Grade 10A',
      grade: '10',
      section: 'A',
      status: 'Active',
      joinDate: '2023-08-15',
      attendance: 92,
      parentName: 'Robert Johnson',
      parentPhone: '(555) 987-6543'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma.w@student.greenwood.edu',
      phone: '(555) 234-5678',
      rollNumber: '10A002',
      class: 'Grade 10A',
      grade: '10',
      section: 'A',
      status: 'Active',
      joinDate: '2023-08-15',
      attendance: 96,
      parentName: 'Lisa Wilson',
      parentPhone: '(555) 876-5432'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@student.greenwood.edu',
      phone: '(555) 345-6789',
      rollNumber: '11A001',
      class: 'Grade 11A',
      grade: '11',
      section: 'A',
      status: 'Active',
      joinDate: '2022-08-20',
      attendance: 88,
      parentName: 'David Brown',
      parentPhone: '(555) 765-4321'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarah.d@student.greenwood.edu',
      phone: '(555) 456-7890',
      rollNumber: '10B001',
      class: 'Grade 10B',
      grade: '10',
      section: 'B',
      status: 'Inactive',
      joinDate: '2023-08-15',
      attendance: 75,
      parentName: 'Jennifer Davis',
      parentPhone: '(555) 654-3210'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students Overview</h1>
            <p className="text-gray-600 mt-2">View and manage all school students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold">1,245</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold">1,198</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Average Attendance</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">New Admissions</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                <SelectItem value="Grade 10B">Grade 10B</SelectItem>
                <SelectItem value="Grade 11A">Grade 11A</SelectItem>
                <SelectItem value="Grade 11B">Grade 11B</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-gray-600">{student.class} - Roll No: {student.rollNumber}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{student.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                      <div className="text-sm">
                        <p className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                          Attendance: {student.attendance}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <p>Parent: {student.parentName}</p>
                        <p>Contact: {student.parentPhone}</p>
                        <p>Joined: {new Date(student.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">Academic Record</Button>
                        <Button variant="outline" size="sm">Contact Parent</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PrincipalStudents;
