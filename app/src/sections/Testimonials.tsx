import { testimonials } from '@/data/flowers';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-[hsl(var(--cream))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] uppercase tracking-wider mb-4">
              Testimonios
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6">
              Lo que Dicen Nuestros{' '}
              <span className="italic text-[hsl(var(--primary))]">Clientes</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Miles de familias bogotanas han confiado en nosotros para sus 
              momentos más especiales.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.12}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="bg-white rounded-2xl p-8 shadow-soft hover-lift relative h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[hsl(var(--primary))]/10" />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground leading-relaxed mb-8 flex-1 text-base">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-border">
                  <p className="font-medium text-foreground text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.occasion}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust Indicators */}
        <ScrollReveal delay={0.5} className="mt-20">
          <div className="flex flex-wrap justify-center items-center gap-10 text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[hsl(var(--primary))]/20 border-2 border-white flex items-center justify-center text-sm font-medium text-[hsl(var(--primary))]"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm">+5000 clientes satisfechos</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.9/5 calificación promedio</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <span className="text-sm">14 años de experiencia</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
