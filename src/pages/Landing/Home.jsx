import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as Fi from 'react-icons/fi';
import { fadeUp, stagger } from './motion';
import CountUp from './CountUp';
import {
  Body,
  BtnGold,
  BtnOutlineLight,
  Container,
} from './styles';

const HeroWrap = styled.section`
  position: relative;
  isolation: isolate;
  min-height: min(100vh, 920px);
  display: flex;
  flex-direction: column;
  color: #fff;
  overflow: hidden;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: #dce7f2;
`;

/** Soft fill so zoomed-out photo never leaves empty edges. */
const BackdropFill = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  filter: blur(22px) saturate(1.05) brightness(1.04);
  transform: scale(1.12);
  pointer-events: none;
`;

/** Main campus photo — framed to keep the school building clear. */
const BackdropPhoto = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  transform: scale(1);
  transform-origin: center center;
  display: block;
`;

const BackdropShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      100deg,
      color-mix(in srgb, #0f172a 52%, transparent) 0%,
      color-mix(in srgb, #0f172a 28%, transparent) 38%,
      color-mix(in srgb, #0f172a 12%, transparent) 68%,
      color-mix(in srgb, #0f172a 18%, transparent) 100%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, #0f172a 22%, transparent) 0%,
      transparent 42%,
      color-mix(in srgb, #0f172a 36%, transparent) 100%
    );
  pointer-events: none;
`;

const HeroMain = styled(Container)`
  flex: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(1.75rem, 4vw, 3.5rem);
  align-items: center;
  padding-top: clamp(6.5rem, 12vw, 8.5rem);
  padding-bottom: clamp(2.5rem, 5vw, 3.75rem);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding-top: clamp(5.5rem, 14vw, 7rem);
  }
`;

const Copy = styled(motion.div)`
  max-width: 38rem;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
`;

const BrandMark = styled.p`
  font-family: var(--lp-font-display);
  font-size: clamp(2.35rem, 5vw, 3.55rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.05;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
`;

const TagLine = styled.span`
  width: 2.25rem;
  height: 2px;
  background: var(--lp-gold);
  flex-shrink: 0;
`;

const Tag = styled.p`
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, #fff 88%, var(--lp-gold));
  margin: 0;
`;

const Title = styled.h1`
  font-family: var(--lp-font-display);
  font-weight: 600;
  font-size: clamp(1.85rem, 3.8vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0 0 1.15rem;
  max-width: 18ch;

  em {
    font-style: italic;
    color: var(--lp-gold);
    font-weight: 600;
  }
`;

const Ctas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.85rem;
`;

const Highlights = styled(motion.div)`
  display: grid;
  gap: 0.9rem;
  justify-self: end;
  width: min(100%, 320px);

  @media (max-width: 960px) {
    justify-self: start;
    width: min(100%, 420px);
  }
`;

const Highlight = styled(motion.article)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: center;
  padding: 1.05rem 1.15rem;
  border-radius: 0.85rem;
  backdrop-filter: blur(12px);
  border: 1px solid
    ${(p) =>
      p.$tone === 'gold'
        ? 'color-mix(in srgb, var(--lp-gold) 55%, #fff)'
        : 'color-mix(in srgb, #fff 70%, transparent)'};
  background: ${(p) =>
    p.$tone === 'gold'
      ? 'color-mix(in srgb, var(--lp-gold) 28%, #fff)'
      : 'color-mix(in srgb, #fff 94%, transparent)'};
  color: var(--lp-navy);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.12);

  h3 {
    font-family: var(--lp-font-body);
    font-size: 0.98rem;
    font-weight: 700;
    margin: 0 0 0.2rem;
  }

  p {
    font-family: var(--lp-font-body);
    font-size: 0.82rem;
    line-height: 1.4;
    margin: 0;
    color: var(--lp-muted);
  }
`;

const HighlightIcon = styled.div`
  width: 2.55rem;
  height: 2.55rem;
  border-radius: 0.65rem;
  display: grid;
  place-items: center;
  font-size: 1.15rem;
  color: color-mix(in srgb, var(--lp-gold) 55%, #8a6a10);
  background: ${(p) =>
    p.$tone === 'gold'
      ? 'color-mix(in srgb, #fff 70%, var(--lp-gold))'
      : 'color-mix(in srgb, var(--lp-gold) 18%, #fff)'};
`;

const StatsBar = styled.div`
  margin-top: auto;
  background: color-mix(in srgb, #fff 92%, #e8eef5);
  border-top: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  color: var(--lp-navy);
`;

const StatsGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.35rem 1.1rem;
  border-right: 1px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);

  &:last-child {
    border-right: 0;
  }

  @media (max-width: 900px) {
    border-right: 0;
    border-bottom: 1px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);

    &:nth-child(odd) {
      border-right: 1px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);
    }

    &:nth-last-child(-n + 2) {
      border-bottom: 0;
    }
  }

  @media (max-width: 520px) {
    border-right: 0 !important;
    border-bottom: 1px solid color-mix(in srgb, var(--lp-navy) 10%, transparent);

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const StatIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.55rem;
  display: grid;
  place-items: center;
  color: color-mix(in srgb, var(--lp-gold) 50%, #8a6a10);
  background: color-mix(in srgb, var(--lp-gold) 16%, #fff);
  border: 1px solid color-mix(in srgb, var(--lp-gold) 40%, transparent);
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const StatCopy = styled.div`
  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--lp-navy);
  }

  span {
    font-family: var(--lp-font-body);
    font-size: 0.84rem;
    color: var(--lp-muted);
  }
`;

const iconMap = Fi;

const slideIn = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Split headline so an optional highlight word renders in gold italic.
 */
const renderHeadline = (headline, highlight) => {
  if (!highlight || !headline?.includes(highlight)) return headline;
  const parts = headline.split(highlight);
  return parts.reduce((acc, part, i) => {
    acc.push(part);
    if (i < parts.length - 1) {
      acc.push(<em key={`h-${i}`}>{highlight}</em>);
    }
    return acc;
  }, []);
};

const Home = ({ hero, features = [], stats = [], brandTitle }) => {
  const highlightCards = features.slice(0, 3);
  const bg = hero.heroImage;

  return (
    <HeroWrap id="home">
      <Backdrop aria-hidden>
        <BackdropFill src={bg} alt="" />
        <BackdropPhoto
          src={bg}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <BackdropShade />
      </Backdrop>

      <HeroMain>
        <Copy initial="hidden" animate="show" variants={stagger}>
          {brandTitle ? (
            <motion.div variants={fadeUp}>
              <BrandMark as="h1">{brandTitle}</BrandMark>
            </motion.div>
          ) : null}

          <motion.div variants={fadeUp}>
            <TagRow>
              <TagLine aria-hidden />
              <Tag>{hero.eyebrow}</Tag>
            </TagRow>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Title as={brandTitle ? 'p' : 'h1'}>
              {renderHeadline(hero.headline, hero.headlineHighlight)}
            </Title>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Body $color="color-mix(in srgb, #fff 82%, transparent)" $max="42ch">
              {hero.subhead}
            </Body>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Ctas>
              <BtnGold href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <Fi.FiArrowRight aria-hidden />
              </BtnGold>
              <BtnOutlineLight href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <Fi.FiArrowRight aria-hidden />
              </BtnOutlineLight>
            </Ctas>
          </motion.div>
        </Copy>

        <Highlights
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {highlightCards.map((f, i) => {
            const Icon = iconMap[f.icon] || Fi.FiCheck;
            const tone = i === 0 ? 'gold' : 'light';
            return (
              <Highlight key={f.title} variants={slideIn} $tone={tone}>
                <HighlightIcon $tone={tone}>
                  <Icon aria-hidden />
                </HighlightIcon>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </Highlight>
            );
          })}
        </Highlights>
      </HeroMain>

      {stats.length > 0 ? (
        <StatsBar>
          <StatsGrid
            as={motion.div}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={stagger}
          >
            {stats.map((s, i) => {
              const Icon = iconMap[s.icon] || Fi.FiAward;
              return (
                <Stat key={s.label} variants={fadeUp}>
                  <StatIcon>
                    <Icon aria-hidden />
                  </StatIcon>
                  <StatCopy>
                    <CountUp value={s.value} duration={1400 + i * 160} />
                    <span>{s.label}</span>
                  </StatCopy>
                </Stat>
              );
            })}
          </StatsGrid>
        </StatsBar>
      ) : null}
    </HeroWrap>
  );
};

export default Home;
