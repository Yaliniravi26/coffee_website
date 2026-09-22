export interface Waypoint {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

export interface CoffeeStyle {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  roastLevel: string;
  notes: string[];
  temperature: string;
  origin: string;
  acidity: string;
  body: string;
  cupProfile: string;
}

export interface RitualStep {
  number: string;
  title: string;
  tag: string;
  description: string;
  detail: string;
  tempOrTime: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'espresso' | 'filter' | 'signature' | 'cold';
  origin: string;
  calories?: string;
  notes: string;
  featured?: boolean;
}

export interface SeatingCorner {
  title: string;
  subtitle: string;
  description: string;
  vibe: string;
}
