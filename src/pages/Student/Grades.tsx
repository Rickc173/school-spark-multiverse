
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, TrendingUp, Calendar, BookOpen } from 'lucide-react';

const StudentGrades = () => {
  const { user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState('current');

  const grades = [
    {
      subject: 'Mathematics',
      currentGrade: 'A-',
      percentage: 88,
      assignments: [
        { name: 'Quiz 1', grade: 'A', score: 92, date: '2023-11-15' },
        { name: 'Homework 1', grade: 'B+', score: 87, date: '2023-11-20' },
        { name: 'Test 1', grade: 'A-', score: 88, date: '2023-12-01' },
      ]
    },
    {
      subject: 'English Literature',
      currentGrade: 'B+',
      percentage: 85,
      assignments: [
        { name: 'Essay 1', grade: 'A-', score: 88, date: '2023-11-18' },
        { name: 'Book Report', grade: 'B+', score: 85, date: '2023-11-25' },
        { name: 'Quiz 2', grade: 'B', score: 82, date: '2023-12-03' },
      ]
    },
    {
      subject: 'Science',
      currentGrade: 'A',
      percentage: 92,
      assignments: [
        { name: 'Lab Report 1', grade: 'A', score: 92, date: '2023-11-22' },
        { name: 'Quiz 3', grade: 'A+', score: 95, date: '2023-11-28' },
        { name: 'Project', grade: 'A-', score: 89, date: '2023-12-05' },
      ]
    },
    {
      subject: 'History',
      currentGrade: 'B',
      percentage: 82,
      assignments: [
        { name: 'Timeline Project', grade: 'B+', score: 85, date: '2023-11-20' },
        { name: 'Test 2', grade: 'B-', score: 78, date: '2023-11-30' },
        { name: 'Essay 2', grade: 'B', score: 83, date: '2023-12-07' },
      ]
    }
  ];

  const overallStats = {
    gpa: 3.7,
    totalCredits: 24,
    attendanceRate: 94.2,
    rank: 15,
    totalStudents: 120
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
            <p className="text-gray-600 mt-2">Track your academic performance and progress</p>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Term</SelectItem>
                <SelectItem value="previous">Previous Term</SelectItem>
                <SelectItem value="all">All Terms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
                <Award className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{overallStats.gpa}</div>
                <p className="text-xs text-muted-foreground">out of 4.0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">#{overallStats.rank}</div>
                <p className="text-xs text-muted-foreground">of {overallStats.totalStudents} students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                <BookOpen className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{overallStats.totalCredits}</div>
                <p className="text-xs text-muted-foreground">credits earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{overallStats.attendanceRate}%</div>
                <p className="text-xs text-muted-foreground">attendance rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Subject Grades */}
          <div className="grid gap-6">
            {grades.map((subject, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>{subject.subject}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-4">
                      <Badge className={getGradeColor(subject.currentGrade)}>
                        {subject.currentGrade}
                      </Badge>
                      <span className={`text-lg font-bold ${getPercentageColor(subject.percentage)}`}>
                        {subject.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-700">Recent Assignments</h4>
                    {subject.assignments.map((assignment, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{assignment.name}</p>
                          <p className="text-xs text-gray-500">{assignment.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={getGradeColor(assignment.grade)}>
                            {assignment.grade}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{assignment.score}/100</p>
                        </div>
                      </div>
                    ))}
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

export default StudentGrades;
