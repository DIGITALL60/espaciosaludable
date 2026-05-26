import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product, BlogPost, Recipe } from "@/types";
import { PRODUCTS } from "@/data/products";
import { BLOG_POSTS } from "@/data/blog";
import { RECIPES } from "@/data/recipes";
import { toast } from "sonner";

interface AdminContextType {
  products: Product[];
  createProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  blogPosts: BlogPost[];
  createPost: (p: Omit<BlogPost, "id">) => void;
  updatePost: (id: string, p: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;

  recipes: Recipe[];
  createRecipe: (r: Omit<Recipe, "id">) => void;
  updateRecipe: (id: string, r: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load("chia-admin-products", PRODUCTS));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => load("chia-admin-blog", BLOG_POSTS));
  const [recipes, setRecipes] = useState<Recipe[]>(() => load("chia-admin-recipes", RECIPES));

  const createProduct = useCallback((p: Omit<Product, "id">) => {
    const newP: Product = { ...p, id: `prod-${Date.now()}` };
    setProducts((prev) => { const next = [newP, ...prev]; save("chia-admin-products", next); return next; });
    toast.success("Producto creado");
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Product>) => {
    setProducts((prev) => { const next = prev.map((x) => x.id === id ? { ...x, ...p } : x); save("chia-admin-products", next); return next; });
    toast.success("Producto actualizado");
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => { const next = prev.filter((x) => x.id !== id); save("chia-admin-products", next); return next; });
    toast.success("Producto eliminado");
  }, []);

  const createPost = useCallback((p: Omit<BlogPost, "id">) => {
    const newP: BlogPost = { ...p, id: `post-${Date.now()}` };
    setBlogPosts((prev) => { const next = [newP, ...prev]; save("chia-admin-blog", next); return next; });
    toast.success("Post creado");
  }, []);

  const updatePost = useCallback((id: string, p: Partial<BlogPost>) => {
    setBlogPosts((prev) => { const next = prev.map((x) => x.id === id ? { ...x, ...p } : x); save("chia-admin-blog", next); return next; });
    toast.success("Post actualizado");
  }, []);

  const deletePost = useCallback((id: string) => {
    setBlogPosts((prev) => { const next = prev.filter((x) => x.id !== id); save("chia-admin-blog", next); return next; });
    toast.success("Post eliminado");
  }, []);

  const createRecipe = useCallback((r: Omit<Recipe, "id">) => {
    const newR: Recipe = { ...r, id: `rec-${Date.now()}` };
    setRecipes((prev) => { const next = [newR, ...prev]; save("chia-admin-recipes", next); return next; });
    toast.success("Receta creada");
  }, []);

  const updateRecipe = useCallback((id: string, r: Partial<Recipe>) => {
    setRecipes((prev) => { const next = prev.map((x) => x.id === id ? { ...x, ...r } : x); save("chia-admin-recipes", next); return next; });
    toast.success("Receta actualizada");
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    setRecipes((prev) => { const next = prev.filter((x) => x.id !== id); save("chia-admin-recipes", next); return next; });
    toast.success("Receta eliminada");
  }, []);

  return (
    <AdminContext.Provider value={{
      products, createProduct, updateProduct, deleteProduct,
      blogPosts, createPost, updatePost, deletePost,
      recipes, createRecipe, updateRecipe, deleteRecipe,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
