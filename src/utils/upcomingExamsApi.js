import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { getApiErrorMessage } from './bulkUploadUtils';

const BASE = `${API_BASE_URL}/masters/upcoming-exams/`;

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const jsonHeaders = () => ({
  ...authHeaders(),
  'Content-Type': 'application/json',
});

export const isForbiddenError = (error) => error?.response?.status === 403;

export const formatUpcomingExamError = (error, fallback = 'Something went wrong') => {
  if (isForbiddenError(error)) {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      'You do not have permission to perform this action. Only administrators can create, update, or delete upcoming exams.'
    );
  }
  return getApiErrorMessage(error, fallback);
};

export const buildUpcomingExamsQueryParams = ({
  classId,
  sectionId,
  batchId,
  scheduled,
} = {}) => {
  const params = {};
  if (classId) params.class_id = classId;
  if (sectionId) params.section_id = sectionId;
  if (batchId) params.batch_id = batchId;
  if (scheduled === true || scheduled === false || scheduled === 'true' || scheduled === 'false') {
    params.scheduled = String(scheduled);
  }
  return params;
};

const normalizeListPayload = (responseData) => {
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.results)) return responseData.results;
  if (Array.isArray(responseData)) return responseData;
  return [];
};

export const fetchUpcomingExams = async (query = {}) => {
  const response = await axios.get(BASE, {
    headers: authHeaders(),
    params: buildUpcomingExamsQueryParams(query),
  });

  const list = normalizeListPayload(response.data);
  return {
    count: response.data?.count ?? list.length,
    data: list,
    raw: response.data,
  };
};

export const fetchUpcomingExamById = async (examId) => {
  const response = await axios.get(`${BASE}${examId}/`, {
    headers: authHeaders(),
  });
  return response.data?.data ?? response.data;
};

export const createUpcomingExams = async (payload) => {
  const response = await axios.post(BASE, payload, {
    headers: jsonHeaders(),
  });

  const created = normalizeListPayload(response.data);
  return {
    status: response.data?.status || 'success',
    count: response.data?.count ?? created.length,
    data: created.length > 0 ? created : [response.data?.data ?? response.data].filter(Boolean),
    raw: response.data,
  };
};

export const updateUpcomingExam = async (examId, payload, { method = 'patch' } = {}) => {
  const verb = method === 'put' ? 'put' : 'patch';
  const response = await axios[verb](`${BASE}${examId}/`, payload, {
    headers: jsonHeaders(),
  });
  return response.data?.data ?? response.data;
};

export const deleteUpcomingExam = async (examId) => {
  const response = await axios.delete(`${BASE}${examId}/`, {
    headers: authHeaders(),
  });
  return response.data;
};
