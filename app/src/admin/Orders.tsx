import { useState } from 'react';
import { useOrders } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, Eye, Trash2, Package, Clock, Truck, XCircle } from 'lucide-react';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, PAYMENT_METHOD_LABELS, type Order, type OrderStatus } from '@/types';

const STATUS_FLOW: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

export function Orders() {
  const { orders, updateOrder, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && order.status === 'pending';
    if (activeTab === 'active') return matchesSearch && ['confirmed', 'preparing', 'ready'].includes(order.status);
    if (activeTab === 'delivered') return matchesSearch && order.status === 'delivered';
    if (activeTab === 'cancelled') return matchesSearch && order.status === 'cancelled';
    return matchesSearch;
  });

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrder(orderId, { status: newStatus });
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este pedido? Esta acción no se puede deshacer.')) {
      deleteOrder(id);
      if (selectedOrder?.id === id) {
        setIsDetailOpen(false);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    if (currentIndex < STATUS_FLOW.length - 1) {
      return STATUS_FLOW[currentIndex + 1];
    }
    return null;
  };

  const stats = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    active: orders.filter(o => ['confirmed', 'preparing', 'ready'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600 mt-1">Gestiona los pedidos de tus clientes</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            Todos ({stats.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pendientes ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="active">
            Activos ({stats.active})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Entregados ({stats.delivered})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelados ({stats.cancelled})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por ID, cliente o teléfono..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No hay pedidos</p>
                  <p className="text-sm">Los pedidos aparecerán aquí cuando los clientes hagan compras</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cliente</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Fecha Entrega</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Estado</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Pago</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-sm">{order.customerName}</p>
                              <p className="text-xs text-gray-500">{order.customerPhone}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{formatDate(order.deliveryDate)}</td>
                          <td className="py-3 px-4 text-sm font-medium">{formatCurrency(order.total)}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS] || 'bg-gray-500'}`}>
                              {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] || order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} className={order.paymentStatus === 'paid' ? 'bg-green-600' : ''}>
                              {order.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewDetail(order)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Pedido {selectedOrder.id}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${ORDER_STATUS_COLORS[selectedOrder.status]}`}>
                    {ORDER_STATUS_LABELS[selectedOrder.status]}
                  </span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-gray-500">Cliente</Label>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500">Teléfono</Label>
                    <p className="font-medium">{selectedOrder.customerPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500">Fecha de Entrega</Label>
                    <p className="font-medium">{formatDate(selectedOrder.deliveryDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500">Hora de Entrega</Label>
                    <p className="font-medium">{selectedOrder.deliveryTime || 'No especificada'}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-500">Dirección de Entrega</Label>
                  <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                </div>

                {selectedOrder.message && (
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <Label className="text-pink-800">Mensaje para la tarjeta</Label>
                    <p className="text-pink-900 italic mt-1">"{selectedOrder.message}"</p>
                  </div>
                )}

                {/* Items */}
                <div>
                  <Label className="text-gray-500 mb-2 block">Productos</Label>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {item.image ? (
                          <img src={item.image} alt={item.productName} className="w-12 h-12 rounded object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.quantity * item.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-500">Método de Pago</Label>
                    <p className="font-medium">{PAYMENT_METHOD_LABELS[selectedOrder.paymentMethod]}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Estado del Pago</Label>
                    <Badge variant={selectedOrder.paymentStatus === 'paid' ? 'default' : 'secondary'} className={selectedOrder.paymentStatus === 'paid' ? 'bg-green-600' : ''}>
                      {selectedOrder.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                    </Badge>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="space-y-1">
                    <Label className="text-gray-500">Notas internas</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Pedido creado: {formatDateTime(selectedOrder.createdAt)}</p>
                  <p>Última actualización: {formatDateTime(selectedOrder.updatedAt)}</p>
                </div>

                {/* Actions */}
                <DialogFooter className="gap-2">
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                    <>
                      {getNextStatus(selectedOrder.status) && (
                        <Button 
                          onClick={() => handleUpdateStatus(selectedOrder.id, getNextStatus(selectedOrder.status)!)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          {selectedOrder.status === 'ready' ? 'Marcar como Entregado' : 'Avanzar Estado'}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancelar Pedido
                      </Button>
                    </>
                  )}
                  {selectedOrder.status === 'cancelled' && (
                    <Button 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                      variant="outline"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Reactivar Pedido
                    </Button>
                  )}
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
