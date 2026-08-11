import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Prefer-reduced-motion: disable float/parallax when the OS asks for less motion.
 */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  return reduced;
};

/**
 * Track which section is in view for floating nav active state.
 */
export const useActiveSection = (ids = []) => {
  const [activeId, setActiveId] = useState(ids[0] || '');
  const idKey = ids.join('|');

  useEffect(() => {
    const list = idKey ? idKey.split('|') : [];
    const nodes = list.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-18% 0px -52% 0px',
        threshold: [0.08, 0.22, 0.4],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [idKey]);

  return activeId;
};

/**
 * Keep URL hash in sync with the active section (shareable deep links).
 */
export const useHashSync = (activeId, { enabled = true } = {}) => {
  useEffect(() => {
    if (!enabled || !activeId || typeof window === 'undefined') return;
    const next = `#${activeId}`;
    if (window.location.hash === next) return;
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}${next}`
    );
  }, [activeId, enabled]);
};

/**
 * Pointer parallax for floating canvas elements.
 * Returns a ref callback + {x,y} normalized offsets (-1..1).
 */
export const usePointerParallax = ({ strength = 14, disabled = false } = {}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const onMove = useCallback(
    (event) => {
      if (disabled) return;
      const { clientX, clientY } = event;
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = (clientY / window.innerHeight) * 2 - 1;
      target.current = { x: nx * strength, y: ny * strength };

      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setOffset({ ...target.current });
      });
    },
    [disabled, strength]
  );

  const onLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    []
  );

  return { offset, onMove, onLeave };
};

/**
 * Smooth-scroll to a section id; returns a handler for nav clicks.
 */
export const useSmoothNavigate = () => {
  return useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
};

/**
 * Derive FAQ categories from items for filter chips.
 */
export const useFaqCategories = (items = []) => {
  return useMemo(() => {
    const set = new Set();
    items.forEach((item) => {
      if (item?.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);
};
