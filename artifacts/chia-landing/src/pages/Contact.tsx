import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  nombre: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  asunto: z.string().min(1, "Seleccioná un asunto"),
  mensaje: z.string().min(20, "El mensaje debe tener al menos 20 caracteres"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { nombre: "", email: "", asunto: "", mensaje: "" } });

  const onSubmit = (_data: FormValues) => {
    setTimeout(() => {
      setSent(true);
      toast.success("¡Mensaje enviado! Te responderemos pronto.");
    }, 800);
  };

  return (
    <PageLayout title="Contacto">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Hablemos</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Estamos acá para ayudarte. Escribinos y te respondemos en menos de 24hs.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Envianos un mensaje</h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-card-border rounded-2xl">
                  <CheckCircle2 size={64} className="text-primary mb-4" />
                  <h3 className="font-serif text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground mb-6">Te respondemos en menos de 24hs hábiles.</p>
                  <Button onClick={() => { setSent(false); form.reset(); }} variant="outline">Enviar otro mensaje</Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="nombre" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl><Input placeholder="Tu nombre" {...field} data-testid="input-contact-nombre" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl><Input type="email" placeholder="tu@email.com" {...field} data-testid="input-contact-email" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="asunto" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asunto *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-contact-asunto"><SelectValue placeholder="Seleccioná el motivo" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="consulta">Consulta general</SelectItem>
                            <SelectItem value="pedido">Sobre un pedido</SelectItem>
                            <SelectItem value="devolucion">Devoluciones</SelectItem>
                            <SelectItem value="producto">Consulta de producto</SelectItem>
                            <SelectItem value="mayorista">Ventas mayoristas</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="mensaje" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje *</FormLabel>
                        <FormControl><Textarea placeholder="Escribí tu consulta acá..." rows={5} {...field} data-testid="textarea-contact-mensaje" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} data-testid="button-contact-submit">
                      {form.formState.isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold mb-6">Información de contacto</h2>
              {[
                { icon: MapPin, title: "Dirección", lines: ["Av. Santa Fe 2300, Piso 3", "Palermo, CABA"] },
                { icon: Phone, title: "Teléfono", lines: ["(011) 4800-1234", "WhatsApp: +54 9 11 5000-0000"] },
                { icon: Mail, title: "Email", lines: ["hola@chiaespacio.com.ar", "ventas@chiaespacio.com.ar"] },
                { icon: Clock, title: "Horario de atención", lines: ["Lunes a Viernes: 9 - 18hs", "Sábados: 10 - 14hs"] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-4 p-4 bg-card border border-card-border rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-card-border h-48 bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Av. Santa Fe 2300, Palermo CABA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp floating */}
      <a
        href="https://wa.me/5491150000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors"
        aria-label="Contactar por WhatsApp"
        data-testid="button-whatsapp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.858L.057 23.143c-.073.26.168.494.424.408l5.395-1.47A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.026-1.378l-.36-.215-3.732 1.016 1.039-3.622-.235-.372A9.818 9.818 0 012.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z"/>
        </svg>
      </a>
    </PageLayout>
  );
}
