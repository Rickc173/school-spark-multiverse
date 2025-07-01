
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Save } from 'lucide-react';

const TimetableCreator = () => {
  const [timetableSettings, setTimetableSettings] = useState({
    schoolStartTime: '08:00',
    schoolEndTime: '15:00',
    periodDuration: '45',
    breakDuration: '15',
    lunchDuration: '60',
    breakTime: '10:00',
    lunchTime: '12:00'
  });

  const [selectedClass, setSelectedClass] = useState('');
  const [periods, setPeriods] = useState([]);

  const classes = ['Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
  const teachers = ['Dr. Sarah Johnson', 'Mr. Michael Brown', 'Ms. Emily Davis', 'Mr. John Wilson'];
  const rooms = ['Room 101', 'Room 102', 'Lab 1', 'Lab 2', 'Library', 'Auditorium'];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date(`1970-01-01T${timetableSettings.schoolStartTime}:00`);
    const end = new Date(`1970-01-01T${timetableSettings.schoolEndTime}:00`);
    const periodDuration = parseInt(timetableSettings.periodDuration);
    const breakDuration = parseInt(timetableSettings.breakDuration);
    const lunchDuration = parseInt(timetableSettings.lunchDuration);
    
    let current = new Date(start);
    let periodCount = 1;
    
    while (current < end) {
      const periodEnd = new Date(current.getTime() + periodDuration * 60000);
      
      // Check if this is break time
      const currentTime = current.toTimeString().slice(0, 5);
      if (currentTime === timetableSettings.breakTime) {
        slots.push({
          time: `${currentTime}-${new Date(current.getTime() + breakDuration * 60000).toTimeString().slice(0, 5)}`,
          type: 'break',
          label: 'Break'
        });
        current = new Date(current.getTime() + breakDuration * 60000);
      } else if (currentTime === timetableSettings.lunchTime) {
        slots.push({
          time: `${currentTime}-${new Date(current.getTime() + lunchDuration * 60000).toTimeString().slice(0, 5)}`,
          type: 'lunch',
          label: 'Lunch'
        });
        current = new Date(current.getTime() + lunchDuration * 60000);
      } else {
        slots.push({
          time: `${currentTime}-${periodEnd.toTimeString().slice(0, 5)}`,
          type: 'period',
          label: `Period ${periodCount}`,
          period: periodCount
        });
        current = periodEnd;
        periodCount++;
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const saveTimetable = () => {
    console.log('Saving timetable for', selectedClass);
    console.log('Settings:', timetableSettings);
    console.log('Time slots:', timeSlots);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Timetable Creator</span>
        </CardTitle>
        <CardDescription>
          Create and manage class timetables with customizable periods and breaks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timetable Settings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="startTime">School Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={timetableSettings.schoolStartTime}
              onChange={(e) => setTimetableSettings({...timetableSettings, schoolStartTime: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="endTime">School End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={timetableSettings.schoolEndTime}
              onChange={(e) => setTimetableSettings({...timetableSettings, schoolEndTime: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="periodDuration">Period Duration (min)</Label>
            <Input
              id="periodDuration"
              type="number"
              value={timetableSettings.periodDuration}
              onChange={(e) => setTimetableSettings({...timetableSettings, periodDuration: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="breakDuration">Break Duration (min)</Label>
            <Input
              id="breakDuration"
              type="number"
              value={timetableSettings.breakDuration}
              onChange={(e) => setTimetableSettings({...timetableSettings, breakDuration: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="breakTime">Break Time</Label>
            <Input
              id="breakTime"
              type="time"
              value={timetableSettings.breakTime}
              onChange={(e) => setTimetableSettings({...timetableSettings, breakTime: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="lunchTime">Lunch Time</Label>
            <Input
              id="lunchTime"
              type="time"
              value={timetableSettings.lunchTime}
              onChange={(e) => setTimetableSettings({...timetableSettings, lunchTime: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="lunchDuration">Lunch Duration (min)</Label>
            <Input
              id="lunchDuration"
              type="number"
              value={timetableSettings.lunchDuration}
              onChange={(e) => setTimetableSettings({...timetableSettings, lunchDuration: e.target.value})}
            />
          </div>
        </div>

        {/* Class Selection */}
        <div>
          <Label htmlFor="classSelect">Select Class</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a class to create timetable" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timetable Grid */}
        {selectedClass && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4">
              <h3 className="font-medium">Timetable for {selectedClass}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 bg-gray-50">Time</th>
                    {daysOfWeek.map((day) => (
                      <th key={day} className="text-left p-3 bg-gray-50">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 font-medium">
                        <div className="flex items-center space-x-2">
                          <Badge variant={slot.type === 'break' ? 'secondary' : slot.type === 'lunch' ? 'outline' : 'default'}>
                            {slot.label}
                          </Badge>
                          <span className="text-sm text-gray-600">{slot.time}</span>
                        </div>
                      </td>
                      {daysOfWeek.map((day) => (
                        <td key={day} className="p-3">
                          {slot.type === 'period' ? (
                            <div className="space-y-2">
                              <Select>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  {subjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                  {teachers.map((teacher) => (
                                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Room" />
                                </SelectTrigger>
                                <SelectContent>
                                  {rooms.map((room) => (
                                    <SelectItem key={room} value={room}>{room}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 text-sm">
                              {slot.label}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="outline">
            Preview Timetable
          </Button>
          <Button onClick={saveTimetable}>
            <Save className="h-4 w-4 mr-2" />
            Save Timetable
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableCreator;
