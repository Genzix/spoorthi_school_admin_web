import React, { useEffect, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { useSchool } from '@/context/SchoolContext';
import { hexToRgba } from '@/schools/palettes';

const BrandGlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${(p) => p.$palette.primary};
    --color-primary-light: ${(p) => p.$palette.primaryLight};
    --color-secondary: ${(p) => p.$palette.secondary};
    --color-accent: ${(p) => p.$palette.accent};
    --color-on-primary: ${(p) => p.$onPrimary};
    --color-primary-rgb: ${(p) => p.$primaryRgb};
    --color-accent-rgb: ${(p) => p.$accentRgb};
    --color-primary-soft: ${(p) => hexToRgba(p.$palette.primary, 0.2)};
    --color-primary-pulse: ${(p) => hexToRgba(p.$palette.primary, 0.4)};
    --color-accent-soft: ${(p) => hexToRgba(p.$palette.accent, 0.2)};
    --color-panel: ${(p) => p.$palette.panel || p.$palette.primaryLight};
    --color-row-hover: ${(p) => p.$palette.rowHover || hexToRgba(p.$palette.primary, 0.12)};
    --gradient-primary: ${(p) => p.$palette.primaryGradient};
    --gradient-card: ${(p) => p.$palette.cardGradient};
    --gradient-parent: ${(p) => p.$palette.parentGradient};
    --gradient-parent-card: ${(p) => p.$palette.parentCardGradient};
    --gradient-parent-bg: ${(p) => p.$palette.parentBackgroundGradient};
    accent-color: ${(p) => p.$palette.primary};
  }
`;

const hexToRgbTriplet = (hex) => {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

/** Text/icon color that contrasts with the brand primary surface. */
const onPrimaryColor = (hex) => {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const channel = (c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  const L = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return L < 0.45 ? '#FFFFFF' : '#111111';
};

/**
 * Injects CSS variables from the active school palette and provides
 * a styled-components theme object for props.theme.colors.*
 */
export const ThemeProvider = ({ children }) => {
  const { school, known, palette } = useSchool();

  const theme = useMemo(() => {
    if (!palette) {
      return {
        colors: {},
        school: null,
      };
    }
    return {
      colors: {
        primary: palette.primary,
        primaryLight: palette.primaryLight,
        secondary: palette.secondary,
        accent: palette.accent,
        parentPrimary: palette.parentPrimary,
        parentSecondary: palette.parentSecondary,
        parentLight: palette.parentLight,
        panel: palette.panel,
        rowHover: palette.rowHover,
      },
      gradients: {
        primary: palette.primaryGradient,
        card: palette.cardGradient,
        parent: palette.parentGradient,
        parentCard: palette.parentCardGradient,
        parentBackground: palette.parentBackgroundGradient,
      },
      school: school
        ? {
            slug: school.slug,
            displayName: school.displayName,
            legalName: school.legalName,
          }
        : null,
    };
  }, [palette, school]);

  useEffect(() => {
    if (!school?.seo) return;

    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const onPublicLanding = path === '/' || path === '';
    if (!onPublicLanding) {
      document.title = school.seo.title;
    }

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon && school.logo?.favicon) {
      favicon.setAttribute('href', school.logo.favicon);
    }

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta && palette?.primary) {
      themeMeta.setAttribute('content', palette.primary);
    }
  }, [school, palette]);

  if (!known || !palette) {
    return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
  }

  return (
    <StyledThemeProvider theme={theme}>
      <BrandGlobalStyle
        $palette={palette}
        $primaryRgb={hexToRgbTriplet(palette.primary)}
        $accentRgb={hexToRgbTriplet(palette.accent)}
        $onPrimary={onPrimaryColor(palette.primary)}
      />
      {children}
    </StyledThemeProvider>
  );
};
