import { PageLayout } from "@/components/layout/PageLayout";

export default function Terminos() {
  return (
    <PageLayout title="Términos y Condiciones">
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Términos y Condiciones</h1>
          <p className="text-muted-foreground">Última actualización: enero de 2025</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">1. Aceptación de los términos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Al acceder y utilizar el sitio web de CHÍA Espacio Saludable (en adelante "el Sitio"), aceptás
                cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguno de los términos,
                te pedimos que no utilices nuestros servicios.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">2. Uso del sitio</h2>
              <p className="text-muted-foreground leading-relaxed">
                El Sitio y su contenido son para uso personal y no comercial. Queda prohibido reproducir,
                distribuir o modificar cualquier parte del Sitio sin autorización previa y por escrito de CHÍA.
                Nos reservamos el derecho de modificar o discontinuar el Sitio en cualquier momento sin previo aviso.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">3. Productos y precios</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todos los precios están expresados en pesos argentinos (ARS) e incluyen IVA. Nos reservamos
                el derecho de modificar los precios sin previo aviso. La disponibilidad de productos puede
                cambiar sin notificación. En caso de error en el precio publicado, nos comunicaremos con vos
                antes de procesar el pedido.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">4. Compras y pagos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Al realizar una compra declarás ser mayor de 18 años y que los datos de pago proporcionados
                son válidos y te pertenecen. CHÍA se reserva el derecho de cancelar pedidos en caso de
                sospecha de fraude o errores en la información proporcionada.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">5. Envíos y entregas</h2>
              <p className="text-muted-foreground leading-relaxed">
                Los plazos de entrega son estimativos y pueden verse afectados por demoras del servicio de
                mensajería, condiciones climáticas u otras circunstancias ajenas a nuestra voluntad. CHÍA
                no se responsabiliza por demoras ocasionadas por el transportista.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">6. Propiedad intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo el contenido del Sitio, incluyendo textos, imágenes, logotipos y diseños, es propiedad
                de CHÍA Espacio Saludable o de sus respectivos titulares, y está protegido por las leyes de
                propiedad intelectual vigentes en Argentina.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">7. Limitación de responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                CHÍA no será responsable por daños directos, indirectos, incidentales o consecuentes
                derivados del uso o imposibilidad de uso del Sitio. La información nutricional de los productos
                es orientativa y no reemplaza el asesoramiento de un profesional de la salud.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">8. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para consultas sobre estos términos, podés escribirnos a{" "}
                <a href="mailto:hola@chiaespacio.com" className="text-primary hover:underline">hola@chiaespacio.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
