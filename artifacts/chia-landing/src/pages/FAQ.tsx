import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    categoria: "Pedidos & Envíos",
    items: [
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: "Los pedidos en Capital Federal llegan en 24–48 hs hábiles. Para el interior del país, el plazo es de 3–5 días hábiles según la zona.",
      },
      {
        q: "¿Tienen envío gratis?",
        a: "Sí. Los pedidos a Capital Federal con compra mínima de $3.000 tienen envío gratis. Para el resto del país aplicamos tarifas según la zona (podés calcularlas en el carrito).",
      },
      {
        q: "¿Puedo cambiar la dirección de entrega después de hacer el pedido?",
        a: "Podés modificar la dirección hasta 2 horas después de realizar la compra. Escribinos a hola@chiaespacio.com o por WhatsApp.",
      },
      {
        q: "¿Hacen envíos al exterior?",
        a: "Por el momento solo enviamos dentro de Argentina. Estamos trabajando para habilitar envíos internacionales próximamente.",
      },
    ],
  },
  {
    categoria: "Productos",
    items: [
      {
        q: "¿Los productos tienen sellos de advertencia?",
        a: "Muchos de nuestros productos son 'Sin sellos' ya que están formulados para cumplir con la Ley 27.642 de Etiquetado Frontal. Cada producto indica claramente sus atributos.",
      },
      {
        q: "¿Son aptos para celíacos?",
        a: "Algunos productos son sin TACC. Lo indicamos en cada ficha de producto. Si tenés dudas sobre alguno en particular, escribinos.",
      },
      {
        q: "¿Tienen opciones veganas?",
        a: "Sí, contamos con una amplia línea de productos veganos y de origen vegetal. Podés filtrar por 'Vegano' en nuestra tienda.",
      },
      {
        q: "¿Cómo conservo los productos una vez abiertos?",
        a: "Te recomendamos guardar los productos en un lugar fresco y seco, lejos del sol. Los productos de pasta (mantequillas) deben refrigerarse una vez abiertos.",
      },
    ],
  },
  {
    categoria: "Pagos",
    items: [
      {
        q: "¿Qué medios de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), MercadoPago y transferencia bancaria.",
      },
      {
        q: "¿Puedo pagar en cuotas?",
        a: "Sí. Con tarjetas de crédito ofrecemos hasta 6 cuotas sin interés en compras superiores a $5.000.",
      },
      {
        q: "¿Es seguro pagar en la web?",
        a: "Totalmente. Nuestro sitio usa HTTPS y procesamos los pagos a través de plataformas certificadas PCI-DSS. No almacenamos datos de tu tarjeta.",
      },
    ],
  },
  {
    categoria: "Devoluciones & Cambios",
    items: [
      {
        q: "¿Puedo devolver un producto?",
        a: "Aceptamos devoluciones dentro de los 7 días posteriores a la entrega, siempre que el producto esté sin abrir y en perfectas condiciones.",
      },
      {
        q: "¿Qué hago si mi pedido llegó dañado?",
        a: "Si recibiste un producto dañado o en mal estado, tomá una foto y enviánosla a hola@chiaespacio.com. Te reponemos el producto sin costo adicional.",
      },
      {
        q: "¿Cuánto tarda el reintegro del dinero?",
        a: "Una vez aprobada la devolución, el reintegro se procesa en 5–10 días hábiles dependiendo de tu banco o medio de pago.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-primary transition-colors"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <PageLayout title="Preguntas Frecuentes">
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Encontrá respuestas a las dudas más comunes. Si no encontrás lo que buscás,{" "}
            <a href="/contacto" className="text-primary hover:underline">escribinos</a>.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {FAQS.map((section) => (
            <div key={section.categoria} className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-6 text-primary">{section.categoria}</h2>
              <div className="bg-card rounded-2xl border border-border px-6">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
