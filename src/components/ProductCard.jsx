import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useI18n } from '../context/I18nContext'

export default function ProductCard({ product, categoryLabel }){
  const { addItem } = useCart()
  const { t, lang } = useI18n()
  const [weight, setWeight] = useState(1)
  
  // Helper to get translation key from product name
  const getTranslationKeyFromName = (name) => {
    const nameMap = {
      'Ribeye Steak (per lb)': 'b1',
      'Ground Beef (1 lb)': 'b2',
      'Beef Chuck Cubes (per lb)': 'b3',
      'Short Ribs (per lb)': 'b4',
      'Lamb Chops (per lb)': 'l1',
      'Whole Chicken': 'c1',
      'Chicken Breast (per lb)': 'c2',
      'Chicken Thighs (per lb)': 'c3',
      'Veal Steak (per lb)': 'v1',
      'Veal Cubes (per lb)': 'v2',
      'Dafina Spices': 'sp1',
      'Red Paprika': 'sp2',
      'White Pepper': 'sp3',
      'Turmeric': 'sp4',
      'Granulated Garlic': 'sp5',
      'Beef Bones (per lb)': 'b5',
      'Beef Flank Steak (per lb)': 'b6',
      'Beef Roulade (per lb)': 'b7',
      'Beef Tail (per lb)': 'b8',
      'Chicken Cutlet (per lb)': 'c4',
      'Chicken Drumsticks (per lb)': 'c5',
      'Chicken Wings (per lb)': 'c6',
      'Chicken Shnitzel': 'c7',
      'Kofta (premade, 1 lb)': 'p1',
      'Marinated Chicken Thighs': 'p2',
      'Chicken Shawarma Skewers': 'p3',
      'Chinese Noodles': 'p4',
      'Spiced Rice': 'p5',
      'Extra Virgin Olive Oil': 'p6',
      'Burger Patties': 'u1',
      'Cow Leg': 'u2',
      'Lamb Leg': 'u3',
      'Minute Steak': 'u4',
      'Chuck Cubes': 'u5',
      'Sirloin': 'u6',
      'Lamb Ribs': 'u7',
      'Cooking Oil': 'u8',
      'Tritip': 'u9',
      'Chicken Skewers': 'u10',
      'Bone-in Ribeye': 'u11',
      'Steak Spice': 'u14',
      'Beef Ribs': 'u15',
      'Rack of Lamb': 'u17',
      'Marinated Chicken': 'u18',
      'Peppercorn Steak': 'u19',
      'Beef Steak': 'u20',
      'Beef Belly': 'u22',
      'Steak Cubes': 'u23',
      'Lamb Chest': 'u24',
      'Beef Burgers': 'u25',
      'Chuck Roast': 'u26',
      'Cumin': 'u27',
      'Truffle Oil': 'u28',
      'Provencal Herbs': 'u29',
      'Lamb Sirloin': 'u30',
      'Veal Steaks': 'u31',
      'Chicken Nuggets': 'u32',
      'Meatball Spices': 'u33',
      'Beef Strips': 'u34',
      'Specialty Beef': 'u35'
    }
    return nameMap[name] || null
  }
  
  // Try translation if we're in French and have a mapping
  const key = getTranslationKeyFromName(product.name)
  const translatedName = key && lang === 'fr' ? t(`products_list.${key}_name`) : product.name
  const translatedDesc = key && lang === 'fr' ? t(`products_list.${key}_desc`) : product.description
  
  const productName = translatedName || product.name
  const productDesc = translatedDesc || product.description
  
  const isPerLb = productName.toLowerCase().includes('per lb') || productName.toLowerCase().includes('par lb')

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
