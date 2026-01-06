import React from 'react'
import { useI18n } from '../context/I18nContext'

export default function About(){
  const { t } = useI18n()
  return (
    <section className="container history-section">
      <div className="section-head">
        <h1>{t('home.story')}</h1>
        <p className="lead" style={{ maxWidth: '70ch', margin: '0 auto' }}>{t('home.storyDesc')}</p>
      </div>
      <div className="history-timeline">
        <div className="timeline-item fade-up">
          <div className="timeline-content">
            <div className="timeline-image">
              <img src="/Ams-Photo-Landscape.jpg" alt="Historic photo" />
            </div>
            <div className="timeline-text">
              <h3>Heritage & Tradition</h3>
              <p>{t('home.history1')}</p>
            </div>
          </div>
        </div>
        <div className="timeline-item fade-up delay-1">
          <div className="timeline-content reverse">
            <div className="timeline-image portrait">
              <img src="/Ams-Photo-profile.jpg" alt="Craftsmanship" />
            </div>
            <div className="timeline-text">
              <h3>Craftsmanship & Quality</h3>
              <p>{t('home.history2')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
