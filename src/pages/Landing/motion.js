export const easeOut = [0.22, 1, 0.36, 1];
export const easeSoft = [0.16, 1, 0.3, 1];
export const springSoft = { type: 'spring', stiffness: 120, damping: 22 };

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSoft },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Continuous Ken Burns–style drift for full-bleed media. */
export const kenBurns = (reduced) =>
  reduced
    ? undefined
    : {
        scale: [1, 1.08, 1.03],
        x: ['0%', '-1.5%', '-0.5%'],
        y: ['0%', '-1%', '0%'],
        transition: {
          duration: 22,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        },
      };

/** Gentle float for secondary decorative elements. */
export const gentleFloat = (delay = 0, amplitude = 10) => ({
  y: [0, -amplitude, 0],
  transition: {
    duration: 5.5,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
});
