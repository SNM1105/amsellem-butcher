import React from 'react'
import { useI18n } from '../context/I18nContext'

export default function About(){
  const { t } = useI18n()
  return (
    <section className="container about-page">
      <h1>{t('about.title')}</h1>
      <p>{t('about.p1')}</p>
      <p>{t('about.p2')}</p>
    </section>
  )
}
