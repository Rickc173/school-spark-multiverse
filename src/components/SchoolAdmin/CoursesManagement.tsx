
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, BookOpen, Trash2, Edit } from 'lucide-react';

const CoursesManagement = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH', department: 'Science', credits: 4, description: 'Advanced mathematics covering algebra, geometry, and calculus' },
    { id: 2, name: 'Physics', code: 'PHYS', department: 'Science', credits: 4, description: 'Fundamental physics principles and laboratory work' },
    { id: 3, name: 'English Literature', code: 'ENG', department: 'Languages', credits: 3, description: 'Study of classic and contemporary literature' },
    { id: 4, name: 'History', code: 'HIST', department: 'Social Studies', credits: 3, description: 'World history and historical analysis' },
    { id: 5, name: 'Computer Science', code: 'CS', department: 'Technology', credits: 4, description: 'Programming and computer fundamentals' }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    department: '',
    credits: '',
    description: ''
  });

  const departments = ['Science', 'Languages', 'Social Studies', 'Technology', 'Arts', 'Physical Education'];

  const handleAddCourse = () => {
    const course = {
      id: courses.length + 1,
      ...newCourse,
      credits: parseInt(newCourse.credits)
    };
    setCourses([...courses, course]);
    setNewCourse({ name: '', code: '', department: '', credits: '', description: '' });
    setShowAddDialog(false);
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Courses & Subjects Management</span>
            </CardTitle>
            <CardDescription>
              Manage all courses and subjects offered by your school
            </CardDescription>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Create a new course or subject for your school
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                      placeholder="Enter course name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseCode">Course Code</Label>
                    <Input
                      id="courseCode"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                      placeholder="Enter course code"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={newCourse.department} onValueChange={(value) => setNewCourse({...newCourse, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({...newCourse, credits: e.target.value})}
                      placeholder="Enter credits"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddCourse} className="w-full">
                  Add Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium">{course.name}</h3>
                  <Badge variant="outline">{course.code}</Badge>
                  <Badge variant="secondary">{course.department}</Badge>
                  <span className="text-sm text-gray-500">{course.credits} credits</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteCourse(course.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesManagement;
