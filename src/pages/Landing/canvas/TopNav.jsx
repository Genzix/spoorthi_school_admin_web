import React from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks';

const navTargetId = (item) => item?.sectionId || item?.id;

const Shell = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 70;
  display: flex;
  justify-content: center;
  padding:
    max(0.85rem, env(safe-area-inset-top))
    max(0.75rem, env(safe-area-inset-right))
    0
    max(0.75rem, env(safe-area-inset-left));
  pointer-events: none;
`;

const Bar = styled(motion.nav)`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 3.2rem;
  padding-block: 0.38rem;
  border-radius: 999px;
  overflow-x: auto;
  scrollbar-width: none;
  will-change: width, padding, box-shadow;

  ${(p) =>
    p.$dark
      ? `
    background: rgba(11, 23, 42, 0.76);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px) saturate(1.2);
    -webkit-backdrop-filter: blur(18px) saturate(1.2);
    color: #ffffff;
    box-shadow: 0 16px 42px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  `
      : `
    background: #fcece2;
    border: 1px solid color-mix(in srgb, var(--lp-art-ink, #3e2c23) 10%, transparent);
    backdrop-filter: blur(12px) saturate(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    color: var(--lp-art-ink, #3e2c23);
    box-shadow:
      0 14px 40px color-mix(in srgb, var(--lp-art-coral, #e07a5a) 18%, transparent),
      inset 0 1px 0 color-mix(in srgb, #fff 40%, transparent);
  `}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Brand = styled.a`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem 0.4rem 0.65rem;
  text-decoration: none;
  border-radius: 999px;
  color: inherit;
  background: transparent;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${(p) =>
      p.$dark ? 'rgba(255, 255, 255, 0.08)' : 'color-mix(in srgb, var(--lp-art-ink, #3e2c23) 6%, transparent)'};
  }

  &:focus-visible {
    outline: 2px solid ${(p) => (p.$dark ? '#f59e0b' : 'var(--lp-art-coral, var(--lp-gold))')};
    outline-offset: 2px;
  }

  span {
    font-family: var(--lp-font-display);
    font-weight: 700;
    font-size: 1.12rem;
    letter-spacing: -0.03em;
    line-height: 1;
    white-space: nowrap;
    color: inherit;
  }

  @media (max-width: 480px) {
    padding-right: 0.55rem;

    span {
      font-size: 1rem;
    }
  }
`;

const BrandMark = styled.img`
  flex: 0 0 auto;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  object-fit: cover;
  background: #fff;
  padding: 1px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.08rem;
  margin-left: auto;
  min-width: 0;
`;

const Item = styled.a`
  position: relative;
  flex: 0 0 auto;
  padding: 0.5rem 0.85rem;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  font-weight: ${(p) => (p.$active ? 700 : 550)};
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;

  ${(p) =>
    p.$dark
      ? `
    color: ${p.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.78)'};
    background: ${p.$active ? 'rgba(255, 255, 255, 0.18)' : 'transparent'};

    &:hover,
    &:focus-visible {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.12);
    }

    &:focus-visible {
      outline: 2px solid #f59e0b;
      outline-offset: 2px;
    }
  `
      : `
    color: ${p.$active ? 'var(--lp-art-ink, #3e2c23)' : 'color-mix(in srgb, var(--lp-art-ink, #3e2c23) 68%, transparent)'};
    background: transparent;

    &:hover,
    &:focus-visible {
      color: var(--lp-art-ink, #3e2c23);
      background: color-mix(in srgb, var(--lp-art-ink, #3e2c23) 6%, transparent);
    }

    &:focus-visible {
      outline: 2px solid var(--lp-art-coral, var(--lp-gold));
      outline-offset: 2px;
    }
  `}
`;

const Cta = styled.a`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  padding: 0.48rem 1.15rem;
  margin-left: 0.35rem;
  margin-right: 0.15rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  font-weight: 750;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.25s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    filter 0.2s ease, box-shadow 0.2s ease;

  ${(p) =>
    p.$dark
      ? `
    background: #f59e0b;
    color: #0b172a;
    box-shadow: 0 4px 18px rgba(245, 158, 11, 0.42);

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.06);
      box-shadow: 0 6px 22px rgba(245, 158, 11, 0.55);
    }

    &:focus-visible {
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }
  `
      : `
    color: var(--lp-navy);
    background: linear-gradient(
      145deg,
      var(--lp-gold) 0%,
      color-mix(in srgb, var(--lp-gold) 82%, #ff9a3d) 100%
    );
    border: 1px solid color-mix(in srgb, var(--lp-gold) 70%, #fff);
    box-shadow: 0 6px 18px color-mix(in srgb, var(--lp-gold) 38%, transparent);

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.04);
      box-shadow: 0 10px 22px color-mix(in srgb, var(--lp-gold) 48%, transparent);
    }

    &:focus-visible {
      outline: 2px solid var(--lp-art-ink, var(--lp-navy));
      outline-offset: 2px;
    }
  `}

  @media (max-width: 720px) {
    display: none;
  }
`;

const TopNav = ({
  items = [],
  activeId,
  onNavigate,
  brandTitle,
  brandMark,
  cta,
  variant = 'peach',
}) => {
  const isDark = variant === 'dark';
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    stiffness: reduced ? 1000 : 170,
    damping: reduced ? 80 : 30,
    mass: 0.32,
  });

  const expand = useTransform(smoothY, [0, 80, 220], [0, 0.45, 1], {
    clamp: true,
  });

  const width = useTransform(
    expand,
    [0, 1],
    ['min(780px, calc(100vw - 1.25rem))', 'min(1320px, calc(100vw - 1.25rem))']
  );

  const padX = useTransform(expand, [0, 1], [0.55, 0.85]);
  const paddingInline = useMotionTemplate`${padX}rem`;

  if (!items.length) return null;

  return (
    <Shell
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Bar
        $dark={isDark}
        aria-label="Primary"
        style={{
          width,
          paddingInline,
        }}
      >
        <Brand
          $dark={isDark}
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('home');
          }}
        >
          {brandMark ? <BrandMark src={brandMark} alt="" aria-hidden /> : null}
          <span>{brandTitle}</span>
        </Brand>

        <Links>
          {items.map((item) => {
            const targetId = navTargetId(item);
            const active = activeId === targetId;
            return (
              <Item
                key={item.id}
                $dark={isDark}
                href={`#${targetId}`}
                $active={active}
                aria-current={active ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(targetId);
                }}
              >
                {item.label}
              </Item>
            );
          })}
        </Links>

        {cta?.href ? (
          <Cta
            $dark={isDark}
            href={cta.href}
            onClick={(e) => {
              if (cta.href?.startsWith('#')) {
                e.preventDefault();
                onNavigate?.(cta.href.slice(1));
              }
            }}
          >
            {cta.label || 'Apply Now'}
          </Cta>
        ) : null}
      </Bar>
    </Shell>
  );
};

export default TopNav;
