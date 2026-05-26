import { PageLayout } from "@/components/layout/PageLayout";

export default function Privacidad() {
  return (
    <PageLayout title="Política de Privacidad">
      <section className="py-16 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
          <p className="text-muted-foreground">Última actualización: enero de 2025</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="space-y-10">

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">1. Información que recopilamos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cuando realizás una compra o creás una cuenta en CHÍA, podemos recopilar:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground">
                <li>Nombre y apellido</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de envío</li>
                <li>Historial de compras</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">2. Cómo usamos tu información</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos tus datos para procesar pedidos, gestionar tu cuenta, enviarte confirmaciones y
                actualizaciones sobre tus compras, y mejorar nuestra plataforma. No vendemos ni cedemos
                tus datos personales a terceros con fines comerciales.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">3. Almacenamiento y seguridad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tus datos se almacenan de forma segura con acceso restringido. Utilizamos cifrado SSL para
                proteger la transmisión de información sensible. No almacenamos datos de tarjetas de crédito;
                el procesamiento de pagos lo realizan plataformas certificadas.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia de navegación, recordar tu carrito y preferencias,
                y analizar el tráfico del sitio. Podés configurar tu navegador para rechazar las cookies,
                aunque esto puede afectar algunas funcionalidades del Sitio.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">5. Tus derechos</h2>
              <p className="text-muted-foreground leading-relaxed">
                De acuerdo con la Ley 25.326 de Protección de Datos Personales de Argentina, tenés derecho a:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar datos incorrectos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al tratamiento de tus datos</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Para ejercer estos derechos, escribinos a{" "}
                <a href="mailto:hola@chiaespacio.com" className="text-primary hover:underline">hola@chiaespacio.com</a>.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">6. Cambios en esta política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos cualquier cambio
                en esta página con la fecha de actualización correspondiente. Te recomendamos revisarla periódicamente.
              </p>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
