
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Calendar } from 'lucide-react';

interface TeacherClassesDialogProps {
  teacher: any;
  isOpen: boolean;
  onClose: () => void;
}

const TeacherClassesDialog = ({ teacher, isOpen, onClose }: TeacherClassesDialogProps) => {
  // Mock classes data
  const classes = [
    {
      id: 1,
      name: 'Grade 10A',
      subject: 'Mathematics',
      studentsCount: 28,
      schedule: 'Mon, Wed, Fri - 8:00 AM',
      room: 'Room 101',
      nextClass: '2024-01-15 08:00'
    },
    {
      id: 2,
      name: 'Grade 10B', 
      subject: 'Mathematics',
      studentsCount: 26,
      schedule: 'Tue, Thu - 9:30 AM',
      room: 'Room 101',
      nextClass: '2024-01-16 09:30'
    },
    {
      id: 3,
      name: 'Grade 11A',
      subject: 'Physics',
      studentsCount: 24,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Lab 1',
      nextClass: '2024-01-15 10:00'
    },
    {
      id: 4,
      name: 'Grade 11B',
      subject: 'Physics', 
      studentsCount: 22,
      schedule: 'Tue, Thu - 11:00 AM',
      room: 'Lab 1',
      nextClass: '2024-01-16 11:00'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Classes - {teacher?.name}</span>
          </DialogTitle>
          <DialogDescription>
            View all classes assigned to this teacher
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          {classes.map((classItem) => (
            <Card key={classItem.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {classItem.subject} • Room {classItem.room}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {classItem.studentsCount} students
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{classItem.studentsCount} students</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Next class: {new Date(classItem.nextClass).toLocaleString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Students
                    </Button>
                    <Button variant="outline" size="sm">
                      Take Attendance
                    </Button>
                    <Button variant="outline" size="sm">
                      View Grades
                    </Button>
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

export default TeacherClassesDialog;
