import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../Reveal';
import { useFaqCategories } from '../hooks';

const Section = styled.section`
  padding: clamp(3.5rem, 8vw, 5.5rem) 1.25rem 4.5rem;
  background:
    radial-gradient(
      700px 360px at 85% 10%,
      color-mix(in srgb, var(--lp-sky) 18%, transparent),
      transparent 60%
    ),
    transparent;
`;

const Inner = styled.div`
  width: min(1320px, 100%);
  margin-inline: auto;
`;

const Title = styled.h2`
  font-family: var(--lp-font-display);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  text-align: center;
  color: var(--lp-ink);
  margin: 0 0 1.35rem;
  line-height: 1;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
  margin-bottom: 2rem;
`;

const Chip = styled.button`
  border: 1.5px solid
    ${(p) =>
      p.$active
        ? 'color-mix(in srgb, var(--lp-navy) 55%, transparent)'
        : 'color-mix(in srgb, #000 9%, transparent)'};
  background: ${(p) =>
    p.$active
      ? 'color-mix(in srgb, var(--lp-sky) 32%, #fff)'
      : 'color-mix(in srgb, #fff 80%, transparent)'};
  color: var(--lp-ink);
  border-radius: 999px;
  padding: 0.42rem 0.9rem;
  font-family: var(--lp-font-body);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-sky);
    outline-offset: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 3vw, 2rem);
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin-inline: auto;
  }
`;

const Thread = styled(motion.article)`
  display: grid;
  gap: 0.55rem;
  justify-items: ${(p) => (p.$shift === 'right' ? 'end' : 'start')};

  @media (min-width: 801px) {
    transform: translateY(${(p) => p.$y || 0}px);
  }
`;

const Question = styled.div`
  max-width: 92%;
  background: color-mix(in srgb, var(--lp-sky) 28%, #fff);
  border-radius: 1.15rem 1.15rem 1.15rem 0.45rem;
  padding: 0.8rem 0.95rem;
  border: 1px solid color-mix(in srgb, var(--lp-sky) 35%, transparent);
`;

const QMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.35rem;

  .dot {
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--lp-navy) 18%, #fff);
  }

  span {
    font-size: 0.7rem;
    color: var(--lp-muted);
    font-weight: 600;
  }
`;

const QText = styled.p`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--lp-ink);
  line-height: 1.35;
`;

const Answer = styled.div`
  max-width: 100%;
  background: #fff;
  border-radius: 1.15rem 1.15rem 0.45rem 1.15rem;
  padding: 0.95rem 1rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
  box-shadow: 0 14px 30px rgba(11, 21, 36, 0.05);
`;

const AText = styled.p`
  margin: 0 0 0.85rem;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  line-height: 1.55;
  color: color-mix(in srgb, var(--lp-ink) 85%, transparent);
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    object-fit: cover;
  }

  strong {
    display: block;
    font-size: 0.82rem;
    color: var(--lp-ink);
  }

  span {
    display: block;
    font-size: 0.7rem;
    color: var(--lp-muted);
  }
`;

const Empty = styled.p`
  text-align: center;
  color: var(--lp-muted);
  font-family: var(--lp-font-body);
  grid-column: 1 / -1;
`;

const FaqChat = ({ faq }) => {
  const items = useMemo(() => faq?.items || [], [faq?.items]);
  const categories = useFaqCategories(items);
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    if (filter === 'All') return items;
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  if (!items.length) return null;

  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Inner>
        <Reveal>
          <Title id="faq-title">{faq.headline || 'Frequently asked questions'}</Title>
        </Reveal>

        {categories.length > 1 ? (
          <Filters role="tablist" aria-label="FAQ categories">
            {categories.map((cat) => (
              <Chip
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                $active={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Chip>
            ))}
          </Filters>
        ) : null}

        <Grid>
          <AnimatePresence mode="popLayout">
            {visible.length ? (
              visible.map((item, i) => (
                <Thread
                  key={`${item.question}-${i}`}
                  $shift={i % 2 === 0 ? 'left' : 'right'}
                  $y={(i % 3) * 18 - 12}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Question>
                    <QMeta>
                      <span className="dot" aria-hidden />
                      <span>{item.asker || 'Curious parent'}</span>
                    </QMeta>
                    <QText>{item.question}</QText>
                  </Question>
                  <Answer>
                    <AText>{item.answer}</AText>
                    {item.author ? (
                      <Author>
                        {item.author.photo ? (
                          <img src={item.author.photo} alt="" loading="lazy" />
                        ) : null}
                        <div>
                          <strong>{item.author.name}</strong>
                          <span>{item.author.role}</span>
                        </div>
                      </Author>
                    ) : null}
                  </Answer>
                </Thread>
              ))
            ) : (
              <Empty>No questions in this category yet.</Empty>
            )}
          </AnimatePresence>
        </Grid>
      </Inner>
    </Section>
  );
};

export default FaqChat;
