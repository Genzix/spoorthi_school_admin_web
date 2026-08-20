import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import * as Fi from 'react-icons/fi';
import { PLATFORM_FEATURES } from '@/schools/platformFeatures';
import Reveal from '../Reveal';
import CountUp from '../CountUp';
import { fadeUp, stagger } from '../motion';

const FALLBACK_ICONS = [
  'FiLayout',
  'FiUsers',
  'FiBookOpen',
  'FiCalendar',
  'FiCreditCard',
  'FiBarChart2',
  'FiSettings',
  'FiCpu',
];

const resolveIcon = (name) => Fi[name] || Fi.FiStar;

const normalizeTag = (tag, index) => {
  if (typeof tag === 'string') {
    return {
      id: `${tag}-${index}`,
      label: tag,
      icon: FALLBACK_ICONS[index % FALLBACK_ICONS.length],
    };
  }
  const label = String(tag?.label || '').trim();
  if (!label) return null;
  return {
    id: `${label}-${index}`,
    label,
    icon: tag.icon || FALLBACK_ICONS[index % FALLBACK_ICONS.length],
  };
};

/**
 * Prefer CMS tags → platform features.
 * Dedupes by label so marquee loops never stutter on repeats.
 */
const resolveTags = (about) => {
  const source = about?.tags?.length ? about.tags : PLATFORM_FEATURES;

  const seen = new Set();
  return source
    .map(normalizeTag)
    .filter(Boolean)
    .filter((tag) => {
      const key = tag.label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

/** Repeat until a row is wide enough for a seamless -50% loop. */
const padForMarquee = (items, min = 8) => {
  if (!items.length) return items;
  const out = [...items];
  while (out.length < min) out.push(...items);
  return out;
};

/** Interleave into two rows so every feature is visible without a huge single loop. */
const splitFeatureRows = (tags) => {
  const first = [];
  const second = [];
  tags.forEach((tag, i) => {
    (i % 2 === 0 ? first : second).push(tag);
  });
  return {
    first: padForMarquee(first, 8),
    second: padForMarquee(second.length ? second : first, 8),
  };
};

/** Keep visual speed stable as labels get longer. */
const loopDuration = (items, pxPerSec = 44) => {
  const width = items.reduce(
    (sum, tag) => sum + Math.max(168, tag.label.length * 8.4 + 76),
    0
  );
  return Math.max(26, Math.round(width / pxPerSec));
};

const marquee = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

const Section = styled.section`
  position: relative;
  padding: clamp(4.5rem, 10vw, 7.5rem) 0 clamp(3.5rem, 7vw, 5.5rem);
  overflow: hidden;
  background: #fff;
`;

const Inner = styled.div`
  position: relative;
  width: min(1320px, calc(100% - 2.5rem));
  margin-inline: auto;
`;

const Intro = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 46rem;
  margin-inline: auto;
`;

const Badge = styled(motion.p)`
  margin: 0 0 1.35rem;
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-ink) 12%, transparent);
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: color-mix(in srgb, var(--lp-ink) 72%, var(--lp-muted));
`;

const Headline = styled(motion.h2)`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(2.55rem, 6.2vw, 4.65rem);
  letter-spacing: -0.045em;
  line-height: 0.96;
  color: var(--lp-ink);
  margin: 0 0 1.15rem;
  white-space: pre-line;
  text-wrap: balance;
`;

const Body = styled(motion.p)`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: clamp(0.98rem, 1.5vw, 1.12rem);
  line-height: 1.65;
  color: color-mix(in srgb, var(--lp-muted) 88%, var(--lp-ink));
  max-width: 40rem;
  white-space: pre-line;
  text-wrap: pretty;
`;

const MarqueeStack = styled.div`
  position: relative;
  isolation: isolate;
  margin-top: clamp(2.4rem, 5vw, 3.4rem);
  display: grid;
  gap: 0.75rem;
  width: 100%;
`;

/**
 * Progressive edge blur: stronger blur is masked closer to the outer
 * edge so pills soften optically instead of clipping or only fading.
 * Backdrop-filter samples the pills underneath — do not also mask the
 * viewport or there is nothing left to blur.
 */
const EDGE_BLUR_LAYERS = [
  { blur: 1, inner: 100 },
  { blur: 2, inner: 82 },
  { blur: 5, inner: 64 },
  { blur: 10, inner: 46 },
  { blur: 18, inner: 30 },
  { blur: 32, inner: 16 },
];

const EdgeWrap = styled.div`
  position: absolute;
  top: -6px;
  bottom: -6px;
  width: clamp(5.75rem, 16vw, 11.5rem);
  z-index: 2;
  pointer-events: none;
  ${(p) => (p.$side === 'left' ? 'left: 0;' : 'right: 0;')}
`;

const EdgeLayer = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(255 255 255 / 0.02);
  backdrop-filter: blur(${(p) => p.$blur}px) saturate(1.05);
  -webkit-backdrop-filter: blur(${(p) => p.$blur}px) saturate(1.05);
  mask-image: linear-gradient(
    ${(p) => (p.$side === 'left' ? 'to right' : 'to left')},
    #000 0%,
    transparent ${(p) => p.$inner}%
  );
  -webkit-mask-image: linear-gradient(
    ${(p) => (p.$side === 'left' ? 'to right' : 'to left')},
    #000 0%,
    transparent ${(p) => p.$inner}%
  );
  transform: translateZ(0);
`;

const EdgeWash = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    ${(p) => (p.$side === 'left' ? 'to right' : 'to left')},
    #fff 0%,
    rgb(255 255 255 / 0.82) 22%,
    rgb(255 255 255 / 0.38) 58%,
    transparent 100%
  );
