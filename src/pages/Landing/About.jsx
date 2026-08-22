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

const Wrap = styled(Section)`
  overflow: hidden;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.98fr);
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const CopyBlock = styled.div`
  position: relative;
  z-index: 1;
`;

const Lead = styled(Body)`
  margin-top: 0.35rem;
`;

const FeatureGrid = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 1.85rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.95rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.li)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
  padding: 1rem 1rem 1.05rem;
  border-radius: 1rem;
  background: color-mix(in srgb, #fff 72%, var(--lp-surface));
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  box-shadow: 0 14px 32px rgba(11, 31, 58, 0.08);

  span {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.7rem;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--lp-gold) 24%, #fff),
      color-mix(in srgb, var(--lp-sky) 18%, #fff)
    );
    color: var(--lp-navy);
    display: grid;
    place-items: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 1.08rem;
    line-height: 1;
    color: var(--lp-navy);
    margin-bottom: 0.35rem;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
    font-family: var(--lp-font-body);
    color: var(--lp-muted);
    font-size: 0.92rem;
    line-height: 1.55;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
`;

const VisualWrap = styled(motion.div)`
  position: relative;
  min-width: 0;
`;

const VisualGlow = styled.div`
  position: absolute;
  inset: 10% -8% auto auto;
  width: clamp(180px, 28vw, 260px);
  height: clamp(180px, 28vw, 260px);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--lp-gold) 24%, transparent) 0%,
    transparent 70%
  );
  filter: blur(14px);
  pointer-events: none;
`;

const VisualShell = styled.div`
  position: relative;
  padding: clamp(1rem, 2vw, 1.2rem);
  border-radius: 1.5rem;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, #fff 82%, var(--lp-surface)),
    color-mix(in srgb, var(--lp-sky) 10%, #fff)
  );
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  box-shadow: 0 26px 60px rgba(11, 31, 58, 0.12);
`;

/** 3D flip stage — library face by default; students face on hover/focus/tap. */
const FlipScene = styled.button`
  position: relative;
  display: block;
  width: 100%;
  min-height: 340px;
  aspect-ratio: 4 / 4.8;
  max-height: 560px;
  padding: 0;
  border: none;
  border-radius: 1.15rem;
  cursor: pointer;
  background: transparent;
  perspective: 1400px;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;

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

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, #0b1f3a 8%, transparent) 0%,
        transparent 40%,
        color-mix(in srgb, #0b1f3a 18%, transparent) 100%
      );
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
  border-radius: 1.15rem;
  overflow: hidden;
  min-height: 340px;

  img {
    width: 100%;
    height: 100%;
    min-height: 340px;
    object-fit: cover;
    display: block;
  }
`;

const FloatingBadge = styled.div`
  position: absolute;
  left: clamp(-0.25rem, 2vw, 1rem);
  bottom: clamp(1rem, 2vw, 1.4rem);
  max-width: min(320px, calc(100% - 2rem));
  padding: 1rem 1.05rem;
  border-radius: 1rem;
  background: color-mix(in srgb, #fff 88%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);
  box-shadow: 0 18px 38px rgba(11, 31, 58, 0.16);

  strong {
    display: block;
    margin-bottom: 0.3rem;
    font-family: var(--lp-font-display);
    font-size: 1.15rem;
    color: var(--lp-navy);
  }

  p {
    margin: 0;
    font-family: var(--lp-font-body);
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--lp-muted);
  }
`;

const MiniStats = styled.div`
  position: absolute;
  top: clamp(0.85rem, 2vw, 1.1rem);
  right: clamp(0.85rem, 2vw, 1.1rem);
  display: grid;
  gap: 0.75rem;
  width: min(190px, 42%);

  @media (max-width: 560px) {
    position: static;
    width: 100%;
    margin-top: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const MiniStat = styled.div`
  padding: 0.9rem 0.95rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--lp-navy) 90%, transparent);
  color: #fff;
  box-shadow: 0 14px 28px rgba(11, 31, 58, 0.18);

  span {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, #fff 76%, var(--lp-gold));
    margin-bottom: 0.35rem;
  }

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }
`;

const Fraternity = styled.section`
  position: relative;
  isolation: isolate;
  margin-top: clamp(3rem, 5vw, 4.25rem);
  overflow: hidden;
  border-radius: 1.4rem;
  background: var(--lp-navy);
  color: #fff;
  box-shadow: 0 28px 70px rgba(11, 31, 58, 0.18);
`;

const FraternityMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

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
        110deg,
        color-mix(in srgb, #07111f 85%, transparent) 0%,
        color-mix(in srgb, #0b1f3a 72%, transparent) 35%,
        color-mix(in srgb, #0b1f3a 56%, transparent) 62%,
        color-mix(in srgb, #0b1f3a 82%, transparent) 100%
      );
  }
`;

