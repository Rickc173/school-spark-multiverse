
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

interface School {
  id: number;
  name: string;
  subscription: 'demo' | 'premium' | 'locked';
  expiryDate: string;
  studentsCount: number;
}

interface SubscriptionManagementProps {
  school: School;
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionManagement = ({ school, isOpen, onClose }: SubscriptionManagementProps) => {
  const [newSubscription, setNewSubscription] = useState(school.subscription);

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'premium': return 'bg-green-100 text-green-800';
      case 'demo': return 'bg-yellow-100 text-yellow-800';
      case 'locked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionIcon = (subscription: string) => {
    switch (subscription) {
      case 'premium': return <CheckCircle className="h-4 w-4" />;
      case 'demo': return <Calendar className="h-4 w-4" />;
      case 'locked': return <AlertCircle className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleUpdateSubscription = () => {
    console.log('Updating subscription for school:', school.id, 'to:', newSubscription);
    // Here you would make an API call to update the subscription
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Subscription - {school.name}</DialogTitle>
          <DialogDescription>
            Update subscription status and manage school access
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Current Status</Label>
            <div className="flex items-center space-x-2">
              <Badge className={getSubscriptionColor(school.subscription)}>
                <div className="flex items-center space-x-1">
                  {getSubscriptionIcon(school.subscription)}
                  <span className="capitalize">{school.subscription}</span>
                </div>
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label>School Information</Label>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">
              <p className="text-sm"><strong>Students:</strong> {school.studentsCount}</p>
              <p className="text-sm"><strong>Expires:</strong> {new Date(school.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subscription">Update Subscription</Label>
            <Select value={newSubscription} onValueChange={setNewSubscription}>
              <SelectTrigger>
                <SelectValue placeholder="Select subscription type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span>Demo (30 days trial)</span>
                  </div>
                </SelectItem>
                <SelectItem value="premium">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Premium (Full access)</span>
                  </div>
                </SelectItem>
                <SelectItem value="locked">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Locked (No access)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleUpdateSubscription} className="flex-1">
              Update Subscription
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionManagement;
