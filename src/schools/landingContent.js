/**
 * Public marketing landing content, keyed by school slug.
 *
 * Shape is stable so UI stays data-driven: swap copy/images per tenant
 * without touching components. Unknown fields fall back via resolveLanding().
 */

import { deepMerge } from './remoteBranding';
import { darken, luminance, mixHex } from './palettes';
import { PLATFORM_FEATURES } from './platformFeatures';
import { LANDING_TEMPLATE } from './landingTemplates';

/**
 * @typedef {Object} LandingNavItem
 * @property {string} id — nav hash id (URL + active state)
 * @property {string} label
 * @property {string} [sectionId] — DOM section id when it differs from `id`
 */

/**
 * @typedef {Object} LandingSections
 * @property {string} [quote] — QuoteSection element id override
 */

/**
 * @typedef {Object} LandingFeature
 * @property {string} icon — react-icons/fi name key
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} LandingStat
 * @property {string} value
 * @property {string} label
 * @property {string} [icon]
 */

/**
 * @typedef {Object} LandingService
 * @property {string} icon
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} LandingGalleryItem
 * @property {string} src
 * @property {string} alt
 * @property {string} [caption]
 */

/**
 * @typedef {Object} LandingSuccessStory
 * @property {string} name
 * @property {string} score
 * @property {string} exam
 * @property {string} quote
 * @property {string} photo
 * @property {string} [photoCutout] — transparent PNG; person only, no backdrop
 * @property {boolean} [cutout] — skip blend when photo already has alpha
 */

/**
 * @typedef {Object} LandingTestimonial
 * @property {string} name
 * @property {string} role
 * @property {string} quote
 * @property {string} photo
 */

/**
 * @typedef {Object} LandingProgram
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 */

/**
 * @typedef {Object} LandingContact
 * @property {string} address
 * @property {string} phone
 * @property {string} [phoneSecondary]
 * @property {string} email
 * @property {string} hours
 * @property {string} [mapEmbedUrl]
 */

/**
 * @typedef {Object} LandingTheme
 * @property {string} navy
 * @property {string} gold
 * @property {string} surface
 * @property {string} muted
 * @property {string} ink
 */

/**
 * @typedef {Object} LandingContent
 * @property {'quote' | 'press'} [template] — layout key; see landingTemplates.js
 * @property {LandingTheme} theme
 * @property {{ mark: string, title: string, subtitle?: string }} brand
 * @property {LandingNavItem[]} nav
 * @property {LandingSections} [sections]
 * @property {{
 *   eyebrow: string,
 *   headline: string,
 *   headlineHighlight?: string,
 *   subhead: string,
 *   primaryCta: { label: string, href: string },
 *   secondaryCta: { label: string, href: string },
 *   admissionCta: { label: string, href: string },
 *   heroImage: string,
 *   heroImageAlt: string,
 * }} hero
 * @property {LandingFeature[]} features
 * @property {{
 *   eyebrow: string,
 *   headline: string,
 *   body: string,
 *   bullets: string[],
 *   tags?: Array<string | { icon?: string, label: string }>,
 *   image: string,
 *   imageAlt: string,
 *   hoverImage?: string,
 *   hoverImageAlt?: string,
 *   fraternityTitle?: string,
 *   fraternityImage?: string,
 *   fraternityImageAlt?: string,
 *   missionVision?: { eyebrow?: string, headline?: string, subhead?: string },
 *   mission: {
 *     title: string,
 *     headline?: string,
 *     body: string,
 *     icon?: string,
 *     tags?: Array<{ icon?: string, label: string }>
 *   },
 *   vision: {
 *     title: string,
 *     headline?: string,
 *     body: string,
 *     icon?: string,
 *     tags?: Array<{ icon?: string, label: string }>
 *   },
 * }} about
 * @property {LandingStat[]} stats
 * @property {{ eyebrow: string, headline: string, items: LandingService[] }} services
 * @property {{ eyebrow: string, headline: string, items: LandingGalleryItem[] }} gallery
 * @property {{ eyebrow: string, headline: string, subhead?: string, backgroundImage?: string, items: LandingSuccessStory[] }} successStories
 * @property {{
 *   headline: string,
 *   headlineItalic?: string,
 *   bodyBefore?: string,
 *   bodyEmph?: string,
 *   bodyAfter?: string,
 *   members: Array<{
 *     name: string,
 *     role?: string,
 *     photo?: string,
 *     quote?: string,
 *     org?: string,
 *     stats?: Array<{ value: string, label: string, hint?: string }>
 *   }>
 * }} [team]
 * @property {{ eyebrow: string, headline: string, items: LandingProgram[] }} [programs]
 * @property {LandingContact} contact
 * @property {{
 *   headline: string,
 *   headlineItalic?: string,
 *   body: string,
 *   partners?: Array<string | { name: string, type?: string, badge?: string, description?: string, image?: string, imageAlt?: string }>
 * }} [collaboration]
 * @property {{
 *   eyebrow?: string,
 *   headline?: string,
 *   body?: string,
 *   maxVisible?: number,
 *   viewAllHref?: string,
 *   viewAllLabel?: string,
 *   items: Array<{
 *     id?: string,
 *     title: string,
 *     excerpt?: string,
 *     date?: string,
 *     category?: string,
 *     image?: string,
 *     imageAlt?: string,
 *     source?: string,
 *     href?: string,
 *   }>
 * }} [news]
 * @property {{
 *   headline: string,
 *   body: string,
 *   ctaLabel: string,
 *   ctaHref: string,
 *   backgroundImage: string,
 * }} cta
 * @property {{ tagline: string, copyright: string }} footer
 */

/** High-quality education stock — replace per school with CDN/local assets. */
const MEDIA = Object.freeze({
  heroStudent:
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  aboutStudents: '/landing/about-students.png',
  aboutLibrary: '/landing/about-library.png',
  campus:
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85',
  schoolBuilding:
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=85',
  spoorthiCampus: '/landing/spoorthi-campus.png',
  fraternity:
    'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1800&q=85',
  classroom:
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80',
  sports:
    'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1000&q=80',
  arts:
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
  lab:
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
  library:
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
  staff1:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  staff2:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  staff3:
    'https://images.unsplash.com/photo-1580894732440-8ec89467c2d0?auto=format&fit=crop&w=400&q=80',
  students2:
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
  student1:
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
  student2:
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
  student3:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  student4:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  student5:
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  student6:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  student7:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  student8:
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80',
  student9:
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  student10:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
  achieverCutouts: Object.freeze({
    student01: '/landing/achievers/student-01-cutout.png',
    student02: '/landing/achievers/student-02-cutout.png',
    student03: '/landing/achievers/student-03-cutout.png',
    student04: '/landing/achievers/student-04-cutout.png',
    student05: '/landing/achievers/student-05-cutout.png',
    student06: '/landing/achievers/student-06-cutout.png',
    student07: '/landing/achievers/student-07-cutout.png',
    student08: '/landing/achievers/student-08-cutout.png',
    student09: '/landing/achievers/student-09-cutout.png',
    student10: '/landing/achievers/student-10-cutout.png',
  }),
});

const DEFAULT_NAV = Object.freeze([
  { id: 'features', label: 'Features' },
  { id: 'goal', label: 'Goal' },
  { id: 'partners', label: 'Partners' },
  { id: 'collaborate', label: 'Collaborate' },
  { id: 'faq', label: 'FAQ' },
]);

/** Press / campus template — news + achievements (Spoorthi, TechCampus). */
const PRESS_NAV = Object.freeze([
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'news', label: 'News' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]);

/** Retired section hashes — drop even if a school overlay / CMS still sends them. */
const RETIRED_NAV_IDS = new Set(['board']);

/** Old nav ids still present in overlays / CMS. */
const NAV_ID_ALIASES = Object.freeze({
  about: 'features',
  success: 'achievements',
  stories: 'achievements',
});

const isAboutUsNav = (item) =>
  item?.id === 'about' && /about/i.test(item.label || '');

