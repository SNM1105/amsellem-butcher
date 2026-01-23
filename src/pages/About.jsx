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
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="container">
            <span className="section-label scroll-fade">{t('about.ourHistory')}</span>
            <h1 className="scroll-fade gold-accent">{t('home.story')}</h1>
            <p className="about-hero-lead scroll-fade">{t('home.storyDesc')}</p>
          </div>
        </div>
      </section>

      {/* Timeline Navigation */}
      <div className="timeline-nav">
        <div className="timeline-nav-inner">
          <span className="timeline-dot active"></span>
          <span className="timeline-label">1928</span>
          <span className="timeline-connector"></span>
          <span className="timeline-dot"></span>
          <span className="timeline-label">{t('about.today')}</span>
        </div>
      </div>

      {/* Story Sections */}
      <div className="story-sections-wrapper">
      <section className="about-story-section">
        <div className="container-wide">
          <div className="featured-story-layout">
            <div className="featured-story-image scroll-fade">
              <img src="/Ams-Photo-Landscape.jpg" alt="Heritage" />
            </div>
            <div className="featured-story-card scroll-fade">
              <span className="story-year">1928</span>
              <h2>{t('home.heritageTitle')}</h2>
              <p className="featured-description">{t('about.foundingStory')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section alt">
        <div className="container-wide">
          <div className="featured-story-layout reverse">
            <div className="featured-story-card scroll-fade">
              <span className="story-year">1928</span>
              <h2>{t('about.foundersTitle')}</h2>
              <p className="featured-description">{t('about.foundersStory')}</p>
            </div>
            <div className="featured-story-image scroll-fade">
              <img src="/Ams-Photo-profile.jpg" alt="The Original Owners" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container-wide">
          <div className="featured-story-layout">
            <div className="featured-story-image scroll-fade">
              <img src="/amsellem salami.jpg" alt="Today" />
            </div>
            <div className="featured-story-card scroll-fade">
              <span className="story-year">{t('about.today')}</span>
              <h2>{t('home.craftsmanshipTitle')}</h2>
              <p className="featured-description">{t('about.todayStory')}</p>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="container">
          <div className="values-header-centered scroll-fade">
            <span className="section-label" style={{color: 'var(--gold)'}}>{t('about.whatWeBelieve')}</span>
            <h2 className="gold-accent">{t('home.valuesTitle')}</h2>
          </div>
          <div className="values-grid">
            <div className="value-card scroll-fade">
              <div className="value-icon-wrapper">
                <svg viewBox="0 0 60 60" className="value-svg">
                  <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1"/>
                  {/* Scroll/Torah icon for tradition */}
                  <path d="M18 18 L18 42 M42 18 L42 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 18 C18 16 20 14 22 14 L38 14 C40 14 42 16 42 18" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M18 42 C18 44 20 46 22 46 L38 46 C40 46 42 44 42 42" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="24" y1="22" x2="36" y2="22" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="24" y1="27" x2="36" y2="27" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="24" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="24" y1="37" x2="32" y2="37" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>{t('home.traditionTitle')}</h3>
              <p>{t('home.traditionDesc')}</p>
            </div>
            <div className="value-card scroll-fade">
              <div className="value-icon-wrapper">
                <svg viewBox="0 0 60 60" className="value-svg">
                  <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1"/>
                  {/* Award/quality ribbon icon */}
                  <circle cx="30" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M30 17 L31.5 21 L36 21 L32.5 24 L34 28 L30 25.5 L26 28 L27.5 24 L24 21 L28.5 21 Z" fill="currentColor"/>
                  <path d="M24 32 L22 46 L30 40 L38 46 L36 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{t('home.qualityTitle')}</h3>
              <p>{t('home.qualityDesc')}</p>
            </div>
            <div className="value-card scroll-fade">
              <div className="value-icon-wrapper">
                <svg viewBox="0 0 60 60" className="value-svg">
                  <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1"/>
                  {/* Community/people icon */}
                  <circle cx="30" cy="22" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M18 44 C18 36 23 32 30 32 C37 32 42 36 42 44" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="18" cy="26" r="4" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M10 40 C10 35 13 32 18 32" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="42" cy="26" r="4" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M50 40 C50 35 47 32 42 32" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </div>
              <h3>{t('home.communityTitle')}</h3>
              <p>{t('home.communityDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
