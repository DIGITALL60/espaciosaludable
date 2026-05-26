import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Leaf, Heart } from "lucide-react";

const FULL_TITLE = "Tu día rico en proteínas ♡";

function useTypewriter(text: string, speed = 55) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export function Hero() {
  const { displayed, done } = useTypewriter(FULL_TITLE, 55);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center animate-fade-in">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-secondary/20 rounded-bl-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-accent/30 rounded-tr-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary font-medium text-sm mb-6 border border-secondary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              NUEVA FÓRMULA MEJORADA
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6 min-h-[1.2em]">
              {displayed}
              <span
                className={`inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-1 ${
                  done ? "animate-blink" : "opacity-100"
                }`}
              />
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Alimentos reales, sin culpas y pensados para tu bienestar.
              Descubrí nuestra nueva línea de pastas de frutos secos TRIBA.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full h-14 text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all">
                Comprar Ahora
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-primary/20 hover:bg-primary/5">
                Ver Recetas
              </Button>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50">
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
                <video
                  src="/chia-reel.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
