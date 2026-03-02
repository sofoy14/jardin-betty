import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Flower2, Menu, X, MessageCircle } from 'lucide-react';
import { businessInfo } from '@/data/flowers';

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isScrolled ? 'bg-[hsl(var(--primary))]' : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <Flower2
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                />
              </div>
              <span
                className={`font-serif text-xl transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                Jardín Betty
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[hsl(var(--primary))] ${
                    isScrolled ? 'text-foreground' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className={`rounded-full transition-all ${
                    isScrolled
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Cotizar
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-foreground hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-elegant transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-foreground hover:text-[hsl(var(--primary))] border-b border-border transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Cotizar por WhatsApp
                </Button>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {businessInfo.phone}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Barrios Unidos, Bogotá
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
