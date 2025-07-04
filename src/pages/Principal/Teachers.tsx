
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
import { Plus, Search, UserCheck, Mail, Phone, Calendar } from 'lucide-react';

const PrincipalTeachers = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    qualification: '',
    experience: ''
  });

  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@greenwood.edu',
      phone: '(555) 123-4567',
      subject: 'Mathematics',
      qualification: 'Ph.D. in Mathematics',
      experience: '12 years',
      status: 'Active',
      joinDate: '2018-08-15',
      classes: ['Grade 10A', 'Grade 10B', 'Grade 11A']
    },
    {
      id: 2,
      name: 'Mr. Michael Brown',
      email: 'michael.b@greenwood.edu',
      phone: '(555) 234-5678',
      subject: 'Physics',
      qualification: 'M.Sc. Physics',
      experience: '8 years',
      status: 'Active',
      joinDate: '2020-01-10',
      classes: ['Grade 11A', 'Grade 12A']
    },
    {
      id: 3,
      name: 'Ms. Emily Davis',
      email: 'emily.d@greenwood.edu',
      phone: '(555) 345-6789',
      subject: 'English',
      qualification: 'M.A. English Literature',
      experience: '6 years',
      status: 'Pending Approval',
      joinDate: '2024-01-15',
      classes: []
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRegisterTeacher = () => {
    console.log('Registering new teacher:', newTeacher);
    setShowAddDialog(false);
    setNewTeacher({ name: '', email: '', phone: '', subject: '', qualification: '', experience: '' });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teachers Management</h1>
              <p className="text-gray-600 mt-2">Register and manage teaching staff</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Register Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register New Teacher</DialogTitle>
                  <DialogDescription>
                    Add a new teacher to the school
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject Specialization</Label>
                    <Input
                      id="subject"
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      value={newTeacher.qualification}
                      onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                      placeholder="Enter qualification"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={newTeacher.experience}
                      onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                      placeholder="Enter years of experience"
                    />
                  </div>
                  <Button onClick={handleRegisterTeacher} className="w-full">
                    Register Teacher
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending approval">Pending Approval</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <UserCheck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{teacher.name}</h3>
                        <p className="text-gray-600">{teacher.subject} Teacher</p>
                        <p className="text-sm text-gray-500">{teacher.qualification}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{teacher.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{teacher.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusBadgeColor(teacher.status)}>
                        {teacher.status}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Joined: {new Date(teacher.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Experience: {teacher.experience}</p>
                        <p className="text-sm text-gray-500">
                          Classes: {teacher.classes.length > 0 ? teacher.classes.join(', ') : 'No classes assigned'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {teacher.status === 'Pending Approval' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Assign Classes</Button>
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

export default PrincipalTeachers;
