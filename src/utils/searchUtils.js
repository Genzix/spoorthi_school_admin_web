/**
 * Utility functions for safe string searching across different data types
 */

/**
 * Safely checks if a value contains a search term
 * @param {any} value - The value to search in
 * @param {string} searchTerm - The term to search for
 * @returns {boolean} - True if the value contains the search term
 */
export const safeIncludes = (value, searchTerm) => {
  if (!value || !searchTerm) return false;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  if (typeof value === 'string') {
    return value.toLowerCase().includes(lowerSearchTerm);
  } else if (typeof value === 'number') {
    return value.toString().includes(lowerSearchTerm);
  } else if (Array.isArray(value)) {
    return value.some(item => safeIncludes(item, searchTerm));
  }
  
  return false;
};

/**
 * Safely checks if a phone number (or array of phone numbers) contains a search term
 * @param {any} phoneNumbers - Phone number(s) to search in
 * @param {string} searchTerm - The term to search for
 * @returns {boolean} - True if any phone number contains the search term
 */
export const searchPhoneNumbers = (phoneNumbers, searchTerm) => {
  if (!phoneNumbers || !searchTerm) return false;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  if (Array.isArray(phoneNumbers)) {
    return phoneNumbers.some(phone => {
      if (typeof phone === 'string') {
        return phone.toLowerCase().includes(lowerSearchTerm);
      } else if (typeof phone === 'number') {
        return phone.toString().includes(lowerSearchTerm);
      }
      return false;
    });
  } else if (typeof phoneNumbers === 'string') {
    return phoneNumbers.toLowerCase().includes(lowerSearchTerm);
  } else if (typeof phoneNumbers === 'number') {
    return phoneNumbers.toString().includes(lowerSearchTerm);
  }
  
  return false;
};

/**
 * Creates a search filter function for students
 * @param {string} searchTerm - The search term
 * @returns {Function} - A filter function that can be used with Array.filter()
 */
export const createStudentSearchFilter = (searchTerm) => {
  if (!searchTerm) return () => true;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return (student) => {
    const nameMatch = safeIncludes(student.name, searchTerm);
    const admissionNoMatch = safeIncludes(student.admission_no, searchTerm);
    const phoneMatch = searchPhoneNumbers(student.phone_numbers, searchTerm);
    const fatherMatch = safeIncludes(student.father_name, searchTerm);
    
    return nameMatch || admissionNoMatch || phoneMatch || fatherMatch;
  };
};

/**
 * Creates a search filter function for employees
 * @param {string} searchTerm - The search term
 * @returns {Function} - A filter function that can be used with Array.filter()
 */
export const createEmployeeSearchFilter = (searchTerm) => {
  if (!searchTerm) return () => true;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return (employee) => {
    const nameMatch = safeIncludes(employee.name, searchTerm);
    const employeeNoMatch = safeIncludes(employee.employee_no, searchTerm);
    const emailMatch = safeIncludes(employee.email, searchTerm);
    const phoneMatch = searchPhoneNumbers(employee.phone, searchTerm);
    const departmentMatch = safeIncludes(employee.department_name, searchTerm);
    const categoryMatch = safeIncludes(employee.category_name, searchTerm);
    
    return nameMatch || employeeNoMatch || emailMatch || phoneMatch || departmentMatch || categoryMatch;
  };
}; 