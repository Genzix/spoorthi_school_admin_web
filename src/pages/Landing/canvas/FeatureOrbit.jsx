import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import * as Fi from 'react-icons/fi';

const ICONS = Fi;

const ORBIT_SPEED_DEG_PER_SEC = 8;
const FOCUS_ANGLE = -90;
const EASE = [0.22, 1, 0.36, 1];
const PHONE_RATIO = 9 / 19.2;
const PHONE_WIDTH = { base: 310, expanded: 284 };
const ORBIT_GAP = 58;

const Section = styled.section`
  position: relative;
  padding: clamp(3.5rem, 8vw, 6rem) 1.25rem;
  overflow: hidden;
  isolation: isolate;
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
  }

  &::before {
    width: min(52vw, 480px);
    height: min(52vw, 480px);
    top: 8%;
    left: 50%;
    translate: -50% 0;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--lp-sky) 28%, transparent),
      transparent 68%
    );
    transition: left 0.75s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1));
  }

  &[data-expanded='true']::before {
    left: 22%;
  }

  &::after {
    width: min(40vw, 360px);
    height: min(40vw, 360px);
    bottom: 4%;
    right: 8%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--lp-gold) 20%, transparent),
      transparent 70%
    );
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: min(1180px, 100%);
  margin-inline: auto;
  text-align: center;
`;

const Intro = styled.div`
  max-width: 36rem;
  margin: 0 auto clamp(1.75rem, 4vw, 2.5rem);
`;

const Eyebrow = styled.p`
  margin: 0 0 0.7rem;
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lp-gold);
`;

const Title = styled.h2`
  margin: 0 0 0.75rem;
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.2vw, 3.35rem);
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--lp-ink);
`;

const Lead = styled.p`
  margin: 0 auto;
  font-family: var(--lp-font-body);
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--lp-muted);
  max-width: 42ch;
`;

const Experience = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2.75rem);
  align-items: center;
  width: 100%;
  transition: grid-template-columns 0.75s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1));
`;

const VisualStage = styled.div`
  position: relative;
  width: min(100%, 920px);
  min-height: ${(p) => p.$minHeight}px;
  margin-inline: auto;
  justify-self: center;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: min(100%, 100%);
    margin-inline: auto;
    justify-self: center;
  }
`;

const OrbitLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  > button {
    pointer-events: auto;
  }
`;

const OrbitRing = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${(p) => p.$diameter}px;
  height: ${(p) => p.$diameter}px;
  margin-left: ${(p) => -p.$diameter / 2}px;
  margin-top: ${(p) => -p.$diameter / 2}px;
  border-radius: 50%;
  border: 1px dashed color-mix(in srgb, var(--lp-navy) 12%, transparent);
  pointer-events: none;
`;

const OrbitNode = styled(motion.button)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(3.1rem, 5.2vw, 3.85rem);
  height: clamp(3.1rem, 5.2vw, 3.85rem);
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: var(--lp-navy);
  background: color-mix(in srgb, #fff 88%, var(--lp-surface));
  border: 1.5px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);
  box-shadow: 0 12px 28px rgba(11, 31, 58, 0.12);
  z-index: 3;
  -webkit-tap-highlight-color: transparent;
  will-change: transform;

  &[data-active='true'] {
    color: #fff;
    z-index: 7;
    background: linear-gradient(
      145deg,
      var(--lp-navy),
      color-mix(in srgb, var(--lp-navy) 72%, var(--lp-sky))
    );
    border-color: transparent;
    box-shadow:
      0 16px 34px rgba(11, 31, 58, 0.22),
      0 0 0 4px color-mix(in srgb, var(--lp-gold) 35%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 3px;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  span.label {
    position: absolute;
    top: calc(100% + 0.45rem);
    left: 50%;
    translate: -50% 0;
    width: max-content;
    max-width: 7.5rem;
    font-family: var(--lp-font-body);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--lp-muted);
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      color 0.25s ease;
    pointer-events: none;
  }

  &[data-active='true'] span.label,
  &:hover span.label,
  &:focus-visible span.label {
    opacity: 1;
    transform: translateY(0);
  }

  &[data-active='true'] span.label {
    color: var(--lp-navy);
  }

  @media (max-width: 720px) {
    width: 2.75rem;
    height: 2.75rem;

    span.label {
      display: none;
    }
  }
`;

