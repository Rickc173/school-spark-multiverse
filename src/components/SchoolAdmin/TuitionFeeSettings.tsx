
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, Plus, Edit, Trash2, Save } from 'lucide-react';

const TuitionFeeSettings = () => {
  const [feeStructures, setFeeStructures] = useState([
    {
      id: 1,
      grade: 'Grade 8',
      tuitionFee: 5000,
      admissionFee: 500,
      labFee: 200,
      libraryFee: 100,
      sportsFee: 150,
      examFee: 75,
      total: 6025,
      isActive: true
    },
    {
      id: 2,
      grade: 'Grade 9',
      tuitionFee: 5500,
      admissionFee: 500,
      labFee: 250,
      libraryFee: 100,
      sportsFee: 150,
      examFee: 75,
      total: 6575,
      isActive: true
    },
    {
      id: 3,
      grade: 'Grade 10',
      tuitionFee: 6000,
      admissionFee: 500,
      labFee: 300,
      libraryFee: 100,
      sportsFee: 150,
      examFee: 100,
      total: 7150,
      isActive: true
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [newFeeStructure, setNewFeeStructure] = useState({
    grade: '',
    tuitionFee: 0,
    admissionFee: 0,
    labFee: 0,
    libraryFee: 0,
    sportsFee: 0,
    examFee: 0
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    generateOnTermStart: true,
    generateOnEnrollment: true,
    paymentDueDays: 30,
    latePaymentFee: 50,
    enablePartialPayments: true
  });

  const grades = [
    'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const calculateTotal = (fees: typeof newFeeStructure) => {
    return fees.tuitionFee + fees.admissionFee + fees.labFee + 
           fees.libraryFee + fees.sportsFee + fees.examFee;
  };

  const handleAddFeeStructure = () => {
    const feeStructure = {
      id: feeStructures.length + 1,
      ...newFeeStructure,
      total: calculateTotal(newFeeStructure),
      isActive: true
    };

    setFeeStructures([...feeStructures, feeStructure]);
    setNewFeeStructure({
      grade: '',
      tuitionFee: 0,
      admissionFee: 0,
      labFee: 0,
      libraryFee: 0,
      sportsFee: 0,
      examFee: 0
    });
    setShowAddDialog(false);
  };

  const handleSaveSettings = () => {
    console.log('Saving tuition fee settings:', { feeStructures, invoiceSettings });
    // API call would go here
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Tuition Fee Structure</span>
              </CardTitle>
              <CardDescription>
                Set tuition fees by grade level for automatic invoice generation
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Fee Structure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Fee Structure</DialogTitle>
                    <DialogDescription>
                      Set tuition and other fees for a grade level
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select 
                        value={newFeeStructure.grade} 
                        onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tuitionFee">Tuition Fee</Label>
                        <Input
                          id="tuitionFee"
                          type="number"
                          value={newFeeStructure.tuitionFee}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, tuitionFee: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="admissionFee">Admission Fee</Label>
                        <Input
                          id="admissionFee"
                          type="number"
                          value={newFeeStructure.admissionFee}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, admissionFee: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="labFee">Lab Fee</Label>
                        <Input
                          id="labFee"
                          type="number"
                          value={newFeeStructure.labFee}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, labFee: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="libraryFee">Library Fee</Label>
                        <Input
                          id="libraryFee"
                          type="number"
                          value={newFeeStructure.libraryFee}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, libraryFee: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sportsFee">Sports Fee</Label>
                        <Input
                          id="sportsFee"
                          type="number"
                          value={newFeeStructure.sportsFee}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, sportsFee: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="examFee">Exam Fee</Label>
                        <Input
                          id="examFee"
                          type="number"
                          value={newFeeStructure.examFee}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, examFee: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Total: ${calculateTotal(newFeeStructure)}</span>
                    </div>
                    
                    <Button onClick={handleAddFeeStructure} className="w-full">
                      Add Fee Structure
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeStructures.map((fee) => (
              <div key={fee.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{fee.grade}</h3>
                    <p className="text-2xl font-bold text-green-600">${fee.total}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={fee.isActive ? 'default' : 'secondary'}>
                      {fee.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Tuition:</span>
                    <span className="ml-2 font-medium">${fee.tuitionFee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Admission:</span>
                    <span className="ml-2 font-medium">${fee.admissionFee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Lab:</span>
                    <span className="ml-2 font-medium">${fee.labFee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Library:</span>
                    <span className="ml-2 font-medium">${fee.libraryFee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sports:</span>
                    <span className="ml-2 font-medium">${fee.sportsFee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Exam:</span>
                    <span className="ml-2 font-medium">${fee.examFee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Generation Settings</CardTitle>
          <CardDescription>
            Configure when and how invoices are automatically generated
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Generate invoices at term start</Label>
              <p className="text-sm text-gray-500">Automatically create invoices when each term begins</p>
            </div>
            <Switch
              checked={invoiceSettings.generateOnTermStart}
              onCheckedChange={(checked) => setInvoiceSettings({ ...invoiceSettings, generateOnTermStart: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Generate invoices on enrollment</Label>
              <p className="text-sm text-gray-500">Create invoices immediately when students join mid-term</p>
            </div>
            <Switch
              checked={invoiceSettings.generateOnEnrollment}
              onCheckedChange={(checked) => setInvoiceSettings({ ...invoiceSettings, generateOnEnrollment: checked })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentDueDays">Payment Due (Days)</Label>
              <Input
                id="paymentDueDays"
                type="number"
                value={invoiceSettings.paymentDueDays}
                onChange={(e) => setInvoiceSettings({ ...invoiceSettings, paymentDueDays: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="latePaymentFee">Late Payment Fee ($)</Label>
              <Input
                id="latePaymentFee"
                type="number"
                value={invoiceSettings.latePaymentFee}
                onChange={(e) => setInvoiceSettings({ ...invoiceSettings, latePaymentFee: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable partial payments</Label>
              <p className="text-sm text-gray-500">Allow students to pay in installments</p>
            </div>
            <Switch
              checked={invoiceSettings.enablePartialPayments}
              onCheckedChange={(checked) => setInvoiceSettings({ ...invoiceSettings, enablePartialPayments: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TuitionFeeSettings;
