import { Flower2, Heart, Clock, Award } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

export function History() {
  const stats = [
    { icon: Clock, value: '14', label: 'Años de experiencia' },
    { icon: Heart, value: '5000+', label: 'Clientes felices' },
    { icon: Flower2, value: '10000+', label: 'Arreglos entregados' },
    { icon: Award, value: '100%', label: 'Satisfacción garantizada' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[hsl(var(--cream))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src="/images/WhatsApp Image 2026-03-02 at 4.59.00 PM (6).jpeg"
                alt="Arreglo floral tradicional"
                className="w-full h-[550px] object-cover"
              />
            </div>
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-elegant p-8 max-w-[220px]"
            >
              <div className="text-5xl font-serif font-bold text-[hsl(var(--primary))] mb-2">
                14
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                Años cuidando momentos especiales
              </div>
            </motion.div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[hsl(var(--primary))]/10 rounded-full -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[hsl(var(--accent))]/10 rounded-full -z-10" />
          </ScrollReveal>

          {/* Content */}
          <div className="lg:pl-8">
            <ScrollReveal delay={0.1}>
              <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] uppercase tracking-wider mb-4">
                Nuestra Historia
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-foreground mb-8 leading-tight">
                Una Tradición Familiar de{' '}
                <span className="italic text-[hsl(var(--primary))]">14 Años</span>
              </h2>
            </ScrollReveal>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <ScrollReveal delay={0.3}>
                <p>
                  Todo comenzó hace 14 años en el barrio Río Negro, Barrios Unidos, 
                  cuando una familia apasionada por las flores decidió compartir su 
                  arte con la comunidad. Lo que empezó como un pequeño sueño, se ha 
                  convertido en una tradición que ha acompañado a miles de familias 
                  bogotanas en sus momentos más importantes.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p>
                  A lo largo de estos años, hemos mantenido el mismo compromiso con 
                  la calidad y el servicio personalizado que nos caracterizó desde el 
                  primer día. Cada arreglo que sale de nuestra florería lleva consigo 
                  el cariño y la dedicación de tres generaciones.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <p>
                  Hoy, combinamos la tradición artesanal con las herramientas modernas 
                  para llegar a más personas, sin perder nunca ese toque personal que 
                  nos distingue. Seguimos siendo esa florería de barrio donde cada 
                  cliente es parte de la familia.
                </p>
              </ScrollReveal>
            </div>

            {/* Signature */}
            <ScrollReveal delay={0.6}>
              <div className="mt-10 pt-8 border-t border-border">
                <p className="font-serif text-2xl italic text-[hsl(var(--earth))]">
                  "Cada flor cuenta una historia, nosotros la ayudamos a florecer"
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  — Familia Jardín Betty
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats */}
        <StaggerContainer className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-soft hover-lift">
                <stat.icon className="w-10 h-10 mx-auto mb-5 text-[hsl(var(--primary))]" />
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
