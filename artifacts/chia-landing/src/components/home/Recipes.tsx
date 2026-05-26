import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";

export function Recipes() {
  const containerRef = useScrollAnimation("fadeUp");
  const imageRef = useScrollAnimation("parallax");

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="bg-secondary/10 rounded-3xl overflow-hidden border border-secondary/20">
          <div className="grid lg:grid-cols-2 items-center">
            
            <div className="p-10 md:p-16 lg:p-20 order-2 lg:order-1">
              <div className="inline-block px-4 py-1 rounded-full bg-background border border-border text-sm font-medium text-muted-foreground mb-6">
                Inspiración Diaria
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                Recetas saludables —<br />Come mejor, sentite mejor ♡
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Descubrí formas creativas y deliciosas de incorporar nuestros productos a tu rutina diaria. Desde desayunos energéticos hasta postres sin culpas.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12">
                VER RECETAS
              </Button>
            </div>

            <div className="relative h-[400px] lg:h-full order-1 lg:order-2 overflow-hidden">
              <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <img 
                  src="/images/smoothie-bowl.png" 
                  alt="Recetas Saludables" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