`;

const EdgeBlur = ({ side }) => (
  <EdgeWrap $side={side} aria-hidden>
    {EDGE_BLUR_LAYERS.map((layer) => (
      <EdgeLayer
        key={layer.blur}
        $side={side}
        $blur={layer.blur}
        $inner={layer.inner}
      />
    ))}
    <EdgeWash $side={side} />
  </EdgeWrap>
);

const MarqueeViewport = styled.div`
  overflow: hidden;
  width: 100%;

  &:hover [data-track] {
    animation-play-state: paused;
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} ${(p) => p.$duration || 32}s linear infinite;
  animation-direction: ${(p) => (p.$reverse ? 'reverse' : 'normal')};
  animation-play-state: ${(p) => (p.$paused ? 'paused' : 'running')};
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.7rem;
  }
`;

const Group = styled.ul`
  display: flex;
  gap: 0.7rem;
  padding: 0;
  margin: 0;
  list-style: none;
  flex-shrink: 0;
  padding-inline-end: 0.7rem;

  @media (prefers-reduced-motion: reduce) {
    display: contents;
  }
`;

const Pill = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.62rem 1.05rem 0.62rem 0.85rem;
  border-radius: 999px;
  background: #f6f6f6;
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
  color: color-mix(in srgb, var(--lp-ink) 78%, #444);
  white-space: nowrap;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: -0.01em;

  svg {
    width: 1.05rem;
    height: 1.05rem;
    flex-shrink: 0;
    opacity: 0.78;
  }
`;

const StaticPills = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PILLAR_TONES = {
  mission: {
    accent: '#2f6fed',
    soft: '#eaf1ff',
    softStrong: '#d9e7ff',
    iconBg: 'linear-gradient(145deg, #3b82f6, #2563eb)',
  },
  vision: {
    accent: '#7c3aed',
    soft: '#f3eaff',
    softStrong: '#e9dbff',
    iconBg: 'linear-gradient(145deg, #8b5cf6, #7c3aed)',
  },
};

const STAT_TONES = [
  { bg: '#e8f0ff', fg: '#2f6fed' },
  { bg: '#e9f8ef', fg: '#16a34a' },
  { bg: '#fff4e5', fg: '#d97706' },
  { bg: '#f3eaff', fg: '#7c3aed' },
];

