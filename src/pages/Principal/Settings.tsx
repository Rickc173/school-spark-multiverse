
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, School, Bell, Shield, Calendar, Users } from 'lucide-react';

const PrincipalSettings = () => {
  const { user } = useAuth();
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: 'Greenwood High School',
    address: '123 Education Street, Academic City, AC 12345',
    phone: '(555) 123-4567',
    email: 'info@greenwood.edu',
    website: 'www.greenwood.edu',
    motto: 'Excellence in Education'
  });

  const [academicSettings, setAcademicSettings] = useState({
    currentYear: '2024-2025',
    termSystem: 'semester',
    gradingScale: 'percentage',
    passingGrade: '60',
    maxClassSize: '35'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    parentNotifications: true,
    teacherNotifications: true,
    attendanceAlerts: true,
    gradeAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireApproval: true,
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordPolicy: 'strong'
  });

  const handleSaveSchoolSettings = () => {
    console.log('Saving school settings:', schoolSettings);
  };

  const handleSaveAcademicSettings = () => {
    console.log('Saving academic settings:', academicSettings);
  };

  const handleSaveNotificationSettings = () => {
    console.log('Saving notification settings:', notificationSettings);
  };

  const handleSaveSecuritySettings = () => {
    console.log('Saving security settings:', securitySettings);
  };

  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Principal Settings</h1>
            <p className="text-gray-600 mt-2">Configure school settings and preferences</p>
          </div>

          <Tabs defaultValue="school" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="school" className="flex items-center space-x-2">
                <School className="h-4 w-4" />
                <span>School</span>
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Academic</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="school" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    Update basic school information and contact details
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="motto">School Motto</Label>
                      <Input
                        id="motto"
                        value={schoolSettings.motto}
                        onChange={(e) => setSchoolSettings({...schoolSettings, motto: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={schoolSettings.address}
                      onChange={(e) => setSchoolSettings({...schoolSettings, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={schoolSettings.phone}
                        onChange={(e) => setSchoolSettings({...schoolSettings, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={schoolSettings.email}
                        onChange={(e) => setSchoolSettings({...schoolSettings, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={schoolSettings.website}
                        onChange={(e) => setSchoolSettings({...schoolSettings, website: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveSchoolSettings}>Save School Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Configuration</CardTitle>
                  <CardDescription>
                    Configure academic year, grading system, and class settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentYear">Current Academic Year</Label>
                      <Input
                        id="currentYear"
                        value={academicSettings.currentYear}
                        onChange={(e) => setAcademicSettings({...academicSettings, currentYear: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="termSystem">Term System</Label>
                      <Select value={academicSettings.termSystem} onValueChange={(value) => setAcademicSettings({...academicSettings, termSystem: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="semester">Semester</SelectItem>
                          <SelectItem value="trimester">Trimester</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="gradingScale">Grading Scale</Label>
                      <Select value={academicSettings.gradingScale} onValueChange={(value) => setAcademicSettings({...academicSettings, gradingScale: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="gpa">GPA</SelectItem>
                          <SelectItem value="letter">Letter Grades</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="passingGrade">Passing Grade</Label>
                      <Input
                        id="passingGrade"
                        value={academicSettings.passingGrade}
                        onChange={(e) => setAcademicSettings({...academicSettings, passingGrade: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxClassSize">Max Class Size</Label>
                      <Input
                        id="maxClassSize"
                        type="number"
                        value={academicSettings.maxClassSize}
                        onChange={(e) => setAcademicSettings({...academicSettings, maxClassSize: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveAcademicSettings}>Save Academic Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure notification settings for different events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="parentNotifications">Parent Notifications</Label>
                        <p className="text-sm text-gray-500">Send notifications to parents</p>
                      </div>
                      <Switch
                        id="parentNotifications"
                        checked={notificationSettings.parentNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, parentNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="teacherNotifications">Teacher Notifications</Label>
                        <p className="text-sm text-gray-500">Send notifications to teachers</p>
                      </div>
                      <Switch
                        id="teacherNotifications"
                        checked={notificationSettings.teacherNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, teacherNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="attendanceAlerts">Attendance Alerts</Label>
                        <p className="text-sm text-gray-500">Alert for low attendance</p>
                      </div>
                      <Switch
                        id="attendanceAlerts"
                        checked={notificationSettings.attendanceAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, attendanceAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="gradeAlerts">Grade Alerts</Label>
                        <p className="text-sm text-gray-500">Alert for grade updates</p>
                      </div>
                      <Switch
                        id="gradeAlerts"
                        checked={notificationSettings.gradeAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, gradeAlerts: checked})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveNotificationSettings}>Save Notification Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security and access control settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireApproval">Require Principal Approval</Label>
                        <p className="text-sm text-gray-500">Require approval for sensitive operations</p>
                      </div>
                      <Switch
                        id="requireApproval"
                        checked={securitySettings.requireApproval}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireApproval: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Enable 2FA for enhanced security</p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordPolicy">Password Policy</Label>
                      <Select value={securitySettings.passwordPolicy} onValueChange={(value) => setSecuritySettings({...securitySettings, passwordPolicy: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="strong">Strong</SelectItem>
                          <SelectItem value="very-strong">Very Strong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PrincipalSettings;
