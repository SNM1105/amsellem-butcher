# Amsellem Kosher Butcher

Modern e-commerce website for Amsellem Kosher Butcher with bilingual support (English/Hebrew), shopping cart, and admin panel.

## Features

- 🥩 Product catalog with categories (Beef, Lamb, Chicken, Veal, Spices, etc.)
- 🛒 Shopping cart functionality
- 🌐 Bilingual support (English/Hebrew)
- 📱 Responsive design
- 🔐 Password-protected admin panel
- 💾 Supabase backend for product management
- ⚡ Built with React + Vite

## Tech Stack

- **Frontend**: React, React Router, Vite
- **Backend**: Supabase (PostgreSQL)
- **Styling**: Custom CSS
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 16+
- Supabase account
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=your-secure-password
```

5. Set up the database:

   - Go to your Supabase dashboard
   - Run the SQL script from `SUPABASE_SETUP.md`
   - Run the migration script from `migrate_products.sql`

6. Start the development server:

```bash
npm run dev
```

## Admin Panel

Access the admin panel at `/admin` to manage products:

- Add, edit, and delete products
- Update prices, descriptions, and categories
- Manage stock levels

## Deployment on Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

Private project for Amsellem Kosher Butcher
