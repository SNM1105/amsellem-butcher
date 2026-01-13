import React, { useState } from 'react'
import { useI18n } from '../context/I18nContext'

export default function Contact(){
  const { t } = useI18n()
  const [form, setForm] = useState({name:'', email:'', message:''})
  function onChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }
  function onSubmit(e){
    e.preventDefault()
    alert(t('contact.thanks'))
    setForm({name:'', email:'', message:''})
  }

  return (
    <section className="container contact-page">
      <h1>{t('contact.title')}</h1>
      <div className="contact-content">
        <form onSubmit={onSubmit} className="contact-form">
          <label>{t('contact.name')}<input name="name" value={form.name} onChange={onChange} required /></label>
          <label>{t('contact.email')}<input name="email" value={form.email} onChange={onChange} required /></label>
          <label>{t('contact.message')}<textarea name="message" value={form.message} onChange={onChange} required /></label>
          <button className="btn" type="submit">{t('contact.send')}</button>
        </form>
        
        <div className="opening-hours-box">
          <h2>{t('contact.openingHours')}</h2>
          <div className="hours-list">
            <div className="hours-item">
              <span className="day">{t('contact.monday')}</span>
              <span className="time">8 a.m.–6 p.m.</span>
            </div>
            <div className="hours-item">
              <span className="day">{t('contact.tuesday')}</span>
              <span className="time">8 a.m.–6 p.m.</span>
            </div>
            <div className="hours-item">
              <span className="day">{t('contact.wednesday')}</span>
              <span className="time">8 a.m.–7 p.m.</span>
            </div>
            <div className="hours-item">
              <span className="day">{t('contact.thursday')}</span>
              <span className="time">8 a.m.–8 p.m.</span>
            </div>
            <div className="hours-item">
              <span className="day">{t('contact.friday')}</span>
              <span className="time">8 a.m.–2:30 p.m.</span>
            </div>
            <div className="hours-item closed">
              <span className="day">{t('contact.saturday')}</span>
              <span className="time">{t('contact.closed')}</span>
            </div>
            <div className="hours-item">
              <span className="day">{t('contact.sunday')}</span>
              <span className="time">8 a.m.–5 p.m.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
