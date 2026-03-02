import { processSteps } from '@/data/flowers';
import { MessageCircle, Flower2, Package, Home } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  '01': Flower2,
  '02': MessageCircle,
  '03': Package,
  '04': Home,
};

export function Process() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] uppercase tracking-wider mb-4">
              Cómo Funciona
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6">
              Tu Pedido en{' '}
              <span className="italic text-[hsl(var(--primary))]">4 Pasos</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Hacer tu pedido es muy sencillo. Te guiamos en cada paso para que 
              recibas las flores perfectas en la puerta de tu casa.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-[hsl(var(--primary))]/20 via-[hsl(var(--primary))] to-[hsl(var(--primary))]/20" />
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8" staggerDelay={0.2}>
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.number] || Flower2;
              return (
                <StaggerItem key={index}>
                  <div className="relative text-center group">
                    {/* Step Circle with Number Badge */}
                    <div className="relative inline-block mb-8">
                      {/* Main Circle */}
                      <div className="w-28 h-28 mx-auto bg-white rounded-full border-2 border-[hsl(var(--primary))] flex items-center justify-center group-hover:bg-[hsl(var(--primary))] transition-all duration-300 shadow-soft relative z-10">
                        <Icon className="w-10 h-10 text-[hsl(var(--primary))] group-hover:text-white transition-colors" />
                      </div>
                      
                      {/* Number Badge - Positioned at top right */}
                      <div className="absolute -top-1 -right-1 w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white text-base font-bold shadow-md z-20 border-2 border-white">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Features */}
        <StaggerContainer className="mt-24 grid sm:grid-cols-3 gap-8" staggerDelay={0.15}>
          <StaggerItem>
            <div className="text-center p-8 bg-[hsl(var(--cream))] rounded-2xl hover-lift">
              <div className="text-4xl mb-4">🌸</div>
              <h4 className="font-serif text-xl text-foreground mb-3">
                Flores Frescas Garantizadas
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trabajamos solo con flores del día para máxima frescura y duración
              </p>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <div className="text-center p-8 bg-[hsl(var(--cream))] rounded-2xl hover-lift">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="font-serif text-xl text-foreground mb-3">
                Entrega Express
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recibe tu pedido el mismo día en cualquier punto de Bogotá
              </p>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <div className="text-center p-8 bg-[hsl(var(--cream))] rounded-2xl hover-lift">
              <div className="text-4xl mb-4">💳</div>
              <h4 className="font-serif text-xl text-foreground mb-3">
                Pago Contra Entrega
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Paga cuando recibas tus flores, sin complicaciones ni prepagos
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
