
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
import { Plus, Search, Bell, Calendar, Users } from 'lucide-react';

const SchoolAdminAnnouncements = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: '',
    targetAudience: '',
    priority: 'normal'
  });

  // Mock data - replace with actual API calls
  const announcements = [
    {
      id: 1,
      title: 'Annual Sports Day - December 20, 2023',
      content: 'We are excited to announce our Annual Sports Day on December 20, 2023. All students are encouraged to participate in various sporting events. Registration forms are available at the school office.',
      type: 'event',
      targetAudience: 'all',
      priority: 'high',
      author: 'Principal Johnson',
      createdAt: '2023-12-05T10:00:00Z',
      status: 'published',
      views: 245,
      likes: 18
    },
    {
      id: 2,
      title: 'Winter Break Schedule',
      content: 'The school will be closed for winter break from December 25, 2023, to January 8, 2024. Classes will resume on January 9, 2024. We wish all students and families a happy holiday season.',
      type: 'general',
      targetAudience: 'all',
      priority: 'normal',
      author: 'Admin Office',
      createdAt: '2023-12-01T14:30:00Z',
      status: 'published',
      views: 198,
      likes: 24
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting - December 15',
      content: 'Parent-Teacher meetings are scheduled for December 15, 2023, from 9:00 AM to 4:00 PM. Please book your time slots through the school portal or contact the office.',
      type: 'general',
      targetAudience: 'parents',
      priority: 'high',
      author: 'Academic Office',
      createdAt: '2023-11-28T09:15:00Z',
      status: 'published',
      views: 167,
      likes: 12
    },
    {
      id: 4,
      title: 'New Library Books Available',
      content: 'Our library has received a shipment of new books covering various subjects. Students can check out these books starting Monday. A complete list is available at the library desk.',
      type: 'general',
      targetAudience: 'students',
      priority: 'normal',
      author: 'Library Staff',
      createdAt: '2023-11-25T11:45:00Z',
      status: 'published',
      views: 89,
      likes: 7
    },
    {
      id: 5,
      title: 'Science Fair Registration Open',
      content: 'Registration for the Annual Science Fair is now open. Students from grades 6-12 can participate. Registration deadline is January 15, 2024. Contact the science department for more details.',
      type: 'event',
      targetAudience: 'students',
      priority: 'normal',
      author: 'Science Department',
      createdAt: '2023-11-20T16:20:00Z',
      status: 'draft',
      views: 0,
      likes: 0
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddAnnouncement = () => {
    console.log('Adding new announcement:', newAnnouncement);
    setShowAddDialog(false);
    setNewAnnouncement({ title: '', content: '', type: '', targetAudience: '', priority: 'normal' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="text-gray-600 mt-2">Create and manage school announcements</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
                    Create a new announcement for your school community
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
                      <Label htmlFor="type">Type</Label>
                      <Select value={newAnnouncement.type} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
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
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select value={newAnnouncement.targetAudience} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, targetAudience: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="teachers">Teachers</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddAnnouncement} className="flex-1">
                      Publish Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(announcement.type)}>
                          {announcement.type}
                        </Badge>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(announcement.status)}>
                          {announcement.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        By {announcement.author} • {new Date(announcement.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{announcement.content}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>Audience: {announcement.targetAudience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bell className="h-4 w-4" />
                        <span>{announcement.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{announcement.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {announcement.status === 'draft' && (
                        <Button size="sm">
                          Publish
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Analytics
                      </Button>
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

export default SchoolAdminAnnouncements;
