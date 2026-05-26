import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useApp } from "@/context/AppContext";
import { LayoutDashboard, Package, BookOpen, ChefHat, LogOut, ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/recetas", label: "Recetas", icon: ChefHat },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useApp();
  const [location] = useLocation();

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-8">
        <div className="text-center max-w-sm">
          <ShieldAlert className="mx-auto mb-4 text-destructive" size={48} />
          <h2 className="text-2xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-muted-foreground mb-6">Necesitás iniciar sesión como administradora.</p>
          <Link href="/cuenta">
            <Button>Iniciar sesión</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="w-64 bg-[#1a3a1a] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="font-serif text-2xl font-bold tracking-widest">CHÍA</div>
          <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Panel Admin</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? location === href : location.startsWith(href);
            return (
              <Link key={href} href={href}>
                <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  active ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/8"
                }`}>
                  <Icon size={18} />
                  {label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-colors cursor-pointer">
              <ExternalLink size={18} /> Ver tienda
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-300 hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">A</div>
            <div>
              <p className="text-sm font-semibold leading-none">{user.nombre}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
