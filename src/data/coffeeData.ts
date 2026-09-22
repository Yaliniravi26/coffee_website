import { CoffeeStyle, MenuItem, RitualStep, Waypoint } from '../types';

// Camera waypoints along the continuous Z-axis journey
// Z-axis goes from +10 (Entrance/Hero) down to -62 (Signature presentation)
export const CAMERA_WAYPOINTS: Waypoint[] = [
  // 0: Entrance & Hero Counter
  {
    position: [0, 3.3, 10],
    target: [0, 2.4, 3],
    fov: 46,
  },
  // 1: Preparation & Espresso Machine Focus
  {
    position: [1.5, 3.1, 1.5],
    target: [-0.6, 2.2, -4],
    fov: 45,
  },
  // 2: Brewing Area & V60 Pour-over
  {
    position: [-2.8, 3.4, -10],
    target: [0.8, 2.0, -18],
    fov: 44,
  },
  // 3: The Seating Area & Quiet Corners
  {
    position: [2.2, 3.0, -23],
    target: [-1.2, 2.0, -31],
    fov: 46,
  },
  // 4: The Coffee Menu Table
  {
    position: [-2.5, 3.2, -36],
    target: [0.2, 1.9, -44],
    fov: 44,
  },
  // 5: Approaching Signature Coffee
  {
    position: [2.4, 3.1, -49],
    target: [0, 2.2, -58],
    fov: 43,
  },
  // 6: Final Signature Coffee Presentation
  {
    position: [0, 3.4, -62],
    target: [0, 2.3, -71],
    fov: 42,
  },
];

export const COFFEE_STYLES: CoffeeStyle[] = [
  {
    id: 'espresso',
    number: '01',
    name: 'ESPRESSO',
    tagline: 'Rich and precise',
    description: 'A concentrated extraction capturing syrupy crema, dark stone fruit sweetness, and lingering cacao finish.',
    roastLevel: 'Medium-Dark Slow Roast',
    notes: ['Black Cherry', 'Cacao Nib', 'Toasted Hazelnut'],
    temperature: '93.5°C Pull',
    origin: 'Antioquia, Colombia · Altitude 1,950m',
    acidity: 'Vibrant & Clean',
    body: 'Full, Velvety Syrupy',
    cupProfile: 'Double ristretto 36g out in 28 seconds.',
  },
  {
    id: 'cappuccino',
    number: '02',
    name: 'CAPPUCCINO',
    tagline: 'Smooth and balanced',
    description: 'Harmonious equality of rich espresso, silky steamed whole milk, and dense microfoam dusted with roasted nibs.',
    roastLevel: 'Medium Balanced Roast',
    notes: ['Milk Chocolate', 'Pecan', 'Brown Sugar'],
    temperature: '65°C Silk Foam',
    origin: 'Cerrado Mineiro, Brazil · Altitude 1,150m',
    acidity: 'Mild & Sweet',
    body: 'Round & Cushioning',
    cupProfile: '1:1:1 traditional ratio in warmed ceramic bowl.',
  },
  {
    id: 'latte',
    number: '03',
    name: 'LATTE',
    tagline: 'Soft and velvety',
    description: 'A gentle, comforting pour featuring sweet stretched microfoam folded slowly over our honey-processed single origin.',
    roastLevel: 'Light-Medium Roast',
    notes: ['Vanilla Pod', 'Caramelized Fig', 'Sweet Cream'],
    temperature: '63°C Stretched Milk',
    origin: 'Yirgacheffe, Ethiopia · Altitude 2,100m',
    acidity: 'Gentle Floral',
    body: 'Supple & Silken',
    cupProfile: 'Double shot under 220ml micro-textured whole milk.',
  },
  {
    id: 'americano',
    number: '04',
    name: 'AMERICANO',
    tagline: 'Bright and clean',
    description: 'Hot mineral water layered under fresh extraction to reveal delicate terroir nuances, tea-like clarity, and crisp citrus.',
    roastLevel: 'Light Omniroast',
    notes: ['Bergamot', 'Dried Apricot', 'Golden Honey'],
    temperature: '88°C Mineral Blend',
    origin: 'Huehuetenango, Guatemala · Altitude 1,800m',
    acidity: 'Sparkling Crisp',
    body: 'Tea-like & Translucent',
    cupProfile: 'Double espresso poured over calibrated 70ppm mineral hot water.',
  },
];

