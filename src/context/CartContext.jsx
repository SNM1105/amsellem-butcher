import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

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

  const addItem = useCallback(function(product, qty=1){
    setItems(prev=>{
      const match = (p) => product.weight ? (p.id === product.id && p.weight === product.weight) : p.id === product.id
      const found = prev.find(match)
      return found ? prev.map(p=> match(p) ? {...p, qty: p.qty + qty} : p) : [...prev, {...product, qty}]
    })
    setToast({ product, qty })
  }, [])

  const removeItem = useCallback(function(id, weight){
    setItems(prev => prev.filter(p=> weight ? !(p.id === id && p.weight === weight) : p.id !== id))
  }, [])

  const updateQty = useCallback(function(id, qty, weight){
    const match = (p) => weight ? (p.id === id && p.weight === weight) : p.id === id
    setItems(prev => prev.map(p=> match(p) ? {...p, qty} : p))
  }, [])

  const clearCart = useCallback(function(){
    setItems([])
  }, [])

  const total = items.reduce((s,p)=> s + p.price * p.qty * (p.weight || 1), 0)

  const value = useMemo(() => ({
    items, addItem, removeItem, updateQty, clearCart, total, toast
  }), [items, addItem, removeItem, updateQty, clearCart, total, toast])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