const MissionVisionBlock = styled(motion.div)`
  margin-top: clamp(3.5rem, 7vw, 5rem);
  padding: clamp(1.85rem, 3.8vw, 2.75rem) clamp(1rem, 2.2vw, 1.5rem)
    clamp(1.35rem, 2.8vw, 1.85rem);
  border-radius: 1.6rem;
  background:
    radial-gradient(
      120% 80% at 10% 0%,
      color-mix(in srgb, #2f6fed 8%, transparent),
      transparent 55%
    ),
    radial-gradient(
      100% 70% at 100% 10%,
      color-mix(in srgb, #7c3aed 7%, transparent),
      transparent 50%
    ),
    linear-gradient(180deg, #f7f9fc 0%, #ffffff 72%);
`;

const MvIntro = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 42rem;
  margin: 0 auto clamp(2rem, 4vw, 2.75rem);
`;

const MvBadge = styled(motion.p)`
  margin: 0 0 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  background: #eaf1ff;
  border: 1px solid color-mix(in srgb, #2f6fed 18%, transparent);
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2f6fed;

  svg {
    width: 0.9rem;
    height: 0.9rem;
    flex-shrink: 0;
  }
`;

const MvHeadline = styled(motion.h3)`
  margin: 0 0 0.85rem;
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.2vw, 3rem);
  letter-spacing: -0.035em;
  line-height: 1;
  color: var(--lp-navy, #0b1f3a);
`;

const MvSubhead = styled(motion.p)`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.65;
  color: var(--lp-muted);
  max-width: 38rem;
`;

const StoryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: clamp(1.25rem, 2.8vw, 1.85rem);
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const MissionStack = styled.div`
  display: grid;
  gap: 1.1rem;
  align-content: start;
`;

const PillarCard = styled(motion.article)`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(1.35rem, 2.6vw, 1.7rem);
  border-radius: 1.35rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy, #0b1f3a) 7%, transparent);
  box-shadow: 0 14px 36px rgba(11, 31, 58, 0.06);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 48px rgba(11, 31, 58, 0.1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const PillarIndex = styled.span`
  position: absolute;
  top: 0.7rem;
  right: 1rem;
  z-index: 0;
  font-family: var(--lp-font-display);
  font-size: clamp(3.4rem, 6vw, 4.4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: color-mix(in srgb, var(--lp-navy, #0b1f3a) 7%, transparent);
  pointer-events: none;
  user-select: none;
`;

const PillarIcon = styled.div`
  position: relative;
  z-index: 1;
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 0.9rem;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  background: ${(p) => p.$bg};
  color: #fff;
  font-size: 1.2rem;
  box-shadow: 0 10px 22px color-mix(in srgb, ${(p) => p.$accent} 28%, transparent);
`;

const PillarLabel = styled.p`
  position: relative;
  z-index: 1;
  margin: 0 0 0.35rem;
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => p.$accent};
`;

const PillarTitle = styled.h4`
  position: relative;
  z-index: 1;
  margin: 0 0 0.55rem;
  font-family: var(--lp-font-display);
  font-size: clamp(1.35rem, 2.2vw, 1.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--lp-navy, #0b1f3a);
`;

const PillarBody = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--lp-muted);
`;

const PillarTags = styled.ul`
  position: relative;
  z-index: 1;
  list-style: none;
  margin: 1.15rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PillarTag = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.75rem;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$accent};
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;

  svg {
    width: 0.9rem;
    height: 0.9rem;
    flex-shrink: 0;
  }
`;

const MediaCard = styled(motion.div)`
  position: relative;
  min-height: 100%;
  border-radius: 1.45rem;
  overflow: hidden;
  background: #e8edf5;
  box-shadow: 0 18px 44px rgba(11, 31, 58, 0.12);

  @media (max-width: 960px) {
    min-height: 360px;
    aspect-ratio: 4 / 3;
  }

  @media (max-width: 560px) {
    min-height: 300px;
    aspect-ratio: 5 / 4;
  }
`;

const MediaImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1.02);
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);

  ${MediaCard}:hover & {
    transform: scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none !important;
  }
`;

