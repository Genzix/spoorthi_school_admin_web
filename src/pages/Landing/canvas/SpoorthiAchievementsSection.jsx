import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
} from 'react-icons/fi';

const ORANGE = '#ffb800';
const CREAM = '#fcfbf7';
const INK = '#111111';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const isCutoutPhoto = (src = '') =>
  /\.png$/i.test(src) &&
  /cutout|achiever|nobg|transparent/i.test(src);

const TRACK_META = {
  NEET: {
    label: 'NEET',
    badge: 'NEET Topper',
    exam: 'NEET',
    hint: 'National-level result',
  },
  IIT: {
    label: 'IIT',
    badge: 'IIT Qualifier',
    exam: 'IIT-JEE',
    hint: 'National-level result',
  },
  'CLASS 10': {
    label: 'Class 10',
    badge: 'Class 10 Topper',
    exam: 'Class 10',
    hint: 'Board-level result',
  },
};

const blobOf = (item) =>
  `${item.batch || ''} ${item.exam || ''} ${item.examType || ''} ${item.badge || ''} ${item.subtitle || ''}`.toUpperCase();

const detectBatch = (item) => {
  const blob = blobOf(item);
  if (/\bNEET\b/.test(blob)) return 'NEET';
  if (/\b(IIT|JEE)\b/.test(blob)) return 'IIT';
  if (
    /\b(10TH|CLASS\s*10|CLASS-10|CBSE[-\s]?X|SSC|X CLASS|TENTH)\b/.test(blob)
  ) {
    return 'CLASS 10';
  }
  const named = String(item.batch || '').trim().toUpperCase();
  if (TRACK_META[named]) return named;
  if (named === 'CLASS10' || named === 'X') return 'CLASS 10';
  return 'IIT';
};

/** Lower rank value = stronger result (AIR 89 beats AIR 400; 499/500 beats 481/500). */
const rankValue = (story) => {
  const hay = `${story.score} ${story.exam} ${story.subtitle}`;
  const air = hay.match(/\bAIR\s*(\d+)/i);
  if (air) return Number(air[1]);
  const frac = hay.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
  if (frac) {
    const got = Number(frac[1]);
    const max = Number(frac[2]) || 1;
    return 1 - got / max;
  }
  const gpa = hay.match(/(\d+(?:\.\d+)?)\s*(?:GPA|\/\s*10)/i);
  if (gpa) return 1 - Number(gpa[1]) / 10;
  const pct = hay.match(/(\d+(?:\.\d+)?)\s*%/);
  if (pct) return 1 - Number(pct[1]) / 100;
  const state = hay.match(/\bState Rank\s*(\d+)/i);
  if (state) return Number(state[1]);
  return Number.POSITIVE_INFINITY;
};

const PER_TRACK = 4;

/** Best of IIT, NEET, and Class 10, interleaved so no track is buried. */
const pickBestStories = (items) => {
  const groups = { IIT: [], NEET: [], 'CLASS 10': [] };
  items.forEach((item) => {
    const key = groups[item.track] ? item.track : 'IIT';
    groups[key].push(item);
  });

  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => rankValue(a) - rankValue(b));
    groups[key] = groups[key].slice(0, PER_TRACK);
  });

  const order = ['CLASS 10', 'NEET', 'IIT'];
  const max = Math.max(...order.map((key) => groups[key].length));
  const out = [];
  for (let i = 0; i < max; i += 1) {
    order.forEach((key) => {
      if (groups[key][i]) out.push(groups[key][i]);
    });
  }
  return out.length ? out : items;
};

const normalizeStory = (item, index) => {
  if (!item?.name) return null;
  const batch = detectBatch(item);
  const meta = TRACK_META[batch] || TRACK_META.IIT;
  const cutoutSrc = item.photoCutout || '';
  const fallback = item.photo || '';
  const photo = cutoutSrc || fallback;
  const cutout =
    item.cutout === true ||
    Boolean(cutoutSrc) ||
    isCutoutPhoto(photo);
  return {
    id: item.id || `achievement-${index}`,
    name: item.name,
    score: item.score || item.rank || '',
    exam: item.exam || item.examType || '',
    quote: item.quote || '',
    photo,
    photoFallback: cutoutSrc && fallback && fallback !== photo ? fallback : '',
    cutout,
    subtitle:
      item.subtitle ||
      `Spoorthi Student · ${item.exam || meta.exam}`,
    badge: item.badge || meta.badge,
    tags: item.tags?.length
      ? item.tags
      : [item.score, item.exam].filter(Boolean).slice(0, 3),
    track: batch,
    batch: meta.label,
    hint: item.hint || meta.hint,
  };
};

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(5rem, 10vh, 6.5rem) clamp(1rem, 3vw, 2rem)
    clamp(1.5rem, 4vh, 2.5rem);
  overflow: hidden;
  background: ${CREAM};
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin-inline: auto;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/* ── Stage: photo is the anchor, everything orbits around it ── */
const Stage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: clamp(560px, 82vh, 780px);
  margin-inline: auto;

  @media (max-width: 900px) {
    height: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding-bottom: 0.5rem;
  }
