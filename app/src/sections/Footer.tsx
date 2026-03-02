import { Flower2, Instagram, Facebook, MessageCircle, Phone, MapPin } from 'lucide-react';
import { businessInfo, categories } from '@/data/flowers';
import { ScrollReveal } from '@/components/ScrollReveal';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`;

  return (
    <footer className="bg-[hsl(var(--earth))] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <ScrollReveal className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
                <Flower2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-2xl">Jardín Betty</h3>
                <p className="text-xs text-white/60">Florería Tradicional</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-8">
              {businessInfo.slogan}. Especialistas en arreglos florales 
              artesanales con entrega a domicilio en Bogotá.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-[hsl(var(--primary))] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-[hsl(var(--primary))] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </ScrollReveal>

          {/* Categories */}
          <ScrollReveal delay={0.1}>
            <h4 className="font-serif text-xl mb-6">Categorías</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#galeria"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.2}>
            <h4 className="font-serif text-xl mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-white/70 hover:text-white transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-white/70 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.3}>
            <h4 className="font-serif text-xl mb-6">Contacto</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 leading-relaxed">
                  {businessInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  WhatsApp Business
                </a>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              © {currentYear} Jardín Betty. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
