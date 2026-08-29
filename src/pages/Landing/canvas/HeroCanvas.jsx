import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { fadeUp, kenBurns, stagger } from '../motion';
import { usePrefersReducedMotion } from '../hooks';
import {
  ART,
  FlowerAccent,
  HeartAccent,
  HeroStageBlobs,
  LeafAccent,
  StarAccent,
  WaveDivider,
} from './artLandingDecor';

/* ==========================================================================
   CINEMATIC FULL-SCREEN HERO (Image 1 Implementation for GenCampus)
   ========================================================================== */

const CinematicSection = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  color: #fff;
  isolation: isolate;
  background: #081122;
`;

const CinematicMedia = styled(motion.div)`
  position: absolute;
  inset: -4%;
  z-index: 0;
  background: #081122;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.05) contrast(1.04);
  }
`;

const CinematicWash = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      105deg,
      rgba(8, 17, 34, 0.94) 0%,
      rgba(8, 17, 34, 0.84) 30%,
      rgba(8, 17, 34, 0.48) 54%,
      rgba(8, 17, 34, 0.12) 76%,
      transparent 100%
    ),
    linear-gradient(
      to top,
      rgba(8, 17, 34, 0.90) 0%,
      rgba(8, 17, 34, 0.38) 32%,
      transparent 64%
    );
`;

const CinematicGrain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const CinematicContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  width: min(1320px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: clamp(6.5rem, 14vh, 8.5rem) 0 clamp(4.8rem, 10vh, 6.2rem);
`;

const CinematicBrand = styled(motion.p)`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(3.4rem, 8.5vw, 6.2rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 0 0 clamp(0.75rem, 1.8vw, 1.25rem);
  color: #ffffff;
  text-wrap: balance;
`;

const CinematicHeadline = styled(motion.h1)`
  font-family: var(--lp-font-body);
  font-weight: 600;
  font-size: clamp(1.2rem, 2.2vw, 1.55rem);
  line-height: 1.35;
  letter-spacing: -0.015em;
  margin: 0 0 0.85rem;
  max-width: 38ch;
  color: #ffffff;
`;

const CinematicSub = styled(motion.p)`
  font-family: var(--lp-font-body);
  font-size: clamp(0.92rem, 1.4vw, 1.05rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.76);
  margin: 0 0 1.75rem;
  max-width: 48ch;
`;

const CinematicCtas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
`;

const CinematicCtaPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.9rem;
  padding: 0.72rem 1.6rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 750;
  text-decoration: none;
  background: #f59e0b;
  color: #0b172a;
  box-shadow: 0 6px 22px rgba(245, 158, 11, 0.38);
  border: 1px solid transparent;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease, filter 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
    box-shadow: 0 10px 28px rgba(245, 158, 11, 0.48);
  }

  &:focus-visible {
    outline: 2px solid #f59e0b;
    outline-offset: 3px;
  }
`;

const CinematicCtaSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.9rem;
  padding: 0.72rem 1.6rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.09);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(10px);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.6);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
`;

const CinematicScrollHint = styled(motion.a)`
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: max(1.4rem, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-family: var(--lp-font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  svg {
    font-size: 1rem;
  }
`;

const CinematicHero = ({ hero, brandTitle }) => {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 130]);
  const opacity = useTransform(scrollY, [0, 520], [1, reduced ? 1 : 0.4]);

  const imageSrc =
    hero?.backgroundImage || hero?.heroImage || hero?.floatImages?.[0]?.src || '';
  const imageAlt = hero?.backgroundAlt || hero?.heroImageAlt || `${brandTitle} campus`;

  return (
    <CinematicSection id="home" aria-label="Hero">
      <CinematicMedia style={{ y, opacity }} animate={kenBurns(reduced)}>
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} fetchPriority="high" />
        ) : null}
      </CinematicMedia>
      <CinematicWash aria-hidden />
      <CinematicGrain aria-hidden />

      <CinematicContent variants={stagger} initial="hidden" animate="show">
        <CinematicBrand variants={fadeUp}>{brandTitle || 'GenCampus'}</CinematicBrand>
        <CinematicHeadline variants={fadeUp}>
          {hero?.headline || 'Education today, leaders tomorrow.'}
        </CinematicHeadline>
        <CinematicSub variants={fadeUp}>
          {hero?.subhead ||
            'The campus for curious learners — where families and teachers grow futures together.'}
        </CinematicSub>
        <CinematicCtas variants={fadeUp}>
          <CinematicCtaPrimary href={hero?.primaryCta?.href || '#features'}>
            {hero?.primaryCta?.label || 'Explore GenCampus'}
          </CinematicCtaPrimary>
          <CinematicCtaSecondary href={hero?.secondaryCta?.href || '#contact'}>
            {hero?.secondaryCta?.label || 'Apply now'}
          </CinematicCtaSecondary>
        </CinematicCtas>
      </CinematicContent>

      <CinematicScrollHint
        href="#features"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        Scroll
        <motion.span
          aria-hidden
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown />
        </motion.span>
      </CinematicScrollHint>
    </CinematicSection>
  );
};

