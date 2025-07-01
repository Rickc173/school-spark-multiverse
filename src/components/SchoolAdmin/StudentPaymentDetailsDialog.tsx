
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, CreditCard, FileText, History, User, DollarSign } from 'lucide-react';
import InvoicePaymentDialog from './InvoicePaymentDialog';

interface StudentPaymentDetailsDialogProps {
  student: any;
  isOpen: boolean;
  onClose: () => void;
}

const StudentPaymentDetailsDialog = ({ student, isOpen, onClose }: StudentPaymentDetailsDialogProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Mock data for the student's fee details
  const invoices = [
    {
      id: 1,
      type: 'Tuition Fee',
      amount: 1200,
      dueDate: '2024-01-15',
      status: 'Paid',
      paidDate: '2024-01-10',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      type: 'Activity Fee',
      amount: 150,
      dueDate: '2024-01-20',
      status: 'Pending'
    },
    {
      id: 3,
      type: 'Library Fee',
      amount: 75,
      dueDate: '2024-02-01',
      status: 'Overdue'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-10',
      amount: 1200,
      type: 'Tuition Fee',
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 1200,
      type: 'Tuition Fee',
      method: 'Cash',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 150,
      type: 'Activity Fee',
      method: 'Online Payment',
      status: 'Completed'
    }
  ];

  const handleSettleInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowPaymentDialog(true);
  };

  const handlePaymentSettled = (invoiceId: number, paymentData: any) => {
    console.log('Payment settled:', invoiceId, paymentData);
    // Update invoice status
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDue = invoices.filter(inv => inv.status !== 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{student?.name || 'Student'} - Payment Details</span>
            </DialogTitle>
            <DialogDescription>
              Detailed payment information and history
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices">Current Invoices</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Total Paid</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">${totalPaid}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-red-600" />
                      <span>Outstanding</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">${totalDue}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Payment Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((totalPaid / (totalPaid + totalDue)) * 100)}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{student?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Grade</p>
                      <p className="font-medium">{student?.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Roll Number</p>
                      <p className="font-medium">{student?.rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge className={getStatusColor(student?.status || 'pending')}>
                        {student?.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Current Invoices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{invoice.type}</h4>
                            <p className="text-sm text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">${invoice.amount}</p>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </div>
                        </div>
                        {invoice.status === 'Paid' && (
                          <div className="text-sm text-gray-600">
                            <p>Paid on: {new Date(invoice.paidDate).toLocaleDateString()}</p>
                            <p>Method: {invoice.paymentMethod}</p>
                          </div>
                        )}
                        {invoice.status !== 'Paid' && (
                          <div className="flex justify-end mt-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleSettleInvoice(invoice)}
                            >
                              Settle Payment
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="h-5 w-5" />
                    <span>Payment History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{payment.type}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(payment.date).toLocaleDateString()}</span>
                              </div>
                              <span>•</span>
                              <span>{payment.method}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">${payment.amount}</p>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedInvoice && (
        <InvoicePaymentDialog
          invoice={selectedInvoice}
          isOpen={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          onSettle={handlePaymentSettled}
        />
      )}
    </>
  );
};

export default StudentPaymentDetailsDialog;