const PhoneAnchor = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 4;
  width: ${(p) => p.$width}px;
  height: ${(p) => p.$height}px;
  margin-left: ${(p) => -p.$width / 2}px;
  margin-top: ${(p) => -p.$height / 2}px;
  flex-shrink: 0;

  @media (max-width: 720px) {
    width: ${(p) => Math.round(p.$width * 0.9)}px;
    height: ${(p) => Math.round(p.$height * 0.9)}px;
    margin-left: ${(p) => Math.round(-p.$width * 0.9) / 2}px;
    margin-top: ${(p) => Math.round(-p.$height * 0.9) / 2}px;
  }
`;

const Phone = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: clamp(1.85rem, 4.2vw, 2.35rem);
  padding: 0.42rem;
  background: linear-gradient(160deg, #2a2d33 0%, #0c0d10 42%, #1a1c21 100%);
  box-shadow:
    0 28px 60px rgba(11, 31, 58, 0.28),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
`;

const SideButton = styled.div`
  position: absolute;
  background: #1a1c21;
  border-radius: 2px;

  &[data-side='silent'] {
    left: -2px;
    top: 14%;
    width: 3px;
    height: 5%;
  }

  &[data-side='vol-up'] {
    left: -2px;
    top: 22%;
    width: 3px;
    height: 7%;
  }

  &[data-side='vol-down'] {
    left: -2px;
    top: 31%;
    width: 3px;
    height: 7%;
  }

  &[data-side='power'] {
    right: -2px;
    top: 26%;
    width: 3px;
    height: 10%;
  }
`;

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: clamp(1.5rem, 3.6vw, 1.95rem);
  overflow: hidden;
  background: #070b14;
  color: #fff;
  isolation: isolate;
`;

const StatusBar = styled.div`
  position: absolute;
  inset: 0 0 auto;
  z-index: 5;
  height: 2.15rem;
  padding: 0.55rem 1rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-family: var(--lp-font-body);
  font-size: 0.62rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  pointer-events: none;

  .right {
    display: flex;
    gap: 0.28rem;
    align-items: center;
  }
`;

const DynamicIsland = styled.div`
  position: absolute;
  top: 0.55rem;
  left: 50%;
  translate: -50% 0;
  z-index: 6;
  width: 28%;
  height: 1.05rem;
  border-radius: 999px;
  background: #050505;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  pointer-events: none;
`;

const ScreenBody = styled.div`
  position: absolute;
  inset: 2.15rem 0 1.35rem;
  overflow: hidden;
`;

const HomeIndicator = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0.35rem;
  translate: -50% 0;
  width: 34%;
  height: 0.28rem;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 55%, transparent);
  z-index: 6;
  pointer-events: none;
`;

const PhoneScroll = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  padding: 0.55rem 0.7rem 1rem;
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, #fff 28%, transparent) transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, #fff 28%, transparent);
    border-radius: 999px;
  }
`;

const AppHeader = styled.div`
  text-align: left;
  margin-bottom: 0.75rem;

  p {
    margin: 0 0 0.15rem;
    font-family: var(--lp-font-body);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #fff 55%, transparent);
  }

  h3 {
    margin: 0;
    font-family: var(--lp-font-display);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
  }
`;

const FeatureTile = styled(motion.button)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.65rem;
  align-items: center;
  width: 100%;
  margin: 0 0 0.55rem;
  padding: 0.7rem 0.75rem;
  border: none;
  border-radius: 0.95rem;
  text-align: left;
  cursor: pointer;
  color: inherit;
  background: color-mix(in srgb, #fff 8%, transparent);
  border: 1px solid color-mix(in srgb, #fff 10%, transparent);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;

  &[data-active='true'] {
    background: color-mix(in srgb, var(--lp-sky) 28%, #0b1524);
    border-color: color-mix(in srgb, var(--lp-sky) 55%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 2px;
  }

  .icon {
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 0.65rem;
    display: grid;
    place-items: center;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--lp-gold) 70%, #fff),
      color-mix(in srgb, var(--lp-sky) 75%, #fff)
    );
    color: var(--lp-navy);
    font-size: 0.95rem;
  }

  .copy strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 0.95rem;
    line-height: 1.05;
    margin-bottom: 0.2rem;
  }

  .copy span {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.68rem;
    line-height: 1.4;
    color: color-mix(in srgb, #fff 62%, transparent);
  }

  .chev {
    color: color-mix(in srgb, #fff 45%, transparent);
    font-size: 0.95rem;
  }
`;

const Hint = styled.p`
  margin: 1.25rem auto 0;
  max-width: 42ch;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  color: var(--lp-muted);
`;

