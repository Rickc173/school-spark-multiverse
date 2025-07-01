
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface EditTeacherDialogProps {
  teacher: any;
  isOpen: boolean;
  onClose: () => void;
}

const EditTeacherDialog = ({ teacher, isOpen, onClose }: EditTeacherDialogProps) => {
  const [editedTeacher, setEditedTeacher] = useState({
    name: teacher?.name || '',
    email: teacher?.email || '',
    phone: teacher?.phone || '',
    subjects: teacher?.subjects || [],
    classes: teacher?.classes || [],
    qualification: teacher?.qualification || '',
    status: teacher?.status || 'Active'
  });

  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 
    'Creative Writing', 'History', 'Geography', 'Computer Science', 'Art', 
    'Music', 'Physical Education', 'Economics', 'Psychology'
  ];

  const availableClasses = [
    'Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 
    'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 11C', 'Grade 12A'
  ];

  const handleSave = () => {
    console.log('Saving teacher changes:', editedTeacher);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Edit Teacher</span>
          </DialogTitle>
          <DialogDescription>
            Update teacher information and assignments
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editedTeacher.name}
                onChange={(e) => setEditedTeacher({...editedTeacher, name: e.target.value})}
                placeholder="Enter teacher name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedTeacher.email}
                onChange={(e) => setEditedTeacher({...editedTeacher, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editedTeacher.phone}
                onChange={(e) => setEditedTeacher({...editedTeacher, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={editedTeacher.qualification}
                onChange={(e) => setEditedTeacher({...editedTeacher, qualification: e.target.value})}
                placeholder="Enter qualification"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subjects">Subjects</Label>
            <MultiSelect
              options={availableSubjects}
              selected={editedTeacher.subjects}
              onSelectionChange={(subjects) => setEditedTeacher({...editedTeacher, subjects})}
              placeholder="Select subjects to teach"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {editedTeacher.subjects.map((subject, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="classes">Classes</Label>
            <MultiSelect
              options={availableClasses}
              selected={editedTeacher.classes}
              onSelectionChange={(classes) => setEditedTeacher({...editedTeacher, classes})}
              placeholder="Select classes to teach"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {editedTeacher.classes.map((cls, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cls}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={editedTeacher.status}
              onChange={(e) => setEditedTeacher({...editedTeacher, status: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeacherDialog;
