
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
import { MultiSelect } from '@/components/ui/multi-select';
import { Plus, Search, User, Calendar, FileText } from 'lucide-react';
import TeacherScheduleDialog from '@/components/SchoolAdmin/TeacherScheduleDialog';
import TeacherClassesDialog from '@/components/SchoolAdmin/TeacherClassesDialog';
import EditTeacherDialog from '@/components/SchoolAdmin/EditTeacherDialog';

const SchoolAdminTeachers = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [classesDialogOpen, setClassesDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subjects: [] as string[],
    classes: [] as string[],
    qualification: ''
  });

  // Available subjects and classes
  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 
    'Creative Writing', 'History', 'Geography', 'Computer Science', 'Art', 
    'Music', 'Physical Education', 'Economics', 'Psychology'
  ];

  const availableClasses = [
    'Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 
    'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 11C', 'Grade 12A'
  ];

  // Mock data - replace with actual API calls
  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@greenwood.edu',
      phone: '(555) 123-4567',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Grade 10A', 'Grade 11A'],
      qualification: 'Ph.D. in Mathematics',
      hireDate: '2020-08-15',
      status: 'Active',
      studentsCount: 85
    },
    {
      id: 2,
      name: 'Mr. Michael Brown',
      email: 'michael.brown@greenwood.edu',
      phone: '(555) 234-5678',
      subjects: ['English Literature', 'Creative Writing'],
      classes: ['Grade 9A', 'Grade 9B'],
      qualification: 'M.A. in English Literature',
      hireDate: '2019-01-10',
      status: 'Active',
      studentsCount: 72
    },
    {
      id: 3,
      name: 'Ms. Emily Davis',
      email: 'emily.davis@greenwood.edu',
      phone: '(555) 345-6789',
      subjects: ['Biology', 'Chemistry'],
      classes: ['Grade 11B', 'Grade 12A'],
      qualification: 'M.Sc. in Biology',
      hireDate: '2021-03-22',
      status: 'Active',
      studentsCount: 63
    },
    {
      id: 4,
      name: 'Mr. John Wilson',
      email: 'john.wilson@greenwood.edu',
      phone: '(555) 456-7890',
      subjects: ['History', 'Geography'],
      classes: ['Grade 8A', 'Grade 8B'],
      qualification: 'M.A. in History',
      hireDate: '2018-06-01',
      status: 'On Leave',
      studentsCount: 54
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddTeacher = () => {
    console.log('Adding new teacher:', newTeacher);
    setShowAddDialog(false);
    setNewTeacher({ name: '', email: '', phone: '', subjects: [], classes: [], qualification: '' });
  };

  const handleViewSchedule = (teacher: any) => {
    setSelectedTeacher(teacher);
    setScheduleDialogOpen(true);
  };

  const handleViewClasses = (teacher: any) => {
    setSelectedTeacher(teacher);
    setClassesDialogOpen(true);
  };

  const handleEditTeacher = (teacher: any) => {
    setSelectedTeacher(teacher);
    setEditDialogOpen(true);
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teachers Management</h1>
              <p className="text-gray-600 mt-2">Manage all teachers in your school</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Enter the teacher details and assignment information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newTeacher.name}
                        onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                        placeholder="Enter teacher name"
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        value={newTeacher.qualification}
                        onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                        placeholder="Enter qualification"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subjects">Subjects</Label>
                    <MultiSelect
                      options={availableSubjects}
                      selected={newTeacher.subjects}
                      onSelectionChange={(subjects) => setNewTeacher({...newTeacher, subjects})}
                      placeholder="Select subjects to teach"
                    />
                  </div>
                  <div>
                    <Label htmlFor="classes">Classes</Label>
                    <MultiSelect
                      options={availableClasses}
                      selected={newTeacher.classes}
                      onSelectionChange={(classes) => setNewTeacher({...newTeacher, classes})}
                      placeholder="Select classes to teach"
                    />
                  </div>
                  <Button onClick={handleAddTeacher} className="w-full">
                    Add Teacher
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
          </div>

          <div className="grid gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 rounded-full p-2">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{teacher.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {teacher.qualification}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleEditTeacher(teacher)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Contact Information</p>
                      <p className="font-medium">{teacher.email}</p>
                      <p className="text-sm text-gray-600">{teacher.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subjects</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {teacher.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Classes</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {teacher.classes.map((cls, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Hired: {new Date(teacher.hireDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="h-4 w-4 mr-1" />
                        Students: {teacher.studentsCount}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewSchedule(teacher)}>
                        View Schedule
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewClasses(teacher)}>
                        View Classes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialogs */}
        <TeacherScheduleDialog
          teacher={selectedTeacher}
          isOpen={scheduleDialogOpen}
          onClose={() => setScheduleDialogOpen(false)}
        />
        <TeacherClassesDialog
          teacher={selectedTeacher}
          isOpen={classesDialogOpen}
          onClose={() => setClassesDialogOpen(false)}
        />
        <EditTeacherDialog
          teacher={selectedTeacher}
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SchoolAdminTeachers;
