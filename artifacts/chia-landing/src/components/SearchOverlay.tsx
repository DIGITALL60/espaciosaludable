import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) { setTimeout(() => inputRef.current?.focus(), 100); }
    else setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  const results: Product[] = debouncedQuery.length > 1
    ? PRODUCTS.filter((p) =>
        p.nombre.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.ingredientes.some((i) => i.toLowerCase().includes(debouncedQuery.toLowerCase())) ||
        p.categoria.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(debouncedQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          data-testid="search-overlay"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search size={20} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos, ingredientes..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg outline-none"
                data-testid="input-search"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Cerrar búsqueda"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="p-3 max-h-[60vh] overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                    data-testid={`search-result-${product.id}`}
                  >
                    <img
                      src={product.imagenes[0]}
                      alt={product.nombre}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{product.nombre}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.precio.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
                <Link
                  href={`/tienda`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-center gap-2 mt-2 p-3 text-sm text-primary font-medium hover:underline"
                >
                  Ver todos los resultados en la tienda
                </Link>
              </div>
            )}

            {debouncedQuery.length > 1 && results.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-lg font-medium">Sin resultados para "{debouncedQuery}"</p>
                <p className="text-sm mt-1">Probá con otro término</p>
              </div>
            )}

            {debouncedQuery.length <= 1 && (
              <div className="p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Búsquedas populares</p>
                <div className="flex flex-wrap gap-2">
                  {["Granola", "Pasta de maní", "Kombucha", "Sin TACC", "Proteína"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 bg-muted text-sm rounded-full hover:bg-muted-foreground/20 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
