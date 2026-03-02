import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { businessInfo } from '@/data/flowers';
import { toast } from 'sonner';
import { ScrollReveal } from '@/components/ScrollReveal';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappUrl = `https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mensaje enviado correctamente. Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Dirección',
      value: businessInfo.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(businessInfo.address)}`,
    },
    {
      icon: Phone,
      label: 'Teléfono / WhatsApp',
      value: businessInfo.phone,
      href: `tel:${businessInfo.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: businessInfo.email,
      href: `mailto:${businessInfo.email}`,
    },
    {
      icon: Clock,
      label: 'Horario',
      value: businessInfo.hours,
      href: null,
    },
  ];

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] uppercase tracking-wider mb-4">
              Contáctanos
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6">
              Estamos Aquí para{' '}
              <span className="italic text-[hsl(var(--primary))]">Ayudarte</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Visítanos en nuestra tienda en Barrios Unidos o contáctanos por 
              cualquiera de nuestros canales. ¡Estamos listos para atenderte!
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Contact Info & Map */}
          <ScrollReveal direction="left">
            <div>
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 bg-[hsl(var(--cream))] rounded-xl hover:shadow-soft transition-shadow"
                  >
                    <div className="w-12 h-12 bg-[hsl(var(--primary))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-medium text-foreground hover:text-[hsl(var(--primary))] transition-colors leading-relaxed"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-soft h-[320px] lg:h-[380px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-74.07!3d4.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDAnNDguMCJOIDc0wrAwNCcxMi4wIlc!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Jardín Betty"
                />
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 p-5 bg-green-50 border border-green-200 rounded-xl text-green-700 hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">Escríbenos por WhatsApp para respuesta inmediata</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="bg-[hsl(var(--cream))] rounded-2xl p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-foreground mb-3">
                Envíanos un Mensaje
              </h3>
              <p className="text-muted-foreground mb-8">
                Completa el formulario y te responderemos lo antes posible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white mt-2 h-12"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-white mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="300 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-white mt-2 h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos qué necesitas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-white mt-2 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 h-14 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  También puedes escribirnos directamente al{' '}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--primary))] hover:underline"
                  >
                    WhatsApp
                  </a>{' '}
                  para una respuesta más rápida.
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
