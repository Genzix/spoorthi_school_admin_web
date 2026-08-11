import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Parse display values like "2100+", "18+", "1,200" into parts.
 * @param {string|number} raw
 */
export const parseStatValue = (raw) => {
  const text = String(raw ?? '0').trim();
  const match = text.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
  if (!match) {
    return { prefix: '', end: 0, suffix: text, decimals: 0 };
  }
  const [, prefix, num, suffix] = match;
  const cleaned = num.replace(/,/g, '');
  const decimals = cleaned.includes('.') ? cleaned.split('.')[1].length : 0;
  return {
    prefix,
    end: Number(cleaned) || 0,
    suffix,
    decimals,
  };
};

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/**
 * Count from 0 → target when the element enters the viewport.
 * Keeps original suffix (e.g. "+") and respects reduced motion.
 */
const CountUp = ({
  value,
  duration = 1600,
  className,
  as: Tag = 'strong',
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.45 });
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { prefix, end, suffix, decimals } = useMemo(
    () => parseStatValue(value),
    [value]
  );

  const [display, setDisplay] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reducedMotion) {
      setDisplay(end);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const current = end * easeOutCubic(progress);
      setDisplay(current);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(end);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, reducedMotion]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('en-IN');

  return (
    <Tag ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </Tag>
  );
};

export default CountUp;
