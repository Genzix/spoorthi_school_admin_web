import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as Fi from 'react-icons/fi';
import Reveal from './Reveal';
import CountUp from './CountUp';
import { fadeUp, stagger } from './motion';
import {
  Body,
  BtnGold,
  Container,
  Eyebrow,
  Headline,
  Section,
} from './styles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(1.75rem, 4vw, 3.25rem);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Bullets = styled.ul`
  list-style: none;
  margin: 1.35rem 0 1.6rem;
  padding: 0;
  display: grid;
  gap: 0.7rem;
`;

const Bullet = styled.li`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--lp-font-body);
  font-weight: 600;
  color: var(--lp-ink);

  span {
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--lp-gold) 22%, #fff);
    color: var(--lp-navy);
    display: grid;
    place-items: center;
    font-size: 0.75rem;
    flex-shrink: 0;
  }
`;

/** 3D flip stage — library face by default; students face on hover/focus/tap. */
const FlipScene = styled.button`
  position: relative;
  display: block;
  width: 100%;
  min-height: 320px;
  aspect-ratio: 4 / 5;
  max-height: 520px;
  padding: 0;
  border: none;
  border-radius: 1.1rem;
  cursor: pointer;
  background: transparent;
  perspective: 1400px;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 22px 50px rgba(11, 31, 58, 0.14);

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 4px;
  }

  @media (max-width: 900px) {
    aspect-ratio: 5 / 4;
    max-height: 420px;
  }
`;

const FlipInner = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  border-radius: inherit;
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);

  ${FlipScene}:hover &,
  ${FlipScene}:focus-visible &,
  ${FlipScene}[data-flipped='true'] & {
    transform: rotateY(180deg);
  }

  @media (hover: none) {
    ${FlipScene}:hover & {
      transform: none;
    }

    ${FlipScene}[data-flipped='true'] & {
      transform: rotateY(180deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.35s ease;
    transform: none !important;
  }
`;

const Face = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #e8edf5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.01);
    transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${FlipScene}:hover & img,
  ${FlipScene}:focus-visible & img,
  ${FlipScene}[data-flipped='true'] & img {
    transform: scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
      transform: none !important;
    }
  }
