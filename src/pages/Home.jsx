import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

export default function Home(){
  const { t } = useI18n()
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

      {/* Special Offers */}
      <section className="offers-section">
        <div className="container">
          <div className="section-head centered">
            <h2>{t('home.offersTitle')}</h2>
            <p className="muted">{t('home.offersSubtitle')}</p>
          </div>
          <div className="offers-grid">
            <div className="offer-card fade-up">
              <div className="offer-icon">🎯</div>
              <h3>{t('home.offer1Title')}</h3>
              <p>{t('home.offer1Desc')}</p>
            </div>
            <div className="offer-card fade-up delay-1">
              <div className="offer-icon">📦</div>
              <h3>{t('home.offer2Title')}</h3>
              <p>{t('home.offer2Desc')}</p>
            </div>
            <div className="offer-card fade-up delay-1">
              <div className="offer-icon">⭐</div>
              <h3>{t('home.offer3Title')}</h3>
              <p>{t('home.offer3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-head centered">
            <h2>{t('home.certTitle')}</h2>
            <p className="muted">{t('home.certSubtitle')}</p>
          </div>
          <div className="cert-grid">
            <div className="cert-card fade-up">
              <div className="cert-icon">✓</div>
              <h3>{t('home.cert1')}</h3>
              <p>{t('home.cert1Desc')}</p>
            </div>
            <div className="cert-card fade-up delay-1">
              <div className="cert-icon">🥩</div>
              <h3>{t('home.cert2')}</h3>
              <p>{t('home.cert2Desc')}</p>
            </div>
            <div className="cert-card fade-up">
              <div className="cert-icon">👨‍🍳</div>
              <h3>{t('home.cert3')}</h3>
              <p>{t('home.cert3Desc')}</p>
            </div>
            <div className="cert-card fade-up delay-1">
              <div className="cert-icon">⭐</div>
              <h3>{t('home.cert4')}</h3>
              <p>{t('home.cert4Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
