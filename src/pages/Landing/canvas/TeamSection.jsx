import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import * as Fi from 'react-icons/fi';
import Reveal from '../Reveal';
import CountUp from '../CountUp';
import { easeOut } from '../motion';

const Section = styled.section`
  padding: clamp(3.5rem, 8vw, 5.5rem) 1.25rem 4.5rem;
`;

const Inner = styled.div`
  width: min(1100px, 100%);
  margin-inline: auto;
`;

const Intro = styled.div`
  max-width: 38rem;
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
`;

const Title = styled.h2`
  margin: 0 0 0.9rem;
  font-family: var(--lp-font-display);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  color: var(--lp-ink);
  line-height: 1;

  em {
    font-style: italic;
    font-weight: 600;
    color: color-mix(in srgb, var(--lp-navy) 70%, var(--lp-sky));
  }
`;

const Body = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--lp-muted);
  margin: 0;
  max-width: 48ch;

  em {
    font-style: italic;
    color: color-mix(in srgb, var(--lp-ink) 78%, var(--lp-sky));
  }
`;

const Stage = styled.div`
  position: relative;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--lp-sky) 45%, transparent);
    border-radius: 1.35rem;
  }
`;

const Card = styled(motion.article)`
  display: grid;
  grid-template-columns: minmax(200px, 0.38fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 3.5vw, 2.75rem);
  padding: clamp(1.35rem, 3vw, 2.1rem);
  border-radius: 1.35rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  box-shadow: 0 20px 48px rgba(11, 21, 36, 0.07);

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
`;

const Photo = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 1rem;
  overflow: hidden;
  background: color-mix(in srgb, var(--lp-sky) 14%, #e8eef6);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 780px) {
    max-width: 280px;
  }
`;

const PhotoFallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--lp-font-display);
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: color-mix(in srgb, var(--lp-navy) 55%, var(--lp-sky));
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--lp-sky) 18%, #fff),
    color-mix(in srgb, var(--lp-navy) 10%, #e8eef6)
  );
`;

const ProfileMeta = styled.div`
  min-width: 0;
`;

const Name = styled.h3`
  margin: 0 0 0.2rem;
  font-family: var(--lp-font-body);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  color: var(--lp-ink);
  line-height: 1.15;
`;

const Role = styled.p`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--lp-muted);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100%;
`;

const BrandRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: clamp(1rem, 2.2vw, 1.35rem);
`;

const BrandMark = styled.span`
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 0.45rem;
  display: grid;
  place-items: center;
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--lp-navy);
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--lp-gold) 70%, #fff),
    color-mix(in srgb, var(--lp-sky) 35%, var(--lp-gold))
  );
`;

const BrandName = styled.span`
  font-family: var(--lp-font-body);
  font-weight: 700;
  font-size: 0.98rem;
  color: var(--lp-ink);
`;

const Quote = styled.blockquote`
  margin: 0;
  font-family: var(--lp-font-display);
  font-size: clamp(1.55rem, 3.1vw, 2.15rem);
  font-weight: 600;
  font-style: italic;
  letter-spacing: -0.03em;
  line-height: 1.18;
  color: var(--lp-ink);
  max-width: 28ch;
`;

const Divider = styled.hr`
  width: 100%;
  margin: clamp(1.35rem, 3vw, 1.85rem) 0;
  border: 0;
  border-top: 1px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  margin-bottom: clamp(1.25rem, 2.5vw, 1.75rem);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  min-width: 0;
`;

const StatValue = styled.div`
  font-family: var(--lp-font-body);
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 2.65rem);
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--lp-ink);
  margin-bottom: 0.45rem;

  strong {
    font: inherit;
  }
`;

const StatLabel = styled.p`
  margin: 0 0 0.15rem;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--lp-ink);
  line-height: 1.25;
`;

const StatHint = styled.p`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  color: var(--lp-muted);
  line-height: 1.35;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Progress = styled.p`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lp-muted);
`;

const Nav = styled.div`
  display: inline-flex;
  gap: 0.55rem;
`;

const NavBtn = styled.button`
  width: 2.55rem;
  height: 2.55rem;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: color-mix(in srgb, var(--lp-ink) 72%, transparent);
  background: color-mix(in srgb, var(--lp-navy) 6%, #f2f4f7);
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover:not(:disabled) {
    background: color-mix(in srgb, var(--lp-navy) 12%, #eef1f5);
    color: var(--lp-ink);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-sky);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const slideVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 36 : -36,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -28 : 28,
  }),
};

const wrapIndex = (value, length) => {
  if (length <= 0) return 0;
  return ((value % length) + length) % length;
};

const initialsFrom = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || '?';

const DEFAULT_STATS = Object.freeze([
  { value: '98%', label: 'Family satisfaction', hint: 'Latest campus survey' },
  { value: '12+', label: 'Years of partnership', hint: 'Across the community' },
]);

