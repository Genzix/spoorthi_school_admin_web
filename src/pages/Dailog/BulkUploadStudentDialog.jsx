import { API_BASE_URL } from '@/config/api';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FiDownload, FiFileText, FiUpload, FiX } from 'react-icons/fi';
import { useAcademicYear } from '../../context/AcademicYearContext';
import { useStudents } from '../../context/StudentsContext';
import {
  EXCEL_ACCEPT,
  STUDENT_BULK_TEMPLATE,
  downloadBulkTemplate,
  downloadBulkUploadErrorReport,
  formatFileSize,
  formatStudentBulkUploadErrors,
  getBatchGroupPairs,
  getFilteredSectionOptions,
  getStudentsForClass,
  extractMasterName,
  isBatchGroupPairValid,
  normalizeOptionValue,
  parseBulkUploadFailure,
  uploadStudentsBulk,
  validateExcelFile,
} from '../../utils/bulkUploadUtils';
import {
  fetchBatches,
  fetchGroups,
  getClassesForBatch,
  getGroupBatchCatalog,
  isClassValidForBatch,
  resolveGroupBatchForUpload,
} from '../../utils/groupBatchMasters';

const MOBILE_BREAKPOINT = '768px';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 16px;
  box-sizing: border-box;
`;

const DialogCard = styled.div`
  background: #ffffff;
  width: min(720px, 100%);
  max-height: min(92vh, 900px);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: #FFE6BB;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #FEA592;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    background: #FF7E62;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DialogBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${props => props.$full ? '1 / -1' : 'auto'};
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
`;

const Select = styled.select`
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #fff;
  box-sizing: border-box;

  &:disabled {
    background: #f5f5f5;
    color: #888;
  }
`;

const TextInput = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #fff;
  box-sizing: border-box;

  &:disabled {
    background: #f5f5f5;
    color: #888;
  }

  &::placeholder {
    color: #999;
  }
`;

const TemplateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f8f9fa;
  border: 1px solid #ececec;
  flex-wrap: wrap;
`;

const TemplateText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #626060;
  line-height: 1.4;
`;

const TemplateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  background: var(--color-primary);
  color: #000;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: var(--color-secondary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${props => props.$isDragOver ? 'var(--color-primary)' : '#ccc'};
  border-radius: 12px;
  padding: 28px 20px;
  text-align: center;
  background: ${props => props.$isDragOver ? 'var(--color-accent)' : '#fafafa'};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadText = styled.div`
  font-weight: 500;
  color: #212529;
  margin-bottom: 4px;
`;

const UploadSubtext = styled.div`
  font-size: 0.85rem;
  color: #626060;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectedFileCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ececec;
`;

const FileMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const FileName = styled.div`
  font-weight: 500;
  color: #212529;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.div`
  font-size: 0.8rem;
  color: #626060;
`;

const RemoveFileButton = styled.button`
  border: none;
  background: transparent;
  color: #FF6745;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #ececec;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$progress || 0}%;
  background: var(--color-primary);
  transition: width 0.2s ease;
`;

const ErrorAlert = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 103, 69, 0.12);
  color: #b42318;
  font-size: 0.9rem;
  white-space: pre-line;
`;

const SuccessAlert = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(204, 255, 199, 0.45);
  color: #1f5d1a;
  font-size: 0.9rem;
  white-space: pre-line;
`;

const ResultSummary = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ResultBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  background: ${props => props.$variant === 'success' ? '#CCFFC7' : '#FEA592'};
  color: ${props => props.$variant === 'success' ? '#1f5d1a' : '#7a1f0f'};
`;

const ErrorReportButton = styled.button`
  align-self: flex-start;
  border: none;
  background: transparent;
  color: #4a6cf7;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
`;

const FooterButton = styled.button`
  min-height: 44px;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(FooterButton)`
  background: #f5f5f5;
  color: #333;
`;

const UploadButton = styled(FooterButton)`
  background: var(--color-primary);
  color: #000;

  &:hover:not(:disabled) {
    background: var(--color-secondary);
  }
