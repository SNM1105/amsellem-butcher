-- Create table for site specials banner
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS specials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text_en TEXT NOT NULL,
  text_fr TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default special
INSERT INTO specials (text_en, text_fr) VALUES (
  '🔥 Special Offers: Fresh Ribeye Steaks - 20% OFF this week! | Prime Cuts available daily | Visit us for the finest quality meats',
  '🔥 Offres Spéciales: Steaks de Faux-Filet Frais - 20% de RÉDUCTION cette semaine! | Coupes de choix disponibles tous les jours | Visitez-nous pour les viandes de la meilleure qualité'
);

-- Disable RLS for simplicity
ALTER TABLE specials DISABLE ROW LEVEL SECURITY;
