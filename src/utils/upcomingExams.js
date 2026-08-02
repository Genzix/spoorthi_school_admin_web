export const AUDIENCE_MODES = {
  ALL_CLASSES: 'all_classes',
  WHOLE_CLASS: 'whole_class',
  INDIVIDUAL: 'individual',
};

export const AUDIENCE_MODE_OPTIONS = [
  { value: AUDIENCE_MODES.ALL_CLASSES, label: 'All Classes' },
  { value: AUDIENCE_MODES.WHOLE_CLASS, label: 'Whole Class' },
  { value: AUDIENCE_MODES.INDIVIDUAL, label: 'Individual' },
];

export const SCHEDULE_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'false', label: 'Pending teacher' },
  { value: 'true', label: 'Scheduled' },
];

export const DEFAULT_EXAM_FORM = {
  title: '',
  from_date: '',
  audienceMode: AUDIENCE_MODES.WHOLE_CLASS,
  selectedClassIds: [],
  selectedSectionIds: [],
  batchId: '',
};

export const isAdminEmail = (email = localStorage.getItem('email')) =>
  email === 'admin@gmail.com';

export const getScheduleBadge = (exam) => {
  if (exam?.is_scheduled === true) {
    return { label: 'Scheduled', tone: 'success' };
  }
  return { label: 'Pending teacher', tone: 'warning' };
};

