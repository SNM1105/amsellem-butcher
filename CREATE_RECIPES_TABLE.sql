-- Create recipes table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS recipes (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  category TEXT NOT NULL,
  time TEXT NOT NULL,
  difficulty_en TEXT NOT NULL,
  difficulty_fr TEXT NOT NULL,
  image TEXT,
  desc_en TEXT,
  desc_fr TEXT,
  ingredients_en TEXT[] NOT NULL,
  ingredients_fr TEXT[] NOT NULL,
  instructions_en TEXT[] NOT NULL,
  instructions_fr TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);

-- Enable Row Level Security (RLS)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON recipes
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON recipes
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON recipes
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON recipes
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert the existing recipes data
INSERT INTO recipes (name_en, name_fr, category, time, difficulty_en, difficulty_fr, image, desc_en, desc_fr, ingredients_en, ingredients_fr, instructions_en, instructions_fr) VALUES
(
  'Traditional Dafina',
  'Dafina Traditionnelle',
  'Beef',
  '12+ hours',
  'Medium',
  'Moyen',
  'https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370915.jpg',
  'Slow-cooked Moroccan Jewish stew with beef, chickpeas, potatoes, and eggs. A Shabbat tradition.',
  'Ragoût juif marocain cuit lentement avec boeuf, pois chiches, pommes de terre et œufs. Une tradition du Shabbat.',
  ARRAY[
    '2 lbs beef chuck, cubed',
    '1 cup chickpeas, soaked overnight',
    '6 eggs in shell',
    '4 potatoes, whole',
    '1 onion, quartered',
    '2 tbsp Dafina spice blend',
    '1/4 cup oil',
    'Salt and pepper to taste'
  ],
  ARRAY[
    '900g de palette de boeuf, en cubes',
    '1 tasse de pois chiches, trempés',
    '6 œufs entiers',
    '4 pommes de terre entières',
    '1 oignon, en quartiers',
    '2 c. à soupe d''épices Dafina',
    '60ml d''huile',
    'Sel et poivre au goût'
  ],
  ARRAY[
    'Layer chickpeas at bottom of large pot',
    'Add beef cubes, potatoes, and onion',
    'Place eggs carefully on top',
    'Mix spices with oil and pour over',
    'Add water to cover ingredients',
    'Bring to boil, then reduce to very low heat',
    'Cover tightly and cook overnight (12+ hours)',
    'Serve hot for Shabbat lunch'
  ],
  ARRAY[
    'Disposer les pois chiches au fond d''une grande marmite',
    'Ajouter le boeuf, les pommes de terre et l''oignon',
    'Placer les œufs délicatement sur le dessus',
    'Mélanger les épices avec l''huile et verser',
    'Ajouter de l''eau pour couvrir les ingrédients',
    'Porter à ébullition, puis réduire à feu très doux',
    'Couvrir hermétiquement et cuire toute la nuit (12h+)',
    'Servir chaud pour le déjeuner du Shabbat'
  ]
),
(
  'Moroccan Lamb Tagine',
  'Tajine d''Agneau Marocain',
  'Lamb',
  '2.5 hours',
  'Medium',
  'Moyen',
  'https://img.freepik.com/free-photo/pot-roast-meat-served-with-bread-pickles_141793-919.jpg',
  'Tender lamb slow-cooked with apricots, almonds, and aromatic Moroccan spices.',
  'Agneau tendre mijoté avec abricots, amandes et épices marocaines aromatiques.',
  ARRAY[
    '2 lbs lamb shoulder, cubed',
    '1 onion, diced',
    '3 cloves garlic, minced',
    '1 cup dried apricots',
    '1/2 cup almonds, toasted',
    '2 tsp cumin',
    '1 tsp cinnamon',
    '1 tsp turmeric',
    '2 cups beef broth',
    'Fresh cilantro for garnish'
  ],
  ARRAY[
    '900g d''épaule d''agneau, en cubes',
    '1 oignon, en dés',
    '3 gousses d''ail, hachées',
    '1 tasse d''abricots secs',
    '120g d''amandes grillées',
    '2 c. à thé de cumin',
    '1 c. à thé de cannelle',
    '1 c. à thé de curcuma',
    '500ml de bouillon de boeuf',
    'Coriandre fraîche pour garnir'
  ],
  ARRAY[
    'Brown lamb in olive oil, set aside',
    'Sauté onion and garlic until soft',
    'Add spices, stir for 1 minute',
    'Return lamb to pot with broth',
    'Add apricots, cover and simmer 2 hours',
    'Stir in toasted almonds',
    'Garnish with fresh cilantro',
    'Serve with couscous or rice'
  ],
  ARRAY[
    'Faire dorer l''agneau dans l''huile d''olive, réserver',
    'Faire revenir l''oignon et l''ail jusqu''à tendreté',
    'Ajouter les épices, remuer 1 minute',
    'Remettre l''agneau avec le bouillon',
    'Ajouter les abricots, couvrir et mijoter 2h',
    'Incorporer les amandes grillées',
    'Garnir de coriandre fraîche',
    'Servir avec couscous ou riz'
  ]
),
(
  'Classic Chicken Schnitzel',
  'Schnitzel de Poulet Classique',
  'Chicken',
  '30 minutes',
  'Easy',
  'Facile',
  'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
  'Crispy breaded chicken cutlets, a beloved family favorite.',
  'Escalopes de poulet panées croustillantes, un favori familial.',
  ARRAY[
    '4 chicken breasts, pounded thin',
    '2 cups breadcrumbs',
    '2 eggs, beaten',
    '1 cup flour',
    '1 tsp paprika',
    '1 tsp garlic powder',
    'Salt and pepper',
    'Oil for frying'
  ],
  ARRAY[
    '4 poitrines de poulet, aplaties',
    '500g de chapelure',
    '2 œufs, battus',
    '250g de farine',
    '1 c. à thé de paprika',
    '1 c. à thé de poudre d''ail',
    'Sel et poivre',
    'Huile pour frire'
  ],
  ARRAY[
    'Set up 3 bowls: flour with spices, beaten eggs, breadcrumbs',
    'Season chicken with salt and pepper',
    'Dredge in flour, dip in egg, coat with breadcrumbs',
    'Heat oil in large skillet over medium-high',
    'Fry 4-5 minutes per side until golden',
    'Drain on paper towels',
    'Serve with lemon wedges'
  ],
  ARRAY[
    'Préparer 3 bols: farine épicée, œufs battus, chapelure',
    'Assaisonner le poulet de sel et poivre',
    'Fariner, tremper dans l''œuf, enrober de chapelure',
    'Chauffer l''huile dans une grande poêle à feu moyen-élevé',
    'Frire 4-5 minutes par côté jusqu''à doré',
    'Égoutter sur papier absorbant',
    'Servir avec quartiers de citron'
  ]
),
(
  'Moroccan Kofta Kebabs',
  'Brochettes Kofta Marocaines',
  'Beef',
  '45 minutes',
  'Easy',
  'Facile',
  'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
  'Spiced ground beef skewers grilled to perfection. Great for BBQ.',
  'Brochettes de boeuf haché épicé grillées à la perfection. Idéal pour BBQ.',
  ARRAY[
    '2 lbs ground beef',
    '1 onion, grated',
    '1/4 cup fresh parsley, chopped',
    '2 tsp cumin',
    '2 tsp paprika',
    '1 tsp coriander',
    '1/2 tsp cayenne',
    'Salt and pepper',
    'Wooden skewers, soaked'
  ],
  ARRAY[
    '900g de boeuf haché',
    '1 oignon, râpé',
    '60ml de persil frais, haché',
    '2 c. à thé de cumin',
    '2 c. à thé de paprika',
    '1 c. à thé de coriandre',
    '1/2 c. à thé de cayenne',
    'Sel et poivre',
    'Brochettes en bois, trempées'
  ],
  ARRAY[
    'Mix beef with onion, parsley, and all spices',
    'Refrigerate mixture 30 minutes',
    'Wet hands and form meat around skewers',
    'Make oval or cylindrical shapes',
    'Preheat grill to medium-high',
    'Grill 4-5 minutes per side',
    'Serve with tahini sauce and pita'
  ],
  ARRAY[
    'Mélanger le boeuf avec oignon, persil et épices',
    'Réfrigérer le mélange 30 minutes',
    'Mains mouillées, former la viande autour des brochettes',
    'Faire des formes ovales ou cylindriques',
    'Préchauffer le gril à feu moyen-élevé',
    'Griller 4-5 minutes par côté',
    'Servir avec sauce tahini et pita'
  ]
),
(
  'Chicken Drumsticks & Couscous',
  'Pilons de Poulet et Couscous',
  'Chicken',
  '1.5 hours',
  'Easy',
  'Facile',
  'https://img.freepik.com/free-photo/pilaf-plate-with-chicken-meat-cranberries-wooden-kitchen-towel_176474-7806.jpg',
  'Spiced chicken drumsticks served over fluffy couscous with vegetables. A family favorite.',
  'Pilons de poulet épicés servis sur couscous moelleux avec légumes. Un favori familial.',
  ARRAY[
    '8 chicken drumsticks',
    '2 cups couscous',
    '2 carrots, diced',
    '1 zucchini, diced',
    '1 onion, diced',
    '2 tsp cumin',
    '2 tsp paprika',
    '1 tsp turmeric',
    '3 cups chicken broth',
    'Fresh parsley for garnish'
  ],
  ARRAY[
    '8 pilons de poulet',
    '500g de couscous',
    '2 carottes, en dés',
    '1 courgette, en dés',
    '1 oignon, en dés',
    '2 c. à thé de cumin',
    '2 c. à thé de paprika',
    '1 c. à thé de curcuma',
    '750ml de bouillon de poulet',
    'Persil frais pour garnir'
  ],
  ARRAY[
    'Season drumsticks with cumin, paprika, turmeric, salt, and pepper',
    'Brown drumsticks in large pot with oil',
    'Add onion, carrots, and broth',
    'Cover and simmer for 45 minutes',
    'Add zucchini, cook 15 more minutes',
    'Meanwhile, prepare couscous per package instructions',
    'Fluff couscous with fork',
    'Serve drumsticks and vegetables over couscous',
    'Garnish with fresh parsley'
  ],
  ARRAY[
    'Assaisonner les pilons de cumin, paprika, curcuma, sel et poivre',
    'Faire dorer les pilons dans une grande marmite avec huile',
    'Ajouter oignon, carottes et bouillon',
    'Couvrir et mijoter 45 minutes',
    'Ajouter la courgette, cuire 15 min de plus',
    'Entre-temps, préparer le couscous selon les instructions',
    'Égrainer le couscous à la fourchette',
    'Servir pilons et légumes sur le couscous',
    'Garnir de persil frais'
  ]
),
(
  'Honey-Glazed Chicken Thighs',
  'Cuisses de Poulet au Miel',
  'Chicken',
  '1 hour',
  'Easy',
  'Facile',
  'https://img.freepik.com/free-photo/grilles-chicken-steak-with-teriyaki-sauce_1339-5203.jpg',
  'Sweet and savory glazed chicken thighs with herbs. Perfect for Shabbat dinner.',
  'Cuisses de poulet glacées sucrées-salées aux herbes. Parfait pour le dîner du Shabbat.',
  ARRAY[
    '8 chicken thighs',
    '1/4 cup honey',
    '3 tbsp olive oil',
    '2 tbsp soy sauce',
    '4 cloves garlic, minced',
    '1 tsp rosemary',
    '1 tsp thyme',
    'Salt and pepper'
  ],
  ARRAY[
    '8 cuisses de poulet',
    '60ml de miel',
    '45ml d''huile d''olive',
    '30ml de sauce soya',
    '4 gousses d''ail, hachées',
    '1 c. à thé de romarin',
    '1 c. à thé de thym',
    'Sel et poivre'
  ],
  ARRAY[
    'Preheat oven to 375°F (190°C)',
    'Mix honey, oil, soy sauce, garlic, and herbs',
    'Season chicken with salt and pepper',
    'Brush chicken with half the glaze',
    'Arrange in baking dish',
    'Bake 30 minutes',
    'Brush with remaining glaze',
    'Bake 20 more minutes until golden',
    'Let rest 5 minutes before serving'
  ],
  ARRAY[
    'Préchauffer le four à 375°F (190°C)',
    'Mélanger miel, huile, sauce soya, ail et herbes',
    'Assaisonner le poulet de sel et poivre',
    'Badigeonner le poulet avec la moitié de la glace',
    'Disposer dans un plat allant au four',
    'Cuire 30 minutes',
    'Badigeonner avec le reste de la glace',
    'Cuire 20 min de plus jusqu''à doré',
    'Laisser reposer 5 min avant de servir'
  ]
);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
