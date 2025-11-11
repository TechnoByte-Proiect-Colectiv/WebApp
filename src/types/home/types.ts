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
