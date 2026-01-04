# Amsellem Kosher Butcher — React + Vite

Dark theme with burgundy highlights, products by category, basket, delivery/pickup, and Clover POS integration.

## Run Locally

```powershell
npm install
npm run dev
# open the printed local URL (e.g. http://localhost:5173)
```

## Clover POS Integration

Orders are sent from the frontend to the backend server (`/api/clover/order`), which forwards them to your Clover POS system for processing.

**To complete the integration:**

1. Get your Clover API credentials from your account administrator:

   - Merchant ID
   - API Key
   - API Endpoint

2. Update `server/index.js` - `POST /api/clover/order` endpoint with:

   - Your Clover API authentication
   - Order submission format per Clover specs
   - Handle Clover API responses

3. The frontend will send orders with:
   - Customer info (name, phone, email)
   - Items with quantities and weights
   - Delivery/Pickup method
   - Address (if delivery)
   - Order total

## Structure

- `src/pages`: `Products`, `About`, `Contact`, `CartPage`, `Checkout`
- `src/components`: `Header`, `ProductCard`
- `src/context`: `CartContext` (localStorage persistence)
- `src/data`: `products.js`
- `src/styles.css`: dark + burgundy theme
- `server/index.js`: Backend API for Clover orders
