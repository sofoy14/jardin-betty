import { services } from '@/data/flowers';
import { Truck, Palette, Building2, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/flowers';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  truck: Truck,
  palette: Palette,
  building: Building2,
  heart: Heart,
};

export function Services() {
  const whatsappUrl = `https://wa.me/${businessInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`;

  return (
    <section className="py-24 lg:py-32 bg-[hsl(var(--cream))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] uppercase tracking-wider mb-4">
              Nuestros Servicios
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6">
              Todo lo que <span className="italic text-[hsl(var(--primary))]">Necesitas</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ofrecemos una gama completa de servicios florales para hacer de cada 
              ocasión un momento inolvidable.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            return (
              <StaggerItem key={index}>
                <div className="group bg-white rounded-2xl p-8 shadow-soft hover-lift border border-transparent hover:border-[hsl(var(--primary))]/20 transition-all duration-300 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-[hsl(var(--primary))]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[hsl(var(--primary))] group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 transition-colors group/link"
                  >
                    Más información
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA Banner */}
        <ScrollReveal delay={0.4} className="mt-20">
          <div className="bg-[hsl(var(--primary))] rounded-3xl p-10 lg:p-16 text-white text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="font-serif text-3xl lg:text-4xl mb-5">
                ¿Necesitas un arreglo personalizado?
              </h3>
              <p className="text-white/80 mb-10 text-lg leading-relaxed">
                Cuéntanos tu idea y nuestros floristas expertos crearán algo único 
                para ti. Atendemos pedidos urgentes con entrega el mismo día.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[hsl(var(--primary))] hover:bg-white/90 px-10 py-6 text-lg rounded-full"
                >
                  Solicitar Cotización
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
