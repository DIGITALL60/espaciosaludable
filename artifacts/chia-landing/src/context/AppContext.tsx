import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product, CartItem, User, Order } from "@/types";
import { PRODUCTS } from "@/data/products";
import { toast } from "sonner";

interface AppContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  user: User | null;
  login: (email: string, pass: string) => boolean;
  register: (nombre: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "fecha">) => string;
  stock: Record<string, number>;
  getStock: (id: string) => number;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const COUPONS: Record<string, number> = {
  CHIA20: 0.2,
  BIENVENIDO: 0.15,
  TRIBA10: 0.1,
};

function initStock(): Record<string, number> {
  const saved = localStorage.getItem("chia-stock");
  if (saved) return JSON.parse(saved);
  const initial: Record<string, number> = {};
  PRODUCTS.forEach((p) => { initial[p.id] = p.stock; });
  return initial;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("chia-cart") || "[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("chia-wishlist") || "[]"); } catch { return []; }
  });
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem("chia-user") || "null"); } catch { return null; }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem("chia-orders") || "[]"); } catch { return []; }
  });
  const [stock, setStock] = useState<Record<string, number>>(initStock);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => { localStorage.setItem("chia-cart", JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem("chia-wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("chia-stock", JSON.stringify(stock)); }, [stock]);
  useEffect(() => {
    if (user) localStorage.setItem("chia-user", JSON.stringify(user));
    else localStorage.removeItem("chia-user");
  }, [user]);
  useEffect(() => { localStorage.setItem("chia-orders", JSON.stringify(orders)); }, [orders]);

  const cartCount = cartItems.filter((i) => !i.savedForLater).reduce((sum, i) => sum + i.cantidad, 0);
  const cartTotal = cartItems.filter((i) => !i.savedForLater).reduce((sum, i) => sum + i.product.precio * i.cantidad, 0);

  const addToCart = useCallback((product: Product, qty = 1) => {
    const available = stock[product.id] ?? 0;
    if (available < qty) { toast.error("Stock insuficiente"); return; }
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && !i.savedForLater);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && !i.savedForLater
            ? { ...i, cantidad: i.cantidad + qty }
            : i
        );
      }
      return [...prev, { product, cantidad: qty }];
    });
    setStock((prev) => ({ ...prev, [product.id]: Math.max(0, (prev[product.id] ?? 0) - qty) }));
    toast.success(`¡${product.nombre} agregado al carrito!`);
  }, [stock]);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.product.id === id);
      if (item && !item.savedForLater) {
        setStock((s) => ({ ...s, [id]: (s[id] ?? 0) + item.cantidad }));
      }
      return prev.filter((i) => i.product.id !== id);
    });
    toast.info("Producto eliminado del carrito");
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.product.id === id && !i.savedForLater);
      if (!item) return prev;
      const diff = qty - item.cantidad;
      const available = stock[id] ?? 0;
      if (diff > 0 && available < diff) { toast.error("Stock insuficiente"); return prev; }
      setStock((s) => ({ ...s, [id]: (s[id] ?? 0) - diff }));
      return prev.map((i) =>
        i.product.id === id && !i.savedForLater ? { ...i, cantidad: qty } : i
      );
    });
  }, [stock]);

  const saveForLater = useCallback((id: string) => {
    setCartItems((prev) => prev.map((i) => i.product.id === id ? { ...i, savedForLater: true } : i));
    toast.info("Guardado para después");
  }, []);

  const moveToCart = useCallback((id: string) => {
    setCartItems((prev) => prev.map((i) => i.product.id === id ? { ...i, savedForLater: false } : i));
    toast.success("Movido al carrito");
  }, []);

  const clearCart = useCallback(() => { setCartItems([]); }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const discount = COUPONS[code.toUpperCase()];
    if (discount) {
      setAppliedCoupon({ code: code.toUpperCase(), discount });
      toast.success(`Cupón "${code.toUpperCase()}" aplicado — ${(discount * 100).toFixed(0)}% de descuento`);
      return true;
    }
    toast.error("Cupón no válido");
    return false;
  }, []);

  const removeCoupon = useCallback(() => { setAppliedCoupon(null); toast.info("Cupón removido"); }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) { toast.info("Eliminado de favoritos"); return prev.filter((w) => w !== id); }
      toast.success("Agregado a favoritos ♡");
      return [...prev, id];
    });
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const login = useCallback((email: string, pass: string): boolean => {
    if (email.toLowerCase() === "admin@chia.com" && pass === "chia2024") {
      const adminUser: User = { id: "admin-chia", nombre: "Administradora", email: "admin@chia.com", isAdmin: true, ordenes: [] };
      setUser(adminUser);
      toast.success("¡Bienvenida, Administradora!");
      return true;
    }
    const users: { email: string; pass: string; user: User }[] = JSON.parse(localStorage.getItem("chia-users") || "[]");
    const found = users.find((u) => u.email === email && u.pass === pass);
    if (found) { setUser(found.user); toast.success(`¡Bienvenido, ${found.user.nombre}!`); return true; }
    toast.error("Email o contraseña incorrectos");
    return false;
  }, []);

  const register = useCallback((nombre: string, email: string, pass: string): boolean => {
    const users: { email: string; pass: string; user: User }[] = JSON.parse(localStorage.getItem("chia-users") || "[]");
    if (users.find((u) => u.email === email)) { toast.error("Ya existe una cuenta con ese email"); return false; }
    const newUser: User = { id: `user-${Date.now()}`, nombre, email, ordenes: [] };
    users.push({ email, pass, user: newUser });
    localStorage.setItem("chia-users", JSON.stringify(users));
    setUser(newUser);
    toast.success(`¡Bienvenido a CHÍA, ${nombre}!`);
    return true;
  }, []);

  const logout = useCallback(() => { setUser(null); toast.info("Sesión cerrada"); }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      const users: { email: string; pass: string; user: User }[] = JSON.parse(localStorage.getItem("chia-users") || "[]");
      const idx = users.findIndex((u) => u.user.id === prev.id);
      if (idx >= 0) { users[idx].user = updated; localStorage.setItem("chia-users", JSON.stringify(users)); }
      return updated;
    });
  }, []);

  const addOrder = useCallback((orderData: Omit<Order, "id" | "fecha">): string => {
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const order: Order = { ...orderData, id, fecha: new Date().toISOString() };
    setOrders((prev) => [order, ...prev]);
    if (user) {
      updateUser({ ordenes: [order, ...(user.ordenes || [])] });
    }
    return id;
  }, [user, updateUser]);

  const getStock = useCallback((id: string) => stock[id] ?? 0, [stock]);

  const addToCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) { toast.warning("Máximo 3 productos para comparar"); return prev; }
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((c) => c !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, saveForLater, moveToCart, clearCart,
      cartCount, cartTotal,
      appliedCoupon, applyCoupon, removeCoupon,
      wishlist, toggleWishlist, isWishlisted,
      user, login, register, logout, updateUser,
      orders, addOrder,
      stock, getStock,
      compareList, addToCompare, removeFromCompare,
      searchOpen, setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
