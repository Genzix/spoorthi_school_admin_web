import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiCalendar } from 'react-icons/fi';
import { fadeUp, stagger } from '../motion';
import {
  ART,
  FlowerAccent,
  HeartAccent,
  LeafAccent,
  StarAccent,
} from './artLandingDecor';

const DEFAULT_MAX_VISIBLE = 3;

/** Warm category tones — keyed by normalized label */
const CATEGORY_TONE = Object.freeze({
  campus: { bg: ART.peach, fg: ART.terracotta },
  achievement: { bg: ART.peachLight, fg: ART.accent },
  admissions: { bg: ART.salmon, fg: ART.ink },
  community: { bg: ART.peachMid, fg: ART.terracotta },
  sports: { bg: ART.peach, fg: ART.coral },
  press: { bg: ART.creamDeep, fg: ART.inkSoft },
});

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const slugify = (value = '') =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getCategoryTone = (category) =>
  CATEGORY_TONE[slugify(category)] || {
    bg: ART.peach,
    fg: ART.inkSoft,
  };

const ALL_CATEGORY = 'all';

const normalizeItem = (item, index) => {
  if (!item?.title) return null;
  const date = item.date || item.publishedAt || '';
  const category = item.category || 'Campus';
  return {
    id: item.id || `news-${index}`,
    title: item.title,
    excerpt: item.excerpt || item.summary || '',
    date,
    dateMs: date ? new Date(date).getTime() : 0,
    category,
    categorySlug: slugify(category),
    image: item.image || '',
    imageAlt: item.imageAlt || item.title,
    source: item.source || '',
    href: item.href || item.url || '',
  };
};

const sortByDateDesc = (items) =>
  [...items].sort((a, b) => {
    if (b.dateMs !== a.dateMs) return b.dateMs - a.dateMs;
    return a.title.localeCompare(b.title);
  });

/** Build stable catalog + category chips from raw content once. */
const buildNewsCatalog = (rawItems = []) => {
  const items = sortByDateDesc(
    rawItems.map(normalizeItem).filter(Boolean)
  );

  const categoryMap = new Map();
  items.forEach((item) => {
    if (categoryMap.has(item.categorySlug)) return;
    categoryMap.set(item.categorySlug, {
      slug: item.categorySlug,
      label: item.category,
    });
  });

  const filters = [
    { slug: ALL_CATEGORY, label: 'All stories', count: items.length },
    ...Array.from(categoryMap.values())
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ slug, label }) => ({
        slug,
        label,
        count: items.filter((item) => item.categorySlug === slug).length,
      })),
  ];

  return { items, filters };
};

/**
 * Preview mode (All): latest N stories.
 * Filter mode (category): every story in that category.
 */
const selectVisibleItems = (items, activeCategory, maxVisible) => {
  const filtered =
    activeCategory === ALL_CATEGORY
      ? items
      : items.filter((item) => item.categorySlug === activeCategory);

  const limit =
    activeCategory === ALL_CATEGORY ? maxVisible : filtered.length;

  return {
    filteredCount: filtered.length,
    visibleItems: filtered.slice(0, Math.max(0, limit)),
  };
};

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 7vw, 5rem) 0 clamp(4rem, 8vw, 6rem);
  overflow: hidden;
  background: var(--lp-page-bg, ${ART.cream});
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: min(1320px, calc(100% - 2.5rem));
  margin-inline: auto;
`;

const Intro = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 42rem;
  margin-inline: auto;
  margin-bottom: clamp(2.2rem, 4.5vw, 3.4rem);
`;

const Eyebrow = styled(motion.p)`
  margin: 0 0 0.85rem;
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.9rem;
  border-radius: 999px;
  background: var(--lp-art-white, ${ART.white});
  border: 1px solid color-mix(in srgb, var(--lp-art-coral, ${ART.coral}) 22%, transparent);
  font-family: var(--lp-font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lp-art-accent, ${ART.accent});
`;

const Headline = styled(motion.h2)`
  font-family: var(--lp-font-serif);
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--lp-art-ink, ${ART.ink});
  margin: 0 0 1rem;
  text-wrap: balance;
`;

const Body = styled(motion.p)`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  line-height: 1.7;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 68%, transparent);
  text-wrap: pretty;
`;

const FilterRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.55rem;
  margin-bottom: clamp(1.6rem, 3vw, 2.2rem);
