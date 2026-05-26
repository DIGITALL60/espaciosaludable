import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const CATEGORIES = [
  {
    title: "Pastas de frutos secos",
    slug: "pastas-frutos-secos",
    image: "https://picsum.photos/seed/cat-pastas/600/400",
    badge: "NUEVO",
    color: "bg-secondary/20"
  },
  {
    title: "Desayunos y snacks",
    slug: "desayunos-snacks",
    image: "https://picsum.photos/seed/cat-desayunos/600/400",
    color: "bg-accent/40"
  },
  {
    title: "Bebidas naturales",
    slug: "bebidas-naturales",
    image: "https://picsum.photos/seed/cat-bebidas/600/400",
    color: "bg-green-100/50 dark:bg-green-900/20"
  },
  {
    title: "Alimentos saludables",
    slug: "alimentos-saludables",
    image: "https://picsum.photos/seed/cat-alimentos/600/400",
    color: "bg-orange-100/50 dark:bg-orange-900/20"
  },
  {
    title: "Sin TACC y veganos",
    slug: "sin-tacc-veganos",
    image: "https://picsum.photos/seed/cat-sintagcc/600/400",
    badge: "Sin sellos",
    color: "bg-blue-100/50 dark:bg-blue-900/20"
  },
  {
    title: "Ver todo",
    slug: null,
    image: "",
    isLink: true,
    color: "bg-primary text-primary-foreground"
  }
];

export function Categories() {
  const headerRef = useScrollAnimation("fadeUp");
  const gridRef = useScrollAnimation("staggerFadeUp");

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Elegí tu estilo de alimentación
          </h2>
          <p className="text-lg text-muted-foreground">
            Explora nuestra variedad de productos pensados para nutrir tu cuerpo sin sacrificar el sabor.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((category, idx) => (
            <Link
              key={idx}
              href={category.slug ? `/tienda/${category.slug}` : "/tienda"}
              className={`group relative overflow-hidden rounded-3xl aspect-[4/3] flex flex-col justify-end p-8 cursor-pointer transition-transform duration-500 hover:-translate-y-2 ${category.color} ${category.isLink ? 'items-center justify-center text-center' : ''}`}
            >
              {!category.isLink && category.image && (
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-multiply dark:mix-blend-normal"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              
              {category.badge && (
                <span className="absolute top-6 left-6 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                  {category.badge}
                </span>
              )}

              <div className="relative z-10">
                {category.isLink ? (
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-2xl font-serif font-bold">{category.title}</h3>
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/30 transition-colors">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{category.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors overflow-hidden">
                      <span className="text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Explorar línea</span>
                      <ArrowRight size={16} className="-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75" />
                    </div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
