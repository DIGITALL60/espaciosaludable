import { useParams, Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { BLOG_POSTS } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const commentSchema = z.object({ nombre: z.string().min(2), comentario: z.string().min(10) });
type CommentValues = z.infer<typeof commentSchema>;

const STATIC_COMMENTS = [
  { nombre: "Valentina M.", comentario: "Excelente artículo, justo lo que estaba buscando. Lo comparto con mi nutricionista!", fecha: "hace 2 días" },
  { nombre: "Carlos P.", comentario: "Muy completo y bien explicado. Gracias por el contenido de calidad.", fecha: "hace 1 semana" },
  { nombre: "Laura S.", comentario: "Me ayudó mucho a entender mejor el tema. ¿Hay más artículos sobre esto?", fecha: "hace 2 semanas" },
];

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find((p) => p.id === id);
  const related = BLOG_POSTS.filter((p) => p.id !== id).slice(0, 2);
  const [comments, setComments] = useState(STATIC_COMMENTS);
  const form = useForm<CommentValues>({ resolver: zodResolver(commentSchema), defaultValues: { nombre: "", comentario: "" } });

  if (!post) {
    return (
      <PageLayout title="Artículo no encontrado">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Artículo no encontrado</h1>
          <Button asChild><Link href="/blog">Volver al blog</Link></Button>
        </div>
      </PageLayout>
    );
  }

  const readingTime = Math.ceil(post.contenido.split(" ").length / 200);

  const onSubmit = (data: CommentValues) => {
    setComments((prev) => [{ ...data, fecha: "ahora" }, ...prev]);
    form.reset();
    toast.success("¡Comentario publicado!");
  };

  return (
    <PageLayout title={post.titulo}>
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-6 pb-10">
          <Link href="/blog" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Blog
          </Link>
          <span className="inline-block bg-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 capitalize">{post.categoria}</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white max-w-2xl">{post.titulo}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
            <span className="flex items-center gap-1"><User size={14} /> {post.autor}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.fecha).toLocaleDateString("es-AR")}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {readingTime} min de lectura</span>
          </div>

          {/* Content */}
          <div className="prose prose-sm md:prose-base prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground max-w-none mb-12">
            {post.contenido.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-serif text-2xl font-bold text-foreground mt-8 mb-3">{block.slice(3)}</h2>;
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return <p key={i} className="font-bold text-foreground">{block.slice(2, -2)}</p>;
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {items.map((item, j) => {
                      const text = item.slice(2);
                      const boldMatch = text.match(/^\*\*(.+?)\*\*:(.+)/);
                      return (
                        <li key={j}>
                          {boldMatch ? <><strong className="text-foreground">{boldMatch[1]}</strong>:{boldMatch[2]}</> : text}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              return <p key={i} className="text-muted-foreground leading-relaxed">{block}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((t) => <span key={t} className="text-xs bg-accent/60 px-3 py-1.5 rounded-full">{t}</span>)}
          </div>

          {/* Comments */}
          <div className="border-t border-border pt-10">
            <h2 className="font-serif text-2xl font-bold mb-6">Comentarios ({comments.length})</h2>
            <div className="space-y-5 mb-8">
              {comments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center font-bold text-sm text-primary shrink-0">{c.nombre[0]}</div>
                  <div className="flex-1 bg-muted/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{c.nombre}</span>
                      <span className="text-xs text-muted-foreground">{c.fecha}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.comentario}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment form */}
            <h3 className="font-serif text-xl font-bold mb-4">Dejar un comentario</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-comment">
                <FormField control={form.control} name="nombre" render={({ field }) => (
                  <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} data-testid="input-comment-nombre" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="comentario" render={({ field }) => (
                  <FormItem><FormLabel>Comentario</FormLabel><FormControl><Textarea placeholder="Tu comentario..." rows={4} {...field} data-testid="textarea-comment" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" data-testid="button-comment-submit">Publicar comentario</Button>
              </form>
            </Form>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-bold mb-6">Artículos relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.id}`} className="group flex gap-4 bg-card border border-card-border rounded-xl p-4 hover:shadow-md transition-all">
                    <img src={p.imagen} alt={p.titulo} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">{p.titulo}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{p.autor}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
