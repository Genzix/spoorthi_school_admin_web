import React from 'react';
import styled from 'styled-components';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Reveal from '../Reveal';

const Section = styled.section`
  position: relative;
  padding: clamp(3.5rem, 8vw, 5rem) 1.25rem 4.5rem;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--lp-navy) 96%, #000) 0%,
      var(--lp-navy) 48%,
      color-mix(in srgb, var(--lp-navy) 82%, var(--lp-sky)) 100%
    );
  color: #fff;
`;

const Glow = styled.div`
  position: absolute;
  width: min(55vw, 480px);
  height: min(55vw, 480px);
  right: -8%;
  top: -20%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--lp-gold) 28%, transparent),
    transparent 68%
  );
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
  width: min(1200px, 100%);
  margin-inline: auto;
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  grid-template-columns: 1.15fr 0.85fr;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Lead = styled.div``;

const Title = styled.h2`
  font-family: var(--lp-font-display);
  font-size: clamp(2.1rem, 4.2vw, 3.1rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  margin: 0 0 0.75rem;
  color: #fff;
  line-height: 0.98;
`;

const Body = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1.02rem;
  line-height: 1.6;
  color: color-mix(in srgb, #fff 72%, transparent);
  margin: 0 0 1.35rem;
  max-width: 40ch;
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.85rem;
  padding: 0.7rem 1.35rem;
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

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.25rem 1.2rem;
  display: grid;
  gap: 0.95rem;
  border-radius: 1.35rem;
  background: color-mix(in srgb, #fff 8%, transparent);
  border: 1px solid color-mix(in srgb, #fff 14%, transparent);
  backdrop-filter: blur(8px);
`;

const Item = styled.li`
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  color: color-mix(in srgb, #fff 88%, transparent);
  line-height: 1.45;

  svg {
    margin-top: 0.15rem;
    color: var(--lp-gold);
    flex-shrink: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ContactStrip = ({ contact, schoolName, admissionCta }) => {
  if (!contact) return null;

  return (
    <Section id="contact" aria-labelledby="contact-title">
      <Glow aria-hidden />
      <Inner>
        <Reveal>
          <Lead>
            <Title id="contact-title">Visit {schoolName}</Title>
            <Body>
              Admissions are open. Reach out and we will help you plan a campus
              visit or start an application.
            </Body>
            <Cta href={`mailto:${contact.email}`}>
              {admissionCta?.label || 'Apply now'}
            </Cta>
          </Lead>
        </Reveal>
        <Reveal delay={0.1}>
          <List>
            <Item>
              <FiMapPin aria-hidden />
              <span>{contact.address}</span>
            </Item>
            <Item>
              <FiPhone aria-hidden />
              <a href={`tel:${String(contact.phone).replace(/\s+/g, '')}`}>
                {contact.phone}
              </a>
            </Item>
            <Item>
              <FiMail aria-hidden />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </Item>
            {contact.hours ? (
              <Item>
                <span aria-hidden style={{ width: '1rem' }} />
                <span>{contact.hours}</span>
              </Item>
            ) : null}
          </List>
        </Reveal>
      </Inner>
    </Section>
  );
};

export default ContactStrip;
