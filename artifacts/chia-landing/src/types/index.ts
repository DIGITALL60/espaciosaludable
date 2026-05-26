export interface Product {
  id: string;
  nombre: string;
  categoria: "desayunos-snacks" | "pastas-frutos-secos" | "alimentos-saludables" | "bebidas-naturales" | "sin-tacc-veganos";
  precio: number;
  precioAnterior?: number;
  imagenes: string[];
  descripcion: string;
  ingredientes: string[];
  proteinas: number;
  calorias: number;
  apto: string[];
  stock: number;
  rating: number;
  reviews: number;
  badge?: "NUEVO" | "Sin sellos" | null;
  tags: string[];
}

export interface Recipe {
  id: string;
  nombre: string;
  tiempo: number;
  dificultad: "facil" | "medio" | "dificil";
  calorias: number;
  porciones: number;
  imagen: string;
  ingredientes: { nombre: string; cantidad: string; productoId?: string }[];
  pasos: string[];
  categoria: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  titulo: string;
  extracto: string;
  contenido: string;
  autor: string;
  fecha: string;
  imagen: string;
  categoria: string;
  tags: string[];
}

export interface Review {
  id: string;
  autor: string;
  rating: number;
  comentario: string;
  fecha: string;
  verificado: boolean;
}

export interface CartItem {
  product: Product;
  cantidad: number;
  savedForLater?: boolean;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  ordenes: Order[];
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  fecha: string;
  total: number;
  items: CartItem[];
  estado: "Procesando" | "Enviado" | "Entregado";
  envio: {
    metodo: string;
    costo: number;
    direccion: string;
  };
}
