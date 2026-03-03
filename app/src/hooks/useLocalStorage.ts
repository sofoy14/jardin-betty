import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
    setIsLoaded(true);
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export function useProducts() {
  const [products, setProducts, removeProducts] = useLocalStorage<any[]>('jb_products', []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addProduct = useCallback((product: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  }, [setProducts]);

  const updateProduct = useCallback((id: string, updates: Partial<any>) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    ));
  }, [setProducts]);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, [setProducts]);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const importProducts = useCallback((newProducts: any[]) => {
    setProducts(newProducts.map(p => ({
      ...p,
      id: p.id || Date.now().toString(36) + Math.random().toString(36).substr(2),
      createdAt: p.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })));
  }, [setProducts]);

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    importProducts,
    clearProducts: removeProducts
  };
}

export function useCategories() {
  const [categories, setCategories, removeCategories] = useLocalStorage<any[]>('jb_categories', []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addCategory = useCallback((category: Omit<any, 'id' | 'createdAt'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      createdAt: new Date().toISOString()
    };
    setCategories(prev => [newCategory, ...prev]);
    return newCategory;
  }, [setCategories]);

  const updateCategory = useCallback((id: string, updates: Partial<any>) => {
    setCategories(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  }, [setCategories]);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, [setCategories]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find(c => c.id === id);
  }, [categories]);

  const initializeDefaultCategories = useCallback(() => {
    const defaultCategories = [
      { id: 'ramos', name: 'Ramos y Bouquets', description: 'Ramos de rosas, girasoles y flores mixtas', icon: 'flower', color: '#e91e63', active: true, createdAt: new Date().toISOString() },
      { id: 'arreglos', name: 'Arreglos Florales', description: 'Centros de mesa y arreglos decorativos', icon: 'sparkles', color: '#9c27b0', active: true, createdAt: new Date().toISOString() },
      { id: 'funerales', name: 'Flores para Funerales', description: 'Coronas, cruces y arreglos de condolencia', icon: 'heart', color: '#607d8b', active: true, createdAt: new Date().toISOString() },
      { id: 'eventos', name: 'Decoración de Eventos', description: 'Bodas, quince años y eventos corporativos', icon: 'party', color: '#ff9800', active: true, createdAt: new Date().toISOString() },
      { id: 'detalles', name: 'Detalles', description: 'Pequeños arreglos, cajas y regalos individuales', icon: 'gift', color: '#4caf50', active: true, createdAt: new Date().toISOString() },
      { id: 'san-valentin', name: 'San Valentín', description: 'Arreglos especiales para el día del amor', icon: 'heart', color: '#f44336', active: true, createdAt: new Date().toISOString() },
      { id: 'bodas', name: 'Bodas', description: 'Decoración completa para bodas', icon: 'ring', color: '#ffd700', active: true, createdAt: new Date().toISOString() },
      { id: 'condolencias', name: 'Condolencias', description: 'Arreglos para expresar condolencias', icon: 'dove', color: '#795548', active: true, createdAt: new Date().toISOString() }
    ];
    setCategories(defaultCategories);
  }, [setCategories]);

  return {
    categories,
    isLoaded,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    initializeDefaultCategories,
    clearCategories: removeCategories
  };
}

export function useOrders() {
  const [orders, setOrders, removeOrders] = useLocalStorage<any[]>('jb_orders', []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addOrder = useCallback((order: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder = {
      ...order,
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [setOrders]);

  const updateOrder = useCallback((id: string, updates: Partial<any>) => {
    setOrders(prev => prev.map(o => 
      o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
    ));
  }, [setOrders]);

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, [setOrders]);

  const getOrderById = useCallback((id: string) => {
    return orders.find(o => o.id === id);
  }, [orders]);

  const getOrdersByStatus = useCallback((status: string) => {
    return orders.filter(o => o.status === status);
  }, [orders]);

  const getOrdersByDate = useCallback((date: string) => {
    return orders.filter(o => o.deliveryDate === date);
  }, [orders]);

  return {
    orders,
    isLoaded,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrdersByStatus,
    getOrdersByDate,
    clearOrders: removeOrders
  };
}
