import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '../context/I18nContext'
import { getSpecial } from '../lib/productsService'

export default function SpecialsBanner() {
  const { lang } = useI18n()
  const [special, setSpecial] = useState({ text_en: '', text_fr: '' })
  const [position, setPosition] = useState(0)
  const itemRef = useRef(null)
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    loadSpecial()
  }, [])

  async function loadSpecial() {
    const data = await getSpecial()
    setSpecial(data)
  }

  // Measure the width of one item
  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth)
    }
  }, [special, lang])

  // Smooth scrolling animation
  useEffect(() => {
    if (!itemWidth) return
    
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => prevPosition - 1)
    }, 30)

    return () => clearInterval(intervalId)
  }, [itemWidth])

  // Reset position for seamless loop
  useEffect(() => {
    if (itemWidth && position <= -itemWidth) {
      setPosition(0)
    }
  }, [position, itemWidth])

  const text = lang === 'fr' ? special.text_fr : special.text_en
  if (!text) return null

  return (
    <div className="specials-banner">
      <div 
        className="specials-scroll"
        style={{ transform: `translateX(${position}px)` }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i} ref={i === 0 ? itemRef : null}>{text}</p>
        ))}
      </div>
    </div>
  )
}