const StatsPanel = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: clamp(1.5rem, 3vw, 2rem);
  padding: 0.35rem;
  border-radius: 1.25rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy, #0b1f3a) 8%, transparent);
  box-shadow: 0 14px 36px rgba(11, 31, 58, 0.06);

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.15rem 1.2rem;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 22%;
    bottom: 22%;
    right: 0;
    width: 1px;
    background: color-mix(in srgb, var(--lp-navy, #0b1f3a) 10%, transparent);
  }

  @media (max-width: 900px) {
    &:nth-child(2n)::after {
      display: none;
    }
  }

  @media (max-width: 520px) {
    &:not(:last-child)::after {
      display: none;
    }

    &:not(:last-child) {
      border-bottom: 1px solid
        color-mix(in srgb, var(--lp-navy, #0b1f3a) 8%, transparent);
    }
  }
`;

const StatIcon = styled.span`
  width: 2.55rem;
  height: 2.55rem;
  border-radius: 0.8rem;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$fg};
  font-size: 1.15rem;
`;

const StatCopy = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: clamp(1.45rem, 2.4vw, 1.75rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--lp-navy, #0b1f3a);
  }

  span {
    display: block;
    margin-top: 0.28rem;
    font-family: var(--lp-font-body);
    font-size: 0.84rem;
    font-weight: 500;
    color: var(--lp-muted);
  }
`;

const Collab = styled(motion.div)`
  margin-top: clamp(2.25rem, 5vw, 3.2rem);
  padding: clamp(1.35rem, 2.5vw, 1.7rem);
  border-radius: 1.3rem;
  background: #f7f7f7;
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
`;

const CollabLabel = styled.p`
  margin: 0 0 0.6rem;
  font-family: var(--lp-font-body);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lp-muted);
`;

const CollabTitle = styled.h3`
  margin: 0 0 0.7rem;
  font-family: var(--lp-font-display);
  font-size: clamp(1.65rem, 3vw, 2.3rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--lp-ink);

  em {
    font-style: italic;
    font-weight: 600;
  }
`;

const CollabBody = styled.p`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--lp-muted);
  max-width: 58ch;
`;

const CollabPartners = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.15rem;
  margin-top: 1.35rem;
  max-width: 980px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
`;

const CollabPartnerCard = styled.article`
  min-height: 420px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 1.15rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 36px rgba(17, 17, 17, 0.08);
  }

  @media (max-width: 900px) {
    min-height: 400px;
  }

  @media (max-width: 640px) {
    min-height: 360px;
  }
`;

const CollabPartnerImage = styled.div`
  position: relative;
  height: 240px;
  background: #ececec;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 900px) {
    height: 230px;
  }

  @media (max-width: 640px) {
    height: 200px;
  }
`;

const CollabPartnerBadge = styled.span`
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
  backdrop-filter: blur(10px);
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lp-ink);
`;

const CollabPartnerContent = styled.div`
  padding: 1rem 1rem 1.05rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const CollabPartnerMeta = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.8rem;
`;

const CollabPartnerName = styled.h4`
  margin: 0;
  font-family: var(--lp-font-display);
  font-size: 1.28rem;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--lp-ink);
`;

const CollabPartnerType = styled.p`
  margin: 0.25rem 0 0;
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--lp-muted);
`;

const CollabPartnerIcon = styled.span`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.8rem;
  display: grid;
  place-items: center;
  background: #f4f4f4;
  color: var(--lp-ink);
  flex: 0 0 auto;
`;

const CollabPartnerDescription = styled.p`
  margin: 0.8rem 0 0;
  font-family: var(--lp-font-body);
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--lp-muted);
  min-height: 5.2rem;
