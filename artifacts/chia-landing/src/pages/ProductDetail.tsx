import { useState } from "react";
import { useParams, Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { PRODUCTS } from "@/data/products";
import { REVIEWS } from "@/data/reviews";
import { useApp } from "@/context/AppContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, BarChart2, Plus, Minus, Star, CheckCircle2, ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const reviewSchema = z.object({
  autor: z.string().min(2, "Nombre requerido"),
  rating: z.number().min(1).max(5),
  comentario: z.string().min(10, "Comentario muy corto"),
});
type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isWishlisted, addToCompare, compareList, getStock } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState(REVIEWS[id ?? ""] ?? []);
  const [reviewSent, setReviewSent] = useState(false);

  const form = useForm<ReviewFormValues>({ resolver: zodResolver(reviewSchema), defaultValues: { autor: "", rating: 5, comentario: "" } });

  if (!product) {
    return (
      <PageLayout title="Producto no encontrado">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Producto no encontrado</h1>
          <Button asChild><Link href="/tienda">Volver a la tienda</Link></Button>
        </div>
      </PageLayout>
    );
  }

  const stock = getStock(product.id);
  const wishlisted = isWishlisted(product.id);
  const inCompare = compareList.includes(product.id);
  const related = PRODUCTS.filter((p) => p.categoria === product.categoria && p.id !== product.id).slice(0, 4);

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : product.rating;

  const onSubmitReview = (data: ReviewFormValues) => {
    const newReview = { id: `r-${Date.now()}`, ...data, fecha: new Date().toISOString().split("T")[0], verificado: false };
    setReviews((prev) => [newReview, ...prev]);
    setReviewSent(true);
    form.reset();
    toast.success("¡Reseña publicada!");
  };

  const stockPct = Math.min(100, (stock / product.stock) * 100);
  const stockColor = stock === 0 ? "bg-red-500" : stock < 5 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <PageLayout title={product.nombre}>
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Inicio</Link> /
          <Link href="/tienda" className="hover:text-primary">Tienda</Link> /
          <Link href={`/tienda/${product.categoria}`} className="hover:text-primary capitalize">{product.categoria.replace(/-/g, " ")}</Link> /
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.imagenes[selectedImage]}
                alt={product.nombre}
                className="w-full h-full object-cover transition-opacity duration-300"
                data-testid="img-product-main"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${product.badge === "NUEVO" ? "bg-secondary text-secondary-foreground animate-pulse" : "bg-primary text-primary-foreground"}`}>
                  {product.badge}
                </span>
              )}
            </div>
            {product.imagenes.length > 1 && (
              <div className="flex gap-3">
                {product.imagenes.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-primary" : "border-transparent"}`}
                    data-testid={`button-thumb-${i}`}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <Link href={`/tienda/${product.categoria}`} className="text-xs font-semibold text-primary uppercase tracking-wider hover:underline">
                {product.categoria.replace(/-/g, " ")}
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mt-1 mb-2" data-testid="text-product-nombre">{product.nombre}</h1>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{avgRating.toFixed(1)} ({reviews.length || product.reviews} reseñas)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary" data-testid="text-product-precio">${product.precio.toLocaleString("es-AR")}</span>
              {product.precioAnterior && (
                <>
                  <span className="text-xl text-muted-foreground line-through">${product.precioAnterior.toLocaleString("es-AR")}</span>
                  <Badge variant="secondary">-{Math.round((1 - product.precio / product.precioAnterior) * 100)}%</Badge>
                </>
              )}
            </div>

            {/* Apto */}
            <div className="flex flex-wrap gap-2">
              {product.apto.map((a) => (
                <span key={a} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize flex items-center gap-1">
                  <CheckCircle2 size={12} /> {a}
                </span>
              ))}
            </div>

            {/* Stock */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Stock disponible</span>
                <span className={`font-medium ${stock === 0 ? "text-red-500" : stock < 5 ? "text-amber-600" : "text-emerald-600"}`}>
                  {stock === 0 ? "Sin stock" : stock < 5 ? `¡Solo ${stock} restantes!` : `${stock} disponibles`}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${stockColor} rounded-full transition-all duration-500`} style={{ width: `${stockPct}%` }} />
              </div>
            </div>

            <Separator />

            {/* Qty + Add to cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-muted transition-colors" aria-label="Disminuir" data-testid="button-qty-decrease">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-bold min-w-[3rem] text-center" data-testid="text-qty">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(stock, q + 1))} className="px-4 py-2 hover:bg-muted transition-colors" aria-label="Aumentar" data-testid="button-qty-increase">
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-foreground">${(product.precio * qty).toLocaleString("es-AR")}</span>
                </span>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gap-2 text-base" size="lg" onClick={() => addToCart(product, qty)} disabled={stock === 0} data-testid="button-add-to-cart">
                  <ShoppingCart size={20} />
                  {stock === 0 ? "Sin stock" : "Agregar al carrito"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => toggleWishlist(product.id)} className={wishlisted ? "text-red-500 border-red-200" : ""} aria-label="Favorito" data-testid="button-wishlist">
                  <Heart size={20} className={wishlisted ? "fill-red-500" : ""} />
                </Button>
                <Button variant="outline" size="lg" onClick={() => addToCompare(product.id)} className={inCompare ? "text-primary border-primary" : ""} aria-label="Comparar" data-testid="button-compare">
                  <BarChart2 size={20} />
                </Button>
              </div>
            </div>

            {/* Nutri quick */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Proteínas", value: `${product.proteinas}g` },
                { label: "Calorías", value: `${product.calorias} kcal` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="font-bold text-lg text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="descripcion" className="mb-16">
          <TabsList className="mb-6 flex-wrap h-auto gap-2">
            <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            <TabsTrigger value="ingredientes">Ingredientes</TabsTrigger>
            <TabsTrigger value="nutricional">Información nutricional</TabsTrigger>
            <TabsTrigger value="resenas">Opiniones ({reviews.length || product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="descripcion">
            <div className="max-w-2xl prose prose-sm text-muted-foreground">
              <p className="text-base leading-relaxed">{product.descripcion}</p>
              <p className="mt-4">Este producto es ideal para quienes buscan incorporar hábitos saludables sin renunciar al sabor. Seleccionado por nuestro equipo de nutricionistas para garantizar el mejor balance de nutrientes.</p>
            </div>
          </TabsContent>

          <TabsContent value="ingredientes">
            <div className="max-w-lg">
              <ul className="space-y-2">
                {product.ingredientes.map((ing) => (
                  <li key={ing} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="nutricional">
            <div className="max-w-sm">
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-primary text-primary-foreground px-4 py-3">
                  <p className="font-bold">Información nutricional</p>
                  <p className="text-xs text-primary-foreground/70">Por porción de 100g</p>
                </div>
                {[
                  { label: "Calorías", value: `${product.calorias} kcal` },
                  { label: "Proteínas", value: `${product.proteinas}g` },
                  { label: "Grasas totales", value: "—" },
                  { label: "Hidratos de carbono", value: "—" },
                  { label: "Fibra alimentaria", value: "—" },
                  { label: "Sodio", value: "—" },
                ].map(({ label, value }, i) => (
                  <div key={label} className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resenas">
            <div className="max-w-2xl space-y-6">
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-5 bg-card border border-card-border rounded-2xl">
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary">{avgRating.toFixed(1)}</p>
                  <div className="flex justify-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{reviews.length || product.reviews} reseñas</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const count = reviews.filter((r) => r.rating === s).length;
                    const pct = reviews.length ? (count / reviews.length) * 100 : s === 5 ? 70 : s === 4 ? 20 : 10;
                    return (
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-right">{s}</span>
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-6">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews list */}
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-border pb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center font-bold text-sm text-primary">
                      {r.autor[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{r.autor} {r.verificado && <span className="text-xs text-emerald-600 font-normal">✓ Cliente verificado</span>}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />)}
                        </div>
                        <span className="text-xs text-muted-foreground">{r.fecha}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comentario}</p>
                </div>
              ))}

              {/* Write review form */}
              {reviewSent ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 rounded-xl p-4 text-center text-sm text-emerald-700 dark:text-emerald-400">
                  ✓ ¡Tu reseña fue publicada!
                </div>
              ) : (
                <div className="bg-muted/40 rounded-2xl p-5">
                  <h3 className="font-serif font-bold text-lg mb-4">Dejar una reseña</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                      <FormField control={form.control} name="autor" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tu nombre</FormLabel>
                          <FormControl><Input placeholder="Nombre" {...field} data-testid="input-review-autor" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="rating" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calificación</FormLabel>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button key={s} type="button" onClick={() => field.onChange(s)} className="p-1" aria-label={`${s} estrellas`}>
                                <Star size={24} className={s <= field.value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                              </button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="comentario" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comentario</FormLabel>
                          <FormControl><Textarea placeholder="¿Qué te pareció el producto?" rows={3} {...field} data-testid="textarea-review-comentario" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" data-testid="button-review-submit">Publicar reseña</Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
