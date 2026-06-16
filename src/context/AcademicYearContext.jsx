import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AcademicYearContext = createContext();

export const useAcademicYear = () => {
  const context = useContext(AcademicYearContext);
  if (!context) {
    throw new Error('useAcademicYear must be used within an AcademicYearProvider');
  }
  return context;
};

export const AcademicYearProvider = ({ children }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Cache duration in milliseconds (10 minutes)
  const CACHE_DURATION = 10 * 60 * 1000;

  const fetchAcademicYears = async (forceRefresh = false) => {
    try {
      const now = Date.now();
      const shouldUseCache = !forceRefresh &&
        lastFetchTime &&
        (now - lastFetchTime) < CACHE_DURATION &&
        academicYears.length > 0;

      if (shouldUseCache) {
        console.log('Using cached academic years data');
        return;
      }

      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('https://spoorthi-dev.genzix.space/masters/academic-years/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        const data = response.data.data || [];
        setAcademicYears(data);
        setLastFetchTime(now);
        console.log('Academic years fetched and cached:', data);

        // Select the "top one" (first item) as default
        if (data.length > 0) {
          const savedId = localStorage.getItem('selectedAcademicYearId');
          const found = data.find(ay => ay.id === savedId);
          if (found) {
            setSelectedAcademicYear(found);
          } else {
            // Default to the first (top) one in the list
            setSelectedAcademicYear(data[0]);
            localStorage.setItem('selectedAcademicYearId', data[0].id);
          }
        }
      } else {
        throw new Error('Failed to fetch academic years');
      }
    } catch (err) {
      console.error('Failed to fetch academic years', err);
      setError('Failed to load academic years. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeSelectedAcademicYear = (academicYearId) => {
    const found = academicYears.find(ay => ay.id === academicYearId);
    if (found) {
      setSelectedAcademicYear(found);
      localStorage.setItem('selectedAcademicYearId', academicYearId);
    } else if (academicYearId === '') {
      setSelectedAcademicYear(null);
      localStorage.removeItem('selectedAcademicYearId');
    }
  };

  // Fetch when token becomes available (e.g. login)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchAcademicYears();
    } else {
      setLoading(false);
    }

    // Listener for login status or token updates
    const handleStorageChange = () => {
      const currentToken = localStorage.getItem('token');
      if (currentToken && academicYears.length === 0) {
        fetchAcademicYears();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const value = {
    academicYears,
    selectedAcademicYear,
    setSelectedAcademicYear: changeSelectedAcademicYear,
    loading,
    error,
    fetchAcademicYears,
  };

  return (
    <AcademicYearContext.Provider value={value}>
      {children}
    </AcademicYearContext.Provider>
  );
};
