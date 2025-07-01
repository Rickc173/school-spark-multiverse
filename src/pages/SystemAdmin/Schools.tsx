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
import { Plus, Search, Settings, Users } from 'lucide-react';
import SubscriptionManagement from '@/components/SystemAdmin/SubscriptionManagement';

const SystemAdminSchools = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    principal: ''
  });

  // Mock data - replace with actual API calls
  const schools = [
    {
      id: 1,
      name: 'Greenwood High School',
      address: '123 Education St, City, State 12345',
      phone: '(555) 123-4567',
      email: 'admin@greenwood.edu',
      principal: 'Dr. Sarah Johnson',
      students: 847,
      teachers: 52,
      status: 'Active',
      subscription: 'premium',
      expiryDate: '2024-12-31',
      created: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sunrise Elementary',
      address: '456 Learning Ave, City, State 12345',
      phone: '(555) 234-5678',
      email: 'admin@sunrise.edu',
      principal: 'Mr. Michael Brown',
      students: 432,
      teachers: 28,
      status: 'Active',
      subscription: 'demo',
      expiryDate: '2024-02-15',
      created: '2023-03-22'
    },
    {
      id: 3,
      name: 'Mountain View Academy',
      address: '789 Knowledge Blvd, City, State 12345',
      phone: '(555) 345-6789',
      email: 'admin@mountainview.edu',
      principal: 'Ms. Emily Davis',
      students: 623,
      teachers: 41,
      status: 'Pending Setup',
      subscription: 'locked',
      expiryDate: '2023-12-01',
      created: '2023-11-10'
    }
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.principal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSchool = () => {
    console.log('Adding new school:', newSchool);
    setShowAddDialog(false);
    setNewSchool({ name: '', address: '', phone: '', email: '', principal: '' });
  };

  const handleSchoolSettings = (school) => {
    setSelectedSchool(school);
    setShowSubscriptionDialog(true);
  };

  const getSubscriptionBadgeColor = (subscription) => {
    switch (subscription) {
      case 'premium': return 'bg-green-100 text-green-800';
      case 'demo': return 'bg-yellow-100 text-yellow-800';
      case 'locked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['system_admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schools Management</h1>
              <p className="text-gray-600 mt-2">Manage all schools in the system</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add School
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New School</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new school
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">School Name</Label>
                    <Input
                      id="name"
                      value={newSchool.name}
                      onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                      placeholder="Enter school name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newSchool.address}
                      onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
                      placeholder="Enter school address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newSchool.phone}
                      onChange={(e) => setNewSchool({...newSchool, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newSchool.email}
                      onChange={(e) => setNewSchool({...newSchool, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="principal">Principal Name</Label>
                    <Input
                      id="principal"
                      value={newSchool.principal}
                      onChange={(e) => setNewSchool({...newSchool, principal: e.target.value})}
                      placeholder="Enter principal name"
                    />
                  </div>
                  <Button onClick={handleAddSchool} className="w-full">
                    Add School
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredSchools.map((school) => (
              <Card key={school.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{school.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Principal: {school.principal}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={school.status === 'Active' ? 'default' : 'secondary'}>
                        {school.status}
                      </Badge>
                      <Badge className={getSubscriptionBadgeColor(school.subscription)}>
                        {school.subscription.toUpperCase()}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSchoolSettings(school)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{school.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">{school.phone}</p>
                      <p className="text-sm text-gray-600">{school.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {school.students}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teachers</p>
                      <p className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {school.teachers}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Created: {new Date(school.created).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Expires: {new Date(school.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedSchool && (
          <SubscriptionManagement
            school={selectedSchool}
            isOpen={showSubscriptionDialog}
            onClose={() => {
              setShowSubscriptionDialog(false);
              setSelectedSchool(null);
            }}
          />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SystemAdminSchools;
