import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Leaf, Heart } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !titleRef.current) return;

    // Title staggered animation
    const words = titleRef.current.innerText.split(" ");
    titleRef.current.innerHTML = "";
    words.forEach((word) => {
      const span = document.createElement("span");
      span.innerText = word + " ";
      span.className = "inline-block opacity-0 translate-y-8";
      titleRef.current?.appendChild(span);
    });

    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader

    tl.to(titleRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    })
    .fromTo(".hero-element", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.4"
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
            
            <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              Tu día rico en proteínas ♡
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
            <div className="relative w-full max-w-sm mx-auto">
              {/* Decorative circle behind video */}
              <div className="absolute inset-0 bg-secondary/30 rounded-3xl scale-105 -z-10 blur-xl" />

              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-black aspect-[9/16]">
                <iframe
                  src="https://www.instagram.com/reel/DW1851fEbOh/embed/"
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Floating badges */}
              <div className="hero-element absolute -right-4 top-1/4 bg-background p-4 rounded-xl shadow-xl border border-border/50 z-20 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold">
                    +P
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">+25g Proteína</div>
                    <div className="text-xs text-muted-foreground">Por porción</div>
                  </div>
                </div>
              </div>

              <div className="hero-element absolute -left-8 bottom-1/4 bg-background p-4 rounded-xl shadow-xl border border-border/50 z-20 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="text-yellow-500">★★★★★</div>
                  <div className="text-sm font-bold text-foreground">10k+ Clientes</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
