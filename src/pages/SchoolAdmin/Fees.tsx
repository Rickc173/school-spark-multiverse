
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
import { Progress } from '@/components/ui/progress';
import { Plus, Search, FileText, Calendar, Users } from 'lucide-react';

const SchoolAdminFees = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFeeStructure, setNewFeeStructure] = useState({
    name: '',
    grade: '',
    amount: '',
    dueDate: '',
    description: ''
  });

  // Mock data - replace with actual API calls
  const feeStructures = [
    {
      id: 1,
      name: 'Tuition Fee - Grade 10',
      grade: 'Grade 10',
      amount: 1200,
      dueDate: '2024-01-15',
      description: 'Monthly tuition fee for Grade 10 students',
      studentsCount: 60,
      paidCount: 45,
      pendingCount: 15,
      collectedAmount: 54000,
      totalAmount: 72000
    },
    {
      id: 2,
      name: 'Tuition Fee - Grade 9',
      grade: 'Grade 9',
      amount: 1100,
      dueDate: '2024-01-15',
      description: 'Monthly tuition fee for Grade 9 students',
      studentsCount: 55,
      paidCount: 50,
      pendingCount: 5,
      collectedAmount: 55000,
      totalAmount: 60500
    },
    {
      id: 3,
      name: 'Activity Fee - All Grades',
      grade: 'All Grades',
      amount: 150,
      dueDate: '2024-01-20',
      description: 'Annual activity and sports fee',
      studentsCount: 300,
      paidCount: 180,
      pendingCount: 120,
      collectedAmount: 27000,
      totalAmount: 45000
    },
    {
      id: 4,
      name: 'Library Fee - Grade 11',
      grade: 'Grade 11',
      amount: 75,
      dueDate: '2024-01-10',
      description: 'Annual library maintenance fee',
      studentsCount: 45,
      paidCount: 40,
      pendingCount: 5,
      collectedAmount: 3000,
      totalAmount: 3375
    }
  ];

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      grade: 'Grade 10A',
      rollNumber: '10A001',
      totalDue: 1350,
      totalPaid: 1200,
      pending: 150,
      status: 'Partial',
      lastPayment: '2023-12-15'
    },
    {
      id: 2,
      name: 'Bob Smith',
      grade: 'Grade 10A',
      rollNumber: '10A002',
      totalDue: 1350,
      totalPaid: 1350,
      pending: 0,
      status: 'Paid',
      lastPayment: '2023-12-20'
    },
    {
      id: 3,
      name: 'Carol Davis',
      grade: 'Grade 9B',
      rollNumber: '9B015',
      totalDue: 1250,
      totalPaid: 0,
      pending: 1250,
      status: 'Pending',
      lastPayment: null
    }
  ];

  const filteredStructures = feeStructures.filter(structure => {
    const matchesSearch = structure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.grade.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddFeeStructure = () => {
    console.log('Adding new fee structure:', newFeeStructure);
    setShowAddDialog(false);
    setNewFeeStructure({ name: '', grade: '', amount: '', dueDate: '', description: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateCollectionProgress = (collected: number, total: number) => {
    return Math.round((collected / total) * 100);
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
              <p className="text-gray-600 mt-2">Manage fee structures and track payments</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fee Structure
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Fee Structure</DialogTitle>
                  <DialogDescription>
                    Create a new fee structure for students
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Fee Name</Label>
                    <Input
                      id="name"
                      value={newFeeStructure.name}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, name: e.target.value})}
                      placeholder="Enter fee name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="grade">Grade/Class</Label>
                      <Input
                        id="grade"
                        value={newFeeStructure.grade}
                        onChange={(e) => setNewFeeStructure({...newFeeStructure, grade: e.target.value})}
                        placeholder="Enter grade/class"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newFeeStructure.amount}
                        onChange={(e) => setNewFeeStructure({...newFeeStructure, amount: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newFeeStructure.dueDate}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, dueDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newFeeStructure.description}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, description: e.target.value})}
                      placeholder="Enter description"
                    />
                  </div>
                  <Button onClick={handleAddFeeStructure} className="w-full">
                    Add Fee Structure
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Fee Collection Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$139,000</div>
                <p className="text-sm text-gray-600">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">$41,875</div>
                <p className="text-sm text-gray-600">Outstanding amount</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">76.9%</div>
                <p className="text-sm text-gray-600">Overall collection rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Fee Structures */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Structures</CardTitle>
              <CardDescription>Current fee structures and their collection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStructures.map((structure) => (
                  <div key={structure.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{structure.name}</h3>
                        <p className="text-sm text-gray-600">{structure.description}</p>
                        <p className="text-sm text-gray-500">
                          {structure.grade} • Due: {new Date(structure.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">${structure.amount}</p>
                        <p className="text-sm text-gray-500">per student</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {structure.studentsCount} students
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600">{structure.paidCount} paid</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-red-600">{structure.pendingCount} pending</span>
                      </div>
                      <div className="text-sm text-right">
                        <span className="font-medium">
                          ${structure.collectedAmount.toLocaleString()} / ${structure.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Collection Progress</span>
                        <span>{calculateCollectionProgress(structure.collectedAmount, structure.totalAmount)}%</span>
                      </div>
                      <Progress 
                        value={calculateCollectionProgress(structure.collectedAmount, structure.totalAmount)} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Payment Status */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Payment Status</CardTitle>
                  <CardDescription>Individual student payment tracking</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-600">
                          {student.grade} • {student.rollNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${student.totalPaid} / ${student.totalDue}
                        </p>
                        {student.pending > 0 && (
                          <p className="text-sm text-red-600">
                            ${student.pending} pending
                          </p>
                        )}
                        {student.lastPayment && (
                          <p className="text-xs text-gray-500">
                            Last: {new Date(student.lastPayment).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SchoolAdminFees;
