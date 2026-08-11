import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { fadeUp, stagger } from './motion';
import {
  Body,
  Container,
  Eyebrow,
  Headline,
  Section,
} from './styles';

const Head = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    margin-inline: auto;
  }

  p {
    margin: 0.75rem auto 0;
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Shot = styled(motion.figure)`
  margin: 0;
  position: relative;
  border-radius: 0.85rem;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #dfe5ef;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s ease;
  }

  figcaption {
    position: absolute;
    inset: auto 0 0;
    padding: 0.85rem 1rem;
    font-family: var(--lp-font-body);
    font-size: 0.85rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(transparent, rgba(11, 31, 58, 0.72));
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Programs = styled(motion.div)`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Program = styled(motion.article)`
  border-radius: 0.9rem;
  overflow: hidden;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);

  .media {
    aspect-ratio: 16 / 10;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .copy {
    padding: 1.15rem 1.2rem 1.35rem;
  }

  h3 {
    font-family: var(--lp-font-display);
    font-size: 1.15rem;
    color: var(--lp-navy);
    margin: 0 0 0.4rem;
  }

  p {
    font-family: var(--lp-font-body);
    font-size: 0.94rem;
    line-height: 1.6;
    color: var(--lp-muted);
    margin: 0;
  }
`;

const Testimonials = styled(motion.div)`
  margin-top: 3.25rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Quote = styled(motion.blockquote)`
  margin: 0;
  padding: 1.4rem 1.3rem;
  border-radius: 0.9rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  box-shadow: 0 12px 28px rgba(11, 31, 58, 0.05);

  p {
    font-family: var(--lp-font-body);
    font-size: 0.98rem;
    line-height: 1.65;
    color: var(--lp-ink);
    margin: 0 0 1.15rem;
  }

  footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 0.98rem;
    color: var(--lp-navy);
  }

  span {
    font-family: var(--lp-font-body);
    font-size: 0.82rem;
    color: var(--lp-muted);
  }
`;

const Gallery = ({ gallery, programs, testimonials }) => (
  <Section id="gallery" style={{ background: 'var(--lp-surface)' }}>
    <Container>
      <Reveal>
        <Head>
          <Eyebrow>{gallery.eyebrow}</Eyebrow>
          <Headline as="h2" $max="18ch" style={{ marginInline: 'auto' }}>
            {gallery.headline}
          </Headline>
        </Head>
      </Reveal>

      <GalleryGrid
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        {gallery.items.map((item) => (
          <Shot key={item.src} variants={fadeUp}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </Shot>
        ))}
      </GalleryGrid>

      {programs?.items?.length ? (
        <>
          <Reveal>
            <Head style={{ marginTop: '3rem' }}>
              <Eyebrow>{programs.eyebrow}</Eyebrow>
              <Headline as="h2" $max="20ch" style={{ marginInline: 'auto' }}>
                {programs.headline}
              </Headline>
            </Head>
          </Reveal>
          <Programs
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {programs.items.map((p) => (
              <Program key={p.title} variants={fadeUp}>
                {p.image ? (
                  <div className="media">
                    <img src={p.image} alt="" loading="lazy" />
                  </div>
                ) : null}
                <div className="copy">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </Program>
            ))}
          </Programs>
        </>
      ) : null}

      {testimonials?.items?.length ? (
        <>
          <Reveal>
            <Head style={{ marginTop: '3.25rem' }}>
              <Eyebrow>{testimonials.eyebrow}</Eyebrow>
              <Headline as="h2" $max="18ch" style={{ marginInline: 'auto' }}>
                {testimonials.headline}
              </Headline>
              <Body $max="48ch" style={{ textAlign: 'center' }}>
                Teachers and leaders who bring the campus to life.
              </Body>
            </Head>
          </Reveal>
          <Testimonials
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {testimonials.items.map((t) => (
              <Quote key={t.name} variants={fadeUp}>
                <p>“{t.quote}”</p>
                <footer>
                  <img src={t.photo} alt="" loading="lazy" />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </footer>
              </Quote>
            ))}
          </Testimonials>
        </>
      ) : null}
    </Container>
  </Section>
);

export default Gallery;
