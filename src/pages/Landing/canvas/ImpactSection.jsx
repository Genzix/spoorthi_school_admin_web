import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import { fadeUp, staggerFast } from '../motion';

const Section = styled.section`
  position: relative;
  background:
    radial-gradient(
      900px 420px at 12% 0%,
      color-mix(in srgb, var(--lp-sky) 28%, transparent),
      transparent 55%
    ),
    linear-gradient(
      160deg,
      color-mix(in srgb, var(--lp-navy) 94%, #000) 0%,
      var(--lp-navy) 55%,
      color-mix(in srgb, var(--lp-navy) 88%, var(--lp-sky)) 100%
    );
  color: #fff;
  padding: clamp(3.5rem, 8vw, 5.5rem) 1.25rem 5rem;
  overflow: hidden;
`;

const Inner = styled.div`
  width: min(1320px, 100%);
  margin-inline: auto;
`;

const Center = styled(motion.div)`
  text-align: center;
  max-width: 38rem;
  margin: 0 auto clamp(2rem, 5vw, 2.75rem);
`;

const Title = styled.h2`
  font-family: var(--lp-font-display);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  color: #fff;
  margin: 0 0 0.85rem;
  line-height: 1;
`;

const Sub = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: color-mix(in srgb, #fff 72%, transparent);
  margin: 0 0 1.35rem;
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.8rem;
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  background: var(--lp-gold);
  color: var(--lp-navy);
  font-family: var(--lp-font-body);
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
`;

const Cards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: clamp(2rem, 5vw, 2.75rem);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  padding: 1.1rem 1.05rem 1.2rem;
  border-radius: 1.2rem;
  background: color-mix(in srgb, #fff 8%, transparent);
  border: 1px solid color-mix(in srgb, #fff 14%, transparent);
  backdrop-filter: blur(8px);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;

  img {
    width: 2.35rem;
    height: 2.35rem;
    border-radius: 999px;
    object-fit: cover;
  }

  strong {
    display: block;
    font-family: var(--lp-font-body);
    font-size: 0.84rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
  }

  span {
    display: block;
    font-size: 0.72rem;
    color: color-mix(in srgb, #fff 58%, transparent);
  }
`;

const Quote = styled.p`
  font-family: var(--lp-font-body);
  font-size: 0.88rem;
  line-height: 1.55;
  color: color-mix(in srgb, #fff 82%, transparent);
  margin: 0;
`;

const Logos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.1rem 1.75rem;
  opacity: 0.68;
`;

const Logo = styled.span`
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, #fff 75%, transparent);
`;

const ImpactSection = ({ impact }) => {
  if (!impact) return null;

  return (
    <Section id="partners" aria-labelledby="partners-title">
      <Inner>
        <Center
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={fadeUp}>
            <Title id="partners-title">{impact.headline}</Title>
            <Sub>{impact.subhead}</Sub>
            {impact.cta ? (
              <Cta href={impact.cta.href}>{impact.cta.label}</Cta>
            ) : null}
          </motion.div>
        </Center>

        {impact.testimonials?.length ? (
          <Cards
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {impact.testimonials.map((t, i) => (
              <Card
                key={t.name || i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <Head>
                  {t.photo ? <img src={t.photo} alt="" loading="lazy" /> : null}
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </Head>
                <Quote>{t.quote}</Quote>
              </Card>
            ))}
          </Cards>
        ) : null}

        {impact.partners?.length ? (
          <Reveal delay={0.08}>
            <Logos aria-label="Partner organizations">
              {impact.partners.map((p) => (
                <Logo key={p}>{p}</Logo>
              ))}
            </Logos>
          </Reveal>
        ) : null}
      </Inner>
    </Section>
  );
};

export default ImpactSection;