const FraternityInner = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: min(1120px, calc(100% - 2.5rem));
  margin-inline: auto;
  padding: clamp(2.25rem, 5vw, 3.5rem) 0;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);
  align-items: end;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FraternityCopy = styled.div`
  max-width: 28rem;
`;

const FraternityLabel = styled(Eyebrow)`
  margin-bottom: 0.9rem;
  color: color-mix(in srgb, var(--lp-gold) 88%, #fff);
`;

const FraternityTitle = styled.h3`
  margin: 0 0 0.85rem;
  font-family: var(--lp-font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: #fff;
`;

const FraternityBody = styled.p`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.98rem;
  line-height: 1.7;
  color: color-mix(in srgb, #fff 82%, transparent);
`;

const FraternityStats = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => Math.min(p.$cols || 4, 4)}, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const FraternityStat = styled(motion.div)`
  padding: 1.15rem 1rem 1.2rem;
  border-radius: 1rem;
  background: color-mix(in srgb, #fff 14%, transparent);
  border: 1px solid color-mix(in srgb, #fff 18%, transparent);
  backdrop-filter: blur(6px);

  span {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, #fff 74%, var(--lp-gold));
    margin-bottom: 0.45rem;
  }

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: clamp(1.8rem, 3.4vw, 2.5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #fff;
  }
`;

const MissionGrid = styled(motion.div)`
  margin-top: clamp(2rem, 4vw, 2.8rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.1rem, 2vw, 1.5rem);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const MissionBlock = styled(motion.article)`
  padding: clamp(1.35rem, 2.8vw, 1.75rem);
  border-radius: 1.15rem;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, #fff 82%, var(--lp-surface)),
    color-mix(in srgb, var(--lp-sky) 8%, #fff)
  );
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  box-shadow: 0 16px 34px rgba(11, 31, 58, 0.08);

  .icon {
    width: 2.85rem;
    height: 2.85rem;
    border-radius: 0.8rem;
    display: grid;
    place-items: center;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--lp-gold) 24%, #fff),
      color-mix(in srgb, var(--lp-sky) 16%, #fff)
    );
    color: var(--lp-navy);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  h3 {
    font-family: var(--lp-font-display);
    font-size: 1.45rem;
    line-height: 1;
    color: var(--lp-navy);
    margin: 0 0 0.55rem;
    letter-spacing: -0.02em;
  }

  p {
    font-family: var(--lp-font-body);
    color: var(--lp-muted);
    line-height: 1.7;
    margin: 0;
    font-size: 0.97rem;
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
  const spotlightStats = stats.slice(0, 2);
  const detailCards = about.bullets || [];

  return (
    <Wrap id="about" style={{ background: 'var(--lp-surface)' }}>
      <Container>
        <HeroGrid>
          <Reveal>
            <CopyBlock>
              <Eyebrow>{about.eyebrow}</Eyebrow>
              <Headline $max="14ch">{about.headline}</Headline>
              <Lead>{about.body}</Lead>

              <FeatureGrid
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
              >
                {detailCards.map((b) => (
                  <FeatureCard key={b} variants={fadeUp}>
                    <span>
                      <Fi.FiCheck aria-hidden />
                    </span>
                    <div>
                      <strong>{b}</strong>
                      <p>Built into the everyday student experience with consistency and care.</p>
                    </div>
                  </FeatureCard>
                ))}
              </FeatureGrid>

              <Actions>
                <BtnGold href="#contact">Know More</BtnGold>
              </Actions>
            </CopyBlock>
          </Reveal>

          <Reveal delay={0.08}>
            <VisualWrap
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <VisualGlow aria-hidden />
              <VisualShell>
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

                {spotlightStats.length ? (
                  <MiniStats>
                    {spotlightStats.map((item, i) => (
                      <MiniStat key={`${item.label}-${i}`}>
                        <span>{item.label}</span>
                        <CountUp value={item.value} duration={1200 + i * 160} />
                      </MiniStat>
                    ))}
                  </MiniStats>
                ) : null}

                <FloatingBadge>
                  <strong>Designed for modern families</strong>
                  <p>
                    From strong academics to confident life skills, this environment is built to help every child grow with purpose.
                  </p>
                </FloatingBadge>
              </VisualShell>
            </VisualWrap>
          </Reveal>
        </HeroGrid>

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
            <FraternityCopy as={motion.div} variants={fadeUp}>
              <FraternityLabel>Community At A Glance</FraternityLabel>
              <FraternityTitle>{fraternityTitle}</FraternityTitle>
              <FraternityBody>
                A thriving school culture grows when learners, educators, and families move forward together with shared values and long-term vision.
              </FraternityBody>
            </FraternityCopy>
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
    </Wrap>
  );
};

export default About;
