import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { fadeUp, slideInLeft, stagger } from '../motion';
import {
  ART,
  FlowerAccent,
  HeartAccent,
  LeafAccent,
  StarAccent,
} from './artLandingDecor';

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 7vw, 5rem) 0 clamp(4rem, 8vw, 6rem);
  background: var(--lp-page-bg, ${ART.cream});
  overflow: hidden;
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
  width: min(1320px, calc(100% - 2.5rem));
  margin-inline: auto;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Visual = styled(motion.div)`
  position: relative;
  min-height: clamp(18rem, 40vh, 28rem);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 960px) {
    max-width: 24rem;
    margin-inline: auto;
  }
`;

const PhotoFrame = styled(motion.div)`
  position: relative;
  width: min(100%, 24rem);
  aspect-ratio: 0.9;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: -6%;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    background: linear-gradient(
      160deg,
      var(--lp-art-peach-light, ${ART.peachLight}) 0%,
      var(--lp-art-coral, ${ART.coral}) 100%
    );
    opacity: 0.3;
    z-index: -1;
  }
`;

const Photo = styled.div`
  width: 100%;
  height: 100%;
  clip-path: url(#art-about-blob);
  overflow: hidden;
  background: var(--lp-art-peach, ${ART.peach});

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Copy = styled(motion.div)`
  max-width: 32rem;

  @media (max-width: 960px) {
    margin-inline: auto;
  }
`;

const Eyebrow = styled(motion.p)`
  margin: 0 0 0.85rem;
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lp-art-accent, ${ART.accent});
`;

const Headline = styled(motion.h2)`
  font-family: var(--lp-font-serif);
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--lp-art-ink, ${ART.ink});
  margin: 0 0 1rem;
  text-wrap: balance;
`;

const Body = styled(motion.p)`
  font-family: var(--lp-font-body);
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  line-height: 1.7;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 68%, transparent);
  margin: 0 0 1.65rem;
  white-space: pre-line;
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--lp-art-coral, ${ART.coral});
  color: #fff;
  transition: transform 0.25s var(--lp-ease), filter 0.2s ease;

  svg {
    transition: transform 0.25s var(--lp-ease);
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);

    svg {
      transform: translateX(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--lp-art-ink, ${ART.ink});
    outline-offset: 3px;
  }
`;

const ArtAboutSection = ({ about }) => {
  if (!about) return null;

  const image = about.hoverImage || about.image;
  const imageAlt = about.hoverImageAlt || about.imageAlt || '';

  return (
    <Section id="about" aria-label="About us">

      <FlowerAccent
        style={{ top: '12%', right: '8%', zIndex: 1 }}
        color={ART.accent}
        size={36}
      />
      <StarAccent
        style={{ bottom: '18%', left: '6%', zIndex: 1 }}
        color={ART.coral}
        size={16}
      />
      <HeartAccent
        style={{ top: '22%', left: '14%', zIndex: 1 }}
        color={ART.accent}
        size={14}
      />
      <LeafAccent
        style={{ bottom: '28%', right: '12%', zIndex: 1 }}
        color={ART.terracotta}
        size={24}
      />

      <Inner>
        <Visual variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <PhotoFrame>
            <Photo>
              {image ? <img src={image} alt={imageAlt} loading="lazy" /> : null}
            </Photo>
          </PhotoFrame>
        </Visual>

        <Copy variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <Eyebrow variants={fadeUp}>
            {about.missionVision?.eyebrow || about.eyebrow || 'About Me'}
          </Eyebrow>
          <Headline variants={fadeUp}>
            {about.missionVision?.headline || about.headline?.replace('\n', ' ') || 'Our story'}
          </Headline>
          <Body variants={fadeUp}>
            {about.body ||
              about.mission?.body ||
              'We believe every learner deserves a campus that feels safe, joyful, and ambitious.'}
          </Body>
          <motion.div variants={fadeUp}>
            <Cta href="#features">
              More About Us
              <FiArrowRight aria-hidden />
            </Cta>
          </motion.div>
        </Copy>
      </Inner>
    </Section>
  );
};

export default ArtAboutSection;
