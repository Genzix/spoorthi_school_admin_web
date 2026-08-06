import { API_BASE_URL } from '@/config/api';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createStudentSearchFilter } from '../utils/searchUtils';
import { extractMasterName, normalizeStudentRecord } from '../utils/bulkUploadUtils';
import { useAcademicYear } from './AcademicYearContext';
import { searchStudents, fetchStudentFilterOptions } from '../utils/studentSearchApi';

const StudentsContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};

export const StudentsProvider = ({ children }) => {
  const { selectedAcademicYear } = useAcademicYear();
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(() => !!localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

  const fetchStudents = async (forceRefresh = false) => {
    try {
      // Check if we should use cached data
      const now = Date.now();
      const shouldUseCache = !forceRefresh &&
        lastFetchTime &&
        (now - lastFetchTime) < CACHE_DURATION &&
        students.length > 0;

      if (shouldUseCache) {
        console.log('Using cached students data');
        return;
      }

      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/students/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        const records = Array.isArray(response.data.data)
          ? response.data.data.map(normalizeStudentRecord)
          : [];
        setStudents(records);
        setLastFetchTime(now);
        console.log('Students data fetched and cached');
      } else {
        throw new Error('Failed to fetch students data');
      }
    } catch (error) {
      console.error('Failed to fetch students', error);
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshStudents = () => {
    setIsRefreshing(true);
    fetchStudents(true);
  };

  const addStudent = (newStudent) => {
    setStudents(prev => [normalizeStudentRecord(newStudent), ...prev]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === updatedStudent.id ? normalizeStudentRecord(updatedStudent) : student
      )
    );
  };

  const deleteStudent = (studentId) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
  };

  const getStudentById = (studentId) => {
    return students.find(student => student.id === studentId);
  };

  const getFilteredStudents = (filters = {}) => {
    let filtered = [...students];

    // Apply academic year filter (either explicitly passed or globally selected)
    const academicYearId = filters.academicYear !== undefined && filters.academicYear !== null
      ? filters.academicYear 
      : (selectedAcademicYear?.id || '');
      
    if (academicYearId) {
      filtered = filtered.filter(student => student.academic_year?.id === academicYearId);
    }

    // Apply search filter
    if (filters.searchTerm) {
      const searchFilter = createStudentSearchFilter(filters.searchTerm);
      filtered = filtered.filter(searchFilter);
    }


    // Apply batch filter
    if (filters.batch) {
      const normalizedBatchFilter = extractMasterName(filters.batch);
      filtered = filtered.filter(
        (student) => extractMasterName(student.batch) === normalizedBatchFilter
      );
    }

    // Apply class filter
    if (filters.class) {
      filtered = filtered.filter(student => student.class_name?.name === filters.class);
    }

    // Apply group filter
    if (filters.group) {
      const normalizedGroupFilter = extractMasterName(filters.group);
      filtered = filtered.filter(
        (student) => extractMasterName(student.group) === normalizedGroupFilter
      );
    }

    // Apply section filter
    if (filters.section) {
      filtered = filtered.filter(student => student.section?.name === filters.section);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(student => student.status === filters.status);
    }

    // Apply pending fees filter
    if (filters.hasPendingFees) {
      filtered = filtered.filter(student => student.pending_fees > 0);
    }

    // Apply material filters
    if (filters.materials) {
      // Books filter
      if (filters.materials.books !== null && filters.materials.books !== undefined) {
        filtered = filtered.filter(student => student.is_bookes_given === filters.materials.books);
      }

      // Uniform filter
      if (filters.materials.uniform !== null && filters.materials.uniform !== undefined) {
        filtered = filtered.filter(student => student.is_uniform_given === filters.materials.uniform);
      }

      // Bag filter
      if (filters.materials.bag !== null && filters.materials.bag !== undefined) {
        filtered = filtered.filter(student => student.is_bag_given === filters.materials.bag);
      }
    }

    // Apply category filter (for backward compatibility)
    if (filters.category) {
      const normalizedCategoryFilter = extractMasterName(filters.category);
      filtered = filtered.filter(
        (student) => extractMasterName(student.batch) === normalizedCategoryFilter
      );
    }

    // Apply admission status filter
    if (filters.admissionOnly) {
      filtered = filtered.filter(student => student.status === 'admission');
    }

    // Always reverse the order to show newest first
    return filtered.reverse();
  };

  const getUniqueValues = (field) => {
    const values = students.map(student => {
      switch (field) {
        case 'batch':
          return extractMasterName(student.batch);
        case 'class':
          return student.class_name?.name;
        case 'group':
          return extractMasterName(student.group);
        case 'section':
          return student.section?.name;
        case 'status':
          return student.status;
        default:
          return null;
      }
    }).filter(Boolean);

    return [...new Set(values)];
  };

  // Initial fetch only when authenticated (providers wrap /login too)
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      return;
    }
    fetchStudents();
  }, []);

  const value = {
    students,
    loading,
    error,
    isRefreshing,
    fetchStudents,
    refreshStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    getFilteredStudents,
    getUniqueValues,
    lastFetchTime,
    // Prefer these for list screens (lean payload + cascade filters)
    searchStudents,
    fetchStudentFilterOptions,
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}; 