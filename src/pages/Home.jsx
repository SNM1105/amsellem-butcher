import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValue, useMotionValueEvent, animate } from 'framer-motion'
import { useI18n } from '../context/I18nContext'
import { getAllProducts } from '../lib/productsService'
import Carousel from '../components/Carousel'

// Hook for scroll overflow mask effect
function useScrollOverflowMask(scrollXProgress) {
  const left = '0%'
  const right = '100%'
  const leftInset = '15%'
  const rightInset = '85%'
  const transparent = 'rgba(0, 0, 0, 0)'
  const opaque = 'rgba(0, 0, 0, 1)'
  
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, 'change', (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`,
        { duration: 0.3 }
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`,
        { duration: 0.3 }
      )
    } else if (scrollXProgress.getPrevious() === 0 || scrollXProgress.getPrevious() === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`,
        { duration: 0.3 }
      )
    }
  })

  return maskImage
}

export default function Home(){
  const { t } = useI18n()
  const [products, setProducts] = useState([])
  const carouselRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [carouselWidth, setCarouselWidth] = useState(window.innerWidth - 48)
  
  // Track scroll progress for mask effect
  const { scrollXProgress } = useScroll({ container: carouselRef })
  const maskImage = useScrollOverflowMask(scrollXProgress)

  useEffect(() => {
    loadProducts()
    
    // Check if mobile and set carousel width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      setCarouselWidth(window.innerWidth - 48)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
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
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
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
        {/* Video Background */}
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          poster="/Amsellem-store.jpg"
        >
          <source src="/amsellem background video.webm" type="video/webm" />
          <source src="/amsellem background video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-tagline">{t('home.heroTagline')}</h1>
            <img src="/amsellem_logo.png" alt="Amsellem" className="hero-logo" />
            <h2 className="hero-subtitle">{t('home.heroSubtitle')}</h2>
            <Link to="/meats" className="btn-hero">{t('home.heroButton')}</Link>
          </div>
        </div>
      </section>

      {/* Heritage Banner - Full Width */}
      <section className="heritage-banner-section">
        <div className="heritage-banner-inner">
          <div className="heritage-years-large">
            <span className="years-number-large">98</span>
            <span className="years-text-large">{t('home.yearsExperience')}</span>
          </div>
          <div className="heritage-divider-vertical"></div>
          <p className="heritage-tagline-large">{t('home.heritageTagline')}</p>
          <div className="heritage-established">
            <span>{t('home.established')}</span>
            <span className="est-year">1928</span>
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
          {isMobile ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
              <Carousel
                items={[
                  {
                    id: 1,
                    title: t('home.categoryBeef'),
                    description: t('home.discoverSelection'),
                    image: beefProducts[0]?.image || '/img/Rib Eye.JPG',
                    link: '/meats?category=Beef'
                  },
                  {
                    id: 2,
                    title: t('home.categoryChicken'),
                    description: t('home.discoverSelection'),
                    image: chickenProducts[0]?.image || '/img/Whole Chicken.JPG',
                    link: '/meats?category=Chicken'
                  },
                  {
                    id: 3,
                    title: t('home.categoryPremade'),
                    description: t('home.discoverSelection'),
                    image: premadeProducts[0]?.image || '/img/Kofta.JPG',
                    link: '/meats?category=Premade'
                  }
                ]}
                baseWidth={carouselWidth}
                autoplay
                autoplayDelay={4000}
                pauseOnHover
                loop
              />
            </div>
          ) : (
            <motion.div 
              ref={carouselRef}
              className="categories-carousel-wrapper"
            >
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
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section - Featured Story */}
      <section className="about-section featured-story">
        <div className="container-wide">
          <div className="featured-story-layout">
            <div className="featured-story-image scroll-fade">
              <img src="/amsellem salami.jpg" alt="Our Story" />
            </div>
            <div className="featured-story-card scroll-fade">
              <h2>{t('home.amssellemDifference')}</h2>
              <p className="featured-description">
                {t('home.amssellemDifferenceText')}
              </p>
              <Link to="/about" className="featured-link">{t('home.learnMore')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Maison Loste inspired process steps */}
      <section className="expertise-section">
        <div className="container-wide">
          <div className="section-header centered scroll-fade">
            <span className="section-label">{t('home.ourExpertise')}</span>
            <h2 className="gold-accent">{t('home.whyChooseTitle')}</h2>
          </div>
          
          {/* Process Steps - Interactive Cards */}
          <div className="process-steps">
            <div className="process-step scroll-fade" data-step="1">
              <div className="step-number">
                <span>01</span>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <div className="step-icon">
                  <img src="/knife.png" alt="Butcher Knife" className="butcher-icon" />
                </div>
                <h3>{t('home.expertButcheryTitle')}</h3>
                <p>{t('home.expertButcheryText')}</p>
              </div>
            </div>

            <div className="process-step scroll-fade" data-step="2">
              <div className="step-number">
                <span>02</span>
                <div className="step-line last"></div>
              </div>
              <div className="step-content">
                <div className="step-icon">
                  <img src="/kosher.png" alt="Kosher Certified" className="kosher-badge" />
                </div>
                <h3>{t('home.strictlyKosherTitle')}</h3>
                <p>{t('home.strictlyKosherText')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Connect & Shop Section - Split Layout */}
      <section className="connect-shop-section">
        <div className="connect-shop-grid">
          {/* Stay Connected Half */}
          <div className="connect-half">
            <div className="connect-content">
              <h2>{t('home.stayConnected')}</h2>
              <p>{t('home.stayConnectedText')}</p>
              <div className="social-buttons">
                <a href="https://www.facebook.com/maisomamaellem/" className="social-btn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a href="https://www.instagram.com/maisonamsellem/?hl=en" className="social-btn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
          {/* Visit Shop Half */}
          <div className="shop-half">
            <div className="shop-content">
              <div className="shop-icon">
                <svg viewBox="0 0 80 80" className="location-icon-large">
                  <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M40 18 C28 18 22 28 22 38 C22 52 40 62 40 62 C40 62 58 52 58 38 C58 28 52 18 40 18 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="40" cy="36" r="7" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h2>{t('home.visitShopTitle')}</h2>
              <p>{t('home.visitShopText')}</p>
              <Link to="/contact" className="btn-shop-visit">{t('home.getDirections')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
