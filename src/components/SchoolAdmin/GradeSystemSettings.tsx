
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Settings } from 'lucide-react';

interface GradeSystemSettingsProps {
  onGradesUpdate?: (grades: string[]) => void;
}

const GradeSystemSettings = ({ onGradesUpdate }: GradeSystemSettingsProps) => {
  const [gradeSystem, setGradeSystem] = useState('grade'); // 'grade', 'form', 'year', 'level'
  const [customGrades, setCustomGrades] = useState([
    'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ]);
  const [newGrade, setNewGrade] = useState('');

  const gradeSystemOptions = [
    { value: 'grade', label: 'Grade System (Grade 8, Grade 9, etc.)' },
    { value: 'form', label: 'Form System (Form 1, Form 2, etc.)' },
    { value: 'year', label: 'Year System (Year 8, Year 9, etc.)' },
    { value: 'level', label: 'Level System (Level 1, Level 2, etc.)' },
    { value: 'class', label: 'Class System (Class 8, Class 9, etc.)' },
    { value: 'standard', label: 'Standard System (Std 8, Std 9, etc.)' },
    { value: 'custom', label: 'Custom System' }
  ];

  const predefinedGrades = {
    grade: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    form: ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'],
    year: ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'],
    level: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
    class: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    standard: ['Std 8', 'Std 9', 'Std 10', 'Std 11', 'Std 12'],
    custom: customGrades
  };

  const handleSystemChange = (system: string) => {
    setGradeSystem(system);
    if (system !== 'custom') {
      const newGrades = predefinedGrades[system as keyof typeof predefinedGrades];
      setCustomGrades(newGrades);
      onGradesUpdate?.(newGrades);
    }
  };

  const addGrade = () => {
    if (newGrade.trim() && !customGrades.includes(newGrade.trim())) {
      const updatedGrades = [...customGrades, newGrade.trim()];
      setCustomGrades(updatedGrades);
      setNewGrade('');
      onGradesUpdate?.(updatedGrades);
    }
  };

  const removeGrade = (gradeToRemove: string) => {
    const updatedGrades = customGrades.filter(grade => grade !== gradeToRemove);
    setCustomGrades(updatedGrades);
    onGradesUpdate?.(updatedGrades);
  };

  const saveSettings = () => {
    console.log('Saving grade system settings:', {
      system: gradeSystem,
      grades: customGrades
    });
    // Here you would save to your backend/state management
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Grade System Configuration</span>
        </CardTitle>
        <CardDescription>
          Configure the grading system used in your school
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="gradeSystem">Select Grade System</Label>
          <Select value={gradeSystem} onValueChange={handleSystemChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your school's grade system" />
            </SelectTrigger>
            <SelectContent>
              {gradeSystemOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Current Grades/Levels</Label>
          <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-lg min-h-[60px]">
            {customGrades.map((grade, index) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                <span>{grade}</span>
                {gradeSystem === 'custom' && (
                  <button
                    onClick={() => removeGrade(grade)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </div>

        {gradeSystem === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="newGrade">Add Custom Grade/Level</Label>
            <div className="flex space-x-2">
              <Input
                id="newGrade"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                placeholder="Enter grade name (e.g., Pre-K, Kindergarten, etc.)"
                onKeyPress={(e) => e.key === 'Enter' && addGrade()}
              />
              <Button onClick={addGrade} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-4 border-t">
          <Button onClick={saveSettings}>
            Save Settings
          </Button>
          <Button variant="outline" onClick={() => {
            setGradeSystem('grade');
            setCustomGrades(predefinedGrades.grade);
            onGradesUpdate?.(predefinedGrades.grade);
          }}>
            Reset to Default
          </Button>
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p><strong>Note:</strong> Changing the grade system will affect how classes are displayed throughout the application. Make sure to update existing class assignments accordingly.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeSystemSettings;
