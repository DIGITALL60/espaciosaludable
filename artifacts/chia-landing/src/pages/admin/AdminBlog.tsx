import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { BlogPost } from "@/types";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const EMPTY: Omit<BlogPost, "id"> = {
  titulo: "", extracto: "", contenido: "", autor: "", fecha: new Date().toISOString().split("T")[0],
  imagen: "https://picsum.photos/seed/newpost/800/500", categoria: "nutricion", tags: [],
};

function PostForm({ initial, onSave, onClose }: {
  initial: Partial<BlogPost>;
  onSave: (data: Omit<BlogPost, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [tagsInput, setTagsInput] = useState(initial.tags?.join(", ") ?? "");
  const set = (key: keyof typeof EMPTY, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.titulo.trim()) return;
    onSave({ ...form, tags: tagsInput.split(",").map((s) => s.trim()).filter(Boolean) });
    onClose();
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div>
        <Label>Título *</Label>
        <Input value={form.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Título del artículo" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Categoría</Label>
          <Select value={form.categoria} onValueChange={(v) => set("categoria", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nutricion">Nutrición</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="recetas">Recetas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Autor</Label>
          <Input value={form.autor} onChange={(e) => set("autor", e.target.value)} placeholder="Nombre del autor" />
        </div>
        <div>
          <Label>Fecha</Label>
          <Input type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} />
        </div>
        <div>
          <Label>URL imagen</Label>
          <Input value={form.imagen} onChange={(e) => set("imagen", e.target.value)} placeholder="https://..." />
        </div>
      </div>
      {form.imagen && (
        <img src={form.imagen} alt="preview" className="h-32 w-full object-cover rounded-xl" onError={(e) => (e.currentTarget.style.display = "none")} />
      )}
      <div>
        <Label>Extracto</Label>
        <Textarea value={form.extracto} onChange={(e) => set("extracto", e.target.value)} rows={2} placeholder="Resumen breve del artículo..." />
      </div>
      <div>
        <Label>Contenido (Markdown)</Label>
        <Textarea value={form.contenido} onChange={(e) => set("contenido", e.target.value)} rows={8} placeholder="## Título&#10;&#10;Contenido del artículo..." className="font-mono text-sm" />
      </div>
      <div>
        <Label>Tags (separados por comas)</Label>
        <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="nutrición, salud, proteínas" />
      </div>
      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={onClose} className="flex-1">Cancelar</Button>
        <Button onClick={handleSave} className="flex-1">Guardar</Button>
      </div>
    </div>
  );
}

export default function AdminBlog() {
  const { blogPosts, createPost, updatePost, deletePost } = useAdmin();
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = blogPosts.filter((p) =>
    p.titulo.toLowerCase().includes(search.toLowerCase()) ||
    p.autor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Blog</h1>
            <p className="text-muted-foreground">{blogPosts.length} artículos publicados</p>
          </div>
          <Button onClick={() => setCreating(true)} className="gap-2"><Plus size={18} /> Nuevo artículo</Button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar artículos..." className="pl-9" />
            </div>
          </div>

          <div className="divide-y divide-border">
            {filtered.map((post) => (
              <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors">
                <img src={post.imagen} alt={post.titulo} className="w-20 h-14 object-cover rounded-lg shrink-0" onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/placeholder/800/500")} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{post.titulo}</p>
                  <p className="text-sm text-muted-foreground truncate">{post.extracto}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">{post.categoria}</span>
                    <span className="text-xs text-muted-foreground">{post.autor}</span>
                    <span className="text-xs text-muted-foreground">{new Date(post.fecha).toLocaleDateString("es-AR")}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => setEditTarget(post)} className="gap-1 h-8"><Pencil size={14} /> Editar</Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleteId(post.id)} className="h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"><Trash2 size={14} /></Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground">No se encontraron artículos</div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nuevo artículo</DialogTitle></DialogHeader>
          <PostForm initial={EMPTY} onSave={createPost} onClose={() => setCreating(false)} />
        </DialogContent>
      </Dialog>

      {editTarget && (
        <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Editar: {editTarget.titulo}</DialogTitle></DialogHeader>
            <PostForm initial={editTarget} onSave={(data) => { updatePost(editTarget.id, data); setEditTarget(null); }} onClose={() => setEditTarget(null)} />
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Eliminar este artículo?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) deletePost(deleteId); setDeleteId(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
