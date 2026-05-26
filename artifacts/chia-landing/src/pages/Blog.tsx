import { useState } from "react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { BLOG_POSTS } from "@/data/blog";
import { Calendar, User, ArrowRight } from "lucide-react";

const CATEGORIAS = ["Todos", "nutricion", "lifestyle"];

export default function Blog() {
  const [cat, setCat] = useState("Todos");
  const filtered = cat === "Todos" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.categoria === cat);
  const [featured, ...rest] = filtered;

  return (
    <PageLayout title="Blog">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Contenido que nutre</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Blog de CHÍA</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Tips, guías y ciencia para entender mejor qué ponés en tu cuerpo.</p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-20 z-30 py-4">
        <div className="container mx-auto px-4 md:px-6 flex gap-3">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted-foreground/20"}`}
              data-testid={`filter-blog-${c}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 space-y-10">
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.id}`} className="group grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all" data-testid={`card-blog-featured-${featured.id}`}>
            <div className="overflow-hidden aspect-video md:aspect-auto md:h-full">
              <img src={featured.imagen} alt={featured.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3 capitalize">{featured.categoria}</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{featured.titulo}</h2>
              <p className="text-muted-foreground mb-5">{featured.extracto}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1"><User size={14} /> {featured.autor}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(featured.fecha).toLocaleDateString("es-AR")}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">Leer artículo <ArrowRight size={16} /></span>
            </div>
          </Link>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-300" data-testid={`card-blog-${post.id}`}>
                <div className="aspect-video overflow-hidden">
                  <img src={post.imagen} alt={post.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider capitalize">{post.categoria}</span>
                  <h3 className="font-serif font-bold text-xl mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.titulo}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.extracto}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.autor}</span>
                    <span>·</span>
                    <span>{new Date(post.fecha).toLocaleDateString("es-AR")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
