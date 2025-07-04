
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, MapPin } from 'lucide-react';

interface ClassScheduleDialogProps {
  classData: any;
  isOpen: boolean;
  onClose: () => void;
}

const ClassScheduleDialog = ({ classData, isOpen, onClose }: ClassScheduleDialogProps) => {
  // Mock schedule data
  const schedule = [
    {
      day: 'Monday',
      periods: [
        { time: '8:00-8:45', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101' },
        { time: '8:45-9:30', subject: 'Physics', teacher: 'Mr. John Wilson', room: 'Lab 1' },
        { time: '10:00-10:45', subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 201' },
        { time: '11:00-11:45', subject: 'Chemistry', teacher: 'Dr. Michael Brown', room: 'Lab 2' }
      ]
    },
    {
      day: 'Tuesday',
      periods: [
        { time: '8:00-8:45', subject: 'Biology', teacher: 'Dr. Sarah Johnson', room: 'Lab 3' },
        { time: '8:45-9:30', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101' },
        { time: '10:00-10:45', subject: 'History', teacher: 'Mr. David Lee', room: 'Room 301' },
        { time: '11:00-11:45', subject: 'Physical Education', teacher: 'Coach Smith', room: 'Gym' }
      ]
    },
    {
      day: 'Wednesday',
      periods: [
        { time: '8:00-8:45', subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 201' },
        { time: '8:45-9:30', subject: 'Chemistry', teacher: 'Dr. Michael Brown', room: 'Lab 2' },
        { time: '10:00-10:45', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101' },
        { time: '11:00-11:45', subject: 'Physics', teacher: 'Mr. John Wilson', room: 'Lab 1' }
      ]
    },
    {
      day: 'Thursday',
      periods: [
        { time: '8:00-8:45', subject: 'Geography', teacher: 'Ms. Lisa Wong', room: 'Room 302' },
        { time: '8:45-9:30', subject: 'Biology', teacher: 'Dr. Sarah Johnson', room: 'Lab 3' },
        { time: '10:00-10:45', subject: 'Art', teacher: 'Mr. Alex Chen', room: 'Art Room' },
        { time: '11:00-11:45', subject: 'Computer Science', teacher: 'Ms. Tech Guru', room: 'Computer Lab' }
      ]
    },
    {
      day: 'Friday',
      periods: [
        { time: '8:00-8:45', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101' },
        { time: '8:45-9:30', subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 201' },
        { time: '10:00-10:45', subject: 'Physics', teacher: 'Mr. John Wilson', room: 'Lab 1' },
        { time: '11:00-11:45', subject: 'Free Period', teacher: classData?.teacher, room: classData?.room }
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Schedule for {classData?.name}</span>
          </DialogTitle>
          <DialogDescription>
            Weekly class schedule and timetable
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {schedule.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Badge variant="outline">{day.day}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {day.periods.map((period, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-sm">{period.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">{period.subject}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{period.teacher}</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{period.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline">Export Schedule</Button>
          <Button variant="outline">Print Schedule</Button>
          <Button>Edit Schedule</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassScheduleDialog;
