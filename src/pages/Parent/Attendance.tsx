
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, TrendingUp, Users } from 'lucide-react';

const ParentAttendance = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const children = [
    {
      id: '1',
      name: 'Mike Wilson',
      grade: 'Grade 8A',
      avatar: '/placeholder.svg',
      attendance: {
        overall: 94.2,
        thisMonth: 96.8,
        present: 142,
        absent: 8,
        late: 5,
        totalDays: 155
      },
      recentRecords: [
        { date: '2023-12-11', status: 'present', subjects: ['Math', 'English', 'Science', 'History'] },
        { date: '2023-12-10', status: 'late', subjects: ['Math', 'English', 'Science', 'History'], lateTime: '15 minutes' },
        { date: '2023-12-09', status: 'absent', subjects: ['Math', 'English', 'Science', 'History'], reason: 'Sick' },
        { date: '2023-12-08', status: 'present', subjects: ['Math', 'English', 'Science', 'History'] },
      ]
    },
    {
      id: '2',
      name: 'Emma Wilson',
      grade: 'Grade 5B',
      avatar: '/placeholder.svg',
      attendance: {
        overall: 96.8,
        thisMonth: 98.2,
        present: 152,
        absent: 3,
        late: 2,
        totalDays: 157
      },
      recentRecords: [
        { date: '2023-12-11', status: 'present', subjects: ['Math', 'English', 'Science', 'Art'] },
        { date: '2023-12-10', status: 'present', subjects: ['Math', 'English', 'Science', 'Art'] },
        { date: '2023-12-09', status: 'present', subjects: ['Math', 'English', 'Science', 'Art'] },
        { date: '2023-12-08', status: 'late', subjects: ['Math', 'English', 'Science', 'Art'], lateTime: '10 minutes' },
      ]
    }
  ];

  const filteredChildren = selectedChild === 'all' 
    ? children 
    : children.filter(child => child.id === selectedChild);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50';
      case 'absent': return 'text-red-600 bg-red-50';
      case 'late': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 90) return 'text-blue-600';
    if (percentage >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ProtectedRoute allowedRoles={['parent']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Children's Attendance</h1>
            <p className="text-gray-600 mt-2">Monitor your children's attendance records and patterns</p>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select child" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredChildren.map((child) => (
            <div key={child.id} className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{child.name}</h2>
                  <p className="text-gray-600">{child.grade}</p>
                </div>
              </div>

              {/* Attendance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getAttendanceColor(child.attendance.overall)}`}>
                      {child.attendance.overall}%
                    </div>
                    <p className="text-xs text-muted-foreground">this semester</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Present Days</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{child.attendance.present}</div>
                    <p className="text-xs text-muted-foreground">out of {child.attendance.totalDays}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{child.attendance.absent}</div>
                    <p className="text-xs text-muted-foreground">total absences</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{child.attendance.late}</div>
                    <p className="text-xs text-muted-foreground">this semester</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Attendance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5" />
                      <span>Recent Attendance</span>
                    </CardTitle>
                    <CardDescription>Latest attendance records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {child.recentRecords.map((record, index) => (
                        <div key={index} className="flex justify-between items-start p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-medium text-sm">
                                {new Date(record.date).toLocaleDateString()}
                              </p>
                              <Badge className={getStatusColor(record.status)}>
                                {getStatusIcon(record.status)}
                                <span className="ml-1 capitalize">{record.status}</span>
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">
                              Subjects: {record.subjects.join(', ')}
                            </p>
                            {record.lateTime && (
                              <p className="text-xs text-yellow-600 mt-1">
                                Late by: {record.lateTime}
                              </p>
                            )}
                            {record.reason && (
                              <p className="text-xs text-red-600 mt-1">
                                Reason: {record.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Progress</CardTitle>
                    <CardDescription>Attendance trend for {child.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>This Month</span>
                        <span className={getAttendanceColor(child.attendance.thisMonth)}>
                          {child.attendance.thisMonth}%
                        </span>
                      </div>
                      <Progress value={child.attendance.thisMonth} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall</span>
                        <span className={getAttendanceColor(child.attendance.overall)}>
                          {child.attendance.overall}%
                        </span>
                      </div>
                      <Progress value={child.attendance.overall} className="h-2" />
                    </div>
                    <div className="pt-4">
                      <Calendar
                        mode="single"
                        selected={selectedMonth}
                        onSelect={setSelectedMonth}
                        className="rounded-md border"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {child.attendance.overall < 90 && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <Clock className="h-5 w-5" />
                      <span>Attendance Alert</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-orange-700">
                      {child.name}'s attendance rate is below 90%. Regular attendance is important for academic success. 
                      Please ensure consistent school attendance.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ParentAttendance;
