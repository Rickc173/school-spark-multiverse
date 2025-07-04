
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';

const StudentAssignments = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Math Homework - Chapter 5',
      subject: 'Mathematics',
      description: 'Complete exercises 1-20 from chapter 5',
      dueDate: '2023-12-15',
      status: 'pending',
      progress: 0,
      maxPoints: 100,
      instructions: 'Show all work and calculations clearly'
    },
    {
      id: 2,
      title: 'Essay on Climate Change',
      subject: 'English',
      description: 'Write a 500-word essay on climate change impacts',
      dueDate: '2023-12-12',
      status: 'in_progress',
      progress: 60,
      maxPoints: 100,
      instructions: 'Include at least 3 credible sources'
    },
    {
      id: 3,
      title: 'Science Lab Report',
      subject: 'Science',
      description: 'Lab report on chemical reactions experiment',
      dueDate: '2023-12-18',
      status: 'pending',
      progress: 0,
      maxPoints: 50,
      instructions: 'Follow the lab report template provided'
    },
    {
      id: 4,
      title: 'History Timeline Project',
      subject: 'History',
      description: 'Create a timeline of World War II events',
      dueDate: '2023-12-08',
      status: 'submitted',
      progress: 100,
      maxPoints: 75,
      grade: 85,
      instructions: 'Include major battles and political events'
    }
  ];

  const subjects = ['all', 'Mathematics', 'English', 'Science', 'History'];
  const statuses = ['all', 'pending', 'in_progress', 'submitted'];

  const filteredAssignments = assignments.filter(assignment => {
    const subjectMatch = selectedSubject === 'all' || assignment.subject === selectedSubject;
    const statusMatch = selectedStatus === 'all' || assignment.status === selectedStatus;
    return subjectMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-red-600 bg-red-50';
      case 'in_progress': return 'text-yellow-600 bg-yellow-50';
      case 'submitted': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
            <p className="text-gray-600 mt-2">View and manage your assignments and homework</p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>{assignment.title}</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1">{assignment.status.replace('_', ' ')}</span>
                      </Badge>
                      {assignment.grade && (
                        <Badge variant="outline">
                          Grade: {assignment.grade}/{assignment.maxPoints}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{assignment.description}</p>
                  <p className="text-sm text-gray-600 italic">{assignment.instructions}</p>
                  
                  {assignment.status === 'in_progress' && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-gray-500">
                      Max Points: {assignment.maxPoints}
                    </div>
                    <div className="flex space-x-2">
                      {assignment.status !== 'submitted' && (
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          {assignment.status === 'pending' ? 'Start Assignment' : 'Continue Work'}
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
                <p className="text-gray-600">No assignments match your current filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default StudentAssignments;
