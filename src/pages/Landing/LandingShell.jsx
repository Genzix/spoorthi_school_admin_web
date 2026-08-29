import React, { useEffect, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSchool } from '@/context/SchoolContext';
import { resolveLanding } from '@/schools/landingContent';
import { isPressLanding } from '@/schools/landingTemplates';
import { landingFonts } from './styles';
import { ArtClipDefs } from './canvas/artLandingDecor';
import {
  useActiveSection,
  useHashSync,
  useSmoothNavigate,
} from './hooks';
import {
  ArtAboutSection,
  ContactStrip,
  FaqChat,
  HeroCanvas,
  ImpactSection,
  QuoteSection,
  SpoorthiNewsSection,
  SpoorthiAchievementsSection,
  StaffFab,
  TeamSection,
  TopNav,
  ValuesSection,
} from './canvas';

const LandingGlobal = createGlobalStyle`
  ${landingFonts}

  html,
  body {
    background-color: var(--lp-page-bg);
  }

  .lp-landing main {
    background-color: var(--lp-page-bg);
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const Root = styled.div`
  --lp-navy: ${(p) => p.$theme?.navy || '#0B1F3A'};
  --lp-gold: ${(p) => p.$theme?.gold || '#C9A227'};
  --lp-surface: ${(p) => p.$theme?.surface || '#F2F2F0'};
  --lp-muted: ${(p) => p.$theme?.muted || '#5B6575'};
  --lp-ink: ${(p) => p.$theme?.ink || '#161616'};
  --lp-lime: ${(p) => p.$theme?.lime || '#B8F08A'};
  --lp-sky: ${(p) => p.$theme?.sky || '#4F9DFF'};
  --lp-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --lp-font-display: 'Darker Grotesque', 'Outfit', system-ui, sans-serif;
  --lp-font-body: 'DM Sans', 'Outfit', system-ui, sans-serif;
  --lp-font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --lp-font-script: 'Pinyon Script', 'Brush Script MT', cursive;
  --lp-art-peach: #fde9de;
  --lp-art-peach-mid: #f8d8c5;
  --lp-art-peach-light: #fad4c0;
  --lp-art-salmon: #fbcdb9;
  --lp-art-coral: #e07a5a;
  --lp-art-terracotta: #c45c3e;
  --lp-art-ink: #3e2c23;
  --lp-art-accent: #c44d4d;
  min-height: 100vh;
  color: var(--lp-ink);
  font-family: var(--lp-font-body);
  background: var(--lp-page-bg);
`;

const LEGACY_HASH_MAP = {
  team: 'collaborate',
  board: 'features',
  'about-intro': 'about',
};

const navTargetId = (item) => item?.sectionId || item?.id;

const LandingShell = () => {
  const { school } = useSchool();
  const landing = useMemo(() => resolveLanding(school), [school]);
  const pressLanding = isPressLanding(landing, school);
  const navItems = useMemo(() => landing.nav || [], [landing.nav]);
  const sectionIds = useMemo(
    () => navItems.map(navTargetId).filter(Boolean),
    [navItems]
  );
  const legacyHashMap = useMemo(
    () =>
      pressLanding
        ? { ...LEGACY_HASH_MAP, features: 'news' }
        : LEGACY_HASH_MAP,
    [pressLanding]
  );
  const activeId = useActiveSection(sectionIds);
  const navigate = useSmoothNavigate();

  useHashSync(activeId, { enabled: true });

  useEffect(() => {
    const title = `${landing.brand.title} · Welcome`;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && landing.canvasHero?.subhead) {
      meta.setAttribute('content', landing.canvasHero.subhead);
    } else if (meta && landing.hero?.subhead) {
      meta.setAttribute('content', landing.hero.subhead);
    }
  }, [landing]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const raw = window.location.hash?.replace(/^#/, '');
    if (!raw) return undefined;
    const hash = legacyHashMap[raw] || raw;
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(t);
  }, [legacyHashMap]);

  const isGenCampus = school?.slug === 'gencampus';

  return (
    <Root className="lp-landing" $theme={landing.theme || {}}>
      <LandingGlobal />
      <ArtClipDefs />
      <main>
        <HeroCanvas
          hero={landing.canvasHero}
          brandTitle={landing.brand.title}
          variant={isGenCampus ? 'cinematic' : undefined}
        />
        {pressLanding ? (
          <>
            <ArtAboutSection about={landing.about} />
            <SpoorthiNewsSection sectionId="news" news={landing.news} />
            <SpoorthiAchievementsSection
              sectionId="achievements"
              successStories={landing.successStories}
            />
          </>
        ) : (
          <QuoteSection
            sectionId={landing.sections?.quote || 'features'}
            about={landing.about}
            stats={landing.stats}
            quote={landing.quote}
            collaboration={landing.collaboration}
          />
        )}
        <TeamSection
          team={landing.team}
          brandTitle={landing.brand.title}
          brandMark={landing.brand.mark}
        />
        <ValuesSection values={landing.values} />
        <ImpactSection impact={landing.impact} />
        {pressLanding ? null : <FaqChat faq={landing.faq} />}
        <ContactStrip
          contact={landing.contact}
          schoolName={landing.brand.title}
          admissionCta={landing.hero?.admissionCta}
        />
      </main>
      <TopNav
        items={navItems}
        activeId={activeId}
        onNavigate={navigate}
        brandTitle={landing.brand.title}
        brandMark={landing.brand.mark}
        cta={landing.hero?.admissionCta || landing.canvasHero?.secondaryCta}
        variant={isGenCampus ? 'dark' : 'peach'}
      />
      <StaffFab brand={landing.brand} variant={isGenCampus ? 'dark' : 'brand'} />
    </Root>
  );
};

export default LandingShell;
