import React from 'react';
import styled from 'styled-components';
import { FiBookOpen } from 'react-icons/fi';
import Reveal from './Reveal';
import { BtnGold, Container } from './styles';

const Wrap = styled.section`
  position: relative;
  min-height: 380px;
  display: grid;
  place-items: end center;
  padding: 4rem 0 3rem;
  overflow: hidden;
  background: #0b1f3a;
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${(p) => `url(${p.$src})`};
  background-size: cover;
  background-position: center;
  filter: saturate(0.95);
  transform: scale(1.02);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(11, 31, 58, 0.35) 0%,
      rgba(11, 31, 58, 0.72) 55%,
      rgba(11, 31, 58, 0.88) 100%
    );
  }
`;

const Panel = styled.div`
  position: relative;
  z-index: 1;
  width: min(720px, calc(100% - 2rem));
  margin: 0 auto;
  text-align: center;
  background: color-mix(in srgb, var(--lp-navy) 92%, #000);
  border: 1px solid color-mix(in srgb, var(--lp-gold) 45%, transparent);
  border-radius: 0.85rem;
  padding: clamp(1.5rem, 3vw, 2rem) 1.5rem;

  .icon {
    width: 3rem;
    height: 3rem;
    margin: 0 auto 0.85rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--lp-gold);
    border: 1.5px solid color-mix(in srgb, var(--lp-gold) 55%, transparent);
    font-size: 1.25rem;
  }

  h2 {
    font-family: var(--lp-font-display);
    font-size: clamp(1.45rem, 2.6vw, 1.9rem);
    color: #fff;
    margin: 0 0 0.55rem;
    letter-spacing: -0.02em;
  }

  p {
    font-family: var(--lp-font-body);
    color: color-mix(in srgb, #fff 78%, transparent);
    margin: 0 auto 1.2rem;
    max-width: 42ch;
    line-height: 1.6;
  }
`;

const CtaBand = ({ cta }) => (
  <Wrap>
    <Bg $src={cta.backgroundImage} aria-hidden />
    <Container style={{ position: 'relative', zIndex: 1 }}>
      <Reveal>
        <Panel>
          <div className="icon">
            <FiBookOpen aria-hidden />
          </div>
          <h2>{cta.headline}</h2>
          <p>{cta.body}</p>
          <BtnGold href={cta.ctaHref}>{cta.ctaLabel}</BtnGold>
        </Panel>
      </Reveal>
    </Container>
  </Wrap>
);

export default CtaBand;
