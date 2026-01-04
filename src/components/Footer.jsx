import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

export default function Footer(){
  const { t } = useI18n()
  const address = t('footer.address')
  const city = t('footer.city')
  const postal = t('footer.postal')
  const mapQuery = encodeURIComponent(`${address}, ${city} ${postal}`)
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-location">
          <h4>{t('footer.title')}</h4>
          <address>
            <a href={mapUrl} target="_blank" rel="noreferrer">
              {address}<br />
              {city} {postal}
            </a>
          </address>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.066947308089!2d-73.73521!3d45.51818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91f5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2s2079%20Rue%20Saint-Louis%2C%20Saint-Laurent%2C%20QC%20H4M%201P1!5e0!3m2!1sen!2sca!4v1703510000000" 
            width="100%" 
            height="250" 
            style={{border: 0, marginTop: '1rem'}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="footer-links">
          <Link to="/privacy">{t('footer.privacy')}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span className="muted">© {new Date().getFullYear()} Amsellem</span>
        </div>
      </div>
    </footer>
  )
}
