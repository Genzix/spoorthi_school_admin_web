import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { fadeUp, kenBurns, stagger } from '../motion';
import { usePrefersReducedMotion } from '../hooks';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  color: #fff;
  isolation: isolate;
`;

const Media = styled(motion.div)`
  position: absolute;
  inset: -4%;
  z-index: 0;
  background: var(--lp-navy);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.05) contrast(1.04);
  }
`;

const Wash = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      105deg,
      color-mix(in srgb, var(--lp-navy) 88%, #000) 0%,
      color-mix(in srgb, var(--lp-navy) 55%, transparent) 42%,
      color-mix(in srgb, var(--lp-navy) 18%, transparent) 72%,
      transparent 100%
    ),
    linear-gradient(
      to top,
      color-mix(in srgb, var(--lp-navy) 82%, #000) 0%,
      color-mix(in srgb, var(--lp-navy) 35%, transparent) 38%,
      transparent 68%
    );
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.18;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  width: min(1320px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: clamp(6.5rem, 14vh, 8.5rem) 0 clamp(5.5rem, 11vh, 7rem);
`;

const Brand = styled(motion.p)`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(3.4rem, 11vw, 7.25rem);
  line-height: 0.88;
  letter-spacing: -0.045em;
  margin: 0 0 clamp(1rem, 2.5vw, 1.5rem);
  color: #fff;
  text-wrap: balance;
`;

const Headline = styled(motion.h1)`
  font-family: var(--lp-font-body);
  font-weight: 500;
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  line-height: 1.35;
  letter-spacing: -0.015em;
  margin: 0 0 0.85rem;
  max-width: 36ch;
  color: color-mix(in srgb, #fff 92%, var(--lp-sky));
`;

const Sub = styled(motion.p)`
  font-family: var(--lp-font-body);
  font-size: clamp(0.95rem, 1.5vw, 1.08rem);
  line-height: 1.55;
  color: color-mix(in srgb, #fff 72%, transparent);
  margin: 0 0 1.65rem;
  max-width: 46ch;
`;

const Ctas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.7rem 1.35rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  border: 1.5px solid transparent;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.25s ease, border-color 0.25s ease, color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 3px;
  }

  &[data-variant='primary'] {
    background: var(--lp-gold);
    color: var(--lp-navy);
  }

  &[data-variant='ghost'] {
    background: color-mix(in srgb, #fff 10%, transparent);
    color: #fff;
    border-color: color-mix(in srgb, #fff 42%, transparent);
    backdrop-filter: blur(8px);
  }

  &[data-variant='ghost']:hover {
    background: color-mix(in srgb, #fff 18%, transparent);
    border-color: #fff;
  }
`;

const ScrollHint = styled(motion.a)`
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: max(1.4rem, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  color: color-mix(in srgb, #fff 70%, transparent);
  text-decoration: none;
  font-family: var(--lp-font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  svg {
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const resolveHeroImage = (hero) => {
  if (hero?.backgroundImage) {
    return { src: hero.backgroundImage, alt: hero.backgroundAlt || '' };
  }
  if (hero?.heroImage) {
    return { src: hero.heroImage, alt: hero.heroImageAlt || '' };
  }
  const first = hero?.floatImages?.[0];
  if (first?.src) return { src: first.src, alt: first.alt || '' };
  return { src: '', alt: '' };
};

const HeroCanvas = ({ hero, brandTitle }) => {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 140]);
  const opacity = useTransform(scrollY, [0, 520], [1, reduced ? 1 : 0.35]);

  const image = resolveHeroImage(hero);
  const headline =
    hero?.headline ||
    [hero?.leadBefore, hero?.pill1?.text, hero?.leadMid, hero?.pill2?.text]
      .filter(Boolean)
      .join(' ') ||
    'Where curiosity becomes character.';

  return (
    <Section id="home" aria-label="Hero">
      <Media style={{ y, opacity }} animate={kenBurns(reduced)}>
        {image.src ? (
          <img src={image.src} alt={image.alt} fetchPriority="high" />
        ) : null}
      </Media>
      <Wash aria-hidden />
      <Grain aria-hidden />

      <Content variants={stagger} initial="hidden" animate="show">
        <Brand variants={fadeUp}>{brandTitle}</Brand>
        <Headline variants={fadeUp}>{headline}</Headline>
        {hero?.subhead ? <Sub variants={fadeUp}>{hero.subhead}</Sub> : null}
        <Ctas variants={fadeUp}>
          <Cta data-variant="primary" href={hero?.primaryCta?.href || '#features'}>
            {hero?.primaryCta?.label || 'Discover more'}
          </Cta>
          <Cta data-variant="ghost" href={hero?.secondaryCta?.href || '#contact'}>
            {hero?.secondaryCta?.label || 'Apply now'}
          </Cta>
        </Ctas>
      </Content>

      <ScrollHint
        href="#features"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        Scroll
        <motion.span
          aria-hidden
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown />
        </motion.span>
      </ScrollHint>
    </Section>
  );
};

export default HeroCanvas;
