
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, Bell, Users, FileText } from 'lucide-react';

const SystemAdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    siteName: 'School Management System',
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    dataRetentionDays: 365,
    maxFileSize: 10,
    allowedFileTypes: 'pdf,doc,docx,jpg,png',
    maintenanceMode: false,
    backupFrequency: 'daily'
  });

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would typically make an API call to save settings
  };

  const handleResetSettings = () => {
    console.log('Resetting settings to defaults');
    // Reset to default values
  };

  return (
    <ProtectedRoute allowedRoles={['system_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-2">Configure global system settings and preferences</p>
          </div>

          <div className="grid gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>
                  Basic system configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    placeholder="Enter site name"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow New Registrations</Label>
                    <p className="text-sm text-gray-500">
                      Allow new schools to register themselves
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => setSettings({...settings, allowRegistration: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">
                      Put the system in maintenance mode
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure system-wide notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send system notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send system notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Data Management</span>
                </CardTitle>
                <CardDescription>
                  Configure data retention and file upload settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dataRetention">Data Retention (Days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={(e) => setSettings({...settings, dataRetentionDays: parseInt(e.target.value)})}
                    placeholder="Enter number of days"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    How long to keep deleted records before permanent removal
                  </p>
                </div>
                <div>
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                    placeholder="Enter max file size"
                  />
                </div>
                <div>
                  <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                  <Input
                    id="allowedFileTypes"
                    value={settings.allowedFileTypes}
                    onChange={(e) => setSettings({...settings, allowedFileTypes: e.target.value})}
                    placeholder="Enter allowed file extensions (comma separated)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Backup Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
                <CardDescription>
                  Configure automatic backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select
                    id="backupFrequency"
                    value={settings.backupFrequency}
                    onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <Button variant="outline" className="w-full">
                  Run Manual Backup
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SystemAdminSettings;
