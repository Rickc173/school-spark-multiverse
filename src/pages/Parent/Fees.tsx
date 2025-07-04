
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Download, Eye, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';

const ParentFees = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState('all');

  const children = [
    { id: '1', name: 'Mike Wilson', grade: 'Grade 8A' },
    { id: '2', name: 'Emma Wilson', grade: 'Grade 5B' }
  ];

  const feeData = [
    {
      childId: '1',
      childName: 'Mike Wilson',
      invoices: [
        {
          id: 'INV-2023-001',
          description: 'December 2023 Tuition',
          amount: 340,
          dueDate: '2023-12-15',
          status: 'overdue',
          issueDate: '2023-11-15'
        },
        {
          id: 'INV-2023-002',
          description: 'January 2024 Tuition',
          amount: 340,
          dueDate: '2024-01-15',
          status: 'pending',
          issueDate: '2023-12-15'
        }
      ],
      payments: [
        {
          id: 'PAY-2023-001',
          description: 'November 2023 Tuition',
          amount: 340,
          date: '2023-11-10',
          method: 'Credit Card',
          status: 'completed'
        },
        {
          id: 'PAY-2023-002',
          description: 'October 2023 Tuition',
          amount: 340,
          date: '2023-10-08',
          method: 'Bank Transfer',
          status: 'completed'
        }
      ]
    },
    {
      childId: '2',
      childName: 'Emma Wilson',
      invoices: [
        {
          id: 'INV-2023-003',
          description: 'December 2023 Tuition',
          amount: 320,
          dueDate: '2023-12-15',
          status: 'paid',
          issueDate: '2023-11-15',
          paidDate: '2023-12-10'
        },
        {
          id: 'INV-2023-004',
          description: 'January 2024 Tuition',
          amount: 320,
          dueDate: '2024-01-15',
          status: 'pending',
          issueDate: '2023-12-15'
        }
      ],
      payments: [
        {
          id: 'PAY-2023-003',
          description: 'December 2023 Tuition',
          amount: 320,
          date: '2023-12-10',
          method: 'Credit Card',
          status: 'completed'
        },
        {
          id: 'PAY-2023-004',
          description: 'November 2023 Tuition',
          amount: 320,
          date: '2023-11-05',
          method: 'Online Banking',
          status: 'completed'
        }
      ]
    }
  ];

  const summary = {
    totalOutstanding: 680,
    totalPaid: 1320,
    nextDueDate: '2024-01-15',
    overdueAmount: 340
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const filteredData = selectedChild === 'all' 
    ? feeData 
    : feeData.filter(data => data.childId === selectedChild);

  const handlePayInvoice = (invoiceId: string) => {
    console.log('Processing payment for invoice:', invoiceId);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
  };

  return (
    <ProtectedRoute allowedRoles={['parent']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
            <p className="text-gray-600 mt-2">Manage payments and view fee history for your children</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${summary.totalOutstanding}</div>
                <p className="text-xs text-muted-foreground">total due</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid This Year</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${summary.totalPaid}</div>
                <p className="text-xs text-muted-foreground">successfully paid</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${summary.overdueAmount}</div>
                <p className="text-xs text-muted-foreground">needs attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Due</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-blue-600">Jan 15</div>
                <p className="text-xs text-muted-foreground">upcoming payment</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select child" />
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

          {filteredData.map((childData) => (
            <div key={childData.childId} className="space-y-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {childData.childName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-gray-900">{childData.childName}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Outstanding Invoices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Outstanding Invoices</span>
                    </CardTitle>
                    <CardDescription>Pending and overdue payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {childData.invoices.filter(inv => inv.status !== 'paid').map((invoice) => (
                        <div key={invoice.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{invoice.description}</p>
                            <p className="text-sm text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                            <p className="text-lg font-bold text-gray-900">${invoice.amount}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(invoice.status)}>
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1 uppercase">{invoice.status}</span>
                            </Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleDownloadInvoice(invoice.id)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={() => handlePayInvoice(invoice.id)}>
                                Pay Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Payment History</span>
                    </CardTitle>
                    <CardDescription>Recent successful payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {childData.payments.slice(0, 5).map((payment) => (
                        <div key={payment.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{payment.description}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(payment.date).toLocaleDateString()} • {payment.method}
                            </p>
                            <p className="text-lg font-bold text-green-600">${payment.amount}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(payment.status)}>
                              {getStatusIcon(payment.status)}
                              <span className="ml-1">{payment.status}</span>
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Receipt
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {summary.overdueAmount > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Payment Reminder</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  You have overdue payments totaling ${summary.overdueAmount}. Please make payment as soon as possible to avoid late fees.
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Overdue Amount
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ParentFees;
