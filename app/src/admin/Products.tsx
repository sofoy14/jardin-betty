import { useState } from 'react';
import { useProducts, useCategories } from '@/hooks/useLocalStorage';
import { flowerItems } from '@/data/flowers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Pencil, Trash2, Package, Image as ImageIcon } from 'lucide-react';
import type { Product } from '@/types';

const initialProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  categoryId: '',
  occasions: [],
  priceRange: '',
  price: 0,
  available: true,
  image: '',
  description: '',
  featured: false,
  stock: 0
};

const OCCASIONS = [
  { id: 'amor', name: 'Amor y Romance' },
  { id: 'cumpleanos', name: 'Cumpleaños' },
  { id: 'condolencias', name: 'Condolencias' },
  { id: 'matrimonio', name: 'Matrimonio' },
  { id: 'gratitud', name: 'Gratitud' },
  { id: 'san-valentin', name: 'San Valentín' },
  { id: 'aniversario', name: 'Aniversario' },
  { id: 'nacimiento', name: 'Nacimiento' }
];

export function Products() {
  const { products, addProduct, updateProduct, deleteProduct, importProducts } = useProducts();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(initialProduct);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNew = () => {
    setEditingProduct(null);
    setFormData(initialProduct);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      occasions: product.occasions,
      priceRange: product.priceRange,
      price: product.price,
      available: product.available,
      image: product.image,
      description: product.description,
      featured: product.featured,
      stock: product.stock
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const category = categories.find(c => c.id === formData.categoryId);
    const productData = {
      ...formData,
      categoryName: category?.name || ''
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsDialogOpen(false);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            if (Array.isArray(data)) {
              importProducts(data);
              alert(`${data.length} productos importados correctamente`);
            }
          } catch (error) {
            alert('Error al importar el archivo');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `productos-jardin-betty-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportDefault = () => {
    if (confirm(`Esto importará ${flowerItems.length} productos existentes (las fotos que ya tienes). ¿Continuar?`)) {
      const defaultProducts = flowerItems.map(item => ({
        id: item.id,
        name: item.name,
        categoryId: item.category,
        categoryName: categories.find(c => c.id === item.category)?.name || item.category,
        occasions: item.occasions,
        priceRange: item.priceRange,
        price: 0,
        available: item.available,
        image: item.image,
        description: item.description,
        featured: false,
        stock: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      importProducts(defaultProducts);
      alert(`${defaultProducts.length} productos importados. Ahora puedes editarlos.`);
    }
  };

  const toggleOccasion = (occasionId: string) => {
    setFormData(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasionId)
        ? prev.occasions.filter(o => o !== occasionId)
        : [...prev.occasions, occasionId]
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-1">Gestiona tu catálogo de flores y arreglos</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {products.length === 0 && (
            <Button variant="outline" size="sm" onClick={handleImportDefault} className="border-green-300 text-green-700 hover:bg-green-50">
              📁 Cargar productos existentes
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleImport}>
            Importar JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            Exportar JSON
          </Button>
          <Button onClick={handleNew} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Package className="w-4 h-4 mr-1" />
              {filteredProducts.length} productos
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No hay productos</p>
              <p className="text-sm">Agrega tu primer producto para comenzar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Producto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Categoría</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Precio</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Estado</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            {product.featured && (
                              <Badge variant="secondary" className="text-xs">Destacado</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{product.categoryName || '-'}</td>
                      <td className="py-3 px-4 text-sm">
                        {product.price > 0 ? formatCurrency(product.price) : product.priceRange || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm">{product.stock}</td>
                      <td className="py-3 px-4">
                        <Badge variant={product.available ? 'default' : 'secondary'} className={product.available ? 'bg-green-600' : ''}>
                          {product.available ? 'Disponible' : 'No disponible'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
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

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select 
                  value={formData.categoryId} 
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.active).map((category) => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (COP)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  placeholder="Ej: 120000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRange">Rango de Precio (texto)</Label>
                <Input
                  id="priceRange"
                  value={formData.priceRange}
                  onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                  placeholder="Ej: $80.000 - $150.000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock || ''}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL de Imagen</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/producto.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ocasiones</Label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occasion) => (
                  <button
                    key={occasion.id}
                    type="button"
                    onClick={() => toggleOccasion(occasion.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.occasions.includes(occasion.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {occasion.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label htmlFor="available" className="cursor-pointer">Disponible</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured" className="cursor-pointer">Destacado</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
