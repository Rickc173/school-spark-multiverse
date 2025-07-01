
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Clock, Trash2 } from 'lucide-react';

const SchoolYearTermsSettings = () => {
  const [schoolYears, setSchoolYears] = useState([
    { 
      id: 1, 
      name: '2023-2024', 
      startDate: '2023-08-15', 
      endDate: '2024-06-30', 
      status: 'Current',
      terms: [
        { id: 1, name: 'Fall Semester', startDate: '2023-08-15', endDate: '2023-12-20', type: 'Semester' },
        { id: 2, name: 'Spring Semester', startDate: '2024-01-08', endDate: '2024-06-30', type: 'Semester' }
      ]
    },
    { 
      id: 2, 
      name: '2024-2025', 
      startDate: '2024-08-15', 
      endDate: '2025-06-30', 
      status: 'Upcoming',
      terms: []
    }
  ]);

  const [showYearDialog, setShowYearDialog] = useState(false);
  const [showTermDialog, setShowTermDialog] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [newYear, setNewYear] = useState({
    name: '',
    startDate: '',
    endDate: '',
    template: ''
  });
  const [newTerm, setNewTerm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    type: ''
  });

  const yearTemplates = [
    { value: 'traditional', label: 'Traditional (2 Semesters)', terms: ['Fall Semester', 'Spring Semester'] },
    { value: 'trimester', label: 'Trimester (3 Terms)', terms: ['Fall Term', 'Winter Term', 'Spring Term'] },
    { value: 'quarter', label: 'Quarter System (4 Quarters)', terms: ['Fall Quarter', 'Winter Quarter', 'Spring Quarter', 'Summer Quarter'] },
    { value: 'custom', label: 'Custom Structure', terms: [] }
  ];

  const termTypes = ['Semester', 'Quarter', 'Term', 'Session'];

  const handleAddYear = () => {
    const template = yearTemplates.find(t => t.value === newYear.template);
    const year = {
      id: schoolYears.length + 1,
      ...newYear,
      status: 'Upcoming',
      terms: template?.terms.map((termName, index) => ({
        id: index + 1,
        name: termName,
        startDate: '',
        endDate: '',
        type: template.value === 'quarter' ? 'Quarter' : template.value === 'trimester' ? 'Term' : 'Semester'
      })) || []
    };
    setSchoolYears([...schoolYears, year]);
    setNewYear({ name: '', startDate: '', endDate: '', template: '' });
    setShowYearDialog(false);
  };

  const handleAddTerm = () => {
    if (selectedYear) {
      const updatedYears = schoolYears.map(year => {
        if (year.id === selectedYear.id) {
          return {
            ...year,
            terms: [...year.terms, { id: year.terms.length + 1, ...newTerm }]
          };
        }
        return year;
      });
      setSchoolYears(updatedYears);
      setNewTerm({ name: '', startDate: '', endDate: '', type: '' });
      setShowTermDialog(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>School Years & Terms</span>
            </CardTitle>
            <CardDescription>
              Define academic years and term structures
            </CardDescription>
          </div>
          <Dialog open={showYearDialog} onOpenChange={setShowYearDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add School Year
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New School Year</DialogTitle>
                <DialogDescription>
                  Create a new academic year with term structure
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="yearName">School Year Name</Label>
                  <Input
                    id="yearName"
                    value={newYear.name}
                    onChange={(e) => setNewYear({...newYear, name: e.target.value})}
                    placeholder="e.g., 2024-2025"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newYear.startDate}
                      onChange={(e) => setNewYear({...newYear, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newYear.endDate}
                      onChange={(e) => setNewYear({...newYear, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="template">Term Structure Template</Label>
                  <Select value={newYear.template} onValueChange={(value) => setNewYear({...newYear, template: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearTemplates.map((template) => (
                        <SelectItem key={template.value} value={template.value}>
                          {template.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddYear} className="w-full">
                  Create School Year
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {schoolYears.map((year) => (
            <div key={year.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">{year.name}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(year.startDate).toLocaleDateString()} - {new Date(year.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={year.status === 'Current' ? 'default' : 'secondary'}>
                    {year.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedYear(year);
                      setShowTermDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Term
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Terms/Semesters:</h4>
                {year.terms.length > 0 ? (
                  <div className="grid gap-2">
                    {year.terms.map((term) => (
                      <div key={term.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{term.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({term.type})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {term.startDate ? new Date(term.startDate).toLocaleDateString() : 'Not set'} - 
                            {term.endDate ? new Date(term.endDate).toLocaleDateString() : 'Not set'}
                          </span>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No terms defined yet</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Dialog open={showTermDialog} onOpenChange={setShowTermDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Term</DialogTitle>
              <DialogDescription>
                Add a new term to {selectedYear?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="termName">Term Name</Label>
                <Input
                  id="termName"
                  value={newTerm.name}
                  onChange={(e) => setNewTerm({...newTerm, name: e.target.value})}
                  placeholder="e.g., Fall Semester"
                />
              </div>
              <div>
                <Label htmlFor="termType">Term Type</Label>
                <Select value={newTerm.type} onValueChange={(value) => setNewTerm({...newTerm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term type" />
                  </SelectTrigger>
                  <SelectContent>
                    {termTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="termStartDate">Start Date</Label>
                  <Input
                    id="termStartDate"
                    type="date"
                    value={newTerm.startDate}
                    onChange={(e) => setNewTerm({...newTerm, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="termEndDate">End Date</Label>
                  <Input
                    id="termEndDate"
                    type="date"
                    value={newTerm.endDate}
                    onChange={(e) => setNewTerm({...newTerm, endDate: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleAddTerm} className="w-full">
                Add Term
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SchoolYearTermsSettings;
