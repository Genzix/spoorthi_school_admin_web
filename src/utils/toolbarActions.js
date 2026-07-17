/**
 * Shared toolbar action metadata for icon buttons.
 * Keep labels / descriptions here so Students & Employees stay consistent.
 */

export const STUDENT_TOOLBAR_ACTIONS = {
  export: {
    id: 'students-export',
    label: 'Export students',
    description: 'Download the current list as Excel or PDF',
    ariaLabel: 'Export students',
  },
  bulkUpload: {
    id: 'students-bulk-upload',
    label: 'Bulk upload',
    description: 'Import multiple students from an Excel file',
    ariaLabel: 'Bulk upload students',
  },
  add: {
    id: 'students-add',
    label: 'Add student',
    description: 'Create a new student record',
    ariaLabel: 'Add student',
  },
};

export const EMPLOYEE_TOOLBAR_ACTIONS = {
  add: {
    id: 'employees-add',
    label: 'Add employee',
    description: 'Create a new employee record',
    ariaLabel: 'Add employee',
  },
};
