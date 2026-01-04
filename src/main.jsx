import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import { I18nProvider } from './context/I18nContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <I18nProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </I18nProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
