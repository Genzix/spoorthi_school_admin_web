import { API_BASE_URL } from '@/config/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  buildSectionsByClass,
  employeeHasAssignments,
  formatAssignmentsSummary,
  getTeachingAssignmentChips,
  groupEmployeeAssignments,
  normalizeApiList,
} from '../utils/employeeAssignments';

export const useClassSectionLookup = () => {
  const [classes, setClasses] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;

        const [classesResponse, sectionsResponse, departmentsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/masters/classes/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/masters/sections/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/employees/departments/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setClasses(normalizeApiList(classesResponse));
        setAllSections(normalizeApiList(sectionsResponse));
        setDepartments(normalizeApiList(departmentsResponse));
      } catch (error) {
        console.error('Error fetching class/section masters:', error);
        setClasses([]);
        setAllSections([]);
        setDepartments([]);
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

  const departmentMap = useMemo(
    () => Object.fromEntries(departments.map((dept) => [dept.id, dept])),
    [departments]
  );

  const getAssignmentChips = useCallback(
    (employee) => {
      const teachingChips = getTeachingAssignmentChips(
        employee,
        classMap,
        sectionMap,
        departmentMap
      );

      if (teachingChips.length > 0) {
        return teachingChips;
      }

      // Legacy fallback: flatten handled_classes / handled_sections into chips
      const groups = groupEmployeeAssignments(
        employee?.handled_classes,
        employee?.handled_sections,
        classMap,
        sectionsByClass
      );

      return groups.flatMap((group) => {
        if (group.sections.length === 0) {
          return [{
            key: group.classId,
            label: `${group.className} (no sections)`,
          }];
        }
        return group.sections.map((section) => ({
          key: `${group.classId}-${section.id}`,
          label: `${group.className}-${section.label}`,
        }));
      });
    },
    [classMap, sectionMap, departmentMap, sectionsByClass]
  );

  const getGroupedAssignments = useCallback(
    (employee) => {
      if (Array.isArray(employee?.teaching_assignments) && employee.teaching_assignments.length > 0) {
        return getAssignmentChips(employee).map((chip) => ({
          classId: chip.key,
          className: chip.label,
          sections: [],
          isComplete: true,
          chipLabel: chip.label,
        }));
      }

      return groupEmployeeAssignments(
        employee?.handled_classes,
        employee?.handled_sections,
        classMap,
        sectionsByClass
      );
    },
    [classMap, sectionsByClass, getAssignmentChips]
  );

  const getAssignmentsSummary = useCallback(
    (employee) => formatAssignmentsSummary(employee, classMap, sectionsByClass, departmentMap),
    [classMap, sectionsByClass, departmentMap]
  );

  return {
    classes,
    classMap,
    sectionMap,
    departmentMap,
    departments,
    sectionsByClass,
    allSections,
    loading,
    employeeHasAssignments,
    getAssignmentChips,
    getGroupedAssignments,
    getAssignmentsSummary,
  };
};
