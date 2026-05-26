import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Leaf, Heart } from "lucide-react";

const TITLE_WORDS = ["Tu", "día", "rico", "en", "proteínas", "♡"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 1.5 });

    tl.fromTo(".title-word",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" }
    )
    .fromTo(".hero-element",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-secondary/20 rounded-bl-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-accent/30 rounded-tr-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="max-w-2xl">
            <div className="hero-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary font-medium text-sm mb-6 border border-secondary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              NUEVA FÓRMULA MEJORADA
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              {TITLE_WORDS.map((word, i) => (
                <span key={i} className="title-word inline-block opacity-0">
                  {word}
                  {i < TITLE_WORDS.length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>
            
            <p className="hero-element text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Alimentos reales, sin culpas y pensados para tu bienestar. 
              Descubrí nuestra nueva línea de pastas de frutos secos TRIBA.
            </p>
            
            <div className="hero-element flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full h-14 text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all">
                Comprar Ahora
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-primary/20 hover:bg-primary/5">
                Ver Recetas
              </Button>
            </div>

            {/* Trust Icons */}
            <div className="hero-element grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50">
              {[
                { icon: Leaf, text: "Ingredientes naturales" },
                { icon: Shield, text: "Sin azúcar agregada" },
                { icon: CheckCircle2, text: "Vegano y sin TACC" },
                { icon: Heart, text: "Atención personalizada" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                  <div className="p-2 bg-accent rounded-full text-primary">
                    <item.icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground leading-tight max-w-[100px]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="relative lg:ml-auto">
            <div className="relative w-full max-w-md mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-black aspect-[9/16]">
                <iframe
                  src="https://www.instagram.com/reel/DW1851fEbOh/embed/captioned/?autoplay=1&muted=1"
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ minHeight: "600px" }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
