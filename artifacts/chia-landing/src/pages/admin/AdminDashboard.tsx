import { AdminLayout } from "./AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { useApp } from "@/context/AppContext";
import { Package, BookOpen, ChefHat, ShoppingBag, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "wouter";

function StatCard({ icon: Icon, label, value, color, sub }: { icon: any; label: string; value: string | number; color: string; sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold mt-0.5">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { products, blogPosts, recipes } = useAdmin();
  const { orders } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStock = products.filter((p) => p.stock < 5).length;

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen de actividad de CHÍA Espacio Saludable</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Package} label="Productos" value={products.length} color="bg-primary" sub={`${lowStock} con stock bajo`} />
          <StatCard icon={BookOpen} label="Posts de blog" value={blogPosts.length} color="bg-blue-500" />
          <StatCard icon={ChefHat} label="Recetas" value={recipes.length} color="bg-orange-500" />
          <StatCard icon={ShoppingBag} label="Pedidos totales" value={totalOrders} color="bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={DollarSign} label="Ingresos totales" value={`$${totalRevenue.toLocaleString("es-AR")}`} color="bg-emerald-500" />
          <StatCard icon={TrendingUp} label="Ticket promedio" value={totalOrders > 0 ? `$${Math.round(totalRevenue / totalOrders).toLocaleString("es-AR")}` : "$0"} color="bg-amber-500" />
          <StatCard icon={Users} label="Stock bajo" value={`${lowStock} productos`} color="bg-red-500" sub="Con menos de 5 unidades" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Pedidos recientes</h2>
              <span className="text-xs text-muted-foreground">{totalOrders} total</span>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No hay pedidos todavía</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{o.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.fecha).toLocaleDateString("es-AR")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-primary">${o.total.toLocaleString("es-AR")}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        o.estado === "Entregado" ? "bg-emerald-100 text-emerald-700" :
                        o.estado === "Enviado" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>{o.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Productos con stock bajo</h2>
            {lowStock === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">Todos los productos tienen buen stock ✓</p>
            ) : (
              <div className="space-y-3">
                {products.filter((p) => p.stock < 5).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <img src={p.imagenes[0]} alt={p.nombre} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.nombre}</p>
                      <p className="text-xs text-muted-foreground">${p.precio.toLocaleString("es-AR")}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {p.stock === 0 ? "Sin stock" : `${p.stock} uds`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link href="/admin/productos">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 hover:bg-primary/10 transition-colors cursor-pointer group">
              <Package className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-semibold">Gestionar productos</h3>
              <p className="text-sm text-muted-foreground mt-1">Crear, editar y eliminar productos de la tienda</p>
            </div>
          </Link>
          <Link href="/admin/blog">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 hover:bg-blue-500/10 transition-colors cursor-pointer group">
              <BookOpen className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-semibold">Gestionar blog</h3>
              <p className="text-sm text-muted-foreground mt-1">Publicar y editar artículos del blog</p>
            </div>
          </Link>
          <Link href="/admin/recetas">
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5 hover:bg-orange-500/10 transition-colors cursor-pointer group">
              <ChefHat className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-semibold">Gestionar recetas</h3>
              <p className="text-sm text-muted-foreground mt-1">Crear y editar recetas saludables</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