const sanitizeNav = (nav) => {
  const seen = new Set();
  return (Array.isArray(nav) ? nav : [])
    .map((item) => {
      if (!item?.id) return null;
      const id = isAboutUsNav(item)
        ? 'about'
        : NAV_ID_ALIASES[item.id] || item.id;
      if (RETIRED_NAV_IDS.has(item.id) || RETIRED_NAV_IDS.has(id)) return null;
      const label =
        item.id === 'about' &&
        !isAboutUsNav(item) &&
        (!item.label || item.label === 'About')
          ? 'Features'
          : item.label;
      return { ...item, id, label };
    })
    .filter((item) => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
};

/** Marquee tags for the About hero — school-admin platform features. */
const DEFAULT_ABOUT_TAGS = PLATFORM_FEATURES;

/**
 * Canvas / collage landing blocks (holi-inspired layout).
 * Kept data-driven so each school can override copy & media.
 */
const createCanvasBlocks = (school, media) => {
  const name = school?.displayName || 'Our School';
  const legal = school?.legalName || name;

  return {
    canvasHero: {
      headline: 'Where curiosity meets character.',
      subhead: `${legal} is where young minds grow into confident, kind leaders.`,
      primaryCta: { label: 'Explore campus', href: '#features' },
      secondaryCta: { label: 'Talk to us', href: '#contact' },
      backgroundImage: media.campus || media.classroom,
      backgroundAlt: `${name} campus`,
      floatImages: [
        {
          src: media.classroom,
          alt: 'Students learning together',
        },
        {
          src: media.students2,
          alt: 'Campus community',
        },
        {
          src: media.sports,
          alt: 'Sports and teamwork',
        },
        {
          src: media.arts,
          alt: 'Creative arts',
        },
      ],
    },
    values: {
      headline: 'Every child can shape tomorrow',
      items: [
        {
          title: 'Digital fluency',
          titleItalic: 'Digital',
          description:
            'Modern classrooms and tools that help students learn with confidence.',
          image: media.lab,
          imageAlt: 'Technology-enabled learning',
        },
        {
          title: 'Open minds',
          titleItalic: 'minds',
          description:
            'A culture of questions, projects, and collaboration across ages.',
          image: media.library,
          imageAlt: 'Students collaborating',
        },
        {
          title: 'Not-for-show values',
          titleItalic: 'values',
          description:
            'Character, kindness, and responsibility lived daily — not only taught.',
          image: media.fraternity,
          imageAlt: 'Community and values',
        },
      ],
    },
    quote: {
      headline: 'Small steps, lasting impact.',
      headlineItalic: 'impact',
      body: `At ${name}, every lesson, club, and conversation is designed to help students grow into people who contribute.`,
      author: {
        name: 'Ananya Rao',
        role: 'Principal',
        photo: media.staff1,
      },
    },
    collaboration: {
      headline: 'Power of collaboration',
      headlineItalic: 'collaboration',
      body: `Families, teachers, and mentors form a sounding board around every learner — so progress feels shared, steady, and joyful.`,
    },
    team: {
      headline: 'Power of collaboration',
      headlineItalic: 'collaboration',
      bodyBefore: 'Our',
      bodyEmph: 'sounding board',
      bodyAfter:
        'of educators and mentors keeps teaching human — curious, kind, and ambitious.',
      members: [
        {
          name: 'Ananya Rao',
          role: 'Principal',
          photo: media.staff1,
          quote:
            'Every child deserves adults who listen first — then stretch them with care and high expectations.',
          stats: [
            { value: '18+', label: 'Years leading', hint: 'Across campus life' },
            { value: '96%', label: 'Family trust', hint: 'Annual survey' },
          ],
        },
        {
          name: 'Rahul Mehta',
          role: 'Academics',
          photo: media.staff2,
          quote:
            'Rigor and curiosity belong together. When lessons feel alive, results follow naturally.',
          stats: [
            { value: '2x', label: 'Project depth', hint: 'Vs prior term' },
            { value: '89%', label: 'Board readiness', hint: 'Tracked cohorts' },
          ],
        },
        {
          name: 'Priya Nair',
          role: 'Counsellor',
          photo: media.staff3,
          quote:
            'Wellbeing is not a side program — it is the quiet condition for real learning.',
          stats: [
            { value: '320+', label: 'Check-ins', hint: 'This academic year' },
            { value: '4.8', label: 'Care rating', hint: 'Family feedback' },
          ],
        },
        {
          name: 'Kabir Singh',
          role: 'Sports lead',
          photo: media.student7,
          quote:
            'We train grit and kindness in the same session — that balance shapes character.',
          stats: [
            { value: '14', label: 'Teams active', hint: 'Across houses' },
            { value: '3x', label: 'Participation', hint: 'Since last year' },
          ],
        },
        {
          name: 'Meera Joshi',
          role: 'Arts lead',
          photo: media.student8,
          quote:
            'Art gives students a voice before they have the perfect words — and that confidence spills into class.',
          stats: [
            { value: '48', label: 'Showcases', hint: 'Campus & community' },
            { value: '92%', label: 'Club retention', hint: 'Year over year' },
          ],
        },
        {
          name: 'Dev Patel',
          role: 'STEM lead',
          photo: media.student9,
          quote:
            'Labs should feel like workshops for imagination — students build, fail, and invent out loud.',
          stats: [
            { value: '65%', label: 'STEM electives', hint: 'Upper grades' },
            { value: '11', label: 'Open projects', hint: 'Running now' },
          ],
        },
        {
          name: 'Aisha Khan',
          role: 'House mentor',
          photo: media.student10,
          quote:
            'A house is a second family on campus — belonging is the first academic advantage we give.',
          stats: [
            { value: '4', label: 'House communities', hint: 'Whole campus' },
            { value: '100%', label: 'Mentor coverage', hint: 'Every learner' },
          ],
        },
      ],
    },
    impact: {
      headline: 'Impact tools united: achieve more, together.',
      subhead:
        'One campus for academics, wellbeing, clubs, secure records, and family partnership.',
      cta: { label: 'Become a partner', href: '#contact' },
      testimonials: [
        {
          name: 'Neha Kapoor',
          role: 'Parent · Grade 6',
          quote:
            'Teachers know my child as a person — not only as a marksheet. That changes everything.',
          photo: media.student4,
        },
        {
          name: 'Vikram Shah',
          role: 'Alumni parent',
          quote:
            'The campus culture is ambitious and warm. Our daughter found her voice here.',
          photo: media.staff2,
        },
        {
          name: 'Sana Ali',
          role: 'Partner NGO',
          quote:
            'Student volunteers show up prepared, curious, and ready to serve the community.',
          photo: media.student6,
        },
        {
          name: 'Arjun Desai',
          role: 'Sports coach',
          quote:
            `We train grit and kindness in the same session — that is the ${name} difference.`,
          photo: media.student3,
        },
      ],
      partners: [
        'City Library',
        'STEM Hub',
        'Green Schools',
        'Youth Sports',
        'Arts Council',
        'Health First',
      ],
    },
    faq: {
      headline: 'Frequently asked questions',
      items: [
        {
          category: 'Admissions',
          asker: 'Curious parent',
          question: 'When do admissions open for the next academic year?',
          answer:
            'Applications typically open in November. We host open days each term — book a visit from the contact section and we will guide you through documents and assessments.',
          author: { name: 'Priya Nair', role: 'Admissions', photo: media.staff3 },
        },
        {
          category: 'Campus',
          asker: 'New family',
          question: 'Is transport available across the city?',
          answer:
            'Yes. We run monitored routes with GPS-enabled buses. Share your locality when you enquire and we will confirm the nearest pick-up point.',
          author: { name: 'Rahul Mehta', role: 'Operations', photo: media.staff2 },
        },
        {
          category: 'Academics',
          asker: 'Intrigued human',
          question: 'How do you balance boards prep with creativity?',
          answer:
            'Core academics stay rigorous, while clubs, labs, and project weeks keep curiosity alive. Mentors track both progress and wellbeing so students do not burn out.',
          author: { name: 'Ananya Rao', role: 'Principal', photo: media.staff1 },
        },
        {
          category: 'Campus',
          asker: 'Curious parent',
          question: 'What does a typical school day feel like?',
          answer:
            'Mornings focus on deep learning blocks; afternoons open into sports, arts, and electives. Homeroom check-ins keep every student seen.',
          author: { name: 'Meera Joshi', role: 'House mentor', photo: media.student8 },
        },
        {
          category: 'Admissions',
          asker: 'Transfer family',
          question: 'Can mid-year transfers join?',
          answer:
            'We review mid-year requests case by case based on seat availability and learning continuity. Reach out with the current grade and we will advise next steps within a few days.',
          author: { name: 'Priya Nair', role: 'Admissions', photo: media.staff3 },
        },
        {
          category: 'Academics',
          asker: 'Intrigued human',
          question: 'Do you offer support for different learning needs?',
          answer:
            'Yes. Our counselling and learning-support team partners with teachers and families on personalized plans — quietly, respectfully, and with clear goals.',
          author: { name: 'Priya Nair', role: 'Counsellor', photo: media.staff3 },
        },
      ],
    },
  };
};

/**
 * Derive a landing navy/gold pair from the CRM palette.
 * Amber-primary schools (Spoorthi) use parent blue as landing navy.
 * @param {import('./registry').SchoolConfig} school
 * @returns {LandingTheme}
 */
/**
 * Derive landing theme from CRM palette.
 * GenCampus gets deep brand navy + gold + soft sky highlight;
 * Spoorthi (and others) keep navy/gold with lime canvas accents.
 * @param {import('./registry').SchoolConfig} school
 * @returns {LandingTheme}
 */
export const themeFromSchool = (school) => {
  const p = school?.palette;
  const slug = school?.slug;

  if (!p) {
    return {
      navy: '#0B1F3A',
      gold: '#C9A227',
      surface: '#F2F2F0',
      muted: '#5B6575',
      ink: '#161616',
      lime: '#B8F08A',
      sky: '#4F9DFF',
    };
  }

  if (slug === 'gencampus') {
    return {
      navy: '#001A41',
      gold: p.accent || '#F5A623',
      surface: '#F3F6FA',
      muted: '#5A6B7D',
      ink: '#0B1524',
      // Soft sky wash — GenCampus primary tint (replaces lime pills)
      lime: mixHex(p.primary || '#7AA8E0', '#FFFFFF', 0.42),
      sky: p.primary || '#7AA8E0',
    };
  }

  if (slug === 'techcampus') {
    return {
      navy: '#062A2E',
      gold: p.accent || '#2EC4B6',
      surface: '#F3FAF8',
      muted: '#4F6B6F',
      ink: '#0B1C1E',
      lime: mixHex(p.accent || '#2EC4B6', '#FFFFFF', 0.38),
      sky: p.primaryLight || '#2A6B78',
    };
  }

  const primaryIsDark = luminance(p.primary) < 0.35;
  const navy = primaryIsDark
    ? darken(p.primary, 0.22)
    : p.parentPrimary || '#0B1F3A';
  const gold = p.accent || p.secondary || '#C9A227';

  return {
    navy,
    gold,
    surface: '#F2F2F0',
    muted: '#5B6575',
    ink: '#161616',
    lime: '#B8F08A',
    sky: '#4F9DFF',
  };
};

/**
 * Sensible defaults from SchoolConfig — new schools work without a full override.
 * @param {import('./registry').SchoolConfig} school
 * @returns {LandingContent}
 */
export const createLandingFromSchool = (school) => {
  const name = school?.displayName || 'Our School';
  const legal = school?.legalName || name;
  const theme = themeFromSchool(school);
  const canvas = createCanvasBlocks(school, MEDIA);
  const template =
    school?.landingTemplate === LANDING_TEMPLATE.press
      ? LANDING_TEMPLATE.press
      : LANDING_TEMPLATE.quote;

  return {
    template,
    theme,
    brand: {
      mark: school?.logo?.mark || school?.logo?.wordmark || '',
      title: name,
      subtitle: 'INTERNATIONAL SCHOOL',
    },
    nav: template === LANDING_TEMPLATE.press ? [...PRESS_NAV] : [...DEFAULT_NAV],
    hero: {
      eyebrow: `NURTURING MINDS. BUILDING FUTURES.`,
      headline: 'Education Today, Leaders Tomorrow.',
      headlineHighlight: 'Leaders',
      subhead: `${legal} provides a nurturing environment where every child discovers curiosity, confidence, and character.`,
      primaryCta: { label: 'Discover More', href: '#features' },
      secondaryCta: { label: 'Contact Us', href: '#contact' },
      admissionCta: { label: 'Apply Now', href: '#contact' },
      heroImage: MEDIA.schoolBuilding,
      heroImageAlt: `School building at ${name}`,
    },
    ...canvas,
    features: [
      {
        icon: 'FiMonitor',
        title: 'Modern Classrooms',
        description: 'Smart boards, calm lighting, and spaces built for focused learning.',
        image: MEDIA.classroom,
        imageAlt: 'Modern classroom',
        points: [
          'Interactive displays in every core classroom',
          'Flexible seating for group and solo work',
          'Tech that supports teachers — never distracts students',
        ],
      },
      {
        icon: 'FiUsers',
        title: 'Expert Teachers',
        description: 'Mentors who know each learner — academically and personally.',
        image: MEDIA.students2,
        imageAlt: 'Teachers with students',
        points: [
          'Subject specialists with continuous training',
          'Homeroom mentors who track wellbeing',
          'Open feedback loops with families',
        ],
      },
      {
        icon: 'FiBookOpen',
        title: 'Holistic Growth',
        description: 'Academics, sports, arts, and values in one balanced rhythm.',
        image: MEDIA.sports,
        imageAlt: 'Sports and holistic growth',
        points: [
          'Clubs and electives that build confidence',
          'Fitness and arts woven into the week',
          'Character habits practiced daily',
        ],
      },
      {
        icon: 'FiShield',
        title: 'Safe Environment',
        description: 'A secure campus where students feel seen and protected.',
        image: MEDIA.campus,
        imageAlt: 'Safe school campus',
        points: [
          'Monitored entry and transport systems',
          'Clear safeguarding policies',
          'Counselling support when students need it',
        ],
      },
      {
        icon: 'FiActivity',
        title: 'Sports & Fitness',
        description: 'Structured games that build grit, teamwork, and wellness.',
        image: MEDIA.sports,
        imageAlt: 'Sports and fitness',
        points: [
          'Age-ready coaching across major sports',
          'Fitness goals tracked with kindness',
          'House competitions that spark belonging',
        ],
      },
      {
        icon: 'FiMusic',
        title: 'Arts & Culture',
        description: 'Music, dance, and visual arts that celebrate creative voice.',
        image: MEDIA.arts,
        imageAlt: 'Arts and culture',
        points: [
          'Studio time for music and visual arts',
          'Performance showcases each term',
          'Culture celebrated beyond textbooks',
        ],
      },
    ],
    about: {
      eyebrow: 'Features',
      headline: 'The best way to grow\na curious mind',
      body: `${legal} brings academics, character, and belonging into one calm rhythm — so students drop the noise and focus on work that lasts.`,
      bullets: [
        'Academic Excellence',
        'Character Building',
        'Creative Learning',
        'Global Perspective',
      ],
      tags: [...DEFAULT_ABOUT_TAGS],
      image: MEDIA.schoolBuilding,
      imageAlt: `Campus at ${name}`,
      hoverImage: MEDIA.aboutStudents,
      hoverImageAlt: `Students reading at ${name}`,
      fraternityTitle: 'Our Fraternity',
      fraternityImage: MEDIA.fraternity,
      fraternityImageAlt: `Our fraternity at ${name}`,
      missionVision: {
        eyebrow: 'Who We Are',
        headline: 'Our Mission & Vision',
        subhead:
          'Guided by purpose. Driven by values. Committed to building a better future for every learner.',
      },
      mission: {
        title: 'Our Mission',
        headline: 'Empowering Every Learner',
        body: `To empower every learner with knowledge, values, and skills to thrive in an ever-changing world.`,
        icon: 'FiCrosshair',
        tags: [
          { icon: 'FiBookOpen', label: 'Quality Education' },
          { icon: 'FiTrendingUp', label: 'Personal Growth' },
          { icon: 'FiSend', label: 'Future Ready' },
        ],
      },
      vision: {
        title: 'Our Vision',
        headline: 'Shaping Tomorrow’s Leaders',
        body: `To be a leading school community where curiosity, compassion, and courage shape tomorrow’s leaders.`,
        icon: 'FiEye',
        tags: [
          { icon: 'FiSearch', label: 'Curiosity' },
          { icon: 'FiHeart', label: 'Compassion' },
          { icon: 'FiShield', label: 'Courage' },
        ],
      },
    },
    stats: [
      { value: '3200+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '250+', label: 'Expert Teachers', icon: 'FiUserCheck' },
      { value: '20+', label: 'Awards Won', icon: 'FiAward' },
      { value: '25+', label: 'Years of Excellence', icon: 'FiHome' },
    ],
    services: {
      eyebrow: 'WHAT WE OFFER',
      headline: 'Holistic Services For Every Student.',
      items: [
        {
          icon: 'FiBookOpen',
          title: 'Academics',
          description:
            'A rigorous curriculum that builds strong foundations and joyful lifelong learning.',
        },
        {
          icon: 'FiActivity',
          title: 'Sports & Fitness',
          description:
            'Structured games and fitness programs that build teamwork, grit, and wellness.',
        },
        {
          icon: 'FiMusic',
          title: 'Arts & Culture',
          description:
            'Music, dance, and visual arts that celebrate creativity and cultural roots.',
        },
        {
          icon: 'FiHeart',
          title: 'Life Skills',
          description:
            'Communication, leadership, and values that prepare students beyond the classroom.',
        },
      ],
    },
    gallery: {
      eyebrow: 'CAMPUS LIFE',
      headline: 'Moments From Our School.',
      items: [
        { src: MEDIA.classroom, alt: 'Classroom learning', caption: 'Smart classrooms' },
        { src: MEDIA.sports, alt: 'Sports day', caption: 'Sports & fitness' },
        { src: MEDIA.arts, alt: 'Art activity', caption: 'Arts studio' },
        { src: MEDIA.lab, alt: 'Science lab', caption: 'Science labs' },
        { src: MEDIA.library, alt: 'Library', caption: 'Library' },
        { src: MEDIA.students2, alt: 'Students collaborating', caption: 'Collaboration' },
      ],
    },
    successStories: {
      eyebrow: 'RESULTS THAT SPEAK',
      headline: 'Success Stories.',
      subhead: `Proud moments from students who grew, worked hard, and excelled at ${name}.`,
      backgroundImage: MEDIA.spoorthiCampus,
      items: [
        {
          name: 'Riddhi Sharma',
          score: '499/500',
          exam: 'CBSE-X 2026',
          quote: `${name} gave me the right guidance and confidence to aim higher every day.`,
          photo: MEDIA.student1,
        },
        {
          name: 'Ananya Verma',
          score: '497/500',
          exam: 'CBSE-X 2026',
          quote: 'Teachers here made every concept clear — I always felt supported and motivated.',
          photo: MEDIA.student2,
        },
        {
          name: 'Arjun Mehta',
          score: '495/500',
          exam: 'CBSE-X 2026',
          quote: `From doubt sessions to daily practice, ${name} helped me unlock my best score.`,
          photo: MEDIA.student3,
        },
        {
          name: 'Sneha Reddy',
          score: '492/500',
          exam: 'CBSE-X 2026',
          quote: 'The mentors pushed me kindly and consistently — results followed naturally.',
          photo: MEDIA.student4,
        },
        {
          name: 'Rohan Kapoor',
          score: '490/500',
          exam: 'CBSE-X 2026',
          quote: `Weekly tests and feedback at ${name} turned my weak areas into strengths.`,
          photo: MEDIA.student5,
        },
        {
          name: 'Ishita Nair',
          score: '488/500',
          exam: 'CBSE-X 2026',
          quote: 'I loved how teachers celebrated progress, not only final marks.',
          photo: MEDIA.student6,
        },
        {
          name: 'Kabir Singh',
          score: '486/500',
          exam: 'CBSE-X 2026',
          quote: 'Peer study circles and faculty support made tough chapters feel doable.',
          photo: MEDIA.student7,
        },
        {
          name: 'Meera Joshi',
          score: '485/500',
          exam: 'CBSE-X 2026',
          quote: `${name} built my confidence in science and helped me stay exam-ready.`,
          photo: MEDIA.student8,
        },
        {
          name: 'Dev Patel',
          score: '483/500',
          exam: 'CBSE-X 2026',
          quote: 'Clear planning, caring teachers, and a focused campus culture made the difference.',
          photo: MEDIA.student9,
        },
        {
          name: 'Aisha Khan',
          score: '481/500',
          exam: 'CBSE-X 2026',
          quote: 'I am grateful for the personal attention that helped me finish strong.',
          photo: MEDIA.student10,
        },
      ],
    },
    testimonials: {
      eyebrow: 'OUR PEOPLE',
      headline: 'Voices From Our Faculty.',
      items: [
        {
          name: 'Ananya Rao',
          role: 'Principal',
          quote:
            'Every child deserves a campus that feels safe, joyful, and ambitious — that is the culture we build every day.',
          photo: MEDIA.staff1,
        },
        {
          name: 'Rahul Mehta',
          role: 'Head of Academics',
          quote:
            'We measure success not only in marks, but in how confidently our students ask the next question.',
          photo: MEDIA.staff2,
        },
        {
          name: 'Priya Nair',
          role: 'Student Counsellor',
          quote:
            'When families and teachers partner closely, students grow into kinder, stronger young adults.',
          photo: MEDIA.staff3,
        },
      ],
    },
    news: {
      eyebrow: 'News',
      headline: `Stories from ${name}`,
      body:
        'Campus highlights, student achievements, and community updates from our school bulletin.',
      maxVisible: 3,
      viewAllHref: '#contact',
      viewAllLabel: 'Talk to admissions',
      items: [
        {
          id: 'campus-open-day',
          title: `${name} hosts families for a campus open day`,
          excerpt:
            'Parents toured labs, studios, and classrooms while students led project walkthroughs across every grade.',
          date: '2026-02-12',
          category: 'Campus',
          image: MEDIA.campus,
          imageAlt: `${name} campus open day`,
          source: 'School Bulletin',
          href: '#contact',
        },
        {
          id: 'stem-showcase',
          title: 'Students present original STEM and design projects',
          excerpt:
            'Innovation labs featured robotics, clean-energy models, and student-built apps judged by visiting mentors.',
          date: '2026-01-22',
          category: 'Achievement',
          image: MEDIA.lab,
          imageAlt: 'Students presenting a STEM project',
          source: 'Campus Chronicle',
          href: '#contact',
        },
        {
          id: 'admissions-window',
          title: 'Admissions open for the next academic year',
          excerpt:
            'Campus tours run on Saturday mornings. Limited seats remain across early years and middle school.',
          date: '2026-01-08',
          category: 'Admissions',
          image: MEDIA.schoolBuilding,
          imageAlt: `${name} school entrance`,
          source: 'Admissions Desk',
          href: '#contact',
        },
      ],
    },
    programs: {
      eyebrow: 'PROGRAMS',
      headline: 'Pathways Built For Growing Minds.',
      items: [
        {
          title: 'Early Years',
          description: 'Play-led foundations in literacy, numeracy, and social confidence.',
          image: MEDIA.classroom,
        },
        {
          title: 'Primary Years',
          description: 'Inquiry projects, strong basics, and habits of independent learning.',
          image: MEDIA.library,
        },
        {
          title: 'Secondary Years',
          description: 'Subject depth, boards readiness, and leadership opportunities.',
          image: MEDIA.lab,
        },
      ],
    },
    contact: {
      address: school?.receipt?.address || '123 School Street, City, State',
      phone: '+91 98765 43210',
      phoneSecondary: '+91 98765 43211',
      email: `admissions@${String(school?.slug || 'school')}.edu`,
      hours: 'Mon – Sat: 8:00 AM – 4:00 PM',
      mapEmbedUrl: '',
    },
    cta: {
      headline: `Ready To Shape A Bright Future?`,
      body: `Join ${legal} and give your child the best start in life.`,
      ctaLabel: 'Admission Open',
      ctaHref: '#contact',
      backgroundImage: MEDIA.campus,
    },
    footer: {
      tagline: 'Inspiring minds. Building character. Shaping futures.',
      copyright: school?.receipt?.footer || `© ${legal}`,
    },
  };
};

/** @type {Record<string, Partial<LandingContent>>} */
export const LANDING_BY_SLUG = Object.freeze({
  spoorthi: {
    template: LANDING_TEMPLATE.press,
    nav: [...PRESS_NAV],
    sections: {
      quote: 'news',
    },
    brand: {
      subtitle: 'EDUCATIONAL INSTITUTE',
    },
    hero: {
      eyebrow: 'NURTURING MINDS. BUILDING FUTURES.',
      headline: 'Education Today, Leaders Tomorrow.',
      headlineHighlight: 'Leaders',
      subhead:
        'Spoorthi Educational Institute nurtures curiosity and character — a place where every child is seen, challenged, and celebrated.',
      primaryCta: { label: 'Discover More', href: '#about' },
      admissionCta: { label: 'Apply Now', href: '#contact' },
      heroImage: MEDIA.spoorthiCampus,
      heroImageAlt: 'Spoorthi School building and campus courtyard',
    },
    canvasHero: {
      headlineBefore: 'We grow minds that',
      headlineScript: 'connect & inspire',
      headline: 'Where ideas meet action.',
      subhead:
        'The campus for curious learners — where families and teachers grow futures together.',
      primaryCta: { label: 'Explore Spoorthi', href: '#about' },
      secondaryCta: { label: "Let's Chat", href: '#contact' },
      badgeTitle: 'Campus life',
      services: [
        'Academics',
        'Arts & Sports',
        'Character',
        'Community',
      ],
      heroImage: MEDIA.spoorthiCampus,
      heroImageAlt: 'Spoorthi School building and campus courtyard',
      backgroundImage: MEDIA.spoorthiCampus,
      backgroundAlt: 'Spoorthi School building and campus courtyard',
      floatImages: [
        {
          src: MEDIA.spoorthiCampus,
          alt: 'Spoorthi campus',
        },
        {
          src: MEDIA.aboutStudents,
          alt: 'Students at Spoorthi',
        },
        {
          src: MEDIA.fraternity,
          alt: 'Community at Spoorthi',
        },
        {
          src: MEDIA.aboutLibrary,
          alt: 'Learning spaces',
        },
      ],
    },
    values: {
      headline: 'Every learner can create positive change',
      items: [
        {
          title: 'Digital belonging',
          titleItalic: 'Digital',
          description:
            'Smart classrooms and digital fluency woven into everyday learning.',
          image: MEDIA.lab,
          imageAlt: 'Digital learning at Spoorthi',
        },
        {
          title: 'Open source thinking',
          titleItalic: 'source',
          description:
            'We share methods, celebrate questions, and learn in the open.',
          image: MEDIA.aboutLibrary,
          imageAlt: 'Library and inquiry',
        },
        {
          title: 'Not-for-sale values',
          titleItalic: 'sale',
          description:
            'Character and care stay at the center — never secondary to scores.',
          image: MEDIA.fraternity,
          imageAlt: 'Values in action',
        },
      ],
    },
    quote: {
      headline: 'Small deeds, lasting impact.',
      headlineItalic: 'impact',
      body: 'At Spoorthi, daily habits of curiosity and kindness compound into futures students are proud of.',
      author: {
        name: 'Ananya Rao',
        role: 'Principal',
        photo: MEDIA.staff1,
      },
    },
    impact: {
      headline: 'Learning tools united: achieve more, together.',
      subhead:
        'Academics, clubs, counselling, secure records, and family partnership — one campus rhythm.',
      cta: { label: 'Partner with Spoorthi', href: '#contact' },
      partners: [
        'City Library',
        'STEM Hub',
        'Green Schools',
        'Youth Sports',
        'Arts Council',
        'Health First',
        'EduTrust',
        'Local Council',
      ],
    },
    cta: {
      headline: 'Ready To Shape A Bright Future?',
      body: 'Join Spoorthi Educational Institute and give your child the best start in life.',
      backgroundImage: MEDIA.spoorthiCampus,
    },
    about: {
      headline: 'The best way to grow\na curious mind',
      body: 'Spoorthi streamlines learning around what actually lasts — curiosity, character, and confident work. Families stay close, so every child can focus on becoming their best.',
      image: MEDIA.spoorthiCampus,
      imageAlt: 'Students arriving at Spoorthi International School',
      hoverImage: MEDIA.aboutStudents,
      hoverImageAlt: 'Students reading at Spoorthi',
      fraternityTitle: 'Our Fraternity',
      fraternityImage: MEDIA.fraternity,
      missionVision: {
        eyebrow: 'Who We Are',
        headline: 'Our Mission & Vision',
        subhead:
          'Guided by purpose. Driven by values. Committed to building a better future for every learner.',
      },
    },
    news: {
      eyebrow: 'News',
      headline: 'Stories from Spoorthi',
      body:
        'Campus highlights, student achievements, and community updates — curated from our school bulletin and local press.',
      maxVisible: 3,
      viewAllHref: '#contact',
      viewAllLabel: 'Talk to admissions',
      items: [
        {
          id: 'annual-day-2026',
          title: 'Annual Day celebrates student talent across arts and academics',
          excerpt:
            'Families filled the auditorium as Spoorthi students showcased music, dance, and project exhibitions from every grade.',
          date: '2026-02-14',
          category: 'Campus',
          image: MEDIA.spoorthiCampus,
          imageAlt: 'Spoorthi Annual Day celebration on campus',
          source: 'School Bulletin',
          href: '#contact',
        },
        {
          id: 'science-fair-win',
          title: 'Spoorthi teams place first at regional science fair',
          excerpt:
            'Middle-school innovators earned top honours for sustainable water-filtration prototypes built in the campus STEM lab.',
          date: '2026-01-28',
          category: 'Achievement',
          image: MEDIA.lab,
          imageAlt: 'Students presenting a science project',
          source: 'Deccan Herald',
          href: '#contact',
        },
        {
          id: 'admissions-2026',
          title: 'Admissions open for Academic Year 2026–27',
          excerpt:
            'Limited seats remain across early years and middle school. Campus tours run every Saturday morning with our admissions team.',
          date: '2026-01-10',
          category: 'Admissions',
          image: '/landing/spoorthi-building.png',
          imageAlt: 'Spoorthi school building entrance',
          source: 'Admissions Desk',
          href: '#contact',
        },
        {
          id: 'library-drive',
          title: 'Community book drive expands the Spoorthi library',
          excerpt:
            'Parents and alumni donated over 1,200 titles this term, giving every learner more room to explore beyond the syllabus.',
          date: '2025-12-05',
          category: 'Community',
          image: MEDIA.aboutLibrary,
          imageAlt: 'Students reading in the Spoorthi library',
          source: 'Campus Chronicle',
          href: '#contact',
        },
        {
          id: 'sports-meet',
          title: 'Inter-house athletics meet crowns Sapphire house champions',
          excerpt:
            'Track, relay, and team games brought the whole campus together for a day of grit, teamwork, and house spirit.',
          date: '2025-11-18',
          category: 'Sports',
          image: MEDIA.sports,
          imageAlt: 'Students competing in school athletics',
          source: 'Sports Desk',
          href: '#contact',
        },
        {
          id: 'digital-classrooms',
          title: 'New smart classrooms go live across primary wing',
          excerpt:
            'Interactive boards and secure student devices are now live in every primary classroom, supporting calmer, clearer lessons.',
          date: '2025-10-22',
          category: 'Press',
          image: '/landing/spoorthi-classroom.png',
          imageAlt: 'Digital classroom at Spoorthi',
          source: 'The Hindu',
          href: '#contact',
        },
      ],
    },
    successStories: {
      eyebrow: 'Student achievements',
      headline: 'Spoorthi stars in IIT, NEET & Class 10',
      subhead:
        'The best Class 10 board toppers, NEET ranks, and IIT-JEE qualifiers — discipline and campus support turned into results.',
      items: [
        {
          id: 'neet-riddhi',
          name: 'Riddhi Sharma',
          score: '710/720',
          exam: 'NEET · AIR 142',
          batch: 'NEET',
          badge: 'NEET Topper',
          subtitle: 'Spoorthi Student · AIR 142',
          tags: ['NEET 710/720', 'Biology 195', 'State Top 5', 'AIR 142'],
          quote:
            'Daily doubt clinics and calm revision plans at Spoorthi helped me stay consistent through NEET.',
          photoCutout: MEDIA.achieverCutouts.student01,
          photo: MEDIA.student1,
        },
        {
          id: 'iit-arjun',
          name: 'Arjun Mehta',
          score: 'AIR 89',
          exam: 'IIT-JEE Advanced · 2025',
          batch: 'IIT',
          badge: 'IIT Qualifier',
          subtitle: 'Spoorthi Student · IIT Rank 89',
          tags: ['JEE Advanced', 'Physics 98%', 'Maths 99%', 'AIR 89'],
          quote:
            'Problem-solving drills with faculty after class made JEE feel structured instead of overwhelming.',
          photoCutout: MEDIA.achieverCutouts.student03,
          photo: MEDIA.student3,
        },
        {
          id: 'neet-sneha',
          name: 'Sneha Reddy',
          score: '705/720',
          exam: 'NEET · State Rank 8',
          batch: 'NEET',
          badge: 'NEET Topper',
          subtitle: 'Spoorthi Student · State Rank 8',
          tags: ['NEET 705/720', 'Chemistry 190', 'State Rank 8', 'Top 1%'],
          quote:
            'Spoorthi mentors tracked my weak topics every week — that accountability changed my score trajectory.',
          photoCutout: MEDIA.achieverCutouts.student04,
          photo: MEDIA.student4,
        },
        {
          id: 'iit-rohan',
          name: 'Rohan Kapoor',
          score: 'AIR 215',
          exam: 'IIT-JEE Advanced · 2025',
          batch: 'IIT',
          badge: 'IIT Qualifier',
          subtitle: 'Spoorthi Student · IIT Rank 215',
          tags: ['JEE Advanced', 'Chemistry 97%', 'Mock Topper', 'AIR 215'],
          quote:
            'From foundation batches to full-length mocks, the campus gave me a clear ladder to IIT.',
          photoCutout: MEDIA.achieverCutouts.student05,
          photo: MEDIA.student5,
        },
        {
          id: 'neet-ishita',
          name: 'Ishita Nair',
          score: '698/720',
          exam: 'NEET · AIR 318',
          batch: 'NEET',
          badge: 'NEET Topper',
          subtitle: 'Spoorthi Student · AIR 318',
          tags: ['NEET 698/720', 'Biology 192', 'AIR 318', 'Zoology 99%'],
          quote:
            'Biology became my strength because teachers made every diagram and concept stick.',
          photoCutout: MEDIA.achieverCutouts.student06,
          photo: MEDIA.student6,
        },
        {
          id: 'iit-kabir',
          name: 'Kabir Singh',
          score: 'AIR 412',
          exam: 'IIT-JEE Advanced · 2025',
          batch: 'IIT',
          badge: 'IIT Qualifier',
          subtitle: 'Spoorthi Student · IIT Rank 412',
          tags: ['JEE Advanced', 'Physics 96%', 'Peer Mentor', 'AIR 412'],
          quote:
            'Peer study circles and faculty feedback loops kept me exam-ready without burning out.',
          photoCutout: MEDIA.achieverCutouts.student07,
          photo: MEDIA.student7,
        },
        {
          id: 'neet-meera',
          name: 'Meera Joshi',
          score: '692/720',
          exam: 'NEET · AIR 486',
          batch: 'NEET',
          badge: 'NEET Topper',
          subtitle: 'Spoorthi Student · AIR 486',
          tags: ['NEET 692/720', 'Physics 165', 'AIR 486', 'Consistent Topper'],
          quote:
            'Spoorthi taught me to revise smart — fewer panic nights, stronger recall on exam day.',
          photoCutout: MEDIA.achieverCutouts.student08,
          photo: MEDIA.student8,
        },
        {
          id: 'iit-dev',
          name: 'Dev Patel',
          score: 'AIR 567',
          exam: 'IIT-JEE Advanced · 2025',
          batch: 'IIT',
          badge: 'IIT Qualifier',
          subtitle: 'Spoorthi Student · IIT Rank 567',
          tags: ['JEE Advanced', 'Maths 98%', 'Lab Champion', 'AIR 567'],
          quote:
            'Structured physics workshops here turned my toughest chapters into scoring opportunities.',
          photoCutout: MEDIA.achieverCutouts.student09,
          photo: MEDIA.student9,
        },
        {
          id: 'neet-aisha',
          name: 'Aisha Khan',
          score: '688/720',
          exam: 'NEET · AIR 612',
          batch: 'NEET',
          badge: 'NEET Topper',
          subtitle: 'Spoorthi Student · AIR 612',
          tags: ['NEET 688/720', 'Chemistry 188', 'AIR 612', 'Mock 700+'],
          quote:
            'Counsellors and teachers worked together so I stayed confident through the long NEET journey.',
          photoCutout: MEDIA.achieverCutouts.student10,
          photo: MEDIA.student10,
        },
        {
          id: 'iit-ananya',
          name: 'Ananya Verma',
          score: 'AIR 743',
          exam: 'IIT-JEE Advanced · 2025',
          batch: 'IIT',
          badge: 'IIT Qualifier',
          subtitle: 'Spoorthi Student · IIT Rank 743',
          tags: ['JEE Advanced', 'Organic Chem 97%', 'AIR 743', 'House Captain'],
          quote:
            'I am proud to represent Spoorthi — the campus culture pushed me to aim higher every single day.',
          photoCutout: MEDIA.achieverCutouts.student02,
          photo: MEDIA.student2,
        },
        {
          id: 'x-vihaan',
          name: 'Vihaan Rao',
          score: '499/500',
          exam: 'CBSE Class 10 · 2026',
          batch: 'CLASS 10',
          badge: 'Class 10 Topper',
          subtitle: 'Spoorthi Student · School Topper',
          tags: ['499/500', '99.8%', 'School Rank 1', 'Maths 100'],
          quote:
            'Daily practice papers and calm teacher feedback at Spoorthi made Class 10 feel planned, not panicked.',
          photoCutout: MEDIA.achieverCutouts.student02,
          photo: MEDIA.student2,
        },
        {
          id: 'x-diya',
          name: 'Diya Krishnan',
          score: '497/500',
          exam: 'CBSE Class 10 · 2026',
          batch: 'CLASS 10',
          badge: 'Class 10 Topper',
          subtitle: 'Spoorthi Student · 99.4%',
          tags: ['497/500', '99.4%', 'Science 100', 'State Top 10'],
          quote:
            'Science clicked when teachers broke every chapter into small wins — that is how I finished at 497.',
          photoCutout: MEDIA.achieverCutouts.student08,
          photo: MEDIA.student8,
        },
        {
          id: 'x-advait',
          name: 'Advait Iyer',
          score: '495/500',
          exam: 'CBSE Class 10 · 2026',
          batch: 'CLASS 10',
          badge: 'Class 10 Topper',
          subtitle: 'Spoorthi Student · 99.0%',
          tags: ['495/500', '99%', 'English 99', 'SST 99'],
          quote:
            'Weekly tests at Spoorthi showed me exactly what to fix next — no guesswork before boards.',
          photoCutout: MEDIA.achieverCutouts.student09,
          photo: MEDIA.student9,
        },
        {
          id: 'x-kavya',
          name: 'Kavya Menon',
          score: '492/500',
          exam: 'CBSE Class 10 · 2026',
          batch: 'CLASS 10',
          badge: 'Class 10 Topper',
          subtitle: 'Spoorthi Student · 98.4%',
          tags: ['492/500', '98.4%', 'Maths 99', 'Consistent Topper'],
          quote:
            'Mentors treated Class 10 like a foundation for IIT and NEET, not just a board exam.',
          photoCutout: MEDIA.achieverCutouts.student10,
          photo: MEDIA.student10,
        },
      ],
    },
    stats: [
      { value: '2100+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '120+', label: 'Expert Teachers', icon: 'FiUserCheck' },
      { value: '35+', label: 'Awards Won', icon: 'FiAward' },
      { value: '18+', label: 'Years of Excellence', icon: 'FiHome' },
    ],
    contact: {
      address: '123 School Street, City, State',
      phone: '+91 98765 10001',
      email: 'admissions@spoorthischool.edu',
      hours: 'Mon – Sat: 8:00 AM – 4:00 PM',
    },
    faq: {
      items: [],
    },
  },

  gencampus: {
    template: LANDING_TEMPLATE.quote,
    brand: {
      subtitle: 'LEARNING CAMPUS',
    },
    hero: {
      eyebrow: 'NURTURING MINDS. BUILDING FUTURES.',
      headline: 'Education Today, Leaders Tomorrow.',
      headlineHighlight: 'Leaders',
      subhead:
        'GenCampus Educational Institute nurtures curiosity and character — a place where every child is seen, challenged, and celebrated.',
      primaryCta: { label: 'Discover More', href: '#features' },
      admissionCta: { label: 'Apply Now', href: '#contact' },
      heroImage: MEDIA.campus,
      heroImageAlt: 'GenCampus campus courtyard',
    },
    canvasHero: {
      variant: 'cinematic',
      headline: 'Education today, leaders tomorrow.',
      subhead:
        'The campus for curious learners — where families and teachers grow futures together.',
      primaryCta: { label: 'Explore GenCampus', href: '#features' },
      secondaryCta: { label: 'Apply now', href: '#contact' },
      backgroundImage: MEDIA.campus,
      backgroundAlt: 'GenCampus campus courtyard',
      floatImages: [
        {
          src: MEDIA.schoolBuilding,
          alt: 'GenCampus campus',
        },
        {
          src: MEDIA.aboutStudents,
          alt: 'Students at GenCampus',
        },
        {
          src: MEDIA.fraternity,
          alt: 'Community at GenCampus',
        },
        {
          src: MEDIA.aboutLibrary,
          alt: 'Learning spaces',
        },
      ],
    },
    values: {
      headline: 'Every learner can create positive change',
      items: [
        {
          title: 'Digital belonging',
          titleItalic: 'Digital',
          description:
            'Smart classrooms and digital fluency woven into everyday learning.',
          image: MEDIA.lab,
          imageAlt: 'Digital learning at GenCampus',
        },
        {
          title: 'Open source thinking',
          titleItalic: 'source',
          description:
            'We share methods, celebrate questions, and learn in the open.',
          image: MEDIA.aboutLibrary,
          imageAlt: 'Library and inquiry',
        },
        {
          title: 'Not-for-sale values',
          titleItalic: 'sale',
          description:
            'Character and care stay at the center — never secondary to scores.',
          image: MEDIA.fraternity,
          imageAlt: 'Values in action',
        },
      ],
    },
    quote: {
      headline: 'Small deeds, lasting impact.',
      headlineItalic: 'impact',
      body: 'At GenCampus, daily habits of curiosity and kindness compound into futures students are proud of.',
      author: {
        name: 'Ananya Rao',
        role: 'Principal',
        photo: MEDIA.staff1,
      },
    },
    team: {
      headline: 'Power of collaboration',
      headlineItalic: 'collaboration',
      bodyBefore: 'Our',
      bodyEmph: 'sounding board',
      bodyAfter:
        'of educators and mentors keeps teaching human — curious, kind, and ambitious.',
      members: [
        {
          name: 'Ananya Rao',
          role: 'Principal',
          photo: MEDIA.staff1,
          quote:
            'Every child deserves adults who listen first — then stretch them with care and high expectations.',
          stats: [
            { value: '18+', label: 'Years leading', hint: 'Across campus life' },
            { value: '96%', label: 'Family trust', hint: 'Annual survey' },
          ],
        },
        {
          name: 'Rahul Mehta',
          role: 'Academics',
          photo: MEDIA.staff2,
          quote:
            'Rigor and curiosity belong together. When lessons feel alive, results follow naturally.',
          stats: [
            { value: '2x', label: 'Project depth', hint: 'Vs prior term' },
            { value: '89%', label: 'Board readiness', hint: 'Tracked cohorts' },
          ],
        },
        {
          name: 'Priya Nair',
          role: 'Counsellor',
          photo: MEDIA.staff3,
          quote:
            'Wellbeing is not a side program — it is the quiet condition for real learning.',
          stats: [
            { value: '320+', label: 'Check-ins', hint: 'This academic year' },
            { value: '4.8', label: 'Care rating', hint: 'Family feedback' },
          ],
        },
        {
          name: 'Kabir Singh',
          role: 'Sports lead',
          photo: MEDIA.student7,
          quote:
            'We train grit and kindness in the same session — that balance shapes character.',
          stats: [
            { value: '14', label: 'Teams active', hint: 'Across houses' },
            { value: '3x', label: 'Participation', hint: 'Since last year' },
          ],
        },
        {
          name: 'Meera Joshi',
          role: 'Arts lead',
          photo: MEDIA.student8,
          quote:
            'Art gives students a voice before they have the perfect words — and that confidence spills into class.',
          stats: [
            { value: '48', label: 'Showcases', hint: 'Campus & community' },
            { value: '92%', label: 'Club retention', hint: 'Year over year' },
          ],
        },
        {
          name: 'Dev Patel',
          role: 'STEM lead',
          photo: MEDIA.student9,
          quote:
            'Labs should feel like workshops for imagination — students build, fail, and invent out loud.',
          stats: [
            { value: '65%', label: 'STEM electives', hint: 'Upper grades' },
            { value: '11', label: 'Open projects', hint: 'Running now' },
          ],
        },
        {
          name: 'Aisha Khan',
          role: 'House mentor',
          photo: MEDIA.student10,
          quote:
            'A house is a second family on campus — belonging is the first academic advantage we give.',
          stats: [
            { value: '4', label: 'House communities', hint: 'Whole campus' },
            { value: '100%', label: 'Mentor coverage', hint: 'Every learner' },
          ],
        },
      ],
    },
    impact: {
      headline: 'Learning tools united: achieve more, together.',
      subhead:
        'Academics, clubs, counselling, secure records, and family partnership — one campus rhythm.',
      cta: { label: 'Partner with GenCampus', href: '#contact' },
      testimonials: [
        {
          name: 'Neha Kapoor',
          role: 'Parent · Grade 6',
          quote:
            'Teachers know my child as a person — not only as a marksheet. That changes everything.',
          photo: MEDIA.student4,
        },
        {
          name: 'Vikram Shah',
          role: 'Alumni parent',
          quote:
            'The campus culture is ambitious and warm. Our daughter found her voice here.',
          photo: MEDIA.staff2,
        },
        {
          name: 'Sana Ali',
          role: 'Partner NGO',
          quote:
            'Student volunteers show up prepared, curious, and ready to serve the community.',
          photo: MEDIA.student6,
        },
        {
          name: 'Arjun Desai',
          role: 'Sports coach',
          quote:
            'We train grit and kindness in the same session — that is the GenCampus difference.',
          photo: MEDIA.student3,
        },
      ],
      partners: [
        'City Library',
        'STEM Hub',
        'Green Schools',
        'Youth Sports',
        'Arts Council',
        'Health First',
        'EduTrust',
        'Local Council',
      ],
    },
    faq: {
      headline: 'Frequently asked questions',
      items: [
        {
          category: 'Admissions',
          asker: 'Curious parent',
          question: 'When do admissions open for the next academic year?',
          answer:
            'Applications typically open in November. We host open days each term — book a visit from the contact section and we will guide you through documents and assessments.',
          author: { name: 'Priya Nair', role: 'Admissions', photo: MEDIA.staff3 },
        },
        {
          category: 'Campus',
          asker: 'New family',
          question: 'Is transport available across the city?',
          answer:
            'Yes. We run monitored routes with GPS-enabled buses. Share your locality when you enquire and we will confirm the nearest pick-up point.',
          author: { name: 'Rahul Mehta', role: 'Operations', photo: MEDIA.staff2 },
        },
        {
          category: 'Academics',
          asker: 'Intrigued human',
          question: 'How do you balance boards prep with creativity?',
          answer:
            'Core academics stay rigorous, while clubs, labs, and project weeks keep curiosity alive. Mentors track both progress and wellbeing so students do not burn out.',
          author: { name: 'Ananya Rao', role: 'Principal', photo: MEDIA.staff1 },
        },
        {
          category: 'Campus',
          asker: 'Curious parent',
          question: 'What does a typical school day feel like?',
          answer:
            'Mornings focus on deep learning blocks; afternoons open into sports, arts, and electives. Homeroom check-ins keep every student seen.',
          author: {
            name: 'Meera Joshi',
            role: 'House mentor',
            photo: MEDIA.student8,
          },
        },
        {
          category: 'Admissions',
          asker: 'Transfer family',
          question: 'Can mid-year transfers join?',
          answer:
            'We review mid-year requests case by case based on seat availability and learning continuity. Reach out with the current grade and we will advise next steps within a few days.',
          author: { name: 'Priya Nair', role: 'Admissions', photo: MEDIA.staff3 },
        },
        {
          category: 'Academics',
          asker: 'Intrigued human',
          question: 'Do you offer support for different learning needs?',
          answer:
            'Yes. Our counselling and learning-support team partners with teachers and families on personalized plans — quietly, respectfully, and with clear goals.',
          author: { name: 'Priya Nair', role: 'Counsellor', photo: MEDIA.staff3 },
        },
      ],
    },
    about: {
      headline: 'The best way to grow\na curious mind',
      body: 'GenCampus streamlines learning around what actually lasts — curiosity, character, and confident work. Families stay close, so every child can focus on becoming their best.',
      bullets: [
        'Future-Ready Curriculum',
        'Character & Citizenship',
        'Innovation Labs',
        'Inclusive Community',
      ],
      image: MEDIA.aboutLibrary,
      imageAlt: 'Learning journey at GenCampus',
      hoverImage: MEDIA.aboutStudents,
      hoverImageAlt: 'Students reading at GenCampus',
    },
    successStories: {
      headline: 'Success Stories.',
      subhead:
        'Proud moments from students who grew, worked hard, and excelled at GenCampus.',
      backgroundImage: MEDIA.campus,
    },
    stats: [
      { value: '1800+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '95+', label: 'Expert Teachers', icon: 'FiUserCheck' },
      { value: '28+', label: 'Awards Won', icon: 'FiAward' },
      { value: '12+', label: 'Years of Excellence', icon: 'FiHome' },
    ],
    contact: {
      address: 'GenCampus Avenue, Education City',
      phone: '+91 98765 20002',
      email: 'hello@gencampus.edu',
      hours: 'Mon – Fri: 8:30 AM – 4:30 PM',
    },
    cta: {
      headline: 'Ready To Shape A Bright Future?',
      body: 'Join GenCampus Educational Institute and give your child the best start in life.',
      backgroundImage: MEDIA.campus,
    },
  },

  techcampus: {
    template: LANDING_TEMPLATE.press,
    nav: [...PRESS_NAV],
    sections: {
      quote: 'news',
    },
    brand: {
      subtitle: 'SCHOOL OF FUTURE SKILLS',
    },
    hero: {
      eyebrow: 'BUILD. CODE. LEAD.',
      headline: 'A campus for curious builders.',
      headlineHighlight: 'builders',
      subhead:
        'TechCampus blends rigorous academics with coding, design, and labs — so every learner leaves ready to make things that matter.',
      primaryCta: { label: 'Discover More', href: '#about' },
      admissionCta: { label: 'Apply Now', href: '#contact' },
      heroImage: MEDIA.lab,
      heroImageAlt: 'Students working in a TechCampus innovation lab',
    },
    canvasHero: {
      headlineBefore: 'We grow minds that',
      headlineScript: 'build & invent',
      headline: 'Where code meets character.',
      subhead:
        'The campus for future-ready learners — labs, studios, and mentors in one rhythm.',
      primaryCta: { label: 'Explore TechCampus', href: '#about' },
      secondaryCta: { label: "Let's Chat", href: '#contact' },
      badgeTitle: 'Lab life',
      services: ['Coding', 'Design', 'STEM Labs', 'Leadership'],
      heroImage: MEDIA.lab,
      heroImageAlt: 'Students working in a TechCampus innovation lab',
      backgroundImage: MEDIA.campus,
      backgroundAlt: 'TechCampus courtyard',
      floatImages: [
        { src: MEDIA.lab, alt: 'Innovation lab' },
        { src: MEDIA.aboutStudents, alt: 'Students at TechCampus' },
        { src: MEDIA.fraternity, alt: 'Campus community' },
        { src: MEDIA.aboutLibrary, alt: 'Learning spaces' },
      ],
    },
    values: {
      headline: 'Every learner can ship real ideas',
      items: [
        {
          title: 'Maker fluency',
          titleItalic: 'Maker',
          description:
            'Coding, robotics, and design thinking woven into everyday learning — not weekend electives.',
          image: MEDIA.lab,
          imageAlt: 'Maker lab at TechCampus',
        },
        {
          title: 'Open source thinking',
          titleItalic: 'source',
          description:
            'We share methods, celebrate questions, and learn in the open across studios and houses.',
          image: MEDIA.aboutLibrary,
          imageAlt: 'Library and inquiry',
        },
        {
          title: 'Human-first values',
          titleItalic: 'Human',
          description:
            'Character and care stay at the center — technology serves people, never the other way around.',
          image: MEDIA.fraternity,
          imageAlt: 'Values in action',
        },
      ],
    },
    about: {
      headline: 'The best way to grow\na builder’s mind',
      body: 'TechCampus streamlines learning around what lasts — curiosity, craft, and confident work. Families stay close, so every child can focus on becoming their best.',
      image: MEDIA.campus,
      imageAlt: 'Students arriving at TechCampus',
      hoverImage: MEDIA.aboutStudents,
      hoverImageAlt: 'Students collaborating at TechCampus',
      fraternityTitle: 'Our Fraternity',
      fraternityImage: MEDIA.fraternity,
      missionVision: {
        eyebrow: 'Who We Are',
        headline: 'Our Mission & Vision',
        subhead:
          'Guided by craft. Driven by curiosity. Committed to building a better future for every learner.',
      },
    },
    news: {
      eyebrow: 'News',
      headline: 'Stories from TechCampus',
      body:
        'Lab wins, student launches, and community updates — curated from our campus bulletin.',
      maxVisible: 3,
      viewAllHref: '#contact',
      viewAllLabel: 'Talk to admissions',
      items: [
        {
          id: 'hackday-2026',
          title: 'HackDay 2026: 40 student teams ship weekend prototypes',
          excerpt:
            'Families packed the atrium as TechCampus builders demoed climate, health, and civic apps built in 36 hours.',
          date: '2026-02-18',
          category: 'Campus',
          image: MEDIA.lab,
          imageAlt: 'Students presenting prototypes at HackDay',
          source: 'School Bulletin',
          href: '#contact',
        },
        {
          id: 'robotics-nationals',
          title: 'Robotics squad qualifies for national finals',
          excerpt:
            'Middle-school engineers earned a finals berth with an autonomous line-follower built entirely in the campus lab.',
          date: '2026-01-30',
          category: 'Achievement',
          image: MEDIA.classroom,
          imageAlt: 'Robotics team at TechCampus',
          source: 'STEM Times',
          href: '#contact',
        },
        {
          id: 'admissions-2026',
          title: 'Admissions open for Academic Year 2026–27',
          excerpt:
            'Limited seats remain in the maker-track middle years. Saturday lab tours run with our admissions mentors.',
          date: '2026-01-12',
          category: 'Admissions',
          image: MEDIA.schoolBuilding,
          imageAlt: 'TechCampus entrance',
          source: 'Admissions Desk',
          href: '#contact',
        },
        {
          id: 'open-source-week',
          title: 'Open-source week: students contribute to public repos',
          excerpt:
            'Senior cohorts shipped documentation and bug fixes to community projects, with mentors reviewing every pull request.',
          date: '2025-12-08',
          category: 'Community',
          image: MEDIA.aboutLibrary,
          imageAlt: 'Students collaborating on laptops',
          source: 'Campus Chronicle',
          href: '#contact',
        },
        {
          id: 'design-studio',
          title: 'New design studio opens beside the coding labs',
          excerpt:
            'A dedicated space for UI, product sketches, and physical prototyping is now live for every house.',
          date: '2025-11-04',
          category: 'Press',
          image: MEDIA.arts,
          imageAlt: 'Design studio at TechCampus',
          source: 'The Hindu',
          href: '#contact',
        },
      ],
    },
    successStories: {
      eyebrow: 'Student achievements',
      headline: 'TechCampus stars in olympiads, boards & JEE',
      subhead:
        'Olympiad medals, Class 10 toppers, and IIT-JEE qualifiers — lab discipline turned into results.',
      backgroundImage: MEDIA.campus,
      items: [
        {
          id: 'jee-diya',
          name: 'Diya Kapoor',
          score: 'AIR 64',
          exam: 'IIT-JEE Advanced · 2025',
          batch: 'IIT',
          badge: 'IIT Qualifier',
          subtitle: 'TechCampus Student · AIR 64',
          tags: ['JEE Advanced', 'Physics 99', 'AIR 64'],
          quote:
            'Night labs and calm mentor reviews at TechCampus made Advanced feel like another problem set.',
          photoCutout: MEDIA.achieverCutouts.student01,
          photo: MEDIA.student1,
        },
        {
          id: 'olympiad-veer',
          name: 'Veer Malhotra',
          score: 'Gold',
          exam: 'INChO · 2026',
          batch: 'IIT',
          badge: 'Olympiad Gold',
          subtitle: 'TechCampus Student · Chemistry Olympiad',
          tags: ['INChO Gold', 'Lab Track', 'National'],
          quote:
            'The chemistry studio treated olympiad prep like real research — that changed how I study.',
          photoCutout: MEDIA.achieverCutouts.student02,
          photo: MEDIA.student3,
        },
        {
          id: 'x-aanya',
          name: 'Aanya Shah',
          score: '498/500',
          exam: 'CBSE Class 10 · 2026',
          batch: 'CLASS 10',
          badge: 'Class 10 Topper',
          subtitle: 'TechCampus Student · 99.6%',
          tags: ['498/500', '99.6%', 'CS 100'],
          quote:
            'Weekly debug clinics and board drills ran in parallel — I never had to choose between code and Class 10.',
          photoCutout: MEDIA.achieverCutouts.student04,
          photo: MEDIA.student2,
        },
        {
          id: 'x-isha',
          name: 'Isha Nair',
          score: '494/500',
          exam: 'CBSE Class 10 · 2026',
          batch: 'CLASS 10',
          badge: 'Class 10 Topper',
          subtitle: 'TechCampus Student · 98.8%',
          tags: ['494/500', 'Maths 100', 'Science 99'],
          quote:
            'Mentors treated boards as a foundation for JEE, not a finish line.',
          photoCutout: MEDIA.achieverCutouts.student06,
          photo: MEDIA.student4,
        },
      ],
    },
    impact: {
      headline: 'Labs, mentors, families — one builder rhythm.',
      subhead:
        'Academics, coding studios, counselling, and family partnership on one campus.',
      cta: { label: 'Partner with TechCampus', href: '#contact' },
      partners: [
        'STEM Hub',
        'Open Source Club',
        'Design Council',
        'City Library',
        'Youth Robotics',
        'Green Schools',
        'EduTrust',
        'Local Council',
      ],
    },
    stats: [
      { value: '1400+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '80+', label: 'Expert Mentors', icon: 'FiUserCheck' },
      { value: '42+', label: 'Lab Awards', icon: 'FiAward' },
      { value: '8+', label: 'Years Building', icon: 'FiHome' },
    ],
    contact: {
      address: 'TechCampus Innovation Park, Education City',
      phone: '+91 98765 30003',
      email: 'admissions@techcampus.edu',
      hours: 'Mon – Sat: 8:00 AM – 4:30 PM',
    },
    faq: {
      items: [],
    },
    cta: {
      headline: 'Ready to build what comes next?',
      body: 'Join TechCampus Educational Institute and give your child a maker’s start in life.',
      backgroundImage: MEDIA.campus,
    },
  },
});

/**
 * Resolve final landing payload for the active school.
 * Order: school defaults → slug overrides → optional remote `school.landing`.
 * @param {import('./registry').SchoolConfig | null | undefined} school
 * @returns {LandingContent}
 */
export const resolveLanding = (school) => {
  const base = createLandingFromSchool(school);
  const slugOverlay = school?.slug ? LANDING_BY_SLUG[school.slug] : null;
  const withSlug = slugOverlay
    ? /** @type {LandingContent} */ (deepMerge(base, slugOverlay))
    : base;
  const merged =
    school?.landing && typeof school.landing === 'object'
      ? /** @type {LandingContent} */ (deepMerge(withSlug, school.landing))
      : withSlug;
  return {
    ...merged,
    nav: sanitizeNav(merged.nav),
  };
};
