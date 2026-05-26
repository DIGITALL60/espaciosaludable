import { useState } from "react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { RECIPES } from "@/data/recipes";
import { Clock, ChefHat, Flame } from "lucide-react";

const CATEGORIAS = ["Todos", "desayunos", "snacks", "bebidas", "almuerzos", "postres"];
const DIFICULTADES = ["Todos", "facil", "medio", "dificil"];

export default function Recetas() {
  const [categoria, setCategoria] = useState("Todos");
  const [dificultad, setDificultad] = useState("Todos");

  const filtered = RECIPES.filter((r) =>
    (categoria === "Todos" || r.categoria === categoria) &&
    (dificultad === "Todos" || r.dificultad === dificultad)
  );

  const dificultadColor = (d: string) =>
    d === "facil" ? "bg-emerald-100 text-emerald-700" : d === "medio" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";

  return (
    <PageLayout title="Recetas">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-accent/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_70%_50%,_var(--color-primary),_transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Recetas saludables</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Come mejor,<br />sentite mejor ♡
            </h1>
            <p className="text-lg text-muted-foreground">
              Ideas deliciosas y simples para incorporar hábitos saludables todos los días.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Categoría:</span>
              {CATEGORIAS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoria(c)}
                  className={`px-3 py-1.5 rounded-full text-sm capitalize transition-colors ${categoria === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted-foreground/20"}`}
                  data-testid={`filter-receta-cat-${c}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Dificultad:</span>
              {DIFICULTADES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDificultad(d)}
                  className={`px-3 py-1.5 rounded-full text-sm capitalize transition-colors ${dificultad === d ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted-foreground/20"}`}
                  data-testid={`filter-receta-dif-${d}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-2xl mb-2">🥗</p>
              <p className="font-medium">No hay recetas con esos filtros</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((recipe) => (
                <Link key={recipe.id} href={`/receta/${recipe.id}`} className="group block bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-recipe-${recipe.id}`}>
                  <div className="relative overflow-hidden aspect-video">
                    <img src={recipe.imagen} alt={recipe.nombre} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full capitalize ${dificultadColor(recipe.dificultad)}`}>
                      {recipe.dificultad}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">{recipe.categoria}</span>
                    <h3 className="font-serif font-bold text-xl mt-1 mb-3 group-hover:text-primary transition-colors">{recipe.nombre}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={14} /> {recipe.tiempo} min</span>
                      <span className="flex items-center gap-1"><ChefHat size={14} /> {recipe.porciones} porciones</span>
                      <span className="flex items-center gap-1"><Flame size={14} /> {recipe.calorias} cal</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
