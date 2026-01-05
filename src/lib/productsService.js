import { supabase } from './supabase'

/**
 * Fetch all products from Supabase
 * @returns {Promise<Array>} Array of products
 */
export async function getAllProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name_en', { ascending: true })

    if (error) throw error
    
    return data.map(product => ({
      id: product.id,
      name_en: product.name_en,
      name_fr: product.name_fr,
      description_en: product.description_en,
      description_fr: product.description_fr,
      price: product.price,
      category: product.category,
      image: product.image_url,
      stock: product.stock
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of products in that category
 */
export async function getProductsByCategory(category) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true })

    if (error) throw error
    
    return data.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image_url,
      stock: product.stock
    }))
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

/**
 * Get all unique categories
 * @returns {Promise<Array>} Array of category names
 */
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')

    if (error) throw error
    
    const categories = [...new Set(data.map(p => p.category))]
    return categories.sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Update a product
 * @param {string} id - Product ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated product
 */
export async function updateProduct(id, updates) {
  try {
    console.log('Updating product:', id, updates)
    const updateData = {
      name_en: updates.name_en,
      name_fr: updates.name_fr,
      description_en: updates.description_en,
      description_fr: updates.description_fr,
      price: parseFloat(updates.price),
      category: updates.category,
      stock: parseInt(updates.stock),
      image_url: updates.image_url
    }
    console.log('Update data:', updateData)

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) throw error
    console.log('Update response:', data)
    
    const product = data[0] || data
    return {
      id: product.id,
      name_en: product.name_en,
      name_fr: product.name_fr,
      description_en: product.description_en,
      description_fr: product.description_fr,
      price: product.price,
      category: product.category,
      image: product.image_url,
      stock: product.stock
    }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteProduct(id) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export async function createProduct(productData) {
  try {
    const insertData = {
      name_en: productData.name_en,
      name_fr: productData.name_fr,
      description_en: productData.description_en,
      description_fr: productData.description_fr,
      price: parseFloat(productData.price),
      category: productData.category,
      stock: parseInt(productData.stock) || 0,
      image_url: productData.image_url || ''
    }

    const { data, error } = await supabase
      .from('products')
      .insert([insertData])
      .select()
      .single()

    if (error) throw error
    
    return {
      id: data.id,
      name_en: data.name_en,
      name_fr: data.name_fr,
      description_en: data.description_en,
      description_fr: data.description_fr,
      price: data.price,
      category: data.category,
      image: data.image_url,
      stock: data.stock
    }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

/**
 * Get the active special banner text
 * @returns {Promise<Object>} Special banner text
 */
export async function getSpecial() {
  try {
    const { data, error } = await supabase
      .from('specials')
      .select('*')
      .eq('active', true)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching special:', error)
    return { text_en: '', text_fr: '' }
  }
}

/**
 * Update special banner text
 * @param {string} id - Special ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated special
 */
export async function updateSpecial(id, updates) {
  try {
    const { data, error } = await supabase
      .from('specials')
      .update({
        text_en: updates.text_en,
        text_fr: updates.text_fr,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating special:', error)
    throw error
  }
}
