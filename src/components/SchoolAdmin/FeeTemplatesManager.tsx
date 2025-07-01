
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, DollarSign, Edit, Trash2 } from 'lucide-react';

const FeeTemplatesManager = () => {
  const [feeTemplates, setFeeTemplates] = useState([
    {
      id: 1,
      name: 'Tuition Fee',
      amount: 1200,
      frequency: 'Monthly',
      dueDay: 15,
      applicableClasses: ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B'],
      category: 'Academic',
      description: 'Monthly tuition fee for regular classes',
      isActive: true
    },
    {
      id: 2,
      name: 'Laboratory Fee',
      amount: 150,
      frequency: 'Semester',
      dueDay: 1,
      applicableClasses: ['Grade 11A', 'Grade 11B', 'Grade 12A'],
      category: 'Academic',
      description: 'Laboratory usage and maintenance fee',
      isActive: true
    },
    {
      id: 3,
      name: 'Activity Fee',
      amount: 75,
      frequency: 'Annual',
      dueDay: 1,
      applicableClasses: ['Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B'],
      category: 'Extracurricular',
      description: 'Annual sports and activities participation fee',
      isActive: true
    },
    {
      id: 4,
      name: 'Library Fee',
      amount: 50,
      frequency: 'Annual',
      dueDay: 15,
      applicableClasses: ['Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B'],
      category: 'Academic',
      description: 'Annual library access and book maintenance fee',
      isActive: true
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    amount: '',
    frequency: '',
    dueDay: '',
    applicableClasses: [] as string[],
    category: '',
    description: ''
  });

  const availableClasses = [
    'Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B', 'Grade 10A', 
    'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 11C', 'Grade 12A'
  ];

  const frequencies = ['Monthly', 'Quarterly', 'Semester', 'Annual', 'One-time'];
  const categories = ['Academic', 'Extracurricular', 'Transportation', 'Meals', 'Technology', 'Other'];

  const handleAddTemplate = () => {
    const template = {
      id: feeTemplates.length + 1,
      ...newTemplate,
      amount: parseFloat(newTemplate.amount),
      dueDay: parseInt(newTemplate.dueDay),
      isActive: true
    };
    setFeeTemplates([...feeTemplates, template]);
    setNewTemplate({
      name: '',
      amount: '',
      frequency: '',
      dueDay: '',
      applicableClasses: [],
      category: '',
      description: ''
    });
    setShowAddDialog(false);
  };

  const toggleTemplateStatus = (id: number) => {
    setFeeTemplates(feeTemplates.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
  };

  const deleteTemplate = (id: number) => {
    setFeeTemplates(feeTemplates.filter(template => template.id !== id));
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Monthly': return 'bg-blue-100 text-blue-800';
      case 'Quarterly': return 'bg-green-100 text-green-800';
      case 'Semester': return 'bg-purple-100 text-purple-800';
      case 'Annual': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Fee Templates</span>
            </CardTitle>
            <CardDescription>
              Create and manage fee templates for different classes and categories
            </CardDescription>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Fee Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Fee Template</DialogTitle>
                <DialogDescription>
                  Set up a new fee template that can be applied to specific classes
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="templateName">Fee Name</Label>
                    <Input
                      id="templateName"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="Enter fee name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newTemplate.amount}
                      onChange={(e) => setNewTemplate({...newTemplate, amount: e.target.value})}
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={newTemplate.frequency} onValueChange={(value) => setNewTemplate({...newTemplate, frequency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dueDay">Due Day</Label>
                    <Input
                      id="dueDay"
                      type="number"
                      min="1"
                      max="31"
                      value={newTemplate.dueDay}
                      onChange={(e) => setNewTemplate({...newTemplate, dueDay: e.target.value})}
                      placeholder="Day of month"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="applicableClasses">Applicable Classes</Label>
                  <MultiSelect
                    options={availableClasses}
                    selected={newTemplate.applicableClasses}
                    onSelectionChange={(classes) => setNewTemplate({...newTemplate, applicableClasses: classes})}
                    placeholder="Select classes where this fee applies"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    placeholder="Enter fee description"
                    rows={3}
                  />
                </div>

                <Button onClick={handleAddTemplate} className="w-full">
                  Create Fee Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feeTemplates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-lg">{template.name}</h3>
                    <Badge className={getFrequencyColor(template.frequency)}>
                      {template.frequency}
                    </Badge>
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge variant={template.isActive ? 'default' : 'secondary'}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">${template.amount}</p>
                  <p className="text-sm text-gray-500">Due: {template.dueDay}{template.frequency === 'Monthly' ? 'th of month' : ''}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Applicable Classes:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.applicableClasses.map((cls, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleTemplateStatus(template.id)}
                >
                  {template.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => deleteTemplate(template.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button size="sm">
                  Apply to Students
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeTemplatesManager;
