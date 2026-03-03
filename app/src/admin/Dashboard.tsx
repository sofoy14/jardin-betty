import { useEffect } from 'react';
import { useProducts, useCategories, useOrders } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Tags, ShoppingCart, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { products, isLoaded: productsLoaded } = useProducts();
  const { categories, isLoaded: categoriesLoaded, initializeDefaultCategories } = useCategories();
  const { orders, isLoaded: ordersLoaded } = useOrders();

  useEffect(() => {
    if (categoriesLoaded && categories.length === 0) {
      initializeDefaultCategories();
    }
  }, [categoriesLoaded, categories.length, initializeDefaultCategories]);

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.available).length,
    totalCategories: categories.filter(c => c.active).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    todayOrders: orders.filter(o => {
      const today = new Date().toISOString().split('T')[0];
      return o.deliveryDate === today;
    }).length,
    revenue: orders
      .filter(o => o.status !== 'cancelled' && o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0)
  };

  const recentOrders = orders.slice(0, 5);

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
      month: 'short',
      day: 'numeric'
    });
  };

  if (!productsLoaded || !categoriesLoaded || !ordersLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general de tu tienda</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Productos</CardTitle>
            <Package className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500">{stats.activeProducts} disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Categorías</CardTitle>
            <Tags className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-gray-500">Activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pedidos Totales</CardTitle>
            <ShoppingCart className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-gray-500">{stats.pendingOrders} pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ingresos</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
            <p className="text-xs text-gray-500">Ventas confirmadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Agregar Producto</h3>
                <p className="text-sm text-green-600 mt-1">Crea un nuevo producto</p>
              </div>
              <Link to="/admin/products">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Package className="w-4 h-4 mr-2" />
                  Nuevo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800">Gestionar Categorías</h3>
                <p className="text-sm text-blue-600 mt-1">{categories.length} categorías totales</p>
              </div>
              <Link to="/admin/categories">
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <Tags className="w-4 h-4 mr-2" />
                  Ver
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-800">Pedidos Hoy</h3>
                <p className="text-sm text-purple-600 mt-1">{stats.todayOrders} pedidos programados</p>
              </div>
              <Link to="/admin/orders">
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                  <Clock className="w-4 h-4 mr-2" />
                  Ver
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pedidos Recientes</CardTitle>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm">Ver todos</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No hay pedidos aún</p>
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
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.customerName}</td>
                      <td className="py-3 px-4 text-sm">{formatDate(order.deliveryDate)}</td>
                      <td className="py-3 px-4 text-sm font-medium">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${ORDER_STATUS_COLORS[order.status] || 'bg-gray-500'}`}>
                          {order.status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                          {ORDER_STATUS_LABELS[order.status] || order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
