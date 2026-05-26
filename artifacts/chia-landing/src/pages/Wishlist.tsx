import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export default function Wishlist() {
  const { wishlist, addToCart } = useApp();
  const products = wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <PageLayout title="Mis Favoritos">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold">Mis Favoritos</h1>
            <p className="text-muted-foreground mt-1">{products.length} {products.length === 1 ? "producto guardado" : "productos guardados"}</p>
          </div>
          {products.length > 0 && (
            <Button
              onClick={() => products.forEach((p) => p && addToCart(p))}
              className="gap-2"
              data-testid="button-add-all-to-cart"
            >
              <ShoppingCart size={18} /> Agregar todos al carrito
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className="text-muted-foreground/30 mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">Sin favoritos aún</h2>
            <p className="text-muted-foreground mb-6">Explorá nuestra tienda y guardá los productos que más te gusten.</p>
            <Button asChild data-testid="button-go-store">
              <Link href="/tienda">Ir a la tienda</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
