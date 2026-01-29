import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '../context/I18nContext'
import { getSpecial } from '../lib/productsService'

function TickerItem({ text, position }) {
  return (
    <div 
      className="ticker-item"
      style={{ transform: `translate(${position}px, 0px)` }}
    >
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
  const [position, setPosition] = useState(0)
  const tickerRef = useRef(null)
  const [tickerWidth, setTickerWidth] = useState(0)

  useEffect(() => {
    loadSpecial()
  }, [])

  useEffect(() => {
    // Measure the width of one ticker item
    if (tickerRef.current) {
      const width = tickerRef.current.offsetWidth
      setTickerWidth(width)
    }
  }, [special, lang])

  useEffect(() => {
    if (!tickerWidth) return

    // Determine scroll speed based on screen size (pixels per frame)
    const isMobile = window.innerWidth <= 768
    const scrollSpeed = isMobile ? 0.8 : 0.8 // Higher = faster scroll
    const intervalTime = 10 // Update every 10ms

    const intervalId = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset when one full ticker width has scrolled
        if (prevPosition <= -tickerWidth) {
          return 0
        }
        return prevPosition - scrollSpeed
      })
    }, intervalTime)

    return () => clearInterval(intervalId)
  }, [tickerWidth])

  async function loadSpecial() {
    const data = await getSpecial()
    setSpecial(data)
  }

  const text = lang === 'fr' ? special.text_fr : special.text_en
  if (!text) return null

  // Render more items for desktop to ensure seamless loop on wider screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const tickerCount = Array.from({ length: isMobile ? 15 : 25 })

  return (
    <div className="specials-banner">
      <div className="specials-scroll-container">
        {tickerCount.map((_, index) => (
          <TickerItem 
            key={index} 
            text={text} 
            position={position}
          />
        ))}
        <div ref={tickerRef} style={{ position: 'absolute', visibility: 'hidden' }}>
          <TickerItem text={text} position={0} />
        </div>
      </div>
    </div>
  )
}
