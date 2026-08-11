/**
 * Public marketing landing content, keyed by school slug.
 *
 * Shape is stable so UI stays data-driven: swap copy/images per tenant
 * without touching components. Unknown fields fall back via resolveLanding().
 */

import { deepMerge } from './remoteBranding';
import { darken, luminance } from './palettes';

/**
 * @typedef {Object} LandingNavItem
 * @property {string} id — section hash id
 * @property {string} label
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
 * @property {LandingTheme} theme
 * @property {{ mark: string, title: string, subtitle?: string }} brand
 * @property {LandingNavItem[]} nav
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
 *   image: string,
 *   imageAlt: string,
 *   hoverImage?: string,
 *   hoverImageAlt?: string,
 *   fraternityTitle?: string,
 *   fraternityImage?: string,
 *   fraternityImageAlt?: string,
 *   mission: { title: string, body: string },
 *   vision: { title: string, body: string },
 * }} about
 * @property {LandingStat[]} stats
 * @property {{ eyebrow: string, headline: string, items: LandingService[] }} services
 * @property {{ eyebrow: string, headline: string, items: LandingGalleryItem[] }} gallery
 * @property {{ eyebrow: string, headline: string, subhead?: string, backgroundImage?: string, items: LandingSuccessStory[] }} successStories
 * @property {{ eyebrow: string, headline: string, items: LandingTestimonial[] }} testimonials
 * @property {{ eyebrow: string, headline: string, items: LandingProgram[] }} [programs]
 * @property {LandingContact} contact
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
});

const DEFAULT_NAV = Object.freeze([
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Our Services' },
  { id: 'success', label: 'Success Stories' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact Us' },
]);

/**
 * Derive a landing navy/gold pair from the CRM palette.
 * Amber-primary schools (Spoorthi) use parent blue as landing navy.
 * @param {import('./registry').SchoolConfig} school
 * @returns {LandingTheme}
 */
