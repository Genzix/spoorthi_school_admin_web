import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FiBookOpen,
  FiCalendar,
  FiChevronDown,
  FiChevronRight,
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiX,
} from 'react-icons/fi';
import arrowIcon from '../assets/arrow.svg';
import BrandSelect from '../components/BrandSelect';
import { useClassSectionLookup } from '../hooks/useClassSectionLookup';
import { getSectionDisplayLabel, getSectionsForClass } from '../utils/employeeAssignments';
import {
  AUDIENCE_MODE_OPTIONS,
  AUDIENCE_MODES,
  DEFAULT_EXAM_FORM,
  SCHEDULE_FILTER_OPTIONS,
  areAllBatchesSelected,
  areAllSectionsSelected,
  buildCreateExamPayload,
  buildUpdateExamPayload,
  examToEditForm,
  formatAudienceLabel,
  formatDateDisplay,
  formatExamTimeRange,
  getAvailableBatchIds,
  getAvailableSectionIds,
  getExamSyllabus,
  getScheduleBadge,
  groupUpcomingExams,
  isAdminEmail,
  isNoneBatchSelected,
  clearBatchSelection,
  toggleAllBatchesSelection,
  toggleAllSectionsSelection,
  toggleBatchSelection,
  toggleIdInList,
  toggleSectionSelection,
  validateCreateExamForm,
  validateUpdateExamForm,
} from '../utils/upcomingExams';
import {
  createUpcomingExams,
  deleteUpcomingExam,
  fetchUpcomingExams,
  formatUpcomingExamError,
  isForbiddenError,
  updateUpcomingExam,
} from '../utils/upcomingExamsApi';

const MOBILE = '768px';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  gap: 1.6vh;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 24px;
  /* Clear fixed top navbar (14vh) — layout only pads 10vh */
  margin-top: 4vh;

  @media (max-width: ${MOBILE}) {
    gap: 14px;
    margin-top: 2vh;
  }
