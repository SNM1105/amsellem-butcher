import React from 'react'
import { useI18n } from '../context/I18nContext'

export default function Toast({ product, qty }) {
  const { lang } = useI18n()
  
  if (!product) return null
  
  const name = lang === 'fr' && product.name_fr ? product.name_fr : product.name_en
  
  return (
    <div className="toast">
      <div className="toast-icon">✓</div>
      <div className="toast-content">
        <div className="toast-title">{lang === 'fr' ? 'Ajouté au panier' : 'Added to cart'}</div>
        <div className="toast-message">{name}</div>
      </div>
    </div>
  )
}
