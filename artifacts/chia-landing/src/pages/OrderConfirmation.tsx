import { useParams, Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight, Download } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useApp();
  const order = orders.find((o) => o.id === orderId);
  const checkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!checkRef.current) return;
    gsap.fromTo(checkRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 });
  }, []);

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  return (
    <PageLayout title="Confirmación de pedido">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-2xl text-center">
        <CheckCircle2 ref={checkRef} size={80} className="text-primary mx-auto mb-6" />
        <h1 className="font-serif text-4xl font-bold mb-3">¡Pedido confirmado!</h1>
        <p className="text-muted-foreground text-lg mb-2">Tu pedido fue recibido correctamente.</p>
        <p className="text-primary font-bold text-xl mb-8">Número de orden: {orderId}</p>

        {order && (
          <div className="bg-card border border-card-border rounded-2xl p-6 text-left mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Fecha</p>
                <p className="font-medium">{new Date(order.fecha).toLocaleDateString("es-AR")}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estado</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full">{order.estado}</span>
              </div>
              <div>
                <p className="text-muted-foreground">Método de envío</p>
                <p className="font-medium capitalize">{order.envio.metodo}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Entrega estimada</p>
                <p className="font-medium">{estimatedDate.toLocaleDateString("es-AR")}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-medium mb-3">Productos</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-sm">
                    <img src={item.product.imagenes[0]} alt={item.product.nombre} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="flex-1">{item.product.nombre} x{item.cantidad}</span>
                    <span className="font-medium">${(item.product.precio * item.cantidad).toLocaleString("es-AR")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
              <span>Total pagado</span>
              <span className="text-primary">${order.total.toLocaleString("es-AR")}</span>
            </div>
          </div>
        )}

        {/* Tracking steps */}
        <div className="bg-muted/40 rounded-2xl p-6 text-left mb-8">
          <h2 className="font-serif font-bold text-lg mb-4 flex items-center gap-2"><Package size={18} /> Seguimiento del pedido</h2>
          <div className="space-y-3">
            {[
              { label: "Pedido recibido", done: true },
              { label: "En preparación", done: false },
              { label: "En camino", done: false },
              { label: "Entregado", done: false },
            ].map(({ label, done }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? "bg-primary text-primary-foreground" : "bg-muted border-2 border-border"}`}>
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-sm ${done ? "font-medium" : "text-muted-foreground"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="gap-2" data-testid="button-go-orders">
            <Link href="/cuenta"><Package size={18} /> Ver mis órdenes</Link>
          </Button>
          <Button variant="outline" asChild className="gap-2" data-testid="button-continue-shopping">
            <Link href="/tienda"><ArrowRight size={18} /> Seguir comprando</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
