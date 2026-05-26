import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { Recipe } from "@/types";
import { Plus, Pencil, Trash2, Search, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const EMPTY: Omit<Recipe, "id"> = {
  nombre: "", tiempo: 15, dificultad: "facil", calorias: 300, porciones: 2,
  imagen: "https://picsum.photos/seed/newrecipe/800/500",
  ingredientes: [], pasos: [], categoria: "desayunos", tags: [],
};

const DIFS = [{ value: "facil", label: "Fácil" }, { value: "medio", label: "Medio" }, { value: "dificil", label: "Difícil" }];
const CATS = ["desayunos", "snacks", "almuerzos", "cenas", "bebidas", "postres"];

function RecipeForm({ initial, onSave, onClose }: {
  initial: Partial<Recipe>;
  onSave: (data: Omit<Recipe, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [pasosInput, setPasosInput] = useState(initial.pasos?.join("\n") ?? "");
  const [ingredInput, setIngredInput] = useState(
    initial.ingredientes?.map((i) => `${i.cantidad} ${i.nombre}`).join("\n") ?? ""
  );
  const [tagsInput, setTagsInput] = useState(initial.tags?.join(", ") ?? "");

  const set = (key: keyof typeof EMPTY, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.nombre.trim()) return;
    const ingredientes = ingredInput.split("\n").filter(Boolean).map((line) => {
      const parts = line.trim().split(" ");
      const cantidad = parts[0] ?? "";
      const nombre = parts.slice(1).join(" ");
      return { nombre, cantidad };
    });
    const pasos = pasosInput.split("\n").filter(Boolean);
    const tags = tagsInput.split(",").map((s) => s.trim()).filter(Boolean);
    onSave({ ...form, ingredientes, pasos, tags });
    onClose();
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div>
        <Label>Nombre *</Label>
        <Input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre de la receta" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Categoría</Label>
          <Select value={form.categoria} onValueChange={(v) => set("categoria", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{CATS.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Dificultad</Label>
          <Select value={form.dificultad} onValueChange={(v) => set("dificultad", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{DIFS.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Tiempo (min)</Label>
          <Input type="number" value={form.tiempo} onChange={(e) => set("tiempo", Number(e.target.value))} />
        </div>
        <div>
          <Label>Calorías (kcal)</Label>
          <Input type="number" value={form.calorias} onChange={(e) => set("calorias", Number(e.target.value))} />
        </div>
        <div>
          <Label>Porciones</Label>
          <Input type="number" value={form.porciones} onChange={(e) => set("porciones", Number(e.target.value))} />
        </div>
        <div>
          <Label>URL imagen</Label>
          <Input value={form.imagen} onChange={(e) => set("imagen", e.target.value)} placeholder="https://..." />
        </div>
      </div>
      {form.imagen && (
        <img src={form.imagen} alt="preview" className="h-28 w-full object-cover rounded-xl" onError={(e) => (e.currentTarget.style.display = "none")} />
      )}
      <div>
        <Label>Ingredientes (uno por línea: "cantidad nombre")</Label>
        <Textarea value={ingredInput} onChange={(e) => setIngredInput(e.target.value)} rows={5} placeholder="80g Granola&#10;150g Yogur natural&#10;1 cda Miel" className="font-mono text-sm" />
      </div>
      <div>
        <Label>Pasos (uno por línea)</Label>
        <Textarea value={pasosInput} onChange={(e) => setPasosInput(e.target.value)} rows={6} placeholder="Mezclar todos los ingredientes...&#10;Cocinar a fuego medio..." className="text-sm" />
      </div>
      <div>
        <Label>Tags (separados por comas)</Label>
        <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="vegano, sin azúcar, rápido" />
      </div>
      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={onClose} className="flex-1">Cancelar</Button>
        <Button onClick={handleSave} className="flex-1">Guardar</Button>
      </div>
    </div>
  );
}

export default function AdminRecipes() {
  const { recipes, createRecipe, updateRecipe, deleteRecipe } = useAdmin();
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<Recipe | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = recipes.filter((r) =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.categoria.includes(search.toLowerCase())
  );

  const difLabel: Record<string, string> = { facil: "Fácil", medio: "Medio", dificil: "Difícil" };
  const difColor: Record<string, string> = { facil: "bg-emerald-100 text-emerald-700", medio: "bg-amber-100 text-amber-700", dificil: "bg-red-100 text-red-700" };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Recetas</h1>
            <p className="text-muted-foreground">{recipes.length} recetas publicadas</p>
          </div>
          <Button onClick={() => setCreating(true)} className="gap-2"><Plus size={18} /> Nueva receta</Button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar recetas..." className="pl-9" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filtered.map((recipe) => (
              <div key={recipe.id} className="border border-border rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <img src={recipe.imagen} alt={recipe.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/placeholder/800/500")} />
                  <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full ${difColor[recipe.dificultad]}`}>{difLabel[recipe.dificultad]}</span>
                </div>
                <div className="p-4">
                  <p className="font-semibold">{recipe.nombre}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={12} />{recipe.tiempo} min</span>
                    <span className="flex items-center gap-1"><Flame size={12} />{recipe.calorias} kcal</span>
                    <span className="capitalize">{recipe.categoria}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => setEditTarget(recipe)} className="flex-1 gap-1 h-8"><Pencil size={14} /> Editar</Button>
                    <Button size="sm" variant="outline" onClick={() => setDeleteId(recipe.id)} className="h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"><Trash2 size={14} /></Button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 py-16 text-center text-muted-foreground">No se encontraron recetas</div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nueva receta</DialogTitle></DialogHeader>
          <RecipeForm initial={EMPTY} onSave={createRecipe} onClose={() => setCreating(false)} />
        </DialogContent>
      </Dialog>

      {editTarget && (
        <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Editar: {editTarget.nombre}</DialogTitle></DialogHeader>
            <RecipeForm initial={editTarget} onSave={(data) => { updateRecipe(editTarget.id, data); setEditTarget(null); }} onClose={() => setEditTarget(null)} />
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Eliminar esta receta?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) deleteRecipe(deleteId); setDeleteId(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
