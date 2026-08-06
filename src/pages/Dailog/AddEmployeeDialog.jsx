import { API_BASE_URL } from '@/config/api';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import axios from 'axios';
import Add from '../../assets/add.svg';
import {
  buildSectionsByClass,
  createEmptyTeachingAssignment,
  getSectionDisplayLabel,
  getSectionsForClass,
  isCompleteTeachingAssignment,
  normalizeApiList,
  normalizeTeachingAssignmentsFromApi,
  validateTeachingAssignments,
} from '../../utils/employeeAssignments';
import { prepareEmployeeRequest, formatEmployeeApiError } from '../../utils/employeeApi';
import { fetchBatches } from '../../utils/groupBatchMasters';
import BrandSelect from '../../components/BrandSelect';


const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE = '480px';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    align-items: flex-start;
  }
`;

const DialogContainer = styled.div`
  position: absolute;
  right: 0;
  background-color: var(--color-panel, #FFE6BB);
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
  }
`;

const DialogHeader = styled.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-left: 1rem;
    margin-top: max(1rem, env(safe-area-inset-top));
    padding-right: 1rem;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    margin-left: 0.75rem;
    margin-top: max(0.75rem, env(safe-area-inset-top));
    padding-right: 0.75rem;
  }
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }

  @media (max-width: ${SMALL_MOBILE}) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-top: 0.75rem;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-primary-soft);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: ${spin} 1s ease-in-out infinite;
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FEA592;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
`;

const CloseIcon = styled.img`
  height: 1.8vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 18px;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 1.25rem;
  }
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const UploadButton = styled.label`
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: var(--color-on-primary, #111111);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

const EmployeeForm = styled.form`
  input:not([type="checkbox"]):not([type="file"]),
  select,
  button[type="submit"] {
    box-sizing: border-box;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    input:not([type="checkbox"]):not([type="file"]),
    select:not([data-assignment-select="true"]) {
      padding: 0.75rem 1rem !important;
      font-size: 16px !important;
      border-radius: 0.5rem !important;
      min-height: 44px !important;
    }

    button[type="submit"] {
      padding: 0.85rem 1rem !important;
      font-size: 1rem !important;
      font-weight: 500;
      border-radius: 0.5rem !important;
      min-height: 48px !important;
      margin-bottom: max(1.5rem, env(safe-area-inset-bottom)) !important;
    }

    label {
      font-size: 0.85rem !important;
    }

    & > div {
      margin-bottom: 1rem !important;
    }

    [data-flex-row="true"] {
      flex-direction: column !important;
      gap: 0.75rem !important;
      margin-bottom: 1.25rem !important;
    }

    [data-photo-box="true"] {
      width: 100px !important;
      height: 100px !important;
      border-radius: 1rem !important;
    }

    [data-photo-hint="true"] {
      font-size: 0.8rem !important;
    }
  }

  @media (max-width: ${SMALL_MOBILE}) {
    input:not([type="checkbox"]):not([type="file"]),
    select:not([data-assignment-select="true"]) {
      padding: 0.65rem 0.85rem !important;
      font-size: 15px !important;
      min-height: 42px !important;
    }

    button[type="submit"] {
      font-size: 0.95rem !important;
      min-height: 46px !important;
    }

    [data-photo-box="true"] {
      width: 88px !important;
      height: 88px !important;
    }
  }
`;

const ErrorAlert = styled.div`
  color: red;
  margin-bottom: 15px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 4px;
  white-space: pre-line;
  font-family: "Roboto", sans-serif;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.875rem;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
`;

const AssignmentSection = styled.div`
  margin-bottom: 2.4vh;
  padding: 1.4vh 1vw;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 12px;
  }
`;

const AssignmentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 0.85rem;
  }
`;

const AssignmentHeaderText = styled.div`
  min-width: 0;
`;

const AssignmentTitle = styled.label`
  display: block;
  margin: 0 0 0.35vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.85vw;
  letter-spacing: 0.2px;
  color: #1a1a1a;
  font-weight: 600;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }
`;

const AssignmentHint = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.68vw;
  line-height: 1.45;
  color: #777;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.8rem;
  }
`;

