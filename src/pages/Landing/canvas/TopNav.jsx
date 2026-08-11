import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks';

const Shell = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 70;
  display: flex;
  justify-content: center;
  padding:
    max(0.75rem, env(safe-area-inset-top))
    max(0.75rem, env(safe-area-inset-right))
    0
    max(0.75rem, env(safe-area-inset-left));
  pointer-events: none;
`;

const Bar = styled(motion.nav)`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 3.15rem;
  padding-block: 0.35rem;
  border-radius: 999px;
  border: 1px solid transparent;
  backdrop-filter: blur(18px) saturate(1.25);
  -webkit-backdrop-filter: blur(18px) saturate(1.25);
  overflow-x: auto;
  scrollbar-width: none;
  will-change: width, background-color, box-shadow, border-color, color;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Brand = styled.a`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0;
  padding: 0.35rem 0.7rem 0.35rem 0.55rem;
  text-decoration: none;
  border-radius: 999px;
  color: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: color-mix(in srgb, currentColor 8%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 2px;
  }

  span {
    font-family: var(--lp-font-display);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.03em;
    line-height: 1;
    white-space: nowrap;
  }

  @media (max-width: 520px) {
    span {
      display: none;
    }
  }
`;

const BrandMark = styled(motion.img)`
  flex: 0 0 auto;
  height: 1.7rem;
  border-radius: 999px;
  object-fit: cover;
  background: #fff;
  overflow: hidden;
  transform-origin: left center;
  will-change: width, opacity, transform, margin-right;
  pointer-events: none;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.05rem;
  margin-left: auto;
  min-width: 0;
`;

const Item = styled.a`
  position: relative;
  flex: 0 0 auto;
  padding: 0.5rem 0.8rem;
  font-family: var(--lp-font-body);
  font-size: 0.8rem;
  font-weight: 650;
  color: inherit;
  opacity: ${(p) => (p.$active ? 1 : 0.72)};
  text-decoration: none;
  border-radius: 999px;
  transition: opacity 0.2s ease;
  white-space: nowrap;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 2px;
  }
`;

const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  z-index: -1;
  background: ${(p) =>
    p.$onHero
      ? 'color-mix(in srgb, #fff 18%, transparent)'
      : 'color-mix(in srgb, var(--lp-sky) 34%, #fff)'};
`;

const Cta = styled.a`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.35rem;
  padding: 0.45rem 0.95rem;
  margin-left: 0.15rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 750;
  text-decoration: none;
  white-space: nowrap;
  background: var(--lp-gold);
  color: var(--lp-navy);
  transition: transform 0.25s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`;

/**
 * Top floating nav: compact over the hero, then smoothly widens + solidifies
 * as the user scrolls. Width/background are continuous (not binary toggles).
 */
const TopNav = ({
  items = [],
  activeId,
  onNavigate,
  brandTitle,
  brandMark,
  cta,
}) => {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const [onHero, setOnHero] = useState(true);

  // Smooth the scroll signal so width expansion feels premium, not jittery.
  const smoothY = useSpring(scrollY, {
    stiffness: reduced ? 1000 : 170,
    damping: reduced ? 80 : 30,
    mass: 0.32,
  });

  // 0 → compact pill; 1 → near-full content width
  const expand = useTransform(smoothY, [0, 120, 260], [0, 0.5, 1], {
    clamp: true,
  });

  const width = useTransform(
    expand,
    [0, 1],
    ['min(620px, calc(100vw - 1.5rem))', 'min(1320px, calc(100vw - 1.5rem))']
  );

  const padX = useTransform(expand, [0, 1], [0.45, 0.75]);
  const paddingInline = useMotionTemplate`${padX}rem`;

  // Morph glass: dark translucent → frosted white
  const r = useTransform(expand, [0, 1], [8, 255]);
  const g = useTransform(expand, [0, 1], [16, 255]);
  const b = useTransform(expand, [0, 1], [32, 255]);
  const a = useTransform(expand, [0, 1], [0.34, 0.92]);
  const backgroundColor = useMotionTemplate`rgba(${r}, ${g}, ${b}, ${a})`;

  const borderA = useTransform(expand, [0, 1], [0.28, 0.1]);
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderA})`;

  const shadowA = useTransform(expand, [0, 1], [0.12, 0.14]);
  const boxShadow = useMotionTemplate`0 16px 42px rgba(11, 21, 36, ${shadowA})`;

  // Light text on hero → ink after expansion
  const color = useTransform(
    expand,
    [0, 0.55, 1],
    ['rgba(255,255,255,0.96)', 'rgba(255,255,255,0.96)', 'rgb(11, 21, 36)']
  );

  // Icon stays fully collapsed at the top, then unfurls with the expand pass.
  // Width + margin collapse so the brand text doesn't jump sideways.
  const markReveal = useTransform(expand, [0.08, 0.42], [0, 1], {
    clamp: true,
  });
  const markWidth = useTransform(markReveal, [0, 1], [0, 27.2]);
  const markMargin = useTransform(markReveal, [0, 1], [0, 8.8]);
  const markOpacity = useTransform(markReveal, [0, 0.35, 1], [0, 0.55, 1]);
  const markScale = useTransform(markReveal, [0, 1], [0.62, 1]);
  const markWidthPx = useMotionTemplate`${markWidth}px`;
  const markMarginPx = useMotionTemplate`${markMargin}px`;

  useMotionValueEvent(expand, 'change', (v) => {
    setOnHero(v < 0.62);
  });

  useEffect(() => {
    setOnHero(window.scrollY < 140);
  }, []);

  if (!items.length) return null;

  return (
    <Shell
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Bar
        aria-label="Primary"
        style={{
          width,
          paddingInline,
          backgroundColor,
          borderColor,
          boxShadow,
          color,
        }}
      >
        <Brand
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('home');
          }}
        >
          {brandMark ? (
            <BrandMark
              src={brandMark}
              alt=""
              aria-hidden
              style={{
                width: markWidthPx,
                marginRight: markMarginPx,
                opacity: markOpacity,
                scale: markScale,
              }}
            />
          ) : null}
          <span>{brandTitle}</span>
        </Brand>

        <Links>
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <Item
                key={item.id}
                href={`#${item.id}`}
                $active={active}
                aria-current={active ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(item.id);
                }}
              >
                {active ? (
                  <ActivePill
                    $onHero={onHero}
                    layoutId="top-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.label}
              </Item>
            );
          })}
        </Links>

        {cta?.href ? (
          <Cta
            href={cta.href}
            onClick={(e) => {
              if (cta.href?.startsWith('#')) {
                e.preventDefault();
                onNavigate?.(cta.href.slice(1));
              }
            }}
          >
            {cta.label || 'Apply'}
          </Cta>
        ) : null}
      </Bar>
    </Shell>
  );
};

export default TopNav;