`;

const FilterChip = styled.button`
  appearance: none;
  border: 1px solid
    color-mix(
      in srgb,
      var(--lp-art-ink, ${ART.ink})
      ${(p) => (p.$active ? '18%' : '10%')},
      transparent
    );
  background: ${(p) =>
    p.$active
      ? `color-mix(in srgb, var(--lp-art-coral, ${ART.coral}) 14%, ${ART.white})`
      : ART.white};
  color: ${(p) =>
    p.$active
      ? `var(--lp-art-terracotta, ${ART.terracotta})`
      : `color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 72%, transparent)`};
  padding: 0.42rem 0.9rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: color-mix(in srgb, var(--lp-art-coral, ${ART.coral}) 35%, transparent);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-art-ink, ${ART.ink});
    outline-offset: 2px;
  }
`;

const Results = styled.div`
  min-height: 12rem;
`;

const Grid = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2.2vw, 1.5rem);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled(motion.p)`
  margin: 0;
  padding: clamp(2rem, 4vw, 3rem) 1rem;
  text-align: center;
  font-family: var(--lp-font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 58%, transparent);
`;

const EmptyReset = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: 700;
  color: var(--lp-art-coral, ${ART.coral});
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:focus-visible {
    outline: 2px solid var(--lp-art-coral, ${ART.coral});
    outline-offset: 2px;
  }
`;

const Card = styled(motion.li)`
  display: flex;
  min-height: 100%;
`;

const cardShellStyles = `
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 1.1rem;
  overflow: hidden;
  background: var(--lp-art-white, ${ART.white});
  border: 1px solid color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 8%, transparent);
  box-shadow: 0 12px 36px color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 5%, transparent);
  transition:
    transform 0.35s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    box-shadow 0.35s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    border-color 0.35s ease;
`;

const CardLink = styled.a`
  ${cardShellStyles}
  color: inherit;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--lp-art-coral, ${ART.coral}) 28%, transparent);
    box-shadow: 0 20px 44px color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 9%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-art-coral, ${ART.coral});
    outline-offset: 3px;
  }
`;

const CardShell = styled.div`
  ${cardShellStyles}
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--lp-art-peach, ${ART.peach});

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s var(--lp-ease, cubic-bezier(0.22, 1, 0.36, 1));
  }

  ${CardLink}:hover & img {
    transform: scale(1.04);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 42%,
      color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 32%, transparent) 100%
    );
    pointer-events: none;
  }
`;

const Category = styled.span`
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1;
  padding: 0.3rem 0.68rem;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  border: 1px solid color-mix(in srgb, ${(p) => p.$fg} 18%, transparent);
  font-family: var(--lp-font-body);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => p.$fg};
`;

const Source = styled.span`
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  z-index: 1;
  max-width: calc(100% - 1.7rem);
  padding: 0.28rem 0.62rem;
  border-radius: 0.45rem;
  background: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 72%, transparent);
  backdrop-filter: blur(6px);
  font-family: var(--lp-font-body);
  font-size: 0.68rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.72rem;
  padding: 1.12rem 1.18rem 1.22rem;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  font-family: var(--lp-font-body);
  font-size: 0.78rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 52%, transparent);

  svg {
    flex-shrink: 0;
    opacity: 0.72;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: clamp(1.05rem, 1.7vw, 1.2rem);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
  color: var(--lp-art-ink, ${ART.ink});
`;

const Excerpt = styled.p`
  margin: 0;
  flex: 1;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  line-height: 1.62;
  color: color-mix(in srgb, var(--lp-art-ink, ${ART.ink}) 58%, transparent);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
  margin-top: auto;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--lp-art-coral, ${ART.coral});

  svg {
    transition: transform 0.25s ease;
  }

  ${CardLink}:hover & svg {
    transform: translate(2px, -2px);
  }
`;

const Footer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: clamp(2rem, 4vw, 2.8rem);
`;

const ViewAllCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--lp-art-coral, ${ART.coral});
  color: #fff;
  transition: transform 0.25s var(--lp-ease), filter 0.2s ease;

  svg {
    transition: transform 0.25s var(--lp-ease);
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);

    svg {
      transform: translateX(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--lp-art-ink, ${ART.ink});
    outline-offset: 3px;
  }
`;

