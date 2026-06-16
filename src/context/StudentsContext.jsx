import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createStudentSearchFilter } from '../utils/searchUtils';
import { useAcademicYear } from './AcademicYearContext';

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

  const [loading, setLoading] = useState(true);
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
        throw new Error('No authentication token found');
      }

      const response = await axios.get('https://spoorthi-dev.genzix.space/masters/students/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        setStudents(response.data.data);
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
    setStudents(prev => [newStudent, ...prev]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
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
      filtered = filtered.filter(student => student.batch === filters.batch);
    }

    // Apply class filter
    if (filters.class) {
      filtered = filtered.filter(student => student.class_name?.name === filters.class);
    }

    // Apply group filter
    if (filters.group) {
      filtered = filtered.filter(student => student.group === filters.group);
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
      filtered = filtered.filter(student => student.batch === filters.category);
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
          return student.batch;
        case 'class':
          return student.class_name?.name;
        case 'group':
          return student.group;
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

  // Initial fetch on mount
  useEffect(() => {
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
    lastFetchTime
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}; 