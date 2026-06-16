import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import Add from '../../assets/add.svg';
import { useAcademicYear } from '../../context/AcademicYearContext';
import { normalizeApiList } from '../../utils/employeeAssignments';

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
`;

const DialogHeader = styled.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
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
`;

const AddStudentDialog = ({ onClose, onSuccess, isEditMode = false, initialData = {} }) => {
  const { academicYears, selectedAcademicYear } = useAcademicYear();

  const STATUS_CHOICES = [
    { value: 'reservation', label: 'Reservation' },
    { value: 'admission', label: 'Admission' },
  ];

  const normalizeOptionValue = (value) => (value || '').toString().replace(/\s+/g, ' ').trim();

  const TERM_OPTIONS = Array.from({ length: 8 }, (_, i) => i + 1); // Creates [1, 2, ..., 8]

  const [formData, setFormData] = useState({
    name: '',
    father_name: '',
    phone_numbers: ['', ''],
    class_name_id: '',
    section_id: '',
    group: '',
    batch: '',
    admission_no: '',
    pen_no: '',
    status: 'admission',
    date_of_admission: new Date().toISOString().split('T')[0],
    no_of_turns: 4,
    committed_fees: '',
    initial_fee_paid: '',
    is_bookes_given: false,
    is_uniform_given: false,
    is_bag_given: false,
    photo: null,
    dob: '',
    student_aadhar: '',
    father_aadhar: '',
    mother_aadhar: '',
    application_form: null,
    caste_id: '',
    sub_caste_id: '',
    educational_officer_id: '',
    permanent_address: '',
    correcspondent_address: '',
    previous_school: '',
    academic_year_id: selectedAcademicYear?.id || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [allClassSections, setAllClassSections] = useState([]);
  const [castes, setCastes] = useState([]);
  const [subCastes, setSubCastes] = useState([]);
  const [educationalOfficers, setEducationalOfficers] = useState([]);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const [fetchingSections, setFetchingSections] = useState(false);
  const [fetchingCastes, setFetchingCastes] = useState(false);
  const [fetchingSubCastes, setFetchingSubCastes] = useState(false);
  const [fetchingEducationalOfficers, setFetchingEducationalOfficers] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [applicationFormPreview, setApplicationFormPreview] = useState(null);
  const sectionGrouping = useMemo(() => {
    const groups = new Set();
    const batches = new Set();

    allClassSections.forEach((section) => {
      const group = normalizeOptionValue(section.group);
      const batch = normalizeOptionValue(section.batch);
      if (group) groups.add(group);
      if (batch) batches.add(batch);
    });

    return {
      hasGroups: groups.size > 0,
      hasBatches: batches.size > 0,
    };
  }, [allClassSections]);

  const availableGroups = useMemo(() => {
    const normalizedBatch = normalizeOptionValue(formData.batch);
    return [...new Set(
      allClassSections
        .filter((section) => !normalizedBatch || normalizeOptionValue(section.batch) === normalizedBatch)
        .map((section) => normalizeOptionValue(section.group))
        .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
  }, [allClassSections, formData.batch]);

  const availableBatches = useMemo(() => {
    const normalizedGroup = normalizeOptionValue(formData.group);
    return [...new Set(
      allClassSections
        .filter((section) => !normalizedGroup || normalizeOptionValue(section.group) === normalizedGroup)
        .map((section) => normalizeOptionValue(section.batch))
        .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
  }, [allClassSections, formData.group]);

  const shouldShowSectionContext = !formData.group || !formData.batch;
  const showGroupBatchFilters = Boolean(formData.class_name_id) && (sectionGrouping.hasGroups || sectionGrouping.hasBatches);

  useEffect(() => {
    if (isEditMode && initialData) {
      const phoneNumbers = initialData.phone_numbers || ['', ''];
      setFormData({
        name: initialData.name || '',
        father_name: initialData.father_name || '',
        phone_numbers: phoneNumbers.length >= 2 ? phoneNumbers : [...phoneNumbers, ''],
        class_name_id: initialData.class_name?.id || initialData.class_name_id || '',
        section_id: initialData.section?.id || initialData.section_id || '',
        group: initialData.group || '',
        batch: initialData.batch || '',
        admission_no: initialData.admission_no || '',
        pen_no: initialData.pen_no || '',
        status: initialData.status || 'admission',
        date_of_admission: initialData.date_of_admission || new Date().toISOString().split('T')[0],
        no_of_turns: initialData.no_of_turns || 4,
        committed_fees: initialData.committed_fees || '',
        initial_fee_paid: initialData.initial_fee_paid || '',
        is_bookes_given: initialData.is_bookes_given || false,
        is_uniform_given: initialData.is_uniform_given || false,
        is_bag_given: initialData.is_bag_given || false,
        photo: initialData.photo || null,
        dob: initialData.dob || '',
        student_aadhar: initialData.student_aadhar || '',
        father_aadhar: initialData.father_aadhar || '',
        mother_aadhar: initialData.mother_aadhar || '',
        application_form: initialData.application_form || null,
        caste_id: initialData.caste?.id || '',
        sub_caste_id: initialData.sub_caste?.id || '',
        educational_officer_id: initialData.educational_officer?.id || '',
        permanent_address: initialData.permanent_address || '',
        correcspondent_address: initialData.correcspondent_address || '',
        previous_school: initialData.previous_school || '',
        academic_year_id: initialData.academic_year?.id || ''
      });

      if (initialData.photo) {
        setImagePreview(initialData.photo);
      }
      if (initialData.application_form) {
        setApplicationFormPreview(initialData.application_form);
      }
    }
  }, [isEditMode, initialData]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setFetchingClasses(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://spoorthischool.genzix.space/masters/classes/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setClasses(response.data.data);
      } catch (err) {
        console.error('Error fetching classes:', err);
        setError('Failed to fetch classes');
      } finally {
        setFetchingClasses(false);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchCastes = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setFetchingCastes(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://spoorthischool.genzix.space/masters/caste/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setCastes(normalizeApiList(response));
      } catch (err) {
        console.error('Error fetching castes:', err);
        setError('Failed to fetch castes');
      } finally {
        setFetchingCastes(false);
        setLoading(false);
      }
    };

    fetchCastes();
  }, [isEditMode]);

  useEffect(() => {
    const fetchSubCastes = async () => {
      if (!isEditMode || !formData.caste_id) {
        setSubCastes([]);
        return;
      }

      try {
        setLoading(true);
        setFetchingSubCastes(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://spoorthischool.genzix.space/masters/subcaste/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );

        // Filter sub-castes based on selected caste
        const filteredSubCastes = normalizeApiList(response).filter(subCaste =>
          subCaste.caste.id === formData.caste_id
        );

        setSubCastes(filteredSubCastes);
      } catch (err) {
        console.error('Error fetching sub-castes:', err);
        setError('Failed to fetch sub-castes');
      } finally {
        setLoading(false);
        setFetchingSubCastes(false);
      }
    };

    fetchSubCastes();
  }, [formData.caste_id, isEditMode]);

  useEffect(() => {
    const fetchEducationalOfficers = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setFetchingEducationalOfficers(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://spoorthischool.genzix.space/masters/eduofficer/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setEducationalOfficers(normalizeApiList(response));
      } catch (err) {
        console.error('Error fetching educational officers:', err);
        setError('Failed to fetch educational officers');
      } finally {
        setFetchingEducationalOfficers(false);
        setLoading(false);
      }
    };

    fetchEducationalOfficers();
  }, [isEditMode]);

  useEffect(() => {
    const fetchSectionsByClass = async () => {
      if (!formData.class_name_id) {
        setAllClassSections([]);
        setSections([]);
        return;
      }

      try {
        setLoading(true);
        setFetchingSections(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://spoorthischool.genzix.space/masters/sections/?class_name=${formData.class_name_id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );

        const sectionsData = Array.isArray(response?.data?.data) ? response.data.data : [];
        setAllClassSections(sectionsData);
      } catch (err) {
        console.error('Error fetching sections:', err);
        setError('Failed to fetch sections');
        setAllClassSections([]);
      } finally {
        setLoading(false);
        setFetchingSections(false);
      }
    };

    fetchSectionsByClass();
  }, [formData.class_name_id]);

  useEffect(() => {
    const sectionMap = new Map();
    allClassSections.forEach((section) => {
      const sectionName = normalizeOptionValue(section.name);
      const sectionGroup = normalizeOptionValue(section.group);
      const sectionBatch = normalizeOptionValue(section.batch);

      const matchesGroup = !formData.group || sectionGroup === normalizeOptionValue(formData.group);
      const matchesBatch = !formData.batch || sectionBatch === normalizeOptionValue(formData.batch);
      if (!matchesGroup || !matchesBatch || !sectionName) return;

      const dedupeKey = `${sectionName}|${sectionGroup}|${sectionBatch}`;
      if (!sectionMap.has(dedupeKey)) {
        sectionMap.set(dedupeKey, {
          ...section,
          displayName: shouldShowSectionContext
            ? `${sectionName}${sectionGroup ? ` - ${sectionGroup}` : ''}${sectionBatch ? ` (${sectionBatch})` : ''}`
            : sectionName,
        });
      }
    });

    setSections([...sectionMap.values()]);
  }, [allClassSections, formData.group, formData.batch, shouldShowSectionContext]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'group' || name === 'batch' ? normalizeOptionValue(value) : value;

    setFormData((prev) => {
      const next = { ...prev, [name]: normalizedValue };

      if (name === 'class_name_id') {
        next.section_id = '';
        next.group = '';
        next.batch = '';
        return next;
      }

      if (name === 'group' || name === 'batch') {
        next.section_id = '';

        if (name === 'group' && prev.batch) {
          const batchStillValid = allClassSections.some(
            (section) =>
              normalizeOptionValue(section.group) === normalizedValue &&
              normalizeOptionValue(section.batch) === normalizeOptionValue(prev.batch)
          );
          if (!batchStillValid) next.batch = '';
        }

        if (name === 'batch' && prev.group) {
          const groupStillValid = allClassSections.some(
            (section) =>
              normalizeOptionValue(section.batch) === normalizedValue &&
              normalizeOptionValue(section.group) === normalizeOptionValue(prev.group)
          );
          if (!groupStillValid) next.group = '';
        }
      }

      return next;
    });
  };

  const handlePhoneChange = (index, value) => {
    const newPhoneNumbers = [...formData.phone_numbers];
    newPhoneNumbers[index] = value;
    setFormData(prev => ({ ...prev, phone_numbers: newPhoneNumbers }));
  };

  const handleSectionChange = (e) => {
    const selectedSectionId = e.target.value;
    const selectedSection = allClassSections.find((section) => section.id === selectedSectionId);

    if (!selectedSection) {
      setFormData((prev) => ({
        ...prev,
        section_id: '',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      section_id: selectedSection.id,
      group: normalizeOptionValue(selectedSection.group),
      batch: normalizeOptionValue(selectedSection.batch),
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
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

  const handleApplicationFormUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, application_form: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setApplicationFormPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const requestFormData = new FormData();

      // Existing fields
      requestFormData.append('name', formData.name);
      requestFormData.append('father_name', formData.father_name);
      const filteredPhoneNumbers = formData.phone_numbers.filter(num => num && num.trim() !== '');
      requestFormData.append('phone_numbers', JSON.stringify(filteredPhoneNumbers));

      if (formData.class_name_id) requestFormData.append('class_name_id', formData.class_name_id);
      if (formData.section_id) requestFormData.append('section_id', formData.section_id);
      
      // Best logic: Send selected academic year from local form, falling back to global active academic year if empty.
      const finalAcademicYearId = formData.academic_year_id || selectedAcademicYear?.id;
      if (finalAcademicYearId) {
        requestFormData.append('academic_year_id', finalAcademicYearId);
      }
      
      const selectedSection = allClassSections.find((section) => section.id === formData.section_id);
      const resolvedGroup = formData.group || normalizeOptionValue(selectedSection?.group);
      const resolvedBatch = formData.batch || normalizeOptionValue(selectedSection?.batch);
      if (resolvedGroup) requestFormData.append('group', resolvedGroup);
      if (resolvedBatch) requestFormData.append('batch', resolvedBatch);
      requestFormData.append('admission_no', formData.admission_no);
      if (formData.pen_no) requestFormData.append('pen_no', formData.pen_no);
      requestFormData.append('status', formData.status);
      requestFormData.append('date_of_admission', formData.date_of_admission);
      requestFormData.append('no_of_turns', formData.no_of_turns);
      requestFormData.append('committed_fees', parseFloat(formData.committed_fees) || 0);
      requestFormData.append('initial_fee_paid', parseFloat(formData.initial_fee_paid) || 0);
      requestFormData.append('is_bookes_given', formData.is_bookes_given);
      requestFormData.append('is_uniform_given', formData.is_uniform_given);
      requestFormData.append('is_bag_given', formData.is_bag_given);

      // New fields
      if (formData.educational_officer_id) requestFormData.append('educational_officer_id', formData.educational_officer_id);
      if (formData.caste_id) requestFormData.append('caste_id', formData.caste_id);
      if (formData.sub_caste_id) requestFormData.append('sub_caste_id', formData.sub_caste_id);
      if (formData.dob) requestFormData.append('dob', formData.dob);
      if (formData.student_aadhar) requestFormData.append('student_aadhar', formData.student_aadhar);
      if (formData.father_aadhar) requestFormData.append('father_aadhar', formData.father_aadhar);
      if (formData.mother_aadhar) requestFormData.append('mother_aadhar', formData.mother_aadhar);

      // Handle file uploads
      if (formData.photo && formData.photo instanceof File) {
        requestFormData.append('photo', formData.photo);
      }
      if (formData.application_form && formData.application_form instanceof File) {
        requestFormData.append('application_form', formData.application_form);
      }

      // Add new address and school fields
      if (formData.permanent_address) requestFormData.append('permanent_address', formData.permanent_address);
      if (formData.correcspondent_address) requestFormData.append('correcspondent_address', formData.correcspondent_address);
      if (formData.previous_school) requestFormData.append('previous_school', formData.previous_school);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      let response;
      if (isEditMode && initialData.id) {
        response = await axios.put(
          `https://spoorthischool.genzix.space/masters/students/${initialData.id}/`,
          requestFormData,
          config
        );
      } else {
        response = await axios.post(
          'https://spoorthischool.genzix.space/masters/students/',
          requestFormData,
          config
        );
      }

      console.log('Student operation successful:', response.data);
      onClose();
      // Pass the updated/new student data directly to onSuccess to avoid an extra GET call
      if (onSuccess) {
        onSuccess(response.data?.data || response.data);
      }

    } catch (err) {
      console.error('Error in student operation:', err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || err.message || `Failed to ${isEditMode ? 'update' : 'add'} student`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (loading) {
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
            <img
              src={Add}
              style={{
                height: '1.8vh',
                transform: 'rotate(-45deg)',
              }}
              alt="Close"
            />
          </CircleIconContainer>
        </DialogHeader>
        <DialogContent>
          {error && (
            <div style={{
              color: 'red',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderRadius: '4px',
              whiteSpace: 'pre-line'
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <ImageUploadContainer>
              {imagePreview ? (
                <label style={{ display: 'contents', cursor: 'pointer' }}>
                  <ImagePreview
                    src={imagePreview}
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
                    alt="Student Preview"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              ) : (
                <label style={{ display: 'contents', cursor: 'pointer' }}>
                  <div
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
                    <span style={{
                      textAlign: 'center', fontFamily: '"Roboto", sans-serif',
                      fontSize: '0.7vw',
                      letterSpacing: '0.7px'
                    }}>Upload Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              )}

              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0.1vh',
                fontSize: '0.8vw',
                letterSpacing: '0.7px',
                color: '#000'
              }}>
                Add Student Photo
              </label>
            </ImageUploadContainer>

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
                name="admission_no"
                placeholder="Admission No *"
                value={formData.admission_no}
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
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '-0.6vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Pen No
              </label>
              <input
                type="text"
                name="pen_no"
                placeholder="Pen No"
                value={formData.pen_no}
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
                type="number"
                name="committed_fees"
                placeholder='Committed Fees *'
                value={formData.committed_fees}
                onChange={(e) => {
                  // Allow only numbers and decimal point
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Ensure only one decimal point
                  if ((value.match(/\./g) || []).length <= 1) {
                    setFormData(prev => ({ ...prev, committed_fees: value }));
                  }
                }}
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
                name="initial_fee_paid"
                placeholder={isEditMode ? "Initial Fee Paid" : "Initial Fee Paid *"}
                value={formData.initial_fee_paid}
                onChange={(e) => {
                  // Allow only numbers and decimal point
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Ensure only one decimal point
                  if ((value.match(/\./g) || []).length <= 1) {
                    setFormData(prev => ({ ...prev, initial_fee_paid: value }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required={!isEditMode}
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '-0.6vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
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
              >
                {STATUS_CHOICES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '-0.6vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Number of Terms *
              </label>
              <select
                name="no_of_turns"
                value={formData.no_of_turns}
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
              >
                {TERM_OPTIONS.map((num) => (
                  <option key={num} value={num}>
                    {num} Term{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="text"
                name="father_name"
                placeholder="Father's Name *"
                value={formData.father_name}
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
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '-0.6vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Date of Admission *
              </label>
              <input
                type="date"
                name="date_of_admission"
                placeholder='Date of Admission *'
                value={formData.date_of_admission}
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
              <div style={{ display: 'flex', gap: '1vw' }}>
                <input
                  type="tel"
                  value={formData.phone_numbers[0]}
                  onChange={(e) => handlePhoneChange(0, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6vw',
                    borderRadius: '0.6vw',
                    border: '1px solid #fff',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px'
                  }}
                  placeholder="Primary phone number"
                  required
                />
                <input
                  type="tel"
                  value={formData.phone_numbers[1]}
                  onChange={(e) => handlePhoneChange(1, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6vw',
                    borderRadius: '0.6vw',
                    border: '1px solid #fff',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px'
                  }}
                  placeholder="Secondary phone number (optional)"
                />
              </div>
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '-0.6vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Academic Year *
              </label>
              <select
                name="academic_year_id"
                value={formData.academic_year_id}
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
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((ay) => (
                  <option key={ay.id} value={ay.id}>
                    {ay.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <select
                name="class_name_id"
                value={formData.class_name_id}
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
                disabled={fetchingClasses}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
              {fetchingClasses && <div>Loading classes...</div>}
            </div>

            {showGroupBatchFilters && (
              <div style={{ display: 'flex', gap: '1vw', marginBottom: '3vh' }}>
                {sectionGrouping.hasGroups && (
                  <div style={{ flex: 1 }}>
                    <select
                      name="group"
                      value={formData.group}
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
                      disabled={fetchingSections}
                    >
                      <option value="">Select Group (optional)</option>
                      {availableGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {sectionGrouping.hasBatches && (
                  <div style={{ flex: 1 }}>
                    <select
                      name="batch"
                      value={formData.batch}
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
                      disabled={fetchingSections}
                    >
                      <option value="">Select Batch (optional)</option>
                      {availableBatches.map((batch) => (
                        <option key={batch} value={batch}>
                          {batch}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div style={{ marginBottom: '3vh' }}>
              <select
                name="section_id"
                value={formData.section_id}
                onChange={handleSectionChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                disabled={!formData.class_name_id || fetchingSections}
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.displayName || section.name}
                  </option>
                ))}
              </select>
              {fetchingSections && <div>Loading sections...</div>}
            </div>



            {isEditMode && (
              <div style={{ marginBottom: '3vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '10px', fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}>
                  <Checkbox
                    type="checkbox"
                    name="is_bookes_given"
                    checked={formData.is_bookes_given}
                    onChange={handleCheckboxChange}
                  />
                  Books Given
                </label>

                <label style={{
                  display: 'flex', alignItems: 'center', gap: '10px', fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}>
                  <Checkbox
                    type="checkbox"
                    name="is_uniform_given"
                    checked={formData.is_uniform_given}
                    onChange={handleCheckboxChange}
                  />
                  Uniform Given
                </label>

                <label style={{
                  display: 'flex', alignItems: 'center', gap: '10px', fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}>
                  <Checkbox
                    type="checkbox"
                    name="is_bag_given"
                    checked={formData.is_bag_given}
                    onChange={handleCheckboxChange}
                  />
                  Bag Given
                </label>
              </div>
            )}


            {isEditMode && (
              <>
                <div style={{ marginBottom: '2.4vh' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Student Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="student_aadhar"
                    placeholder="Student Aadhaar Number"
                    value={formData.student_aadhar}
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
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Father's Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="father_aadhar"
                    placeholder="Father's Aadhaar Number"
                    value={formData.father_aadhar}
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
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Mother's Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="mother_aadhar"
                    placeholder="Mother's Aadhaar Number"
                    value={formData.mother_aadhar}
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
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
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
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    name="permanent_address"
                    placeholder="Permanent Address"
                    value={formData.permanent_address}
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
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Correspondent Address
                  </label>
                  <input
                    type="text"
                    name="correcspondent_address"
                    placeholder="Correspondent Address"
                    value={formData.correcspondent_address}
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
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    marginTop: '-0.6vh',
                    fontSize: '0.7vw',
                    letterSpacing: '0.7px',
                    color: '#626060'
                  }}>
                    Previous School
                  </label>
                  <input
                    type="text"
                    name="previous_school"
                    placeholder="Previous School"
                    value={formData.previous_school}
                    onChange={handleChange}
                    maxLength={100}
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

              </>
            )}
            {isEditMode && (
              <>
                <div style={{ display: 'flex', gap: '1vw', marginBottom: '3vh' }}>
                  <div style={{ flex: 1 }}>
                    <select
                      name="caste_id"
                      value={formData.caste_id}
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
                      disabled={fetchingCastes}
                    >
                      <option value="">Select Caste</option>
                      {castes.map((caste) => (
                        <option key={caste.id} value={caste.id}>
                          {caste.name}
                        </option>
                      ))}
                    </select>
                    {fetchingCastes && <div>Loading castes...</div>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <select
                      name="sub_caste_id"
                      value={formData.sub_caste_id}
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
                      disabled={!formData.caste_id || fetchingSubCastes}
                    >
                      <option value="">Select Sub-Caste</option>
                      {subCastes.map((subCaste) => (
                        <option key={subCaste.id} value={subCaste.id}>
                          {subCaste.name}
                        </option>
                      ))}
                    </select>
                    {fetchingSubCastes && <div>Loading sub-castes...</div>}
                  </div>
                </div>

                <div style={{ marginBottom: '2.4vh' }}>
                  <select
                    name="educational_officer_id"
                    value={formData.educational_officer_id}
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
                    disabled={fetchingEducationalOfficers}
                  >
                    <option value="">Select Educational Officer</option>
                    {educationalOfficers.map((officer) => (
                      <option key={officer.id} value={officer.id}>
                        {officer.name}
                      </option>
                    ))}
                  </select>
                  {fetchingEducationalOfficers && <div>Loading educational officers...</div>}
                </div>

                <div style={{ marginBottom: '2.4vh' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.6vh',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px',
                    color: '#000'
                  }}>
                    Application Form
                  </label>
                  {applicationFormPreview ? (
                    <div style={{ marginBottom: '10px' }}>
                      <a
                        href={applicationFormPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#FFB942',
                          textDecoration: 'none',
                          fontSize: '0.8vw'
                        }}
                      >
                        View Current Application Form
                      </a>
                    </div>
                  ) : null}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={handleApplicationFormUpload}
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


              </>
            )}

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
                cursor: 'pointer',
              }}
              disabled={loading}
            >
              {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Student' : 'Add Student')}
            </button>
          </form>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default AddStudentDialog;