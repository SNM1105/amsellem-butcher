import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SpecialsBanner from './components/SpecialsBanner'
import Toast from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import { useCart } from './context/CartContext'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import CartPage from './pages/CartPage'
import Privacy from './pages/Privacy'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App(){
  const { toast } = useCart()
  const location = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return (
    <div className="app-root">
      <Header />
      <SpecialsBanner />
      {toast && <Toast product={toast.product} qty={toast.qty} />}
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/meats" element={<Products/>} />
          <Route path="/privacy" element={<Privacy/>} />
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
      </main>
      <Footer />
    </div>
  )
}
