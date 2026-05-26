import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Truck, CreditCard, Banknote, ChevronRight, Package } from "lucide-react";
import { Link } from "wouter";

const PROVINCIAS = ["Capital Federal", "Buenos Aires GBA", "Buenos Aires Interior", "Córdoba", "Santa Fe", "Mendoza", "Resto del país"];

const ENVIO_BASE: Record<string, number> = {
  "Capital Federal": 0,
  "Buenos Aires GBA": 700,
  "Buenos Aires Interior": 1000,
  "Córdoba": 1200,
  "Santa Fe": 1200,
  "Mendoza": 1400,
  "Resto del país": 1800,
};

const step1Schema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  apellido: z.string().min(2, "Apellido requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(8, "Teléfono requerido"),
  provincia: z.string().min(1, "Seleccioná una provincia"),
  ciudad: z.string().min(2, "Ciudad requerida"),
  direccion: z.string().min(5, "Dirección requerida"),
  codigoPostal: z.string().min(4, "Código postal requerido"),
});

const step3Schema = z.object({
  cardNumber: z.string().min(16, "Número de tarjeta inválido"),
  cardName: z.string().min(3, "Nombre requerido"),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, "Formato MM/YY"),
  cardCvv: z.string().min(3, "CVV inválido"),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step3Values = z.infer<typeof step3Schema>;

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [shipMethod, setShipMethod] = useState("estandar");
  const [payMethod, setPayMethod] = useState("tarjeta");
  const [shippingData, setShippingData] = useState<Step1Values | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const { cartItems, cartTotal, appliedCoupon, clearCart, addOrder } = useApp();
  const activeItems = cartItems.filter((i) => !i.savedForLater);

  const discount = appliedCoupon ? cartTotal * appliedCoupon.discount : 0;
  const baseShip = shippingData ? (ENVIO_BASE[shippingData.provincia] ?? 1800) : 700;
  const shipCost = shipMethod === "retiro" ? 0 : shipMethod === "express" ? Math.round(baseShip * 1.6) : baseShip;
  const total = cartTotal - discount + shipCost;

  const form1 = useForm<Step1Values>({ resolver: zodResolver(step1Schema) });
  const form3 = useForm<Step3Values>({ resolver: zodResolver(step3Schema) });

  const onStep1 = (data: Step1Values) => { setShippingData(data); setStep(2); };
  const onStep2 = () => setStep(3);
  const onStep3 = (_data: Step3Values) => {
    setLoading(true);
    setTimeout(() => {
      const orderId = addOrder({
        total,
        items: activeItems,
        estado: "Procesando",
        envio: { metodo: shipMethod, costo: shipCost, direccion: `${shippingData?.direccion}, ${shippingData?.ciudad}` },
      });
      clearCart();
      setLocation(`/confirmacion/${orderId}`);
    }, 2000);
  };

  const steps = [
    { label: "Envío", icon: Truck },
    { label: "Método", icon: Package },
    { label: "Pago", icon: CreditCard },
  ];

  const formatCard = (v: string) => v.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, ""); return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2, 4)}` : d; };

  const OrderSummary = () => (
    <div className="bg-card border border-card-border rounded-2xl p-5 sticky top-28 space-y-4">
      <h3 className="font-serif font-bold text-lg">Resumen</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {activeItems.map((item) => (
          <div key={item.product.id} className="flex gap-3 text-sm">
            <img src={item.product.imagenes[0]} alt={item.product.nombre} className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.product.nombre}</p>
              <p className="text-muted-foreground">x{item.cantidad}</p>
            </div>
            <p className="font-medium">${(item.product.precio * item.cantidad).toLocaleString("es-AR")}</p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${cartTotal.toLocaleString("es-AR")}</span></div>
        {discount > 0 && <div className="flex justify-between text-emerald-600"><span>Descuento</span><span>-${discount.toLocaleString("es-AR")}</span></div>}
        <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{shipCost === 0 ? "Gratis" : `$${shipCost.toLocaleString("es-AR")}`}</span></div>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">${total.toLocaleString("es-AR")}</span></div>
    </div>
  );

  return (
    <PageLayout title="Checkout">
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        <h1 className="font-serif text-3xl font-bold mb-8">Finalizar compra</h1>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {steps.map(({ label, icon: Icon }, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step > i + 1 ? "bg-primary text-primary-foreground" : step === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step > i + 1 ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                </div>
                <span className={`text-xs mt-1 font-medium ${step === i + 1 ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px mx-3 ${step > i + 1 ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Shipping details */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-5 flex items-center gap-2"><Truck size={20} /> Datos de envío</h2>
                <Form {...form1}>
                  <form onSubmit={form1.handleSubmit(onStep1)} className="space-y-4" data-testid="form-checkout-step1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form1.control} name="nombre" render={({ field }) => (
                        <FormItem><FormLabel>Nombre *</FormLabel><FormControl><Input {...field} data-testid="input-nombre" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form1.control} name="apellido" render={({ field }) => (
                        <FormItem><FormLabel>Apellido *</FormLabel><FormControl><Input {...field} data-testid="input-apellido" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form1.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} data-testid="input-email" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form1.control} name="telefono" render={({ field }) => (
                        <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input placeholder="(011) 1234-5678" {...field} data-testid="input-telefono" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form1.control} name="provincia" render={({ field }) => (
                        <FormItem><FormLabel>Provincia *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger data-testid="select-provincia"><SelectValue placeholder="Seleccioná" /></SelectTrigger></FormControl>
                            <SelectContent>{PROVINCIAS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                          </Select><FormMessage /></FormItem>
                      )} />
                      <FormField control={form1.control} name="ciudad" render={({ field }) => (
                        <FormItem><FormLabel>Ciudad *</FormLabel><FormControl><Input {...field} data-testid="input-ciudad" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <FormField control={form1.control} name="direccion" render={({ field }) => (
                        <FormItem className="col-span-2"><FormLabel>Dirección *</FormLabel><FormControl><Input placeholder="Calle y número" {...field} data-testid="input-direccion" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form1.control} name="codigoPostal" render={({ field }) => (
                        <FormItem><FormLabel>Cód. Postal *</FormLabel><FormControl><Input {...field} data-testid="input-cp" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <Button type="submit" className="w-full gap-2 mt-2" data-testid="button-step1-next">
                      Continuar <ChevronRight size={18} />
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {/* Step 2: Shipping method */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-5 flex items-center gap-2"><Package size={20} /> Método de envío</h2>
                <div className="space-y-3">
                  {[
                    { value: "estandar", label: "Envío estándar", desc: "3-5 días hábiles", precio: 700 },
                    { value: "express", label: "Envío express", desc: "1-2 días hábiles", precio: 1800 },
                    { value: "retiro", label: "Retiro en local", desc: "Av. Santa Fe 2300, CABA", precio: 0 },
                  ].map((m) => (
                    <label key={m.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${shipMethod === m.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`} data-testid={`option-ship-${m.value}`}>
                      <input type="radio" name="ship" value={m.value} checked={shipMethod === m.value} onChange={() => setShipMethod(m.value)} className="accent-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{m.label}</p>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                      <p className="font-bold text-primary">{m.precio === 0 ? "Gratis" : `$${m.precio.toLocaleString("es-AR")}`}</p>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} data-testid="button-step2-back">Volver</Button>
                  <Button className="flex-1 gap-2" onClick={onStep2} data-testid="button-step2-next">Continuar <ChevronRight size={18} /></Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-5 flex items-center gap-2"><CreditCard size={20} /> Método de pago</h2>
                <div className="flex gap-3 mb-6">
                  {[
                    { value: "tarjeta", label: "Tarjeta", icon: CreditCard },
                    { value: "transferencia", label: "Transferencia", icon: Banknote },
                    { value: "efectivo", label: "MercadoPago", icon: Banknote },
                  ].map(({ value, label, icon: Icon }) => (
                    <button key={value} onClick={() => setPayMethod(value)} className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium ${payMethod === value ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"}`} data-testid={`option-pay-${value}`}>
                      <Icon size={20} /> {label}
                    </button>
                  ))}
                </div>

                {payMethod === "tarjeta" && (
                  <Form {...form3}>
                    <form onSubmit={form3.handleSubmit(onStep3)} className="space-y-4" data-testid="form-checkout-step3">
                      <FormField control={form3.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Número de tarjeta</FormLabel>
                          <FormControl><Input placeholder="1234 5678 9012 3456" {...field} onChange={(e) => field.onChange(formatCard(e.target.value))} maxLength={19} data-testid="input-card-number" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form3.control} name="cardName" render={({ field }) => (
                        <FormItem><FormLabel>Nombre en la tarjeta</FormLabel>
                          <FormControl><Input placeholder="NOMBRE APELLIDO" {...field} data-testid="input-card-name" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form3.control} name="cardExpiry" render={({ field }) => (
                          <FormItem><FormLabel>Vencimiento</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} onChange={(e) => field.onChange(formatExpiry(e.target.value))} maxLength={5} data-testid="input-card-expiry" /></FormControl>
                            <FormMessage /></FormItem>
                        )} />
                        <FormField control={form3.control} name="cardCvv" render={({ field }) => (
                          <FormItem><FormLabel>CVV</FormLabel>
                            <FormControl><Input placeholder="123" type="password" maxLength={4} {...field} data-testid="input-card-cvv" /></FormControl>
                            <FormMessage /></FormItem>
                        )} />
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> Pago simulado — no se realizarán cargos reales</p>
                      <div className="flex gap-3 mt-2">
                        <Button variant="outline" type="button" onClick={() => setStep(2)} data-testid="button-step3-back">Volver</Button>
                        <Button type="submit" className="flex-1" disabled={loading} data-testid="button-confirm-order">
                          {loading ? "Procesando..." : `Confirmar pedido — $${total.toLocaleString("es-AR")}`}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {payMethod !== "tarjeta" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-5 text-sm text-muted-foreground">
                      {payMethod === "transferencia"
                        ? "Realizá una transferencia a: CBU 0000000000000000000000 · Titular: CHÍA Espacio Saludable SRL"
                        : "Serás redirigido a MercadoPago para completar el pago de forma segura."}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> Pago simulado — no se realizarán cargos reales</p>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} data-testid="button-step3-back-alt">Volver</Button>
                      <Button className="flex-1" disabled={loading} onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          const orderId = addOrder({ total, items: activeItems, estado: "Procesando", envio: { metodo: shipMethod, costo: shipCost, direccion: `${shippingData?.direccion}, ${shippingData?.ciudad}` } });
                          clearCart();
                          setLocation(`/confirmacion/${orderId}`);
                        }, 1500);
                      }} data-testid="button-confirm-alt">
                        {loading ? "Procesando..." : `Confirmar pedido — $${total.toLocaleString("es-AR")}`}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
