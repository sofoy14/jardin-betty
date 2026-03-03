export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  active: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  occasions: string[];
  priceRange: string;
  price: number;
  available: boolean;
  image: string;
  description: string;
  featured: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  message?: string;
  status: OrderStatus;
  paymentMethod: 'cash' | 'transfer' | 'card';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  preparing: 'En preparación',
  ready: 'Listo para entrega',
  delivered: 'Entregado',
  cancelled: 'Cancelado'
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  preparing: 'bg-purple-500',
  ready: 'bg-orange-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500'
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: 'Efectivo contra entrega',
  transfer: 'Transferencia bancaria',
  card: 'Tarjeta'
};
