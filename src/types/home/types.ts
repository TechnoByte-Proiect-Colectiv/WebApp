export interface Blob {
  x: number;
  y: number;
  scale: number;
  speed: number;
  color: [number, number, number];
  phase: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export interface HeroSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  category?: string;
  stock?: number;
  reviews?: Review[];
}

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  comment: string;
  rating: number;
  created_at: string;
}