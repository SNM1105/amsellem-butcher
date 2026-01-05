import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { getAllProducts, getCategories, updateProduct, deleteProduct, createProduct } from '../lib/productsService'

export default function AdminDashboard() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [productsData, categoriesData] = await Promise.all([
      getAllProducts(),
      getCategories()
    ])
    setProducts(productsData)
    setCategories(categoriesData)
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const handleEdit = (product) => {
    setEditingProduct({ 
      ...product, 
      image_url: product.image
    })
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await updateProduct(editingProduct.id, editingProduct)
      await loadData()
      setEditingProduct(null)
    } catch (error) {
      alert('Error updating product: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await deleteProduct(id)
      await loadData()
    } catch (error) {
      alert('Error deleting product: ' + error.message)
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
      alert('Error creating product: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" onClick={handleAdd}>Add Product</button>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {showAddForm && (
        <div className="panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2>Add New Product</h2>
          <form onSubmit={handleCreateProduct}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label>Name (English)</label>
                <input type="text" name="name_en" required style={inputStyle} />
              </div>
              <div>
                <label>Name (French)</label>
                <input type="text" name="name_fr" required style={inputStyle} />
              </div>
              <div>
                <label>Price</label>
                <input type="number" name="price" step="0.01" required style={inputStyle} />
              </div>
              <div>
                <label>Category</label>
                <input type="text" name="category" list="categories" required style={inputStyle} />
                <datalist id="categories">
                  {categories.map(cat => <option key={cat} value={cat} />)}
                </datalist>
              </div>
              <div>
                <label>Description (English)</label>
                <textarea name="description_en" rows="3" style={inputStyle} />
              </div>
              <div>
                <label>Description (French)</label>
                <textarea name="description_fr" rows="3" style={inputStyle} />
              </div>
              <div>
                <label>Stock</label>
                <input type="number" name="stock" defaultValue="0" style={inputStyle} />
              </div>
              <div>
                <label>Image URL</label>
                <input type="text" name="image_url" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn">Create</button>
                <button type="button" className="btn" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {editingProduct && (
        <div className="panel" style={{ padding: '24px', marginBottom: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
          <h2>Edit Product</h2>
          {editingProduct.image_url && (
            <div style={{ marginBottom: '16px' }}>
              <img 
                src={editingProduct.image_url} 
                alt={editingProduct.name_en}
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label>Name (English)</label>
                <input
                  type="text"
                  value={editingProduct.name_en || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name_en: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>Name (French)</label>
                <input
                  type="text"
                  value={editingProduct.name_fr || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name_fr: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>Price</label>
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
                <label>Category</label>
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  list="categories"
                  style={inputStyle}
                  required
                />
                <datalist id="categories">
                  {categories.map(cat => <option key={cat} value={cat} />)}
                </datalist>
              </div>
              <div>
                <label>Description (English)</label>
                <textarea
                  value={editingProduct.description_en || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description_en: e.target.value })}
                  rows="3"
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Description (French)</label>
                <textarea
                  value={editingProduct.description_fr || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description_fr: e.target.value })}
                  rows="3"
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image_url || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn">Save</button>
                <button type="button" className="btn" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Actions</th>
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
                    Edit
                  </button>
                  <button 
                    className="btn" 
                    style={{ padding: '4px 12px', background: 'var(--accent)' }}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
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
