
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { School, Users, Calendar, Bell, Settings, Save } from 'lucide-react';
import SchoolYearTermsSettings from '@/components/SchoolAdmin/SchoolYearTermsSettings';
import GradeSystemSettings from '@/components/SchoolAdmin/GradeSystemSettings';

const SchoolAdminSettings = () => {
  const { user } = useAuth();
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Springfield High School',
    address: '123 Education Street, Springfield, ST 12345',
    phone: '(555) 123-4567',
    email: 'admin@springfieldhigh.edu',
    website: 'www.springfieldhigh.edu',
    description: 'A premier educational institution dedicated to excellence in learning and character development.'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    parentUpdates: true,
    teacherAlerts: true,
    systemMaintenance: false
  });

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // API call would go here
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">School Settings</h1>
              <p className="text-gray-600 mt-2">Manage your school's configuration and preferences</p>
            </div>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="academic">Academic Year</TabsTrigger>
              <TabsTrigger value="grading">Grading System</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="h-5 w-5" />
                    <span>School Information</span>
                  </CardTitle>
                  <CardDescription>Basic information about your school</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        value={schoolInfo.name}
                        onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={schoolInfo.email}
                        onChange={(e) => setSchoolInfo({...schoolInfo, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={schoolInfo.phone}
                        onChange={(e) => setSchoolInfo({...schoolInfo, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={schoolInfo.website}
                        onChange={(e) => setSchoolInfo({...schoolInfo, website: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={schoolInfo.address}
                      onChange={(e) => setSchoolInfo({...schoolInfo, address: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={schoolInfo.description}
                      onChange={(e) => setSchoolInfo({...schoolInfo, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <SchoolYearTermsSettings />
            </TabsContent>

            <TabsContent value="grading" className="space-y-4">
              <GradeSystemSettings />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>Configure notification settings for your school</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive SMS alerts for urgent matters</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Parent Updates</Label>
                      <p className="text-sm text-gray-500">Send automatic updates to parents</p>
                    </div>
                    <Switch
                      checked={notifications.parentUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, parentUpdates: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Teacher Alerts</Label>
                      <p className="text-sm text-gray-500">Notify teachers of important changes</p>
                    </div>
                    <Switch
                      checked={notifications.teacherAlerts}
                      onCheckedChange={(checked) => setNotifications({...notifications, teacherAlerts: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-gray-500">Notifications about system updates and maintenance</p>
                    </div>
                    <Switch
                      checked={notifications.systemMaintenance}
                      onCheckedChange={(checked) => setNotifications({...notifications, systemMaintenance: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SchoolAdminSettings;