`;

const ButtonSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const BulkUploadStudentDialog = ({ onClose, onSuccess }) => {
  const { academicYears, selectedAcademicYear } = useAcademicYear();
  const { students } = useStudents();
  const fileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    academicYearId: selectedAcademicYear?.id || '',
    classId: '',
    sectionId: '',
    group: '',
    batch: '',
  });
  const [classes, setClasses] = useState([]);
  const [allClassSections, setAllClassSections] = useState([]);
  const [masterGroups, setMasterGroups] = useState([]);
  const [masterBatches, setMasterBatches] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [uploadError, setUploadError] = useState('');
  const [uploadResult, setUploadResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const [fetchingSections, setFetchingSections] = useState(false);
  const [fetchingMasters, setFetchingMasters] = useState(false);

  const classStudents = useMemo(
    () => getStudentsForClass(students, formState.classId),
    [students, formState.classId]
  );

  const studentsForOptions = useMemo(
    () => (classStudents.length > 0 ? classStudents : students),
    [classStudents, students]
  );

  const batchGroupPairs = useMemo(
    () => getBatchGroupPairs(allClassSections, studentsForOptions),
    [allClassSections, studentsForOptions]
  );

  const groupBatchCatalog = useMemo(
    () => getGroupBatchCatalog({
      masterGroups,
      masterBatches,
      sections: allClassSections,
      students: studentsForOptions,
      classId: formState.classId,
      selectedGroup: formState.group,
      selectedBatch: formState.batch,
    }),
    [
      masterGroups,
      masterBatches,
      allClassSections,
      studentsForOptions,
      formState.classId,
      formState.group,
      formState.batch,
    ]
  );

  const availableGroups = groupBatchCatalog.groups;
  const availableBatches = groupBatchCatalog.batches;

  const availableClasses = useMemo(
    () => getClassesForBatch(students, classes, formState.batch),
    [students, classes, formState.batch]
  );

  const sectionOptions = useMemo(
    () => getFilteredSectionOptions(allClassSections, {
      group: formState.group,
      batch: formState.batch,
    }),
    [allClassSections, formState.group, formState.batch]
  );

  const useBatchSelect = masterBatches.length > 0 || availableBatches.length > 0;
  const useGroupSelect = availableGroups.length > 0;

  const resetUploadState = useCallback(() => {
    setUploadError('');
    setUploadResult(null);
    setUploadProgress(0);
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setFetchingClasses(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/masters/classes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(Array.isArray(response.data?.data) ? response.data.data : []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setUploadError('Failed to load classes. Please try again.');
      } finally {
        setFetchingClasses(false);
      }
    };

    const fetchGroupBatchMasters = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setFetchingMasters(true);
        const [groups, batches] = await Promise.all([
          fetchGroups(token),
          fetchBatches(token),
        ]);
        setMasterGroups(groups);
        setMasterBatches(batches);
      } catch (error) {
        console.error('Error fetching group/batch masters:', error);
        setUploadError('Failed to load group and batch presets. You can still enter them manually.');
      } finally {
        setFetchingMasters(false);
      }
    };

    fetchClasses();
    fetchGroupBatchMasters();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      if (!formState.classId) {
        setAllClassSections([]);
        return;
      }

      try {
        setFetchingSections(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${API_BASE_URL}/masters/sections/?class_name=${formState.classId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAllClassSections(Array.isArray(response.data?.data) ? response.data.data : []);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setUploadError('Failed to load sections for the selected class.');
        setAllClassSections([]);
      } finally {
        setFetchingSections(false);
      }
    };

    fetchSections();
  }, [formState.classId]);

  useEffect(() => {
    if (sectionOptions.length !== 1) return;
    const onlySection = sectionOptions[0];
    if (onlySection?.id && formState.sectionId !== onlySection.id) {
      setFormState((prev) => ({ ...prev, sectionId: onlySection.id }));
    }
  }, [sectionOptions, formState.sectionId]);

  useEffect(() => {
    if (availableGroups.length === 1 && !formState.group && formState.batch) {
      setFormState((prev) => ({ ...prev, group: availableGroups[0] }));
    }
  }, [availableGroups, formState.group, formState.batch]);

  useEffect(() => {
    if (!formState.classId || !formState.batch) return;
    if (isClassValidForBatch(students, formState.classId, formState.batch)) return;
    setFormState((prev) => ({ ...prev, classId: '', sectionId: '' }));
  }, [formState.classId, formState.batch, students]);

  const updateField = (name, value) => {
    resetUploadState();
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));

    const normalizedValue = name === 'group' || name === 'batch'
      ? normalizeOptionValue(value)
      : value;

    setFormState((prev) => {
      const next = { ...prev, [name]: normalizedValue };

      if (name === 'batch') {
        next.sectionId = '';
        if (
          next.classId &&
          !isClassValidForBatch(students, next.classId, normalizedValue)
        ) {
          next.classId = '';
        }
        if (
          next.group &&
          batchGroupPairs.length > 0 &&
          !isBatchGroupPairValid(batchGroupPairs, next.group, normalizedValue)
        ) {
          next.group = '';
        }
        return next;
      }

      if (name === 'classId') {
        next.sectionId = '';
        if (
          next.group &&
          batchGroupPairs.length > 0 &&
          !isBatchGroupPairValid(batchGroupPairs, next.group, prev.batch)
        ) {
          next.group = '';
        }
        return next;
      }

      if (name === 'group') {
        next.sectionId = '';
      }

      if (name === 'sectionId') {
        const selectedSection = allClassSections.find((section) => section.id === normalizedValue);
        if (selectedSection) {
          const sectionGroup = extractMasterName(selectedSection.group);
          const sectionBatch = extractMasterName(selectedSection.batch);
          if (sectionGroup) next.group = sectionGroup;
          if (sectionBatch) next.batch = sectionBatch;
        }
      }

      return next;
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formState.academicYearId) errors.academicYearId = 'Academic year is required';
    if (!selectedFile) errors.file = 'Excel file is required';

    const hasGroup = Boolean(normalizeOptionValue(formState.group));
    const hasBatch = Boolean(normalizeOptionValue(formState.batch));

    if (
      hasGroup &&
      hasBatch &&
      batchGroupPairs.length > 0 &&
      !isBatchGroupPairValid(batchGroupPairs, formState.group, formState.batch)
    ) {
      errors.batch = 'Selected batch does not match the chosen group';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const processSelectedFile = (file) => {
    resetUploadState();
    setFieldErrors((prev) => ({ ...prev, file: '' }));

    const validationError = validateExcelFile(file);
    if (validationError) {
      setFieldErrors((prev) => ({ ...prev, file: validationError }));
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) processSelectedFile(file);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) processSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setUploadError('No authentication token found. Please log in again.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    resetUploadState();

    try {
      const hasGroup = Boolean(normalizeOptionValue(formState.group));
      const hasBatch = Boolean(normalizeOptionValue(formState.batch));

      const resolved = (hasGroup || hasBatch)
        ? await resolveGroupBatchForUpload({
          token,
          groupName: formState.group,
          batchName: formState.batch,
          groups: masterGroups,
          batches: masterBatches,
        })
        : {
          groupId: null,
          batchId: null,
          groupName: '',
          batchName: '',
          groups: masterGroups,
          batches: masterBatches,
        };

      if (resolved.groups !== masterGroups) setMasterGroups(resolved.groups);
      if (resolved.batches !== masterBatches) setMasterBatches(resolved.batches);

      const result = await uploadStudentsBulk({
        file: selectedFile,
        classId: formState.classId || undefined,
        sectionId: formState.sectionId || undefined,
        academicYearId: formState.academicYearId,
        batch: resolved.batchName || undefined,
        group: resolved.groupName || undefined,
        batchId: resolved.batchId || undefined,
        groupId: resolved.groupId || undefined,
        token,
        onProgress: setUploadProgress,
      });

      setUploadResult(result);

      if (result.errors?.length) {
        setUploadError(formatStudentBulkUploadErrors(result.errors));
      }

      if (result.createdCount > 0 || (!result.errors?.length && result.message)) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Student bulk upload failed:', error);
      const failure = parseBulkUploadFailure(
        error,
        'Failed to upload students. Please try again.'
      );
      if (failure.result) {
        setUploadResult(failure.result);
      }
      setUploadError(failure.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const canUpload = Boolean(
    formState.academicYearId &&
    selectedFile &&
    !isUploading
  );

  return (
    <Overlay onClick={() => !isUploading && onClose()}>
      <DialogCard onClick={(event) => event.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Bulk Upload Students</DialogTitle>
          <CloseButton
            type="button"
            onClick={onClose}
            disabled={isUploading}
            aria-label="Close bulk upload dialog"
          >
            <FiX size={18} />
          </CloseButton>
        </DialogHeader>

        <DialogBody>
          <FieldGrid>
            <Field>
              <Label htmlFor="bulk-academic-year">Academic Year *</Label>
              <Select
                id="bulk-academic-year"
                value={formState.academicYearId}
                onChange={(event) => updateField('academicYearId', event.target.value)}
                disabled={isUploading}
              >
                <option value="">Select academic year</option>
                {academicYears.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name || year.year || year.label}
                  </option>
                ))}
              </Select>
              {fieldErrors.academicYearId && <ErrorAlert>{fieldErrors.academicYearId}</ErrorAlert>}
            </Field>

            <Field>
              <Label htmlFor="bulk-batch">Batch</Label>
              {useBatchSelect ? (
                <Select
                  id="bulk-batch"
                  value={formState.batch}
                  onChange={(event) => updateField('batch', event.target.value)}
                  disabled={isUploading || fetchingMasters}
                >
                  <option value="">Select batch</option>
                  {availableBatches.map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </Select>
              ) : (
                <TextInput
                  id="bulk-batch"
                  list="bulk-batch-options"
                  value={formState.batch}
                  onChange={(event) => updateField('batch', event.target.value)}
                  placeholder="e.g. MPC"
                  disabled={isUploading || fetchingMasters}
                />
              )}
              {!useBatchSelect && (
                <datalist id="bulk-batch-options">
                  {availableBatches.map((batch) => (
                    <option key={batch} value={batch} />
                  ))}
                </datalist>
              )}
              {fieldErrors.batch && <ErrorAlert>{fieldErrors.batch}</ErrorAlert>}
            </Field>

            <Field>
              <Label htmlFor="bulk-class">Class</Label>
              <Select
                id="bulk-class"
                value={formState.classId}
                onChange={(event) => updateField('classId', event.target.value)}
                disabled={isUploading || fetchingClasses}
              >
                <option value="">Select class</option>
                {availableClasses.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </option>
                ))}
              </Select>
              {fieldErrors.classId && <ErrorAlert>{fieldErrors.classId}</ErrorAlert>}
            </Field>

            <Field>
              <Label htmlFor="bulk-group">Group</Label>
              {useGroupSelect ? (
                <Select
                  id="bulk-group"
                  value={formState.group}
                  onChange={(event) => updateField('group', event.target.value)}
                  disabled={isUploading || fetchingMasters}
                >
                  <option value="">Select group</option>
                  {availableGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </Select>
              ) : (
                <TextInput
                  id="bulk-group"
                  list="bulk-group-options"
                  value={formState.group}
                  onChange={(event) => updateField('group', event.target.value)}
                  placeholder="e.g. SPARK BOYS"
                  disabled={isUploading || fetchingMasters}
                />
              )}
              {!useGroupSelect && (
                <datalist id="bulk-group-options">
                  {availableGroups.map((group) => (
                    <option key={group} value={group} />
                  ))}
                </datalist>
              )}
              {fieldErrors.group && <ErrorAlert>{fieldErrors.group}</ErrorAlert>}
            </Field>

            <Field $full>
              <Label htmlFor="bulk-section">Section</Label>
              <Select
                id="bulk-section"
                value={formState.sectionId}
                onChange={(event) => updateField('sectionId', event.target.value)}
                disabled={!formState.classId || isUploading || fetchingSections}
              >
                <option value="">
                  {!formState.classId
                    ? 'Select class first'
                    : fetchingSections
                      ? 'Loading sections...'
                      : 'Select section'}
                </option>
                {sectionOptions.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.displayName || section.name}
                  </option>
                ))}
              </Select>
              {fieldErrors.sectionId && <ErrorAlert>{fieldErrors.sectionId}</ErrorAlert>}
            </Field>
          </FieldGrid>

          <TemplateRow>
            <TemplateText>
              Use the official Excel template with the required student columns before uploading.
            </TemplateText>
            <TemplateButton
              type="button"
              onClick={() => downloadBulkTemplate(STUDENT_BULK_TEMPLATE)}
              disabled={isUploading}
            >
              <FiDownload size={16} />
              Download Template
            </TemplateButton>
          </TemplateRow>

          {!selectedFile ? (
            <UploadArea
              $isDragOver={isDragOver}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setIsDragOver(false);
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <UploadIcon>
                <FiUpload size={22} />
              </UploadIcon>
              <UploadText>Drag & drop students.xlsx here</UploadText>
              <UploadSubtext>or click to browse (.xlsx, .xls, max 10MB)</UploadSubtext>
            </UploadArea>
          ) : (
            <SelectedFileCard>
              <FileMeta>
                <FiFileText size={20} />
                <div style={{ minWidth: 0 }}>
                  <FileName>{selectedFile.name}</FileName>
                  <FileSize>{formatFileSize(selectedFile.size)}</FileSize>
                </div>
              </FileMeta>
              <RemoveFileButton
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  resetUploadState();
                }}
                disabled={isUploading}
                aria-label="Remove selected file"
              >
                <FiX size={18} />
              </RemoveFileButton>
            </SelectedFileCard>
          )}

          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept={EXCEL_ACCEPT}
            onChange={handleFileInputChange}
          />

          {fieldErrors.file && <ErrorAlert>{fieldErrors.file}</ErrorAlert>}

          {isUploading && uploadProgress > 0 && (
            <>
              <ProgressTrack>
                <ProgressFill $progress={uploadProgress} />
              </ProgressTrack>
              <UploadSubtext>Uploading... {uploadProgress}%</UploadSubtext>
            </>
          )}

          {uploadResult && (
            <SuccessAlert>
              {uploadResult.message ||
                `Upload completed${uploadResult.createdCount != null ? `: ${uploadResult.createdCount} student(s) created` : ''}.`}
              <ResultSummary>
                {uploadResult.createdCount != null && (
                  <ResultBadge $variant="success">Created: {uploadResult.createdCount}</ResultBadge>
                )}
                {uploadResult.failedCount != null && uploadResult.failedCount > 0 && (
                  <ResultBadge $variant="error">Failed: {uploadResult.failedCount}</ResultBadge>
                )}
                {uploadResult.totalCount != null && (
                  <ResultBadge $variant="success">Total rows: {uploadResult.totalCount}</ResultBadge>
                )}
              </ResultSummary>
            </SuccessAlert>
          )}

          {uploadError && <ErrorAlert>{uploadError}</ErrorAlert>}

          {uploadResult?.errors?.length > 0 && (
            <ErrorReportButton
              type="button"
              onClick={() => downloadBulkUploadErrorReport(uploadResult.errors)}
            >
              Download error report
            </ErrorReportButton>
          )}
        </DialogBody>

        <DialogFooter>
          <CancelButton type="button" onClick={onClose} disabled={isUploading}>
            Cancel
          </CancelButton>
          <UploadButton type="button" onClick={handleUpload} disabled={!canUpload}>
            {isUploading ? (
              <>
                <ButtonSpinner />
                Uploading...
              </>
            ) : (
              <>
                <FiUpload size={16} />
                Upload Students
              </>
            )}
          </UploadButton>
        </DialogFooter>
      </DialogCard>
    </Overlay>
  );
};

export default BulkUploadStudentDialog;
