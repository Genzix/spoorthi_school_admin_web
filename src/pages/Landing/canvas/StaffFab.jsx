import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { schoolAwarePath } from '@/schools/resolveSchool';
import { useAuthSession } from '@/auth/session';

/**
 * Theme-driven pill CTA — navy gradient for guests (high contrast on any section),
 * gold fill when signed in so state is obvious at a glance.
 */
const Fab = styled(motion(Link))`
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1.15rem, env(safe-area-inset-bottom));
  z-index: 61;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.65rem;
  padding: 0.35rem 1rem 0.35rem 0.35rem;
  border-radius: 999px;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;

  background: ${(p) =>
    p.$dark
      ? p.$authed
        ? '#f59e0b'
        : 'rgba(11, 23, 42, 0.82)'
      : p.$authed
      ? 'var(--lp-art-coral, var(--lp-gold))'
      : `linear-gradient(
          145deg,
          var(--lp-art-ink, var(--lp-navy)) 0%,
          color-mix(in srgb, var(--lp-art-ink, var(--lp-navy)) 76%, var(--lp-art-coral, var(--lp-sky))) 100%
        )`};
  color: ${(p) =>
    p.$dark
      ? p.$authed
        ? '#0b172a'
        : '#ffffff'
      : p.$authed
      ? 'var(--lp-art-ink, var(--lp-navy))'
      : '#fff'};
  border: 1px solid
    ${(p) =>
    p.$dark
      ? 'rgba(255, 255, 255, 0.22)'
      : p.$authed
      ? 'color-mix(in srgb, var(--lp-art-coral, var(--lp-gold)) 55%, var(--lp-art-ink, var(--lp-navy)))'
      : 'color-mix(in srgb, var(--lp-art-coral, var(--lp-gold)) 32%, transparent)'};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: ${(p) =>
    p.$dark
      ? '0 12px 32px rgba(0, 0, 0, 0.42)'
      : p.$authed
      ? '0 10px 26px color-mix(in srgb, var(--lp-art-coral, var(--lp-gold)) 38%, transparent)'
      : '0 12px 30px color-mix(in srgb, var(--lp-art-ink, var(--lp-navy)) 48%, transparent)'};

  transition:
    transform 0.2s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    box-shadow 0.2s ease,
    filter 0.2s ease,
    border-color 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      120deg,
      color-mix(in srgb, #fff 16%, transparent) 0%,
      transparent 42%
    );
    opacity: ${(p) => (p.$authed ? 0.35 : 0.22)};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(${({ $authed }) => ($authed ? 1.05 : 1.08)});
    border-color: color-mix(in srgb, var(--lp-gold) 58%, transparent);
    box-shadow: ${(p) =>
    p.$authed
      ? '0 14px 32px color-mix(in srgb, var(--lp-gold) 45%, transparent)'
      : '0 16px 36px color-mix(in srgb, var(--lp-navy) 55%, transparent)'};
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 3px;
  }

  @media (max-width: 380px) {
    padding-right: 0.8rem;
    gap: 0.45rem;
  }
`;

/** White ring keeps the school mark readable on both navy and gold fills. */
const MarkWrap = styled.span`
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--lp-navy) 12%, transparent);
  overflow: hidden;
`;

const Mark = styled.img`
  width: 78%;
  height: 78%;
  object-fit: contain;
`;

const FallbackMark = styled.span`
  font-family: var(--lp-font-display);
  font-style: italic;
  font-size: 1rem;
  font-weight: 700;
  color: var(--lp-navy);
  line-height: 1;
`;

const Label = styled.span`
  position: relative;
  z-index: 1;
  flex: 0 1 auto;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  font-weight: 750;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: inherit;
`;

const StaffFab = ({ brand, variant = 'brand' }) => {
  const isDark = variant === 'dark';
  const authed = useAuthSession();

  const { href, label } = useMemo(
    () => ({
      href: schoolAwarePath(authed ? '/dashboard' : '/login'),
      label: authed ? 'Dashboard' : 'Login',
    }),
    [authed]
  );

  const markLetter = (brand?.title || 'S').charAt(0).toUpperCase();

  return (
    <Fab
      to={href}
      $authed={authed}
      $dark={isDark}
      title={authed ? 'Open dashboard' : 'Staff login'}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <MarkWrap aria-hidden>
        {brand?.mark ? (
          <Mark src={brand.mark} alt="" />
        ) : (
          <FallbackMark>{markLetter}</FallbackMark>
        )}
      </MarkWrap>
      <Label>{label}</Label>
    </Fab>
  );
};

export default StaffFab;
