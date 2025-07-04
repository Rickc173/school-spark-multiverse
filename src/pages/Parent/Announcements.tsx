
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, AlertCircle, Calendar, Info, Megaphone, Clock, Users } from 'lucide-react';

const ParentAnnouncements = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChild, setSelectedChild] = useState('all');

  const children = [
    { id: '1', name: 'Mike Wilson', grade: 'Grade 8A' },
    { id: '2', name: 'Emma Wilson', grade: 'Grade 5B' }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-teacher conferences for the fall semester will be held from December 18-22. Please schedule your appointments through the school portal or contact the main office.',
      category: 'academic',
      priority: 'high',
      targetGrade: 'all',
      date: '2023-12-10',
      time: '09:00 AM',
      author: 'Principal Johnson',
      readStatus: false,
      childSpecific: false
    },
    {
      id: 2,
      title: 'Winter Break Holiday Schedule',
      content: 'School will be closed from December 25th to January 7th for winter break. Classes will resume on Monday, January 8th. The school office will be closed during this period.',
      category: 'general',
      priority: 'medium',
      targetGrade: 'all',
      date: '2023-12-09',
      time: '02:30 PM',
      author: 'Administration',
      readStatus: true,
      childSpecific: false
    },
    {
      id: 3,
      title: 'Grade 8 Science Fair Project Due',
      content: 'Science fair projects for Grade 8 students are due on December 20th. Please ensure your child has completed their project and prepared their presentation materials.',
      category: 'academic',
      priority: 'high',
      targetGrade: 'Grade 8A',
      date: '2023-12-08',
      time: '11:15 AM',
      author: 'Science Department',
      readStatus: false,
      childSpecific: true,
      childName: 'Mike Wilson'
    },
    {
      id: 4,
      title: 'School Lunch Menu Changes',
      content: 'New healthy lunch options will be available starting next week. Please review the updated menu on our website and update any dietary restrictions in your child\'s profile.',
      category: 'general',
      priority: 'low',
      targetGrade: 'all',
      date: '2023-12-07',
      time: '03:45 PM',
      author: 'Cafeteria Management',
      readStatus: true,
      childSpecific: false
    },
    {
      id: 5,
      title: 'Grade 5 Art Exhibition',
      content: 'Grade 5 students will showcase their artwork in the school gallery from December 15-22. Parents are invited to view their children\'s creative works during school hours.',
      category: 'event',
      priority: 'medium',
      targetGrade: 'Grade 5B',
      date: '2023-12-06',
      time: '10:20 AM',
      author: 'Art Department',
      readStatus: true,
      childSpecific: true,
      childName: 'Emma Wilson'
    },
    {
      id: 6,
      title: 'Transportation Schedule Update',
      content: 'Bus route timings will be adjusted starting December 15th due to winter weather conditions. Please check the updated schedule on the school website.',
      category: 'general',
      priority: 'medium',
      targetGrade: 'all',
      date: '2023-12-05',
      time: '12:00 PM',
      author: 'Transportation Department',
      readStatus: false,
      childSpecific: false
    },
    {
      id: 7,
      title: 'Fee Payment Reminder',
      content: 'Monthly tuition fees for December are due by December 15th. Please ensure timely payment to avoid late fees. Online payment options are available.',
      category: 'financial',
      priority: 'high',
      targetGrade: 'all',
      date: '2023-12-04',
      time: '09:30 AM',
      author: 'Finance Office',
      readStatus: true,
      childSpecific: false
    }
  ];

  const categories = ['all', 'general', 'academic', 'event', 'financial'];

  let filteredAnnouncements = announcements.filter(announcement => {
    const categoryMatch = selectedCategory === 'all' || announcement.category === selectedCategory;
    
    let childMatch = true;
    if (selectedChild !== 'all') {
      const child = children.find(c => c.id === selectedChild);
      if (child) {
        childMatch = !announcement.childSpecific || 
                    announcement.childName === child.name ||
                    announcement.targetGrade === child.grade ||
                    announcement.targetGrade === 'all';
      }
    }
    
    return categoryMatch && childMatch;
  });

  const unreadCount = filteredAnnouncements.filter(a => !a.readStatus).length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'text-blue-600 bg-blue-50';
      case 'event': return 'text-purple-600 bg-purple-50';
      case 'financial': return 'text-orange-600 bg-orange-50';
      case 'general': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <Calendar className="h-4 w-4" />;
      case 'event': return <Megaphone className="h-4 w-4" />;
      case 'financial': return <AlertCircle className="h-4 w-4" />;
      case 'general': return <Info className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: number) => {
    console.log('Marking announcement as read:', id);
  };

  const markAllAsRead = () => {
    console.log('Marking all announcements as read');
  };

  return (
    <ProtectedRoute allowedRoles={['parent']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">School Announcements</h1>
              <p className="text-gray-600 mt-2">Stay updated with important school news and information</p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center space-x-4">
                <Badge variant="destructive">
                  {unreadCount} unread
                </Badge>
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by child" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className={`${!announcement.readStatus ? 'border-blue-200 bg-blue-50/30' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        {getCategoryIcon(announcement.category)}
                        <span>{announcement.title}</span>
                        {!announcement.readStatus && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                        {announcement.childSpecific && (
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {announcement.childName || announcement.targetGrade}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{announcement.date} at {announcement.time}</span>
                        </span>
                        <span>By {announcement.author}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(announcement.category)}>
                        {announcement.category}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{announcement.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {announcement.targetGrade !== 'all' && (
                        <span className="inline-flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>For: {announcement.targetGrade}</span>
                        </span>
                      )}
                    </div>
                    {!announcement.readStatus && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(announcement.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
                <p className="text-gray-600">No announcements match your current filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ParentAnnouncements;
