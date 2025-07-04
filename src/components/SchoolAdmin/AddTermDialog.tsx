
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus } from 'lucide-react';

interface AddTermDialogProps {
  isOpen: boolean;
  onClose: () => void;
  academicYearId: number;
  onTermAdded: (term: any) => void;
}

const AddTermDialog = ({ isOpen, onClose, academicYearId, onTermAdded }: AddTermDialogProps) => {
  const [newTerm, setNewTerm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    type: 'term' // 'term' or 'semester'
  });

  const handleAddTerm = () => {
    if (!newTerm.name || !newTerm.startDate || !newTerm.endDate) {
      alert('Please fill in all fields');
      return;
    }

    const term = {
      id: Date.now(), // Simple ID generation
      name: newTerm.name,
      startDate: newTerm.startDate,
      endDate: newTerm.endDate,
      type: newTerm.type,
      academicYearId: academicYearId
    };

    onTermAdded(term);
    setNewTerm({ name: '', startDate: '', endDate: '', type: 'term' });
    onClose();
  };

  const termTypes = [
    { value: 'term', label: 'Term' },
    { value: 'semester', label: 'Semester' },
    { value: 'quarter', label: 'Quarter' },
    { value: 'trimester', label: 'Trimester' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Add New Term</span>
          </DialogTitle>
          <DialogDescription>
            Add a new term or semester to this academic year
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="termName">Term Name</Label>
              <Input
                id="termName"
                value={newTerm.name}
                onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })}
                placeholder="e.g., Term 1, Fall Semester"
              />
            </div>
            <div>
              <Label htmlFor="termType">Type</Label>
              <Select 
                value={newTerm.type} 
                onValueChange={(value) => setNewTerm({ ...newTerm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {termTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newTerm.startDate}
                onChange={(e) => setNewTerm({ ...newTerm, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newTerm.endDate}
                onChange={(e) => setNewTerm({ ...newTerm, endDate: e.target.value })}
              />
            </div>
          </div>

          {newTerm.startDate && newTerm.endDate && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Duration:</strong> {Math.ceil((new Date(newTerm.endDate).getTime() - new Date(newTerm.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleAddTerm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Term
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTermDialog;
