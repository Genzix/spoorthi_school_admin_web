import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Dock = styled(motion.nav)`
  position: fixed;
  left: 50%;
  bottom: max(1.1rem, env(safe-area-inset-bottom));
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.38rem 0.48rem;
  background: color-mix(in srgb, #fff 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
  border-radius: 999px;
  backdrop-filter: blur(16px) saturate(1.2);
  box-shadow: 0 14px 36px rgba(11, 21, 36, 0.12);
  max-width: calc(100vw - 1.5rem);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.a`
  position: relative;
  flex: 0 0 auto;
  padding: 0.55rem 0.85rem;
  font-family: var(--lp-font-body);
  font-size: 0.8rem;
  font-weight: 650;
  color: ${(p) => (p.$active ? 'var(--lp-navy)' : 'var(--lp-muted)')};
  text-decoration: none;
  border-radius: 999px;
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: var(--lp-navy);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-sky);
    outline-offset: 2px;
  }
`;

const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--lp-sky) 34%, #fff);
  border-radius: 999px;
  z-index: -1;
`;

/**
 * Bottom floating pill nav — mirrors the holi-style section dock.
 */
const FloatingNav = ({ items = [], activeId, onNavigate }) => {
  if (!items.length) return null;

  return (
    <Dock
      aria-label="Section navigation"
      initial={{ x: '-50%', y: 28, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
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
                layoutId="floating-nav-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            {item.label}
          </Item>
        );
      })}
    </Dock>
  );
};

export default FloatingNav;
