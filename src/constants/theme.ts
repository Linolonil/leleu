export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  background: '#1A1A1A',
  text: '#FFFFFF',
  error: '#FF0000',
  success: '#00FF00',
} as const;

export const FONTS = {
  heading: 'Naruto, sans-serif',
  body: 'Roboto, sans-serif',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATIONS = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const; 