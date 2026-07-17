import React from 'react'
import { useI18n } from '../context/I18nContext'

export default function Privacy(){
  const { t } = useI18n()
  return (
    <div className="legal-page">
      <div className="container">
        <h1>{t('privacy.title')}</h1>
        <p className="legal-updated">Last Updated: January 2026</p>
        
        <section className="legal-section">
          <h2>Introduction</h2>
          <p>{t('privacy.intro')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('privacy.data')}</h2>
          <p>{t('privacy.data_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('privacy.payments')}</h2>
          <p>{t('privacy.payments_text')}</p>
        </section>

        <section className="legal-section">
          <h2>Cookies</h2>
          <p>We use essential cookies to ensure the proper functioning of our website. These cookies do not collect personal information.</p>
        </section>

        <section className="legal-section">
          <h2>{t('privacy.contact')}</h2>
          <p>{t('privacy.contact_text')}</p>
          <p>Email: info@maisonamsellem.com</p>
        </section>
      </div>
    </div>
  )
}