/* ==========================================================================
   ARTISTIC PEACH HERO (Image 2 Implementation for Spoorthi / Art Template)
   ========================================================================== */

const photoFloat = keyframes`
  0%, 100% { transform: translate(-52%, -50%) translateY(0); }
  50% { transform: translate(-52%, -50%) translateY(-6px); }
`;

const ArtSection = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--lp-page-bg, ${ART.cream});
  color: var(--lp-art-ink, ${ART.ink});
`;

const ArtInner = styled.div`
  position: relative;
  z-index: 2;
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(1.25rem, 4vw, 3rem);
  width: min(1280px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding:
    clamp(6.25rem, 12vh, 8rem) 0
    clamp(6.5rem, 12vh, 8.5rem);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: clamp(5.5rem, 11vh, 7rem);
  }
`;

const ArtCopy = styled(motion.div)`
  position: relative;
  z-index: 5;
  min-width: 0;
  max-width: 36rem;

  @media (max-width: 900px) {
    order: 2;
    text-align: center;
    max-width: 100%;
    margin-inline: auto;
  }
`;

const ArtHeadline = styled(motion.h1)`
  font-family: var(--lp-font-serif);
  font-weight: 600;
  font-size: clamp(2.15rem, 4.8vw, 3.75rem);
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: var(--lp-art-ink, ${ART.ink});
  margin: 0 0 1.15rem;
  text-wrap: balance;
`;

const ArtHeadlineLine = styled(motion.span)`
  display: block;

  & + & {
    margin-top: 0.2rem;
  }
`;

const ArtSub = styled(motion.p)`
  font-family: var(--lp-font-body);
  font-size: clamp(0.94rem, 1.4vw, 1.06rem);
  line-height: 1.65;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 70%, transparent);
  margin: 0 0 1.6rem;
  max-width: 42ch;

  @media (max-width: 900px) {
    margin-inline: auto;
  }
`;

const ArtCtas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 1.75rem);

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ArtCtaPrimary = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.65rem;
  border-radius: 999px;
  background: var(--lp-art-ink, ${ART.ink});
  color: #fff;
  font-family: var(--lp-font-body);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 22%, transparent);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease, background 0.25s ease;

  svg {
    font-size: 1rem;
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 32%, transparent);

    svg {
      transform: translateX(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--lp-art-coral, ${ART.coral});
    outline-offset: 3px;
  }
`;

const ArtCtaGhost = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 0.25rem;
  color: var(--lp-art-ink, ${ART.ink});
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--lp-art-coral, ${ART.coral});
  }

  &:focus-visible {
    outline: 2px solid var(--lp-art-coral, ${ART.coral});
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const GhostLine = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.25rem;
  width: 100%;
  height: 6px;
  color: var(--lp-art-coral, ${ART.coral});
  pointer-events: none;
`;

const ArtStage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(22rem, 46vh, 32rem);

  @media (max-width: 900px) {
    order: 1;
    min-height: clamp(18rem, 40vh, 24rem);
  }
`;

const PhotoRing = styled.div`
  position: absolute;
  z-index: 2;
  left: 52%;
  top: 50%;
  width: clamp(15.5rem, 64%, 23rem);
  height: clamp(15.5rem, 64%, 23rem);
  border-radius: 50%;
  overflow: hidden;
  border: clamp(8px, 1.6vw, 14px) solid #fff;
  box-shadow:
    0 24px 60px color-mix(in srgb, var(--lp-art-coral, ${ART.coral}) 32%, transparent),
    0 6px 18px rgba(0, 0, 0, 0.08);
  animation: ${(p) => (p.$animate ? photoFloat : 'none')} 5.5s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.05) contrast(1.02);
  }
`;

const ServiceBadge = styled(motion.div)`
  position: absolute;
  z-index: 4;
  right: 10%;
  bottom: 16%;
  width: clamp(4.65rem, 21%, 6.15rem);
  height: clamp(4.65rem, 21%, 6.15rem);
  border-radius: 50%;
  background: var(--lp-art-ink, ${ART.ink});
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem 0.4rem;
  box-shadow: 0 12px 28px color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 34%, transparent);

  @media (max-width: 900px) {
    right: 4%;
    bottom: 10%;
    width: clamp(4.35rem, 24%, 5.5rem);
    height: clamp(4.35rem, 24%, 5.5rem);
  }
`;

const BadgeTitle = styled.span`
  font-family: var(--lp-font-body);
  font-size: clamp(0.46rem, 1.1vw, 0.52rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 0.2rem;
`;

const BadgeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--lp-font-body);
  font-size: clamp(0.5rem, 1.15vw, 0.58rem);
  font-weight: 600;
  line-height: 1.35;
  opacity: 0.95;
