import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useI18n } from '../context/I18nContext'

export default function Header(){
  const { items } = useCart()
  const { t, toggleLang, lang } = useI18n()
  const count = items.reduce((s,i)=> s + i.qty, 0)
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="hebrew-blessing">בס״ד</div>
      <div className="container header-inner">
        <button className="menu-button" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <Link to="/" className="brand-wrap" onClick={()=>setOpen(false)}>
          <img src="/Maison-Amsellem_tete.png" alt="Amsellem logo" className="logo" />
        </Link>

        <nav className="desktop-nav">
          <Link to="/meats">{t('nav.shop')}</Link>
          <Link to="/recipes">{t('nav.recipes')}</Link>
          <Link to="/about">{t('nav.story')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          <Link to="/cart" className="icon-button cart" aria-label={t('nav.cart')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6h14l-1.5 9h-12L5 4H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
              <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
            </svg>
            <span className="cart-count" aria-hidden>{count}</span>
          </Link>
          <button className="lang-link" onClick={toggleLang} aria-label="Toggle language">
            {lang.toUpperCase()}/{lang === 'en' ? 'FR' : 'EN'}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <span>Amsellem</span>
          <button className="close-button" aria-label="Close menu" onClick={()=>setOpen(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="drawer-links">
          <Link to="/meats" onClick={()=>setOpen(false)}>{t('nav.shop')}</Link>
          <Link to="/recipes" onClick={()=>setOpen(false)}>{t('nav.recipes')}</Link>
          <Link to="/about" onClick={()=>setOpen(false)}>{t('nav.story')}</Link>
          <Link to="/contact" onClick={()=>setOpen(false)}>{t('nav.contact')}</Link>
          <Link to="/cart" onClick={()=>setOpen(false)}>{t('nav.cart')} ({count})</Link>
          <button className="drawer-button" onClick={()=>{ toggleLang(); setOpen(false) }}>
            {lang.toUpperCase()} / {lang === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      </div>
      {open && <div className="drawer-overlay" onClick={()=>setOpen(false)} />}
    </header>
  )
}