function getPhoneMetrics(expanded) {
  const width = expanded ? PHONE_WIDTH.expanded : PHONE_WIDTH.base;
  const height = Math.round(width / PHONE_RATIO);
  const orbitRadius = Math.max(width, height) / 2 + ORBIT_GAP;
  const stageMinHeight = Math.round(orbitRadius * 2 + 80);
  return { width, height, orbitRadius, stageMinHeight };
}

function resolveIcon(name) {
  return ICONS[name] || ICONS.FiStar;
}

function normalizeFeatures(features = [], gallery = []) {
  return features.map((f, i) => {
    const image = f.image || gallery[i % Math.max(gallery.length, 1)]?.src || '';
    const points = f.points || [
      'Designed into daily campus rhythm',
      'Supported by mentors and families',
      'Measured with care, not noise',
    ];
    return {
      id: f.id || `feature-${i}-${f.title}`,
      title: f.title,
      description: f.description,
      icon: f.icon || 'FiStar',
      image,
      imageAlt: f.imageAlt || gallery[i % Math.max(gallery.length, 1)]?.alt || f.title,
      points,
    };
  });
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function OrbitFeatureNode({
  index,
  total,
  item,
  active,
  rotation,
  radiusPx,
  reduced,
  onSelect,
}) {
  const Icon = resolveIcon(item.icon);
  const baseAngle = (360 / total) * index;

  const x = useTransform(rotation, (r) => {
    const rad = ((baseAngle + r) * Math.PI) / 180;
    return Math.cos(rad) * radiusPx;
  });
  const y = useTransform(rotation, (r) => {
    const rad = ((baseAngle + r) * Math.PI) / 180;
    return Math.sin(rad) * radiusPx;
  });

  const zIndex = useTransform(rotation, (r) => {
    const rad = ((baseAngle + r) * Math.PI) / 180;
    const sinVal = Math.sin(rad);
    if (sinVal < -0.12) return 6;
    if (sinVal > 0.12) return 2;
    return 5;
  });

  const nodeOpacity = useTransform(rotation, (r) => {
    const rad = ((baseAngle + r) * Math.PI) / 180;
    const sinVal = Math.sin(rad);
    if (sinVal > 0.35) return 0.5;
    if (sinVal > 0.12) return 0.72;
    return 1;
  });

  return (
    <OrbitNode
      type="button"
      data-active={active ? 'true' : 'false'}
      aria-pressed={active}
      aria-label={item.title}
      style={{ x, y, zIndex, opacity: nodeOpacity }}
      transformTemplate={({ x: tx, y: ty }) =>
        `translate(-50%, -50%) translate3d(${tx}, ${ty}, 0)`
      }
      onClick={() => onSelect(index)}
      whileHover={reduced ? undefined : { scale: 1.08 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
    >
      <Icon aria-hidden />
      <span className="label">{item.title}</span>
    </OrbitNode>
  );
}

/**
 * About stage: phone + orbit center by default.
 * Selecting a feature slides the phone left and reveals rich content on the right.
 */
const FeatureOrbit = ({
  about,
  features = [],
  services,
  gallery,
}) => {
  const headingId = useId();
  const reduced = useReducedMotion();
  const clock = useClock();
  const stageRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const interactingRef = useRef(false);
  const interactTimer = useRef(0);
  const resetTimer = useRef(0);

  const source =
    features?.length > 0
      ? features
      : services?.items?.length
        ? services.items
        : [];
  const galleryItems = gallery?.items || [];
  const items = normalizeFeatures(source, galleryItems);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const phoneMetrics = getPhoneMetrics(false);
  const { width: phoneWidth, height: phoneHeight, orbitRadius, stageMinHeight } =
    phoneMetrics;

  const rotation = useMotionValue(FOCUS_ANGLE);

  const parkActive = useCallback(
    (index) => {
      const n = items.length || 1;
      const nodeAngle = (360 / n) * index;
      const desired = FOCUS_ANGLE - nodeAngle;
      const current = rotation.get();
      const delta = ((((desired - current) % 360) + 540) % 360) - 180;
      animate(rotation, current + delta, {
        type: 'spring',
        stiffness: reduced ? 220 : 90,
        damping: reduced ? 28 : 18,
        mass: 0.9,
      });
    },
    [items.length, rotation, reduced]
  );

  const markInteract = useCallback(() => {
    interactingRef.current = true;
    window.clearTimeout(interactTimer.current);
    interactTimer.current = window.setTimeout(() => {
      interactingRef.current = false;
    }, 4200);
  }, []);

  useEffect(() => {
    if (!items.length || selectedIndex === null) return undefined;
    parkActive(selectedIndex);
  }, [selectedIndex, items.length, parkActive]);

  useEffect(() => {
    if (reduced || !items.length) return undefined;

    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!interactingRef.current) {
        rotation.set(rotation.get() + ORBIT_SPEED_DEG_PER_SEC * dt);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, items.length, rotation]);

  useEffect(
    () => () => {
      window.clearTimeout(interactTimer.current);
      window.clearTimeout(resetTimer.current);
    },
    []
  );

  const selectFeature = useCallback(
    (index, { fromPhone = false } = {}) => {
      if (!items[index]) return;
      markInteract();
      window.clearTimeout(resetTimer.current);
      setSelectedIndex(index);
      parkActive(index);
      resetTimer.current = window.setTimeout(() => {
        setSelectedIndex(null);
      }, 2600);

      if (fromPhone && listRef.current && rowRefs.current[index]) {
        rowRefs.current[index]?.scrollIntoView({
          block: 'nearest',
          behavior: reduced ? 'auto' : 'smooth',
        });
      }
    },
    [items, reduced, markInteract, parkActive]
  );

  if (!items.length) return null;

  const active = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <Section id="features" aria-labelledby={headingId}>
      <Atmosphere data-expanded="false" aria-hidden />
      <Inner>
        <Intro>
          <Eyebrow>{about?.eyebrow || services?.eyebrow || 'WHO WE ARE'}</Eyebrow>
          <Title id={headingId}>
            {about?.headline || 'Features that shape every school day.'}
          </Title>
          {about?.body ? <Lead>{about.body}</Lead> : null}
        </Intro>

        <Experience>
          <VisualStage
            ref={stageRef}
            $minHeight={stageMinHeight}
            onMouseEnter={markInteract}
            onFocusCapture={markInteract}
            onTouchStart={markInteract}
          >
            <OrbitLayer>
              <OrbitRing
                aria-hidden
                $diameter={orbitRadius * 2}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              />

              {items.map((item, index) => (
                <OrbitFeatureNode
                  key={item.id}
                  index={index}
                  total={items.length}
                  item={item}
                  active={index === selectedIndex}
                  rotation={rotation}
                  radiusPx={orbitRadius}
                  reduced={reduced}
                  onSelect={selectFeature}
                />
              ))}
            </OrbitLayer>

            <PhoneAnchor
              $width={phoneWidth}
              $height={phoneHeight}
              animate={{ x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Phone>
                <SideButton data-side="silent" aria-hidden />
                <SideButton data-side="vol-up" aria-hidden />
                <SideButton data-side="vol-down" aria-hidden />
                <SideButton data-side="power" aria-hidden />

                <Screen>
                  <DynamicIsland aria-hidden />
                  <StatusBar aria-hidden>
                    <span>{clock}</span>
                    <span className="right">
                      <Fi.FiWifi size={11} />
                      <Fi.FiBattery size={13} />
                    </span>
                  </StatusBar>

                  <ScreenBody>
                    <PhoneScroll ref={listRef}>
                      <AppHeader>
                        <p>Campus</p>
                        <h3>Features</h3>
                      </AppHeader>

                      {items.map((item, index) => {
                        const Icon = resolveIcon(item.icon);
                        return (
                          <FeatureTile
                            key={item.id}
                            type="button"
                            data-active={index === selectedIndex ? 'true' : 'false'}
                            ref={(el) => {
                              rowRefs.current[index] = el;
                            }}
                            onClick={() => selectFeature(index, { fromPhone: true })}
                            whileTap={reduced ? undefined : { scale: 0.985 }}
                          >
                            <span className="icon" aria-hidden>
                              <Icon />
                            </span>
                            <span className="copy">
                              <strong>{item.title}</strong>
                              <span>{item.description}</span>
                            </span>
                            <span className="chev" aria-hidden>
                              <Fi.FiChevronRight />
                            </span>
                          </FeatureTile>
                        );
                      })}
                    </PhoneScroll>
                  </ScreenBody>

                  <HomeIndicator aria-hidden />
                </Screen>
              </Phone>
            </PhoneAnchor>
          </VisualStage>
        </Experience>

        <Hint>
          {active?.title
            ? `${active.title} selected. It will return to the starting view automatically.`
            : 'Tap a feature in the phone or an orbit icon to explore it.'}
        </Hint>
      </Inner>
    </Section>
  );
};

export default FeatureOrbit;
