import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useI18n } from '../context/I18nContext'

export default function CartPage(){
  const { items, updateQty, removeItem, total } = useCart()
  const { t } = useI18n()
  const nav = useNavigate()

  if(items.length === 0) return (
    <section className="container">
      <h1>{t('cart.title')}</h1>
      <p>{t('cart.empty')}</p>
      <Link to="/meats" className="btn">{t('cart.browse')}</Link>
    </section>
  )

  return (
    <section className="container">
      <h1>{t('cart.title')}</h1>
      <div className="cart-list">
        {items.map(i=> (
          <div className="cart-item" key={i.weight ? `${i.id}-${i.weight}` : i.id}>
            <div>
              <strong>{i.name}</strong>
              <div className="muted">${i.price.toFixed(2)} {i.weight ? `x ${i.weight} lb` : t('product.each')}</div>
            </div>
            <div className="cart-actions">
              <input type="number" min="1" value={i.qty} onChange={e=> updateQty(i.id, Number(e.target.value), i.weight)} />
              <div className="item-total">${(i.price * i.qty * (i.weight || 1)).toFixed(2)}</div>
              <button className="btn small" onClick={()=> removeItem(i.id, i.weight)}>{t('cart.remove')}</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div>{t('cart.total')}: <strong>${total.toFixed(2)}</strong></div>
        <button className="btn" onClick={()=> nav('/checkout')}>
          <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6h14l-1.5 9h-12L5 4H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('cart.proceed')}
          </span>
        </button>
      </div>
    </section>
  )
}
