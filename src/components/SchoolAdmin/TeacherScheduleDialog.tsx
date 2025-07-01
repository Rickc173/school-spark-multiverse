
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';

interface TeacherScheduleDialogProps {
  teacher: any;
  isOpen: boolean;
  onClose: () => void;
}

const TeacherScheduleDialog = ({ teacher, isOpen, onClose }: TeacherScheduleDialogProps) => {
  // Mock schedule data
  const schedule = [
    { day: 'Monday', periods: [
      { time: '8:00-8:45', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
      { time: '8:45-9:30', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 101' },
      { time: '10:00-10:45', subject: 'Physics', class: 'Grade 11A', room: 'Lab 1' },
      { time: '11:00-11:45', subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' }
    ]},
    { day: 'Tuesday', periods: [
      { time: '8:00-8:45', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
      { time: '9:30-10:15', subject: 'Physics', class: 'Grade 11A', room: 'Lab 1' },
      { time: '11:00-11:45', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 101' }
    ]},
    { day: 'Wednesday', periods: [
      { time: '8:00-8:45', subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' },
      { time: '8:45-9:30', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
      { time: '10:00-10:45', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 101' }
    ]},
    { day: 'Thursday', periods: [
      { time: '8:00-8:45', subject: 'Physics', class: 'Grade 11A', room: 'Lab 1' },
      { time: '9:30-10:15', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
      { time: '11:00-11:45', subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' }
    ]},
    { day: 'Friday', periods: [
      { time: '8:00-8:45', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 101' },
      { time: '8:45-9:30', subject: 'Physics', class: 'Grade 11A', room: 'Lab 1' },
      { time: '10:00-10:45', subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' }
    ]}
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Schedule - {teacher?.name}</span>
          </DialogTitle>
          <DialogDescription>
            View the complete weekly teaching schedule
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {schedule.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <CardTitle className="text-lg">{day.day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {day.periods.map((period, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{period.time}</span>
                        </div>
                        <Badge variant="outline">{period.subject}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{period.class}</span>
                        </div>
                        <span className="text-sm text-gray-500">{period.room}</span>
                      </div>
                    </div>
                  ))}
                  {day.periods.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No classes scheduled</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherScheduleDialog;
