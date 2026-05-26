import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/products";
import { Star } from "lucide-react";

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
}

const rows = [
  { label: "Precio", key: "precio", format: (v: unknown) => `$${(v as number).toLocaleString("es-AR")}` },
  { label: "Proteínas", key: "proteinas", format: (v: unknown) => `${v}g` },
  { label: "Calorías", key: "calorias", format: (v: unknown) => `${v} kcal` },
  { label: "Stock", key: "stock", format: (v: unknown) => `${v} unid.` },
  { label: "Rating", key: "rating", format: (v: unknown) => `${v} / 5` },
  { label: "Reseñas", key: "reviews", format: (v: unknown) => `${v}` },
];

export function CompareModal({ open, onClose }: CompareModalProps) {
  const { compareList } = useApp();
  const products = compareList.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="compare-modal">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Comparar Productos</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 pr-4 font-medium text-muted-foreground w-32">Característica</th>
                {products.map((p) => p && (
                  <th key={p.id} className="py-3 px-4 text-center">
                    <img src={p.imagenes[0]} alt={p.nombre} className="w-20 h-20 object-cover rounded-xl mx-auto mb-2" />
                    <span className="font-serif font-semibold text-base block">{p.nombre}</span>
                    <div className="flex justify-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                      ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, key, format }) => (
                <tr key={key} className="border-t border-border">
                  <td className="py-3 pr-4 text-muted-foreground font-medium">{label}</td>
                  {products.map((p) => p && (
                    <td key={p.id} className="py-3 px-4 text-center font-medium">
                      {format((p as unknown as Record<string, unknown>)[key])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td className="py-3 pr-4 text-muted-foreground font-medium">Apto para</td>
                {products.map((p) => p && (
                  <td key={p.id} className="py-3 px-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {p.apto.map((a) => (
                        <span key={a} className="text-xs bg-accent/60 px-2 py-0.5 rounded-full">{a}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="py-3 pr-4 text-muted-foreground font-medium">Ingredientes</td>
                {products.map((p) => p && (
                  <td key={p.id} className="py-3 px-4 text-center text-xs text-muted-foreground">
                    {p.ingredientes.join(", ")}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
