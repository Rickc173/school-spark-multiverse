
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, UserCheck, Trash2, BookOpen, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const PrincipalApprovals = () => {
  const { user } = useAuth();
  
  const pendingApprovals = [
    {
      id: 1,
      type: 'teacher_registration',
      title: 'New Teacher Registration',
      description: 'Sarah Miller - Mathematics Teacher',
      details: {
        name: 'Sarah Miller',
        email: 'sarah.miller@greenwood.edu',
        qualification: 'M.Sc. Mathematics',
        experience: '5 years'
      },
      priority: 'High',
      date: '2024-01-15',
      requestedBy: 'School Admin'
    },
    {
      id: 2,
      type: 'student_deletion',
      title: 'Student Record Deletion',
      description: 'Remove John Doe from Grade 10A',
      details: {
        student: 'John Doe',
        class: 'Grade 10A',
        reason: 'Transfer to another school',
        rollNumber: '10A015'
      },
      priority: 'Medium',
      date: '2024-01-14',
      requestedBy: 'Class Teacher'
    },
    {
      id: 3,
      type: 'class_assignment',
      title: 'Class Assignment Request',
      description: 'Assign Grade 9B to Ms. Johnson',
      details: {
        teacher: 'Ms. Emily Johnson',
        class: 'Grade 9B',
        subject: 'English',
        reason: 'Previous teacher resigned'
      },
      priority: 'Low',
      date: '2024-01-13',
      requestedBy: 'School Admin'
    }
  ];

  const approvedRequests = [
    {
      id: 4,
      type: 'teacher_registration',
      title: 'Teacher Registration Approved',
      description: 'Dr. Michael Brown - Physics Teacher',
      date: '2024-01-12',
      approvedDate: '2024-01-13'
    },
    {
      id: 5,
      type: 'class_assignment',
      title: 'Class Assignment Approved',
      description: 'Grade 8A assigned to Mr. Anderson',
      date: '2024-01-10',
      approvedDate: '2024-01-11'
    }
  ];

  const rejectedRequests = [
    {
      id: 6,
      type: 'student_deletion',
      title: 'Student Deletion Rejected',
      description: 'Jane Smith - Grade 11A',
      date: '2024-01-09',
      rejectedDate: '2024-01-10',
      reason: 'Missing documentation'
    }
  ];

  const handleApprove = (id: number) => {
    console.log(`Approving request ${id}`);
    // Add approval logic here
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting request ${id}`);
    // Add rejection logic here
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'teacher_registration': return UserCheck;
      case 'student_deletion': return Trash2;
      case 'class_assignment': return BookOpen;
      default: return Shield;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Approval Center</h1>
            <p className="text-gray-600 mt-2">Review and approve pending requests</p>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Pending ({pendingApprovals.length})</span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Approved ({approvedRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center space-x-2">
                <XCircle className="h-4 w-4" />
                <span>Rejected ({rejectedRequests.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingApprovals.map((request) => {
                const IconComponent = getTypeIcon(request.type);
                return (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <IconComponent className="h-5 w-5" />
                          <span>{request.title}</span>
                        </CardTitle>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority} Priority
                        </Badge>
                      </div>
                      <CardDescription>{request.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Request Details:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(request.details).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                                <span className="ml-2 font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <p>Requested by: {request.requestedBy}</p>
                            <p>Date: {new Date(request.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReject(request.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedRequests.map((request) => {
                const IconComponent = getTypeIcon(request.type);
                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-green-600" />
                          <div>
                            <h3 className="font-semibold">{request.title}</h3>
                            <p className="text-gray-600">{request.description}</p>
                            <p className="text-sm text-gray-500">
                              Requested: {new Date(request.date).toLocaleDateString()} | 
                              Approved: {new Date(request.approvedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedRequests.map((request) => {
                const IconComponent = getTypeIcon(request.type);
                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-red-600" />
                          <div>
                            <h3 className="font-semibold">{request.title}</h3>
                            <p className="text-gray-600">{request.description}</p>
                            <p className="text-sm text-gray-500">
                              Requested: {new Date(request.date).toLocaleDateString()} | 
                              Rejected: {new Date(request.rejectedDate).toLocaleDateString()}
                            </p>
                            {request.reason && (
                              <p className="text-sm text-red-600">Reason: {request.reason}</p>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PrincipalApprovals;