const AssignmentError = styled.p`
  margin: 0 0 1vh;
  padding: 0.6vh 0.6vw;
  border-radius: 8px;
  background: #fff1f0;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #c62828;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

const AssignmentRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 0.65rem;
  }
`;

const AssignmentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 0.45vw;
  align-items: end;
  padding: 0.85vh 0.55vw;
  border-radius: 12px;
  background: #faf7f2;
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr 1fr;
    gap: 0.55rem;
    padding: 0.75rem;
    border-radius: 10px;
  }
`;

const AssignmentField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35vh;
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 0.3rem;
  }
`;

const AssignmentFieldLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.62vw;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: #888;
  text-transform: uppercase;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.7rem;
  }
`;

const AssignmentRowActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.15vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-column: 1 / -1;
    justify-content: flex-end;
    padding-bottom: 0;
  }
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2vw;
  height: 2vw;
  min-width: 34px;
  min-height: 34px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: ${(props) => (props.$danger ? 'rgba(198, 40, 40, 0.08)' : 'var(--color-primary)')};
  color: ${(props) => (props.$danger ? '#c62828' : 'var(--color-on-primary, #1a1a1a)')};
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$danger ? 'rgba(198, 40, 40, 0.14)' : 'var(--color-secondary)')};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  svg {
    width: 0.9vw;
    height: 0.9vw;
    min-width: 15px;
    min-height: 15px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 40px;
    height: 40px;
  }
`;

const AddAssignmentButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4vw;
  margin-top: ${(props) => (props.$flush ? '0' : '0.9vh')};
  width: ${(props) => (props.$flush ? 'auto' : '100%')};
  padding: ${(props) => (props.$flush ? '0.55vw 0.9vw' : '0.65vw')};
  border-radius: 12px;
  border: ${(props) => (props.$flush ? 'none' : '1.5px dashed var(--color-primary)')};
  background: ${(props) => (props.$flush ? 'var(--color-primary)' : 'var(--color-primary-soft)')};
  color: ${(props) => (props.$flush ? 'var(--color-on-primary, #1a1a1a)' : '#333')};
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 500;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    background: ${(props) => (props.$flush ? 'var(--color-secondary)' : 'var(--color-primary-pulse)')};
    border-color: ${(props) => (props.$flush ? 'transparent' : 'var(--color-primary)')};
    transform: translateY(-1px);
  }

  svg {
    width: 0.85vw;
    height: 0.85vw;
    min-width: 14px;
    min-height: 14px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: ${(props) => (props.$flush ? '0' : '0.75rem')};
    padding: ${(props) => (props.$flush ? '0.7rem 1.1rem' : '0.8rem')};
    border-radius: 10px;
    font-size: 0.9rem;
    gap: 0.45rem;
    min-height: 44px;
  }
`;

const AssignmentEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6vh;
  padding: 2vh 1vw;
  border-radius: 12px;
  background: #faf7f2;
  border: 1px dashed #e5ddd0;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 1.25rem 1rem;
    gap: 0.5rem;
  }
`;

const AssignmentEmptyText = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #888;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.85rem;
  }
`;

const AssignmentChipPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4vw;
  margin-top: 1.1vh;
  padding-top: 1vh;
  border-top: 1px solid #f0ebe3;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 0.45rem;
    margin-top: 0.85rem;
    padding-top: 0.85rem;
  }
`;

const AssignmentChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35vw;
  padding: 0.4vh 0.65vw;
  border-radius: 999px;
  background: var(--color-panel, #FFE6BB);
  border: 1px solid var(--color-primary-soft);
  font-family: "Roboto", sans-serif;
  font-size: 0.68vw;
  font-weight: 500;
  color: #333;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 12px;
    font-size: 0.78rem;
    gap: 0.35rem;
  }
`;

const InlineLoader = styled.span`
  display: block;
  padding: 1.2vh 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #888;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.85rem;
    padding: 1rem 0;
  }
