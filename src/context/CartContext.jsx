import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart(){
  return useContext(CartContext)
}

export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('ams_cart')) || [] }
    catch{ return [] }
  })
  
  const [toast, setToast] = useState(null)

  useEffect(()=>{
    localStorage.setItem('ams_cart', JSON.stringify(items))
  }, [items])
  
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  function addItem(product, qty=1){
    setItems(prev=>{
      const match = (p) => product.weight ? (p.id === product.id && p.weight === product.weight) : p.id === product.id
      const found = prev.find(match)
      return found ? prev.map(p=> match(p) ? {...p, qty: p.qty + qty} : p) : [...prev, {...product, qty}]
    })
    setToast({ product, qty })
  }

  function removeItem(id, weight){
    setItems(prev => prev.filter(p=> weight ? !(p.id === id && p.weight === weight) : p.id !== id))
  }

  function updateQty(id, qty, weight){
    const match = (p) => weight ? (p.id === id && p.weight === weight) : p.id === id
    setItems(prev => prev.map(p=> match(p) ? {...p, qty} : p))
  }

  function clearCart(){
    setItems([])
  }

  const total = items.reduce((s,p)=> s + p.price * p.qty * (p.weight || 1), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, toast }}>
      {children}
    </CartContext.Provider>
  )
}
