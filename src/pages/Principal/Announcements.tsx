
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Bell, Calendar, Users, AlertCircle, Eye } from 'lucide-react';

const PrincipalAnnouncements = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: '',
    priority: '',
    audience: '',
    publishDate: ''
  });

  const announcements = [
    {
      id: 1,
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-teacher conferences will be held on March 15-16, 2024. Please schedule your appointments through the school portal.',
      category: 'Academic',
      priority: 'High',
      audience: 'Parents & Teachers',
      publishDate: '2024-01-15',
      status: 'Published',
      views: 245,
      author: 'Dr. Margaret Williams'
    },
    {
      id: 2,
      title: 'New Library Hours',
      content: 'Starting February 1st, the library will be open from 7:00 AM to 6:00 PM on weekdays and 9:00 AM to 3:00 PM on Saturdays.',
      category: 'General',
      priority: 'Medium',
      audience: 'All Students',
      publishDate: '2024-01-12',
      status: 'Published',
      views: 189,
      author: 'Dr. Margaret Williams'
    },
    {
      id: 3,
      title: 'Spring Semester Exam Schedule',
      content: 'Final examinations for the spring semester will begin on May 6th, 2024. Detailed schedules will be distributed next week.',
      category: 'Academic',
      priority: 'High',
      audience: 'Students & Teachers',
      publishDate: '2024-01-10',
      status: 'Draft',
      views: 0,
      author: 'Dr. Margaret Williams'
    },
    {
      id: 4,
      title: 'School Maintenance Notice',
      content: 'The main building will undergo maintenance during winter break. All activities will be moved to the auxiliary building.',
      category: 'Maintenance',
      priority: 'Medium',
      audience: 'All',
      publishDate: '2024-01-08',
      status: 'Published',
      views: 156,
      author: 'Dr. Margaret Williams'
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || announcement.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateAnnouncement = () => {
    console.log('Creating new announcement:', newAnnouncement);
    setShowCreateDialog(false);
    setNewAnnouncement({ title: '', content: '', category: '', priority: '', audience: '', publishDate: '' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="text-gray-600 mt-2">Create and manage school announcements</p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Create a new announcement for the school community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                      placeholder="Enter announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      placeholder="Enter announcement content"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newAnnouncement.category} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="audience">Audience</Label>
                      <Select value={newAnnouncement.audience} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, audience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="students">Students Only</SelectItem>
                          <SelectItem value="teachers">Teachers Only</SelectItem>
                          <SelectItem value="parents">Parents Only</SelectItem>
                          <SelectItem value="staff">Staff Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="publishDate">Publish Date</Label>
                      <Input
                        id="publishDate"
                        type="date"
                        value={newAnnouncement.publishDate}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, publishDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateAnnouncement} className="flex-1">
                      Publish Now
                    </Button>
                    <Button variant="outline" onClick={handleCreateAnnouncement} className="flex-1">
                      Save as Draft
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Announcements</p>
                    <p className="text-2xl font-bold">127</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold">2,845</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority}
                        </Badge>
                        <Badge className={getStatusColor(announcement.status)}>
                          {announcement.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{announcement.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>Audience: {announcement.audience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Published: {new Date(announcement.publishDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{announcement.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                      {announcement.status === 'Draft' && (
                        <Button size="sm">Publish</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PrincipalAnnouncements;
