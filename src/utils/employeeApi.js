import { API_BASE_URL } from '@/config/api';
import axios from 'axios';
import { extractIds } from './employeeAssignments';



export const fetchEmployeeById = async (employeeId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get(`${API_BASE_URL}/employees/employees/${employeeId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.data?.status === 'success' && response.data?.data) {
    return response.data.data;
  }

  throw new Error(response.data?.message || 'Failed to fetch employee details');
};

export const buildEmployeePayload = (formData, handledClasses, handledSections) => {
  const classIds = extractIds(handledClasses);
  const sectionIds = extractIds(handledSections);

  return {
    name: formData.name?.trim() ?? '',
    employee_no: formData.employee_no?.trim() ?? '',
    email: formData.email?.trim() ?? '',
    phone: formData.phone?.trim() ?? '',
    salary: parseFloat(formData.salary) || 0,
    department: formData.department,
    category: formData.category,
    is_active: formData.is_active === true || formData.is_active === 'true',
    joining_date: formData.joining_date,
    handled_classes: classIds,
    handled_sections: sectionIds,
  };
};

const appendArrayField = (formDataObj, fieldName, ids) => {
  extractIds(ids).forEach((id) => {
    formDataObj.append(fieldName, id);
  });
};

export const buildEmployeeFormData = (
  formData,
  handledClasses,
  handledSections,
  { photo, removePhoto } = {}
) => {
  const payload = buildEmployeePayload(formData, handledClasses, handledSections);
  const formDataObj = new FormData();

  formDataObj.append('name', payload.name);
  formDataObj.append('employee_no', payload.employee_no);
  formDataObj.append('email', payload.email);
  formDataObj.append('phone', payload.phone);
  formDataObj.append('salary', payload.salary);
  formDataObj.append('department', payload.department);
  formDataObj.append('category', payload.category);
  formDataObj.append('is_active', payload.is_active);
  formDataObj.append('joining_date', payload.joining_date);

  appendArrayField(formDataObj, 'handled_classes', payload.handled_classes);
  appendArrayField(formDataObj, 'handled_sections', payload.handled_sections);

  if (photo instanceof File) {
    formDataObj.append('photo', photo);
  } else if (removePhoto) {
    formDataObj.append('photo', '');
  }

  return formDataObj;
};

export const prepareEmployeeRequest = (
  formData,
  handledClasses,
  handledSections,
  photoOptions = {}
) => {
  const { photo, removePhoto } = photoOptions;
  const needsMultipart = photo instanceof File || removePhoto;

  if (needsMultipart) {
    return {
      body: buildEmployeeFormData(formData, handledClasses, handledSections, photoOptions),
      isMultipart: true,
    };
  }

  return {
    body: buildEmployeePayload(formData, handledClasses, handledSections),
    isMultipart: false,
  };
};

export const formatEmployeeApiError = (err, fallbackMessage) => {
  const apiError = err.response?.data;

  if (apiError?.errors && typeof apiError.errors === 'object') {
    return Object.entries(apiError.errors)
      .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
      .join('\n');
  }

  if (apiError?.message) {
    return apiError.message;
  }

  if (typeof apiError === 'object' && apiError !== null) {
    return Object.entries(apiError)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n');
  }

  return err.message || fallbackMessage;
};
