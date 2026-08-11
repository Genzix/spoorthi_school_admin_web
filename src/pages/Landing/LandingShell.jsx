import React, { useEffect, useMemo, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSchool } from '@/context/SchoolContext';
import { resolveLanding } from '@/schools/landingContent';
import { landingFonts } from './styles';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Services from './Services';
import Gallery from './Gallery';
import SuccessStories from './SuccessStories';
import Contact from './Contact';
import CtaBand from './CtaBand';
import Footer from './Footer';

const LandingGlobal = createGlobalStyle`
  ${landingFonts}

  html {
    scroll-behavior: smooth;
  }
`;

const Root = styled.div`
  --lp-navy: ${(p) => p.$theme.navy};
  --lp-gold: ${(p) => p.$theme.gold};
  --lp-surface: ${(p) => p.$theme.surface};
  --lp-muted: ${(p) => p.$theme.muted};
  --lp-ink: ${(p) => p.$theme.ink};
  min-height: 100vh;
  color: var(--lp-ink);
  font-family: var(--lp-font-body);
  background: #fff;
`;

const SECTION_IDS = ['home', 'about', 'services', 'success', 'gallery', 'contact'];

/**
 * Observe which landing section is in view for navbar active state.
 */
const useActiveSection = (ids = SECTION_IDS) => {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.08, 0.2, 0.4],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

const LandingShell = () => {
  const { school } = useSchool();
  const landing = useMemo(() => resolveLanding(school), [school]);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const title = `${landing.brand.title} · Welcome`;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && landing.hero?.subhead) {
      meta.setAttribute('content', landing.hero.subhead);
    }
  }, [landing]);

  return (
    <Root $theme={landing.theme}>
      <LandingGlobal />
      <Navbar
        brand={landing.brand}
        nav={landing.nav}
        admissionCta={landing.hero.admissionCta}
        activeId={activeId}
      />
      <main>
        <Home
          hero={landing.hero}
          features={landing.features}
          stats={landing.stats}
          brandTitle={landing.brand.title}
        />
        <About about={landing.about} stats={landing.stats} />
        <Services
          services={landing.services}
          admissionHref={landing.hero.admissionCta.href}
          admissionLabel={landing.hero.admissionCta.label}
        />
        <SuccessStories successStories={landing.successStories} />
        <Gallery
          gallery={landing.gallery}
          programs={landing.programs}
          testimonials={landing.testimonials}
        />
        <Contact
          contact={landing.contact}
          schoolName={landing.brand.title}
        />
        <CtaBand cta={landing.cta} />
      </main>
      <Footer
        brand={landing.brand}
        nav={landing.nav}
        footer={landing.footer}
      />
    </Root>
  );
};

export default LandingShell;
