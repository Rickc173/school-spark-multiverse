
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Plus, FileText, Calendar, Users, Eye, Edit } from 'lucide-react';

const TeacherAssignments = () => {
  const { user } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    class: '',
    dueDate: '',
    totalMarks: '',
    instructions: ''
  });

  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Practice',
      class: 'Grade 9A - Algebra',
      subject: 'Mathematics',
      dueDate: '2024-01-20',
      created: '2024-01-10',
      totalMarks: 100,
      submissions: 28,
      totalStudents: 32,
      status: 'Active',
      description: 'Solve the quadratic equations using different methods'
    },
    {
      id: 2,
      title: 'Geometry Worksheet',
      class: 'Grade 8A - Mathematics',
      subject: 'Mathematics',
      dueDate: '2024-01-18',
      created: '2024-01-08',
      totalMarks: 50,
      submissions: 22,
      totalStudents: 28,
      status: 'Active',
      description: 'Complete the geometry problems on triangles and circles'
    },
    {
      id: 3,
      title: 'Linear Functions Quiz',
      class: 'Grade 7B - Mathematics',
      subject: 'Mathematics',
      dueDate: '2024-01-15',
      created: '2024-01-05',
      totalMarks: 75,
      submissions: 25,
      totalStudents: 25,
      status: 'Completed',
      description: 'Quiz on linear functions and graphing'
    }
  ];

  const classes = [
    'Grade 8A - Mathematics',
    'Grade 7B - Mathematics',
    'Grade 9A - Algebra'
  ];

  const handleCreateAssignment = () => {
    console.log('Creating assignment:', newAssignment);
    setNewAssignment({
      title: '',
      description: '',
      class: '',
      dueDate: '',
      totalMarks: '',
      instructions: ''
    });
    setShowCreateDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const AssignmentDetailsDialog = ({ assignment, isOpen, onClose }) => {
    if (!assignment) return null;

    const submissionRate = Math.round((assignment.submissions / assignment.totalStudents) * 100);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{assignment.title}</DialogTitle>
            <DialogDescription>{assignment.class}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Marks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignment.totalMarks}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignment.submissions}/{assignment.totalStudents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Submission Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{submissionRate}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Due Date</Label>
                    <p className="text-sm font-medium mt-1">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Created</Label>
                    <p className="text-sm font-medium mt-1">{new Date(assignment.created).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label>Submission Progress</Label>
              <Progress value={submissionRate} className="h-2" />
              <p className="text-sm text-gray-600">
                {assignment.submissions} out of {assignment.totalStudents} students have submitted
              </p>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View Submissions
              </Button>
              <Button variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
              <p className="text-gray-600 mt-2">Create and manage assignments for your classes</p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>Set up a new assignment for your class</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input
                      id="title"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      placeholder="Enter assignment title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="class">Select Class</Label>
                    <Select value={newAssignment.class} onValueChange={(value) => setNewAssignment({...newAssignment, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalMarks">Total Marks</Label>
                      <Input
                        id="totalMarks"
                        type="number"
                        value={newAssignment.totalMarks}
                        onChange={(e) => setNewAssignment({...newAssignment, totalMarks: e.target.value})}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      placeholder="Brief description of the assignment"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={newAssignment.instructions}
                      onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
                      placeholder="Detailed instructions for students"
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleCreateAssignment} className="w-full">
                    Create Assignment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.class}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{assignment.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>{assignment.totalMarks} marks</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Submissions</span>
                      <span>{assignment.submissions}/{assignment.totalStudents}</span>
                    </div>
                    <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-1" />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Users className="h-4 w-4 mr-1" />
                      Grade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <AssignmentDetailsDialog
          assignment={selectedAssignment}
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TeacherAssignments;
