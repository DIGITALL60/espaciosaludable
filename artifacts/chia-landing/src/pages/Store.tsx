import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { CompareBar } from "@/components/product/CompareBar";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { value: "desayunos-snacks", label: "Desayunos y snacks" },
  { value: "pastas-frutos-secos", label: "Pastas de frutos secos" },
  { value: "alimentos-saludables", label: "Alimentos saludables" },
  { value: "bebidas-naturales", label: "Bebidas naturales" },
  { value: "sin-tacc-veganos", label: "Sin TACC y veganos" },
];

const ATRIBUTOS = ["vegano", "sin TACC", "keto", "sin lactosa", "sin azúcar", "raw"];

const PER_PAGE = 12;

function useDebounce<T>(value: T, delay: number): T {
  const [d, setD] = useState(value);
  useEffect(() => { const t = setTimeout(() => setD(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return d;
}

export default function Store() {
  const params = useParams<{ categoria?: string }>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(params.categoria ? [params.categoria] : []);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedApts, setSelectedApts] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevancia");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (params.categoria) setSelectedCategories([params.categoria]);
    setPage(1);
  }, [params.categoria]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
    setPage(1);
  };

  const toggleApt = (apt: string) => {
    setSelectedApts((prev) => prev.includes(apt) ? prev.filter((a) => a !== apt) : [...prev, apt]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let res = [...PRODUCTS];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      res = res.filter((p) => p.nombre.toLowerCase().includes(q) || p.ingredientes.some((i) => i.toLowerCase().includes(q)) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (selectedCategories.length > 0) res = res.filter((p) => selectedCategories.includes(p.categoria));
    res = res.filter((p) => p.precio >= priceRange[0] && p.precio <= priceRange[1]);
    if (selectedApts.length > 0) res = res.filter((p) => selectedApts.every((a) => p.apto.includes(a)));
    if (minRating > 0) res = res.filter((p) => p.rating >= minRating);

    switch (sort) {
      case "precio-asc": res.sort((a, b) => a.precio - b.precio); break;
      case "precio-desc": res.sort((a, b) => b.precio - a.precio); break;
      case "rating": res.sort((a, b) => b.rating - a.rating); break;
      case "nuevos": res.sort((a, b) => (b.badge === "NUEVO" ? 1 : 0) - (a.badge === "NUEVO" ? 1 : 0)); break;
      default: break;
    }
    return res;
  }, [debouncedSearch, selectedCategories, priceRange, selectedApts, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeFiltersCount = selectedCategories.length + selectedApts.length + (minRating > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedApts([]);
    setPriceRange([0, 20000]);
    setMinRating(0);
    setSearch("");
    setPage(1);
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif font-semibold text-base mb-3">Categorías</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" data-testid={`filter-category-${cat.value}`}>
              <Checkbox checked={selectedCategories.includes(cat.value)} onCheckedChange={() => toggleCategory(cat.value)} />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <h3 className="font-serif font-semibold text-base mb-3">Precio</h3>
        <Slider min={0} max={20000} step={100} value={priceRange} onValueChange={setPriceRange} className="mb-3" data-testid="filter-price-slider" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0].toLocaleString("es-AR")}</span>
          <span>${priceRange[1].toLocaleString("es-AR")}</span>
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <h3 className="font-serif font-semibold text-base mb-3">Apto para</h3>
        <div className="space-y-2">
          {ATRIBUTOS.map((a) => (
            <label key={a} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors capitalize" data-testid={`filter-apt-${a}`}>
              <Checkbox checked={selectedApts.includes(a)} onCheckedChange={() => toggleApt(a)} />
              <span className="text-sm capitalize">{a}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <h3 className="font-serif font-semibold text-base mb-3">Rating mínimo</h3>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => { setMinRating(r); setPage(1); }} className={`px-3 py-1 rounded-full text-sm border transition-colors ${minRating === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`} data-testid={`filter-rating-${r}`}>
              {r === 0 ? "Todos" : `${r}+★`}
            </button>
          ))}
        </div>
      </div>
      {activeFiltersCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full gap-2" data-testid="button-clear-filters">
          <X size={14} /> Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <PageLayout title="Tienda">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-muted-foreground mb-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Inicio</Link> / <span>Tienda</span>
          </nav>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold">Nuestra Tienda</h1>
              <p className="text-muted-foreground mt-1">{filtered.length} productos encontrados</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="md:hidden gap-2" onClick={() => setMobileFiltersOpen(true)} data-testid="button-mobile-filters">
                <SlidersHorizontal size={16} /> Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
              <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1); }}>
                <SelectTrigger className="w-44" data-testid="select-sort">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="rating">Mejor rating</SelectItem>
                  <SelectItem value="nuevos">Más nuevos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar productos, ingredientes..."
            className="pl-10"
            data-testid="input-store-search"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((c) => (
              <Badge key={c} variant="secondary" className="gap-1 pr-1.5 cursor-pointer" onClick={() => toggleCategory(c)}>
                {CATEGORIES.find((cat) => cat.value === c)?.label} <X size={12} />
              </Badge>
            ))}
            {selectedApts.map((a) => (
              <Badge key={a} variant="secondary" className="gap-1 pr-1.5 cursor-pointer capitalize" onClick={() => toggleApt(a)}>
                {a} <X size={12} />
              </Badge>
            ))}
            {minRating > 0 && (
              <Badge variant="secondary" className="gap-1 pr-1.5 cursor-pointer" onClick={() => setMinRating(0)}>
                {minRating}+★ <X size={12} />
              </Badge>
            )}
            <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-primary underline">Limpiar todo</button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden md:block w-64 shrink-0" aria-label="Filtros">
            <div className="sticky top-28">
              <FiltersPanel />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🥜</div>
                <h2 className="font-serif text-2xl font-bold mb-2">Sin resultados</h2>
                <p className="text-muted-foreground mb-6">Probá con otros filtros o busca otro producto.</p>
                <Button onClick={clearFilters} data-testid="button-empty-clear">Limpiar filtros</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} showCompare />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10" aria-label="Paginación">
                <Button variant="outline" size="icon" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} data-testid="button-prev-page">
                  <ChevronLeft size={18} />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    data-testid={`button-page-${i + 1}`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button variant="outline" size="icon" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} data-testid="button-next-page">
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold">Filtros</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Cerrar filtros"><X size={24} /></button>
            </div>
            <FiltersPanel />
            <Button className="w-full mt-6" onClick={() => setMobileFiltersOpen(false)}>Ver {filtered.length} productos</Button>
          </div>
        </div>
      )}

      <CompareBar />
    </PageLayout>
  );
}
