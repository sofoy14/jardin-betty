export type Category = 'ramos' | 'arreglos' | 'funerales' | 'eventos' | 'detalles';
export type Occasion = 'amor' | 'cumpleanos' | 'condolencias' | 'matrimonio' | 'gratitud';

export interface FlowerItem {
  id: string;
  name: string;
  category: Category;
  occasions: Occasion[];
  priceRange: string;
  available: boolean;
  image: string;
  description: string;
}

export const categories: { id: Category; name: string; description: string }[] = [
  {
    id: 'ramos',
    name: 'Ramos y Bouquets',
    description: 'Ramos de rosas, girasoles y flores mixtas para regalar'
  },
  {
    id: 'arreglos',
    name: 'Arreglos Florales',
    description: 'Centros de mesa y arreglos decorativos'
  },
  {
    id: 'funerales',
    name: 'Flores para Funerales',
    description: 'Coronas, cruces y arreglos de condolencia'
  },
  {
    id: 'eventos',
    name: 'Decoración de Eventos',
    description: 'Bodas, quince años y eventos corporativos'
  },
  {
    id: 'detalles',
    name: 'Detalles',
    description: 'Pequeños arreglos, cajas y regalos individuales'
  }
];

export const occasions: { id: Occasion; name: string; icon: string }[] = [
  { id: 'amor', name: 'Amor y Romance', icon: '❤️' },
  { id: 'cumpleanos', name: 'Cumpleaños', icon: '🎂' },
  { id: 'condolencias', name: 'Condolencias', icon: '🕊️' },
  { id: 'matrimonio', name: 'Matrimonio', icon: '💍' },
  { id: 'gratitud', name: 'Gratitud', icon: '🙏' }
];

export const flowerItems: FlowerItem[] = [
  // Ramos
  {
    id: '1',
    name: 'Ramo de Rosas Rojas Clásico',
    category: 'ramos',
    occasions: ['amor', 'gratitud'],
    priceRange: '$80.000 - $150.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (15).jpeg',
    description: '24 rosas rojas con baby\'s breath y papel negro elegante'
  },
  {
    id: '2',
    name: 'Ramo de Girasoles Premium',
    category: 'ramos',
    occasions: ['gratitud', 'cumpleanos'],
    priceRange: '$90.000 - $160.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (16).jpeg',
    description: '8 girasoles frescos con eucalipto y envoltura elegante'
  },
  {
    id: '3',
    name: 'Ramo de Girasoles y Rosas',
    category: 'ramos',
    occasions: ['amor', 'cumpleanos', 'gratitud'],
    priceRange: '$85.000 - $140.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (5).jpeg',
    description: 'Combinación perfecta de girasoles y rosas rojas'
  },
  {
    id: '4',
    name: 'Ramo de Rosas Naranjas',
    category: 'ramos',
    occasions: ['cumpleanos', 'gratitud'],
    priceRange: '$75.000 - $130.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (2).jpeg',
    description: 'Rosas naranjas vibrantes con baby\'s breath'
  },
  {
    id: '5',
    name: 'Ramo de Rosas Fucsia',
    category: 'ramos',
    occasions: ['amor', 'cumpleanos'],
    priceRange: '$80.000 - $140.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (9).jpeg',
    description: 'Rosas fucsia intensas con lazo blanco'
  },
  {
    id: '6',
    name: 'Ramo Mixto Especial',
    category: 'ramos',
    occasions: ['cumpleanos', 'gratitud'],
    priceRange: '$95.000 - $170.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (10).jpeg',
    description: 'Girasoles, rosas, gerberas y follaje premium'
  },
  {
    id: '7',
    name: 'Ramo de Rosas Rojas y Blancas',
    category: 'ramos',
    occasions: ['amor', 'matrimonio'],
    priceRange: '$90.000 - $160.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (12).jpeg',
    description: 'Elegante combinación de rosas rojas y blancas'
  },
  {
    id: '8',
    name: 'Ramo de Girasoles con Eucalipto',
    category: 'ramos',
    occasions: ['gratitud', 'cumpleanos'],
    priceRange: '$85.000 - $150.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (17).jpeg',
    description: 'Girasoles con eucalipto y envoltura rosa'
  },
  // Arreglos
  {
    id: '9',
    name: 'Arreglo de Rosas y Lirios',
    category: 'arreglos',
    occasions: ['amor', 'cumpleanos'],
    priceRange: '$100.000 - $180.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (1).jpeg',
    description: 'Rosas rojas con lirios y baby\'s breath'
  },
  {
    id: '10',
    name: 'Arreglo de Rosas Blancas y Rosadas',
    category: 'arreglos',
    occasions: ['matrimonio', 'gratitud'],
    priceRange: '$120.000 - $200.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (6).jpeg',
    description: 'Elegantes rosas blancas y mini rosas rosadas'
  },
  {
    id: '11',
    name: 'Arreglo en Florero Premium',
    category: 'arreglos',
    occasions: ['cumpleanos', 'gratitud', 'amor'],
    priceRange: '$130.000 - $220.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (13).jpeg',
    description: 'Hortensias, girasoles, lirios y gerberas en florero'
  },
  // Detalles
  {
    id: '12',
    name: 'Caja de Rosas Amarillas y Rosadas',
    category: 'detalles',
    occasions: ['cumpleanos', 'amor'],
    priceRange: '$110.000 - $190.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (7).jpeg',
    description: 'Caja blanca con rosas amarillas y rosadas'
  },
  {
    id: '13',
    name: 'Caja Redonda de Rosas Mixtas',
    category: 'detalles',
    occasions: ['cumpleanos', 'amor', 'gratitud'],
    priceRange: '$100.000 - $170.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (11).jpeg',
    description: 'Caja redonda con rosas de colores y tarjeta personalizada'
  },
  {
    id: '14',
    name: 'Ramo con Peluche',
    category: 'detalles',
    occasions: ['cumpleanos', 'amor'],
    priceRange: '$95.000 - $160.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (4).jpeg',
    description: 'Ramo de rosas rojas con peluche de león incluido'
  },
  {
    id: '15',
    name: 'Ramo de Cumpleaños con Globo',
    category: 'detalles',
    occasions: ['cumpleanos'],
    priceRange: '$85.000 - $150.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM.jpeg',
    description: 'Rosas rojas con lirios y globo de cumpleaños'
  },
  // Eventos
  {
    id: '16',
    name: 'Decoración de Carro para Boda',
    category: 'eventos',
    occasions: ['matrimonio'],
    priceRange: '$150.000 - $280.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (3).jpeg',
    description: 'Arreglo elegante para carro de novios'
  },
  // Funerales
  {
    id: '17',
    name: 'Corona Fúnebre Premium',
    category: 'funerales',
    occasions: ['condolencias'],
    priceRange: '$250.000 - $450.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (8).jpeg',
    description: 'Corona con anturios, rosas blancas, gerberas y cinta personalizada'
  },
  {
    id: '18',
    name: 'Ramo de Rosas Amarillas con Lirios',
    category: 'ramos',
    occasions: ['cumpleanos', 'gratitud'],
    priceRange: '$90.000 - $155.000',
    available: true,
    image: '/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (14).jpeg',
    description: 'Rosas amarillas con lirios y baby\'s breath'
  }
];