const NewsCard = ({ item, variants }) => {
  const tone = getCategoryTone(item.category);

  const media = (
    <Media>
      {item.image ? (
        <img src={item.image} alt={item.imageAlt} loading="lazy" />
      ) : null}
      <Category $bg={tone.bg} $fg={tone.fg}>
        {item.category}
      </Category>
      {item.source ? <Source>{item.source}</Source> : null}
    </Media>
  );

  const body = (
    <>
      {media}
      <Content>
        {item.date ? (
          <Meta>
            <FiCalendar aria-hidden />
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </Meta>
        ) : null}
        <Title>{item.title}</Title>
        {item.excerpt ? <Excerpt>{item.excerpt}</Excerpt> : null}
        {item.href ? (
          <ReadMore>
            Read story
            <FiArrowUpRight aria-hidden />
          </ReadMore>
        ) : null}
      </Content>
    </>
  );

  if (item.href) {
    const external = /^https?:\/\//i.test(item.href);
    return (
      <Card variants={variants}>
        <CardLink
          href={item.href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {body}
        </CardLink>
      </Card>
    );
  }

  return (
    <Card variants={variants}>
      <CardShell>{body}</CardShell>
    </Card>
  );
};

const SpoorthiNewsSection = ({ sectionId = 'news', news }) => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const catalog = useMemo(
    () => buildNewsCatalog(news?.items || []),
    [news?.items]
  );

  const maxVisible = Math.max(1, news?.maxVisible ?? DEFAULT_MAX_VISIBLE);

  const { visibleItems, hasHiddenItems } = useMemo(() => {
    const { visibleItems: items } = selectVisibleItems(
      catalog.items,
      activeCategory,
      maxVisible
    );

    return {
      visibleItems: items,
      hasHiddenItems:
        activeCategory === ALL_CATEGORY && catalog.items.length > maxVisible,
    };
  }, [catalog.items, activeCategory, maxVisible]);

  const selectCategory = useCallback(
    (slug) => {
      setActiveCategory((current) => (current === slug ? current : slug));
    },
    []
  );

  const activeFilter =
    catalog.filters.find((filter) => filter.slug === activeCategory) ||
    catalog.filters[0];

  if (!catalog.items.length) return null;

  const showFilters = catalog.filters.length > 2;

  return (
    <Section id={sectionId} aria-labelledby="spoorthi-news-title">
      <FlowerAccent
        style={{ top: '10%', right: '7%', zIndex: 1 }}
        color={ART.accent}
        size={34}
      />
      <StarAccent
        style={{ bottom: '16%', left: '5%', zIndex: 1 }}
        color={ART.coral}
        size={15}
      />
      <HeartAccent
        style={{ top: '20%', left: '12%', zIndex: 1 }}
        color={ART.accent}
        size={13}
      />
      <LeafAccent
        style={{ bottom: '24%', right: '10%', zIndex: 1 }}
        color={ART.terracotta}
        size={22}
      />

      <Inner>
        <Intro
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Eyebrow variants={fadeUp}>{news?.eyebrow || 'News'}</Eyebrow>
          <Headline id="spoorthi-news-title" variants={fadeUp}>
            {news?.headline || 'Stories from Spoorthi'}
          </Headline>
          {news?.body ? <Body variants={fadeUp}>{news.body}</Body> : null}
        </Intro>

        {showFilters ? (
          <FilterRow
            role="tablist"
            aria-label="Filter news by category"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {catalog.filters.map((filter) => (
              <FilterChip
                key={filter.slug}
                type="button"
                role="tab"
                id={`${sectionId}-filter-${filter.slug}`}
                aria-controls={`${sectionId}-results`}
                aria-selected={activeCategory === filter.slug}
                $active={activeCategory === filter.slug}
                onClick={() => selectCategory(filter.slug)}
              >
                {filter.label}
              </FilterChip>
            ))}
          </FilterRow>
        ) : null}

        <Results
          id={`${sectionId}-results`}
          role="tabpanel"
          aria-labelledby={`${sectionId}-filter-${activeCategory}`}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            {visibleItems.length ? (
              <Grid
                key={activeCategory}
                aria-label={
                  activeCategory === ALL_CATEGORY
                    ? 'Spoorthi news and updates'
                    : `${activeFilter?.label || 'Filtered'} news stories`
                }
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {visibleItems.map((item) => (
                  <NewsCard key={item.id} item={item} variants={fadeUp} />
                ))}
              </Grid>
            ) : (
              <EmptyState
                key={`${activeCategory}-empty`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                No stories in {activeFilter?.label || 'this category'} yet. Try{' '}
                <EmptyReset type="button" onClick={() => selectCategory(ALL_CATEGORY)}>
                  All stories
                </EmptyReset>
                .
              </EmptyState>
            )}
          </AnimatePresence>
        </Results>

        {hasHiddenItems && news?.viewAllHref ? (
          <Footer
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ViewAllCta href={news.viewAllHref}>
              {news.viewAllLabel || 'View all campus updates'}
              <FiArrowRight aria-hidden />
            </ViewAllCta>
          </Footer>
        ) : null}
      </Inner>
    </Section>
  );
};

export default SpoorthiNewsSection;
