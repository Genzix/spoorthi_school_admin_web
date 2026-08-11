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

const Intro = styled.div`
  max-width: 38rem;
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
`;

const Title = styled.h2`
  margin: 0 0 0.9rem;
  font-family: var(--lp-font-display);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  color: var(--lp-ink);
  line-height: 1;

  em {
    font-style: italic;
    font-weight: 600;
    color: color-mix(in srgb, var(--lp-navy) 70%, var(--lp-sky));
  }
`;

const Body = styled.p`
  font-family: var(--lp-font-body);
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--lp-muted);
  margin: 0;
  max-width: 48ch;

  em {
    font-style: italic;
    color: color-mix(in srgb, var(--lp-ink) 78%, var(--lp-sky));
  }
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(148px, 1fr);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;

  @media (min-width: 960px) {
    grid-auto-flow: unset;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    overflow: visible;
  }
`;

const Member = styled(motion.article)`
  scroll-snap-align: start;
  min-width: 140px;
`;

const Photo = styled.div`
  aspect-ratio: 0.88;
  border-radius: 1.25rem;
  overflow: hidden;
  background: color-mix(in srgb, var(--lp-sky) 16%, #e8eef6);
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${Member}:hover & img {
    transform: scale(1.05);
  }
`;

const Name = styled.h3`
  font-family: var(--lp-font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  margin: 0 0 0.2rem;
  color: var(--lp-ink);
  line-height: 1.05;
`;

const Role = styled.p`
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--lp-muted);
  margin: 0;
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

const TeamSection = ({ team }) => {
  if (!team?.members?.length) return null;

  return (
    <Section id="team" aria-labelledby="team-title">
      <Inner>
        <Reveal>
          <Intro>
            <Title id="team-title">
              {renderEmphasized(team.headline, team.headlineItalic)}
            </Title>
            <Body>
              {team.bodyBefore}
              {team.bodyEmph ? <em> {team.bodyEmph} </em> : null}
              {team.bodyAfter}
            </Body>
          </Intro>
        </Reveal>

        <Row>
          {team.members.map((m, i) => (
            <Reveal key={m.name || i} delay={Math.min(i * 0.05, 0.35)}>
              <Member whileHover={{ y: -3 }}>
                <Photo>
                  <img src={m.photo} alt="" loading="lazy" />
                </Photo>
                <Name>{m.name}</Name>
                <Role>{m.role}</Role>
              </Member>
            </Reveal>
          ))}
        </Row>
      </Inner>
    </Section>
  );
};

export default TeamSection;
