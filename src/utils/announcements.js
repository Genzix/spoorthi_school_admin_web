export const TARGET_AUDIENCE_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: 'EMPLOYEES', label: 'Employees' },
  { value: 'PARENTS', label: 'Parents Only' },
  { value: 'CLASS', label: 'Specific Class' },
  { value: 'SECTION', label: 'Specific Section' },
];

export const CATEGORY_OPTIONS = [
  { value: 'CIRCULAR', label: 'School Circular' },
  { value: 'EVENT', label: 'Event' },
  { value: 'HOLIDAY', label: 'Holiday' },
  { value: 'MEETING', label: 'Meeting' },
  { value: 'NOTICE', label: 'Notice' },
];

export const DEFAULT_ANNOUNCEMENT_FORM = {
  title: '',
  description: '',
  target_audience: 'ALL',
  category: 'NOTICE',
  class_name: '',
  section: '',
};

const TARGET_AUDIENCE_VALUES = new Set(TARGET_AUDIENCE_OPTIONS.map((option) => option.value));
const CATEGORY_VALUES = new Set(CATEGORY_OPTIONS.map((option) => option.value));

export const requiresClassSelection = (targetAudience) =>
  targetAudience === 'CLASS' || targetAudience === 'SECTION';

export const requiresSectionSelection = (targetAudience) =>
  targetAudience === 'SECTION';

export const getOptionLabel = (options, value, fallback = value || '—') =>
  options.find((option) => option.value === value)?.label ?? fallback;

export const extractRelationId = (value) =>
  (typeof value === 'object' && value?.id ? value.id : value) || '';

export const normalizeTargetAudience = (announcement) => {
  const raw = announcement?.target_audience || announcement?.target_type || 'ALL';
  return TARGET_AUDIENCE_VALUES.has(raw) ? raw : 'ALL';
};

export const normalizeCategory = (announcement) => {
  const raw = announcement?.category || announcement?.notification_type || 'NOTICE';
  return CATEGORY_VALUES.has(raw) ? raw : 'NOTICE';
};

export const announcementFormFromApi = (announcement = {}) => ({
  title: announcement.title || '',
  description: announcement.description || '',
  target_audience: normalizeTargetAudience(announcement),
  category: normalizeCategory(announcement),
  class_name: extractRelationId(announcement.class_name),
  section: extractRelationId(announcement.section),
});

export const validateAnnouncementFields = (form) => {
  const errors = {};
  const title = form.title.trim();
  const description = form.description.trim();

  if (!title) {
    errors.title = 'Title is required';
  } else if (title.length < 5) {
    errors.title = 'Title should be at least 5 characters';
  } else if (title.length > 120) {
    errors.title = 'Title should not exceed 120 characters';
  }

  if (!description) {
    errors.description = 'Description is required';
  } else if (description.length < 10) {
    errors.description = 'Description should be at least 10 characters';
  } else if (description.length > 1000) {
    errors.description = 'Description should not exceed 1000 characters';
  }

  if (!form.target_audience) {
    errors.target_audience = 'Please select target audience';
  }

  if (!form.category) {
    errors.category = 'Please select category';
  }

  if (requiresClassSelection(form.target_audience) && !form.class_name) {
    errors.class_name = 'Please select a class';
  }

  if (requiresSectionSelection(form.target_audience)) {
    if (!form.class_name) {
      errors.class_name = 'Please select a class';
    }
    if (!form.section) {
      errors.section = 'Please select a section';
    }
  }

  return errors;
};

export const buildAnnouncementPayload = (form) => {
  const payload = {
    title: form.title.trim(),
    description: form.description.trim(),
    category: form.category,
    target_audience: form.target_audience,
  };

  if (requiresClassSelection(form.target_audience)) {
    payload.class_name = form.class_name;
  }

  if (requiresSectionSelection(form.target_audience)) {
    payload.section = form.section;
  }

  return payload;
};

export const formatAnnouncementAudience = (announcement, classMap = {}, sectionMap = {}) => {
  const audience = normalizeTargetAudience(announcement);
  const baseLabel = getOptionLabel(TARGET_AUDIENCE_OPTIONS, audience);

  if (audience === 'CLASS') {
    const classId = extractRelationId(announcement.class_name);
    const className = classMap[classId]?.name;
    return className ? `${baseLabel} — ${className}` : baseLabel;
  }

  if (audience === 'SECTION') {
    const classId = extractRelationId(announcement.class_name);
    const sectionId = extractRelationId(announcement.section);
    const className = classMap[classId]?.name;
    const sectionName = sectionMap[sectionId]?.name;

    if (className && sectionName) {
      return `${baseLabel} — ${className} (${sectionName})`;
    }
    if (className) {
      return `${baseLabel} — ${className}`;
    }
    return baseLabel;
  }

  return baseLabel;
};