`;

const FrontFace = styled(Face)`
  z-index: 1;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transition: opacity 0.35s ease;

    ${FlipScene}:hover &,
    ${FlipScene}:focus-visible &,
    ${FlipScene}[data-flipped='true'] & {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const BackFace = styled(Face)`
  transform: rotateY(180deg);
  z-index: 0;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 2;

    ${FlipScene}:hover &,
    ${FlipScene}:focus-visible &,
    ${FlipScene}[data-flipped='true'] & {
      opacity: 1;
    }
  }
`;

const StaticPhoto = styled.div`
  border-radius: 1.1rem;
  overflow: hidden;
  min-height: 320px;
  box-shadow: 0 22px 50px rgba(11, 31, 58, 0.14);

  img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
    display: block;
  }
`;

const Fraternity = styled.section`
  position: relative;
  isolation: isolate;
  margin-top: clamp(2.75rem, 5vw, 3.75rem);
  min-height: clamp(280px, 42vw, 420px);
  display: grid;
  place-items: center;
  color: #fff;
  overflow: hidden;
  border-radius: 1.15rem;

  @media (max-width: 700px) {
    border-radius: 0.9rem;
    min-height: 360px;
  }
`;

const FraternityMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, #0b1f3a 55%, transparent) 0%,
        color-mix(in srgb, #0b1f3a 62%, transparent) 45%,
        color-mix(in srgb, #0b1f3a 78%, transparent) 100%
      );
  }
`;

const FraternityInner = styled(motion.div)`
  width: min(960px, calc(100% - 2.5rem));
  padding: clamp(2.25rem, 5vw, 3.25rem) 0;
  text-align: center;
`;

const FraternityTitle = styled.h3`
  margin: 0 0 clamp(1.5rem, 3.5vw, 2.25rem);
  font-family: var(--lp-font-display);
  font-size: clamp(1.85rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
`;

const FraternityStats = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols || 4}, 1fr);
  gap: 0;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FraternityStat = styled(motion.div)`
  padding: 0.35rem 1rem;
  border-right: 1px solid color-mix(in srgb, #fff 28%, transparent);

  &:last-child {
    border-right: 0;
  }

  @media (max-width: 800px) {
    border-right: 0;
  }

  span {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.88;
    margin-bottom: 0.4rem;
  }

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: clamp(1.85rem, 3.4vw, 2.55rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
  }
`;

const MissionGrid = styled.div`
  margin-top: clamp(2rem, 4vw, 2.75rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 3vw, 2.5rem);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const MissionBlock = styled(motion.div)`
  .icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--lp-gold) 18%, #fff);
    color: var(--lp-navy);
    margin-bottom: 0.85rem;
    font-size: 1.15rem;
  }

  h3 {
    font-family: var(--lp-font-display);
    font-size: 1.25rem;
    color: var(--lp-navy);
    margin: 0 0 0.45rem;
  }

  p {
    font-family: var(--lp-font-body);
    color: var(--lp-muted);
    line-height: 1.65;
    margin: 0;
    font-size: 0.98rem;
  }
`;

/**
 * About-only image flip:
 * Front = library (default). Hover / focus / tap → 3D rotateY reveals students.
 * Touch devices use tap toggle; fine-pointer devices use CSS hover.
 * Reduced-motion falls back to a crossfade.
 */
const AboutFlipPhoto = ({ frontSrc, frontAlt, backSrc, backAlt }) => {
  const [flipped, setFlipped] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    // Preload reverse face so the flip never flashes empty.
    const img = new Image();
    img.src = backSrc;
  }, [backSrc]);

  const onActivate = () => {
    if (canHover) return;
    setFlipped((v) => !v);
  };

  return (
    <FlipScene
      type="button"
      data-flipped={flipped ? 'true' : 'false'}
      aria-label={
        flipped
          ? `${backAlt}. Activate to show previous image.`
          : `${frontAlt}. Activate to reveal another campus moment.`
      }
      aria-pressed={flipped}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
    >
      <FlipInner>
        <FrontFace>
          <img src={frontSrc} alt={frontAlt} loading="eager" />
        </FrontFace>
        <BackFace>
          <img src={backSrc} alt={backAlt} loading="lazy" />
        </BackFace>
      </FlipInner>
    </FlipScene>
  );
};

const About = ({ about, stats = [] }) => {
  const fraternityImage = about.fraternityImage || about.image;
  const fraternityTitle = about.fraternityTitle || 'Our Fraternity';
  const hoverImage = about.hoverImage;
  const hoverAlt = about.hoverImageAlt || about.imageAlt;

  return (
    <Section id="about" style={{ background: 'var(--lp-surface)' }}>
      <Container>
        <Grid>
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <Headline $max="16ch">{about.headline}</Headline>
            <Body>{about.body}</Body>
            <Bullets>
              {about.bullets.map((b) => (
                <Bullet key={b}>
                  <span>
                    <Fi.FiCheck aria-hidden />
                  </span>
                  {b}
                </Bullet>
              ))}
            </Bullets>
            <BtnGold href="#contact">Know More</BtnGold>
          </Reveal>

          <Reveal delay={0.08}>
            {hoverImage ? (
              <AboutFlipPhoto
                frontSrc={about.image}
                frontAlt={about.imageAlt}
                backSrc={hoverImage}
                backAlt={hoverAlt}
              />
            ) : (
              <StaticPhoto>
                <img src={about.image} alt={about.imageAlt} loading="lazy" />
              </StaticPhoto>
            )}
          </Reveal>
        </Grid>

        <Fraternity>
          <FraternityMedia aria-hidden>
            <img src={fraternityImage} alt="" loading="lazy" />
          </FraternityMedia>
          <FraternityInner
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <FraternityTitle>{fraternityTitle}</FraternityTitle>
            </motion.div>
            <FraternityStats $cols={stats.length || 4}>
              {stats.map((s, i) => (
                <FraternityStat key={s.label} variants={fadeUp}>
                  <span>{s.label}</span>
                  <CountUp value={s.value} duration={1400 + i * 180} />
                </FraternityStat>
              ))}
            </FraternityStats>
          </FraternityInner>
        </Fraternity>

        <MissionGrid
          as={motion.div}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <MissionBlock variants={fadeUp}>
            <div className="icon">
              <Fi.FiCompass aria-hidden />
            </div>
            <h3>{about.mission.title}</h3>
            <p>{about.mission.body}</p>
          </MissionBlock>
          <MissionBlock variants={fadeUp}>
            <div className="icon">
              <Fi.FiEye aria-hidden />
            </div>
            <h3>{about.vision.title}</h3>
            <p>{about.vision.body}</p>
          </MissionBlock>
        </MissionGrid>
      </Container>
    </Section>
  );
};

export default About;
