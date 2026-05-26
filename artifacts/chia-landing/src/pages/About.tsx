import { useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Leaf, Heart, Shield, Award } from "lucide-react";

const TEAM = [
  { nombre: "Valentina Moreno", rol: "Fundadora & Nutricionista", bio: "Licenciada en Nutrición (UBA). Creó CHÍA en 2019 con la misión de hacer accesibles los alimentos reales.", imagen: "https://picsum.photos/seed/team-val/300/300" },
  { nombre: "Martín Gutiérrez", rol: "Chef & Desarrollo de Producto", bio: "Chef profesional especializado en cocina saludable. Responsable de todas las recetas y productos de CHÍA.", imagen: "https://picsum.photos/seed/team-martin/300/300" },
  { nombre: "Camila López", rol: "Directora de Operaciones", bio: "Ingeniería Industrial. Garantiza que cada producto llegue a tiempo y con la máxima calidad.", imagen: "https://picsum.photos/seed/team-cami/300/300" },
  { nombre: "Lucas Fernández", rol: "Comunidad & Marketing", bio: "Apasionado del wellness y las redes sociales. Conecta a la comunidad CHÍA con contenido que inspira.", imagen: "https://picsum.photos/seed/team-lucas/300/300" },
];



const VALUES = [
  { icon: Leaf, title: "Ingredientes Reales", desc: "Cada producto usa ingredientes que podés pronunciar. Sin rellenos, sin aditivos escondidos." },
  { icon: Heart, title: "Sin Culpa", desc: "Comer bien no debería ser un sacrificio. Nuestros productos demuestran que saludable puede ser delicioso." },
  { icon: Shield, title: "Transparencia Total", desc: "Todos nuestros ingredientes y procesos son auditables. Nada que esconder." },
  { icon: Award, title: "Calidad Constante", desc: "Cada lote pasa por control de calidad. Si no cumple nuestros estándares, no llega a tu mesa." },
];

export default function About() {
  const heroRef = useScrollAnimation("fadeUp");
  const valuesRef = useScrollAnimation("staggerFadeUp");
  const teamRef = useScrollAnimation("staggerFadeUp");

  return (
    <PageLayout title="Nosotros">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_white,_transparent_60%)]" />
        <div ref={heroRef} className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/70 mb-4">Nuestra historia</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Creemos que comer bien es un acto de amor propio
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            CHÍA nació en 2019 en una cocina de Palermo Soho con una idea simple: el alimento real no debería ser un lujo ni un sacrificio. Hoy somos +15.000 personas que eligieron nutrir su cuerpo con conciencia.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Nuestros valores</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Todo lo que hacemos parte de estos cuatro pilares.</p>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-card-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foto Instagram */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Nuestro camino</h2>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative max-w-xl w-full rounded-3xl overflow-hidden shadow-xl border border-border">
              <img
                src="/chia-apertura.jpg"
                alt="Apertura de CHÍA Espacio Saludable"
                className="w-full h-auto block"
              />
            </div>
            <p className="text-center text-muted-foreground italic max-w-md text-base">
              "¡Gracias por ser parte de este día tan hermoso! Bienvenidos a CHÍA 🌿"
            </p>
            <a
              href="https://www.instagram.com/p/DRs8j5pEUw9/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Ver en Instagram · @chiasalud
            </a>
          </div>
        </div>
      </section>


      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">El equipo</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Las personas detrás de cada producto que llega a tu mesa.</p>
          </div>
          <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.nombre} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={member.imagen} alt={member.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-serif font-bold text-lg">{member.nombre}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.rol}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-primary/5 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl font-bold mb-4">Certificaciones y reconocimientos</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {["Sin TACC Certificado", "Vegano Verificado", "Sin Sellos (ANMAT)", "INAL Registrado", "Producción Nacional"].map((c) => (
              <div key={c} className="bg-card border border-card-border rounded-xl px-6 py-4 font-medium text-sm">
                ✓ {c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
