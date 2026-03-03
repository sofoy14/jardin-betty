import { useState } from 'react';
import { useCategories } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Pencil, Trash2, Tags, Palette, Heart, Gift, Sparkles, PartyPopper, Flower, Download } from 'lucide-react';
import { categories as defaultCategories } from '@/data/flowers';
import type { Category } from '@/types';

const ICONS = [
  { id: 'flower', name: 'Flor', icon: Flower },
  { id: 'sparkles', name: 'Brillos', icon: Sparkles },
  { id: 'heart', name: 'Corazón', icon: Heart },
  { id: 'party', name: 'Fiesta', icon: PartyPopper },
  { id: 'gift', name: 'Regalo', icon: Gift },
  { id: 'palette', name: 'Paleta', icon: Palette }
];

const PRESET_COLORS = [
  '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
  '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a',
  '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
  '#795548', '#607d8b', '#f44336', '#e91e63', '#9c27b0'
];

const initialCategory: Omit<Category, 'id' | 'createdAt'> = {
  name: '',
  description: '',
  icon: 'flower',
  color: '#e91e63',
  active: true
};

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState(initialCategory);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNew = () => {
    setEditingCategory(null);
    setFormData(initialCategory);
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon || 'flower',
      color: category.color || '#e91e63',
      active: category.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría? Los productos asociados quedarán sin categoría.')) {
      deleteCategory(id);
    }
  };

  const handleImportDefault = () => {
    if (confirm(`Esto importará ${defaultCategories.length} categorías predefinidas. ¿Continuar?`)) {
      const defaultCats = defaultCategories.map(cat => ({
        ...cat,
        icon: 'flower',
        color: '#e91e63',
        active: true,
        createdAt: new Date().toISOString()
      }));
      defaultCats.forEach(cat => addCategory(cat));
      alert(`${defaultCats.length} categorías importadas. Ahora puedes editarlas.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setIsDialogOpen(false);
  };

  const getIconComponent = (iconId: string) => {
    const iconDef = ICONS.find(i => i.id === iconId);
    return iconDef?.icon || Flower;
  };

  const activeCount = categories.filter(c => c.active).length;
  const inactiveCount = categories.filter(c => !c.active).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-600 mt-1">Gestiona las categorías de productos</p>
        </div>
        <div className="flex gap-2">
          {categories.length === 0 && (
            <Button variant="outline" onClick={handleImportDefault} className="border-green-300 text-green-700 hover:bg-green-50">
              <Download className="w-4 h-4 mr-2" />
              Cargar categorías por defecto
            </Button>
          )}
          <Button onClick={handleNew} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Activas</p>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Inactivas</p>
            <p className="text-2xl font-bold text-gray-400">{inactiveCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Tags className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No hay categorías</p>
              <p className="text-sm">Crea tu primera categoría para organizar tus productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((category) => {
                const IconComponent = getIconComponent(category.icon || 'flower');
                return (
                  <Card key={category.id} className={`overflow-hidden ${!category.active ? 'opacity-60' : ''}`}>
                    <div 
                      className="h-2"
                      style={{ backgroundColor: category.color || '#e91e63' }}
                    />
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` || '#e91e6320' }}
                        >
                          <IconComponent 
                            className="w-6 h-6" 
                            style={{ color: category.color || '#e91e63' }}
                          />
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(category)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(category.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                      <div className="mt-3">
                        <Badge variant={category.active ? 'default' : 'secondary'} className={category.active ? 'bg-green-600' : ''}>
                          {category.active ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: San Valentín"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción de la categoría..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Icono</Label>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((icon) => {
                  const IconComponent = icon.icon;
                  return (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: icon.id })}
                      className={`p-2 rounded-lg border transition-all ${
                        formData.icon === icon.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      title={icon.name}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: formData.color }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      formData.color === color ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">Personalizado:</span>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-28"
                  placeholder="#e91e63"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
              <Label htmlFor="active" className="cursor-pointer">Categoría activa</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
