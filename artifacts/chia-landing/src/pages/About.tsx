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

const TIMELINE = [
  { año: "2019", hito: "Nacimiento de CHÍA en una cocina de Palermo Soho con 3 productos artesanales." },
  { año: "2020", hito: "Lanzamos nuestra primera línea de pastas de frutos secos, incluyendo TRIBA." },
  { año: "2021", hito: "Superamos los 5.000 clientes y comenzamos envíos a todo el país." },
  { año: "2023", hito: "Obtenemos certificación sin TACC y ampliamos a 30+ productos." },
  { año: "2024", hito: "Lanzamos el espacio de recetas y alcanzamos los 15.000 clientes activos." },
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
  const timelineRef = useScrollAnimation("fadeUp");
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

      {/* Timeline */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Nuestro camino</h2>
          </div>
          <div ref={timelineRef} className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {TIMELINE.map(({ año, hito }) => (
                <div key={año} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-sm">
                    {año.slice(2)}
                  </div>
                  <div className="flex-1 bg-card border border-card-border rounded-xl p-4">
                    <p className="font-bold text-primary text-sm mb-1">{año}</p>
                    <p className="text-sm text-muted-foreground">{hito}</p>
                  </div>
                </div>
              ))}
            </div>
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
