import styled, { css } from 'styled-components';

/** Unified landing page canvas — warm off-white from brand reference */
export const LANDING_PAGE_BG = '#FAF9F6';

export const landingFonts = css`
  :root,
  .lp-landing {
    --lp-page-bg: ${LANDING_PAGE_BG};
    --lp-art-cream: ${LANDING_PAGE_BG};
    --lp-font-display: 'Darker Grotesque', 'Outfit', system-ui, sans-serif;
    --lp-font-body: 'DM Sans', 'Outfit', system-ui, sans-serif;
    --lp-font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    --lp-font-script: 'Pinyon Script', 'Brush Script MT', cursive;
  }
`;

export const Container = styled.div`
  width: min(1320px, calc(100% - 2.5rem));
  margin-inline: auto;
`;

export const Section = styled.section`
  padding: clamp(3.5rem, 7vw, 5.5rem) 0;
  position: relative;
`;

export const Eyebrow = styled.p`
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(p) => p.$color || 'var(--lp-gold)'};
  margin: 0 0 0.75rem;
`;

export const Headline = styled.h2`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.2vw, 3.1rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: ${(p) => p.$color || 'var(--lp-navy)'};
  margin: 0 0 1rem;
  max-width: ${(p) => p.$max || '18ch'};
`;

export const Body = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${(p) => p.$color || 'var(--lp-muted)'};
  margin: 0;
  max-width: ${(p) => p.$max || '54ch'};
`;

export const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.7rem 1.45rem;
  border-radius: 0.55rem;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.25s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    background 0.25s ease, color 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 3px;
  }
`;

export const BtnPrimary = styled(Btn)`
  background: var(--lp-navy);
  color: #fff;
  border-color: var(--lp-navy);

  &:hover {
    background: color-mix(in srgb, var(--lp-navy) 88%, #000);
  }
`;

export const BtnGold = styled(Btn)`
  background: var(--lp-gold);
  color: var(--lp-navy);
  border-color: var(--lp-gold);

  &:hover {
    filter: brightness(1.05);
  }
`;

export const BtnGhost = styled(Btn)`
  background: transparent;
  color: var(--lp-navy);
  border-color: color-mix(in srgb, var(--lp-navy) 22%, transparent);

  &:hover {
    border-color: var(--lp-navy);
  }
`;

export const BtnOutlineLight = styled(Btn)`
  background: transparent;
  color: #fff;
  border-color: color-mix(in srgb, #fff 72%, transparent);

  &:hover {
    background: color-mix(in srgb, #fff 10%, transparent);
    border-color: #fff;
  }
`;

export const PageBanner = styled.div`
  background: var(--lp-navy);
  color: #fff;
  padding: 2.75rem 0 2.4rem;
  text-align: center;

  h1 {
    font-family: var(--lp-font-display);
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 700;
    margin: 0 0 0.55rem;
    letter-spacing: -0.02em;
  }

  nav {
    font-family: var(--lp-font-body);
    font-size: 0.85rem;
    opacity: 0.78;

    a {
      color: inherit;
      text-decoration: none;
    }

    span {
      margin: 0 0.4rem;
      opacity: 0.55;
    }
  }
`;
