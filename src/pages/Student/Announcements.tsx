
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, AlertCircle, Calendar, Info, Megaphone, Clock } from 'lucide-react';

const StudentAnnouncements = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Winter Break Schedule',
      content: 'Classes will end on December 22nd and resume on January 8th. Please note that the school office will remain closed during this period except for emergencies.',
      category: 'general',
      priority: 'medium',
      date: '2023-12-10',
      time: '09:00 AM',
      author: 'Principal Johnson',
      readStatus: false
    },
    {
      id: 2,
      title: 'Sports Day Registration Open',
      content: 'Annual sports day event registration is now open. Students can sign up for various sports events including track and field, basketball, and swimming. Registration deadline is December 20th.',
      category: 'event',
      priority: 'high',
      date: '2023-12-09',
      time: '02:30 PM',
      author: 'Sports Department',
      readStatus: true
    },
    {
      id: 3,
      title: 'Library Hours Extended',
      content: 'Starting this week, the school library will remain open until 8:00 PM on weekdays to help students with their final exam preparations.',
      category: 'general',
      priority: 'low',
      date: '2023-12-08',
      time: '11:15 AM',
      author: 'Library Staff',
      readStatus: true
    },
    {
      id: 4,
      title: 'Final Exam Schedule Released',
      content: 'The final examination schedule has been posted on the school website. Please check your exam dates and times. Contact the administration office for any clarifications.',
      category: 'academic',
      priority: 'high',
      date: '2023-12-07',
      time: '03:45 PM',
      author: 'Academic Office',
      readStatus: false
    },
    {
      id: 5,
      title: 'Science Fair Winners Announced',
      content: 'Congratulations to all participants in this year\'s science fair. Winners will be recognized at the morning assembly on December 15th.',
      category: 'academic',
      priority: 'medium',
      date: '2023-12-06',
      time: '10:20 AM',
      author: 'Science Department',
      readStatus: true
    },
    {
      id: 6,
      title: 'Cafeteria Menu Update',
      content: 'New healthy meal options have been added to the cafeteria menu starting next week. Check out the nutritious choices available for lunch.',
      category: 'general',
      priority: 'low',
      date: '2023-12-05',
      time: '12:00 PM',
      author: 'Cafeteria Management',
      readStatus: true
    }
  ];

  const categories = ['all', 'general', 'academic', 'event'];

  const filteredAnnouncements = announcements.filter(announcement => 
    selectedCategory === 'all' || announcement.category === selectedCategory
  );

  const unreadCount = announcements.filter(a => !a.readStatus).length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'text-blue-600 bg-blue-50';
      case 'event': return 'text-purple-600 bg-purple-50';
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
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="text-gray-600 mt-2">Stay updated with school news and important information</p>
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

          <div className="flex items-center space-x-4">
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
                      Posted {new Date(announcement.date).toLocaleDateString()}
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
                <p className="text-gray-600">No announcements match your current filter</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default StudentAnnouncements;
