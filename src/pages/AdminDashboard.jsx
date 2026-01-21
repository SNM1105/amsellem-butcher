import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useI18n } from '../context/I18nContext'
import { getAllProducts, getCategories, updateProduct, deleteProduct, createProduct, getSpecial, updateSpecial, getAllRecipes, createRecipe, updateRecipe, deleteRecipe } from '../lib/productsService'
import Modal from '../components/Modal'

export default function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('banner')
  const [products, setProducts] = useState([])
  const [recipes, setRecipes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false)
  const [special, setSpecial] = useState(null)
  const [editingSpecial, setEditingSpecial] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)

  useEffect(() => {
    loadData()
    loadSpecial()
    loadRecipes()
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

  async function loadSpecial() {
    const data = await getSpecial()
    setSpecial(data)
  }

  async function loadRecipes() {
    const data = await getAllRecipes()
    setRecipes(data)
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
    try {
      await updateProduct(editingProduct.id, editingProduct)
      await loadData()
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

  // Recipe handlers
  const handleEditRecipe = useCallback((recipe) => {
    setEditingRecipe({
      ...recipe,
      ingredients_en_text: recipe.ingredients_en?.join('\n') || '',
      ingredients_fr_text: recipe.ingredients_fr?.join('\n') || '',
      instructions_en_text: recipe.instructions_en?.join('\n') || '',
      instructions_fr_text: recipe.instructions_fr?.join('\n') || ''
    })
    setIsRecipeModalOpen(true)
    setShowAddRecipeForm(false)
  }, [])

  const handleRecipeModalClose = useCallback(() => {
    setIsRecipeModalOpen(false)
    setEditingRecipe(null)
  }, [])

  const handleRecipeModalSave = async (e) => {
    e.preventDefault()
    try {
      const updates = {
        ...editingRecipe,
        ingredients_en: editingRecipe.ingredients_en_text.split('\n').filter(x => x.trim()),
        ingredients_fr: editingRecipe.ingredients_fr_text.split('\n').filter(x => x.trim()),
        instructions_en: editingRecipe.instructions_en_text.split('\n').filter(x => x.trim()),
        instructions_fr: editingRecipe.instructions_fr_text.split('\n').filter(x => x.trim())
      }
      delete updates.ingredients_en_text
      delete updates.ingredients_fr_text
      delete updates.instructions_en_text
      delete updates.instructions_fr_text
      
      await updateRecipe(editingRecipe.id, updates)
      await loadRecipes()
      setIsRecipeModalOpen(false)
      setEditingRecipe(null)
      alert('Recipe updated successfully!')
    } catch (error) {
      console.error('Error updating recipe:', error)
      alert('Error updating recipe: ' + error.message)
    }
  }

  const handleDeleteRecipe = async (id) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return
    
    try {
      await deleteRecipe(id)
      await loadRecipes()
    } catch (error) {
      alert('Error deleting recipe: ' + error.message)
    }
  }

  const handleAddRecipe = () => {
    setShowAddRecipeForm(true)
    setEditingRecipe(null)
  }

  const handleCreateRecipe = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const ingredientsEn = formData.get('ingredients_en').split('\n').filter(x => x.trim())
    const ingredientsFr = formData.get('ingredients_fr').split('\n').filter(x => x.trim())
    const instructionsEn = formData.get('instructions_en').split('\n').filter(x => x.trim())
    const instructionsFr = formData.get('instructions_fr').split('\n').filter(x => x.trim())
    
    const newRecipe = {
      name_en: formData.get('name_en'),
      name_fr: formData.get('name_fr'),
      desc_en: formData.get('desc_en'),
      desc_fr: formData.get('desc_fr'),
      category: formData.get('category'),
      time: formData.get('time'),
      difficulty_en: formData.get('difficulty_en'),
      difficulty_fr: formData.get('difficulty_fr'),
      image: formData.get('image'),
      ingredients_en: ingredientsEn,
      ingredients_fr: ingredientsFr,
      instructions_en: instructionsEn,
      instructions_fr: instructionsFr
    }
    
    try {
      await createRecipe(newRecipe)
      await loadRecipes()
      setShowAddRecipeForm(false)
      e.target.reset()
    } catch (error) {
      alert('Error creating recipe: ' + error.message)
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
      <div className="admin-header-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1>{t('admin.dashboard')}</h1>
        <button className="btn" onClick={handleLogout}>{t('admin.logout')}</button>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
        <button 
          className={`tab-btn ${activeTab === 'banner' ? 'active' : ''}`}
          onClick={() => setActiveTab('banner')}
          style={activeTab === 'banner' ? activeTabStyle : tabStyle}
        >
          Banner
        </button>
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
          style={activeTab === 'products' ? activeTabStyle : tabStyle}
        >
          Products
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
          style={activeTab === 'recipes' ? activeTabStyle : tabStyle}
        >
          Recipes
        </button>
      </div>

      {/* Banner Section */}
      {activeTab === 'banner' && (
        <div className="admin-section">
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
        </div>
      )}

      {/* Products Section */}
      {activeTab === 'products' && (
        <div className="admin-section">
          <div style={{ marginBottom: '24px' }}>
            <button className="btn" onClick={handleAdd}>{t('admin.addProduct')}</button>
          </div>

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
      )}

      {/* Recipes Section */}
      {activeTab === 'recipes' && (
        <div className="admin-section">
          <div style={{ marginBottom: '24px' }}>
            <button className="btn" onClick={handleAddRecipe}>Add Recipe</button>
          </div>

          {showAddRecipeForm && (
            <div className="panel" style={{ padding: '24px', marginBottom: '24px' }}>
              <h2>Add New Recipe</h2>
              <form onSubmit={handleCreateRecipe}>
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
                    <label>Description (English)</label>
                    <textarea name="desc_en" rows="2" required style={inputStyle} />
                  </div>
                  <div>
                    <label>Description (French)</label>
                    <textarea name="desc_fr" rows="2" required style={inputStyle} />
                  </div>
                  <div>
                    <label>Category</label>
                    <select name="category" required style={inputStyle}>
                      <option value="">Select category...</option>
                      <option value="Beef">Beef</option>
                      <option value="Lamb">Lamb</option>
                      <option value="Chicken">Chicken</option>
                      <option value="Veal">Veal</option>
                    </select>
                  </div>
                  <div>
                    <label>Time (e.g., "2 hours")</label>
                    <input type="text" name="time" required style={inputStyle} />
                  </div>
                  <div>
                    <label>Difficulty (English)</label>
                    <select name="difficulty_en" required style={inputStyle}>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label>Difficulty (French)</label>
                    <select name="difficulty_fr" required style={inputStyle}>
                      <option value="Facile">Facile</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Difficile">Difficile</option>
                    </select>
                  </div>
                  <div>
                    <label>Image URL</label>
                    <input type="text" name="image" required style={inputStyle} />
                  </div>
                  <div>
                    <label>Ingredients (English) - One per line</label>
                    <textarea name="ingredients_en" rows="5" required style={inputStyle} placeholder="1 lb beef&#10;2 onions&#10;..." />
                  </div>
                  <div>
                    <label>Ingredients (French) - One per line</label>
                    <textarea name="ingredients_fr" rows="5" required style={inputStyle} placeholder="450g de boeuf&#10;2 oignons&#10;..." />
                  </div>
                  <div>
                    <label>Instructions (English) - One per line</label>
                    <textarea name="instructions_en" rows="5" required style={inputStyle} placeholder="Heat oil in pan&#10;Add onions&#10;..." />
                  </div>
                  <div>
                    <label>Instructions (French) - One per line</label>
                    <textarea name="instructions_fr" rows="5" required style={inputStyle} placeholder="Chauffer l'huile&#10;Ajouter les oignons&#10;..." />
                  </div>
                  <div className="form-actions-mobile" style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn">Create</button>
                    <button type="button" className="btn" onClick={() => setShowAddRecipeForm(false)}>Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <Modal isOpen={isRecipeModalOpen} onClose={handleRecipeModalClose} title="Edit Recipe">
            {editingRecipe && (
              <form onSubmit={handleRecipeModalSave}>
                {editingRecipe.image && (
                  <div style={{ marginBottom: '16px' }}>
                    <img 
                      src={editingRecipe.image} 
                      alt={editingRecipe.name_en}
                      style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                )}
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label>Name (English)</label>
                    <input
                      type="text"
                      value={editingRecipe.name_en || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, name_en: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Name (French)</label>
                    <input
                      type="text"
                      value={editingRecipe.name_fr || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, name_fr: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Description (English)</label>
                    <textarea
                      value={editingRecipe.desc_en || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, desc_en: e.target.value })}
                      rows="2"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Description (French)</label>
                    <textarea
                      value={editingRecipe.desc_fr || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, desc_fr: e.target.value })}
                      rows="2"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Category</label>
                    <select
                      value={editingRecipe.category}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value })}
                      style={inputStyle}
                      required
                    >
                      <option value="Beef">Beef</option>
                      <option value="Lamb">Lamb</option>
                      <option value="Chicken">Chicken</option>
                      <option value="Veal">Veal</option>
                    </select>
                  </div>
                  <div>
                    <label>Time</label>
                    <input
                      type="text"
                      value={editingRecipe.time || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, time: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={editingRecipe.image || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label>Ingredients (English) - One per line</label>
                    <textarea
                      value={editingRecipe.ingredients_en_text || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients_en_text: e.target.value })}
                      rows="5"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Ingredients (French) - One per line</label>
                    <textarea
                      value={editingRecipe.ingredients_fr_text || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients_fr_text: e.target.value })}
                      rows="5"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Instructions (English) - One per line</label>
                    <textarea
                      value={editingRecipe.instructions_en_text || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions_en_text: e.target.value })}
                      rows="5"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label>Instructions (French) - One per line</label>
                    <textarea
                      value={editingRecipe.instructions_fr_text || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions_fr_text: e.target.value })}
                      rows="5"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="form-actions-mobile" style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn">Save</button>
                    <button type="button" className="btn" onClick={handleRecipeModalClose}>Cancel</button>
                  </div>
                </div>
              </form>
            )}
          </Modal>

          <div className="table-wrapper" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={thStyle}>Image</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Difficulty</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map(recipe => (
                  <tr key={recipe.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={tdStyle}>
                      {recipe.image && (
                        <img 
                          src={recipe.image} 
                          alt={recipe.name_en} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      )}
                    </td>
                    <td style={tdStyle}>{recipe.name_en}</td>
                    <td style={tdStyle}>{recipe.category}</td>
                    <td style={tdStyle}>{recipe.time}</td>
                    <td style={tdStyle}>{recipe.difficulty_en}</td>
                    <td style={tdStyle}>
                      <button 
                        className="btn" 
                        style={{ marginRight: '8px', padding: '4px 12px' }}
                        onClick={() => handleEditRecipe(recipe)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn" 
                        style={{ padding: '4px 12px', background: 'var(--accent)' }}
                        onClick={() => handleDeleteRecipe(recipe.id)}
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
      )}
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

const tabStyle = {
  padding: '12px 24px',
  background: 'transparent',
  border: 'none',
  color: 'var(--muted)',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  borderBottom: '3px solid transparent',
  transition: 'all 0.2s ease'
}

const activeTabStyle = {
  ...tabStyle,
  color: 'var(--text)',
  borderBottomColor: 'var(--accent)'
}
