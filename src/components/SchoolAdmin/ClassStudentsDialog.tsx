
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface ClassStudentsDialogProps {
  classData: any;
  isOpen: boolean;
  onClose: () => void;
}

const ClassStudentsDialog = ({ classData, isOpen, onClose }: ClassStudentsDialogProps) => {
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
      admissionDate: '2023-09-01'
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
      admissionDate: '2023-09-01'
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
      admissionDate: '2023-09-15'
    }
  ];

  const getAttendanceBadgeColor = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-100 text-green-800';
    if (attendance >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Students in {classData?.name}</span>
          </DialogTitle>
          <DialogDescription>
            View all students enrolled in this class
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {students.map((student) => (
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
                    <Badge className={getAttendanceBadgeColor(student.attendance)}>
                      {student.attendance}% Attendance
                    </Badge>
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassStudentsDialog;
