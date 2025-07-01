
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, Calendar, FileText, History } from 'lucide-react';

interface InvoicePaymentDialogProps {
  invoice: any;
  isOpen: boolean;
  onClose: () => void;
  onSettle: (invoiceId: number, paymentData: any) => void;
}

const InvoicePaymentDialog = ({ invoice, isOpen, onClose, onSettle }: InvoicePaymentDialogProps) => {
  const [paymentData, setPaymentData] = useState({
    amount: invoice?.amount || 0,
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Mock payment history for the student
  const paymentHistory = [
    {
      id: 1,
      date: '2023-11-15',
      amount: 1200,
      feeTemplate: 'Tuition Fee',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      invoiceId: 'INV-001'
    },
    {
      id: 2,
      date: '2023-10-15',
      amount: 1200,
      feeTemplate: 'Tuition Fee',
      paymentMethod: 'Cash',
      status: 'Completed',
      invoiceId: 'INV-002'
    },
    {
      id: 3,
      date: '2023-09-15',
      amount: 150,
      feeTemplate: 'Activity Fee',
      paymentMethod: 'Online Payment',
      status: 'Completed',
      invoiceId: 'INV-003'
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSettle = () => {
    onSettle(invoice.id, paymentData);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Invoice Payment - {invoice?.type}</span>
          </DialogTitle>
          <DialogDescription>
            Settle invoice and view payment history
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payment">Make Payment</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fee Type</Label>
                    <p className="font-medium">{invoice?.type}</p>
                  </div>
                  <div>
                    <Label>Amount Due</Label>
                    <p className="font-medium text-lg">${invoice?.amount}</p>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <p className="font-medium">{invoice?.dueDate}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant={invoice?.status === 'Overdue' ? 'destructive' : 'secondary'}>
                      {invoice?.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Payment Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={paymentData.paymentDate}
                      onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={paymentData.paymentMethod} onValueChange={(value) => setPaymentData({...paymentData, paymentMethod: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    placeholder="Add any additional notes..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                  <Button onClick={handleSettle} disabled={!paymentData.paymentMethod}>
                    Settle Invoice
                  </Button>
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
                <CardDescription>All previous payments sorted by settlement date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{payment.feeTemplate}</h4>
                          <p className="text-sm text-gray-600">Invoice: {payment.invoiceId}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">${payment.amount}</p>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(payment.date).toLocaleDateString()}</span>
                          </div>
                          <span>•</span>
                          <span>{payment.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {paymentHistory.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No payment history found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePaymentDialog;
