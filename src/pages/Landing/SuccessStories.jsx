import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Reveal from './Reveal';
import {
  Body,
  Container,
  Eyebrow,
  Headline,
  Section,
} from './styles';

const CARD_W = 300;
const GAP = 18;
const DESKTOP_VISIBLE = 3;

const Wrap = styled(Section)`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: ${(p) =>
    p.$hasBg
      ? '#0b1f3a'
      : `radial-gradient(
          720px 280px at 50% 0%,
          color-mix(in srgb, var(--lp-gold) 10%, transparent),
          transparent 70%
        ),
        linear-gradient(
          180deg,
          #fff 0%,
          color-mix(in srgb, var(--lp-surface) 80%, #fff) 100%
        )`};
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: ${(p) => `url(${p.$src})`};
  background-size: cover;
  background-position: center 35%;
  background-repeat: no-repeat;
  transform: scale(1.02);

  /* Soft navy scrim so campus stays visible but cards/text stay readable. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(11, 31, 58, 0.55) 0%,
      rgba(11, 31, 58, 0.62) 45%,
      rgba(11, 31, 58, 0.78) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Head = styled.div`
  text-align: center;
  margin-bottom: clamp(2rem, 4vw, 2.75rem);

  h2 {
    margin-inline: auto;
    max-width: 18ch;
    color: ${(p) => (p.$onPhoto ? '#fff' : undefined)};
  }

  p {
    margin: 0.85rem auto 0;
    color: ${(p) =>
      p.$onPhoto ? 'color-mix(in srgb, #fff 82%, transparent)' : undefined};
  }
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  margin-inline: auto;
  /* Sized for 3 cards; remaining students stay clipped off-screen. */
  width: min(
    ${DESKTOP_VISIBLE * CARD_W + (DESKTOP_VISIBLE - 1) * GAP}px,
    calc(100% - 2.5rem)
  );
  padding: 0.35rem 0 0.5rem;
`;

const Track = styled.div`
  display: flex;
  gap: ${GAP}px;
  will-change: transform;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Story = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: ${(p) => p.$width}px;
  flex: 0 0 ${(p) => p.$width}px;
  box-sizing: border-box;
  padding: 1.15rem 1.05rem 1.2rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  box-shadow: 0 16px 36px rgba(11, 31, 58, 0.18);
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: center;
  width: 100%;
  text-align: left;
  margin-bottom: 0.95rem;
`;

const Avatar = styled.div`
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(
    145deg,
    var(--lp-gold),
    color-mix(in srgb, var(--lp-navy) 55%, var(--lp-gold))
  );
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    border: 3px solid #fff;
    background: #e8edf5;
  }
`;

const ScoreBlock = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--lp-navy);
  }

  span {
    display: block;
    margin-top: 0.25rem;
    font-family: var(--lp-font-body);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--lp-gold) 45%, #8a6a10);
  }
`;

const Name = styled.h3`
  font-family: var(--lp-font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--lp-navy);
  margin: 0 0 0.8rem;
  letter-spacing: -0.01em;
`;

const Quote = styled.blockquote`
  margin: 0;
  width: 100%;
  padding: 1rem 0.95rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--lp-navy) 4%, #fff);
  border: 1px solid color-mix(in srgb, var(--lp-navy) 7%, transparent);
  position: relative;
  flex: 1;

  &::before {
    content: '“';
    position: absolute;
    top: 0.2rem;
    left: 0.65rem;
    font-family: var(--lp-font-display);
    font-size: 1.75rem;
    line-height: 1;
    color: color-mix(in srgb, var(--lp-gold) 70%, transparent);
    pointer-events: none;
  }

  p {
    margin: 0;
    font-family: var(--lp-font-body);
    font-size: 0.9rem;
    font-style: italic;
    line-height: 1.6;
    color: var(--lp-ink);
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin-top: 1.35rem;
`;

const Dots = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
  max-width: 22rem;
`;

const Dot = styled.button`
  width: ${(p) => (p.$active ? '1.35rem' : '0.55rem')};
  height: 0.55rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  background: ${(p) => {
    if (p.$onPhoto) {
      return p.$active
        ? 'var(--lp-gold)'
        : 'color-mix(in srgb, #fff 45%, transparent)';
    }
    return p.$active
      ? 'var(--lp-navy)'
      : 'color-mix(in srgb, var(--lp-navy) 22%, transparent)';
  }};
  transition: width 0.25s ease, background 0.25s ease;

  &:hover {
    background: ${(p) => {
      if (p.$onPhoto) {
        return p.$active
          ? 'var(--lp-gold)'
          : 'color-mix(in srgb, #fff 70%, transparent)';
      }
      return p.$active
        ? 'var(--lp-navy)'
        : 'color-mix(in srgb, var(--lp-navy) 40%, transparent)';
    }};
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 3px;
  }
