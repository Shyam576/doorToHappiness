// ─────────────────────────────────────────────────────────────────────────────
// Design System — Door to Happiness Holiday
// Industry: Cultural/Adventure Travel
// Style: Photography-Forward + Editorial Minimalism
// Generated via UI UX Pro Max skill
// ─────────────────────────────────────────────────────────────────────────────

export const siteTheme = {
  // Primary amber / warm gold
  primary:          'bg-amber-600',
  primaryHover:     'hover:bg-amber-700',
  primaryText:      'text-amber-600',
  primaryTextHover: 'hover:text-amber-700',
  primaryLight:     'bg-amber-50',
  primaryBorder:    'border-amber-300',
  primaryRing:      'focus:ring-amber-500',

  // Forest green accent (earthy, nature-forward)
  secondary:          'bg-emerald-800',
  secondaryHover:     'hover:bg-emerald-900',
  secondaryText:      'text-emerald-800',
  secondaryTextHover: 'hover:text-emerald-900',
  secondaryLight:     'bg-emerald-50',
  secondaryBorder:    'border-emerald-200',
  secondaryRing:      'focus:ring-emerald-600',

  // Gradient combinations — warm amber to deep gold
  gradient:       'from-amber-500 to-amber-700',
  gradientHover:  'hover:from-amber-600 hover:to-amber-800',
  gradientReverse:'from-amber-700 to-amber-500',

  // Warm hero overlay gradient
  heroOverlay: 'bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent',

  // Neutral tones (warm stone, not cold gray)
  neutral:       'text-stone-700',
  neutralHover:  'hover:text-stone-900',
  neutralBg:     'bg-stone-50',
  neutralBorder: 'border-stone-200',
};

// Helper function to get the unified theme
export const getTheme = () => {
  return siteTheme;
};

// For backward compatibility
export const getThemeForSection = (_section?: string) => {
  return {
    accent:          siteTheme.primary,
    accentHover:     siteTheme.primaryHover,
    accentText:      siteTheme.primaryText,
    accentTextHover: siteTheme.primaryTextHover,
    accentLight:     siteTheme.primaryLight,
    accentBorder:    siteTheme.primaryBorder,
    accentRing:      siteTheme.primaryRing,
  };
};
