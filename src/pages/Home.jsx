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
    </>
  )
}
