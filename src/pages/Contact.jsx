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
      <form onSubmit={onSubmit} className="contact-form">
        <label>{t('contact.name')}<input name="name" value={form.name} onChange={onChange} required /></label>
        <label>{t('contact.email')}<input name="email" value={form.email} onChange={onChange} required /></label>
        <label>{t('contact.message')}<textarea name="message" value={form.message} onChange={onChange} required /></label>
        <button className="btn" type="submit">{t('contact.send')}</button>
      </form>
    </section>
  )
}
