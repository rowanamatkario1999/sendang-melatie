import type { Tweaks } from './types';

export const TWEAK_DEFAULTS: Tweaks = {
  variant: 'classic',
  accent: '#E5B769',
  titleFont: 'Cormorant Garamond',
  headline: 'Sendang Melatie',
  eyebrow: 'Stichting · Sinds 2026',
  subheadline: '‘Bron van jonge klanken, geworteld in traditie.’',
  overlay: 0.55,
  navLayout: 'center',
  logoSize: 80,
};

export const NAV_ITEMS = [
  { label: 'Wie zijn wij', href: '#over' },
  { label: 'Onze logo', href: '#logo' },
  { label: 'The crew', href: '#crew' },
  { label: 'Evenementen', href: '#events' },
  { label: "Foto's / Video's", href: '#media' },
  { label: 'Contact', href: '#contact' },
];

export const FONT_OPTIONS = [
  'Cormorant Garamond',
  'Playfair Display',
  'Libre Caslon Text',
  'DM Serif Display',
];

export const ACCENT_SWATCHES = ['#E5B769', '#F2CD8A', '#D4A24C', '#C94B3F', '#9EBE5C'];

export const BATIK_COLORS = {
  sogan: '#8B4513',
  indigo: '#2E4A6B',
  mengkudu: '#A83232',
  tegeran: '#C9A04A',
};
