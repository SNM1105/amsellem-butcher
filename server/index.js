const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const app = express();

// Trust proxy if behind a reverse proxy (Cloudflare, etc.)
app.set('trust proxy', 1);

// Security headers via Helmet
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com"],
      "img-src": ["'self'", "data:", "blob:", "https:"],
      "connect-src": ["'self'"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"],
      "upgrade-insecure-requests": []
    }
  },
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginEmbedderPolicy: false,
}));

// HSTS for HTTPS deployments
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Basic rate limiting for all routes
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(express.json());

// Simple in-memory products/pricing (authoritative on server)
const PRODUCTS = [
  { id: 'b1', price: 18.0 },
  { id: 'b2', price: 9.5 },
  { id: 'l1', price: 22.0 },
  { id: 'c1', price: 14.0 },
  { id: 'p1', price: 8.0 },
  { id: 'p2', price: 6.0 },
];
const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p=> [p.id, p.price]));

function calcTotal(items, method){
  let subtotal = 0;
  for(const it of items){
    const unit = PRODUCT_MAP[it.id];
    if(!unit) throw new Error('Invalid product');
    const qty = Number(it.qty || 0);
    if(!Number.isFinite(qty) || qty < 1 || qty > 50) throw new Error('Invalid quantity');
    subtotal += unit * qty;
  }
  const fee = method === 'delivery' ? 5.0 : 0;
  const total = +(subtotal + fee).toFixed(2);
  return { subtotal: +subtotal.toFixed(2), fee, total };
}

// API: get products (prices only for demo)
app.get('/api/products', (req, res)=> {
  res.json(PRODUCTS);
});

// API: create order (server-authoritative totals)
app.post('/api/orders', (req, res)=> {
  try{
    const { items = [], method = 'delivery', contact = {} } = req.body || {};
    const totals = calcTotal(items, method);
    // Basic contact validation
    const nameOk = typeof contact.firstName === 'string' && typeof contact.lastName === 'string';
    const phoneOk = typeof contact.phone === 'string';
    if(!nameOk || !phoneOk){
      return res.status(400).json({ error: 'Invalid contact' });
    }
    const id = crypto.randomUUID();
    // For demo, return order without persisting
    res.json({ id, totals });
  } catch(err){
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// Placeholder PayPal webhook endpoint (to be completed with verification)
app.post('/webhook/paypal', (req, res)=> {
  // TODO: verify signature and event type
  res.status(200).end();
});

// API: Clover Order Endpoint
// Receives order from frontend and forwards to Clover POS system
app.post('/api/clover/order', async (req, res)=> {
  try {
    const { customer, items, subtotal, deliveryFee, total, method, delivery, timestamp } = req.body || {};

    // Validate order data
    if (!customer || !items || !total) {
      return res.status(400).json({ error: 'Missing required order data' });
    }

    // TODO: Integrate with Clover API
    // Your client will provide:
    // 1. Clover Merchant ID
    // 2. Clover API Key
    // 3. Clover API Endpoint
    // 4. Order submission format/requirements

    // For now, log the order and prepare for Clover integration
    const orderId = `AMZ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    console.log('Order submitted to Clover:', {
      orderId,
      customer,
      items,
      total,
      method,
      delivery,
      timestamp
    });

    // Placeholder: Return order confirmation
    // Once Clover credentials are available, this will:
    // 1. Format order data per Clover API specs
    // 2. Call Clover API endpoint
    // 3. Return Clover order ID to client
    
    res.json({ 
      success: true,
      orderId: orderId,
      message: 'Order sent to POS system',
      details: {
        customerName: `${customer.name}`,
        total: total,
        method: method,
        timestamp: timestamp
      }
    });

  } catch (error) {
    console.error('Clover order error:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Serve static frontend from dist
const distDir = path.join(__dirname, '..');
const staticDir = path.join(distDir);
app.use(express.static(staticDir, { maxAge: '1h', etag: true }));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Secure server running on http://localhost:${port}`);
});
