import { API_BASE_URL } from '@/config/api';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import Add from '../../assets/add.svg';
import { extractIds, validateHandledAssignments, buildSectionsByClass, getSectionsForClass, getSectionDisplayLabel, normalizeApiList } from '../../utils/employeeAssignments';
import { prepareEmployeeRequest, formatEmployeeApiError } from '../../utils/employeeApi';


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
  background-color: #FFE6BB;
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
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
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
  background-color: #FFB942;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFA726;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1.2vw;
  height: 1.2vw;
  margin-left: 0.4vw;
  cursor: pointer;
  border-radius: 8px;
  background-color: white;
  border: 0px solid #e0e0e0;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  transition: all 0.2s;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  flex-shrink: 0;
  
  &:checked {
    background-color: #FFB942;
    border-color: #FFB942;
    
    &::after {
      content: "✓";
      position: absolute;
      color: black;
      font-size: 0.8vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  &:hover {
    border-color: #FFB942;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    margin-left: 0;

    &:checked::after {
      font-size: 14px;
    }
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
    select {
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
    select {
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
  padding: 1.2vh 0.8vw;
  border-radius: 0.6vw;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid #fff;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 1rem;
    padding: 0.875rem;
    border-radius: 0.5rem;
  }
`;

const AssignmentTitle = styled.label`
  display: block;
  margin-bottom: 1vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  color: #000;
  font-weight: 500;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
`;

const AssignmentHint = styled.p`
  margin: 0 0 1.2vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  letter-spacing: 0.5px;
  color: #555;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
`;

const AssignmentError = styled.p`
  margin: 0 0 1vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #c62828;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.8rem;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  max-height: 18vh;
  overflow-y: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-height: 200px;
    gap: 0.5rem;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.78vw;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: ${(props) => (props.$warning ? '#c62828' : '#000')};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.875rem;
    gap: 0.5rem;
    min-height: 36px;
  }
`;

const ClassSectionGroup = styled.div`
  margin-top: 1.2vh;
  padding-top: 1vh;
  border-top: 1px solid rgba(255, 255, 255, 0.8);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
  }
`;

const ClassSectionGroupTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  letter-spacing: 0.5px;
  font-weight: 500;
  margin-bottom: 0.8vh;
  color: ${(props) => (props.$warning ? '#c62828' : '#333')};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
`;

const InlineLoader = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #666;
  font-style: italic;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.8rem;
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

  const [handledClasses, setHandledClasses] = useState(() => extractIds(initialData?.handled_classes));
  const [handledSections, setHandledSections] = useState(() => extractIds(initialData?.handled_sections));
  const [classes, setClasses] = useState([]);
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
  const [imagePreview, setImagePreview] = useState(
    initialData?.photo ? `${API_BASE_URL}${initialData.photo}` : null
  );

  const sectionsByClass = useMemo(
    () => buildSectionsByClass(allSections),
    [allSections]
  );

  const classesMissingSections = useMemo(() => {
    if (handledClasses.length === 0) return [];

    const classesWithSections = new Set();
    handledSections.forEach((sectionId) => {
      Object.entries(sectionsByClass).forEach(([classId, sections]) => {
        if (sections.some((section) => section.id === sectionId)) {
          classesWithSections.add(classId);
        }
      });
    });

    return handledClasses.filter((classId) => !classesWithSections.has(classId));
  }, [handledClasses, handledSections, sectionsByClass]);

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

        const [departmentsResponse, categoriesResponse, classesResponse, sectionsResponse] = await Promise.all([
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
        ]);

        setDepartments(departmentsResponse.data.data || []);
        setCategories(categoriesResponse.data.data || []);
        setClasses(normalizeApiList(classesResponse));
        setAllSections(normalizeApiList(sectionsResponse));
      } catch (err) {
        console.error('Error fetching employee form data:', err);
        setError('Failed to load employee form data');
      } finally {
        setFetchingDepartments(false);
        setFetchingCategories(false);
        setFetchingClasses(false);
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleClassToggle = (classId) => {
    setHandledClasses((prev) => {
      const isSelected = prev.includes(classId);

      if (isSelected) {
        const sectionsToRemove = new Set(
          getSectionsForClass(classId, sectionsByClass).map((section) => section.id)
        );
        setHandledSections((sections) => sections.filter((sectionId) => !sectionsToRemove.has(sectionId)));
        return prev.filter((id) => id !== classId);
      }

      return [...prev, classId];
    });
    setAssignmentError(null);
  };

  const handleSectionToggle = (sectionId, classId) => {
    setHandledSections((prev) => {
      if (prev.includes(sectionId)) {
        return prev.filter((id) => id !== sectionId);
      }

      if (!handledClasses.includes(classId)) {
        setHandledClasses((classesPrev) => [...classesPrev, classId]);
      }

      return [...prev, sectionId];
    });
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

    const assignmentValidationError = validateHandledAssignments(
      handledClasses,
      handledSections,
      sectionsByClass,
      classes
    );

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

      const { body, isMultipart } = prepareEmployeeRequest(
        formData,
        handledClasses,
        handledSections,
        {
          photo: formData.photo,
          removePhoto: isEditMode && !imagePreview,
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
                <select
                  name="department"
                  value={formData.department}
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
                  disabled={fetchingDepartments}
                  required
                >
                  <option value="">Select Department *</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  name="category"
                  value={formData.category}
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
                  disabled={fetchingCategories}
                  required
                >
                  <option value="">Select Category *</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <AssignmentSection>
              <AssignmentTitle>Handled Classes & Sections</AssignmentTitle>
              <AssignmentHint>
                Classes are optional. If you select a class, you must select at least one section for that class.
              </AssignmentHint>
              {assignmentError && <AssignmentError>{assignmentError}</AssignmentError>}

              {fetchingClasses ? (
                <InlineLoader>Loading classes...</InlineLoader>
              ) : classes.length === 0 ? (
                <InlineLoader>No classes available</InlineLoader>
              ) : (
                <CheckboxList>
                  {classes.map((cls) => (
                    <CheckboxRow key={cls.id} $warning={classesMissingSections.includes(cls.id)}>
                      <Checkbox
                        checked={handledClasses.includes(cls.id)}
                        onChange={() => handleClassToggle(cls.id)}
                      />
                      <span>{cls.name}</span>
                    </CheckboxRow>
                  ))}
                </CheckboxList>
              )}

              {handledClasses.length > 0 && (
                <>
                  {handledClasses.map((classId) => {
                    const classInfo = classes.find((cls) => cls.id === classId);
                    const classSections = getSectionsForClass(classId, sectionsByClass);
                    const classMissingSection = classesMissingSections.includes(classId);

                    return (
                      <ClassSectionGroup key={classId}>
                        <ClassSectionGroupTitle $warning={classMissingSection}>
                          Sections for {classInfo?.name || 'Selected class'}
                          {classMissingSection ? ' *' : ''}
                        </ClassSectionGroupTitle>

                        {fetchingClasses ? (
                          <InlineLoader>Loading sections...</InlineLoader>
                        ) : classSections.length === 0 ? (
                          <InlineLoader>No sections available for this class</InlineLoader>
                        ) : (
                          <CheckboxList>
                            {classSections.map((section) => (
                              <CheckboxRow key={section.id}>
                                <Checkbox
                                  checked={handledSections.includes(section.id)}
                                  onChange={() => handleSectionToggle(section.id, classId)}
                                />
                                <span>{getSectionDisplayLabel(section, classSections)}</span>
                              </CheckboxRow>
                            ))}
                          </CheckboxList>
                        )}
                      </ClassSectionGroup>
                    );
                  })}
                </>
              )}
            </AssignmentSection>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.6vw',
                borderRadius: '0.6vw',
                backgroundColor: '#FFB942',
                border: '1px solid #FFB942',
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