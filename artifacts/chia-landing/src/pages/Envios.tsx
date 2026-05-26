import { PageLayout } from "@/components/layout/PageLayout";
import { Truck, Clock, MapPin, RotateCcw, Package, CheckCircle2 } from "lucide-react";

const TARIFAS = [
  { zona: "Capital Federal", plazo: "24–48 hs hábiles", costo: "Gratis en compras +$3.000", costoBase: "$0 (mínimo $3.000)" },
  { zona: "Buenos Aires GBA", plazo: "24–48 hs hábiles", costo: "$700", costoBase: "$700" },
  { zona: "Buenos Aires Interior", plazo: "2–3 días hábiles", costo: "$1.000", costoBase: "$1.000" },
  { zona: "Córdoba", plazo: "3–4 días hábiles", costo: "$1.200", costoBase: "$1.200" },
  { zona: "Santa Fe", plazo: "3–4 días hábiles", costo: "$1.200", costoBase: "$1.200" },
  { zona: "Mendoza", plazo: "4–5 días hábiles", costo: "$1.400", costoBase: "$1.400" },
  { zona: "Resto del país", plazo: "5–7 días hábiles", costo: "$1.800", costoBase: "$1.800" },
];

export default function Envios() {
  return (
    <PageLayout title="Envíos y Devoluciones">
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Envíos y Devoluciones</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Queremos que tu experiencia sea lo más simple y rápida posible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Truck, title: "Envío rápido", desc: "Despachamos en el día para pedidos realizados antes de las 13:00 hs." },
              { icon: Package, title: "Empaque cuidado", desc: "Cada producto se empaca con materiales reciclables para proteger tu pedido." },
              { icon: RotateCcw, title: "Devolución sencilla", desc: "7 días para devolver sin preguntas. Reposición o reintegro garantizado." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tarifas */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Tarifas de envío estándar</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-muted px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Zona</span>
                <span className="text-center">Plazo estimado</span>
                <span className="text-right">Costo</span>
              </div>
              {TARIFAS.map((t, i) => (
                <div key={t.zona} className={`grid grid-cols-3 px-6 py-4 items-center ${i < TARIFAS.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-primary shrink-0" />
                    <span className="font-medium text-sm">{t.zona}</span>
                  </div>
                  <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Clock size={13} />
                    {t.plazo}
                  </div>
                  <div className="text-right font-semibold text-sm text-primary">{t.costo}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">* Los plazos son estimativos y pueden variar en fechas especiales o por demanda del servicio de correo.</p>
          </div>

          {/* Devoluciones */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-bold mb-6">Política de devoluciones</h2>
            <div className="space-y-4">
              {[
                "Tenés 7 días desde la recepción del pedido para solicitar una devolución.",
                "El producto debe estar sin abrir, en su envase original y en perfecto estado.",
                "Productos con defectos de fabricación o dañados en el envío se reponen sin costo.",
                "Para iniciar una devolución escribí a hola@chiaespacio.com con tu número de orden.",
                "El reintegro se procesa en 5–10 días hábiles una vez aprobada la devolución.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
