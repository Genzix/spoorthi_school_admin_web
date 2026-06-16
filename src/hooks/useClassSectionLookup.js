import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  buildSectionsByClass,
  formatAssignmentsSummary,
  groupEmployeeAssignments,
  normalizeApiList,
} from '../utils/employeeAssignments';

const API_BASE_URL = 'https://spoorthischool.genzix.space';

export const useClassSectionLookup = () => {
  const [classes, setClasses] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;

        const [classesResponse, sectionsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/masters/classes/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/masters/sections/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setClasses(normalizeApiList(classesResponse));
        setAllSections(normalizeApiList(sectionsResponse));
      } catch (error) {
        console.error('Error fetching class/section masters:', error);
        setClasses([]);
        setAllSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMasters();
  }, []);

  const sectionsByClass = useMemo(
    () => buildSectionsByClass(allSections),
    [allSections]
  );

  const classMap = useMemo(
    () => Object.fromEntries(classes.map((cls) => [cls.id, cls])),
    [classes]
  );

  const sectionMap = useMemo(() => {
    const map = {};
    allSections.forEach((section) => {
      map[section.id] = section;
    });
    return map;
  }, [allSections]);

  const getGroupedAssignments = useCallback(
    (employee) => groupEmployeeAssignments(
      employee?.handled_classes,
      employee?.handled_sections,
      classMap,
      sectionsByClass
    ),
    [classMap, sectionsByClass]
  );

  const getAssignmentsSummary = useCallback(
    (employee) => formatAssignmentsSummary(employee, classMap, sectionsByClass),
    [classMap, sectionsByClass]
  );

  return {
    classes,
    classMap,
    sectionMap,
    sectionsByClass,
    allSections,
    loading,
    getGroupedAssignments,
    getAssignmentsSummary,
  };
};
