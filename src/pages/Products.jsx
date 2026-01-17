import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllProducts, getCategories } from '../lib/productsService'
import ProductCard from '../components/ProductCard'
import { useI18n } from '../context/I18nContext'

export default function Products(){
  const { t, tCategory, lang } = useI18n()
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [cat, setCat] = useState(categoryParam || 'All')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
      setLoading(false)
    }
    loadData()
  }, [])
  
  // Update category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setCat(categoryParam)
    }
  }, [categoryParam])

  const list = cat === 'All' ? products : products.filter(p=> p.category === cat)

  if (loading) {
    return (
      <section className="container products-page">
        <h1>{t('products.title')}</h1>
        <p>Loading products...</p>
      </section>
    )
  }

  return (
    <section className="container products-page">
      <h1>{t('products.title')}</h1>
      <div className="filters">
        <button className={cat==='All'? 'active':''} onClick={()=>setCat('All')}>{t('products.all')}</button>
        {categories.map(c=> (
          <button key={c} className={cat===c? 'active':''} onClick={()=>setCat(c)}>{tCategory(c)}</button>
        ))}
      </div>

      <div className="grid">
        {list.map(p=> (
          <ProductCard key={p.id} product={p} categoryLabel={tCategory(p.category)} lang={lang} />
        ))}
      </div>
    </section>
  )
}
