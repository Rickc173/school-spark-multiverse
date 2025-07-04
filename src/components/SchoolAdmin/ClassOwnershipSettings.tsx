
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Save } from 'lucide-react';

const ClassOwnershipSettings = () => {
  const [classOwnerships, setClassOwnerships] = useState([
    { classId: 1, className: 'Grade 10A', ownerId: 1, ownerName: 'Dr. Sarah Johnson' },
    { classId: 2, className: 'Grade 10B', ownerId: 2, ownerName: 'Mr. Michael Brown' },
    { classId: 3, className: 'Grade 9A', ownerId: 3, ownerName: 'Ms. Emily Davis' },
    { classId: 4, className: 'Grade 11A', ownerId: 4, ownerName: 'Mr. John Wilson' }
  ]);

  const [pendingChanges, setPendingChanges] = useState<{[key: number]: number}>({});

  const classes = [
    { id: 1, name: 'Grade 10A' },
    { id: 2, name: 'Grade 10B' },
    { id: 3, name: 'Grade 9A' },
    { id: 4, name: 'Grade 9B' },
    { id: 5, name: 'Grade 11A' },
    { id: 6, name: 'Grade 11B' },
    { id: 7, name: 'Grade 11C' },
    { id: 8, name: 'Grade 12A' }
  ];

  const teachers = [
    { id: 1, name: 'Dr. Sarah Johnson' },
    { id: 2, name: 'Mr. Michael Brown' },
    { id: 3, name: 'Ms. Emily Davis' },
    { id: 4, name: 'Mr. John Wilson' },
    { id: 5, name: 'Ms. Lisa Wong' },
    { id: 6, name: 'Mr. Alex Chen' }
  ];

  const handleOwnershipChange = (classId: number, teacherId: number) => {
    setPendingChanges({ ...pendingChanges, [classId]: teacherId });
  };

  const saveChanges = () => {
    const updatedOwnerships = classOwnerships.map(ownership => {
      if (pendingChanges[ownership.classId]) {
        const newTeacher = teachers.find(t => t.id === pendingChanges[ownership.classId]);
        return {
          ...ownership,
          ownerId: pendingChanges[ownership.classId],
          ownerName: newTeacher?.name || ownership.ownerName
        };
      }
      return ownership;
    });

    setClassOwnerships(updatedOwnerships);
    setPendingChanges({});
    console.log('Class ownership changes saved:', updatedOwnerships);
  };

  const unassignedClasses = classes.filter(cls => 
    !classOwnerships.some(ownership => ownership.classId === cls.id)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5" />
              <span>Class Ownership</span>
            </CardTitle>
            <CardDescription>
              Assign teachers as class owners for administrative responsibilities including attendance management
            </CardDescription>
          </div>
          {Object.keys(pendingChanges).length > 0 && (
            <Button onClick={saveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Current Class Assignments</h3>
          <div className="space-y-3">
            {classOwnerships.map((ownership) => (
              <div key={ownership.classId} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{ownership.className}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Select
                    value={pendingChanges[ownership.classId]?.toString() || ownership.ownerId.toString()}
                    onValueChange={(value) => handleOwnershipChange(ownership.classId, parseInt(value))}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {pendingChanges[ownership.classId] && (
                    <Badge variant="outline" className="text-orange-600">
                      Changed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {unassignedClasses.length > 0 && (
          <div>
            <h3 className="font-medium mb-4">Unassigned Classes</h3>
            <div className="space-y-3">
              {unassignedClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">{cls.name}</span>
                    <Badge variant="outline" className="text-yellow-600">
                      No Owner
                    </Badge>
                  </div>
                  <Select onValueChange={(value) => {
                    const newOwnership = {
                      classId: cls.id,
                      className: cls.name,
                      ownerId: parseInt(value),
                      ownerName: teachers.find(t => t.id === parseInt(value))?.name || ''
                    };
                    setClassOwnerships([...classOwnerships, newOwnership]);
                  }}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Assign teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Class Owner Responsibilities:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Take daily attendance for assigned classes</li>
            <li>• Manage class-specific administrative tasks</li>
            <li>• Monitor student performance and behavior</li>
            <li>• Communicate with parents regarding class matters</li>
            <li>• Coordinate with subject teachers for the class</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassOwnershipSettings;
