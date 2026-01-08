import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useI18n } from '../context/I18nContext'

export default function Checkout(){
  const { items, total, clearCart } = useCart()
  const { t } = useI18n()
  const [method, setMethod] = useState('delivery')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', street: '', city: '', postal: '' })
  const [processing, setProcessing] = useState(false)
  const [orderError, setOrderError] = useState('')

  const TAX_RATES = { gst: 0.05, qst: 0.09975 }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const deliveryFee = method === 'delivery' ? 5.0 : 0
  const baseAmount = total + deliveryFee
  const gst = +(baseAmount * TAX_RATES.gst).toFixed(2)
  const qst = +(baseAmount * TAX_RATES.qst).toFixed(2)
  const taxTotal = +(gst + qst).toFixed(2)
  const finalAmount = (baseAmount + taxTotal).toFixed(2)

  const handleSubmitOrder = async () => {
    // Validate form
    if (!form.firstName || !form.lastName || !form.phone) {
      setOrderError('Please fill in all required fields')
      return
    }
    if (method === 'delivery' && (!form.email || !form.street || !form.city || !form.postal)) {
      setOrderError('Please fill in all delivery information')
      return
    }

    setProcessing(true)
    setOrderError('')

    try {
      const payload = {
        items: items.map(i => ({ id: i.id, qty: i.qty })),
        method,
        contact: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email || '',
          phone: form.phone
        },
        delivery: method === 'delivery' ? {
          street: form.street,
          city: form.city,
          postal: form.postal
        } : null,
        currency: 'CAD',
        // TODO: replace with real Clover payment token from Clover.js
        paymentToken: 'demo-token'
      }

      const response = await fetch('/api/payments/clover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to submit order')
      }

      const result = await response.json()
      setProcessing(false)
      clearCart()
      alert(`Payment processed successfully! Reference: ${result.paymentId || result.orderId || 'pending'}`)
    } catch (error) {
      console.error('Order submission error:', error)
      setOrderError('Failed to submit order. Please try again.')
      setProcessing(false)
    }
  }

  if(items.length === 0) return (
    <section className="container">
      <h1>{t('checkout.title')}</h1>
      <p>{t('cart.empty')}</p>
    </section>
  )

  return (
    <section className="container checkout-page">
      <h1>{t('checkout.title')}</h1>
      <div className="checkout-grid">
        <div>
          <h3>{t('checkout.method')}</h3>
          <div className="method-options">
            <label className="radio-label"><input type="radio" checked={method==='delivery'} onChange={()=> setMethod('delivery')} /> {t('checkout.delivery')}</label>
            <label className="radio-label"><input type="radio" checked={method==='pickup'} onChange={()=> setMethod('pickup')} /> {t('checkout.pickup')}</label>
          </div>

          <div className="contact-info-form">
            <h4>Contact Information</h4>
            <div className="form-row">
              <label>
                {t('checkout.firstName')}
                <input type="text" name="firstName" value={form.firstName} onChange={handleFormChange} required />
              </label>
              <label>
                {t('checkout.lastName')}
                <input type="text" name="lastName" value={form.lastName} onChange={handleFormChange} required />
              </label>
            </div>
            <label>
              {t('checkout.phone')}
              <input type="tel" name="phone" value={form.phone} onChange={handleFormChange} required />
            </label>
            {method === 'delivery' && (
              <label>
                {t('checkout.email')}
                <input type="email" name="email" value={form.email} onChange={handleFormChange} required />
              </label>
            )}
          </div>

          {method === 'delivery' && (
            <div className="delivery-form">
              <h4>Shipping Information</h4>
              <label>
                {t('checkout.street')}
                <input type="text" name="street" value={form.street} onChange={handleFormChange} required />
              </label>
              <div className="form-row">
                <label>
                  {t('checkout.city')}
                  <input type="text" name="city" value={form.city} onChange={handleFormChange} required />
                </label>
                <label>
                  {t('checkout.postal')}
                  <input type="text" name="postal" value={form.postal} onChange={handleFormChange} required />
                </label>
              </div>
            </div>
          )}

          <h3>{t('checkout.summary')}</h3>
          <div className="order-summary">
            {items.map(i=> (
              <div key={i.id} className="summary-item">
                <span>{i.name} x {i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-line">{t('checkout.subtotal')}: ${total.toFixed(2)}</div>
          <div className="summary-line">{t('checkout.fee')}: ${deliveryFee.toFixed(2)}</div>
          <div className="summary-line">{t('checkout.gst')}: ${gst.toFixed(2)}</div>
          <div className="summary-line">{t('checkout.qst')}: ${qst.toFixed(2)}</div>
          <div className="summary-line">{t('checkout.taxes')}: ${taxTotal.toFixed(2)}</div>
          <div className="summary-line total">{t('checkout.total')}: ${finalAmount}</div>
        </div>
        <div className="payment-panel">
          <h3 style={{margin: '0 0 10px 0'}}>{t('checkout.payWith')}</h3>
          <button 
            className="btn" 
            onClick={handleSubmitOrder}
            disabled={processing}
            style={{marginBottom: '8px' }}
          >
            {processing ? t('checkout.processing') : t('checkout.submitOrder')}
          </button>
          {orderError && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: '8px 0' }}>{orderError}</p>}
          <p className="muted small" style={{margin: '8px 0 0 0'}}>{t('checkout.cloverNote')}</p>
        </div>
      </div>
    </section>
  )
}
