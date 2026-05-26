import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight">CHÍA</span>
              <span className="text-sm font-medium tracking-widest text-primary-foreground/70 uppercase mt-1">
                Espacio Saludable
              </span>
            </div>
            <p className="text-primary-foreground/80 max-w-sm">
              Alimentos reales, sin culpas y pensados para tu bienestar. Tu día rico en proteínas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl font-medium">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><Link href="/tienda" className="text-primary-foreground/80 hover:text-white transition-colors">Tienda</Link></li>
              <li><Link href="/nosotros" className="text-primary-foreground/80 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/recetas" className="text-primary-foreground/80 hover:text-white transition-colors">Recetas</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl font-medium">Ayuda</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-primary-foreground/80 hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/envios" className="text-primary-foreground/80 hover:text-white transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link href="/pagos" className="text-primary-foreground/80 hover:text-white transition-colors">Formas de Pago</Link></li>
              <li><Link href="/contacto" className="text-primary-foreground/80 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl font-medium">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>Palermo Soho, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone size={20} className="shrink-0" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail size={20} className="shrink-0" />
                <span>hola@chiaespacio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} CHÍA Espacio Saludable. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-primary-foreground/60 text-sm">
            <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <span>|</span>
            <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
