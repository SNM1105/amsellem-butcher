import React, { useState, useEffect } from 'react'
import { useI18n } from '../context/I18nContext'
import { Link } from 'react-router-dom'
import { getAllRecipes } from '../lib/productsService'

export default function Recipes() {
  const { t, lang } = useI18n()
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [filterCategory, setFilterCategory] = useState('All')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipes()
  }, [])

  async function loadRecipes() {
    try {
      setLoading(true)
      const data = await getAllRecipes()
      setRecipes(data)
    } catch (error) {
      console.error('Error loading recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  // Scroll animations - run after recipes load and after filter changes
  useEffect(() => {
    if (loading || recipes.length === 0) return

    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      }, observerOptions)
      
      // Remove existing in-view classes first
      document.querySelectorAll('.scroll-fade').forEach(el => {
        el.classList.remove('in-view')
        observer.observe(el)
      })
      
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [recipes, filterCategory, loading])

  const categories = ['All', 'Beef', 'Lamb', 'Chicken']
  
  const filteredRecipes = filterCategory === 'All' 
    ? recipes 
    : recipes.filter(r => r.category === filterCategory)

  if (loading) {
    return (
      <div className="recipes-page">
        <section className="recipes-hero">
          <div className="container">
            <h1>{lang === 'fr' ? 'Recettes Casher' : 'Kosher Recipes'}</h1>
            <p className="hero-subtitle">
              {lang === 'fr' ? 'Chargement...' : 'Loading...'}
            </p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="recipes-page">
      {/* Hero Section */}
      <section className="recipes-hero">
        <div className="container">
          <span className="section-label scroll-fade" style={{color: 'var(--gold)'}}>
            {lang === 'fr' ? 'Notre Collection de' : 'Our Collection of'}
          </span>
          <h1 className="scroll-fade gold-accent">{lang === 'fr' ? 'Recettes Casher' : 'Kosher Recipes'}</h1>
          <p className="hero-subtitle scroll-fade">
            {lang === 'fr' 
              ? 'Découvrez notre collection de recettes traditionnelles marocaines et juives'
              : 'Discover our collection of traditional Moroccan and Jewish recipes'}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="recipes-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat === 'All' ? (lang === 'fr' ? 'Toutes' : 'All') : t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="recipes-grid-section">
        <div className="container">
          <div className="recipes-grid">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card scroll-fade" onClick={() => setSelectedRecipe(recipe)}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={lang === 'fr' ? recipe.name_fr : recipe.name_en} />
                  <div className="recipe-category-badge">{t(`categories.${recipe.category}`)}</div>
                </div>
                <div className="recipe-card-content">
                  <h3>{lang === 'fr' ? recipe.name_fr : recipe.name_en}</h3>
                  <p className="recipe-desc">{lang === 'fr' ? recipe.desc_fr : recipe.desc_en}</p>
                  <div className="recipe-meta">
                    <span className="recipe-time">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {recipe.time}
                    </span>
                    <span className="recipe-difficulty">{lang === 'fr' ? recipe.difficulty_fr : recipe.difficulty_en}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <>
          <div className="recipe-modal-overlay" onClick={() => setSelectedRecipe(null)} />
          <div className="recipe-modal">
            <button className="recipe-modal-close" onClick={() => setSelectedRecipe(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="recipe-modal-content">
              <img 
                src={selectedRecipe.image} 
                alt={lang === 'fr' ? selectedRecipe.name_fr : selectedRecipe.name_en}
                className="recipe-modal-image"
              />
              <div className="recipe-modal-body">
                <h2>{lang === 'fr' ? selectedRecipe.name_fr : selectedRecipe.name_en}</h2>
                <div className="recipe-modal-meta">
                  <span className="badge">{t(`categories.${selectedRecipe.category}`)}</span>
                  <span>{selectedRecipe.time}</span>
                  <span>{lang === 'fr' ? selectedRecipe.difficulty_fr : selectedRecipe.difficulty_en}</span>
                </div>
                <p className="recipe-modal-desc">{lang === 'fr' ? selectedRecipe.desc_fr : selectedRecipe.desc_en}</p>
                
                <div className="recipe-section">
                  <h3>{lang === 'fr' ? 'Ingrédients' : 'Ingredients'}</h3>
                  <ul className="recipe-ingredients">
                    {(lang === 'fr' ? selectedRecipe.ingredients_fr : selectedRecipe.ingredients_en).map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <h3>{lang === 'fr' ? 'Instructions' : 'Instructions'}</h3>
                  <ol className="recipe-instructions">
                    {(lang === 'fr' ? selectedRecipe.instructions_fr : selectedRecipe.instructions_en).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="recipe-cta">
                  <Link to="/meats" className="btn btn-primary">
                    {lang === 'fr' ? 'Commander les Ingrédients' : 'Shop Ingredients'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
