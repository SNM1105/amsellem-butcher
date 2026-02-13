import React, { useState, useEffect } from 'react'
import { useI18n } from '../context/I18nContext'
import { getSpecial } from '../lib/productsService'

function TickerItem({ text }) {
  return (
    <span className="ticker-item">
      <svg className="ticker-svg" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="4" fill="#ffffff" />
      </svg>
      <span className="ticker-text">{text}</span>
    </span>
  )
}

export default function SpecialsBanner() {
  const { lang } = useI18n()
  const [special, setSpecial] = useState({ text_en: '', text_fr: '' })

  useEffect(() => {
    getSpecial().then(setSpecial)
  }, [])

  const text = lang === 'fr' ? special.text_fr : special.text_en
  if (!text) return null

  // Only need 2 copies for a seamless CSS loop
  return (
    <div className="specials-banner">
      <div className="specials-scroll-container">
        <div className="ticker-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <TickerItem key={i} text={text} />
          ))}
        </div>
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <TickerItem key={`dup-${i}`} text={text} />
          ))}
        </div>
      </div>
    </div>
  )
}
