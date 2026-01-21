import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

export default function Footer(){
  const { t } = useI18n()
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${t('footer.address')}, ${t('footer.city')} ${t('footer.postal')}`)}`

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-location">
          <h4>{t('footer.title')}</h4>
          <address>
            <a href={mapUrl} target="_blank" rel="noreferrer">
              {t('footer.address')}<br />
              {t('footer.city')} {t('footer.postal')}
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
        <div className="footer-hours">
          <h4>{t('contact.openingHours')}</h4>
          <div className="hours-list-compact">
            <div className="hours-item-compact">
              <span className="day">{t('contact.sunday')}</span>
              <span className="time">
                <span className="time-start">8 a.m.</span>
                <span className="time-dash">–</span>
                <span className="time-end">5 p.m.</span>
              </span>
            </div>
            <div className="hours-item-compact">
              <span className="day">{t('contact.monday')}</span>
              <span className="time">
                <span className="time-start">8 a.m.</span>
                <span className="time-dash">–</span>
                <span className="time-end">6 p.m.</span>
              </span>
            </div>
            <div className="hours-item-compact">
              <span className="day">{t('contact.tuesday')}</span>
              <span className="time">
                <span className="time-start">8 a.m.</span>
                <span className="time-dash">–</span>
                <span className="time-end">6 p.m.</span>
              </span>
            </div>
            <div className="hours-item-compact">
              <span className="day">{t('contact.wednesday')}</span>
              <span className="time">
                <span className="time-start">8 a.m.</span>
                <span className="time-dash">–</span>
                <span className="time-end">7 p.m.</span>
              </span>
            </div>
            <div className="hours-item-compact">
              <span className="day">{t('contact.thursday')}</span>
              <span className="time">
                <span className="time-start">8 a.m.</span>
                <span className="time-dash">–</span>
                <span className="time-end">8 p.m.</span>
              </span>
            </div>
            <div className="hours-item-compact">
              <span className="day">{t('contact.friday')}</span>
              <span className="time">
                <span className="time-start">8 a.m.</span>
                <span className="time-dash">–</span>
                <span className="time-end">2:30 p.m.</span>
              </span>
            </div>
            <div className="hours-item-compact closed">
              <span className="day">{t('contact.saturday')}</span>
              <span className="time">{t('contact.closed')}</span>
            </div>
          </div>
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
