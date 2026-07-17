import { API_BASE_URL } from '@/config/api';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createEmployeeSearchFilter, safeIncludes } from '../utils/searchUtils';
import { getAssignmentsSearchText, employeeHasAssignments } from '../utils/employeeAssignments';
import { useClassSectionLookup } from '../hooks/useClassSectionLookup';

const EmployeesContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeesProvider');
  }
  return context;
};

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    classMap,
    sectionsByClass,
    departmentMap,
    loading: assignmentsLookupLoading,
    getGroupedAssignments,
    getAssignmentsSummary,
    getAssignmentChips,
  } = useClassSectionLookup();

  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

  const fetchEmployees = async (forceRefresh = false) => {
    try {
      // Check if we should use cached data
      const now = Date.now();
      const shouldUseCache = !forceRefresh &&
        lastFetchTime &&
        (now - lastFetchTime) < CACHE_DURATION &&
        employees.length > 0;

      if (shouldUseCache) {
        console.log('Using cached employees data');
        return;
      }

      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/employees/employees/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        setEmployees(response.data.data);
        setLastFetchTime(now);
        console.log('Employees data fetched and cached');
      } else {
        throw new Error('Failed to fetch employees data');
      }
    } catch (error) {
      console.error('Failed to fetch employees', error);
      setError('Failed to load employees. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshEmployees = () => {
    setIsRefreshing(true);
    fetchEmployees(true);
  };

  const addEmployee = (newEmployee) => {
    setEmployees(prev => [newEmployee, ...prev]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prev =>
      prev.map(employee =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(employee => employee.id !== employeeId));
  };

  const getEmployeeById = (employeeId) => {
    return employees.find(employee => employee.id === employeeId);
  };

  const getFilteredEmployees = (filters = {}) => {
    let filtered = [...employees];

    // Apply search filter
    if (filters.searchTerm) {
      const searchFilter = createEmployeeSearchFilter(filters.searchTerm);
      filtered = filtered.filter((employee) => {
        if (searchFilter(employee)) return true;

        const assignmentText = getAssignmentsSearchText(
          employee,
          classMap,
          sectionsByClass,
          departmentMap
        );
        return safeIncludes(assignmentText, filters.searchTerm);
      });
    }

    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter(employee => employee.department_name === filters.department);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(employee => employee.category_name === filters.category);
    }

    // Apply status filter
    if (filters.is_active !== undefined && filters.is_active !== '') {
      filtered = filtered.filter(employee => employee.is_active === filters.is_active);
    }

    return filtered;
  };

  const getUniqueValues = (field) => {
    const values = employees.map(employee => {
      switch (field) {
        case 'department':
          return employee.department_name;
        case 'category':
          return employee.category_name;
        case 'status':
          return employee.is_active;
        default:
          return null;
      }
    }).filter(Boolean);

    return [...new Set(values)];
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const value = {
    employees,
    loading,
    error,
    isRefreshing,
    fetchEmployees,
    refreshEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getFilteredEmployees,
    getUniqueValues,
    lastFetchTime,
    classMap,
    sectionsByClass,
    assignmentsLookupLoading,
    getGroupedAssignments,
    getAssignmentsSummary,
    getAssignmentChips,
    employeeHasAssignments,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}; 