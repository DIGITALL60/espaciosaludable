import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Valentina R.",
    text: "La pasta TRIBA es increíble. Probé muchas marcas pero esta tiene la textura perfecta y el sabor es súper natural. Se volvió mi desayuno de todos los días.",
    role: "Cliente verificada"
  },
  {
    name: "Martín G.",
    text: "Excelente atención y los productos llegaron rapidísimo. La calidad se nota desde el empaque. Muy recomendables los snacks para antes de entrenar.",
    role: "Cliente verificado"
  },
  {
    name: "Sofía M.",
    text: "Me encanta que tengan opciones sin TACC. Por fin encontré una marca donde puedo comprar tranquila sabiendo que los ingredientes son reales.",
    role: "Cliente verificada"
  },
  {
    name: "Lucas P.",
    text: "Desde que descubrí CHÍA cambié por completo mis meriendas. Rico, saludable y a buen precio para la calidad que ofrecen.",
    role: "Cliente verificado"
  }
];

export function Testimonials() {
  const headerRef = useScrollAnimation("fadeUp");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    
    // Auto play
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex justify-center gap-1 text-yellow-500 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill="currentColor" />
            ))}
          </div>
          <p className="text-lg text-muted-foreground">
            Más de 10,000 personas ya eligen CHÍA para sus días.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="flex-[0_0_100%] md:flex-[0_0_80%] min-w-0 pl-4 md:pl-6"
                >
                  <div className="bg-background border border-border p-8 md:p-12 rounded-3xl h-full flex flex-col justify-between transition-transform duration-300 hover:shadow-lg">
                    <p className="text-lg md:text-xl text-foreground font-medium italic mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === selectedIndex ? "bg-primary w-8" : "bg-primary/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
