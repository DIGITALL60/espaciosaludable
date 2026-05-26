import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "wouter";
import { ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const FEATURED_IDS = ["prod-1", "prod-2", "prod-7", "prod-13"];

export function Social() {
  const headerRef = useScrollAnimation("fadeUp");
  const gridRef = useScrollAnimation("staggerFadeUp");
  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  const featuredProducts = FEATURED_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            Más vendidos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Los favoritos de la comunidad
          </h2>
          <p className="text-lg text-muted-foreground">
            Los productos que más eligen nuestros +15.000 clientes cada semana.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const wishlisted = isWishlisted(product.id);
            return (
              <div key={product.id} className="group relative bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
                <Link href={`/producto/${product.id}`} className="block relative overflow-hidden aspect-square">
                  <img
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10 ${product.badge === "NUEVO" ? "bg-secondary text-secondary-foreground animate-pulse" : "bg-primary text-primary-foreground"}`}>
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white ${wishlisted ? "opacity-100" : ""}`}
                    aria-label="Agregar a favoritos"
                    data-testid={`button-home-wishlist-${product.id}`}
                  >
                    <Heart size={14} className={wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
                  </button>
                </Link>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide truncate">
                    {product.categoria.replace(/-/g, " ")}
                  </p>
                  <h3 className="font-serif font-semibold text-base leading-tight line-clamp-2 text-foreground">
                    {product.nombre}
                  </h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="font-bold text-lg text-primary">
                      ${product.precio.toLocaleString("es-AR")}
                    </span>
                    {product.precioAnterior && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.precioAnterior.toLocaleString("es-AR")}
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full gap-2 text-sm mt-1"
                    onClick={() => addToCart(product)}
                    data-testid={`button-home-add-cart-${product.id}`}
                  >
                    <ShoppingCart size={16} /> Agregar al carrito
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 text-lg group">
            Ver toda la tienda
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
