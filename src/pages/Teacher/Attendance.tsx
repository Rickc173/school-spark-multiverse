
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, Users, CheckSquare, Save, Filter } from 'lucide-react';

const TeacherAttendance = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const classes = [
    { id: 1, name: 'Grade 8A - Mathematics', students: 28 },
    { id: 2, name: 'Grade 7B - Mathematics', students: 25 },
    { id: 3, name: 'Grade 9A - Algebra', students: 32 }
  ];

  const students = [
    { id: 1, name: 'Alice Johnson', rollNumber: '8A001', attendance: 95 },
    { id: 2, name: 'Bob Smith', rollNumber: '8A002', attendance: 92 },
    { id: 3, name: 'Carol Davis', rollNumber: '8A003', attendance: 98 },
    { id: 4, name: 'David Wilson', rollNumber: '8A004', attendance: 88 },
    { id: 5, name: 'Emma Brown', rollNumber: '8A005', attendance: 94 },
    { id: 6, name: 'Frank Miller', rollNumber: '8A006', attendance: 91 }
  ];

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleSaveAttendance = () => {
    console.log('Saving attendance:', {
      class: selectedClass,
      date: selectedDate,
      attendance: attendance
    });
  };

  const handleMarkAllPresent = () => {
    const allPresent = {};
    students.forEach(student => {
      allPresent[student.id] = true;
    });
    setAttendance(allPresent);
  };

  const handleMarkAllAbsent = () => {
    const allAbsent = {};
    students.forEach(student => {
      allAbsent[student.id] = false;
    });
    setAttendance(allAbsent);
  };

  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-600 mt-2">Mark and track student attendance</p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.name}>
                      {cls.name} ({cls.students} students)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {selectedDate.toLocaleDateString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {selectedClass && (
              <>
                <Button variant="outline" onClick={handleMarkAllPresent}>
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Mark All Present
                </Button>
                <Button variant="outline" onClick={handleMarkAllAbsent}>
                  Mark All Absent
                </Button>
                <Button onClick={handleSaveAttendance}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Attendance
                </Button>
              </>
            )}
          </div>

          {selectedClass ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Attendance for {selectedClass}</span>
                </CardTitle>
                <CardDescription>
                  Mark attendance for {selectedDate.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
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
                      
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">
                          {student.attendance}% overall
                        </Badge>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`present-${student.id}`}
                              checked={attendance[student.id] === true}
                              onCheckedChange={(checked) => handleAttendanceChange(student.id, checked)}
                            />
                            <label htmlFor={`present-${student.id}`} className="text-sm font-medium text-green-600">
                              Present
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`absent-${student.id}`}
                              checked={attendance[student.id] === false}
                              onCheckedChange={(checked) => handleAttendanceChange(student.id, checked ? false : null)}
                            />
                            <label htmlFor={`absent-${student.id}`} className="text-sm font-medium text-red-600">
                              Absent
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Class</h3>
                <p className="text-gray-600">Choose a class to mark attendance</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TeacherAttendance;