`;

const Float = styled.div`
  position: absolute;
  z-index: 3;

  @media (max-width: 900px) {
    position: relative;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    transform: none !important;
    width: 100%;
    max-width: 28rem;
  }
`;

const HeaderFloat = styled(Float)`
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
  width: min(92vw, 640px);
  z-index: 4;

  @media (max-width: 900px) {
    order: 1;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.38rem 0.9rem;
  border-radius: 999px;
  background: ${INK};
  color: #fff;
  font-family: var(--lp-font-body);
  font-size: 0.76rem;
  font-weight: 600;

  &::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: ${ORANGE};
    flex-shrink: 0;
  }
`;

const StudentName = styled.h2`
  margin: 0;
  font-family: var(--lp-font-display);
  font-size: clamp(2.2rem, 6vw, 4.25rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: ${INK};

  em {
    font-style: normal;
    color: ${ORANGE};
  }
`;

const StudentSub = styled.p`
  margin: 0.6rem 0 0;
  font-family: var(--lp-font-body);
  font-size: clamp(0.9rem, 1.5vw, 1.02rem);
  color: color-mix(in srgb, ${INK} 50%, #888);

  strong {
    color: ${INK};
    font-weight: 700;
  }
`;

const PhotoFloat = styled(Float)`
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: transparent;

  @media (max-width: 900px) {
    order: 2;
  }
`;

const PortraitFigure = styled.figure`
  margin: 0;
  padding: 0;
  line-height: 0;
  background: transparent;
`;

const PortraitImg = styled.img`
  display: block;
  width: clamp(220px, 30vw, 340px);
  height: auto;
  max-height: clamp(300px, 52vh, 560px);
  object-fit: contain;
  object-position: center bottom;
  background: transparent;
  border: none;
  box-shadow: none;
  user-select: none;
  -webkit-user-drag: none;

  /*
   * Transparent PNG cutouts: render as-is.
   * Stock photos: multiply knocks out light studio backdrops on cream.
   */
  mix-blend-mode: ${(p) => (p.$cutout ? 'normal' : 'multiply')};
  filter: ${(p) => (p.$cutout ? 'none' : 'contrast(1.07) saturate(1.05)')};
`;

const PortraitImage = ({ src, fallback, cutout, alt }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isCutout, setIsCutout] = useState(cutout);

  useEffect(() => {
    setCurrentSrc(src);
    setIsCutout(cutout);
  }, [src, cutout]);

  return (
    <PortraitImg
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      $cutout={isCutout}
      onError={() => {
        if (fallback && currentSrc !== fallback) {
          setCurrentSrc(fallback);
          setIsCutout(false);
        }
      }}
    />
  );
};

const LeftTopFloat = styled(Float)`
  left: clamp(0rem, 2vw, 1rem);
  top: clamp(5.5rem, 14vh, 8.5rem);
  max-width: 13rem;

  @media (max-width: 900px) {
    order: 4;
    max-width: none;
  }
`;

const LeftBottomFloat = styled(Float)`
  left: clamp(0rem, 2vw, 1rem);
  bottom: clamp(3.5rem, 8vh, 6rem);
  max-width: 14rem;

  @media (max-width: 900px) {
    order: 5;
    max-width: none;
  }
`;

const RightTopFloat = styled(Float)`
  right: clamp(0rem, 2vw, 1rem);
  top: clamp(4.5rem, 10vh, 6.5rem);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
  max-width: 15rem;

  @media (max-width: 900px) {
    order: 3;
    align-items: flex-start;
    max-width: none;
  }
`;

const RightBottomFloat = styled(Float)`
  right: clamp(0rem, 2vw, 1rem);
  bottom: clamp(4rem, 10vh, 7rem);
  max-width: 16rem;

  @media (max-width: 900px) {
    order: 6;
    max-width: none;
  }
`;

const PeerLabel = styled.p`
  margin: 0 0 0.6rem;
  font-family: var(--lp-font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: color-mix(in srgb, ${INK} 52%, #888);
`;

const PeerRow = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${CREAM};
    margin-left: -0.5rem;
    background: #e8e0d8;
    box-shadow: 0 4px 12px color-mix(in srgb, ${INK} 8%, transparent);

    &:first-child {
      margin-left: 0;
    }
  }
`;

const StatBlock = styled.div`
  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: clamp(1.5rem, 2.8vw, 1.95rem);
    font-weight: 700;
    color: ${ORANGE};
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.4rem;
    flex-wrap: wrap;
  }

  .stars {
    display: inline-flex;
    gap: 0.08rem;
    color: ${ORANGE};

    svg {
      width: 0.82rem;
      height: 0.82rem;
      fill: currentColor;
    }
  }

  .rating {
    font-family: var(--lp-font-body);
    font-size: 0.86rem;
    font-weight: 700;
    color: ${INK};
  }

  .hint {
    display: block;
    margin-top: 0.3rem;
    font-family: var(--lp-font-body);
    font-size: 0.76rem;
    color: color-mix(in srgb, ${INK} 46%, #888);
    line-height: 1.45;
  }
`;

const Stamp = styled.div`
  width: 5.25rem;
  height: 5.25rem;
  position: relative;
  display: grid;
  place-items: center;
  filter: drop-shadow(0 8px 20px color-mix(in srgb, ${INK} 12%, transparent));

  .ring {
    position: absolute;
    inset: 0;
    animation: ${spin} 20s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .star {
    width: 1.25rem;
    height: 1.25rem;
    color: ${ORANGE};
    fill: ${ORANGE};
    z-index: 1;
  }
`;

const QuoteBlock = styled.blockquote`
  margin: 0;
  display: flex;
  gap: 0.35rem;
  align-items: flex-start;
  text-align: right;

  @media (max-width: 900px) {
    text-align: left;
  }

  .mark {
    font-family: var(--lp-font-display);
    font-size: 2.4rem;
    line-height: 0.75;
    color: ${ORANGE};
    flex-shrink: 0;
  }

  p {
    margin: 0.1rem 0 0;
    font-family: var(--lp-font-body);
    font-size: clamp(0.9rem, 1.4vw, 1.02rem);
    font-weight: 500;
    line-height: 1.5;
    color: color-mix(in srgb, ${INK} 75%, #666);
    max-width: 14rem;
  }
`;

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  justify-content: flex-end;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.8rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.76rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 6px 18px color-mix(in srgb, ${INK} 8%, transparent);
  background: ${(p) => (p.$accent ? ORANGE : INK)};
  color: ${(p) => (p.$accent ? INK : '#fff')};
`;

const MoreTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  background: ${ORANGE};
  color: ${INK};
  font-size: 0.72rem;
  font-weight: 800;
  box-shadow: 0 6px 18px color-mix(in srgb, ${INK} 8%, transparent);
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: clamp(1rem, 2.5vh, 1.75rem);
`;

const NavBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 2.65rem;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, ${INK} 16%, transparent);
  background: #fff;
  color: ${INK};
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${INK};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${ORANGE};
    outline-offset: 3px;
  }
`;

const Dots = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.38rem;
  max-width: 16rem;
`;

const Dot = styled.button`
  width: ${(p) => (p.$active ? '1.2rem' : '0.48rem')};
  height: 0.48rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  background: ${(p) =>
    p.$active ? ORANGE : `color-mix(in srgb, ${INK} 20%, transparent)`};
  transition: width 0.25s ease, background 0.25s ease;

  &:focus-visible {
    outline: 2px solid ${ORANGE};
    outline-offset: 3px;
  }
`;

const Counter = styled.span`
  font-family: var(--lp-font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: color-mix(in srgb, ${INK} 48%, #888);
  min-width: 3.25rem;
  text-align: center;
`;

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const StampSvg = () => (
  <svg className="ring" viewBox="0 0 100 100" aria-hidden fill="none">
    <path
      d="M50 4 L54 8 L60 6 L62 12 L68 14 L66 20 L70 26 L64 28 L64 34 L58 36 L56 42 L50 40 L44 42 L42 36 L36 34 L36 28 L30 26 L34 20 L32 14 L38 12 L40 6 L46 8 Z"
      fill={INK}
    />
    <text fill="#fff" fontSize="7.5" fontWeight="700">
      <textPath href="#stamp-circle" startOffset="50%" textAnchor="middle">
        SPOORTHI ACHIEVER • SPOORTHI ACHIEVER •
      </textPath>
    </text>
    <defs>
      <path
        id="stamp-circle"
        d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
      />
    </defs>
  </svg>
);

const StudentStage = ({
  story,
  peers,
  eyebrow,
  ...motionProps
}) => (
  <Stage {...motionProps}>
    <HeaderFloat>
      <Eyebrow>{eyebrow}</Eyebrow>
      <StudentName>
        I&apos;m <em>{story.name}</em>
      </StudentName>
      <StudentSub>
        {story.subtitle.split('·').map((part, i, arr) => (
          <React.Fragment key={`${part}-${i}`}>
            {i > 0 ? ' · ' : null}
            {i === arr.length - 1 ? <strong>{part.trim()}</strong> : part.trim()}
          </React.Fragment>
        ))}
      </StudentSub>
    </HeaderFloat>

    <LeftTopFloat>
      <PeerLabel>More top performers</PeerLabel>
      <PeerRow aria-hidden>
        {peers.map((p) => (
          <img key={p.id} src={p.photo} alt="" loading="lazy" />
        ))}
      </PeerRow>
    </LeftTopFloat>

    <LeftBottomFloat>
      <StatBlock>
        <strong>{story.score}</strong>
        <div className="meta">
          <span className="stars" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <FiStar key={i} />
            ))}
          </span>
          <span className="rating">{story.batch}</span>
        </div>
        <span className="hint">
          {story.hint} · {story.exam}
        </span>
      </StatBlock>
    </LeftBottomFloat>

    <PhotoFloat>
      {story.photo ? (
        <PortraitFigure>
          <PortraitImage
            src={story.photo}
            fallback={story.photoFallback}
            cutout={story.cutout}
            alt={story.name}
          />
        </PortraitFigure>
      ) : null}
    </PhotoFloat>

    <RightTopFloat>
      <Stamp aria-label={story.badge}>
        <StampSvg />
        <FiStar className="star" aria-hidden />
      </Stamp>
      <QuoteBlock>
        <span className="mark" aria-hidden>
          &ldquo;
        </span>
        <p>{story.quote}</p>
      </QuoteBlock>
    </RightTopFloat>

    <RightBottomFloat>
      <TagGrid>
        {story.tags.slice(0, 5).map((tag, i) => (
          <Tag key={tag} $accent={i % 2 === 1}>
            {tag}
          </Tag>
        ))}
        {story.tags.length > 5 ? <MoreTag aria-hidden>&gt;&gt;</MoreTag> : null}
      </TagGrid>
    </RightBottomFloat>
  </Stage>
);

