
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, User, Users, Calendar } from 'lucide-react';

const SchoolAdminStudents = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    class: '',
    rollNumber: '',
    parentName: '',
    parentPhone: '',
    parentEmail: ''
  });

  // Mock data - replace with actual API calls
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@student.greenwood.edu',
      class: 'Grade 10A',
      rollNumber: '10A001',
      parentName: 'Robert Johnson',
      parentPhone: '(555) 123-4567',
      parentEmail: 'robert.johnson@email.com',
      status: 'Active',
      admissionDate: '2023-09-01',
      attendance: 95
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@student.greenwood.edu',
      class: 'Grade 10A',
      rollNumber: '10A002',
      parentName: 'Mary Smith',
      parentPhone: '(555) 234-5678',
      parentEmail: 'mary.smith@email.com',
      status: 'Active',
      admissionDate: '2023-09-01',
      attendance: 88
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.davis@student.greenwood.edu',
      class: 'Grade 9B',
      rollNumber: '9B015',
      parentName: 'James Davis',
      parentPhone: '(555) 345-6789',
      parentEmail: 'james.davis@email.com',
      status: 'Active',
      admissionDate: '2023-09-01',
      attendance: 92
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@student.greenwood.edu',
      class: 'Grade 11C',
      rollNumber: '11C008',
      parentName: 'Linda Wilson',
      parentPhone: '(555) 456-7890',
      parentEmail: 'linda.wilson@email.com',
      status: 'Inactive',
      admissionDate: '2022-09-01',
      attendance: 76
    }
  ];

  const classes = [
    'Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 11C', 'Grade 12A'
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleAddStudent = () => {
    console.log('Adding new student:', newStudent);
    setShowAddDialog(false);
    setNewStudent({ name: '', email: '', class: '', rollNumber: '', parentName: '', parentPhone: '', parentEmail: '' });
  };

  const getAttendanceBadgeColor = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-100 text-green-800';
    if (attendance >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
              <p className="text-gray-600 mt-2">Manage all students in your school</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the student details and parent information
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Student Information</h3>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                        placeholder="Enter student name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="class">Class</Label>
                      <Select value={newStudent.class} onValueChange={(value) => setNewStudent({...newStudent, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        value={newStudent.rollNumber}
                        onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                        placeholder="Enter roll number"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Parent Information</h3>
                    <div>
                      <Label htmlFor="parentName">Parent Name</Label>
                      <Input
                        id="parentName"
                        value={newStudent.parentName}
                        onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                        placeholder="Enter parent name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentPhone">Parent Phone</Label>
                      <Input
                        id="parentPhone"
                        value={newStudent.parentPhone}
                        onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                        placeholder="Enter parent phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentEmail">Parent Email</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={newStudent.parentEmail}
                        onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                        placeholder="Enter parent email"
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={handleAddStudent} className="w-full mt-4">
                  Add Student
                </Button>
              </DialogContent>
            </Dialog>
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
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
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
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-500">
                          {student.class} • Roll: {student.rollNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getAttendanceBadgeColor(student.attendance)}>
                        {student.attendance}% Attendance
                      </Badge>
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Parent Contact</p>
                      <p className="font-medium">{student.parentName}</p>
                      <p className="text-sm text-gray-600">{student.parentPhone}</p>
                      <p className="text-sm text-gray-600">{student.parentEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Admission Date</p>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(student.admissionDate).toLocaleDateString()}
                      </p>
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

export default SchoolAdminStudents;