`;

const AddEmployeeDialog = ({ onClose, onSuccess, isEditMode = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    employee_no: initialData?.employee_no || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    salary: initialData?.salary || '',
    department: initialData?.department?.id || initialData?.department || '',
    category: initialData?.category?.id || initialData?.category || '',
    is_active: initialData?.is_active ?? true,
    photo: null,
    joining_date: initialData?.joining_date || ''
  });

  const [teachingAssignments, setTeachingAssignments] = useState(() => {
    const fromApi = normalizeTeachingAssignmentsFromApi(initialData?.teaching_assignments);
    return fromApi.length > 0 ? fromApi : [];
  });
  const [classes, setClasses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [allSections, setAllSections] = useState([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [assignmentError, setAssignmentError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fetchingDepartments, setFetchingDepartments] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const [fetchingBatches, setFetchingBatches] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialData?.photo ? `${API_BASE_URL}${initialData.photo}` : null
  );

  const sectionsByClass = useMemo(
    () => buildSectionsByClass(allSections),
    [allSections]
  );

  const departmentMap = useMemo(
    () => Object.fromEntries(departments.map((dept) => [dept.id, dept])),
    [departments]
  );

  const batchMap = useMemo(
    () => Object.fromEntries(batches.map((batch) => [batch.id, batch])),
    [batches]
  );

  const assignmentPreviewChips = useMemo(() => {
    return teachingAssignments
      .filter(isCompleteTeachingAssignment)
      .map((row, index) => {
        const className = classes.find((cls) => cls.id === row.class_name)?.name || 'Unknown';
        const batchName = batchMap[row.batch]?.name || '';
        const classSections = getSectionsForClass(row.class_name, sectionsByClass);
        const section = classSections.find((item) => item.id === row.section);
        const sectionName = section?.name || 'Unknown';
        const departmentName = departmentMap[row.department]?.name || 'Unknown';
        const parts = [`${className}-${sectionName}`];
        if (batchName) parts.push(batchName);
        parts.push(departmentName);
        return {
          key: `${row.class_name}-${row.batch}-${row.section}-${row.department}-${index}`,
          label: parts.join(' · '),
        };
      });
  }, [teachingAssignments, classes, batchMap, sectionsByClass, departmentMap]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setInitialLoading(false);
        return;
      }

      try {
        setFetchingDepartments(true);
        setFetchingCategories(true);
        setFetchingClasses(true);
        setFetchingBatches(true);

        const [departmentsResponse, categoriesResponse, classesResponse, sectionsResponse, batchesList] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/employees/departments/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_BASE_URL}/employees/categories/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_BASE_URL}/masters/classes/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_BASE_URL}/masters/sections/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetchBatches(token),
          ]);

        setDepartments(departmentsResponse.data.data || []);
        setCategories(categoriesResponse.data.data || []);
        setClasses(normalizeApiList(classesResponse));
        setAllSections(normalizeApiList(sectionsResponse));
        setBatches(batchesList);
      } catch (err) {
        console.error('Error fetching employee form data:', err);
        setError('Failed to load employee form data');
      } finally {
        setFetchingDepartments(false);
        setFetchingCategories(false);
        setFetchingClasses(false);
        setFetchingBatches(false);
        setInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignmentChange = (index, field, value) => {
    setTeachingAssignments((prev) =>
      prev.map((row, rowIndex) => {
        if (rowIndex !== index) return row;

        const next = { ...row, [field]: value };
        if (field === 'class_name') {
          next.section = '';
        }
        return next;
      })
    );
    setAssignmentError(null);
  };

  const handleAddAssignment = () => {
    setTeachingAssignments((prev) => [...prev, createEmptyTeachingAssignment()]);
    setAssignmentError(null);
  };

  const handleRemoveAssignment = (index) => {
    setTeachingAssignments((prev) => prev.filter((_, rowIndex) => rowIndex !== index));
    setAssignmentError(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setAssignmentError(null);

    const assignmentValidationError = validateTeachingAssignments(teachingAssignments);

    if (assignmentValidationError) {
      setAssignmentError(assignmentValidationError);
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const hadExistingPhoto = Boolean(initialData?.photo);
      const { body, isMultipart } = prepareEmployeeRequest(
        formData,
        teachingAssignments,
        {
          photo: formData.photo,
          // Only clear when user removed an existing photo — not when there never was one
          removePhoto: isEditMode && hadExistingPhoto && !imagePreview && !(formData.photo instanceof File),
        }
      );

      const url = isEditMode
        ? `${API_BASE_URL}/employees/employees/${initialData.id}/`
        : `${API_BASE_URL}/employees/employees/`;

      const method = isEditMode ? 'put' : 'post';

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios[method](url, body, { headers });

      console.log(isEditMode ? 'Employee updated successfully:' : 'Employee added successfully:', response.data);
      onClose();
      onSuccess();
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} employee:`, err);
      setError(formatEmployeeApiError(err, `Failed to ${isEditMode ? 'update' : 'add'} employee`));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (initialLoading) {
    return (
      <DialogOverlay>
        <DialogContainer>
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        </DialogContainer>
      </DialogOverlay>
    );
  }

  return (
    <DialogOverlay>
      <DialogContainer>
        <DialogHeader>
          <CircleIconContainer onClick={onClose}>
            <CloseIcon
              src={Add}
              style={{ transform: 'rotate(-45deg)' }}
              alt="Close"
            />
          </CircleIconContainer>
        </DialogHeader>
        <DialogContent>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <EmployeeForm onSubmit={handleSubmit}>
            <ImageUploadContainer>
              {imagePreview ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <label style={{ display: 'contents', cursor: 'pointer' }}>
                    <ImagePreview
                      src={imagePreview}
                      data-photo-box="true"
                      style={{
                        width: '13vh',
                        height: '13vh',
                        borderRadius: '2vh',
                        backgroundColor: '#fff',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      alt="Employee Preview"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.5)',
                      border: 'none',
                      borderRadius: '50%',
                      color: 'white',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <label style={{ display: 'contents', cursor: 'pointer' }}>
                  <div
                    data-photo-box="true"
                    style={{
                      width: '13vh',
                      height: '13vh',
                      borderRadius: '2vh',
                      backgroundColor: '#fff',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '12px', textAlign: 'center' }}>Upload Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
              <label
                data-photo-hint="true"
                style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0.1vh',
                fontSize: '0.8vw',
                letterSpacing: '0.7px',
                color: '#000'
              }}>
                Add Employee Photo
              </label>
            </ImageUploadContainer>

            {/* Rest of your form fields remain the same */}
            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
                maxLength={100}
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="text"
                name="employee_no"
                placeholder="Employee No"
                value={formData.employee_no}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="number"
                name="salary"
                placeholder="Salary *"
                value={formData.salary}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="date"
                name="joining_date"
                placeholder="Joining Date"
                value={formData.joining_date}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1vw', marginBottom: '2.4vh' }} data-flex-row="true">
              <div style={{ flex: 1 }}>
                <BrandSelect
                  variant="field"
                  aria-label="Department"
                  placeholder="Select Department *"
                  value={formData.department}
                  disabled={fetchingDepartments}
                  onChange={(e) =>
                    handleChange({ target: { name: 'department', value: e.target.value } })
                  }
                  options={[
                    { value: '', label: 'Select Department *' },
                    ...departments.map((dept) => ({
                      value: String(dept.id),
                      label: dept.name,
                    })),
                  ]}
                />
              </div>
              <div style={{ flex: 1 }}>
                <BrandSelect
                  variant="field"
                  aria-label="Category"
                  placeholder="Select Category *"
                  value={formData.category}
                  disabled={fetchingCategories}
                  onChange={(e) =>
                    handleChange({ target: { name: 'category', value: e.target.value } })
                  }
                  options={[
                    { value: '', label: 'Select Category *' },
                    ...categories.map((cat) => ({
                      value: String(cat.id),
                      label: cat.name,
                    })),
                  ]}
                />
              </div>
            </div>

            <AssignmentSection>
              <AssignmentHeader>
                <AssignmentHeaderText>
                  <AssignmentTitle>Teaching assignments</AssignmentTitle>
                  <AssignmentHint>
                    Optional · same class/section can have multiple departments
                  </AssignmentHint>
                </AssignmentHeaderText>
              </AssignmentHeader>

              {assignmentError && <AssignmentError>{assignmentError}</AssignmentError>}

              {fetchingClasses ? (
                <InlineLoader>Loading classes...</InlineLoader>
              ) : classes.length === 0 ? (
                <InlineLoader>No classes available</InlineLoader>
              ) : teachingAssignments.length === 0 ? (
                <AssignmentEmpty>
                  <AssignmentEmptyText>No assignments yet</AssignmentEmptyText>
                  <AddAssignmentButton type="button" $flush onClick={handleAddAssignment}>
                    <FiPlus />
                    Add assignment
                  </AddAssignmentButton>
                </AssignmentEmpty>
              ) : (
                <>
                  <AssignmentRows>
                    {teachingAssignments.map((row, index) => {
                      const classSections = getSectionsForClass(row.class_name, sectionsByClass);

                      return (
                        <AssignmentRow key={`assignment-${index}`}>
                          <AssignmentField>
                            <AssignmentFieldLabel>Class</AssignmentFieldLabel>
                            <BrandSelect
                              variant="field"
                              aria-label={`Class for assignment ${index + 1}`}
                              placeholder="Select"
                              value={row.class_name}
                              onChange={(e) => handleAssignmentChange(index, 'class_name', e.target.value)}
                              options={[
                                { value: '', label: 'Select' },
                                ...classes.map((cls) => ({
                                  value: String(cls.id),
                                  label: cls.name,
                                })),
                              ]}
                            />
                          </AssignmentField>

                          <AssignmentField>
                            <AssignmentFieldLabel>Batch</AssignmentFieldLabel>
                            <BrandSelect
                              variant="field"
                              aria-label={`Batch for assignment ${index + 1}`}
                              placeholder="Select"
                              value={row.batch}
                              disabled={fetchingBatches}
                              onChange={(e) => handleAssignmentChange(index, 'batch', e.target.value)}
                              options={[
                                { value: '', label: 'Select' },
                                ...batches.map((batch) => ({
                                  value: String(batch.id),
                                  label: batch.name,
                                })),
                              ]}
                            />
                          </AssignmentField>

                          <AssignmentField>
                            <AssignmentFieldLabel>Section</AssignmentFieldLabel>
                            <BrandSelect
                              variant="field"
                              aria-label={`Section for assignment ${index + 1}`}
                              placeholder="Select"
                              value={row.section}
                              disabled={!row.class_name}
                              onChange={(e) => handleAssignmentChange(index, 'section', e.target.value)}
                              options={[
                                { value: '', label: 'Select' },
                                ...classSections.map((section) => ({
                                  value: String(section.id),
                                  label: getSectionDisplayLabel(section, classSections),
                                })),
                              ]}
                            />
                          </AssignmentField>

                          <AssignmentField>
                            <AssignmentFieldLabel>Department</AssignmentFieldLabel>
                            <BrandSelect
                              variant="field"
                              aria-label={`Department for assignment ${index + 1}`}
                              placeholder="Select"
                              value={row.department}
                              disabled={fetchingDepartments}
                              onChange={(e) => handleAssignmentChange(index, 'department', e.target.value)}
                              options={[
                                { value: '', label: 'Select' },
                                ...departments.map((dept) => ({
                                  value: String(dept.id),
                                  label: dept.name,
                                })),
                              ]}
                            />
                          </AssignmentField>

                          <AssignmentRowActions>
                            <IconButton
                              type="button"
                              $danger
                              onClick={() => handleRemoveAssignment(index)}
                              aria-label={`Remove assignment ${index + 1}`}
                              title="Remove"
                            >
                              <FiTrash2 />
                            </IconButton>
                          </AssignmentRowActions>
                        </AssignmentRow>
                      );
                    })}
                  </AssignmentRows>

                  <AddAssignmentButton type="button" onClick={handleAddAssignment}>
                    <FiPlus />
                    Add another
                  </AddAssignmentButton>
                </>
              )}

              {assignmentPreviewChips.length > 0 && (
                <AssignmentChipPreview>
                  {assignmentPreviewChips.map((chip) => (
                    <AssignmentChip key={chip.key}>{chip.label}</AssignmentChip>
                  ))}
                </AssignmentChipPreview>
              )}
            </AssignmentSection>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.6vw',
                borderRadius: '0.6vw',
                backgroundColor: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '0.8vw',
                letterSpacing: '0.7px',
                marginBottom: '5vh',
              }}
              disabled={submitting}
            >
              {submitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Employee' : 'Add Employee')}
            </button>
          </EmployeeForm>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default AddEmployeeDialog;