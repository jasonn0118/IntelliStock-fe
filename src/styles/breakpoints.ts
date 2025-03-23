export const breakpoints = {
  xs: 480,
  sm: 768,
  ipadAirMin: 769,
  ipadAirMax: 859,
  smallMediumMin: 860,
  smallMediumMax: 959,
  mediumMin: 960,
  mediumMax: 1043,
  lg: 1044,
  xl: 1280,
};

export const mediaQueries = {
  xs: `(max-width: ${breakpoints.xs}px)`,
  sm: `(max-width: ${breakpoints.sm}px)`,
  ipadAir: `(max-width: ${breakpoints.ipadAirMax}px) and (min-width: ${breakpoints.ipadAirMin}px)`,
  smallMedium: `(max-width: ${breakpoints.smallMediumMax}px) and (min-width: ${breakpoints.smallMediumMin}px)`,
  medium: `(max-width: ${breakpoints.mediumMax}px) and (min-width: ${breakpoints.mediumMin}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
};
