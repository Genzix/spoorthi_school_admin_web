import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from './motion';

/**
 * Scroll-triggered reveal. Keeps motion intentional and section-scoped.
 */
const Reveal = ({
  children,
  variants = fadeUp,
  as = 'div',
  once = true,
  amount = 0.22,
  delay = 0,
  style,
  className,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
