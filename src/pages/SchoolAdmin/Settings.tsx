import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, School, Bell, Users, FileText, BookOpen } from 'lucide-react';
import GradeSystemSettings from '@/components/SchoolAdmin/GradeSystemSettings';
import CoursesManagement from '@/components/SchoolAdmin/CoursesManagement';
import SchoolYearTermsSettings from '@/components/SchoolAdmin/SchoolYearTermsSettings';
import TimetableCreator from '@/components/SchoolAdmin/TimetableCreator';
import FeeTemplatesManager from '@/components/SchoolAdmin/FeeTemplatesManager';

const SchoolAdminSettings = () => {
  const { user } = useAuth();
  
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: 'Greenwood High School',
    address: '123 Education St, City, State 12345',
    phone: '(555) 123-4567',
    email: 'admin@greenwood.edu',
    website: 'www.greenwood.edu',
    principal: 'Dr. Sarah Johnson',
    established: '1995',
    description: 'A premier educational institution dedicated to excellence in learning and character development.'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    parentNotifications: true,
    attendanceAlerts: true,
    feeReminders: true,
    examNotifications: true
  });

  const [systemSettings, setSystemSettings] = useState({
    allowOnlinePayments: true,
    enableParentPortal: true,
    enableStudentPortal: true,
    requireProfilePictures: false,
    enableBiometricAttendance: false,
    backupFrequency: 'daily'
  });

  const handleSaveSchoolSettings = () => {
    console.log('Saving school settings:', schoolSettings);
  };

  const handleSaveNotificationSettings = () => {
    console.log('Saving notification settings:', notificationSettings);
  };

  const handleSaveSystemSettings = () => {
    console.log('Saving system settings:', systemSettings);
  };

  return (
    <ProtectedRoute allowedRoles={['school_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">School Settings</h1>
            <p className="text-gray-600 mt-2">Configure your school's settings and preferences</p>
          </div>

          <Tabs defaultValue="school" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="school">School Info</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="fees">Fee Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="school" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="h-5 w-5" />
                    <span>School Information</span>
                  </CardTitle>
                  <CardDescription>
                    Basic information about your school
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        value={schoolSettings.schoolName}
                        onChange={(e) => setSchoolSettings({...schoolSettings, schoolName: e.target.value})}
                        placeholder="Enter school name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="principal">Principal</Label>
                      <Input
                        id="principal"
                        value={schoolSettings.principal}
                        onChange={(e) => setSchoolSettings({...schoolSettings, principal: e.target.value})}
                        placeholder="Enter principal name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={schoolSettings.address}
                      onChange={(e) => setSchoolSettings({...schoolSettings, address: e.target.value})}
                      placeholder="Enter school address"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={schoolSettings.phone}
                        onChange={(e) => setSchoolSettings({...schoolSettings, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={schoolSettings.email}
                        onChange={(e) => setSchoolSettings({...schoolSettings, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={schoolSettings.website}
                        onChange={(e) => setSchoolSettings({...schoolSettings, website: e.target.value})}
                        placeholder="Enter website URL"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="established">Established Year</Label>
                    <Input
                      id="established"
                      value={schoolSettings.established}
                      onChange={(e) => setSchoolSettings({...schoolSettings, established: e.target.value})}
                      placeholder="Enter establishment year"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={schoolSettings.description}
                      onChange={(e) => setSchoolSettings({...schoolSettings, description: e.target.value})}
                      placeholder="Enter school description"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleSaveSchoolSettings}>
                    Save School Information
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <div className="space-y-6">
                <GradeSystemSettings />
                <CoursesManagement />
                <SchoolYearTermsSettings />
                <TimetableCreator />
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure notification preferences for your school
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Send notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Send notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Parent Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Send notifications to parents
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.parentNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, parentNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Attendance Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Alert parents about attendance issues
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.attendanceAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, attendanceAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Fee Reminders</Label>
                        <p className="text-sm text-gray-500">
                          Send fee payment reminders
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.feeReminders}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, feeReminders: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Exam Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Send exam schedule and result notifications
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.examNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, examNotifications: checked})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveNotificationSettings}>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SettingsIcon className="h-5 w-5" />
                    <span>System Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure system features and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Online Payments</Label>
                        <p className="text-sm text-gray-500">
                          Allow online fee payments
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.allowOnlinePayments}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, allowOnlinePayments: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Parent Portal</Label>
                        <p className="text-sm text-gray-500">
                          Enable parent access portal
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.enableParentPortal}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableParentPortal: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Student Portal</Label>
                        <p className="text-sm text-gray-500">
                          Enable student access portal
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.enableStudentPortal}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableStudentPortal: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Pictures Required</Label>
                        <p className="text-sm text-gray-500">
                          Require profile pictures for all users
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.requireProfilePictures}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, requireProfilePictures: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Biometric Attendance</Label>
                        <p className="text-sm text-gray-500">
                          Enable biometric attendance system
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.enableBiometricAttendance}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableBiometricAttendance: checked})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <select
                      id="backupFrequency"
                      value={systemSettings.backupFrequency}
                      onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <Button onClick={handleSaveSystemSettings}>
                    Save System Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="space-y-4">
              <FeeTemplatesManager />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SchoolAdminSettings;
