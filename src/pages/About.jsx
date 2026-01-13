import React, { useEffect } from 'react'
import { useI18n } from '../context/I18nContext'

export default function About(){
  const { t } = useI18n()
  
  useEffect(() => {
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
  
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="container">
            <h1 className="scroll-fade">{t('home.story')}</h1>
            <p className="about-hero-lead scroll-fade">{t('home.storyDesc')}</p>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="about-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-item scroll-fade">
              <div className="story-image">
                <img src="/Ams-Photo-Landscape.jpg" alt="Heritage" />
              </div>
              <div className="story-content">
                <h2>{t('home.heritageTitle')}</h2>
                <p>{t('home.history1')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section alt">
        <div className="container">
          <div className="story-grid reverse">
            <div className="story-item scroll-fade">
              <div className="story-image">
                <img src="/Ams-Photo-profile.jpg" alt="Craftsmanship" />
              </div>
              <div className="story-content">
                <h2>{t('home.craftsmanshipTitle')}</h2>
                <p>{t('home.history2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="container">
          <h2 className="scroll-fade centered-title">{t('home.valuesTitle')}</h2>
          <div className="values-grid">
            <div className="value-card scroll-fade">
              <div className="value-icon">🏛️</div>
              <h3>{t('home.traditionTitle')}</h3>
              <p>{t('home.traditionDesc')}</p>
            </div>
            <div className="value-card scroll-fade">
              <div className="value-icon">✨</div>
              <h3>{t('home.qualityTitle')}</h3>
              <p>{t('home.qualityDesc')}</p>
            </div>
            <div className="value-card scroll-fade">
              <div className="value-icon">❤️</div>
              <h3>{t('home.communityTitle')}</h3>
              <p>{t('home.communityDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
