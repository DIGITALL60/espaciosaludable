import { useParams, Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { RECIPES } from "@/data/recipes";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Flame, Users, ArrowLeft, ShoppingCart } from "lucide-react";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = RECIPES.find((r) => r.id === id);
  const { addToCart } = useApp();

  if (!recipe) {
    return (
      <PageLayout title="Receta no encontrada">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Receta no encontrada</h1>
          <Button asChild><Link href="/recetas">Volver a recetas</Link></Button>
        </div>
      </PageLayout>
    );
  }

  const related = RECIPES.filter((r) => r.id !== recipe.id).slice(0, 3);

  const dificultadColor = (d: string) =>
    d === "facil" ? "bg-emerald-100 text-emerald-700" : d === "medio" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";

  return (
    <PageLayout title={recipe.nombre}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={recipe.imagen} alt={recipe.nombre} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-6 pb-8">
          <Link href="/recetas" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft size={16} /> Volver a recetas
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${dificultadColor(recipe.dificultad)}`}>{recipe.dificultad}</span>
            <span className="text-white/70 text-sm capitalize">{recipe.categoria}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">{recipe.nombre}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Stats */}
        <div className="flex flex-wrap gap-6 mb-10 p-5 bg-card border border-card-border rounded-2xl">
          {[
            { icon: Clock, label: "Tiempo", value: `${recipe.tiempo} min` },
            { icon: ChefHat, label: "Dificultad", value: recipe.dificultad },
            { icon: Users, label: "Porciones", value: recipe.porciones },
            { icon: Flame, label: "Calorías", value: `${recipe.calorias} kcal` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-bold capitalize">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Ingredients */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-5">Ingredientes</h2>
            <ul className="space-y-3">
              {recipe.ingredientes.map((ing, i) => {
                const linkedProduct = ing.productoId ? PRODUCTS.find((p) => p.id === ing.productoId) : null;
                return (
                  <li key={i} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
                    <div>
                      <span className="text-sm">{ing.nombre}</span>
                      <span className="text-xs text-muted-foreground ml-2">{ing.cantidad}</span>
                    </div>
                    {linkedProduct && (
                      <Button size="sm" variant="outline" className="text-xs gap-1 h-7 px-2 shrink-0" onClick={() => addToCart(linkedProduct)} data-testid={`button-add-ingredient-${i}`}>
                        <ShoppingCart size={12} /> Agregar
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Steps */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-5">Preparación</h2>
            <ol className="space-y-6">
              {recipe.pasos.map((paso, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-muted-foreground leading-relaxed flex-1">{paso}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs bg-accent/60 text-accent-foreground px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>

        {/* Related recipes */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Más recetas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.id} href={`/receta/${r.id}`} className="group block bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img src={r.imagen} alt={r.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold group-hover:text-primary transition-colors">{r.nombre}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{r.tiempo} min · {r.dificultad}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
