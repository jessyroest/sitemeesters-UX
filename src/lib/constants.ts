/* ─── Design Tokens — Light Mode Premium ─── */

export const COLORS = {
  // Backgrounds
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Text
  text: '#0A0A0A',
  textSecondary: '#555555',
  textMuted: '#999999',

  // Accent
  accent: '#4F46E5',
  accentLight: '#EEF2FF',
  accentSubtle: 'rgba(79, 70, 229, 0.08)',

  // Borders & shadows
  border: 'rgba(0, 0, 0, 0.06)',
  borderHover: 'rgba(0, 0, 0, 0.12)',
  shadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)',
  shadowHover: '0 4px 16px rgba(0, 0, 0, 0.06), 0 8px 32px rgba(0, 0, 0, 0.04)',
} as const;

export const EASING = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
} as const;

export const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.9,
  hero: 1.2,
} as const;

/* ─── Content ─── */

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const;
