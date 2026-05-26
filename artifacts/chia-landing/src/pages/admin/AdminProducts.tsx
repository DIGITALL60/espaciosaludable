import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { Product } from "@/types";
import { Plus, Pencil, Trash2, Search, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const EMPTY: Omit<Product, "id"> = {
  nombre: "", categoria: "desayunos-snacks", precio: 0, precioAnterior: undefined,
  imagenes: ["https://picsum.photos/seed/nuevo/400/400"], descripcion: "", ingredientes: [],
  proteinas: 0, calorias: 0, apto: [], stock: 20, rating: 4.5, reviews: 0, badge: null, tags: [],
};

const CATS = [
  { value: "desayunos-snacks", label: "Desayunos y snacks" },
  { value: "pastas-frutos-secos", label: "Pastas de frutos secos" },
  { value: "alimentos-saludables", label: "Alimentos saludables" },
  { value: "bebidas-naturales", label: "Bebidas naturales" },
  { value: "sin-tacc-veganos", label: "Sin TACC y veganos" },
];

function ProductForm({ initial, onSave, onClose }: {
  initial: Partial<Product> & { id?: string };
  onSave: (data: Omit<Product, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [aptoInput, setAptoInput] = useState(initial.apto?.join(", ") ?? "");
  const [ingredInput, setIngredInput] = useState(initial.ingredientes?.join(", ") ?? "");

  const set = (key: keyof typeof EMPTY, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.nombre.trim() || form.precio <= 0) return;
    onSave({
      ...form,
      apto: aptoInput.split(",").map((s) => s.trim()).filter(Boolean),
      ingredientes: ingredInput.split(",").map((s) => s.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label>Nombre *</Label>
          <Input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre del producto" />
        </div>
        <div>
          <Label>Categoría *</Label>
          <Select value={form.categoria} onValueChange={(v) => set("categoria", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Badge</Label>
          <Select value={form.badge ?? "none"} onValueChange={(v) => set("badge", v === "none" ? null : v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sin badge</SelectItem>
              <SelectItem value="NUEVO">NUEVO</SelectItem>
              <SelectItem value="Sin sellos">Sin sellos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Precio (ARS) *</Label>
          <Input type="number" value={form.precio} onChange={(e) => set("precio", Number(e.target.value))} />
        </div>
        <div>
          <Label>Precio anterior (opcional)</Label>
          <Input type="number" value={form.precioAnterior ?? ""} onChange={(e) => set("precioAnterior", e.target.value ? Number(e.target.value) : undefined)} placeholder="Tachado" />
        </div>
        <div>
          <Label>Stock</Label>
          <Input type="number" value={form.stock} onChange={(e) => set("stock", Number(e.target.value))} />
        </div>
        <div>
          <Label>Rating (1-5)</Label>
          <Input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} />
        </div>
        <div>
          <Label>Proteínas (g)</Label>
          <Input type="number" value={form.proteinas} onChange={(e) => set("proteinas", Number(e.target.value))} />
        </div>
        <div>
          <Label>Calorías (kcal)</Label>
          <Input type="number" value={form.calorias} onChange={(e) => set("calorias", Number(e.target.value))} />
        </div>
        <div className="col-span-2">
          <Label>URL de imagen</Label>
          <Input value={form.imagenes[0]} onChange={(e) => set("imagenes", [e.target.value])} placeholder="https://..." />
          {form.imagenes[0] && (
            <img src={form.imagenes[0]} alt="preview" className="mt-2 h-20 w-20 object-cover rounded-lg" onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/placeholder/400/400")} />
          )}
        </div>
        <div className="col-span-2">
          <Label>Descripción</Label>
          <Textarea value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} rows={3} />
        </div>
        <div className="col-span-2">
          <Label>Apto para (separado por comas)</Label>
          <Input value={aptoInput} onChange={(e) => setAptoInput(e.target.value)} placeholder="Vegano, Sin Lactosa, Sin TACC" />
        </div>
        <div className="col-span-2">
          <Label>Ingredientes (separados por comas)</Label>
          <Input value={ingredInput} onChange={(e) => setIngredInput(e.target.value)} placeholder="Avena, Miel, Semillas" />
        </div>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const { products, createProduct, updateProduct, deleteProduct } = useAdmin();
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(EMPTY);

  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.includes(search.toLowerCase())
  );

  const openCreate = () => { setFormData(EMPTY); setCreating(true); };
  const openEdit = (p: Product) => { setEditTarget(p); };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Productos</h1>
            <p className="text-muted-foreground">{products.length} productos en total</p>
          </div>
          <Button onClick={openCreate} className="gap-2"><Plus size={18} /> Nuevo producto</Button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar productos..." className="pl-9" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Producto</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Categoría</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Precio</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Stock</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rating</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.imagenes[0]} alt={p.nombre} className="w-10 h-10 rounded-lg object-cover bg-muted" onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/placeholder/400/400")} />
                        <div>
                          <p className="font-medium">{p.nombre}</p>
                          {p.badge && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{p.categoria.replace(/-/g, " ")}</td>
                    <td className="px-4 py-3 text-right font-semibold">${p.precio.toLocaleString("es-AR")}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 5 ? "text-amber-500" : "text-emerald-600"}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{p.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(p)} className="gap-1 h-8"><Pencil size={14} /> Editar</Button>
                        <Button size="sm" variant="outline" onClick={() => setDeleteId(p.id)} className="h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"><Trash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground">No se encontraron productos</div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nuevo producto</DialogTitle></DialogHeader>
          <ProductForm initial={EMPTY} onSave={createProduct} onClose={() => setCreating(false)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreating(false)}>Cancelar</Button>
            <Button onClick={() => {
              const form = document.querySelector("form[data-admin-product]") as HTMLFormElement;
              form?.requestSubmit();
            }}>Guardar producto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editTarget && (
        <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Editar: {editTarget.nombre}</DialogTitle></DialogHeader>
            <ProductForm
              initial={editTarget}
              onSave={(data) => { updateProduct(editTarget.id, data); setEditTarget(null); }}
              onClose={() => setEditTarget(null)}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditTarget(null)}>Cancelar</Button>
              <Button onClick={() => {
                document.querySelector<HTMLButtonElement>("[data-admin-save]")?.click();
              }}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Eliminar este producto?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) deleteProduct(deleteId); setDeleteId(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
