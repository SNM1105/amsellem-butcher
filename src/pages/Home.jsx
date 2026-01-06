import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { getAllProducts } from '../lib/productsService'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const { t } = useI18n()
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  async function loadFeaturedProducts() {
    const products = await getAllProducts()
    // Get first 3 products with images as featured
    const featured = products.filter(p => p.image).slice(0, 3)
    setFeaturedProducts(featured)
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content fade-up">
            <h1>{t('home.title')}</h1>
            <p className="lead">{t('home.lead')}</p>
            <div className="hero-cta">
              <Link to="/meats" className="btn btn-lg">{t('home.ctaShop')}</Link>
              <Link to="/about" className="btn btn-lg">Our Story</Link>
            </div>
          </div>
          <div className="hero-media fade-up delay-1">
            <img src="/Amsellem-store.jpg" alt="Butcherie hero" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-head centered">
            <h2>{t('home.featuredTitle')}</h2>
            <p className="muted">{t('home.featuredSubtitle')}</p>
          </div>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/meats" className="btn btn-lg">{t('home.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* Kosher Certifications */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-head centered">
            <h2>{t('home.certTitle')}</h2>
            <p className="muted">{t('home.certSubtitle')}</p>
          </div>
          <div className="cert-badges">
            <div className="cert-badge fade-up">
              <div className="badge-image">
                <span className="badge-placeholder">COR</span>
              </div>
              <p>COR Kosher</p>
            </div>
            <div className="cert-badge fade-up delay-1">
              <div className="badge-image">
                <span className="badge-placeholder">MK</span>
              </div>
              <p>Montreal Kosher</p>
            </div>
            <div className="cert-badge fade-up">
              <div className="badge-image">
                <span className="badge-placeholder">OU</span>
              </div>
              <p>Orthodox Union</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
