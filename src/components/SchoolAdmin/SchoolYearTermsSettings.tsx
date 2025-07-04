import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import AddTermDialog from '@/components/SchoolAdmin/AddTermDialog';

const SchoolYearTermsSettings = () => {
  const [academicYears, setAcademicYears] = useState([
    {
      id: 1,
      year: '2024',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
      terms: [
        { id: 1, name: 'Term 1', startDate: '2024-01-01', endDate: '2024-04-30' },
        { id: 2, name: 'Term 2', startDate: '2024-05-01', endDate: '2024-08-31' },
        { id: 3, name: 'Term 3', startDate: '2024-09-01', endDate: '2024-12-31' }
      ]
    },
    {
      id: 2,
      year: '2023-2024',
      startDate: '2023-09-01',
      endDate: '2024-06-30',
      isActive: false,
      terms: [
        { id: 1, name: 'Fall Semester', startDate: '2023-09-01', endDate: '2023-12-15' },
        { id: 2, name: 'Spring Semester', startDate: '2024-01-15', endDate: '2024-06-30' }
      ]
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAddTermDialog, setShowAddTermDialog] = useState(false);
  const [selectedYearForTerm, setSelectedYearForTerm] = useState(null);
  const [newYear, setNewYear] = useState({
    year: '',
    startDate: '',
    endDate: '',
    yearFormat: 'single',
    terms: []
  });

  const handleAddYear = () => {
    const year = {
      id: academicYears.length + 1,
      year: newYear.year,
      startDate: newYear.startDate,
      endDate: newYear.endDate,
      isActive: false,
      terms: []
    };
    setAcademicYears([...academicYears, year]);
    setNewYear({ year: '', startDate: '', endDate: '', yearFormat: 'single', terms: [] });
    setShowAddDialog(false);
  };

  const toggleYearActive = (id: number) => {
    setAcademicYears(academicYears.map(year => ({
      ...year,
      isActive: year.id === id ? !year.isActive : false // Only one year can be active
    })));
  };

  const deleteYear = (id: number) => {
    setAcademicYears(academicYears.filter(year => year.id !== id));
  };

  const generateYearFromFormat = () => {
    if (!newYear.startDate || !newYear.endDate) return '';
    
    const startYear = new Date(newYear.startDate).getFullYear();
    const endYear = new Date(newYear.endDate).getFullYear();
    
    if (newYear.yearFormat === 'single' || startYear === endYear) {
      return startYear.toString();
    } else {
      return `${startYear}-${endYear}`;
    }
  };

  const handleAddTerm = (yearId: number) => {
    setSelectedYearForTerm(yearId);
    setShowAddTermDialog(true);
  };

  const handleTermAdded = (term: any) => {
    setAcademicYears(academicYears.map(year => {
      if (year.id === selectedYearForTerm) {
        return {
          ...year,
          terms: [...year.terms, term]
        };
      }
      return year;
    }));
    setShowAddTermDialog(false);
    setSelectedYearForTerm(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Academic Years & Terms</span>
            </CardTitle>
            <CardDescription>
              Manage academic years and their terms/semesters. Years can be single (2025) or range (2024-2025).
            </CardDescription>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Academic Year
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Academic Year</DialogTitle>
                <DialogDescription>
                  Create a new academic year with its duration and format
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="yearFormat">Year Format</Label>
                  <Select value={newYear.yearFormat} onValueChange={(value) => setNewYear({...newYear, yearFormat: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Year (e.g., 2025)</SelectItem>
                      <SelectItem value="range">Year Range (e.g., 2024-2025)</SelectItem>
                    </SelectContent>
                  </Select>
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

                {newYear.startDate && newYear.endDate && (
                  <div>
                    <Label>Generated Year Label</Label>
                    <Input 
                      value={generateYearFromFormat()} 
                      readOnly 
                      className="bg-gray-50"
                      onChange={(e) => setNewYear({...newYear, year: e.target.value})}
                    />
                  </div>
                )}

                <Button 
                  onClick={handleAddYear} 
                  className="w-full"
                  disabled={!newYear.startDate || !newYear.endDate}
                >
                  Add Academic Year
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {academicYears.map((year) => (
            <div key={year.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-lg">{year.year}</h3>
                    <Badge variant={year.isActive ? 'default' : 'secondary'}>
                      {year.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(year.startDate).toLocaleDateString()} - {new Date(year.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleYearActive(year.id)}
                  >
                    {year.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteYear(year.id)}
                    disabled={year.isActive}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Terms/Semesters</h4>
                {year.terms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {year.terms.map((term, index) => (
                      <div key={index} className="border rounded p-2">
                        <p className="font-medium text-sm">{term.name}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(term.startDate).toLocaleDateString()} - {new Date(term.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    No terms defined yet
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleAddTerm(year.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Term
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <AddTermDialog
        isOpen={showAddTermDialog}
        onClose={() => setShowAddTermDialog(false)}
        academicYearId={selectedYearForTerm}
        onTermAdded={handleTermAdded}
      />
    </Card>
  );
};

export default SchoolYearTermsSettings;
