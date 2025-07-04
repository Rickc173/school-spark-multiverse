
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Calendar, Search } from 'lucide-react';

interface ClassStudentsDialogProps {
  classData: any;
  isOpen: boolean;
  onClose: () => void;
}

const ClassStudentsDialog = ({ classData, isOpen, onClose }: ClassStudentsDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  // Mock students data for the class
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      rollNumber: '10A001',
      email: 'alice.johnson@student.edu',
      phone: '(555) 123-4567',
      parentName: 'Robert Johnson',
      parentPhone: '(555) 123-4568',
      attendance: 95,
      admissionDate: '2023-09-01',
      grade: 'A'
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNumber: '10A002',
      email: 'bob.smith@student.edu',
      phone: '(555) 234-5678',
      parentName: 'Mary Smith',
      parentPhone: '(555) 234-5679',
      attendance: 88,
      admissionDate: '2023-09-01',
      grade: 'B+'
    },
    {
      id: 3,
      name: 'Carol Davis',
      rollNumber: '10A003',
      email: 'carol.davis@student.edu',
      phone: '(555) 345-6789',
      parentName: 'James Davis',
      parentPhone: '(555) 345-6790',
      attendance: 92,
      admissionDate: '2023-09-15',
      grade: 'A-'
    },
    {
      id: 4,
      name: 'David Brown',
      rollNumber: '10A004',
      email: 'david.brown@student.edu',
      phone: '(555) 456-7890',
      parentName: 'Linda Brown',
      parentPhone: '(555) 456-7891',
      attendance: 85,
      admissionDate: '2023-09-01',
      grade: 'B'
    },
    {
      id: 5,
      name: 'Eva Martinez',
      rollNumber: '10A005',
      email: 'eva.martinez@student.edu',
      phone: '(555) 567-8901',
      parentName: 'Carlos Martinez',
      parentPhone: '(555) 567-8902',
      attendance: 98,
      admissionDate: '2023-09-01',
      grade: 'A+'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const getAttendanceBadgeColor = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-100 text-green-800';
    if (attendance >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const uniqueGrades = [...new Set(students.map(student => student.grade))];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Students in {classData?.name}</span>
          </DialogTitle>
          <DialogDescription>
            View all students enrolled in this class
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students by name, roll number, or email..."
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
              {uniqueGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  Grade {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching your search criteria.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          Grade: {student.grade}
                        </Badge>
                        <Badge className={getAttendanceBadgeColor(student.attendance)}>
                          {student.attendance}% Attendance
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Joined: {new Date(student.admissionDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Parent:</span>
                        <span className="ml-2 font-medium">{student.parentName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{student.parentPhone}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">Contact Parent</Button>
                      <Button variant="outline" size="sm">View Grades</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredStudents.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClassStudentsDialog;
