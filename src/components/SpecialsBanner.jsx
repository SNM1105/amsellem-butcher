import React, { useState, useEffect } from 'react'
import { useI18n } from '../context/I18nContext'
import { getSpecial } from '../lib/productsService'

export default function SpecialsBanner() {
  const { lang } = useI18n()
  const [special, setSpecial] = useState({ text_en: '', text_fr: '' })

  useEffect(() => {
    loadSpecial()
  }, [])

  async function loadSpecial() {
    const data = await getSpecial()
    setSpecial(data)
  }

  const text = lang === 'fr' ? special.text_fr : special.text_en

  if (!text) return null

  return (
    <div className="specials-banner">
      <div className="specials-scroll">
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}
