import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { flowerItems, categories as defaultCategories, occasions, type Occasion } from '@/data/flowers';
import { useProducts, useCategories } from '@/hooks/useLocalStorage';
import { Check, X, Filter, MessageCircle, Package } from 'lucide-react';
import { businessInfo } from '@/data/flowers';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

// Fallback to default data if localStorage is empty
const useGalleryData = () => {
  const { products, isLoaded: productsLoaded } = useProducts();
  const { categories, isLoaded: categoriesLoaded, initializeDefaultCategories } = useCategories();

  useEffect(() => {
    if (categoriesLoaded && categories.length === 0) {
      initializeDefaultCategories();
    }
  }, [categoriesLoaded, categories.length, initializeDefaultCategories]);

  // Use localStorage products if available and not empty, otherwise use default flowerItems
  const displayProducts = (productsLoaded && products.length > 0) ? products : flowerItems;
  
  // Use localStorage categories if available and not empty, otherwise use default categories
  const displayCategories = (categoriesLoaded && categories.length > 0) 
    ? categories.filter(c => c.active).map(c => ({ id: c.id, name: c.name, description: c.description }))
    : defaultCategories;

  return {
    products: displayProducts,
    categories: displayCategories,
    isLoaded: productsLoaded && categoriesLoaded
  };
};

export function Gallery() {
  const { products, categories, isLoaded } = useGalleryData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<typeof products[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return products.filter((item) => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory || item.categoryId === selectedCategory;
      const occasionMatch = selectedOccasion === 'all' || item.occasions?.includes(selectedOccasion);
      return categoryMatch && occasionMatch && item.available !== false;
    });
  }, [products, selectedCategory, selectedOccasion]);

  const whatsappUrl = (itemName: string) => {
    const message = `Hola, vi su página web y estoy interesado en cotizar el arreglo: "${itemName}"`;
    return `https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const formatPrice = (item: typeof products[0]) => {
    if (item.price && item.price > 0) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(item.price);
    }
    return item.priceRange || 'Consultar precio';
  };

  if (!isLoaded) {
    return (
      <section id="galeria" className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal>
            <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] uppercase tracking-wider mb-4">
              Nuestro Catálogo
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6">
              Galería de <span className="italic text-[hsl(var(--primary))]">Arreglos</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explora nuestra colección de arreglos florales artesanales. 
              Cada pieza es única y elaborada con flores frescas del día.
            </p>
          </ScrollReveal>
        </div>

        {/* Filters */}
        <ScrollReveal delay={0.3} className="mb-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
            </Button>
          </div>

          <div className={`space-y-5 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Category Tabs */}
            <Tabs
              value={selectedCategory}
              onValueChange={(v) => setSelectedCategory(v)}
              className="w-full"
            >
              <TabsList className="flex flex-wrap justify-center h-auto gap-2 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white px-5 py-2.5 rounded-full border border-border text-sm"
                >
                  Todos
                </TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white px-5 py-2.5 rounded-full border border-border text-sm"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Occasion Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2 self-center">Ocasión:</span>
              <Button
                variant={selectedOccasion === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedOccasion('all')}
                className={selectedOccasion === 'all' ? 'bg-[hsl(var(--primary))]' : ''}
              >
                Todas
              </Button>
              {occasions.map((occ) => (
                <Button
                  key={occ.id}
                  variant={selectedOccasion === occ.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={selectedOccasion === occ.id ? 'bg-[hsl(var(--primary))]' : ''}
                >
                  {occ.icon} {occ.name}
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results Count */}
        <ScrollReveal delay={0.4} className="text-center mb-10">
          <span className="text-sm text-muted-foreground">
            Mostrando {filteredItems.length} de {products.length} arreglos
          </span>
        </ScrollReveal>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedCategory}-${selectedOccasion}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--cream))] shadow-soft hover-lift">
                  {/* Image */}
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="font-medium mb-1">Ver detalles</p>
                      <p className="text-sm text-white/80">Clic para ampliar</p>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={item.available !== false ? 'default' : 'secondary'}
                      className={item.available !== false ? 'bg-green-600 text-white px-3 py-1' : 'bg-gray-500'}
                    >
                      {item.available !== false ? (
                        <><Check className="w-3.5 h-3.5 mr-1.5" /> Disponible</>
                      ) : (
                        <><X className="w-3.5 h-3.5 mr-1.5" /> Agotado</>
                      )}
                    </Badge>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-500 text-white px-3 py-1">
                        ⭐ Destacado
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-4 px-1">
                  <h3 className="font-serif text-xl text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[hsl(var(--primary))] font-semibold text-lg">
                      {formatPrice(item)}
                    </span>
                    <a
                      href={whatsappUrl(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1.5 font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Cotizar
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-muted-foreground text-lg">
              No encontramos arreglos con los filtros seleccionados.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedOccasion('all');
              }}
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white" onInteractOutside={() => setSelectedItem(null)} onEscapeKeyDown={() => setSelectedItem(null)}>
          {/* Botón cerrar */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          {selectedItem && (
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square md:aspect-auto md:h-[600px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8 lg:p-10 flex flex-col">
                <div className="flex-1">
                  <div className="flex gap-2 mb-5">
                    <Badge className="bg-[hsl(var(--primary))] text-sm px-4 py-1">
                      {selectedItem.categoryName || categories.find(c => c.id === selectedItem.category || c.id === selectedItem.categoryId)?.name || 'Arreglo Floral'}
                    </Badge>
                    {selectedItem.featured && (
                      <Badge className="bg-amber-500 text-sm px-4 py-1">
                        ⭐ Destacado
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
                    {selectedItem.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {selectedItem.occasions && selectedItem.occasions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedItem.occasions.map((occ: string) => {
                        const occasion = occasions.find(o => o.id === occ);
                        return occasion ? (
                          <span
                            key={occ}
                            className="inline-flex items-center gap-1.5 text-sm bg-[hsl(var(--cream))] px-4 py-2 rounded-full"
                          >
                            {occasion.icon} {occasion.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}

                  <div className="flex items-center gap-6 mb-8">
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Precio:</span>
                      <p className="text-3xl font-serif font-bold text-[hsl(var(--primary))]">
                        {formatPrice(selectedItem)}
                      </p>
                    </div>
                    {selectedItem.stock !== undefined && selectedItem.stock > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Disponibilidad:</span>
                        <p className="text-lg font-medium text-green-600">
                          {selectedItem.stock} en stock
                        </p>
                      </div>
                    )}
                    <Badge
                      variant={selectedItem.available !== false ? 'default' : 'secondary'}
                      className={selectedItem.available !== false ? 'bg-green-600 text-sm px-4 py-1.5' : 'bg-gray-500'}
                    >
                      {selectedItem.available !== false ? 'Disponible' : 'Agotado'}
                    </Badge>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                  onClick={() => {
                    window.open(whatsappUrl(selectedItem.name), '_blank', 'noopener,noreferrer');
                  }}
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Cotizar por WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
