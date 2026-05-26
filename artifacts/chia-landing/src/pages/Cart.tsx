import { useState } from "react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, Tag, Truck, ArrowLeft, BookmarkPlus, ShoppingCart, X } from "lucide-react";

const PROVINCIAS: Record<string, number> = {
  "Capital Federal": 0,
  "Buenos Aires GBA": 700,
  "Buenos Aires Interior": 1000,
  "Córdoba": 1200,
  "Santa Fe": 1200,
  "Mendoza": 1400,
  "Resto del país": 1800,
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, saveForLater, moveToCart, cartTotal, appliedCoupon, applyCoupon, removeCoupon } = useApp();
  const [couponInput, setCouponInput] = useState("");
  const [provincia, setProvincia] = useState("");
  const [shipping, setShipping] = useState<number | null>(null);

  const activeItems = cartItems.filter((i) => !i.savedForLater);
  const savedItems = cartItems.filter((i) => i.savedForLater);

  const discount = appliedCoupon ? cartTotal * appliedCoupon.discount : 0;
  const shippingCost = shipping !== null
    ? (provincia === "Capital Federal" && cartTotal >= 3000 ? 0 : shipping)
    : null;
  const total = cartTotal - discount + (shippingCost ?? 0);

  const calcShipping = () => {
    if (provincia) setShipping(PROVINCIAS[provincia] ?? 1800);
  };

  return (
    <PageLayout title="Carrito">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Link href="/tienda" className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Seguir comprando
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="font-serif text-2xl font-bold">Mi Carrito</h1>
          {activeItems.length > 0 && (
            <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-sm">{activeItems.length}</span>
          )}
        </div>

        {activeItems.length === 0 && savedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingCart size={64} className="text-muted-foreground/30 mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">Descubrí nuestros productos y empezá a nutrirte mejor.</p>
            <Button asChild data-testid="button-empty-go-store">
              <Link href="/tienda">Ir a la tienda</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items */}
            <div className="flex-1 space-y-4">
              {activeItems.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-card border border-card-border rounded-2xl p-4" data-testid={`cart-item-${item.product.id}`}>
                  <Link href={`/producto/${item.product.id}`}>
                    <img src={item.product.imagenes[0]} alt={item.product.nombre} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${item.product.id}`}>
                      <h3 className="font-serif font-semibold text-base hover:text-primary transition-colors truncate">{item.product.nombre}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground capitalize mt-0.5">{item.product.categoria.replace(/-/g, " ")}</p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <div className="flex items-center border border-border rounded-full overflow-hidden">
                        <button
                          onClick={() => item.cantidad > 1 ? updateQty(item.product.id, item.cantidad - 1) : removeFromCart(item.product.id)}
                          className="px-3 py-1.5 hover:bg-muted transition-colors"
                          aria-label="Disminuir cantidad"
                          data-testid={`button-decrease-${item.product.id}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1.5 font-medium text-sm min-w-[2rem] text-center" data-testid={`qty-${item.product.id}`}>{item.cantidad}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.cantidad + 1)}
                          className="px-3 py-1.5 hover:bg-muted transition-colors"
                          aria-label="Aumentar cantidad"
                          data-testid={`button-increase-${item.product.id}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => saveForLater(item.product.id)} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors" data-testid={`button-save-later-${item.product.id}`}>
                        <BookmarkPlus size={14} /> Guardar para después
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-destructive hover:opacity-70 flex items-center gap-1 transition-colors" data-testid={`button-remove-${item.product.id}`}>
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-primary text-lg">${(item.product.precio * item.cantidad).toLocaleString("es-AR")}</p>
                    {item.cantidad > 1 && <p className="text-xs text-muted-foreground">${item.product.precio.toLocaleString("es-AR")} c/u</p>}
                  </div>
                </div>
              ))}

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-serif text-lg font-semibold mb-4">Guardado para después ({savedItems.length})</h2>
                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div key={item.product.id} className="flex gap-4 bg-muted/40 border border-border rounded-2xl p-4 opacity-75" data-testid={`saved-item-${item.product.id}`}>
                        <img src={item.product.imagenes[0]} alt={item.product.nombre} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.product.nombre}</h3>
                          <p className="font-bold text-primary mt-1">${item.product.precio.toLocaleString("es-AR")}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Button size="sm" variant="outline" onClick={() => moveToCart(item.product.id)} data-testid={`button-move-to-cart-${item.product.id}`}>
                            <ShoppingCart size={14} className="mr-1" /> Al carrito
                          </Button>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-destructive p-1" aria-label="Eliminar" data-testid={`button-remove-saved-${item.product.id}`}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-28 space-y-5">
                <h2 className="font-serif text-xl font-bold">Resumen del pedido</h2>

                {/* Coupon */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2"><Tag size={14} /> Código de cupón</p>
                  {appliedCoupon ? (
                    <div className="flex items-center gap-2 bg-secondary/20 rounded-lg px-3 py-2">
                      <span className="flex-1 text-sm font-medium text-primary">{appliedCoupon.code} — {(appliedCoupon.discount * 100).toFixed(0)}% off</span>
                      <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive" aria-label="Quitar cupón" data-testid="button-remove-coupon">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} placeholder="CHIA20" className="flex-1" data-testid="input-coupon" />
                      <Button variant="outline" size="sm" onClick={() => applyCoupon(couponInput)} data-testid="button-apply-coupon">Aplicar</Button>
                    </div>
                  )}
                  {!appliedCoupon && (
                    <p className="text-xs text-muted-foreground mt-1">Probá: CHIA20, BIENVENIDO, TRIBA10</p>
                  )}
                </div>

                {/* Shipping calculator */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2"><Truck size={14} /> Calcular envío</p>
                  <div className="flex gap-2">
                    <Select value={provincia} onValueChange={setProvincia}>
                      <SelectTrigger className="flex-1 text-sm" data-testid="select-provincia">
                        <SelectValue placeholder="Provincia" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(PROVINCIAS).map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={calcShipping} disabled={!provincia} data-testid="button-calc-shipping">OK</Button>
                  </div>
                  {shippingCost !== null && (
                    <p className="text-xs text-emerald-600 mt-1">
                      {shippingCost === 0 ? "✓ Envío gratis para Capital Federal (pedidos +$3.000)" : `Envío estándar: $${shippingCost.toLocaleString("es-AR")}`}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Descuento ({appliedCoupon?.code})</span>
                      <span>-${discount.toLocaleString("es-AR")}</span>
                    </div>
                  )}
                  {shippingCost !== null && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>{shippingCost === 0 ? "Gratis" : `$${shippingCost.toLocaleString("es-AR")}`}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString("es-AR")}</span>
                </div>

                <Button className="w-full gap-2" size="lg" asChild disabled={activeItems.length === 0} data-testid="button-checkout">
                  <Link href="/checkout">
                    <ShoppingBag size={18} /> Proceder al pago
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild data-testid="button-continue-shopping">
                  <Link href="/tienda">
                    <ArrowLeft size={16} className="mr-2" /> Seguir comprando
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
