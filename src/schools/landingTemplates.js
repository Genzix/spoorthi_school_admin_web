/**
 * Landing page layouts, independent of school slug.
 *
 * Add a school by setting `landingTemplate` on the registry entry
 * (and optional copy in LANDING_BY_SLUG). Do not branch UI on slug.
 */
export const LANDING_TEMPLATE = Object.freeze({
  /** Hero + about + quote/collaboration + FAQ */
  quote: 'quote',
  /** Hero + about + news + achievements (Spoorthi-style campus site) */
  press: 'press',
});

/**
 * @param {import('./landingContent').LandingContent | null | undefined} landing
 * @param {import('./registry').SchoolConfig | null | undefined} school
 */
export const resolveLandingTemplate = (landing, school) => {
  const raw = landing?.template || school?.landingTemplate || LANDING_TEMPLATE.quote;
  return raw === LANDING_TEMPLATE.press
    ? LANDING_TEMPLATE.press
    : LANDING_TEMPLATE.quote;
};

export const isPressLanding = (landing, school) =>
  resolveLandingTemplate(landing, school) === LANDING_TEMPLATE.press;
