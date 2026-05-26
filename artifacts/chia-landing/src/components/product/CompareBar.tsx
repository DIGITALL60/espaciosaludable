import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { CompareModal } from "./CompareModal";

export function CompareBar() {
  const { compareList, removeFromCompare } = useApp();
  const [open, setOpen] = useState(false);

  if (compareList.length === 0) return null;

  const products = compareList.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-2xl px-4 py-3 flex items-center gap-4"
          data-testid="compare-bar"
        >
          <BarChart2 size={20} className="shrink-0" />
          <div className="flex-1 flex items-center gap-3 overflow-x-auto">
            {products.map((p) => p && (
              <div key={p.id} className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-3 py-1 shrink-0">
                <span className="text-sm font-medium whitespace-nowrap">{p.nombre}</span>
                <button onClick={() => removeFromCompare(p.id)} aria-label="Quitar del comparador">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {compareList.length >= 2 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpen(true)}
              data-testid="button-open-compare"
            >
              Comparar
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
      <CompareModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