const SpoorthiAchievementsSection = ({
  sectionId = 'achievements',
  successStories,
}) => {
  const reduceMotion = useReducedMotion();
  const items = useMemo(
    () =>
      pickBestStories(
        (successStories?.items || []).map(normalizeStory).filter(Boolean),
      ),
    [successStories?.items],
  );
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;

  const selectIndex = useCallback(
    (next) => {
      if (count <= 0) return;
      const wrapped = ((next % count) + count) % count;
      if (wrapped === indexRef.current) return;
      setDirection(wrapped > indexRef.current ? 1 : -1);
      setIndex(wrapped);
    },
    [count],
  );

  const goTo = useCallback((next) => selectIndex(next), [selectIndex]);
  const goNext = useCallback(() => selectIndex(index + 1), [selectIndex, index]);
  const goPrev = useCallback(() => selectIndex(index - 1), [selectIndex, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  if (!count) return null;

  const current = items[index];
  const peers = items.filter((_, i) => i !== index).slice(0, 4);
  const canSlide = count > 1;
  const eyebrow = successStories?.eyebrow || 'Student achievements';

  return (
    <Section id={sectionId} aria-labelledby="spoorthi-achievements-title">
      <Inner>
        <VisuallyHidden id="spoorthi-achievements-title">
          {successStories?.headline || 'Spoorthi student achievements'}
        </VisuallyHidden>

        <div aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" custom={direction}>
            <StudentStage
              key={current.id}
              story={current}
              peers={peers}
              eyebrow={eyebrow}
              custom={direction}
              variants={reduceMotion ? undefined : slideVariants}
              initial={reduceMotion ? false : 'enter'}
              animate="center"
              exit={reduceMotion ? undefined : 'exit'}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>

        {canSlide ? (
          <NavBar>
            <NavBtn type="button" aria-label="Previous student" onClick={goPrev}>
              <FiChevronLeft aria-hidden />
            </NavBtn>
            <Dots role="tablist" aria-label="Select student">
              {items.map((item, i) => (
                <Dot
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${item.name}, ${item.score}`}
                  $active={i === index}
                  onClick={() => goTo(i)}
                />
              ))}
            </Dots>
            <Counter>
              {index + 1}/{count}
            </Counter>
            <NavBtn type="button" aria-label="Next student" onClick={goNext}>
              <FiChevronRight aria-hidden />
            </NavBtn>
          </NavBar>
        ) : null}
      </Inner>
    </Section>
  );
};

export default SpoorthiAchievementsSection;