`;

const HeaderCard = styled.div`
  background: #ffffff;
  border-radius: 1.2vw;
  padding: 2.4vh 1.8vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  overflow: visible;
  border: 1px solid #f0f0f0;

  @media (max-width: ${MOBILE}) {
    border-radius: 14px;
    padding: 16px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4vh;
  overflow: visible;
  min-width: 0;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-family: 'Comfortaa', sans-serif;
  font-size: 1.35vw;
  font-weight: 700;
  color: #111;
  line-height: 1.45;
  padding-top: 0.15em;
  overflow: visible;

  @media (max-width: ${MOBILE}) {
    font-size: 20px;
  }
`;

const PageSubtitle = styled.p`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 0.72vw;
  color: #626060;
  letter-spacing: 0.3px;

  @media (max-width: ${MOBILE}) {
    font-size: 13px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE}) {
    width: 100%;
    gap: 8px;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45vw;
  background: var(--color-primary);
  color: var(--color-on-primary, #111111);
  border: none;
  border-radius: 0.7vw;
  padding: 1vh 1.1vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.78vw;
  font-weight: 500;
  cursor: pointer;
  min-height: 38px;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--color-secondary);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE}) {
    flex: 1;
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 14px;
    gap: 8px;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: #efefef;
  color: #111111;

  &:hover:not(:disabled) {
    background: #e2e2e2;
  }
`;

const DangerButton = styled(PrimaryButton)`
  background: #ff6b6b;
  color: #fff;

  &:hover:not(:disabled) {
    background: #ee5a5a;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 1.2vw;
  padding: 2vh 1.8vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  @media (max-width: ${MOBILE}) {
    border-radius: 14px;
    padding: 16px;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7vw;
  flex-wrap: wrap;
  padding: 1.2vh 1vw;
  background: #f7f7f7;
  border-radius: 0.9vw;

  @media (max-width: ${MOBILE}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
  }
`;

const FilterSelectContainer = styled.div`
  position: relative;
  width: fit-content;
  min-width: 10vw;
  flex: 1;

  @media (max-width: ${MOBILE}) {
    width: 100%;
    min-width: 0;
    flex: none;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px 2vw 10px 1.1vw;
  height: 5.2vh;
  min-height: 40px;
  border-radius: 999px;
  border: 1px solid #ececec;
  font-family: 'Roboto', sans-serif;
  font-size: 0.78vw;
  color: #1a1a1a;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    border-color: var(--color-primary-light);
  }

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: #f0f0f0;
    color: #888;
  }

  @media (max-width: ${MOBILE}) {
    height: 44px;
    padding: 10px 36px 10px 14px;
    border-radius: 12px;
    font-size: 14px;
  }
`;

const SelectArrow = styled.img`
  position: absolute;
  right: 0.9vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
  opacity: 0.7;

  @media (max-width: ${MOBILE}) {
    right: 14px;
    height: 10px;
  }
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 1.6vh 0 1.2vh;
  flex-wrap: wrap;
`;

const CountText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72vw;
  color: #6b6b6b;
  letter-spacing: 0.2px;

  strong {
    color: #111;
    font-weight: 600;
  }

  @media (max-width: ${MOBILE}) {
    font-size: 12px;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45vw;

  @media (max-width: ${MOBILE}) {
    gap: 8px;
  }
`;

const Badge = styled.button`
  border: 1px solid ${(props) => (props.$active ? 'var(--color-primary)' : '#ddd')};
  background: ${(props) => (props.$active ? 'var(--color-primary)' : '#fff')};
  color: ${(props) => (props.$active ? 'var(--color-on-primary, #111111)' : '#111')};
  border-radius: 999px;
  padding: 0.55vh 0.9vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.72vw;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
  min-height: 32px;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? 'var(--color-secondary)' : 'var(--color-row-hover)')};
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE}) {
    font-size: 13px;
    padding: 8px 12px;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 0.45vh 0.75vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.65vw;
  font-weight: 500;
  white-space: nowrap;
  background: ${(props) =>
    props.$tone === 'success'
      ? '#e8f7ee'
      : props.$tone === 'mixed'
        ? '#eef4ff'
        : 'var(--color-row-hover)'};
  color: ${(props) =>
    props.$tone === 'success'
      ? '#187a3d'
      : props.$tone === 'mixed'
        ? '#1d4f91'
        : '#9a6400'};
  border: 1px solid
    ${(props) =>
      props.$tone === 'success'
        ? '#c6ebd4'
        : props.$tone === 'mixed'
          ? '#d3e0ff'
          : 'var(--color-primary-light)'};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  @media (max-width: ${MOBILE}) {
    font-size: 12px;
    padding: 5px 10px;
  }
`;

const ExamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9vh;
`;

const ExamGroup = styled.div`
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #ececec;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;

  &:hover {
    border-color: var(--color-primary-light);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }

  &[data-open='true'] {
    border-color: var(--color-primary);
    box-shadow: 0 8px 22px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE}) {
    border-radius: 12px;
  }
`;

const ExamGroupHeader = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto minmax(0, 1.6fr) minmax(0, 1.1fr) auto;
  gap: 1vw;
  align-items: center;
  padding: 1.5vh 1.1vw;
  text-align: left;
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-row-hover);
  }

  @media (max-width: ${MOBILE}) {
    grid-template-columns: auto 1fr;
    gap: 10px;
    padding: 14px;
  }
`;

const ChevronWrap = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${(props) => (props.$open ? 'var(--color-primary)' : '#f3f3f3')};
  color: ${(props) => (props.$open ? '#111' : '#555')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s ease, transform 0.2s ease;
`;

const ExamIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(145deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  color: #111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: ${MOBILE}) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
`;

const ExamMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45vh;
  min-width: 0;
`;

const ExamTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.95vw;
  font-weight: 600;
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.1px;

  @media (max-width: ${MOBILE}) {
    font-size: 15px;
    white-space: normal;
  }
`;

const ExamMeta = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.68vw;
  color: #6b6b6b;

  @media (max-width: ${MOBILE}) {
    font-size: 12px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4vw;

  @media (max-width: ${MOBILE}) {
    gap: 6px;
  }
`;

const SoftChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25vh 0.55vw;
  border-radius: 999px;
  background: #f4f4f4;
  color: #444;
  font-family: 'Roboto', sans-serif;
  font-size: 0.62vw;
  white-space: nowrap;

  @media (max-width: ${MOBILE}) {
    font-size: 11px;
    padding: 3px 8px;
  }
`;

const GroupMetaCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55vh;
  min-width: 0;

  @media (max-width: ${MOBILE}) {
    grid-column: 1 / -1;
    padding-left: 44px;
  }
`;

const ClassChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ClassChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.3vh 0.55vw;
  border-radius: 8px;
  background: var(--color-panel);
  color: #7a5600;
  font-family: 'Roboto', sans-serif;
  font-size: 0.62vw;
  font-weight: 500;

  @media (max-width: ${MOBILE}) {
    font-size: 11px;
    padding: 4px 8px;
  }
`;

const ShellPanel = styled.div`
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
  padding: 1vh 1vw 1.2vh;
  display: flex;
  flex-direction: column;
  gap: 0.7vh;
  animation: ${fadeIn} 0.2s ease;

  @media (max-width: ${MOBILE}) {
    padding: 10px;
  }
`;

const AudienceBucket = styled.div`
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: var(--color-primary-light);
  }

  &[data-open='true'] {
    border-color: var(--color-primary);
    box-shadow: 0 2px 10px var(--color-primary-soft);
  }
`;

const AudienceHeader = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto minmax(0, 1.25fr) minmax(0, 1fr) auto;
  gap: 0.8vw;
  align-items: center;
  padding: 1.1vh 0.9vw;
  text-align: left;
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-row-hover);
  }

  @media (max-width: ${MOBILE}) {
    grid-template-columns: auto 1fr;
    gap: 8px;
    padding: 12px;
  }
`;

const AudienceChevron = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${(props) => (props.$open ? 'var(--color-primary)' : '#f3f3f3')};
  color: ${(props) => (props.$open ? '#111' : '#555')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InnerShellPanel = styled.div`
  border-top: 1px solid #f0f0f0;
  background: #f7f7f7;
  padding: 0.7vh 0.7vw 0.9vh;
  display: flex;
  flex-direction: column;
  gap: 0.55vh;
  animation: ${fadeIn} 0.18s ease;

  @media (max-width: ${MOBILE}) {
    padding: 8px;
  }
`;

const ShellRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.15fr) auto auto;
  gap: 0.8vw;
  align-items: center;
  padding: ${(props) => (props.$nested ? '0.95vh 0.8vw' : '1.1vh 0.9vw')};
  background: #ffffff;
  border: 1px solid ${(props) => (props.$nested ? '#e8e8e8' : '#efefef')};
  border-radius: ${(props) => (props.$nested ? '10px' : '12px')};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: var(--color-primary-light);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: ${MOBILE}) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
    border-radius: 10px;
  }
`;

const ScheduleCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25vh;
  min-width: 0;
`;

const SchedulePrimary = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.68vw;
  color: #6b6b6b;

  @media (max-width: ${MOBILE}) {
    font-size: 12px;
  }
`;

const ScheduleTime = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.66vw;
  font-weight: 500;
  color: #333;

  @media (max-width: ${MOBILE}) {
    font-size: 12px;
  }
`;

const SyllabusBody = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: #222;
  background: #fafafa;
  border: 1px solid #efefef;
  border-radius: 12px;
  padding: 14px 16px;
  min-height: 72px;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: ${MOBILE}) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #7a7a7a;
`;

const DetailValue = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #111;
  font-weight: 500;
`;

const RowActions = styled.div`
  display: flex;
  gap: 0.4vw;

  @media (max-width: ${MOBILE}) {
    gap: 8px;
  }
`;

const IconButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #efefef;
  background: #fff;
  color: #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    background: var(--color-primary-light);
    border-color: var(--color-primary);
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const LoadingWrap = styled.div`
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
`;

const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border: 4px solid var(--color-primary-soft);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 6vh 2vw;
  font-family: 'Roboto', sans-serif;
  color: #626060;
  font-size: 0.85vw;

  @media (max-width: ${MOBILE}) {
    font-size: 14px;
    padding: 40px 12px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Modal = styled.div`
  background: #fff;
  width: min(640px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  animation: ${fadeIn} 0.2s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-family: 'Comfortaa', sans-serif;
  font-size: 20px;
  color: #111;
  line-height: 1.45;
  padding-top: 0.1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  color: #626060;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }
`;

const ErrorText = styled.div`
  color: #b42318;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
`;

const Hint = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #7a7a7a;
`;

const PreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PreviewChip = styled.span`
  background: #efefef;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const UpcomingExams = () => {
  const canMutate = isAdminEmail();
  const {
    classes,
    classMap,
    sectionMap,
    batches,
    sectionsByClass,
    loading: mastersLoading,
  } = useClassSectionLookup();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({
    classId: '',
    sectionId: '',
    batchId: '',
    scheduled: '',
  });
  const [listForbidden, setListForbidden] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(DEFAULT_EXAM_FORM);
  const [createErrors, setCreateErrors] = useState({});

  const [editingExam, setEditingExam] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  const [deletingExam, setDeletingExam] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [expandedGroupKey, setExpandedGroupKey] = useState(null);
  const [expandedAudienceKey, setExpandedAudienceKey] = useState(null);
  const [syllabusExam, setSyllabusExam] = useState(null);

  const filterSections = useMemo(
    () => (filters.classId ? getSectionsForClass(filters.classId, sectionsByClass) : []),
    [filters.classId, sectionsByClass]
  );

  const createClassSections = useMemo(() => {
    if (!createForm.selectedClassIds.length) return [];

    // Preserve class order; flatten sections for the selected class(es)
    const sections = [];
    const seen = new Set();
    createForm.selectedClassIds.forEach((classId) => {
      getSectionsForClass(classId, sectionsByClass).forEach((section) => {
        if (!section?.id || seen.has(section.id)) return;
        seen.add(section.id);
        sections.push(section);
      });
    });
    return sections;
  }, [createForm.selectedClassIds, sectionsByClass]);

  const createAvailableSectionIds = useMemo(
    () => createClassSections.map((section) => section.id),
    [createClassSections]
  );

  const createAllSectionsActive =
    createForm.allSections ||
    areAllSectionsSelected(createForm.selectedSectionIds, createAvailableSectionIds);

  const createAvailableBatchIds = useMemo(
    () => getAvailableBatchIds(batches),
    [batches]
  );

  const createAllBatchesActive =
    createForm.allBatches ||
    areAllBatchesSelected(createForm.selectedBatchIds, createAvailableBatchIds);

  const createNoneBatchActive = isNoneBatchSelected({
    allBatches: createForm.allBatches,
    selectedBatchIds: createForm.selectedBatchIds,
    availableBatchIds: createAvailableBatchIds,
  });

  const editSections = useMemo(() => {
    if (!editForm?.class_name) return [];
    return getSectionsForClass(editForm.class_name, sectionsByClass);
  }, [editForm?.class_name, sectionsByClass]);

  const createTargetsPreview = useMemo(() => {
    const payload = buildCreateExamPayload({
      ...createForm,
      classes,
      sectionMap,
      sectionsByClass,
      batches,
    });
    const targets = payload.targets
      ? payload.targets
      : payload.class_name
        ? [
            {
              class_name: payload.class_name,
              section: payload.section,
              batch: payload.batch,
            },
          ]
        : [];

    return targets.map((target, index) => {
      const className = classMap[target.class_name]?.name || 'Class';
      const sectionName = target.section
        ? sectionMap[target.section]?.name || getSectionDisplayLabel(sectionMap[target.section], [])
        : null;
      const batchName = target.batch
        ? batches.find((b) => b.id === target.batch)?.name
        : null;
      const label = [className, sectionName, batchName].filter(Boolean).join(' · ');
      return {
        key: `${target.class_name}-${target.section || 'all'}-${target.batch || 'none'}-${index}`,
        label,
      };
    });
  }, [createForm, classes, sectionMap, sectionsByClass, classMap, batches]);

  const examGroups = useMemo(() => groupUpcomingExams(exams), [exams]);

  const shellCount = exams.length;

  const audienceExpandKey = (groupKey, audienceKey) => `${groupKey}::${audienceKey}`;

  const toggleAudienceBucket = (groupKey, audienceKey) => {
    const next = audienceExpandKey(groupKey, audienceKey);
    setExpandedAudienceKey((prev) => (prev === next ? null : next));
  };

  useEffect(() => {
    if (!expandedGroupKey) {
      setExpandedAudienceKey(null);
      return;
    }
    const stillExists = examGroups.some((group) => group.key === expandedGroupKey);
    if (!stillExists) {
      setExpandedGroupKey(null);
      setExpandedAudienceKey(null);
    }
  }, [examGroups, expandedGroupKey]);

  const loadExams = async () => {
    try {
      setLoading(true);
      setListForbidden(false);
      const result = await fetchUpcomingExams({
        classId: filters.classId || undefined,
        sectionId: filters.sectionId || undefined,
        batchId: filters.batchId || undefined,
        scheduled: filters.scheduled === '' ? undefined : filters.scheduled,
      });
      setExams(result.data);
    } catch (error) {
      setExams([]);
      if (isForbiddenError(error)) {
        setListForbidden(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.classId, filters.sectionId, filters.batchId, filters.scheduled]);

  const resetCreateForm = () => {
    setCreateForm(DEFAULT_EXAM_FORM);
    setCreateErrors({});
  };

  const openCreate = () => {
    if (!canMutate) return;
    resetCreateForm();
    setIsCreateOpen(true);
  };

  const handleAudienceModeChange = (mode) => {
    setCreateForm((prev) => ({
      ...prev,
      audienceMode: mode,
      selectedClassIds:
        mode === AUDIENCE_MODES.ALL_CLASSES ? classes.map((cls) => cls.id) : [],
      allSections: true,
      selectedSectionIds: [],
      // All Classes auto-covers every batch — clear manual picks
      ...clearBatchSelection(),
    }));
    setCreateErrors((prev) => ({ ...prev, audience: undefined, batch: undefined }));
  };

  const syncSectionsForClasses = (nextClassIds, prev) => {
    const availableIds = getAvailableSectionIds(nextClassIds, sectionsByClass);

    if (!nextClassIds.length || availableIds.length === 0) {
      return {
        ...prev,
        selectedClassIds: nextClassIds,
        allSections: true,
        selectedSectionIds: [],
      };
    }

    if (prev.allSections) {
      return {
        ...prev,
        selectedClassIds: nextClassIds,
        allSections: true,
        selectedSectionIds: [...availableIds],
      };
    }

    // Keep only sections that still belong to the remaining class selection
    const pruned = prev.selectedSectionIds.filter((id) => availableIds.includes(id));
    if (!pruned.length || areAllSectionsSelected(pruned, availableIds)) {
      return {
        ...prev,
        selectedClassIds: nextClassIds,
        allSections: true,
        selectedSectionIds: [...availableIds],
      };
    }

    return {
      ...prev,
      selectedClassIds: nextClassIds,
      allSections: false,
      selectedSectionIds: pruned,
    };
  };

  const toggleCreateClass = (classId) => {
    setCreateForm((prev) => {
      if (prev.audienceMode === AUDIENCE_MODES.INDIVIDUAL) {
        // Single class focus for individual section picking
        const nextClassIds = prev.selectedClassIds[0] === classId ? [] : [classId];
        return syncSectionsForClasses(nextClassIds, prev);
      }

      return syncSectionsForClasses(toggleIdInList(prev.selectedClassIds, classId), prev);
    });
    setCreateErrors((prev) => ({ ...prev, audience: undefined }));
  };

  const toggleCreateAllSections = () => {
    setCreateForm((prev) => {
      const availableSectionIds = getAvailableSectionIds(
        prev.selectedClassIds,
        sectionsByClass
      );
      return {
        ...prev,
        ...toggleAllSectionsSelection({
          allSections: prev.allSections,
          selectedSectionIds: prev.selectedSectionIds,
          availableSectionIds,
        }),
      };
    });
    setCreateErrors((prev) => ({ ...prev, audience: undefined }));
  };

  const toggleCreateSection = (sectionId) => {
    setCreateForm((prev) => {
      const availableSectionIds = getAvailableSectionIds(
        prev.selectedClassIds,
        sectionsByClass
      );
      return {
        ...prev,
        ...toggleSectionSelection({
          sectionId,
          allSections: prev.allSections,
          selectedSectionIds: prev.selectedSectionIds,
          availableSectionIds,
        }),
      };
    });
    setCreateErrors((prev) => ({ ...prev, audience: undefined }));
  };

  const toggleCreateAllBatches = () => {
    setCreateForm((prev) => ({
      ...prev,
      ...toggleAllBatchesSelection({
        allBatches: prev.allBatches,
        selectedBatchIds: prev.selectedBatchIds,
        availableBatchIds: getAvailableBatchIds(batches),
      }),
    }));
    setCreateErrors((prev) => ({ ...prev, batch: undefined }));
  };

  const toggleCreateBatch = (batchId) => {
    setCreateForm((prev) => ({
      ...prev,
      ...toggleBatchSelection({
        batchId,
        allBatches: prev.allBatches,
        selectedBatchIds: prev.selectedBatchIds,
        availableBatchIds: getAvailableBatchIds(batches),
      }),
    }));
    setCreateErrors((prev) => ({ ...prev, batch: undefined }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    if (!canMutate) return;

    const errors = validateCreateExamForm({
      ...createForm,
      classes,
      sectionsByClass,
      batches,
    });
    setCreateErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = buildCreateExamPayload({
      ...createForm,
      classes,
      sectionMap,
      sectionsByClass,
      batches,
    });

    try {
      setSaving(true);
      await createUpcomingExams(payload);
      setIsCreateOpen(false);
      resetCreateForm();
      await loadExams();
    } catch (error) {
      const message = formatUpcomingExamError(error, 'Failed to create upcoming exam');
      if (isForbiddenError(error)) {
        setIsCreateOpen(false);
      } else {
        setCreateErrors({ general: message });
      }
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (exam) => {
    if (!canMutate) return;
    setEditingExam(exam);
    setEditForm(examToEditForm(exam));
    setEditErrors({});
  };

  const openSyllabus = (exam) => {
    if (!getExamSyllabus(exam)) return;
    setSyllabusExam(exam);
  };

  const renderScheduleCell = (exam) => {
    const timeRange = formatExamTimeRange(exam);
    if (!exam?.exam_date && !timeRange) {
      return <SchedulePrimary>Awaiting teacher schedule</SchedulePrimary>;
    }

    return (
      <ScheduleCell>
        <SchedulePrimary>
          {exam.exam_date
            ? `Exam ${formatDateDisplay(exam.exam_date)}`
            : 'Date not set'}
        </SchedulePrimary>
        {timeRange ? <ScheduleTime>{timeRange}</ScheduleTime> : null}
      </ScheduleCell>
    );
  };

  const renderShellActions = (exam) => {
    const syllabus = getExamSyllabus(exam);
    return (
      <RowActions>
        {syllabus && (
          <IconButton
            type="button"
            title="View syllabus"
            onClick={(e) => {
              e.stopPropagation();
              openSyllabus(exam);
            }}
          >
            <FiBookOpen />
          </IconButton>
        )}
        <IconButton
          type="button"
          title={canMutate ? 'Edit shell' : 'Admin only'}
          disabled={!canMutate}
          onClick={(e) => {
            e.stopPropagation();
            openEdit(exam);
          }}
        >
          <FiEdit2 />
        </IconButton>
        <IconButton
          type="button"
          title={canMutate ? 'Delete shell' : 'Admin only'}
          disabled={!canMutate}
          onClick={(e) => {
            e.stopPropagation();
            if (!canMutate) return;
            setDeleteError('');
            setDeletingExam(exam);
          }}
        >
          <FiTrash2 />
        </IconButton>
      </RowActions>
    );
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editingExam || !editForm) return;

    const errors = validateUpdateExamForm(editForm);
    setEditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = buildUpdateExamPayload(editForm);

    try {
      setSaving(true);
      await updateUpcomingExam(editingExam.id, payload);
      setEditingExam(null);
      setEditForm(null);
      await loadExams();
    } catch (error) {
      const message = formatUpcomingExamError(error, 'Failed to update upcoming exam');
      if (isForbiddenError(error)) {
        setEditingExam(null);
        setEditForm(null);
      } else {
        setEditErrors({ general: message });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingExam) return;
    try {
      setSaving(true);
      setDeleteError('');
      await deleteUpcomingExam(deletingExam.id);
      setDeletingExam(null);
      await loadExams();
    } catch (error) {
      setDeleteError(formatUpcomingExamError(error, 'Failed to delete upcoming exam'));
    } finally {
      setSaving(false);
    }
  };

  const handleStatusFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, scheduled: event.target.value }));
  };

  const handleClassFilterChange = (event) => {
    const classId = event.target.value;
    setFilters((prev) => ({
      ...prev,
      classId,
      sectionId: '',
    }));
  };

  const handleSectionFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, sectionId: event.target.value }));
  };

  const handleBatchFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, batchId: event.target.value }));
  };

  if (listForbidden) {
    return (
      <Page>
        <HeaderCard>
          <TitleBlock>
            <PageTitle>Upcoming Exams</PageTitle>
            <PageSubtitle>Admin exam shells for teachers to schedule</PageSubtitle>
          </TitleBlock>
        </HeaderCard>
        <Card>
          <EmptyState>
            Access denied. You do not have permission to view upcoming exams.
          </EmptyState>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <HeaderCard>
        <TitleBlock>
          <PageTitle>Upcoming Exams</PageTitle>
          <PageSubtitle>
            Create class / section shells — teachers fill subject, timing & syllabus
          </PageSubtitle>
        </TitleBlock>
        <HeaderActions>
          <SecondaryButton type="button" onClick={loadExams} disabled={loading}>
            <FiRefreshCw />
            Refresh
          </SecondaryButton>
          {canMutate && (
            <PrimaryButton type="button" onClick={openCreate}>
              <FiPlus />
              Create Exam
            </PrimaryButton>
          )}
        </HeaderActions>
      </HeaderCard>

      <Card>
        <FiltersRow>
          <BrandSelect
            aria-label="Filter by status"
            placeholder="All Statuses"
            value={String(filters.scheduled ?? '')}
            onChange={handleStatusFilterChange}
            options={SCHEDULE_FILTER_OPTIONS.map((option) => ({
              value: String(option.value ?? ''),
              label: option.value === '' ? 'All Statuses' : option.label,
            }))}
          />

          <BrandSelect
            aria-label="Filter by class"
            placeholder="All Classes"
            value={String(filters.classId || '')}
            onChange={handleClassFilterChange}
            options={[
              { value: '', label: 'All Classes' },
              ...classes.map((cls) => ({ value: String(cls.id), label: cls.name })),
            ]}
          />

          <BrandSelect
            aria-label="Filter by section"
            placeholder={filters.classId ? 'All Sections' : 'Select class first'}
            value={String(filters.sectionId || '')}
            onChange={handleSectionFilterChange}
            disabled={!filters.classId}
            options={[
              {
                value: '',
                label: filters.classId ? 'All Sections' : 'Select class first',
              },
              ...filterSections.map((section) => ({
                value: String(section.id),
                label: getSectionDisplayLabel(section, filterSections),
              })),
            ]}
          />

          <BrandSelect
            aria-label="Filter by batch"
            placeholder="All Batches"
            value={String(filters.batchId || '')}
            onChange={handleBatchFilterChange}
            options={[
              { value: '', label: 'All Batches' },
              ...batches.map((batch) => ({ value: String(batch.id), label: batch.name })),
            ]}
          />
        </FiltersRow>

        <ListHeader>
          <CountText>
            {loading ? (
              'Loading…'
            ) : (
              <>
                <strong>{examGroups.length}</strong> exam
                {examGroups.length === 1 ? '' : 's'}
                {' · '}
                <strong>{shellCount}</strong> class shell
                {shellCount === 1 ? '' : 's'}
              </>
            )}
          </CountText>
        </ListHeader>

        {loading || mastersLoading ? (
          <LoadingWrap>
            <Spinner />
            <ExamMeta>Loading upcoming exams…</ExamMeta>
          </LoadingWrap>
        ) : examGroups.length === 0 ? (
          <EmptyState>
            <FiCalendar size={28} style={{ marginBottom: 8 }} />
            <div>No upcoming exams found for the selected filters.</div>
          </EmptyState>
        ) : (
          <ExamList>
            {examGroups.map((group) => {
              const isOpen = expandedGroupKey === group.key;
              const previewLabels = group.classLabels.slice(0, 5);
              const extraCount = Math.max(group.classLabels.length - previewLabels.length, 0);

              return (
                <ExamGroup key={group.key} data-open={isOpen ? 'true' : 'false'}>
                  <ExamGroupHeader
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      setExpandedGroupKey((prev) => (prev === group.key ? null : group.key));
                      setExpandedAudienceKey(null);
                    }}
                  >
                    <ChevronWrap $open={isOpen}>
                      {isOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
                    </ChevronWrap>

                    <ExamMain>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <ExamIcon>
                          <FiCalendar size={16} />
                        </ExamIcon>
                        <div style={{ minWidth: 0 }}>
                          <ExamTitle>{group.title}</ExamTitle>
                          <MetaRow style={{ marginTop: 4 }}>
                            <SoftChip>From {formatDateDisplay(group.from_date)}</SoftChip>
                            <SoftChip>
                              {group.audienceCount} audience
                              {group.audienceCount === 1 ? '' : 's'}
                            </SoftChip>
                            {group.shellCount !== group.audienceCount && (
                              <SoftChip>
                                {group.shellCount} shell{group.shellCount === 1 ? '' : 's'}
                              </SoftChip>
                            )}
                          </MetaRow>
                        </div>
                      </div>
                    </ExamMain>

                    <GroupMetaCell>
                      <ClassChips>
                        {previewLabels.map((label) => (
                          <ClassChip key={label}>{label}</ClassChip>
                        ))}
                        {extraCount > 0 && <ClassChip>+{extraCount}</ClassChip>}
                      </ClassChips>
                    </GroupMetaCell>

                    <StatusBadge $tone={group.schedule.tone}>
                      {group.schedule.label}
                    </StatusBadge>
                  </ExamGroupHeader>

                  {isOpen && (
                    <ShellPanel>
                      {(group.audienceBuckets || []).map((bucket) => {
                        const bucketOpen =
                          expandedAudienceKey === audienceExpandKey(group.key, bucket.key);

                        // Single shell for this class·section·batch → flat row
                        if (!bucket.hasMultiple) {
                          const exam = bucket.primary;
                          if (!exam) return null;
                          const badge = getScheduleBadge(exam);
                          return (
                            <ShellRow key={bucket.key}>
                              <ExamMain>
                                <ExamTitle style={{ fontSize: '0.82vw', fontWeight: 600 }}>
                                  {bucket.label}
                                </ExamTitle>
                                <ExamMeta>
                                  {exam.code || '—'}
                                  {exam.subject ? ` · ${exam.subject}` : ''}
                                </ExamMeta>
                              </ExamMain>
                              {renderScheduleCell(exam)}
                              <StatusBadge $tone={badge.tone}>{badge.label}</StatusBadge>
                              {renderShellActions(exam)}
                            </ShellRow>
                          );
                        }

                        // Multiple shells (e.g. Chemistry + Physics) → inner dropdown
                        return (
                          <AudienceBucket
                            key={bucket.key}
                            data-open={bucketOpen ? 'true' : 'false'}
                          >
                            <AudienceHeader
                              type="button"
                              aria-expanded={bucketOpen}
                              onClick={() => toggleAudienceBucket(group.key, bucket.key)}
                            >
                              <AudienceChevron $open={bucketOpen}>
                                {bucketOpen ? (
                                  <FiChevronDown size={14} />
                                ) : (
                                  <FiChevronRight size={14} />
                                )}
                              </AudienceChevron>
                              <ExamMain>
                                <ExamTitle style={{ fontSize: '0.82vw', fontWeight: 600 }}>
                                  {bucket.label}
                                </ExamTitle>
                                <ExamMeta>
                                  {bucket.shellCount} subject
                                  {bucket.shellCount === 1 ? '' : 's'}
                                </ExamMeta>
                              </ExamMain>
                              <ExamMeta>
                                {bucket.schedule.scheduledCount}/{bucket.shellCount} scheduled
                              </ExamMeta>
                              <StatusBadge $tone={bucket.schedule.tone}>
                                {bucket.schedule.label}
                              </StatusBadge>
                            </AudienceHeader>

                            {bucketOpen && (
                              <InnerShellPanel>
                                {bucket.shells.map((exam) => {
                                  const badge = getScheduleBadge(exam);
                                  return (
                                    <ShellRow key={exam.id} $nested>
                                      <ExamMain>
                                        <ExamTitle
                                          style={{ fontSize: '0.78vw', fontWeight: 600 }}
                                        >
                                          {exam.subject || exam.code || 'Untitled subject'}
                                        </ExamTitle>
                                        <ExamMeta>{exam.code || '—'}</ExamMeta>
                                      </ExamMain>
                                      {renderScheduleCell(exam)}
                                      <StatusBadge $tone={badge.tone}>
                                        {badge.label}
                                      </StatusBadge>
                                      {renderShellActions(exam)}
                                    </ShellRow>
                                  );
                                })}
                              </InnerShellPanel>
                            )}
                          </AudienceBucket>
                        );
                      })}
                    </ShellPanel>
                  )}
                </ExamGroup>
              );
            })}
          </ExamList>
        )}
      </Card>

      {isCreateOpen && (
        <Overlay onClick={() => !saving && setIsCreateOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Create Upcoming Exam</ModalTitle>
              <IconButton type="button" onClick={() => !saving && setIsCreateOpen(false)}>
                <FiX />
              </IconButton>
            </ModalHeader>

            <Form onSubmit={handleCreateSubmit}>
              <FormGroup>
                <Label htmlFor="exam-title">Title *</Label>
                <Input
                  id="exam-title"
                  value={createForm.title}
                  onChange={(e) => {
                    setCreateForm((prev) => ({ ...prev, title: e.target.value }));
                    setCreateErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  placeholder="e.g. Unit Test 1"
                  maxLength={200}
                  disabled={saving}
                />
                {createErrors.title && <ErrorText>{createErrors.title}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="exam-from-date">From date (optional)</Label>
                <Input
                  id="exam-from-date"
                  type="date"
                  value={createForm.from_date}
                  onChange={(e) =>
                    setCreateForm((prev) => ({ ...prev, from_date: e.target.value }))
                  }
                  disabled={saving}
                />
              </FormGroup>

              <FormGroup>
                <Label>Audience</Label>
                <BadgeRow>
                  {AUDIENCE_MODE_OPTIONS.map((option) => (
                    <Badge
                      key={option.value}
                      type="button"
                      $active={createForm.audienceMode === option.value}
                      disabled={saving}
                      onClick={() => handleAudienceModeChange(option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </BadgeRow>
                <Hint>
                  {createForm.audienceMode === AUDIENCE_MODES.ALL_CLASSES &&
                    'Creates one shell for every class × section × batch.'}
                  {createForm.audienceMode === AUDIENCE_MODES.WHOLE_CLASS &&
                    'Select class(es), sections, then at least one batch.'}
                  {createForm.audienceMode === AUDIENCE_MODES.INDIVIDUAL &&
                    'Pick a class, sections, then at least one batch.'}
                </Hint>
              </FormGroup>

              {createForm.audienceMode !== AUDIENCE_MODES.ALL_CLASSES && (
                <FormGroup>
                  <Label>Classes</Label>
                  <BadgeRow>
                    {classes.map((cls) => (
                      <Badge
                        key={cls.id}
                        type="button"
                        $active={createForm.selectedClassIds.includes(cls.id)}
                        disabled={saving}
                        onClick={() => toggleCreateClass(cls.id)}
                      >
                        {cls.name}
                      </Badge>
                    ))}
                  </BadgeRow>
                </FormGroup>
              )}

              {createForm.audienceMode !== AUDIENCE_MODES.ALL_CLASSES && (
                <FormGroup>
                  <Label>Sections</Label>
                  <BadgeRow>
                    {!createForm.selectedClassIds.length ? (
                      <Hint>Select a class to load sections.</Hint>
                    ) : createClassSections.length === 0 ? (
                      <Hint>No sections for the selected class — a class-level shell will be created.</Hint>
                    ) : (
                      <>
                        <Badge
                          type="button"
                          $active={createAllSectionsActive}
                          disabled={saving}
                          onClick={toggleCreateAllSections}
                        >
                          All Sections
                        </Badge>
                        {createClassSections.map((section) => {
                          const isActive =
                            createAllSectionsActive ||
                            createForm.selectedSectionIds.includes(section.id);
                          return (
                            <Badge
                              key={section.id}
                              type="button"
                              $active={isActive}
                              disabled={saving}
                              onClick={() => toggleCreateSection(section.id)}
                            >
                              {getSectionDisplayLabel(section, createClassSections)}
                            </Badge>
                          );
                        })}
                      </>
                    )}
                  </BadgeRow>
                  {createForm.selectedClassIds.length > 0 && createClassSections.length > 0 && (
                    <Hint>
                      {createAllSectionsActive
                        ? `All ${createClassSections.length} section${createClassSections.length === 1 ? '' : 's'} selected — tap a section to narrow.`
                        : `${createForm.selectedSectionIds.length} of ${createClassSections.length} section${createClassSections.length === 1 ? '' : 's'} selected.`}
                    </Hint>
                  )}
                </FormGroup>
              )}

              {createForm.audienceMode !== AUDIENCE_MODES.ALL_CLASSES && (
                <FormGroup>
                  <Label>Batch *</Label>
                  <BadgeRow>
                    {createAvailableBatchIds.length === 0 ? (
                      <Hint>No batches available.</Hint>
                    ) : (
                      <>
                        <Badge
                          type="button"
                          $active={createAllBatchesActive}
                          disabled={saving}
                          onClick={toggleCreateAllBatches}
                        >
                          All Batches
                        </Badge>
                        {batches.map((batch) => {
                          const isActive =
                            createAllBatchesActive ||
                            createForm.selectedBatchIds.includes(batch.id);
                          return (
                            <Badge
                              key={batch.id}
                              type="button"
                              $active={isActive}
                              disabled={saving}
                              onClick={() => toggleCreateBatch(batch.id)}
                            >
                              {batch.name}
                            </Badge>
                          );
                        })}
                      </>
                    )}
                  </BadgeRow>
                  {createAvailableBatchIds.length > 0 && (
                    <Hint>
                      {createNoneBatchActive &&
                        'Select at least one batch (or All Batches).'}
                      {createAllBatchesActive &&
                        `All ${createAvailableBatchIds.length} batch${createAvailableBatchIds.length === 1 ? '' : 'es'} selected — tap a batch to narrow.`}
                      {!createNoneBatchActive &&
                        !createAllBatchesActive &&
                        `${createForm.selectedBatchIds.length} of ${createAvailableBatchIds.length} batch${createAvailableBatchIds.length === 1 ? '' : 'es'} selected.`}
                    </Hint>
                  )}
                  {createErrors.batch && <ErrorText>{createErrors.batch}</ErrorText>}
                </FormGroup>
              )}

              {createTargetsPreview.length > 0 && (
                <FormGroup>
                  <Label>
                    Will create {createTargetsPreview.length} exam
                    {createTargetsPreview.length === 1 ? '' : 's'}
                    {createForm.audienceMode === AUDIENCE_MODES.ALL_CLASSES
                      ? ' across all classes, sections & batches'
                      : ''}
                  </Label>
                  <PreviewList>
                    {createTargetsPreview.slice(0, 40).map((chip) => (
                      <PreviewChip key={chip.key}>{chip.label}</PreviewChip>
                    ))}
                    {createTargetsPreview.length > 40 && (
                      <PreviewChip>
                        +{createTargetsPreview.length - 40} more
                      </PreviewChip>
                    )}
                  </PreviewList>
                </FormGroup>
              )}

              {createErrors.audience && <ErrorText>{createErrors.audience}</ErrorText>}
              {createForm.audienceMode === AUDIENCE_MODES.ALL_CLASSES &&
                createErrors.batch && <ErrorText>{createErrors.batch}</ErrorText>}
              {createErrors.general && <ErrorText>{createErrors.general}</ErrorText>}

              <ModalActions>
                <SecondaryButton
                  type="button"
                  disabled={saving}
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit" disabled={saving}>
                  {saving ? 'Creating…' : 'Create'}
                </PrimaryButton>
              </ModalActions>
            </Form>
          </Modal>
        </Overlay>
      )}

      {editingExam && editForm && (
        <Overlay onClick={() => !saving && setEditingExam(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Edit Upcoming Exam</ModalTitle>
              <IconButton type="button" onClick={() => !saving && setEditingExam(null)}>
                <FiX />
              </IconButton>
            </ModalHeader>

            <Form onSubmit={handleEditSubmit}>
              <FormGroup>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editForm.title}
                  onChange={(e) => {
                    setEditForm((prev) => ({ ...prev, title: e.target.value }));
                    setEditErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  disabled={saving}
                />
                {editErrors.title && <ErrorText>{editErrors.title}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edit-from-date">From date</Label>
                <Input
                  id="edit-from-date"
                  type="date"
                  value={editForm.from_date}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, from_date: e.target.value }))
                  }
                  disabled={saving}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edit-class">Class *</Label>
                <BrandSelect
                  variant="field"
                  aria-label="Class"
                  placeholder="Select class"
                  value={String(editForm.class_name || '')}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      class_name: e.target.value,
                      section: '',
                    }))
                  }
                  disabled={saving}
                  error={Boolean(editErrors.class_name)}
                  options={[
                    { value: '', label: 'Select class' },
                    ...classes.map((cls) => ({ value: String(cls.id), label: cls.name })),
                  ]}
                />
                {editErrors.class_name && <ErrorText>{editErrors.class_name}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edit-section">Section</Label>
                <BrandSelect
                  variant="field"
                  aria-label="Section"
                  placeholder="Whole class"
                  value={String(editForm.section || '')}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, section: e.target.value }))
                  }
                  disabled={saving || !editForm.class_name}
                  options={[
                    { value: '', label: 'Whole class' },
                    ...editSections.map((section) => ({
                      value: String(section.id),
                      label: getSectionDisplayLabel(section, editSections),
                    })),
                  ]}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edit-batch">Batch *</Label>
                <BrandSelect
                  variant="field"
                  aria-label="Batch"
                  placeholder="Select batch"
                  value={String(editForm.batch || '')}
                  onChange={(e) => {
                    setEditForm((prev) => ({ ...prev, batch: e.target.value }));
                    setEditErrors((prev) => ({ ...prev, batch: undefined }));
                  }}
                  disabled={saving}
                  error={Boolean(editErrors.batch)}
                  options={[
                    { value: '', label: 'Select batch' },
                    ...batches.map((batch) => ({ value: String(batch.id), label: batch.name })),
                  ]}
                />
                {editErrors.batch && <ErrorText>{editErrors.batch}</ErrorText>}
              </FormGroup>

              {editErrors.general && <ErrorText>{editErrors.general}</ErrorText>}

              <ModalActions>
                <SecondaryButton
                  type="button"
                  disabled={saving}
                  onClick={() => setEditingExam(null)}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit" disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </PrimaryButton>
              </ModalActions>
            </Form>
          </Modal>
        </Overlay>
      )}

      {deletingExam && (
        <Overlay onClick={() => !saving && setDeletingExam(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Delete exam?</ModalTitle>
              <IconButton type="button" onClick={() => !saving && setDeletingExam(null)}>
                <FiX />
              </IconButton>
            </ModalHeader>
            <ExamMeta style={{ marginBottom: 16, fontSize: 14 }}>
              Soft-delete <strong>{deletingExam.title}</strong>
              {deletingExam.code ? ` (${deletingExam.code})` : ''}. This action is admin-only.
            </ExamMeta>
            {deleteError && <ErrorText>{deleteError}</ErrorText>}
            <ModalActions>
              <SecondaryButton
                type="button"
                disabled={saving}
                onClick={() => setDeletingExam(null)}
              >
                Cancel
              </SecondaryButton>
              <DangerButton type="button" disabled={saving} onClick={handleDelete}>
                {saving ? 'Deleting…' : 'Delete'}
              </DangerButton>
            </ModalActions>
          </Modal>
        </Overlay>
      )}

      {syllabusExam && (
        <Overlay onClick={() => setSyllabusExam(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Syllabus</ModalTitle>
              <IconButton type="button" onClick={() => setSyllabusExam(null)}>
                <FiX />
              </IconButton>
            </ModalHeader>

            <Form as="div">
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Exam</DetailLabel>
                  <DetailValue>{syllabusExam.title || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Code</DetailLabel>
                  <DetailValue>{syllabusExam.code || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Audience</DetailLabel>
                  <DetailValue>{formatAudienceLabel(syllabusExam)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Subject</DetailLabel>
                  <DetailValue>{syllabusExam.subject || '—'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Date</DetailLabel>
                  <DetailValue>
                    {syllabusExam.exam_date
                      ? formatDateDisplay(syllabusExam.exam_date)
                      : '—'}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Time</DetailLabel>
                  <DetailValue>
                    {formatExamTimeRange(syllabusExam) || '—'}
                  </DetailValue>
                </DetailItem>
              </DetailGrid>

              <FormGroup>
                <Label>Syllabus details</Label>
                <SyllabusBody>{getExamSyllabus(syllabusExam)}</SyllabusBody>
              </FormGroup>

              {syllabusExam.syllabus_added_by_name && (
                <ExamMeta style={{ fontSize: 13 }}>
                  Added by <strong>{syllabusExam.syllabus_added_by_name}</strong>
                </ExamMeta>
              )}

              <ModalActions>
                <PrimaryButton type="button" onClick={() => setSyllabusExam(null)}>
                  Close
                </PrimaryButton>
              </ModalActions>
            </Form>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
};

export default UpcomingExams;
