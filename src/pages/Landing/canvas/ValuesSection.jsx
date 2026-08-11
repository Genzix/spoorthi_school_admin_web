import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';

const Section = styled.section`
  padding: clamp(3.5rem, 8vw, 5.5rem) 1.25rem 4.5rem;
`;

const Inner = styled.div`
  width: min(1320px, 100%);
  margin-inline: auto;
`;

const Title = styled.h2`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.035em;
  text-align: center;
  color: var(--lp-ink);
  margin: 0 auto clamp(2rem, 5vw, 3rem);
  line-height: 1;
  max-width: 16ch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.35rem, 3vw, 2.1rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin-inline: auto;
  }
`;

const Card = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

const Frame = styled.div`
  position: relative;
  aspect-ratio: 0.95;
  border-radius: 1.5rem;
  overflow: hidden;
  background: color-mix(in srgb, var(--lp-sky) 18%, #e8eef6);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--lp-navy) 28%, transparent),
      transparent 45%
    );
    opacity: 0.55;
    pointer-events: none;
  }

  ${Card}:hover & img {
    transform: scale(1.06);
  }
`;

const CardTitle = styled.h3`
  font-family: var(--lp-font-display);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--lp-ink);
  margin: 0;
  line-height: 1.05;

  em {
    font-style: italic;
    font-weight: 600;
    color: color-mix(in srgb, var(--lp-navy) 72%, var(--lp-sky));
  }
`;

const CardBody = styled.p`
  font-family: var(--lp-font-body);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--lp-muted);
  margin: 0;
`;

const renderTitle = (item) => {
  if (item.titleItalic && item.title) {
    const parts = item.title.split(item.titleItalic);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <em>{item.titleItalic}</em>
          {parts[1]}
        </>
      );
    }
  }
  return item.title;
};

const ValuesSection = ({ values }) => {
  if (!values?.items?.length) return null;

  return (
    <Section id="goal" aria-labelledby="goal-title">
      <Inner>
        <Reveal>
          <Title id="goal-title">{values.headline}</Title>
        </Reveal>
        <Grid>
          {values.items.map((item, i) => (
            <Reveal key={item.title || i} delay={0.08 * i}>
              <Card>
                <Frame>
                  <img src={item.image} alt={item.imageAlt || ''} loading="lazy" />
                </Frame>
                <CardTitle>{renderTitle(item)}</CardTitle>
                <CardBody>{item.description}</CardBody>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};

export default ValuesSection;