const normalizeSlide = (member, brandTitle) => {
  if (!member) return null;

  return {
    name: member.name || 'Team member',
    role: member.role || '',
    photo: member.photo || '',
    quote:
      member.quote ||
      'We keep teaching human — curious, kind, and ambitious — so every learner feels seen.',
    org: member.org || brandTitle || 'Our campus',
    stats:
      Array.isArray(member.stats) && member.stats.length
        ? member.stats.slice(0, 2)
        : DEFAULT_STATS,
  };
};

const MemberPhoto = ({ src, name }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showFallback = !src || failed;

  return (
    <Photo>
      {!showFallback ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <PhotoFallback aria-hidden>{initialsFrom(name)}</PhotoFallback>
      )}
    </Photo>
  );
};

const renderEmphasized = (text, italicWord) => {
  if (!italicWord || !text?.includes(italicWord)) return text;
  const [before, after] = text.split(italicWord);
  return (
    <>
      {before}
      <em>{italicWord}</em>
      {after}
    </>
  );
};

const TeamSection = ({ team, brandTitle, brandMark }) => {
  const slides = useMemo(
    () =>
      (team?.members || [])
        .map((member) => normalizeSlide(member, brandTitle))
        .filter(Boolean),
    [team?.members, brandTitle]
  );

  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reducedMotion = useReducedMotion();
  const stageRef = useRef(null);

  const safeIndex = wrapIndex(index, count);
  const slide = slides[safeIndex];

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  const goTo = useCallback(
    (next, dir) => {
      if (count < 2) return;
      setDirection(dir);
      setIndex(wrapIndex(next, count));
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(safeIndex - 1, -1), [goTo, safeIndex]);
  const goNext = useCallback(() => goTo(safeIndex + 1, 1), [goTo, safeIndex]);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0, -1);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(count - 1, 1);
      }
    },
    [count, goNext, goPrev, goTo]
  );

  if (!slide) return null;

  const markLetter =
    (brandMark && String(brandMark).trim().charAt(0)) ||
    (slide.org && String(slide.org).trim().charAt(0)) ||
    'G';

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: easeOut };

  return (
    <Section id="collaborate" aria-labelledby="collaborate-title">
      <Inner>
        <Reveal>
          <Intro>
            <Title id="collaborate-title">
              {renderEmphasized(team.headline, team.headlineItalic)}
            </Title>
            <Body>
              {team.bodyBefore}
              {team.bodyEmph ? <em> {team.bodyEmph} </em> : null}
              {team.bodyAfter}
            </Body>
          </Intro>
        </Reveal>

        <Reveal delay={0.08}>
          <Stage
            ref={stageRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Campus mentors"
            onKeyDown={onKeyDown}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <Card
                key={slide.name + safeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                aria-live="polite"
                aria-atomic="true"
              >
                <Profile>
                  <MemberPhoto src={slide.photo} name={slide.name} />
                  <ProfileMeta>
                    <Name>{slide.name}</Name>
                    {slide.role ? <Role>{slide.role}</Role> : null}
                  </ProfileMeta>
                </Profile>

                <Content>
                  <BrandRow>
                    <BrandMark aria-hidden>{markLetter}</BrandMark>
                    <BrandName>{slide.org}</BrandName>
                  </BrandRow>

                  <Quote>“{slide.quote}”</Quote>

                  <Divider />

                  <Stats>
                    {slide.stats.map((stat) => (
                      <Stat key={`${slide.name}-${stat.label}`}>
                        <StatValue>
                          <CountUp
                            key={`${safeIndex}-${stat.label}-${stat.value}`}
                            value={stat.value}
                            duration={1100}
                          />
                        </StatValue>
                        <StatLabel>{stat.label}</StatLabel>
                        {stat.hint ? <StatHint>{stat.hint}</StatHint> : null}
                      </Stat>
                    ))}
                  </Stats>

                  <Footer>
                    <Progress aria-hidden={count < 2}>
                      {count > 1
                        ? `${String(safeIndex + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
                        : null}
                    </Progress>
                    <Nav>
                      <NavBtn
                        type="button"
                        aria-label="Previous mentor"
                        onClick={goPrev}
                        disabled={count < 2}
                      >
                        <Fi.FiChevronLeft size={18} aria-hidden />
                      </NavBtn>
                      <NavBtn
                        type="button"
                        aria-label="Next mentor"
                        onClick={goNext}
                        disabled={count < 2}
                      >
                        <Fi.FiChevronRight size={18} aria-hidden />
                      </NavBtn>
                    </Nav>
                  </Footer>
                </Content>
              </Card>
            </AnimatePresence>
          </Stage>
        </Reveal>
      </Inner>
    </Section>
  );
};

export default TeamSection;
