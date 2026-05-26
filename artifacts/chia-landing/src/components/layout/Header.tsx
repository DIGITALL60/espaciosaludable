import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Menu, X, ShoppingCart, User, Search, Moon, Sun, Heart, Package, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const { cartCount, user, logout, setSearchOpen } = useApp();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
    );
  }, []);

  const navLinks = [
    { label: "INICIO", href: "/" },
    { label: "TIENDA", href: "/tienda" },
    { label: "NOSOTROS", href: "/nosotros" },
    { label: "RECETAS", href: "/recetas" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACTO", href: "/contacto" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary">CHÍA</span>
            <span className="hidden md:inline-block w-px h-6 bg-border mx-2" />
            <span className="hidden md:inline-block text-sm font-medium tracking-widest text-muted-foreground uppercase mt-1">
              Espacio Saludable
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold tracking-widest hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                  location === link.href ? "text-primary after:w-full" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary hover:bg-muted/50 rounded-full"
              onClick={() => setSearchOpen(true)}
              data-testid="button-search"
              aria-label="Buscar"
            >
              <Search size={20} />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:inline-flex text-foreground hover:text-primary hover:bg-muted/50 rounded-full relative"
                  data-testid="button-user-menu"
                  aria-label="Mi cuenta"
                >
                  <User size={20} />
                  {user && <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="font-medium text-sm">{user.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/cuenta" className="flex items-center gap-2 cursor-pointer">
                        <User size={16} /> Mi cuenta
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favoritos" className="flex items-center gap-2 cursor-pointer">
                        <Heart size={16} /> Favoritos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/cuenta" className="flex items-center gap-2 cursor-pointer">
                        <Package size={16} /> Mis órdenes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive cursor-pointer" data-testid="button-logout">
                      <LogOut size={16} /> Salir
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/cuenta" className="cursor-pointer">Iniciar sesión</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/cuenta?tab=register" className="cursor-pointer">Registrarse</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary hover:bg-muted/50 rounded-full relative"
              asChild
              data-testid="button-cart"
            >
              <Link href="/carrito" aria-label="Carrito de compras">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Dark mode */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-primary hover:bg-muted/50 rounded-full"
              aria-label="Cambiar tema"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg py-4 px-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium tracking-wide py-3 border-b border-border hover:text-primary transition-colors block ${
                  location === link.href ? "text-primary" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <Link href="/carrito" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium">
                <ShoppingCart size={18} /> Carrito {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link href="/favoritos" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium">
                <Heart size={18} /> Favoritos
              </Link>
              <Link href="/cuenta" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium">
                <User size={18} /> {user ? "Mi cuenta" : "Ingresar"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
