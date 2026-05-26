import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import { AdminProvider } from "@/context/AdminContext";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Toaster } from "sonner";

// Public pages
const Home = lazy(() => import("@/pages/Home"));
const Store = lazy(() => import("@/pages/Store"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"));
const About = lazy(() => import("@/pages/About"));
const Recetas = lazy(() => import("@/pages/Recetas"));
const RecipeDetail = lazy(() => import("@/pages/RecipeDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
const Account = lazy(() => import("@/pages/Account"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Envios = lazy(() => import("@/pages/Envios"));
const Pagos = lazy(() => import("@/pages/Pagos"));
const Terminos = lazy(() => import("@/pages/Terminos"));
const Privacidad = lazy(() => import("@/pages/Privacidad"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminBlog = lazy(() => import("@/pages/admin/AdminBlog"));
const AdminRecipes = lazy(() => import("@/pages/admin/AdminRecipes"));

const queryClient = new QueryClient();

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Cargando...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tienda" component={Store} />
        <Route path="/tienda/:categoria" component={Store} />
        <Route path="/producto/:id" component={ProductDetail} />
        <Route path="/carrito" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmacion/:orderId" component={OrderConfirmation} />
        <Route path="/nosotros" component={About} />
        <Route path="/recetas" component={Recetas} />
        <Route path="/receta/:id" component={RecipeDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route path="/contacto" component={Contact} />
        <Route path="/cuenta" component={Account} />
        <Route path="/favoritos" component={Wishlist} />
        <Route path="/faq" component={FAQ} />
        <Route path="/envios" component={Envios} />
        <Route path="/pagos" component={Pagos} />
        <Route path="/terminos" component={Terminos} />
        <Route path="/privacidad" component={Privacidad} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/productos" component={AdminProducts} />
        <Route path="/admin/blog" component={AdminBlog} />
        <Route path="/admin/recetas" component={AdminRecipes} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="chia-theme">
      <AppProvider>
        <AdminProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
                <SearchOverlay />
              </WouterRouter>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                  },
                }}
              />
            </TooltipProvider>
          </QueryClientProvider>
        </AdminProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
