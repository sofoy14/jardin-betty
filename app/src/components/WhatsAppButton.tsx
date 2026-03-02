import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { businessInfo } from '@/data/flowers';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`;

  const quickMessages = [
    { label: 'Cotizar ramo de rosas', message: 'Hola, quisiera cotizar un ramo de rosas' },
    { label: 'Arreglo para cumpleaños', message: 'Hola, necesito un arreglo para cumpleaños' },
    { label: 'Flores para funeral', message: 'Hola, necesito información sobre arreglos funerarios' },
    { label: 'Decoración de evento', message: 'Hola, quisiera cotizar decoración para un evento' },
  ];

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          showButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Quick Messages Popup */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-elegant overflow-hidden animate-scale-in">
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Jardín Betty</p>
                    <p className="text-xs text-white/80">Responde en minutos</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm text-muted-foreground mb-3">
                Selecciona una opción rápida:
              </p>
              {quickMessages.map((item, index) => (
                <a
                  key={index}
                  href={`https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(item.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-[hsl(var(--cream))] hover:bg-green-50 rounded-lg text-sm text-foreground hover:text-green-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-green-600 text-white text-center rounded-lg text-sm font-medium hover:bg-green-700 transition-colors mt-3"
                onClick={() => setIsOpen(false)}
              >
                Enviar mensaje personalizado
              </a>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 whatsapp-pulse ${
            isOpen ? 'bg-gray-600 rotate-45' : 'bg-green-600 hover:bg-green-700'
          }`}
          aria-label="Abrir chat de WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </button>
      </div>
    </>
  );
}
