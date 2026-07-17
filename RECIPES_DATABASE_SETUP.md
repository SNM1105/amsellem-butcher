# Recipe Database Setup Instructions

## Step 1: Run the SQL Script in Supabase

1. Log in to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to the **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire contents of `CREATE_RECIPES_TABLE.sql`
6. Click **Run** (or press Ctrl+Enter)

This will:

- Create the `recipes` table with all necessary columns
- Set up proper indexes for performance
- Enable Row Level Security (RLS) with appropriate policies
- Insert all 6 existing recipes from your hardcoded data
- Create a trigger to automatically update the `updated_at` timestamp

## Step 2: Verify the Setup

After running the SQL:

1. Go to **Table Editor** in Supabase
2. Select the `recipes` table
3. You should see all 6 recipes with their data

## Step 3: Test Your Application

1. Your Recipes page now fetches data from Supabase instead of using hardcoded data
2. The Admin Dashboard allows you to add/edit/delete recipes
3. All changes in the admin panel will immediately reflect on the Recipes page

## What Changed

### Files Modified:

- **src/pages/Recipes.jsx** - Now fetches recipes from database using `getAllRecipes()`
- **Removed** - ~320 lines of hardcoded recipe data

### Already In Place:

- **src/lib/productsService.js** - Already has `getAllRecipes()`, `createRecipe()`, `updateRecipe()`, `deleteRecipe()` functions
- **src/pages/AdminDashboard.jsx** - Already has the Recipes tab with full management interface

## Database Schema

```
recipes table:
- id: BIGSERIAL (auto-incrementing primary key)
- name_en: TEXT (English name)
- name_fr: TEXT (French name)
- category: TEXT (Beef, Lamb, Chicken, Veal)
- time: TEXT (cooking time)
- difficulty_en: TEXT (Easy, Medium, Hard)
- difficulty_fr: TEXT (Facile, Moyen, Difficile)
- image: TEXT (image URL)
- desc_en: TEXT (English description)
- desc_fr: TEXT (French description)
- ingredients_en: TEXT[] (array of ingredient strings)
- ingredients_fr: TEXT[] (array of ingredient strings)
- instructions_en: TEXT[] (array of instruction steps)
- instructions_fr: TEXT[] (array of instruction steps)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Security

The table has RLS enabled with these policies:

- **Public read access** - Anyone can view recipes
- **Authenticated insert/update/delete** - Only logged-in admin users can modify recipes

This matches your existing products table security setup.
