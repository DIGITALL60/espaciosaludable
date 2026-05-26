import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
}

export function ImageUploader({ value, onChange, label = "Imagen", aspectRatio = "aspect-video" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imágenes");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen no puede superar 10MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const metaRes = await fetch("/api/storage/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
      });

      if (!metaRes.ok) throw new Error("No se pudo obtener la URL de subida");
      const { uploadURL, objectPath } = await metaRes.json();

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Error al subir la imagen");

      onChange(`/api/storage${objectPath}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      {value && (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className={`w-full ${aspectRatio} object-cover rounded-xl border border-border`}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 size={28} className="animate-spin text-primary" />
            <p className="text-sm">Subiendo imagen...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon size={28} />
            <p className="text-sm font-medium">Arrastrar imagen aquí o <span className="text-primary underline">seleccionar archivo</span></p>
            <p className="text-xs">PNG, JPG, WEBP — máx. 10MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function MultiImageUploader({ values, onChange, label = "Imágenes" }: {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}) {
  const addImage = (url: string) => onChange([...values, url]);
  const removeImage = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const updateImage = (i: number, url: string) => onChange(values.map((v, idx) => idx === i ? url : v));

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="grid grid-cols-3 gap-3">
        {values.map((url, i) => (
          <div key={i} className="relative group">
            <img src={url} alt={`Imagen ${i + 1}`} className="w-full aspect-square object-cover rounded-xl border border-border" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {values.length < 5 && (
          <ImageUploader
            value=""
            onChange={addImage}
            label=""
            aspectRatio="aspect-square"
          />
        )}
      </div>
    </div>
  );
}
