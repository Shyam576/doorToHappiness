// Unified Orange & Yellow Theme System for Door To Happiness
// Consistent warm color palette throughout the entire website

export const siteTheme = {
  // Primary orange theme
  primary: 'bg-orange-500',
  primaryHover: 'hover:bg-orange-600',
  primaryText: 'text-orange-500',
  primaryTextHover: 'hover:text-orange-600',
  primaryLight: 'bg-orange-50',
  primaryBorder: 'border-orange-200',
  primaryRing: 'focus:ring-orange-500',
  
  // Secondary yellow accent
  secondary: 'bg-yellow-500',
  secondaryHover: 'hover:bg-yellow-600',
  secondaryText: 'text-yellow-600',
  secondaryTextHover: 'hover:text-yellow-700',
  secondaryLight: 'bg-yellow-50',
  secondaryBorder: 'border-yellow-200',
  secondaryRing: 'focus:ring-yellow-500',
  
  // Gradient combinations
  gradient: 'from-orange-500 to-yellow-500',
  gradientHover: 'hover:from-orange-600 hover:to-yellow-600',
  gradientReverse: 'from-yellow-500 to-orange-500',
  
  // Neutral colors (remain the same across site)
  neutral: 'text-gray-700',
  neutralHover: 'hover:text-gray-900',
  neutralBg: 'bg-gray-50',
  neutralBorder: 'border-gray-200'
};

// Helper function to get the unified theme
export const getTheme = () => {
  return siteTheme;
};

// For backward compatibility, all sections now use the same theme
export const getThemeForSection = (section?: string) => {
  return {
    accent: siteTheme.primary,
    accentHover: siteTheme.primaryHover,
    accentText: siteTheme.primaryText,
    accentTextHover: siteTheme.primaryTextHover,
    accentLight: siteTheme.primaryLight,
    accentBorder: siteTheme.primaryBorder,
    accentRing: siteTheme.primaryRing
  };
};
