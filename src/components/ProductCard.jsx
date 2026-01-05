import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useI18n } from '../context/I18nContext'

export default function ProductCard({ product, categoryLabel }){
  const { addItem } = useCart()
  const { t } = useI18n()
  const [weight, setWeight] = useState(1)
  
  // Use product data directly from database
  const productName = product.name
  const productDesc = product.description
  
  const isPerLb = productName.includes('per lb')

  const handleAddItem = () => {
    if (isPerLb) {
      addItem({...product, weight}, weight)
    } else {
      addItem(product, 1)
    }
  }

  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={productName} className="product-image" />}
      <div className="product-info">
        <h3>{productName}</h3>
        <p className="muted">{categoryLabel ?? product.category}</p>
        <p className="desc">{productDesc}</p>
      </div>
      <div className="product-actions">
        <div className="price">${product.price.toFixed(2)} {isPerLb ? '/lb' : ''}</div>
        {isPerLb && (
          <div className="weight-input">
            <label htmlFor={`weight-${product.id}`}>Weight (lbs):</label>
            <input
              id={`weight-${product.id}`}
              type="number"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0.1)}
            />
            <div className="estimated-price">${(product.price * weight).toFixed(2)}</div>
          </div>
        )}
        <button className="btn" onClick={handleAddItem}>{t('product.addToBasket')}</button>
      </div>
    </div>
  )
}
