import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Heart, ShoppingCart, Star, Eye, BarChart2 } from "lucide-react";
import { Product } from "@/types";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
}

export function ProductCard({ product, showCompare = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, addToCompare, compareList, getStock } = useApp();
  const [, navigate] = useLocation();
  const [imgError, setImgError] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const inCompare = compareList.includes(product.id);
  const stockLeft = getStock(product.id);

  const stockColor = stockLeft === 0 ? "bg-red-500" : stockLeft < 5 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div
      className="group relative bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
      data-testid={`card-product-${product.id}`}
    >
      {/* Image */}
      <Link href={`/producto/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={imgError ? "https://picsum.photos/seed/placeholder/400/400" : product.imagenes[0]}
          alt={product.nombre}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10 ${
            product.badge === "NUEVO" ? "bg-secondary text-secondary-foreground animate-pulse" : "bg-primary text-primary-foreground"
          }`}>
            {product.badge}
          </span>
        )}

        {/* Stock dot */}
        <span className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${stockColor} ring-2 ring-white z-10`} title={`Stock: ${stockLeft}`} />

        {/* Quick actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => { e.preventDefault(); navigate(`/producto/${product.id}`); }}
            className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-white/90 hover:bg-white text-foreground font-medium transition-colors"
          >
            <Eye size={14} /> Ver detalle
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide truncate">
              {product.categoria.replace(/-/g, " ")}
            </p>
            <h3 className="font-serif font-semibold text-base leading-tight line-clamp-2 text-foreground mt-0.5">
              {product.nombre}
            </h3>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-bold text-lg text-primary">
            ${product.precio.toLocaleString("es-AR")}
          </span>
          {product.precioAnterior && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.precioAnterior.toLocaleString("es-AR")}
            </span>
          )}
          {product.precioAnterior && (
            <Badge variant="secondary" className="text-xs ml-auto">
              -{Math.round((1 - product.precio / product.precioAnterior) * 100)}%
            </Badge>
          )}
        </div>

        {/* Apto tags */}
        <div className="flex flex-wrap gap-1">
          {product.apto.slice(0, 2).map((a) => (
            <span key={a} className="text-xs bg-accent/60 text-accent-foreground px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          <Button
            className="flex-1 gap-2 text-sm"
            onClick={() => addToCart(product)}
            disabled={stockLeft === 0}
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart size={16} />
            {stockLeft === 0 ? "Sin stock" : "Agregar"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleWishlist(product.id)}
            className={wishlisted ? "text-red-500 border-red-200" : ""}
            data-testid={`button-wishlist-${product.id}`}
            aria-label={wishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart size={16} className={wishlisted ? "fill-red-500" : ""} />
          </Button>
          {showCompare && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => addToCompare(product.id)}
              className={inCompare ? "text-primary border-primary" : ""}
              data-testid={`button-compare-${product.id}`}
              aria-label="Comparar producto"
            >
              <BarChart2 size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
