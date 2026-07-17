import React, { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SpecialsBanner from './components/SpecialsBanner'
import Toast from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import { useCart } from './context/CartContext'

// Lazy-load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const Recipes = lazy(() => import('./pages/Recipes'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CartPage = lazy(() => import('./pages/CartPage'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

export default function App(){
  const { toast } = useCart()
  const location = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Only show specials banner on the shop/meats page
  const showBanner = location.pathname === '/meats'
  
  return (
    <div className="app-root">
      <Header />
      {showBanner && <SpecialsBanner />}
      {toast && <Toast product={toast.product} qty={toast.qty} />}
      <main className={showBanner ? 'with-banner' : ''}>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/recipes" element={<Recipes/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/meats" element={<Products/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard/>
              </ProtectedRoute>
            } 
          />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
