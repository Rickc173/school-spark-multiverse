import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Edit, ArrowRightLeft, FileText, DollarSign, History, Calendar, BookOpen, Users } from 'lucide-react';

interface StudentDetailsDialogProps {
  student: any;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailsDialog = ({ student, isOpen, onClose }: StudentDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);

  // Mock data for student-related information
  const invoices = [
    { id: 1, type: 'Tuition Fee', amount: 500, dueDate: '2023-12-01', status: 'Paid', paidDate: '2023-11-28' },
    { id: 2, type: 'Library Fee', amount: 50, dueDate: '2023-12-15', status: 'Pending', paidDate: null },
    { id: 3, type: 'Lab Fee', amount: 75, dueDate: '2023-12-20', status: 'Overdue', paidDate: null }
  ];

  const paymentHistory = [
    { id: 1, date: '2023-11-28', amount: 500, type: 'Tuition Fee', method: 'Bank Transfer' },
    { id: 2, date: '2023-10-30', amount: 500, type: 'Tuition Fee', method: 'Cash' },
    { id: 3, date: '2023-09-28', amount: 500, type: 'Tuition Fee', method: 'Online' }
  ];

  const classHistory = [
    { year: '2023-2024', class: 'Grade 10A', teacher: 'Dr. Sarah Johnson' },
    { year: '2022-2023', class: 'Grade 9A', teacher: 'Ms. Emily Davis' }
  ];

  const attendanceData = [
    { month: 'November 2023', present: 20, absent: 2, total: 22, percentage: 91 },
    { month: 'October 2023', present: 21, absent: 1, total: 22, percentage: 95 },
    { month: 'September 2023', present: 18, absent: 4, total: 22, percentage: 82 }
  ];

  const assignments = [
    { id: 1, subject: 'Mathematics', title: 'Algebra Problems', dueDate: '2023-12-10', status: 'Submitted', grade: 'A' },
    { id: 2, subject: 'Physics', title: 'Motion Lab Report', dueDate: '2023-12-12', status: 'Pending', grade: null },
    { id: 3, subject: 'English', title: 'Essay Writing', dueDate: '2023-12-08', status: 'Graded', grade: 'B+' }
  ];

  const handleSave = () => {
    console.log('Saving student data:', editedStudent);
    setIsEditing(false);
  };

  const handleTransfer = () => {
    console.log('Initiating student transfer');
  };

  const handleSettleInvoice = (invoiceId: number) => {
    console.log('Settling invoice:', invoiceId);
  };

  const handleClassChange = () => {
    console.log('Changing student class');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Student Details - {student?.name}</span>
          </DialogTitle>
          <DialogDescription>
            Complete information and management options for the student
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-end space-x-2 mb-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={handleTransfer}>
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Transfer
                  </Button>
                  <Button variant="outline" onClick={handleClassChange}>
                    <Users className="h-4 w-4 mr-2" />
                    Change Class
                  </Button>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedStudent?.name || ''}
                        onChange={(e) => setEditedStudent({...editedStudent, name: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{student?.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        value={editedStudent?.email || ''}
                        onChange={(e) => setEditedStudent({...editedStudent, email: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{student?.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Class</Label>
                    <p className="font-medium">{student?.class}</p>
                  </div>
                  <div>
                    <Label>Roll Number</Label>
                    <p className="font-medium">{student?.rollNumber}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant={student?.status === 'Active' ? 'default' : 'secondary'}>
                      {student?.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parent/Guardian Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Parent Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedStudent?.parentName || ''}
                        onChange={(e) => setEditedStudent({...editedStudent, parentName: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{student?.parentName}</p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editedStudent?.parentPhone || ''}
                        onChange={(e) => setEditedStudent({...editedStudent, parentPhone: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{student?.parentPhone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        value={editedStudent?.parentEmail || ''}
                        onChange={(e) => setEditedStudent({...editedStudent, parentEmail: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{student?.parentEmail}</p>
                    )}
                  </div>
                  <div>
                    <Label>Admission Date</Label>
                    <p className="font-medium">{new Date(student?.admissionDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Outstanding Invoices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invoices.filter(inv => inv.status !== 'Paid').map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between border rounded p-3">
                        <div>
                          <p className="font-medium">{invoice.type}</p>
                          <p className="text-sm text-gray-600">${invoice.amount} - Due: {invoice.dueDate}</p>
                          <Badge variant={invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <Button size="sm" onClick={() => handleSettleInvoice(invoice.id)}>
                          Settle
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Payment History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="border rounded p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{payment.type}</p>
                            <p className="text-sm text-gray-600">{payment.date}</p>
                            <p className="text-sm text-gray-600">{payment.method}</p>
                          </div>
                          <Badge variant="outline">${payment.amount}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{student?.attendance}%</p>
                    <p className="text-sm text-gray-600">Overall Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">B+</p>
                    <p className="text-sm text-gray-600">Average Grade</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">8/10</p>
                    <p className="text-sm text-gray-600">Assignments Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Attendance Record</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((record, index) => (
                    <div key={index} className="border rounded p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{record.month}</p>
                          <p className="text-sm text-gray-600">
                            Present: {record.present} | Absent: {record.absent} | Total: {record.total}
                          </p>
                        </div>
                        <Badge variant={record.percentage >= 90 ? 'default' : record.percentage >= 80 ? 'secondary' : 'destructive'}>
                          {record.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Assignment History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                          <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            assignment.status === 'Graded' ? 'default' :
                            assignment.status === 'Submitted' ? 'secondary' : 'outline'
                          }>
                            {assignment.status}
                          </Badge>
                          {assignment.grade && (
                            <p className="text-sm font-medium mt-1">Grade: {assignment.grade}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Class History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classHistory.map((record, index) => (
                    <div key={index} className="border rounded p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{record.class}</p>
                          <p className="text-sm text-gray-600">Teacher: {record.teacher}</p>
                        </div>
                        <Badge variant="outline">{record.year}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailsDialog;
