
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, User, Plus, ArrowRight, ArrowLeft } from 'lucide-react';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface MultiStepStudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const MultiStepStudentForm = ({ isOpen, onClose, onSubmit }: MultiStepStudentFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [parentSearchTerm, setParentSearchTerm] = useState('');
  const [showNewParentForm, setShowNewParentForm] = useState(false);
  
  const [newParent, setNewParent] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    medicalConditions: ''
  });

  const [classAssignment, setClassAssignment] = useState({
    class: '',
    section: '',
    rollNumber: '',
    admissionDate: new Date().toISOString().split('T')[0]
  });

  // Mock parent data
  const mockParents: Parent[] = [
    { id: '1', name: 'Robert Johnson', email: 'robert.johnson@email.com', phone: '(555) 123-4567', address: '123 Main St' },
    { id: '2', name: 'Mary Smith', email: 'mary.smith@email.com', phone: '(555) 234-5678', address: '456 Oak Ave' },
    { id: '3', name: 'James Davis', email: 'james.davis@email.com', phone: '(555) 345-6789', address: '789 Pine St' },
  ];

  const classes = ['Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A'];

  const filteredParents = mockParents.filter(parent =>
    parent.name.toLowerCase().includes(parentSearchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(parentSearchTerm.toLowerCase())
  );

  const handleParentRegistration = () => {
    const parent: Parent = {
      id: Date.now().toString(),
      ...newParent
    };
    setSelectedParent(parent);
    setShowNewParentForm(false);
    setNewParent({ name: '', email: '', phone: '', address: '' });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const fullData = {
      parent: selectedParent,
      student: studentData,
      class: classAssignment
    };
    onSubmit(fullData);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedParent(null);
    setParentSearchTerm('');
    setShowNewParentForm(false);
    setNewParent({ name: '', email: '', phone: '', address: '' });
    setStudentData({ name: '', email: '', dateOfBirth: '', gender: '', bloodGroup: '', medicalConditions: '' });
    setClassAssignment({ class: '', section: '', rollNumber: '', admissionDate: new Date().toISOString().split('T')[0] });
    onClose();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Parent Selection';
      case 2: return 'Student Information';
      case 3: return 'Class Assignment';
      default: return 'Student Registration';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student - {getStepTitle()}</DialogTitle>
          <DialogDescription>
            Step {currentStep} of 3: Complete student registration process
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Parent Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select or Register Parent</h3>
              <Button 
                variant="outline" 
                onClick={() => setShowNewParentForm(!showNewParentForm)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Parent
              </Button>
            </div>

            {!showNewParentForm ? (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search parents by name or email..."
                    value={parentSearchTerm}
                    onChange={(e) => setParentSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid gap-3 max-h-60 overflow-y-auto">
                  {filteredParents.map((parent) => (
                    <Card 
                      key={parent.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedParent?.id === parent.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedParent(parent)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 rounded-full p-2">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{parent.name}</h4>
                            <p className="text-sm text-gray-600">{parent.email}</p>
                            <p className="text-sm text-gray-500">{parent.phone}</p>
                          </div>
                          {selectedParent?.id === parent.id && (
                            <Badge>Selected</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Register New Parent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parentName">Full Name</Label>
                      <Input
                        id="parentName"
                        value={newParent.name}
                        onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                        placeholder="Enter parent name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentEmail">Email</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={newParent.email}
                        onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parentPhone">Phone</Label>
                      <Input
                        id="parentPhone"
                        value={newParent.phone}
                        onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentAddress">Address</Label>
                      <Input
                        id="parentAddress"
                        value={newParent.address}
                        onChange={(e) => setNewParent({...newParent, address: e.target.value})}
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                  <Button onClick={handleParentRegistration} className="w-full">
                    Register Parent
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Student Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Full Name</Label>
                <Input
                  id="studentName"
                  value={studentData.name}
                  onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <Label htmlFor="studentEmail">Email</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  value={studentData.email}
                  onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={studentData.dateOfBirth}
                  onChange={(e) => setStudentData({...studentData, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={studentData.gender} onValueChange={(value) => setStudentData({...studentData, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={studentData.bloodGroup} onValueChange={(value) => setStudentData({...studentData, bloodGroup: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions (Optional)</Label>
              <Input
                id="medicalConditions"
                value={studentData.medicalConditions}
                onChange={(e) => setStudentData({...studentData, medicalConditions: e.target.value})}
                placeholder="Enter any medical conditions"
              />
            </div>
          </div>
        )}

        {/* Step 3: Class Assignment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Class Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class">Class</Label>
                <Select value={classAssignment.class} onValueChange={(value) => setClassAssignment({...classAssignment, class: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={classAssignment.rollNumber}
                  onChange={(e) => setClassAssignment({...classAssignment, rollNumber: e.target.value})}
                  placeholder="Enter roll number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="admissionDate">Admission Date</Label>
              <Input
                id="admissionDate"
                type="date"
                value={classAssignment.admissionDate}
                onChange={(e) => setClassAssignment({...classAssignment, admissionDate: e.target.value})}
              />
            </div>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Parent:</strong> {selectedParent?.name} ({selectedParent?.email})
                </div>
                <div>
                  <strong>Student:</strong> {studentData.name} ({studentData.email})
                </div>
                <div>
                  <strong>Class:</strong> {classAssignment.class} - Roll: {classAssignment.rollNumber}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !selectedParent) ||
                  (currentStep === 2 && !studentData.name)
                }
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepStudentForm;
