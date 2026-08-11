import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import { fadeUp, stagger } from '../motion';

const Section = styled.section`
  position: relative;
  padding: clamp(4rem, 9vw, 6.5rem) 1.25rem;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  inset: auto auto -20% -10%;
  width: min(60vw, 520px);
  height: min(60vw, 520px);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--lp-sky) 28%, transparent),
    transparent 70%
  );
  pointer-events: none;
`;

const Inner = styled(motion.div)`
  position: relative;
  width: min(960px, 100%);
  margin-inline: auto;
`;

const QuoteMark = styled(motion.span)`
  display: block;
  font-family: var(--lp-font-display);
  font-size: clamp(4rem, 10vw, 6.5rem);
  line-height: 0.7;
  color: color-mix(in srgb, var(--lp-gold) 75%, var(--lp-sky));
  margin-bottom: 0.35rem;
  user-select: none;
`;

const QuoteText = styled(motion.p)`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.4vw, 3.15rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--lp-ink);
  margin: 0 0 1rem;

  em {
    font-style: italic;
    font-weight: 600;
    color: color-mix(in srgb, var(--lp-navy) 78%, var(--lp-sky));
  }
`;

const QuoteBody = styled(motion.p)`
  font-family: var(--lp-font-body);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--lp-muted);
  margin: 0;
  max-width: 46ch;
`;

const Attribution = styled(motion.footer)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-top: 1.75rem;
`;

const Avatar = styled.img`
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid color-mix(in srgb, var(--lp-sky) 45%, #fff);
`;

const AttrText = styled.div`
  strong {
    display: block;
    font-family: var(--lp-font-body);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--lp-ink);
  }

  span {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--lp-muted);
    margin-top: 0.15rem;
  }
`;

const Collab = styled.div`
  width: min(960px, 100%);
  margin: clamp(3rem, 7vw, 4.5rem) auto 0;
  max-width: 46rem;
  padding-top: 1.75rem;
  border-top: 1px solid color-mix(in srgb, var(--lp-ink) 10%, transparent);
`;

const CollabTitle = styled.h2`
  margin: 0 0 0.85rem;
  font-family: var(--lp-font-display);
  font-size: clamp(1.65rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--lp-ink);
  line-height: 1.05;

  em {
    font-style: italic;
    font-weight: 600;
    color: color-mix(in srgb, var(--lp-navy) 70%, var(--lp-sky));
  }
`;

const CollabBody = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--lp-muted);
  margin: 0;
  max-width: 48ch;
`;

const renderEmphasized = (text, italicWord) => {
  if (!italicWord || !text?.includes(italicWord)) return text;
  const [before, after] = text.split(italicWord);
  return (
    <>
      {before}
      <em>{italicWord}</em>
      {after}
    </>
  );
};

const QuoteSection = ({ quote, collaboration }) => {
  if (!quote) return null;

  return (
    <Section id="about" aria-labelledby="about-quote">
      <Glow aria-hidden />
      <Inner variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
        <QuoteMark variants={fadeUp} aria-hidden>
          “
        </QuoteMark>
        <QuoteText id="about-quote" variants={fadeUp}>
          {renderEmphasized(quote.headline, quote.headlineItalic)}
        </QuoteText>
        {quote.body ? <QuoteBody variants={fadeUp}>{quote.body}</QuoteBody> : null}
        {quote.author ? (
          <Attribution variants={fadeUp}>
            {quote.author.photo ? (
              <Avatar src={quote.author.photo} alt="" />
            ) : null}
            <AttrText>
              <strong>{quote.author.name}</strong>
              <span>{quote.author.role}</span>
            </AttrText>
          </Attribution>
        ) : null}
      </Inner>

      {collaboration ? (
        <Reveal delay={0.08}>
          <Collab>
            <CollabTitle>
              {renderEmphasized(
                collaboration.headline,
                collaboration.headlineItalic
              )}
            </CollabTitle>
            <CollabBody>{collaboration.body}</CollabBody>
          </Collab>
        </Reveal>
      ) : null}
    </Section>
  );
};

export default QuoteSection;