export const themeFromSchool = (school) => {
  const p = school?.palette;
  if (!p) {
    return {
      navy: '#0B1F3A',
      gold: '#C9A227',
      surface: '#F7F8FB',
      muted: '#5B6575',
      ink: '#121826',
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
    surface: '#F7F8FB',
    muted: '#5B6575',
    ink: '#121826',
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

  return {
    theme,
    brand: {
      mark: school?.logo?.mark || school?.logo?.wordmark || '',
      title: name,
      subtitle: 'INTERNATIONAL SCHOOL',
    },
    nav: [...DEFAULT_NAV],
    hero: {
      eyebrow: `NURTURING MINDS. BUILDING FUTURES.`,
      headline: 'Education Today, Leaders Tomorrow.',
      headlineHighlight: 'Leaders',
      subhead: `${legal} provides a nurturing environment where every child discovers curiosity, confidence, and character.`,
      primaryCta: { label: 'Discover More', href: '#about' },
      secondaryCta: { label: 'Contact Us', href: '#contact' },
      admissionCta: { label: 'Apply Now', href: '#contact' },
      heroImage: MEDIA.schoolBuilding,
      heroImageAlt: `School building at ${name}`,
    },
    features: [
      {
        icon: 'FiMonitor',
        title: 'Modern Classrooms',
        description: 'Smart learning environments.',
      },
      {
        icon: 'FiUsers',
        title: 'Expert Teachers',
        description: 'Experienced and dedicated faculty.',
      },
      {
        icon: 'FiBookOpen',
        title: 'Holistic Growth',
        description: 'Focus on academics, sports & values.',
      },
      {
        icon: 'FiShield',
        title: 'Safe Environment',
        description: 'A secure & supportive campus.',
      },
    ],
    about: {
      eyebrow: 'WHO WE ARE',
      headline: 'Nurturing Young Minds For A Better Tomorrow.',
      body: `${legal} is committed to academic excellence, character building, and preparing students for a connected world.`,
      bullets: [
        'Academic Excellence',
        'Character Building',
        'Creative Learning',
        'Global Perspective',
      ],
      image: MEDIA.aboutLibrary,
      imageAlt: `Learning journey at ${name}`,
      hoverImage: MEDIA.aboutStudents,
      hoverImageAlt: `Students reading at ${name}`,
      fraternityTitle: 'Our Fraternity',
      fraternityImage: MEDIA.fraternity,
      fraternityImageAlt: `Our fraternity at ${name}`,
      mission: {
        title: 'Our Mission',
        body: `To empower every learner with knowledge, values, and skills to thrive in an ever-changing world.`,
      },
      vision: {
        title: 'Our Vision',
        body: `To be a leading school community where curiosity, compassion, and courage shape tomorrow’s leaders.`,
      },
    },
    stats: [
      { value: '25+', label: 'Years of Excellence', icon: 'FiClock' },
      { value: '3200+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '250+', label: 'Expert Teachers', icon: 'FiUserCheck' },
      { value: '20+', label: 'Awards Won', icon: 'FiAward' },
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
    cta: {
      headline: 'Ready To Shape A Bright Future?',
      body: 'Join Spoorthi Educational Institute and give your child the best start in life.',
      backgroundImage: MEDIA.spoorthiCampus,
    },
    about: {
      headline: 'Nurturing Young Minds For A Better Tomorrow.',
      body: 'For families across our community, Spoorthi is more than a school — it is a partnership in raising confident, compassionate learners.',
      image: MEDIA.aboutLibrary,
      imageAlt: 'Learning journey at Spoorthi',
      hoverImage: MEDIA.aboutStudents,
      hoverImageAlt: 'Students reading at Spoorthi',
      fraternityTitle: 'Our Fraternity',
      fraternityImage: MEDIA.fraternity,
    },
    successStories: {
      headline: 'Success Stories.',
      subhead:
        'Proud moments from students who grew, worked hard, and excelled at Spoorthi.',
      backgroundImage: MEDIA.spoorthiCampus,
    },
    stats: [
      { value: '18+', label: 'Years of Excellence', icon: 'FiClock' },
      { value: '2100+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '120+', label: 'Expert Teachers', icon: 'FiUserCheck' },
      { value: '35+', label: 'Awards Won', icon: 'FiAward' },
    ],
    contact: {
      address: '123 School Street, City, State',
      phone: '+91 98765 10001',
      email: 'admissions@spoorthischool.edu',
      hours: 'Mon – Sat: 8:00 AM – 4:00 PM',
    },
  },

  gencampus: {
    brand: {
      subtitle: 'LEARNING CAMPUS',
    },
    hero: {
      eyebrow: 'NURTURING MINDS. BUILDING FUTURES.',
      headline: 'Learning That Feels Like Tomorrow.',
      headlineHighlight: 'Tomorrow',
      subhead:
        'GenCampus blends strong academics with modern facilities — preparing students to think clearly, create boldly, and lead kindly.',
      primaryCta: { label: 'Discover More', href: '#about' },
      admissionCta: { label: 'Apply Now', href: '#contact' },
    },
    about: {
      headline: 'A Campus Built For Curious Learners.',
      body: 'GenCampus brings together dedicated faculty, thoughtful design, and a culture of respect — so every student finds their path.',
      bullets: [
        'Future-Ready Curriculum',
        'Character & Citizenship',
        'Innovation Labs',
        'Inclusive Community',
      ],
    },
    stats: [
      { value: '12+', label: 'Years of Excellence', icon: 'FiClock' },
      { value: '1800+', label: 'Happy Students', icon: 'FiUsers' },
      { value: '95+', label: 'Expert Teachers', icon: 'FiUserCheck' },
      { value: '28+', label: 'Awards Won', icon: 'FiAward' },
    ],
    contact: {
      address: 'GenCampus Avenue, Education City',
      phone: '+91 98765 20002',
      email: 'hello@gencampus.edu',
      hours: 'Mon – Fri: 8:30 AM – 4:30 PM',
    },
    cta: {
      headline: 'Ready For GenCampus?',
      body: 'Join GenCampus Educational Institute — where ambition meets belonging.',
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
  if (school?.landing && typeof school.landing === 'object') {
    return /** @type {LandingContent} */ (deepMerge(withSlug, school.landing));
  }
  return withSlug;
};
