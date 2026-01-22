import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '../context/I18nContext'
import { getSpecial } from '../lib/productsService'

function TickerItem({ text }) {
  return (
    <div className="ticker-item">
      <svg className="ticker-svg" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="4" fill="#ffffff" />
      </svg>
      <span className="ticker-text">{text}</span>
    </div>
  )
}

export default function SpecialsBanner() {
  const { lang } = useI18n()
  const [special, setSpecial] = useState({ text_en: '', text_fr: '' })
  const scrollRef = useRef(null)
  const [animationDuration, setAnimationDuration] = useState(30)

  useEffect(() => {
    loadSpecial()
  }, [])

  useEffect(() => {
    // Calculate animation duration based on content width
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 2
      // Slower speed: pixels per second
      const speed = 800
      setAnimationDuration(scrollWidth / speed)
    }
  }, [special, lang])

  async function loadSpecial() {
    const data = await getSpecial()
    setSpecial(data)
  }

  const text = lang === 'fr' ? special.text_fr : special.text_en
  if (!text) return null

  // Render items twice for seamless loop
  const items = Array.from({ length: 10 })

  return (
    <div className="specials-banner">
      <div 
        ref={scrollRef}
        className="specials-scroll"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {items.map((_, i) => (
          <TickerItem key={`a-${i}`} text={text} />
        ))}
        {items.map((_, i) => (
          <TickerItem key={`b-${i}`} text={text} />
        ))}
      </div>
    </div>
  )
}