`;

const Arrows = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ArrowBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border: 1.5px solid
    ${(p) =>
      p.$onPhoto
        ? 'color-mix(in srgb, #fff 55%, transparent)'
        : 'color-mix(in srgb, var(--lp-navy) 18%, transparent)'};
  background: ${(p) =>
    p.$onPhoto ? 'color-mix(in srgb, #fff 92%, transparent)' : '#fff'};
  color: var(--lp-navy);
  cursor: pointer;
  backdrop-filter: ${(p) => (p.$onPhoto ? 'blur(6px)' : 'none')};
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover:not(:disabled) {
    border-color: ${(p) => (p.$onPhoto ? '#fff' : 'var(--lp-navy)')};
    background: ${(p) =>
      p.$onPhoto ? '#fff' : 'color-mix(in srgb, var(--lp-navy) 4%, #fff)'};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-gold);
    outline-offset: 3px;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

function visibleForWidth(width) {
  if (width < 640) return 1;
  if (width < 960) return 2;
  return DESKTOP_VISIBLE;
}

/**
 * Window carousel over optional campus background.
 * Show 3 students (2/1 on smaller screens); arrows move one at a time.
 */
const SuccessStories = ({ successStories }) => {
  const items = successStories?.items || [];
  const count = items.length;
  const bgSrc = successStories?.backgroundImage || '';
  const onPhoto = Boolean(bgSrc);
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(DESKTOP_VISIBLE);
  const [cardPx, setCardPx] = useState(CARD_W);
  const viewportRef = useRef(null);

  const maxStart = Math.max(0, count - visible);
  const canSlide = maxStart > 0;
  const pageCount = maxStart + 1;
  const step = cardPx + GAP;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextVisible = visibleForWidth(window.innerWidth);
    const vw = viewport.clientWidth;
    const nextCard = Math.max(200, (vw - (nextVisible - 1) * GAP) / nextVisible);

    setVisible(nextVisible);
    setCardPx(nextCard);
    setStart((s) => Math.min(s, Math.max(0, count - nextVisible)));
  }, [count]);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const ro = new ResizeObserver(() => measure());
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [measure]);

  const goTo = useCallback(
    (next) => {
      if (!canSlide) return;
      const wrapped = ((next % pageCount) + pageCount) % pageCount;
      setStart(wrapped);
    },
    [canSlide, pageCount],
  );

  const goPrev = () => goTo(start - 1);
  const goNext = () => goTo(start + 1);

  if (!count) return null;

  const offset = start * step;

  return (
    <Wrap id="success" $hasBg={onPhoto}>
      {onPhoto ? <Bg $src={bgSrc} aria-hidden /> : null}

      <Content>
        <Container>
          <Reveal>
            <Head $onPhoto={onPhoto}>
              <Eyebrow $color={onPhoto ? 'var(--lp-gold)' : undefined}>
                {successStories.eyebrow}
              </Eyebrow>
              <Headline as="h2" $color={onPhoto ? '#fff' : undefined}>
                {successStories.headline}
              </Headline>
              {successStories.subhead ? (
                <Body
                  $max="52ch"
                  $color={
                    onPhoto
                      ? 'color-mix(in srgb, #fff 82%, transparent)'
                      : undefined
                  }
                  style={{ marginInline: 'auto' }}
                >
                  {successStories.subhead}
                </Body>
              ) : null}
            </Head>
          </Reveal>
        </Container>

        <Viewport
          ref={viewportRef}
          aria-roledescription="carousel"
          aria-label="Success stories"
        >
          <Track
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
            aria-live="polite"
          >
            {items.map((story, i) => {
              const inView = i >= start && i < start + visible;
              return (
                <Story
                  key={`${story.name}-${story.score}`}
                  $width={cardPx}
                  aria-hidden={!inView}
                >
                  <Top>
                    <Avatar>
                      <img
                        src={story.photo}
                        alt={inView ? story.name : ''}
                        loading="lazy"
                      />
                    </Avatar>
                    <ScoreBlock>
                      <strong>{story.score}</strong>
                      <span>{story.exam}</span>
                    </ScoreBlock>
                  </Top>
                  <Name>{story.name}</Name>
                  <Quote>
                    <p>{story.quote}</p>
                  </Quote>
                </Story>
              );
            })}
          </Track>
        </Viewport>

        <Container>
          <Controls>
            {canSlide ? (
              <Dots role="tablist" aria-label="Carousel position">
                {Array.from({ length: pageCount }, (_, i) => (
                  <Dot
                    key={`dot-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={i === start}
                    aria-label={`Show students ${i + 1} to ${Math.min(i + visible, count)}`}
                    $active={i === start}
                    $onPhoto={onPhoto}
                    onClick={() => goTo(i)}
                  />
                ))}
              </Dots>
            ) : null}

            <Arrows>
              <ArrowBtn
                type="button"
                aria-label="Previous student"
                onClick={goPrev}
                disabled={!canSlide}
                $onPhoto={onPhoto}
              >
                <FiChevronLeft aria-hidden />
              </ArrowBtn>
              <ArrowBtn
                type="button"
                aria-label="Next student"
                onClick={goNext}
                disabled={!canSlide}
                $onPhoto={onPhoto}
              >
                <FiChevronRight aria-hidden />
              </ArrowBtn>
            </Arrows>
          </Controls>
        </Container>
      </Content>
    </Wrap>
  );
};

export default SuccessStories;