export const RITUAL_STEPS: RitualStep[] = [
  {
    number: '01',
    title: 'SELECT',
    tag: 'ORIGIN & TERROIR',
    description: 'Micro-lots hand-harvested at peak brix sugar content and sorted bean-by-bean on raised African beds.',
    detail: 'Only top 3% green cherry selection meets Aurelia cup criteria.',
    tempOrTime: 'Brix 22° Harvest',
  },
  {
    number: '02',
    title: 'GRIND',
    tag: 'PRECISION BURRS',
    description: 'Titanium-coated 98mm flat burrs dialed to single-micron tolerances to prevent bitter thermal transfer.',
    detail: 'Zero retention grinding guarantees absolute batch purity.',
    tempOrTime: '98mm Coated Burrs',
  },
  {
    number: '03',
    title: 'EXTRACT',
    tag: 'PID THERMAL STABILITY',
    description: 'Multi-boiler saturated groups maintaining 93.5°C water with soft pre-infusion pressure profiling.',
    detail: 'Gentle 3-bar soak followed by stable 9-bar peak extraction.',
    tempOrTime: '93.5°C · 9 Bar',
  },
  {
    number: '04',
    title: 'POUR',
    tag: 'CERAMIC PRESENTATION',
    description: 'Served in heavy-walled stoneware cups pre-warmed to body temperature for a meditative drinking experience.',
    detail: 'Designed to preserve aroma headspace and velvety mouthfeel.',
    tempOrTime: '65°C Ceramic Serving',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-espresso',
    name: 'ESPRESSO',
    description: 'Rich and precise double shot with thick hazelnut crema and candied citrus nuance.',
    price: '05',
    category: 'espresso',
    origin: 'Colombia · Finca La Esperanza',
    notes: 'Dark chocolate, dried plum, orange oil',
    featured: true,
  },
  {
    id: 'menu-cappuccino',
    name: 'CAPPUCCINO',
    description: 'Smooth and balanced microfoam poured over double shot espresso in thick stoneware.',
    price: '06',
    category: 'espresso',
    origin: 'Brazil & Ethiopia Blend',
    notes: 'Toasted almond, milk chocolate, velvet',
    featured: true,
  },
  {
    id: 'menu-latte',
    name: 'LATTE',
    description: 'Soft and velvety stretched milk poured gently with layered espresso finish.',
    price: '06',
    category: 'espresso',
    origin: 'Ethiopia Yirgacheffe Organic',
    notes: 'Sweet cream, Madagascar vanilla, wildflower',
  },
  {
    id: 'menu-americano',
    name: 'AMERICANO',
    description: 'Bright and clean hot spring water layered beneath high-altitude extraction.',
    price: '05',
    category: 'espresso',
    origin: 'Guatemala Huehuetenango',
    notes: 'Bergamot, honey, crisp green apple',
  },
  {
    id: 'menu-mocha',
    name: 'MOCHA',
    description: 'Bold dark chocolate single-estate single origin melted directly with double shot espresso.',
    price: '07',
    category: 'signature',
    origin: 'Ecuador 72% Cacao & Colombia',
    notes: 'Bittersweet ganache, roasted hazelnut, brown sugar',
    featured: true,
  },
  {
    id: 'menu-coldbrew',
    name: 'COLD BREW',
    description: 'Slow-steeped 18 hours in chilled mountain spring water, bright and naturally sweet.',
    price: '06',
    category: 'cold',
    origin: 'Kenya Nyeri Double AA',
    notes: 'Blackcurrant, molasses, sparkling wine',
    featured: true,
  },
];
