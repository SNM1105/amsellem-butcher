import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { getAllProducts } from '../lib/productsService'

export default function Home(){
  const { t } = useI18n()
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)
    
    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  async function loadProducts() {
    const allProducts = await getAllProducts()
    setProducts(allProducts)
  }

  // Get featured products by category
  const beefProducts = products.filter(p => p.category === 'Beef' && p.image).slice(0, 1)
  const chickenProducts = products.filter(p => p.category === 'Chicken' && p.image).slice(0, 1)
  const premadeProducts = products.filter(p => p.category === 'Premade' && p.image).slice(0, 1)

  return (
    <>
      {/* Hero Section */}
      <section className="hero-main">
        <div className="hero-overlay">
          <div className="hero-content">
            <img src="/amsellem_logo.png" alt="Amsellem" className="hero-logo" />
            <h1 className="hero-tagline">{t('home.heroTagline')}</h1>
            <h2 className="hero-subtitle">{t('home.heroSubtitle')}</h2>
            <Link to="/meats" className="btn-hero">{t('home.heroButton')}</Link>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="categories-section">
        <div className="container-wide">
          <div className="section-header scroll-fade">
            <h2>{t('home.categoriesTitle')}</h2>
            <p className="section-subtitle">{t('home.categoriesSubtitle')}</p>
          </div>
          <div className="categories-carousel-wrapper">
            <div className="categories-carousel">
              <Link to="/meats?category=Beef" className="category-card-carousel">
                <div className="category-image-carousel">
                  <img src={beefProducts[0]?.image || '/img/Rib Eye.JPG'} alt="Beef" />
                  <div className="category-overlay">
                    <h3>{t('home.categoryBeef')}</h3>
                    <p>{t('home.discoverSelection')}</p>
                  </div>
                </div>
              </Link>
              <Link to="/meats?category=Chicken" className="category-card-carousel">
                <div className="category-image-carousel">
                  <img src={chickenProducts[0]?.image || '/img/Whole Chicken.JPG'} alt="Chicken" />
                  <div className="category-overlay">
                    <h3>{t('home.categoryChicken')}</h3>
                    <p>{t('home.discoverSelection')}</p>
                  </div>
                </div>
              </Link>
              <Link to="/meats?category=Premade" className="category-card-carousel">
                <div className="category-image-carousel">
                  <img src={premadeProducts[0]?.image || '/img/Kofta.JPG'} alt="Premade" />
                  <div className="category-overlay">
                    <h3>{t('home.categoryPremade')}</h3>
                    <p>{t('home.discoverSelection')}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text scroll-fade">
              <h2>{t('home.amssellemDifference')}</h2>
              <p>
                {t('home.amssellemDifferenceText')}
              </p>
              <Link to="/about" className="btn-outline">{t('home.learnMore')}</Link>
            </div>
            <div className="about-image scroll-fade">
              <img src="/Amsellem-store.jpg" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="expertise-section">
        <div className="container">
          <div className="section-header centered scroll-fade">
            <h2>{t('home.whyChooseTitle')}</h2>
          </div>
          <div className="expertise-grid">
            <div className="expertise-card scroll-fade">
              <div className="expertise-icon">🥩</div>
              <h3>{t('home.expertButcheryTitle')}</h3>
              <p>{t('home.expertButcheryText')}</p>
            </div>
            <div className="expertise-card scroll-fade">
              <div className="expertise-icon">✡️</div>
              <h3>{t('home.strictlyKosherTitle')}</h3>
              <p>{t('home.strictlyKosherText')}</p>
            </div>
            <div className="expertise-card scroll-fade">
              <div className="expertise-icon">📍</div>
              <h3>{t('home.visitShopTitle')}</h3>
              <p>{t('home.visitShopText')}</p>
              <Link to="/contact" className="expertise-link">{t('home.getDirections')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section">
        <div className="container">
          <div className="social-content">
            <h2>{t('home.stayConnected')}</h2>
            <p>{t('home.stayConnectedText')}</p>
            <div className="social-buttons">
              <a href="#" className="social-btn" target="_blank" rel="noopener noreferrer">
                <span>Facebook</span>
              </a>
              <a href="#" className="social-btn" target="_blank" rel="noopener noreferrer">
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
