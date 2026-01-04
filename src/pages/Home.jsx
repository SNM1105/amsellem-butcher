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
              <Link to="/about" className="btn btn-lg">{t('home.ctaHistory')}</Link>
            </div>
          </div>
          <div className="hero-media fade-up delay-1">
            <img src="/Amsellem-store.jpg" alt="Butcherie hero" />
          </div>
        </div>
      </section>

      <section className="container history-section">
        <div className="section-head">
          <h2>{t('home.story')}</h2>
          <p className="muted">{t('home.storyDesc')}</p>
        </div>
        <div className="history-grid">
          <div className="panel fade-up">
            <img src="/Ams-Photo-Landscape.jpg" alt="Historic photo" className="media" />
            <p>{t('home.history1')}</p>
          </div>
          <div className="panel portrait-panel fade-up delay-1">
            <img src="/Ams-Photo-profile.jpg" alt="Craftsmanship" className="media" />
            <p>{t('home.history2')}</p>
          </div>
        </div>
      </section>
    </>
  )
}
