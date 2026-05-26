import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Package, Truck, Heart, Bell, Eye, EyeOff, CheckCircle2, Download, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

// Password strength helper
function passwordStrength(pass: string): { level: number; label: string; color: string } {
  let score = 0;
  if (pass.length >= 6) score++;
  if (pass.length >= 10) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  if (score <= 1) return { level: score, label: "Débil", color: "bg-red-500" };
  if (score <= 2) return { level: score, label: "Regular", color: "bg-amber-500" };
  if (score <= 3) return { level: score, label: "Buena", color: "bg-blue-500" };
  return { level: score, label: "Muy fuerte", color: "bg-emerald-500" };
}

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña muy corta"),
  remember: z.boolean().optional(),
});

const registerSchema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Las contraseñas no coinciden", path: ["confirmPassword"] });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const TRACKING_STEPS = ["Pedido recibido", "En preparación", "En camino", "Entregado"];

function AuthTabs({ defaultTab }: { defaultTab?: string }) {
  const { login, register } = useApp();
  const [showPass, setShowPass] = useState(false);
  const [passValue, setPassValue] = useState("");

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "", remember: false } });
  const regForm = useForm<RegisterValues>({ resolver: zodResolver(registerSchema), defaultValues: { nombre: "", email: "", password: "", confirmPassword: "" } });

  const strength = passwordStrength(passValue);

  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue={defaultTab === "register" ? "register" : "login"}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="login" className="flex-1" data-testid="tab-login">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="register" className="flex-1" data-testid="tab-register">Registrarse</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit((d) => login(d.email, d.password))} className="space-y-4" data-testid="form-login">
              <FormField control={loginForm.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="tu@email.com" {...field} data-testid="input-login-email" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={loginForm.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <FormControl><Input type={showPass ? "text" : "password"} placeholder="••••••••" {...field} data-testid="input-login-password" /></FormControl>
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Ver contraseña">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-primary" {...loginForm.register("remember")} />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Recordarme</label>
              </div>
              <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting} data-testid="button-login-submit">
                Iniciar sesión
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Podés probar con cualquier email válido y contraseña de 6+ caracteres.
              </p>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="register">
          <Form {...regForm}>
            <form onSubmit={regForm.handleSubmit((d) => register(d.nombre, d.email, d.password))} className="space-y-4" data-testid="form-register">
              <FormField control={regForm.control} name="nombre" render={({ field }) => (
                <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} data-testid="input-reg-nombre" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={regForm.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="tu@email.com" {...field} data-testid="input-reg-email" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={regForm.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input type={showPass ? "text" : "password"} placeholder="••••••••" {...field}
                        onChange={(e) => { field.onChange(e); setPassValue(e.target.value); }}
                        data-testid="input-reg-password"
                      />
                    </FormControl>
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Ver contraseña">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passValue && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength.level ? strength.color : "bg-muted"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Contraseña {strength.label}</p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={regForm.control} name="confirmPassword" render={({ field }) => (
                <FormItem><FormLabel>Confirmar contraseña</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} data-testid="input-reg-confirm" /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={regForm.formState.isSubmitting} data-testid="button-register-submit">
                Crear cuenta
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Dashboard() {
  const { user, orders, logout, updateUser } = useApp();
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState(user?.nombre ?? "");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!user) return null;

  const statusColor = (s: string) =>
    s === "Entregado" ? "bg-emerald-100 text-emerald-700" : s === "Enviado" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700";

  const trackingProgress = (estado: string) => {
    const idx = ["Procesando", "En preparación", "Enviado", "Entregado"].indexOf(estado === "Procesando" ? "Procesando" : estado === "Enviado" ? "Enviado" : "Entregado");
    return Math.max(0, idx);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center font-bold text-xl text-primary">
            {user.nombre[0].toUpperCase()}
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold">Hola, {user.nombre.split(" ")[0]} 👋</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user.isAdmin && (
            <Link href="/admin">
              <Button size="sm" className="gap-2"><LayoutDashboard size={16} /> Panel Admin</Button>
            </Link>
          )}
          <Button variant="outline" size="sm" onClick={logout} data-testid="button-dashboard-logout">Cerrar sesión</Button>
        </div>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="perfil"><User size={14} className="mr-1" />Perfil</TabsTrigger>
          <TabsTrigger value="ordenes"><Package size={14} className="mr-1" />Mis órdenes</TabsTrigger>
          <TabsTrigger value="seguimiento"><Truck size={14} className="mr-1" />Seguimiento</TabsTrigger>
          <TabsTrigger value="notificaciones"><Bell size={14} className="mr-1" />Notificaciones</TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="perfil">
          <div className="bg-card border border-card-border rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold">Mis datos</h3>
              <Button variant="outline" size="sm" onClick={() => setEditing(!editing)} data-testid="button-edit-profile">
                {editing ? "Cancelar" : "Editar"}
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Nombre</label>
                {editing ? (
                  <Input value={nombre} onChange={(e) => setNombre(e.target.value)} className="mt-1" data-testid="input-profile-nombre" />
                ) : (
                  <p className="font-medium mt-1">{user.nombre}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Email</label>
                <p className="font-medium mt-1">{user.email}</p>
              </div>
            </div>
            {editing && (
              <Button onClick={() => { updateUser({ nombre }); setEditing(false); toast.success("Perfil actualizado"); }} data-testid="button-save-profile">
                <CheckCircle2 size={16} className="mr-2" /> Guardar cambios
              </Button>
            )}
          </div>
        </TabsContent>

        {/* Órdenes */}
        <TabsContent value="ordenes">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package size={48} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Sin órdenes aún</h3>
              <p className="text-muted-foreground mb-4">Cuando hagas tu primera compra, aparecerá acá.</p>
              <Button asChild><Link href="/tienda">Ir a la tienda</Link></Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-card border border-card-border rounded-2xl overflow-hidden">
                  <div className="p-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-bold text-primary">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.fecha).toLocaleDateString("es-AR")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(order.estado)}`}>{order.estado}</span>
                      <span className="font-bold">${order.total.toLocaleString("es-AR")}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)} data-testid={`button-expand-order-${order.id}`}>
                        {selectedOrder === order.id ? "Ocultar" : "Ver detalle"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast.info("Factura descargada (simulado)")} data-testid={`button-download-${order.id}`}>
                        <Download size={14} />
                      </Button>
                    </div>
                  </div>
                  {selectedOrder === order.id && (
                    <div className="border-t border-border p-5 bg-muted/30 space-y-2">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex gap-3 text-sm">
                          <img src={item.product.imagenes[0]} alt={item.product.nombre} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="flex-1">{item.product.nombre} x{item.cantidad}</span>
                          <span className="font-medium">${(item.product.precio * item.cantidad).toLocaleString("es-AR")}</span>
                        </div>
                      ))}
                      <div className="text-xs text-muted-foreground mt-2">
                        Envío: {order.envio.metodo} — {order.envio.direccion}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Seguimiento */}
        <TabsContent value="seguimiento">
          {orders.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Truck size={48} className="mx-auto mb-4 opacity-30" />
              <p>No tenés órdenes para rastrear.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const progress = trackingProgress(order.estado);
                return (
                  <div key={order.id} className="bg-card border border-card-border rounded-2xl p-6">
                    <div className="flex justify-between mb-5 flex-wrap gap-2">
                      <p className="font-bold text-primary">{order.id}</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(order.estado)}`}>{order.estado}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
                      <div className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500" style={{ width: `${(progress / 3) * 100}%` }} />
                      <div className="flex justify-between relative">
                        {TRACKING_STEPS.map((step, i) => (
                          <div key={step} className="flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors ${i <= progress ? "bg-primary text-primary-foreground" : "bg-muted border-2 border-border text-muted-foreground"}`}>
                              {i <= progress ? "✓" : i + 1}
                            </div>
                            <span className="text-xs text-center max-w-[70px] leading-tight text-muted-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notificaciones">
          <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold mb-2">Preferencias de notificaciones</h3>
            {[
              { label: "Confirmación de pedido", desc: "Recibí un email cuando tu pedido sea confirmado" },
              { label: "Actualización de envío", desc: "Te avisamos cuando tu pedido esté en camino" },
              { label: "Ofertas y promociones", desc: "Enterate de descuentos y productos nuevos" },
              { label: "Newsletter semanal", desc: "Recetas, tips y novedades de CHÍA" },
            ].map(({ label, desc }, i) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <input type="checkbox" defaultChecked={i < 2} className="accent-primary w-4 h-4" aria-label={label} data-testid={`toggle-notif-${i}`} />
              </div>
            ))}
            <Button onClick={() => toast.success("Preferencias guardadas")} className="mt-2" data-testid="button-save-notif">
              Guardar preferencias
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Account() {
  const { user } = useApp();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const defaultTab = params.get("tab") ?? undefined;

  useEffect(() => {
    if (user?.isAdmin) {
      setLocation("/admin");
    }
  }, [user, setLocation]);

  return (
    <PageLayout title="Mi Cuenta">
      <div className="container mx-auto px-4 md:px-6 py-10">
        {user ? <Dashboard /> : (
          <>
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl font-bold mb-2">Mi Cuenta</h1>
              <p className="text-muted-foreground">Iniciá sesión o creá tu cuenta CHÍA para acceder a tus pedidos y favoritos.</p>
            </div>
            <AuthTabs defaultTab={defaultTab} />
          </>
        )}
      </div>
    </PageLayout>
  );
}
