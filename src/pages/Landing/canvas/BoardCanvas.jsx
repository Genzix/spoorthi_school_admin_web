import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import { staggerFast } from '../motion';
import { usePrefersReducedMotion } from '../hooks';

const Section = styled.section`
  position: relative;
  padding: clamp(3.5rem, 8vw, 5.5rem) 1.25rem 5.5rem;
  overflow: hidden;
`;

const Stage = styled.div`
  position: relative;
  width: min(1320px, 100%);
  margin-inline: auto;
  min-height: 580px;
  display: grid;
  place-items: center;

  @media (max-width: 900px) {
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
`;

const Center = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 28rem;
  padding: 1rem;
  background:
    radial-gradient(
      closest-side,
      color-mix(in srgb, var(--lp-surface) 92%, #fff),
      transparent 78%
    );

  @media (max-width: 900px) {
    order: -1;
    background: none;
  }
`;

const Hello = styled.h2`
  font-family: var(--lp-font-display);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--lp-ink);
  margin: 0 0 0.85rem;
  line-height: 0.95;
`;

const Body = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--lp-muted);
  margin: 0;
`;

const Widget = styled(motion.div)`
  background: color-mix(in srgb, #fff 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--lp-ink) 8%, transparent);
  border-radius: 1.35rem;
  box-shadow: 0 18px 40px rgba(11, 21, 36, 0.08);
  padding: 0.95rem;
  width: min(100%, 260px);
  backdrop-filter: blur(10px);

  @media (min-width: 901px) {
    position: absolute;
    width: 236px;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 700;
  margin-bottom: 0.55rem;
  background: ${(p) => p.$bg || 'color-mix(in srgb, var(--lp-sky) 35%, #fff)'};
  color: var(--lp-ink);
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  strong {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--lp-ink);
    background: color-mix(in srgb, var(--lp-sky) 28%, #fff);
    border-radius: 0.7rem;
    padding: 0.45rem 0.5rem;
    text-align: center;
    line-height: 1.15;
    min-width: 3.1rem;
  }

  h3 {
    font-family: var(--lp-font-body);
    font-size: 0.92rem;
    font-weight: 700;
    margin: 0 0 0.2rem;
    color: var(--lp-ink);
  }

  p {
    margin: 0;
    font-size: 0.78rem;
    color: var(--lp-muted);
  }
`;

const Media = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 1.05;
  margin-top: 0.35rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Badge = styled.span`
  position: absolute;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 92%, transparent);
  border: 1px solid color-mix(in srgb, #000 8%, transparent);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--lp-ink);
  backdrop-filter: blur(6px);
`;

const Checklist = styled.ol`
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.45rem;

  li {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    font-size: 0.84rem;
    color: var(--lp-ink);
    line-height: 1.35;
  }

  span {
    flex: 0 0 auto;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--lp-gold) 55%, #fff);
    display: grid;
    place-items: center;
    font-size: 0.68rem;
    font-weight: 800;
  }
`;

const Progress = styled.div`
  margin-top: 0.55rem;

  h3 {
    margin: 0.45rem 0 0.25rem;
    font-size: 0.95rem;
    color: var(--lp-ink);
  }

  p {
    margin: 0 0 0.55rem;
    font-size: 0.78rem;
    color: var(--lp-muted);
    line-height: 1.4;
  }
`;

const Bar = styled.div`
  height: 0.55rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--lp-ink) 8%, transparent);
  overflow: hidden;

  i {
    display: block;
    height: 100%;
    width: ${(p) => p.$value || 0}%;
    background: linear-gradient(
      90deg,
      var(--lp-sky),
      color-mix(in srgb, var(--lp-gold) 70%, var(--lp-sky))
    );
    border-radius: inherit;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--lp-muted);
  margin-top: 0.3rem;
`;

const ChatList = styled.div`
  display: grid;
  gap: 0.55rem;
  margin-top: 0.35rem;
`;

const ChatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    object-fit: cover;
  }

  div {
    flex: 1;
    min-width: 0;
  }

  strong {
    display: block;
    font-size: 0.8rem;
    color: var(--lp-ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.7rem;
    color: var(--lp-muted);
  }

  time {
    font-size: 0.68rem;
    color: var(--lp-muted);
  }
`;

const desktopPos = {
  event: { top: '4%', left: '2%' },
  media: { top: '28%', left: '6%' },
  checklist: { bottom: '6%', left: '4%' },
  chat: { top: '8%', right: '3%' },
  progress: { bottom: '8%', right: '4%' },
};

const BoardCanvas = ({ board }) => {
  const reduced = usePrefersReducedMotion();
  if (!board) return null;

  const widgets = board.widgets || [];

  return (
    <Section id="board" aria-labelledby="board-title">
      <Stage>
        <Center
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Reveal>
            <Hello id="board-title">{board.headline}</Hello>
            <Body>{board.body}</Body>
          </Reveal>
        </Center>

        {widgets.map((w, i) => {
          const pos = desktopPos[w.type] || {};
          return (
            <Widget
              key={w.id || i}
              style={pos}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: 0.1 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [0, i % 2 === 0 ? -7 : 7, 0],
                      }
                }
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: 5.4 + i * 0.35,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.25,
                      }
                }
              >
                {w.tag ? <Tag $bg={w.tagColor}>{w.tag}</Tag> : null}

                {w.type === 'event' ? (
                  <EventDate>
                    <strong>
                      {w.month}
                      <br />
                      {w.day}
                    </strong>
                    <div>
                      <h3>{w.title}</h3>
                      <p>{w.meta}</p>
                    </div>
                  </EventDate>
                ) : null}

                {w.type === 'media' ? (
                  <Media>
                    <img src={w.image} alt={w.imageAlt || ''} loading="lazy" />
                    {(w.badges || []).map((b, bi) => (
                      <Badge
                        key={b}
                        style={{
                          top: bi < 2 ? '0.45rem' : 'auto',
                          bottom: bi >= 2 ? '0.45rem' : 'auto',
                          left: bi % 2 === 0 ? '0.45rem' : 'auto',
                          right: bi % 2 === 1 ? '0.45rem' : 'auto',
                        }}
                      >
                        {b}
                      </Badge>
                    ))}
                  </Media>
                ) : null}

                {w.type === 'checklist' ? (
                  <>
                    <h3
                      style={{
                        margin: '0 0 0.35rem',
                        fontSize: '0.95rem',
                        color: 'var(--lp-ink)',
                      }}
                    >
                      {w.title}
                    </h3>
                    <Checklist>
                      {(w.steps || []).map((step, si) => (
                        <li key={step}>
                          <span>{si + 1}</span>
                          {step}
                        </li>
                      ))}
                    </Checklist>
                  </>
                ) : null}

                {w.type === 'chat' ? (
                  <ChatList>
                    {(w.threads || []).map((t) => (
                      <ChatRow key={t.name}>
                        <img src={t.photo} alt="" loading="lazy" />
                        <div>
                          <strong>{t.name}</strong>
                          <span>{t.preview}</span>
                        </div>
                        <time>{t.time}</time>
                      </ChatRow>
                    ))}
                  </ChatList>
                ) : null}

                {w.type === 'progress' ? (
                  <Progress>
                    {w.image ? (
                      <Media style={{ aspectRatio: '1.4', marginTop: 0 }}>
                        <img
                          src={w.image}
                          alt={w.imageAlt || ''}
                          loading="lazy"
                        />
                      </Media>
                    ) : null}
                    <h3>{w.title}</h3>
                    <p>{w.description}</p>
                    <Bar $value={w.progress || 0}>
                      <i />
                    </Bar>
                    <Meta>
                      <span>
                        {w.progressLabel || `${w.progress}% complete`}
                      </span>
                    </Meta>
                  </Progress>
                ) : null}
              </motion.div>
            </Widget>
          );
        })}
      </Stage>
    </Section>
  );
};

export default BoardCanvas;