`;

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

const DEFAULT_MISSION_TAGS = [
  { icon: 'FiBookOpen', label: 'Quality Education' },
  { icon: 'FiTrendingUp', label: 'Personal Growth' },
  { icon: 'FiSend', label: 'Future Ready' },
];

const DEFAULT_VISION_TAGS = [
  { icon: 'FiSearch', label: 'Curiosity' },
  { icon: 'FiHeart', label: 'Compassion' },
  { icon: 'FiShield', label: 'Courage' },
];

/**
 * Normalize mission/vision payloads so CMS partials still render the
 * full pillar card (index, label, headline, tags, accent).
 */
const resolvePillar = (raw, kind) => {
  if (!raw) return null;
  const isMission = kind === 'mission';
  return {
    kind,
    index: isMission ? '01' : '02',
    label: raw.title || (isMission ? 'Our Mission' : 'Our Vision'),
    headline:
      raw.headline ||
      (isMission ? 'Empowering Every Learner' : 'Shaping Tomorrow’s Leaders'),
    body: raw.body || '',
    icon: raw.icon || (isMission ? 'FiCrosshair' : 'FiEye'),
    tags: Array.isArray(raw.tags) && raw.tags.length
      ? raw.tags
      : isMission
        ? DEFAULT_MISSION_TAGS
        : DEFAULT_VISION_TAGS,
    tone: PILLAR_TONES[kind],
  };
};

const normalizePartner = (partner) => {
  if (typeof partner === 'string') {
    return {
      name: partner,
      type: 'Partner Institution',
      description:
        'Working alongside our campus to create stronger student pathways, continuity, and community learning.',
    };
  }

  return {
    type: 'Partner Institution',
    description:
      'Working alongside our campus to create stronger student pathways, continuity, and community learning.',
    ...partner,
  };
};

const TagPills = ({ items }) =>
  items.map((tag, i) => {
    const Icon = resolveIcon(tag.icon);
    return (
      <Pill key={`${tag.id}-${i}`}>
        <Icon aria-hidden />
        {tag.label}
      </Pill>
    );
  });

const MarqueeRow = ({ items, reverse = false, duration = 32, paused = false }) => (
  <MarqueeViewport>
    <Track data-track $reverse={reverse} $duration={duration} $paused={paused}>
      <Group>
        <TagPills items={items} />
      </Group>
      <Group aria-hidden="true">
        <TagPills items={items} />
      </Group>
    </Track>
  </MarqueeViewport>
);

const Pillar = ({ pillar, variants }) => {
  if (!pillar) return null;
  const Icon = resolveIcon(pillar.icon);
  const { tone } = pillar;

  return (
    <PillarCard variants={variants}>
      <PillarIndex aria-hidden>{pillar.index}</PillarIndex>
      <PillarIcon $bg={tone.iconBg} $accent={tone.accent}>
        <Icon aria-hidden />
      </PillarIcon>
      <PillarLabel $accent={tone.accent}>{pillar.label}</PillarLabel>
      <PillarTitle>{pillar.headline}</PillarTitle>
      {pillar.body ? <PillarBody>{pillar.body}</PillarBody> : null}
      {pillar.tags.length ? (
        <PillarTags>
          {pillar.tags.map((tag) => {
            const TagIcon = resolveIcon(tag.icon);
            return (
              <PillarTag
                key={tag.label}
                $bg={tone.soft}
                $accent={tone.accent}
              >
                <TagIcon aria-hidden />
                {tag.label}
              </PillarTag>
            );
          })}
        </PillarTags>
      ) : null}
    </PillarCard>
  );
};

const QuoteSection = ({ about, stats = [], quote, collaboration }) => {
  const reducedMotion = useReducedMotion();
  const tags = useMemo(() => resolveTags(about), [about]);
  const heroStats = stats.slice(0, 4);
  const collaborationPartners = (collaboration?.partners || []).map(normalizePartner);

  const mission = useMemo(
    () => resolvePillar(about?.mission, 'mission'),
    [about?.mission]
  );
  const vision = useMemo(
    () => resolvePillar(about?.vision, 'vision'),
    [about?.vision]
  );
  const mv = about?.missionVision || {};
  const showMissionVision = Boolean(mission || vision || about?.image);

  const rows = useMemo(() => splitFeatureRows(tags), [tags]);
  const rowDurations = useMemo(
    () => ({
      first: loopDuration(rows.first, 46),
      second: loopDuration(rows.second, 38),
    }),
    [rows]
  );

  if (!about && !quote) return null;

  return (
    <Section id="features" aria-labelledby="features-title">
      <Inner>
        <Intro
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Badge variants={fadeUp}>{about?.eyebrow || 'Features'}</Badge>
          <Headline id="features-title" variants={fadeUp}>
            {about?.headline || renderEmphasized(quote?.headline, quote?.headlineItalic)}
          </Headline>
          {about?.body ? <Body variants={fadeUp}>{about.body}</Body> : null}
        </Intro>
      </Inner>

      {tags.length ? (
        <MarqueeStack aria-label="School management features">
          {reducedMotion ? (
            <Inner>
              <StaticPills>
                <TagPills items={tags} />
              </StaticPills>
            </Inner>
          ) : (
            <>
              <MarqueeRow items={rows.first} duration={rowDurations.first} />
              <MarqueeRow
                items={rows.second}
                reverse
                duration={rowDurations.second}
              />
              <EdgeBlur side="left" />
              <EdgeBlur side="right" />
            </>
          )}
        </MarqueeStack>
      ) : null}

      <Inner>
        {showMissionVision ? (
          <MissionVisionBlock>
            <MvIntro
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <MvBadge variants={fadeUp}>
                <Fi.FiStar aria-hidden />
                {mv.eyebrow || 'Who We Are'}
              </MvBadge>
              <MvHeadline variants={fadeUp}>
                {mv.headline || 'Our Mission & Vision'}
              </MvHeadline>
              <MvSubhead variants={fadeUp}>
                {mv.subhead ||
                  'Guided by purpose. Driven by values. Committed to building a better future for every learner.'}
              </MvSubhead>
            </MvIntro>

            <StoryGrid
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <MissionStack>
                <Pillar pillar={mission} variants={fadeUp} />
                <Pillar pillar={vision} variants={fadeUp} />
              </MissionStack>

              {about?.image ? (
                <MediaCard variants={fadeUp}>
                  <MediaImage
                    src={about.image}
                    alt={about.imageAlt || ''}
                    loading="lazy"
                  />
                </MediaCard>
              ) : null}
            </StoryGrid>

            {heroStats.length ? (
              <StatsPanel
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
              >
                {heroStats.map((item, i) => {
                  const tone = STAT_TONES[i % STAT_TONES.length];
                  const Icon = resolveIcon(item.icon || 'FiStar');
                  return (
                    <StatCard key={item.label} variants={fadeUp}>
                      <StatIcon $bg={tone.bg} $fg={tone.fg}>
                        <Icon aria-hidden />
                      </StatIcon>
                      <StatCopy>
                        <CountUp value={item.value} duration={1300 + i * 150} />
                        <span>{item.label}</span>
                      </StatCopy>
                    </StatCard>
                  );
                })}
              </StatsPanel>
            ) : null}
          </MissionVisionBlock>
        ) : null}

        {collaboration ? (
          <Reveal delay={0.08}>
            <Collab
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CollabLabel>Why Families Trust Us</CollabLabel>
              <CollabTitle>
                {renderEmphasized(
                  collaboration.headline,
                  collaboration.headlineItalic
                )}
              </CollabTitle>
              <CollabBody>{collaboration.body}</CollabBody>
              {collaborationPartners.length ? (
                <CollabPartners aria-label="Collaboration partners">
                  {collaborationPartners.map((partner) => (
                    <CollabPartnerCard key={partner.name}>
                      <CollabPartnerImage>
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.imageAlt || partner.name}
                            loading="lazy"
                          />
                        ) : null}
                        <CollabPartnerBadge>
                          <Fi.FiUsers aria-hidden />
                          {partner.badge || 'Collaboration'}
                        </CollabPartnerBadge>
                      </CollabPartnerImage>
                      <CollabPartnerContent>
                        <CollabPartnerMeta>
                          <div>
                            <CollabPartnerName>{partner.name}</CollabPartnerName>
                            <CollabPartnerType>{partner.type}</CollabPartnerType>
                          </div>
                          <CollabPartnerIcon aria-hidden>
                            <Fi.FiArrowUpRight />
                          </CollabPartnerIcon>
                        </CollabPartnerMeta>
                        <CollabPartnerDescription>
                          {partner.description}
                        </CollabPartnerDescription>
                      </CollabPartnerContent>
                    </CollabPartnerCard>
                  ))}
                </CollabPartners>
              ) : null}
            </Collab>
          </Reveal>
        ) : null}
      </Inner>
    </Section>
  );
};

export default QuoteSection;
