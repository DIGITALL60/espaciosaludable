import { PageLayout } from "@/components/layout/PageLayout";
import { CreditCard, Shield, Smartphone, Building2 } from "lucide-react";

const METODOS = [
  {
    icon: CreditCard,
    titulo: "Tarjetas de crédito y débito",
    descripcion: "Aceptamos Visa, Mastercard y American Express. Hasta 6 cuotas sin interés en compras superiores a $5.000.",
    marcas: ["Visa", "Mastercard", "Amex"],
  },
  {
    icon: Smartphone,
    titulo: "MercadoPago",
    descripcion: "Pagá con tu saldo de MercadoPago, billetera virtual, o vinculando tus tarjetas. Rápido y seguro.",
    marcas: ["Saldo MP", "QR", "Link de pago"],
  },
  {
    icon: Building2,
    titulo: "Transferencia bancaria",
    descripcion: "Realizá una transferencia a nuestra cuenta y enviá el comprobante. Tu pedido se procesa al confirmar el pago.",
    marcas: ["Alias: chia.espacio", "CBU: consultar por email"],
  },
];

export default function Pagos() {
  return (
    <PageLayout title="Formas de Pago">
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Formas de Pago</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ofrecemos múltiples opciones para que puedas pagar de la manera que más te convenga.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {METODOS.map(({ icon: Icon, titulo, descripcion, marcas }) => (
              <div key={titulo} className="bg-card rounded-2xl border border-border p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{titulo}</h3>
                <p className="text-muted-foreground text-sm mb-4">{descripcion}</p>
                <div className="flex flex-wrap gap-2">
                  {marcas.map((m) => (
                    <span key={m} className="text-xs bg-muted rounded-full px-3 py-1 font-medium">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex items-start gap-4">
            <Shield size={32} className="text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Compra 100% segura</h3>
              <p className="text-muted-foreground">
                Todas las transacciones en CHÍA están protegidas con cifrado SSL. No almacenamos datos de tarjetas.
                Procesamos pagos a través de plataformas certificadas bajo el estándar PCI-DSS para garantizar
                la seguridad de tu información en todo momento.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Cuotas sin interés</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-2 bg-muted px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Cuotas</span>
                <span>Compra mínima</span>
              </div>
              {[
                { cuotas: "1 pago", minimo: "Sin mínimo" },
                { cuotas: "3 cuotas sin interés", minimo: "$3.000" },
                { cuotas: "6 cuotas sin interés", minimo: "$5.000" },
              ].map((r, i) => (
                <div key={r.cuotas} className={`grid grid-cols-2 px-6 py-4 ${i < 2 ? "border-b border-border" : ""}`}>
                  <span className="font-medium text-sm">{r.cuotas}</span>
                  <span className="text-sm text-muted-foreground">{r.minimo}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">* Aplica a tarjetas participantes. Consultá condiciones con tu banco emisor.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