`;

const ArtScrollHint = styled.a`
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: clamp(5rem, 9vh, 6.5rem);
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 50%, transparent);
  text-decoration: none;
  font-family: var(--lp-font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.2s ease;

  svg {
    font-size: 0.95rem;
    animation: bounce 1.8s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
  }

  &:hover {
    color: var(--lp-art-ink, ${ART.ink});
  }
`;

const DEFAULT_SERVICES = [
  'Academics',
  'Arts & Sports',
  'Character',
  'Community',
];

const resolveArtHeroImage = (hero) => {
  if (hero?.heroImage) {
    return { src: hero.heroImage, alt: hero.heroImageAlt || '' };
  }
  if (hero?.backgroundImage) {
    return { src: hero.backgroundImage, alt: hero.backgroundAlt || '' };
  }
  const first = hero?.floatImages?.[0];
  if (first?.src) return { src: first.src, alt: first.alt || '' };
  return { src: '', alt: '' };
};

const resolveArtHeadline = (hero) => {
  if (hero?.headlineBefore && hero?.headlineScript) {
    return {
      before: hero.headlineBefore,
      script: hero.headlineScript,
    };
  }
  return {
    before: 'We grow minds that',
    script: 'connect & inspire',
  };
};

const ArtHero = ({ hero, brandTitle }) => {
  const reduced = usePrefersReducedMotion();
  const image = resolveArtHeroImage(hero);
  const headline = useMemo(() => resolveArtHeadline(hero), [hero]);
  const services = hero?.services?.length ? hero.services : DEFAULT_SERVICES;
  const badgeTitle = hero?.badgeTitle || 'Campus life';

  return (
    <ArtSection id="home" aria-label="Hero">
      <ArtInner>
        <ArtCopy variants={stagger} initial="hidden" animate="show">
          <ArtHeadline variants={stagger}>
            <ArtHeadlineLine variants={fadeUp}>{headline.before}</ArtHeadlineLine>
            <ArtHeadlineLine variants={fadeUp}>{headline.script}</ArtHeadlineLine>
          </ArtHeadline>
          <ArtSub variants={fadeUp}>
            {hero?.subhead ||
              `${brandTitle} is where young minds grow into confident, kind leaders.`}
          </ArtSub>
          <ArtCtas variants={fadeUp}>
            <ArtCtaPrimary href={hero?.primaryCta?.href || '#features'}>
              {hero?.primaryCta?.label || 'Explore campus'}
              <FiArrowRight aria-hidden />
            </ArtCtaPrimary>
            <ArtCtaGhost href={hero?.secondaryCta?.href || '#contact'}>
              {hero?.secondaryCta?.label || "Let's Chat"}
              <GhostLine viewBox="0 0 80 6" aria-hidden>
                <path
                  d="M2 4 C20 1, 40 5, 78 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </GhostLine>
            </ArtCtaGhost>
          </ArtCtas>
        </ArtCopy>

        <ArtStage>
          <HeroStageBlobs />

          <StarAccent
            style={{ top: '6%', left: '18%', zIndex: 3 }}
            color={ART.coral}
            size={16}
          />
          <LeafAccent
            style={{ top: '2%', right: '28%', zIndex: 3 }}
            color={ART.terracotta}
            size={26}
          />
          <HeartAccent
            style={{ bottom: '22%', left: '8%', zIndex: 3 }}
            color={ART.accent}
            size={14}
          />
          <StarAccent
            style={{ bottom: '30%', right: '2%', zIndex: 3 }}
            color={ART.coral}
            size={12}
          />

          <PhotoRing $animate={!reduced}>
            {image.src ? (
              <img src={image.src} alt={image.alt} fetchPriority="high" />
            ) : null}
          </PhotoRing>

          <ServiceBadge
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <BadgeTitle>{badgeTitle}</BadgeTitle>
            <BadgeList>
              {services.slice(0, 4).map((item) => (
                <li key={typeof item === 'string' ? item : item.label}>
                  {typeof item === 'string' ? item : item.label}
                </li>
              ))}
            </BadgeList>
          </ServiceBadge>
        </ArtStage>
      </ArtInner>

      <FlowerAccent
        style={{ top: '14%', left: '4%', zIndex: 1 }}
        color={ART.accent}
        size={38}
      />

      <ArtScrollHint href="#features">
        Scroll to explore
        <FiArrowDown aria-hidden />
      </ArtScrollHint>

      <WaveDivider fill="var(--lp-page-bg)" />
    </ArtSection>
  );
};

/* ==========================================================================
   MAIN HERO DISPATCHER (Clean Multi-Tenant Architecture)
   ========================================================================== */

const HeroCanvas = ({ hero, brandTitle, variant }) => {
  const isCinematic =
    variant === 'cinematic' ||
    hero?.variant === 'cinematic' ||
    (!hero?.headlineBefore && !hero?.services && hero?.backgroundImage);

  if (isCinematic) {
    return <CinematicHero hero={hero} brandTitle={brandTitle} />;
  }

  return <ArtHero hero={hero} brandTitle={brandTitle} />;
};

export default HeroCanvas;