export const formatAudienceLabel = (exam) => {
  const parts = [
    exam?.class_name_display,
    exam?.section_display,
    exam?.batch_display,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : '—';
};

export const formatDateDisplay = (value) => {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const toggleIdInList = (list = [], id) => {
  if (!id) return list;
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
};

/**
 * Expand badge selection into API targets[].
 * - All Classes → one target per class (section/batch omitted)
 * - Whole Class → one target per selected class
 * - Individual → one target per selected section (+ optional batch)
 */
export const buildTargetsFromSelection = ({
  audienceMode,
  selectedClassIds = [],
  selectedSectionIds = [],
  batchId = '',
  classes = [],
  sectionMap = {},
} = {}) => {
  const optionalBatch = batchId || null;

  if (audienceMode === AUDIENCE_MODES.ALL_CLASSES) {
    return classes
      .filter((cls) => cls?.id)
      .map((cls) => ({
        class_name: cls.id,
        ...(optionalBatch ? { batch: optionalBatch } : {}),
      }));
  }

  if (audienceMode === AUDIENCE_MODES.WHOLE_CLASS) {
    return selectedClassIds
      .filter(Boolean)
      .map((classId) => ({
        class_name: classId,
        ...(optionalBatch ? { batch: optionalBatch } : {}),
      }));
  }

  // Individual: section-level targets
  return selectedSectionIds
    .filter(Boolean)
    .map((sectionId) => {
      const section = sectionMap[sectionId];
      const classId =
        section?.class_name?.id ||
        section?.class_name ||
        section?.class_name_id ||
        selectedClassIds[0] ||
        '';

      if (!classId) return null;

      const target = {
        class_name: classId,
        section: sectionId,
      };
      if (optionalBatch) target.batch = optionalBatch;
      return target;
    })
    .filter(Boolean);
};

/** Admin create payload — never sends subject / schedule fields. */
export const buildCreateExamPayload = ({
  title,
  from_date,
  audienceMode,
  selectedClassIds,
  selectedSectionIds,
  batchId,
  classes,
  sectionMap,
}) => {
  const trimmedTitle = (title || '').trim();
  const targets = buildTargetsFromSelection({
    audienceMode,
    selectedClassIds,
    selectedSectionIds,
    batchId,
    classes,
    sectionMap,
  });

  const payload = { title: trimmedTitle };
  if (from_date) payload.from_date = from_date;

  if (targets.length === 0) {
    return payload;
  }

  if (targets.length === 1) {
    const [only] = targets;
    payload.class_name = only.class_name;
    if (only.section) payload.section = only.section;
    if (only.batch) payload.batch = only.batch;
    return payload;
  }

  payload.targets = targets;
  return payload;
};

export const buildUpdateExamPayload = ({
  title,
  from_date,
  class_name,
  section,
  batch,
}) => {
  const payload = {
    title: (title || '').trim(),
  };

  if (from_date) {
    payload.from_date = from_date;
  } else {
    payload.from_date = null;
  }

  if (class_name) payload.class_name = class_name;
  payload.section = section || null;
  payload.batch = batch || null;

  return payload;
};

export const validateCreateExamForm = ({
  title,
  audienceMode,
  selectedClassIds = [],
  selectedSectionIds = [],
  classes = [],
}) => {
  const errors = {};
  const trimmed = (title || '').trim();

  if (!trimmed) {
    errors.title = 'Title is required';
  } else if (trimmed.length > 200) {
    errors.title = 'Title should not exceed 200 characters';
  }

  if (audienceMode === AUDIENCE_MODES.ALL_CLASSES) {
    if (!classes.length) {
      errors.audience = 'No classes available to target';
    }
  } else if (audienceMode === AUDIENCE_MODES.WHOLE_CLASS) {
    if (selectedClassIds.length === 0) {
      errors.audience = 'Select at least one class';
    }
  } else if (audienceMode === AUDIENCE_MODES.INDIVIDUAL) {
    if (selectedClassIds.length === 0) {
      errors.audience = 'Select a class first';
    } else if (selectedSectionIds.length === 0) {
      errors.audience = 'Select at least one section';
    }
  }

  return errors;
};

export const validateUpdateExamForm = ({ title, class_name }) => {
  const errors = {};
  const trimmed = (title || '').trim();

  if (!trimmed) {
    errors.title = 'Title is required';
  } else if (trimmed.length > 200) {
    errors.title = 'Title should not exceed 200 characters';
  }

  if (!class_name) {
    errors.class_name = 'Class is required';
  }

  return errors;
};

export const examToEditForm = (exam = {}) => ({
  title: exam.title || '',
  from_date: exam.from_date || '',
  class_name: typeof exam.class_name === 'object' ? exam.class_name?.id : exam.class_name || '',
  section: typeof exam.section === 'object' ? exam.section?.id : exam.section || '',
  batch: typeof exam.batch === 'object' ? exam.batch?.id : exam.batch || '',
});

/** Stable key for shells that belong to the same admin-created exam series. */
export const getExamGroupKey = (exam = {}) => {
  const title = (exam.title || '').trim().toLowerCase();
  const fromDate = exam.from_date || '';
  return `${title}::${fromDate}`;
};

const compareAudience = (a, b) => {
  const aLabel = formatAudienceLabel(a);
  const bLabel = formatAudienceLabel(b);
  return aLabel.localeCompare(bLabel, undefined, { numeric: true, sensitivity: 'base' });
};

export const getGroupScheduleSummary = (shells = []) => {
  const total = shells.length;
  const scheduledCount = shells.filter((exam) => exam.is_scheduled === true).length;

  if (total === 0) {
    return { label: 'Pending teacher', tone: 'warning', scheduledCount: 0, total: 0 };
  }
  if (scheduledCount === 0) {
    return { label: 'Pending teacher', tone: 'warning', scheduledCount, total };
  }
  if (scheduledCount === total) {
    return { label: 'Scheduled', tone: 'success', scheduledCount, total };
  }
  return {
    label: `${scheduledCount}/${total} scheduled`,
    tone: 'mixed',
    scheduledCount,
    total,
  };
};

/**
 * Collapse API shells into unique exams (title + from_date).
 * Clicking a group reveals per-class/section shells.
 */
export const groupUpcomingExams = (exams = []) => {
  const map = new Map();

  exams.forEach((exam) => {
    const key = getExamGroupKey(exam);
    if (!map.has(key)) {
      map.set(key, {
        key,
        title: exam.title || 'Untitled exam',
        from_date: exam.from_date || null,
        shells: [],
      });
    }
    map.get(key).shells.push(exam);
  });

  return [...map.values()]
    .map((group) => {
      const shells = [...group.shells].sort(compareAudience);
      const newest = shells.reduce((latest, exam) => {
        const stamp = exam.modified_on || exam.created_on || '';
        return stamp > (latest || '') ? stamp : latest;
      }, '');

      return {
        ...group,
        shells,
        shellCount: shells.length,
        schedule: getGroupScheduleSummary(shells),
        classLabels: [...new Set(shells.map((s) => s.class_name_display).filter(Boolean))],
        newest,
      };
    })
    .sort((a, b) => {
      if (a.from_date && b.from_date && a.from_date !== b.from_date) {
        return a.from_date.localeCompare(b.from_date);
      }
      if (a.from_date && !b.from_date) return -1;
      if (!a.from_date && b.from_date) return 1;
      return a.title.localeCompare(b.title);
    });
};
