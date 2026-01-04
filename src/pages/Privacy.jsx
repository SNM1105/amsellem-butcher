import React from 'react'
import { useI18n } from '../context/I18nContext'

export default function Privacy(){
  const { t } = useI18n()
  return (
    <div className="container">
      <h1>{t('privacy.title')}</h1>
      <p className="muted">{t('privacy.intro')}</p>
      <h2>{t('privacy.data')}</h2>
      <p>{t('privacy.data_text')}</p>
      <h2>{t('privacy.payments')}</h2>
      <p>{t('privacy.payments_text')}</p>
      <h2>{t('privacy.contact')}</h2>
      <p>{t('privacy.contact_text')}</p>
    </div>
  )
}
