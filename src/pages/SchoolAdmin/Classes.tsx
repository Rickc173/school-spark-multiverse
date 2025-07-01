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
import { Plus, Search, Users, User, Calendar, Settings } from 'lucide-react';
import GradeSystemSettings from '@/components/SchoolAdmin/GradeSystemSettings';

const SchoolAdminClasses = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [availableGrades, setAvailableGrades] = useState([
    'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ]);
  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
    section: '',
    teacher: '',
    capacity: '',
    room: ''
  });

  // Mock data - replace with actual API calls
  const classes = [
    {
      id: 1,
      name: 'Grade 10A',
      grade: 'Grade 10',
      section: 'A',
      teacher: 'Dr. Sarah Johnson',
      teacherId: 1,
      studentsCount: 32,
      capacity: 35,
      room: 'Room 101',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'],
      schedule: 'Mon-Fri 8:00-14:00'
    },
    {
      id: 2,
      name: 'Grade 10B',
      grade: 'Grade 10',
      section: 'B',
      teacher: 'Mr. Michael Brown',
      teacherId: 2,
      studentsCount: 28,
      capacity: 35,
      room: 'Room 102',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'],
      schedule: 'Mon-Fri 8:00-14:00'
    },
    {
      id: 3,
      name: 'Grade 9A',
      grade: 'Grade 9',
      section: 'A',
      teacher: 'Ms. Emily Davis',
      teacherId: 3,
      studentsCount: 30,
      capacity: 35,
      room: 'Room 201',
      subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
      schedule: 'Mon-Fri 8:00-14:00'
    },
    {
      id: 4,
      name: 'Grade 11A',
      grade: 'Grade 11',
      section: 'A',
      teacher: 'Mr. John Wilson',
      teacherId: 4,
      studentsCount: 25,
      capacity: 35,
      room: 'Room 301',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'],
      schedule: 'Mon-Fri 8:00-14:00'
    }
  ];

  const teachers = [
    { id: 1, name: 'Dr. Sarah Johnson' },
    { id: 2, name: 'Mr. Michael Brown' },
    { id: 3, name: 'Ms. Emily Davis' },
    { id: 4, name: 'Mr. John Wilson' }
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || cls.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleAddClass = () => {
    console.log('Adding new class:', newClass);
    setShowAddDialog(false);
    setNewClass({ name: '', grade: '', section: '', teacher: '', capacity: '', room: '' });
  };

  const handleGradesUpdate = (grades: string[]) => {
    setAvailableGrades(grades);
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Classes Management</h1>
              <p className="text-gray-600 mt-2">Manage all classes and their assignments</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowSettingsDialog(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Grade Settings
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>
                      Create a new class with teacher assignment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="grade">Grade/Level</Label>
                        <Select value={newClass.grade} onValueChange={(value) => setNewClass({...newClass, grade: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableGrades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="section">Section</Label>
                        <Input
                          id="section"
                          value={newClass.section}
                          onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                          placeholder="Enter section (A, B, C...)"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="teacher">Class Teacher</Label>
                      <Select value={newClass.teacher} onValueChange={(value) => setNewClass({...newClass, teacher: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.name}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newClass.capacity}
                          onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                          placeholder="Enter capacity"
                        />
                      </div>
                      <div>
                        <Label htmlFor="room">Room</Label>
                        <Input
                          id="room"
                          value={newClass.room}
                          onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                          placeholder="Enter room number"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddClass} className="w-full">
                      Add Class
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
                {availableGrades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <Card key={cls.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{cls.name}</span>
                    <Badge variant="outline">{cls.room}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Class Teacher: {cls.teacher}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Students</span>
                      </div>
                      <span className={`font-semibold ${getCapacityColor(cls.studentsCount, cls.capacity)}`}>
                        {cls.studentsCount}/{cls.capacity}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Subjects</p>
                      <div className="flex flex-wrap gap-1">
                        {cls.subjects.slice(0, 3).map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {cls.subjects.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{cls.subjects.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{cls.schedule}</span>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Students
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Grade System Settings</DialogTitle>
                <DialogDescription>
                  Configure your school's grading system
                </DialogDescription>
              </DialogHeader>
              <GradeSystemSettings onGradesUpdate={handleGradesUpdate} />
            </DialogContent>
          </Dialog>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SchoolAdminClasses;
