import React from 'react'
import { useI18n } from '../context/I18nContext'

export default function Terms(){
  const { t } = useI18n()
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Terms of Use</h1>
        <p className="legal-updated">Last Updated: January 2026</p>
        
        <section className="legal-section">
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using the Maison Amsellem website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.</p>
        </section>

        <section className="legal-section">
          <h2>Use of Website</h2>
          <p>This website is intended to provide information about Maison Amsellem's products and services. You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of others.</p>
        </section>

        <section className="legal-section">
          <h2>Products and Pricing</h2>
          <p>All products displayed on our website are subject to availability. Prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.</p>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and graphics, is the property of Maison Amsellem and is protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.</p>
        </section>

        <section className="legal-section">
          <h2>Limitation of Liability</h2>
          <p>Maison Amsellem shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or any products purchased from us.</p>
        </section>

        <section className="legal-section">
          <h2>Governing Law</h2>
          <p>These Terms of Use are governed by the laws of the Province of Quebec, Canada. Any disputes shall be resolved in the courts of Quebec.</p>
        </section>

        <section className="legal-section">
          <h2>Contact</h2>
          <p>If you have any questions about these Terms of Use, please contact us at:</p>
          <p>Email: info@maisonamsellem.com</p>
        </section>
      </div>
    </div>
  )
}
