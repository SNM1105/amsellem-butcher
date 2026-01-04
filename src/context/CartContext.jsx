import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart(){
  return useContext(CartContext)
}

export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try{
      const raw = localStorage.getItem('ams_cart')
      return raw ? JSON.parse(raw) : []
    }catch(e){
      return []
    }
  })

  useEffect(()=>{
    localStorage.setItem('ams_cart', JSON.stringify(items))
  }, [items])

  function addItem(product, qty=1){
    setItems(prev=>{
      const itemId = product.weight ? `${product.id}-${product.weight}` : product.id
      const found = prev.find(p=> product.weight ? (p.id === product.id && p.weight === product.weight) : (p.id === product.id))
      if(found){
        return prev.map(p=> (product.weight ? (p.id === product.id && p.weight === product.weight) : p.id === product.id) ? {...p, qty: p.qty + qty} : p)
      }
      return [...prev, {...product, qty}]
    })
  }

  function removeItem(id, weight){
    setItems(prev => prev.filter(p=> weight ? !(p.id === id && p.weight === weight) : p.id !== id))
  }

  function updateQty(id, qty, weight){
    setItems(prev => prev.map(p=> weight ? (p.id === id && p.weight === weight ? {...p, qty} : p) : (p.id === id ? {...p, qty} : p)))
  }

  function clearCart(){
    setItems([])
  }

  const total = items.reduce((s,p)=> s + p.price * p.qty * (p.weight || 1), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}
