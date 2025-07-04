
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
import { Plus, Search, BookOpen, Users, Calendar, User } from 'lucide-react';

const PrincipalClasses = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
    section: '',
    teacher: '',
    capacity: ''
  });

  const classes = [
    {
      id: 1,
      name: 'Grade 10A',
      grade: '10',
      section: 'A',
      teacher: 'Dr. Sarah Johnson',
      teacherId: 1,
      studentsCount: 32,
      capacity: 35,
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      schedule: 'Mon-Fri 8:00 AM - 2:00 PM'
    },
    {
      id: 2,
      name: 'Grade 10B',
      grade: '10',
      section: 'B',
      teacher: 'Mr. Michael Brown',
      teacherId: 2,
      studentsCount: 29,
      capacity: 35,
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      schedule: 'Mon-Fri 8:00 AM - 2:00 PM'
    },
    {
      id: 3,
      name: 'Grade 11A',
      grade: '11',
      section: 'A',
      teacher: 'Ms. Emily Davis',
      teacherId: 3,
      studentsCount: 28,
      capacity: 30,
      subjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Biology'],
      schedule: 'Mon-Fri 9:00 AM - 3:00 PM'
    },
    {
      id: 4,
      name: 'Grade 9B',
      grade: '9',
      section: 'B',
      teacher: 'Unassigned',
      teacherId: null,
      studentsCount: 0,
      capacity: 30,
      subjects: [],
      schedule: 'TBD'
    }
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || cls.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleCreateClass = () => {
    console.log('Creating new class:', newClass);
    setShowAddDialog(false);
    setNewClass({ name: '', grade: '', section: '', teacher: '', capacity: '' });
  };

  const getStatusColor = (cls: any) => {
    if (!cls.teacherId) return 'bg-red-100 text-red-800';
    if (cls.studentsCount === 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (cls: any) => {
    if (!cls.teacherId) return 'No Teacher';
    if (cls.studentsCount === 0) return 'No Students';
    return 'Active';
  };

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Classes Management</h1>
              <p className="text-gray-600 mt-2">Manage school classes and assignments</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Class
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Class</DialogTitle>
                  <DialogDescription>
                    Add a new class to the school
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade">Grade</Label>
                    <Select value={newClass.grade} onValueChange={(value) => setNewClass({...newClass, grade: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      value={newClass.section}
                      onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                      placeholder="Enter section (A, B, C, etc.)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                      placeholder="Enter class capacity"
                    />
                  </div>
                  <Button onClick={handleCreateClass} className="w-full">
                    Create Class
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredClasses.map((cls) => (
              <Card key={cls.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{cls.name}</h3>
                        <p className="text-gray-600">Grade {cls.grade} - Section {cls.section}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>Teacher: {cls.teacher}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{cls.studentsCount}/{cls.capacity} Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(cls)}>
                        {getStatusText(cls)}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{cls.schedule}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Subjects: {cls.subjects.length > 0 ? cls.subjects.join(', ') : 'No subjects assigned'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Students</Button>
                        <Button variant="outline" size="sm">Assign Teacher</Button>
                        <Button variant="outline" size="sm">Edit</Button>
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

export default PrincipalClasses;
