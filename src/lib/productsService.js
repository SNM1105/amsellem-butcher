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
      .order('name', { ascending: true })

    if (error) throw error
    
    // Transform image_url to image for compatibility with existing code
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
    const updateData = {
      name: updates.name,
      price: parseFloat(updates.price),
      category: updates.category,
      description: updates.description,
      stock: parseInt(updates.stock),
      image_url: updates.image_url
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      image: data.image_url,
      stock: data.stock
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
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        price: parseFloat(productData.price),
        category: productData.category,
        description: productData.description,
        stock: parseInt(productData.stock) || 0,
        image_url: productData.image_url || ''
      }])
      .select()
      .single()

    if (error) throw error
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      image: data.image_url,
      stock: data.stock
    }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
