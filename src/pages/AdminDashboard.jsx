import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useI18n } from '../context/I18nContext'
import { getAllProducts, getCategories, updateProduct, deleteProduct, createProduct, getSpecial, updateSpecial } from '../lib/productsService'
import Modal from '../components/Modal'

export default function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [special, setSpecial] = useState(null)
  const [editingSpecial, setEditingSpecial] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadData()
    loadSpecial()
  }, [])

  async function loadData() {
    console.log('loadData called')
    setLoading(true)
    const [productsData, categoriesData] = await Promise.all([
      getAllProducts(),
      getCategories()
    ])
    console.log('Products loaded:', productsData.length, 'products')
    setProducts(productsData)
    setCategories(categoriesData)
    setLoading(false)
  }

  async function loadSpecial() {
    const data = await getSpecial()
    setSpecial(data)
  }

  const handleLogout = useCallback(() => {
    logout()
    navigate('/admin')
  }, [logout, navigate])

  const handleEdit = useCallback((product) => {
    setEditingProduct({ 
      ...product, 
      image_url: product.image
    })
    setIsModalOpen(true)
    setShowAddForm(false)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }, [])

  const handleModalSave = async (e) => {
    e.preventDefault()
    console.log('handleModalSave called with editingProduct:', editingProduct)
    try {
      const result = await updateProduct(editingProduct.id, editingProduct)
      console.log('Update result:', result)
      await loadData()
      console.log('Data reloaded')
      setIsModalOpen(false)
      setEditingProduct(null)
      alert(t('admin.updateSuccess'))
    } catch (error) {
      console.error('Error in handleModalSave:', error)
      alert(t('admin.updateError') + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(t('admin.deleteConfirm'))) return
    
    try {
      await deleteProduct(id)
      await loadData()
    } catch (error) {
      alert(t('admin.deleteError') + error.message)
    }
  }

  const handleAdd = () => {
    setShowAddForm(true)
    setEditingProduct(null)
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newProduct = {
      name_en: formData.get('name_en'),
      name_fr: formData.get('name_fr'),
      description_en: formData.get('description_en'),
      description_fr: formData.get('description_fr'),
      price: formData.get('price'),
      category: formData.get('category'),
      stock: formData.get('stock'),
      image_url: formData.get('image_url')
    }
    
    try {
      await createProduct(newProduct)
      await loadData()
      setShowAddForm(false)
      e.target.reset()
    } catch (error) {
      alert(t('admin.createError') + error.message)
    }
  }

  const handleSaveSpecial = async (e) => {
    e.preventDefault()
    try {
      await updateSpecial(special.id, special)
      await loadSpecial()
      setEditingSpecial(false)
      alert(t('admin.specialUpdateSuccess'))
    } catch (error) {
      alert(t('admin.specialUpdateError') + error.message)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <h1>{t('admin.dashboard')}</h1>
        <p>{t('admin.loading')}</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <div className="admin-header-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>{t('admin.dashboard')}</h1>
        <div className="admin-actions-mobile" style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" onClick={handleAdd}>{t('admin.addProduct')}</button>
          <button className="btn" onClick={handleLogout}>{t('admin.logout')}</button>
        </div>
      </div>

      {special && !editingSpecial && (
        <div className="panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2>{t('admin.specialsBanner')}</h2>
            <button className="btn" onClick={() => setEditingSpecial(true)}>{t('admin.edit')}</button>
          </div>
          <p style={{ color: 'var(--muted)', marginTop: '12px' }}>English: {special.text_en}</p>
          <p style={{ color: 'var(--muted)' }}>French: {special.text_fr}</p>
        </div>
      )}

      {special && editingSpecial && (
        <div className="panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2>{t('admin.edit')} {t('admin.specialsBanner')}</h2>
          <form onSubmit={handleSaveSpecial}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label>{t('admin.bannerTextEn')}</label>
                <textarea
                  value={special.text_en}
                  onChange={(e) => setSpecial({ ...special, text_en: e.target.value })}
                  rows="2"
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>{t('admin.bannerTextFr')}</label>
                <textarea
                  value={special.text_fr}
                  onChange={(e) => setSpecial({ ...special, text_fr: e.target.value })}
                  rows="2"
                  style={inputStyle}
                  required
                />
              </div>
              <div className="form-actions-mobile" style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn">{t('admin.save')}</button>
                <button type="button" className="btn" onClick={() => setEditingSpecial(false)}>{t('admin.cancel')}</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {showAddForm && (
        <div className="panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2>{t('admin.addNewProduct')}</h2>
          <form onSubmit={handleCreateProduct}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label>{t('admin.nameEn')}</label>
                <input type="text" name="name_en" required style={inputStyle} />
              </div>
              <div>
                <label>{t('admin.nameFr')}</label>
                <input type="text" name="name_fr" required style={inputStyle} />
              </div>
              <div>
                <label>{t('admin.price')}</label>
                <input type="number" name="price" step="0.01" required style={inputStyle} />
              </div>
              <div>
                <label>{t('admin.category')}</label>
                <select name="category" required style={inputStyle}>
                  <option value="">{t('admin.selectCategory')}</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label>{t('admin.descEn')}</label>
                <textarea name="description_en" rows="3" style={inputStyle} />
              </div>
              <div>
                <label>{t('admin.descFr')}</label>
                <textarea name="description_fr" rows="3" style={inputStyle} />
              </div>
              <div>
                <label>{t('admin.stock')}</label>
                <input type="number" name="stock" defaultValue="0" style={inputStyle} />
              </div>
              <div>
                <label>{t('admin.imageUrl')}</label>
                <input type="text" name="image_url" style={inputStyle} />
              </div>
              <div className="form-actions-mobile" style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn">{t('admin.create')}</button>
                <button type="button" className="btn" onClick={() => setShowAddForm(false)}>{t('admin.cancel')}</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={t('admin.editProduct')}>
        {editingProduct && (
          <form onSubmit={handleModalSave}>
            {editingProduct.image_url && (
              <div style={{ marginBottom: '16px' }}>
                <img 
                  src={editingProduct.image_url} 
                  alt={editingProduct.name_en}
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label>{t('admin.nameEn')}</label>
                <input
                  type="text"
                  value={editingProduct.name_en || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name_en: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>{t('admin.nameFr')}</label>
                <input
                  type="text"
                  value={editingProduct.name_fr || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name_fr: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>{t('admin.price')}</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>{t('admin.category')}</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  style={inputStyle}
                  required
                >
                  <option value="">{t('admin.selectCategory')}</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label>{t('admin.descEn')}</label>
                <textarea
                  value={editingProduct.description_en || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description_en: e.target.value })}
                  rows="3"
                  style={inputStyle}
                />
              </div>
              <div>
                <label>{t('admin.descFr')}</label>
                <textarea
                  value={editingProduct.description_fr || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description_fr: e.target.value })}
                  rows="3"
                  style={inputStyle}
                />
              </div>
              <div>
                <label>{t('admin.stock')}</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label>{t('admin.imageUrl')}</label>
                <input
                  type="text"
                  value={editingProduct.image_url || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div className="form-actions-mobile" style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn">{t('admin.save')}</button>
                <button type="button" className="btn" onClick={handleModalClose}>{t('admin.cancel')}</button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      <div className="table-wrapper" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={thStyle}>{t('admin.image')}</th>
              <th style={thStyle}>{t('admin.name')}</th>
              <th style={thStyle}>{t('admin.price')}</th>
              <th style={thStyle}>{t('admin.category')}</th>
              <th style={thStyle}>{t('admin.stock')}</th>
              <th style={thStyle}>{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={tdStyle}>
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name_en} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  )}
                </td>
                <td style={tdStyle}>{product.name_en}</td>
                <td style={tdStyle}>${product.price.toFixed(2)}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>
                  <button 
                    className="btn" 
                    style={{ marginRight: '8px', padding: '4px 12px' }}
                    onClick={() => handleEdit(product)}
                  >
                    {t('admin.edit')}
                  </button>
                  <button 
                    className="btn" 
                    style={{ padding: '4px 12px', background: 'var(--accent)' }}
                    onClick={() => handleDelete(product.id)}
                  >
                    {t('admin.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'var(--bg)',
  color: 'var(--text)',
  fontFamily: 'inherit'
}

const thStyle = {
  textAlign: 'left',
  padding: '12px',
  fontWeight: '600'
}

const tdStyle = {
  padding: '12px'
}
