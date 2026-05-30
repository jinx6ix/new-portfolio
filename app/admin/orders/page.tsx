'use client';

import { useEffect, useState } from 'react';
import { AdOrder } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-500 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-500 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  cancelled: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<AdOrder | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Client Orders</h2>
        <p className="text-muted-foreground">Manage ad purchase requests from clients</p>
      </div>

      <div className="bg-card rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Ad Title</TableHead>
              <TableHead>Position/Size</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                <TableCell>
                  <div className="max-w-[150px]">
                    <p className="font-medium truncate">{order.clientName}</p>
                    <p className="text-xs text-muted-foreground truncate">{order.clientEmail}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium truncate max-w-[150px]">{order.adTitle}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {order.adPosition} / {order.adSize}
                  </Badge>
                </TableCell>
                <TableCell>{order.duration} days</TableCell>
                <TableCell className="font-medium">{formatPrice(order.totalPrice)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {order.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(order.id, 'approved')}
                          className="text-green-500 hover:text-green-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(order.id, 'rejected')}
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No orders yet. Clients will appear here when they purchase ads.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={statusColors[selectedOrder.status]}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client Name</p>
                  <p className="font-medium">{selectedOrder.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Client Email</p>
                  <p className="font-medium">{selectedOrder.clientEmail}</p>
                </div>
              </div>

              {selectedOrder.companyName && (
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedOrder.companyName}</p>
                </div>
              )}

              {selectedOrder.clientPhone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedOrder.clientPhone}</p>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <h4 className="font-semibold mb-3">Ad Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="font-medium">{selectedOrder.adTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target URL</p>
                    <p className="font-medium truncate">{selectedOrder.adTargetUrl}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{selectedOrder.adDescription}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="font-medium capitalize">{selectedOrder.adPosition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium capitalize">{selectedOrder.adSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{selectedOrder.duration} days</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-2xl font-bold">{formatPrice(selectedOrder.totalPrice)}</span>
                </div>
              </div>

              {selectedOrder.status === 'pending' && (
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'rejected');
                      setSelectedOrder(null);
                    }}
                    className="text-red-500"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'approved');
                      setSelectedOrder(null);
                    }}
                  >
                    Approve Order
                  </Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}