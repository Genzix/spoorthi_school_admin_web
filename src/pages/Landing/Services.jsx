import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as Fi from 'react-icons/fi';
import Reveal from './Reveal';
import { fadeUp, stagger } from './motion';
import {
  BtnGold,
  Container,
  Eyebrow,
  Headline,
  Section,
} from './styles';

const Head = styled.div`
  text-align: center;
  margin-bottom: 2.25rem;

  h2 {
    margin-inline: auto;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.15rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  border-radius: 0.9rem;
  padding: 1.55rem 1.3rem;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(11, 31, 58, 0.1);
  }

  .icon {
    width: 3rem;
    height: 3rem;
    margin: 0 auto 1rem;
    border-radius: 0.65rem;
    display: grid;
    place-items: center;
    color: var(--lp-gold);
    background: color-mix(in srgb, var(--lp-gold) 14%, #fff);
    border: 1px solid color-mix(in srgb, var(--lp-gold) 35%, transparent);
    font-size: 1.3rem;
  }

  h3 {
    font-family: var(--lp-font-display);
    font-size: 1.15rem;
    color: var(--lp-navy);
    margin: 0 0 0.5rem;
  }

  p {
    font-family: var(--lp-font-body);
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--lp-muted);
    margin: 0;
  }
`;

const Band = styled.div`
  margin-top: 2.5rem;
  background: var(--lp-navy);
  color: #fff;
  border-radius: 0.9rem;
  padding: 1.35rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  p {
    font-family: var(--lp-font-display);
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }
`;

const Services = ({ services, admissionHref, admissionLabel }) => (
  <Section id="services">
    <Container>
      <Reveal>
        <Head>
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <Headline as="h2" $max="22ch" style={{ marginInline: 'auto' }}>
            {services.headline}
          </Headline>
        </Head>
      </Reveal>

      <Grid
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {services.items.map((item) => {
          const Icon = Fi[item.icon] || Fi.FiStar;
          return (
            <Card key={item.title} variants={fadeUp}>
              <div className="icon">
                <Icon aria-hidden />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          );
        })}
      </Grid>

      <Reveal>
        <Band>
          <p>We Offer The Best For You!</p>
          <BtnGold href={admissionHref}>{admissionLabel}</BtnGold>
        </Band>
      </Reveal>
    </Container>
  </Section>
);

export default Services;
