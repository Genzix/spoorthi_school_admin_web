import React, { useEffect, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSchool } from '@/context/SchoolContext';
import { resolveLanding } from '@/schools/landingContent';
import { landingFonts } from './styles';
import {
  useActiveSection,
  useHashSync,
  useSmoothNavigate,
} from './hooks';
import {
  ContactStrip,
  FaqChat,
  HeroCanvas,
  ImpactSection,
  QuoteSection,
  StaffFab,
  TeamSection,
  TopNav,
  ValuesSection,
} from './canvas';

const LandingGlobal = createGlobalStyle`
  ${landingFonts}

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
  --lp-navy: ${(p) => p.$theme.navy};
  --lp-gold: ${(p) => p.$theme.gold};
  --lp-surface: ${(p) => p.$theme.surface || '#F2F2F0'};
  --lp-muted: ${(p) => p.$theme.muted};
  --lp-ink: ${(p) => p.$theme.ink || '#161616'};
  --lp-lime: ${(p) => p.$theme.lime || '#B8F08A'};
  --lp-sky: ${(p) => p.$theme.sky || '#4F9DFF'};
  --lp-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --lp-font-display: 'Darker Grotesque', 'Outfit', system-ui, sans-serif;
  --lp-font-body: 'DM Sans', 'Outfit', system-ui, sans-serif;
  min-height: 100vh;
  color: var(--lp-ink);
  font-family: var(--lp-font-body);
  background:
    radial-gradient(
      1100px 520px at 8% -8%,
      color-mix(in srgb, var(--lp-sky) 22%, transparent),
      transparent 58%
    ),
    radial-gradient(
      900px 480px at 92% 12%,
      color-mix(in srgb, var(--lp-gold) 14%, transparent),
      transparent 52%
    ),
    radial-gradient(
      700px 400px at 50% 100%,
      color-mix(in srgb, var(--lp-sky) 10%, transparent),
      transparent 55%
    ),
    var(--lp-surface);
`;

const SECTION_IDS = [
  'home',
  'features',
  'collaborate',
  'goal',
  'partners',
  'faq',
  'contact',
];

/** Old hashes still in bookmarks / shared URLs. */
const LEGACY_HASH_MAP = {
  team: 'collaborate',
  board: 'features',
  about: 'features',
};

const LandingShell = () => {
  const { school } = useSchool();
  const landing = useMemo(() => resolveLanding(school), [school]);
  const navItems = useMemo(
    () => (landing.nav || []).filter((item) => SECTION_IDS.includes(item.id)),
    [landing.nav]
  );
  const activeId = useActiveSection(SECTION_IDS);
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
    const hash = LEGACY_HASH_MAP[raw] || raw;
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <Root className="lp-landing" $theme={landing.theme}>
      <LandingGlobal />
      <main>
        <HeroCanvas
          hero={landing.canvasHero}
          brandTitle={landing.brand.title}
        />
        <QuoteSection
          about={landing.about}
          stats={landing.stats}
          quote={landing.quote}
          collaboration={landing.collaboration}
        />
        <TeamSection
          team={landing.team}
          brandTitle={landing.brand.title}
          brandMark={landing.brand.mark}
        />
        <ValuesSection values={landing.values} />
        <ImpactSection impact={landing.impact} />
        <FaqChat faq={landing.faq} />
        <ContactStrip
          contact={landing.contact}
          schoolName={landing.brand.title}
          admissionCta={landing.hero?.admissionCta}
        />
      </main>
      <TopNav
        items={navItems}
        activeId={activeId === 'home' ? null : activeId}
        onNavigate={navigate}
        brandTitle={landing.brand.title}
        brandMark={landing.brand.mark}
        cta={landing.hero?.admissionCta || landing.canvasHero?.secondaryCta}
      />
      <StaffFab brand={landing.brand} />
    </Root>
  );
};

export default LandingShell;
