import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Hero } from '@/sections/Hero';
import { History } from '@/sections/History';
import { Gallery } from '@/sections/Gallery';
import { Services } from '@/sections/Services';
import { Process } from '@/sections/Process';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { Login } from '@/admin/Login';
import { AdminLayout } from '@/admin/AdminLayout';
import { Dashboard } from '@/admin/Dashboard';
import { Products } from '@/admin/Products';
import { Categories } from '@/admin/Categories';
import { Orders } from '@/admin/Orders';

// Main website layout
function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Navigation />
      <main>
        <Hero />
        <History />
        <Gallery />
        <div id="servicios">
          <Services />
        </div>
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

// Admin routes
function AdminRoutes() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