export const businessInfo = {
  name: 'Jardín Betty',
  slogan: '14 años cuidando los momentos más importantes de las familias bogotanas',
  phone: '+57 322 374 0029',
  whatsappMessage: 'Hola, vi su página web y estoy interesado en cotizar un arreglo floral.',
  address: 'Carrera 59 #94B-92, Barrio Río Negro, Localidad Barrios Unidos, Bogotá, Colombia',
  email: 'jardinbetty@gmail.com',
  hours: 'Lunes a Sábado: 8:00 AM - 7:00 PM | Domingos: 9:00 AM - 2:00 PM',
  yearsExperience: 14,
  delivery: 'Entrega el mismo día en Bogotá'
};

export const services = [
  {
    title: 'Entregas a Domicilio',
    description: 'Llevamos tus flores frescas a cualquier punto de Bogotá el mismo día',
    icon: 'truck',
    features: ['Entrega express', 'Rastreo en tiempo real', 'Cobertura total Bogotá']
  },
  {
    title: 'Arreglos Personalizados',
    description: 'Diseñamos arreglos únicos según tus preferencias y ocasión',
    icon: 'palette',
    features: ['Diseño a medida', 'Selección de flores', 'Tarjeta personalizada']
  },
  {
    title: 'Eventos Corporativos',
    description: 'Decoración floral para empresas y eventos ejecutivos',
    icon: 'building',
    features: ['Contratos mensuales', 'Decoración de oficinas', 'Eventos empresariales']
  },
  {
    title: 'Servicio Funerario Express',
    description: 'Arreglos de condolencia con entrega inmediata',
    icon: 'heart',
    features: ['Disponible 24/7', 'Entrega urgente', 'Cinta personalizada']
  }
];

export const testimonials = [
  {
    name: 'María Elena Rojas',
    text: 'El mejor servicio de flores en Bogotá. Hice un pedido para el cumpleaños de mi mamá y llegó exactamente como lo pedí, ¡muy frescas y hermosas!',
    rating: 5,
    occasion: 'Cumpleaños'
  },
  {
    name: 'Carlos Mendoza',
    text: 'Excelente atención y calidad. El arreglo para el funeral de mi padre fue muy elegante y respetuoso. Llegó a tiempo y superó mis expectativas.',
    rating: 5,
    occasion: 'Condolencias'
  },
  {
    name: 'Ana Lucía Gómez',
    text: 'Contraté la decoración de mi boda y fue espectacular. El equipo de Jardín Betty entendió perfectamente mi visión. ¡Altamente recomendados!',
    rating: 5,
    occasion: 'Matrimonio'
  },
  {
    name: 'Pedro Sánchez',
    text: 'Llevo años comprando aquí para sorprender a mi esposa. Siempre frescas, siempre puntuales. Una florería de confianza.',
    rating: 5,
    occasion: 'Aniversario'
  }
];

export const processSteps = [
  {
    number: '01',
    title: 'Eliges el Estilo',
    description: 'Explora nuestra galería y selecciona el arreglo que más te guste'
  },
  {
    number: '02',
    title: 'Cotizas por WhatsApp',
    description: 'Escríbenos con tu elección y te confirmamos disponibilidad y precio'
  },
  {
    number: '03',
    title: 'Preparación Express',
    description: 'Nuestros floristas preparan tu arreglo con flores frescas del día'
  },
  {
    number: '04',
    title: 'Entrega a Domicilio',
    description: 'Llevamos tus flores a la dirección indicada en Bogotá'
  }
];
