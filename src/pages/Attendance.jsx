import { API_BASE_URL } from '@/config/api';
import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios';
import { FiRefreshCw, FiX, FiEdit2, FiDownload, FiSearch, FiFilter, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import arrowIcon from '../assets/arrow.svg';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useStudents } from '../context/StudentsContext';
import { useAcademicYear } from '../context/AcademicYearContext';
import { useStudentListQuery } from '../hooks/useStudentListQuery';
import StudentListPagination from '../components/StudentListPagination';
import { resolveRole, ROLES } from '@/auth/roles';
import { getSearchPlaceholder } from '../utils/searchConfig';

// Modern loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
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

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonRow = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #FEA592;
  color: white;
  border-radius: 8px;
  text-align: center;
  margin: 20px auto;
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  color: #FF6745;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Container = styled.div`
  padding: 2rem;
  background-color: #EFEFEF;
  min-height: 100vh;
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 4vh;
  margin-bottom: 4vh;
  gap: 15px;
  background: #EFEFEF;
  border-radius: 10px;
  transition: all 0.3s ease;
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 600px; }
`;

// Unified search + cascade-filter bar, shared verbatim between mobile and desktop
// (matches the Students page pattern: one pill search box + one Filter button that
// opens a chip-based dropdown), so search/filter behavior is identical everywhere.
const CFSearchFilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 6px;
    width: 100%;
    padding: 4px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
  }
`;

const CFSearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5vw;
  padding: 0 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 320px;
  height: 5.5vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 1;
    max-width: none;
    min-width: 0;
    padding: 0 0.75rem;
    border-radius: 10px;
    box-shadow: none;
    background: transparent;
    height: auto;
    min-height: 40px;
  }
`;

const CFSearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  width: 100%;
  background: transparent;
  font-family: "Roboto", sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0.4rem 0.5rem;
  }
`;

const CFFilterContainer = styled.div`
  position: relative;

  @media (max-width: 768px) {
    width: auto;
    flex-shrink: 0;
  }
`;

const CFFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: white;
  border: none;
  padding: 0 1.2rem;
  height: 5.5vh;
  box-sizing: border-box;
  border-radius: 5vw;
  cursor: pointer;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;
  position: relative;
  color: #333;
  white-space: nowrap;

  &:hover {
    background: #f1f1f1;
  }

  ${props => props.$active && css`
    background: var(--color-primary);
    color: var(--color-on-primary, #ffffff);
  `}

  @media (max-width: 768px) {
    width: 40px;
    min-width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 10px;
    box-shadow: none;
    background: #F5F5F5;

    ${props => props.$active && css`
      background: var(--color-primary);
    `}

    span.filter-label,
    svg.chevron-icon {
      display: none;
    }
  }
`;

const CFFilterBadge = styled.span`
  background: #F44336;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  position: absolute;
  top: -5px;
  right: -5px;
`;

const CFFilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  padding: 1.5rem;
  width: max-content;
  min-width: 320px;
  max-width: min(340px, calc(100vw - 2rem));
  /* The app sidebar/header sit at z-index 1001-1100 (Layout.jsx/Sidebar.jsx) — clear all of
     them so the dropdown never renders underneath, no matter where it's anchored on the page. */
  z-index: 1500;
  animation: ${slideDown} 0.3s ease-out;
  margin-top: 0.5rem;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 400px;
    max-height: 85vh;
  }
`;

const CFFilterDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const CFFilterDropdownTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #212529;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
`;

const CFDropdownCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #666;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const CFFilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CFFilterSectionTitle = styled.h4`
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  color: #212529;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
`;

const CFFilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CFFilterOption = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: "Roboto", sans-serif;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$active && css`
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-on-primary, #ffffff);
    font-weight: 500;
  `}
`;

const CFFilterActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const CFActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  transition: all 0.2s;

  ${props => props.$primary ? css`
    background: var(--color-primary);
    color: var(--color-on-primary, #ffffff);
    &:hover { background: var(--color-secondary); }
  ` : css`
    background: #f5f5f5;
    color: #666;
    &:hover { background: #e5e5e5; }
  `}
`;

const CFFilterSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 2vh;
  padding: 0.5rem 1rem;
  background: var(--color-primary-soft, #fdf3d8);
  border-radius: 8px;
  font-size: 0.85rem;
  color: #333;
  font-family: "Roboto", sans-serif;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin: 0 0 12px;
  }
`;

const CFClearFiltersButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-left: auto;
  font-family: "Roboto", sans-serif;

  &:hover {
    color: #d00000;
  }
`;

const SelectArrow = styled.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
`;

const FilterSelectContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const FilterSelect = styled.select`
  padding: 10px 15px 10px 1.2vw;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2vw;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }
`;

const TableContainer = styled.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;
  cursor: grab;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-secondary);
  }
`;

const DraggableTableWrapper = styled.div`
  display: inline-block;
  min-width: 100%;
`;

const Table = styled.table`
  min-width: 100%;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th.withConfig({
  shouldForwardProp: (prop) => !['leftAlign'].includes(prop),
})`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${props => props.$leftAlign ? 'left' : 'center'};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${props => props.$leftAlign && 'padding-left: 1vw;'}

  &:nth-child(1) { width: 20vw; }  /* Student */
  &:nth-child(2) { width: 13vw; }  /* Admission No */
  &:nth-child(3) { width: 9vw; }   /* Class */
  &:nth-child(4) { width: 9vw; }   /* Section */
  &:nth-child(5) { width: 9vw; }   /* Batch */
  &:nth-child(6) { width: 10vw; }  /* Attendance */
  &:nth-child(7) { width: 15vw; }  /* Edit */
`;

const Tr = styled.tr`
  border-bottom: 1px solid #A7A7A7;
  transition: all 0.2s;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  font-weight: 400;

  &:hover {
    background-color: var(--color-row-hover);
    transform: scale(1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td.withConfig({
  shouldForwardProp: (prop) => !['leftAlign', 'isEditColumn'].includes(prop),
})`
  padding: 2vh 0vw;
  text-align: ${props => props.$leftAlign ? 'left' : 'center'};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${props => props.$leftAlign && 'padding-left: 25px;'}
  word-wrap: break-word;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => props.$isEditColumn && `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({ $status }) =>
    $status === 'present' ? '#BEFFB6' :
      $status === 'absent' ? '#FEA592' :
        'var(--color-primary)'};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`;

const CombinedClass = styled.span`
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`;

const Avatar = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: var(--color-primary);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 700;
  margin-right: 0.8vw;
  transition: all 0.2s;
`;

const StudentInfoContainer = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  min-width: 0;
`;

const StudentDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
  overflow: hidden;
`;

const StudentName = styled.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Comfortaa", sans-serif;
  font-size: clamp(0.95rem, 4vw, 1.1rem);
  font-weight: 700;
  justify-content: center;
  padding: 48px 24px 96px;
  text-align: center;
  color: #333;
  gap: 8px;

  p {
    font-size: clamp(0.85rem, 3.5vw, 1rem);
    font-weight: 400;
    color: #666;
    margin: 0;
  }
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateInput = styled.input`
  padding: 10px 15px;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }
`;

const EditButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.7vh;

  &:hover {
    color: var(--color-secondary);
    transform: scale(1.1);
  }
`;

const AttendanceButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 1vh;
`;

const AttendanceButton = styled.button`
  padding: 6px 12px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  background: ${props => props.selected ? 'var(--color-primary)' : 'white'};
  color: ${props => props.selected ? 'var(--color-on-primary, #ffffff)' : 'var(--color-primary)'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    background: var(--color-primary);
    color: var(--color-on-primary, #ffffff);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
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
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ModalTitle = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.4rem;
  color: #333;
  margin: 0;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  &:hover {
    color: #000;
    background: #f5f5f5;
  }
`;

const AttendanceOptions = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: var(--color-primary);
  border: none;
  border-radius: 1rem;
  color: var(--color-on-primary, #ffffff);
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: var(--color-secondary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-primary-soft);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const SecondaryButton = styled(SaveButton)`
  background: #f0f0f0;
  color: #333;

  &:hover {
    background: #e0e0e0;
    box-shadow: none;
  }
`;

const ModalScopeText = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;

  strong {
    color: #222;
  }
`;

const ModalStudentInfo = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const ModalStudentName = styled.h3`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const ModalStudentDetails = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const ModalDate = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.85rem;
  color: #888;
  margin: 0.45rem 0 0 0;
`;

const ModalError = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #c62828;
  background: #ffebee;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin: 0 0 1rem 0;
`;

const ExportButton = styled.button`
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: var(--color-on-primary, #ffffff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExportDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
  }
`;

const ExportDialogTitle = styled(DialogTitle)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
`;

const ExportDialogContent = styled(DialogContent)`
  padding: 20px !important;
`;

const ExportDialogActions = styled(DialogActions)`
  padding: 16px 24px !important;
`;

const ExportOptions = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const ExportOption = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.isActive ? 'var(--color-primary)' : '#f5f5f5'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isActive ? 'var(--color-secondary)' : '#e0e0e0'};
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const DateRangeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
`;

const CircleIconContainer = styled.div`
  width: 5.5vh;
  height: 5.5vh;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

const MobileContainer = styled.div`
  padding: 0;
  background-color: #EFEFEF;
  min-height: calc(100vh - 11vh);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const MobileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  background: #EFEFEF;
  padding: 4px 0 12px;
  z-index: 100;
`;

const MobileCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0 96px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 0;

  @media (max-width: 480px) {
    gap: 12px;
    padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
  }
`;

const MobileStudentCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.07), 0 2px 8px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  transition: all 0.3s ease;
  margin: 0 12px;

  @media (max-width: 480px) {
    margin: 0 8px;
    border-radius: 14px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 6px 20px rgba(0, 0, 0, 0.06);
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 100px;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary) 50%, var(--color-primary-light) 100%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;

  @media (max-width: 480px) {
    height: 88px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, var(--color-primary-soft) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(20px, 20px);
  }
`;

const StudentAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: absolute;
  bottom: -36px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--color-primary);
  border: 3px solid white;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
    bottom: -32px;
    font-size: 1.5rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardBody = styled.div`
  padding: 44px 16px 16px;

  @media (max-width: 480px) {
    padding: 40px 14px 14px;
  }
`;

const MobileStudentName = styled.h3`
  margin: 0;
  font-size: clamp(1.1rem, 4vw, 1.35rem);
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.3px;
  word-break: break-word;
`;

const MobileStudentInfo = styled.p`
  margin: 0.35rem 0;
  color: #666;
  font-size: clamp(0.8rem, 3.2vw, 0.9rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;

  strong {
    color: #333;
    font-weight: 500;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 0.8vh 0;
`;

const MobileAttendanceButtons = styled.div`
  display: flex;
  gap: 0.8vh;
  margin-top: 1rem;
  flex-direction: column;
`;

const MobileAttendanceButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  min-height: 44px;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  background: ${props => props.selected ? 'var(--color-primary)' : 'white'};
  color: ${props => props.selected ? 'var(--color-on-primary, #ffffff)' : 'var(--color-primary)'};
  font-weight: 500;
  font-size: clamp(0.85rem, 3.5vw, 0.95rem);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  touch-action: manipulation;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PresentRemainingButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  height: auto;
  min-height: 44px;
  background: var(--color-primary);
  border: none;
  border-radius: 12px;
  color: var(--color-on-primary, #ffffff);
  font-weight: 600;
  font-size: clamp(0.8rem, 3.5vw, 0.95rem);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0;
  text-align: center;
  line-height: 1.3;
  touch-action: manipulation;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #ccc;
  }

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    width: auto;
    padding: 0 1.5vh;
    height: 5.5vh;
    min-height: auto;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    background: var(--color-primary);
    box-shadow: 0 2px 8px var(--color-primary-soft);

    &:hover {
      background: var(--color-secondary);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--color-primary-pulse);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const AttendanceSummary = styled.div`
  background: white;
  padding: 14px 12px;
  border-radius: 12px;
  margin: 0;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 16px 20px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 16px;
  }
`;

const SummaryText = styled.div`
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 12px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 14px;
    color: #2c3e50;
    letter-spacing: 0.3px;
  }
`;

const SummaryCounts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
  align-items: stretch;

  @media (min-width: 768px) {
    gap: 16px;
    font-size: 1rem;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-around;
  }
`;

const CountCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 6px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-width: 0;
  border: 1px solid #e0e0e0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.$color || 'var(--color-primary)'};
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    padding: 1vh 1.5vh;
    border-radius: 10px;
    min-width: 80px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  }
`;

const CountLabel = styled.div`
  font-size: clamp(0.6rem, 2.5vw, 0.75rem);
  font-weight: 600;
  color: #666;
  margin-bottom: 4px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  white-space: nowrap;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.4vh;
    font-weight: 600;
  }
`;

const CountNumber = styled.div`
  font-size: clamp(1.1rem, 5vw, 1.35rem);
  font-weight: 700;
  color: ${props => props.$color || '#333'};
  text-align: center;
  line-height: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const PresentCard = styled(CountCard)`
  &::before {
    background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
  }
`;

const AbsentCard = styled(CountCard)`
  &::before {
    background: linear-gradient(90deg, #F44336 0%, #EF5350 100%);
  }
`;

const UnmarkedCard = styled(CountCard)`
  &::before {
    background: linear-gradient(90deg, #FF9800 0%, #FFB74D 100%);
  }
`;

const PresentNumber = styled(CountNumber)`
  color: #4CAF50;
`;

const AbsentNumber = styled(CountNumber)`
  color: #F44336;
`;

const UnmarkedNumber = styled(CountNumber)`
  color: #FF9800;
`;

const MobileDateSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 0;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const MobileDateButton = styled.button`
  padding: 10px 8px;
  background: ${props => props.$pickDate
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : props.active ? 'var(--color-primary)' : 'white'};
  color: ${props => props.$pickDate || props.active ? 'white' : '#333'};
  border: 1px solid ${props =>
    props.$pickDate ? 'transparent' :
    props.active ? 'var(--color-primary)' : '#e8e8e8'};
  border-radius: 10px;
  font-size: clamp(0.75rem, 3.2vw, 0.875rem);
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
  font-weight: 600;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  touch-action: manipulation;
  width: 100%;

  &:active {
    transform: scale(0.97);
  }

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const MobileDateInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
  
  /* Ensure it works on all mobile browsers */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  /* Remove default styling */
  border: none;
  background: transparent;
  font-size: 16px; /* Prevents zoom on iOS */
  
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    color: transparent;
    background: transparent;
    cursor: pointer;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-clear-button {
    display: none;
    -webkit-appearance: none;
  }
`;

const MobileDateButtonWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
`;

const DatePickerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const DatePickerContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const DatePickerTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;

const DatePickerInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const DatePickerActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const DatePickerButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.primary ? `
    background: var(--color-primary);
    color: var(--color-on-primary, #ffffff);
    
    &:hover {
      background: var(--color-secondary);
    }
  ` : `
    background: #f5f5f5;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
`;

const CurrentDateDisplay = styled.div`
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-on-primary, #ffffff);
  padding: 12px 14px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: clamp(0.8rem, 3.5vw, 0.95rem);
  margin: 0;
  box-shadow: 0 4px 15px var(--color-primary-pulse);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  line-height: 1.35;
  word-break: break-word;
`;

const MobileQuickFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
`;

const MobileQuickFilterChip = styled.button`
  padding: 8px 4px;
  min-height: 36px;
  border: 1px solid ${props => props.$active ? 'var(--color-primary)' : '#e0e0e0'};
  border-radius: 8px;
  background: ${props => props.$active ? 'var(--color-primary)' : 'white'};
  color: ${props => props.$active ? 'white' : '#555'};
  font-size: clamp(0.65rem, 2.8vw, 0.78rem);
  font-weight: 600;
  touch-action: manipulation;
  transition: all 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:active {
    transform: scale(0.97);
  }
`;

const MobileStatusBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ $status }) =>
    $status === 'present' ? '#BEFFB6' :
      $status === 'absent' ? '#FEA592' :
        'var(--color-primary)'};
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
`;

const Attendance = () => {
  const { academicYears, selectedAcademicYear, setSelectedAcademicYearId } = useAcademicYear();
  const { isRefreshing, refreshStudents } = useStudents();

  const {
    searchTerm,
    setSearchTerm,
    filters: cascadeFilters,
    setFilter,
    clearFilters,
    options: filterOptions,
    students: searchedStudents,
    count,
    page,
    setPage,
    pageSize,
    loading,
    error,
    refresh: refreshSearch,
    searchHint,
    isSearchTypingHint,
  } = useStudentListQuery({
    academicYearId: selectedAcademicYear?.id || '',
    extraSearchParams: { status: 'admission' },
  });

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [initialAttendance, setInitialAttendance] = useState(null);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [updatingStudentId, setUpdatingStudentId] = useState(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportType, setExportType] = useState('excel');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    admission_no: true,
    class: true,
    group: true,
    section: true,
    batch: true,
    attendance: true
  });
  const [isMobileView, setIsMobileView] = useState(false);
  const [isInchargeOnly, setIsInchargeOnly] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [quickDates, setQuickDates] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isMarkingRemaining, setIsMarkingRemaining] = useState(false);
  const [showMarkConfirmModal, setShowMarkConfirmModal] = useState(false);
  const [isDateChanging, setIsDateChanging] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState('');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const searchInputRef = useRef(null);
  const wasSearchFocusedRef = useRef(false);

  const columnOptions = [
    { id: 'name', label: 'Student Name' },
    { id: 'admission_no', label: 'Admission No' },
    { id: 'class', label: 'Class' },
    { id: 'group', label: 'Group' },
    { id: 'section', label: 'Section' },
    { id: 'batch', label: 'Batch' },
    { id: 'attendance', label: 'Attendance Status' }
  ];

  const handleColumnToggle = (columnId) => {
    setSelectedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const exportToExcel = async () => {
    try {
      const token = localStorage.getItem('token');

      // First get all students
      const studentsResponse = await axios.get(`${API_BASE_URL}/masters/students/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (studentsResponse.data.status !== 'success') {
        throw new Error('Failed to fetch students');
      }

      const allStudents = studentsResponse.data.data.filter(student => student.status === 'admission');

      // Then get attendance records for the date range
      const attendanceResponse = await axios.get(
        `${API_BASE_URL}/masters/attendance/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (attendanceResponse.data.status !== 'success') {
        throw new Error('Failed to fetch attendance records');
      }

      const attendanceData = attendanceResponse.data.data;

      // Create a map of student attendance by date
      const attendanceByDate = {};
      attendanceData.forEach(record => {
        const date = record.date;
        if (!attendanceByDate[date]) {
          attendanceByDate[date] = {};
        }
        attendanceByDate[date][record.student.id] = record.is_present;
      });

      // Generate dates between start and end date
      const dates = [];
      const currentDate = new Date(startDate);
      const endDateTime = new Date(endDate);
      while (currentDate <= endDateTime) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const selectedColumnOptions = columnOptions.filter(col => selectedColumns[col.id]);

      // Create export data with attendance for each day
      const exportData = allStudents.map(student => {
        const row = {};
        selectedColumnOptions.forEach(col => {
          switch (col.id) {
            case 'name':
              row['Student Name'] = student.name;
              break;
            case 'admission_no':
              row['Admission No'] = student.admission_no;
              break;
            case 'class':
              row['Class'] = student.class_name?.name || 'N/A';
              break;
            case 'group':
              row['Group'] = student.group || 'N/A';
              break;
            case 'section':
              row['Section'] = student.section?.name || 'N/A';
              break;
            case 'batch':
              row['Batch'] = student.batch || 'N/A';
              break;
          }
        });

        // Add attendance status for each date
        dates.forEach(date => {
          const status = attendanceByDate[date]?.[student.id];
          row[date] = status === undefined ? 'Not Marked' : (status ? 'Present' : 'Absent');
        });

        return row;
      });

      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 30 }, // Student Name
        { wch: 15 }, // Admission No
        { wch: 15 }, // Class
        { wch: 15 }, // Group
        { wch: 15 }, // Section
        { wch: 15 }, // Batch
        ...dates.map(() => ({ wch: 12 })) // Date columns
      ];
      ws['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
      XLSX.writeFile(wb, `attendance_${startDate}_to_${endDate}.xlsx`);
    } catch (error) {
      console.error('Failed to export attendance data', error);
    }
  };

  const exportToPDF = async () => {
    try {
      const token = localStorage.getItem('token');

      // First get all students
      const studentsResponse = await axios.get(`${API_BASE_URL}/masters/students/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (studentsResponse.data.status !== 'success') {
        throw new Error('Failed to fetch students');
      }

      const allStudents = studentsResponse.data.data.filter(student => student.status === 'admission');

      // Then get attendance records for the date range
      const attendanceResponse = await axios.get(
        `${API_BASE_URL}/masters/attendance/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (attendanceResponse.data.status !== 'success') {
        throw new Error('Failed to fetch attendance records');
      }

      const attendanceData = attendanceResponse.data.data;

      // Create a map of student attendance by date
      const attendanceByDate = {};
      attendanceData.forEach(record => {
        const date = record.date;
        if (!attendanceByDate[date]) {
          attendanceByDate[date] = {};
        }
        attendanceByDate[date][record.student.id] = record.is_present;
      });

      // Generate dates between start and end date
      const dates = [];
      const currentDate = new Date(startDate);
      const endDateTime = new Date(endDate);
      while (currentDate <= endDateTime) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const doc = new jsPDF('l', 'mm', 'a4');

      // Add title
      doc.setFontSize(16);
      doc.setTextColor(74, 108, 247);
      doc.text('Attendance Report', 14, 20);

      // Add date range
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 30);

      // Prepare headers and data
      const headers = [
        ...columnOptions
          .filter(col => selectedColumns[col.id])
          .map(col => col.label),
        ...dates
      ];

      const data = allStudents.map(student => {
        const row = [];
        if (selectedColumns.name) row.push(student.name);
        if (selectedColumns.admission_no) row.push(student.admission_no);
        if (selectedColumns.class) row.push(student.class_name?.name || 'N/A');
        if (selectedColumns.group) row.push(student.group || 'N/A');
        if (selectedColumns.section) row.push(student.section?.name || 'N/A');
        if (selectedColumns.batch) row.push(student.batch || 'N/A');

        // Add attendance status for each date
        dates.forEach(date => {
          const status = attendanceByDate[date]?.[student.id];
          row.push(status === undefined ? 'Not Marked' : (status ? 'Present' : 'Absent'));
        });

        return row;
      });

      // Calculate column widths
      const columnWidths = [
        ...columnOptions
          .filter(col => selectedColumns[col.id])
          .map(() => 30), // Fixed width for student info columns
        ...dates.map(() => 20) // Fixed width for date columns
      ];

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 35,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          cellWidth: 'wrap',
          halign: 'center',
          valign: 'middle',
          font: 'helvetica',
        },
        headStyles: {
          fillColor: [74, 108, 247],
          textColor: 255,
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          font: 'helvetica',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: Object.fromEntries(
          headers.map((_, index) => [
            index,
            { cellWidth: columnWidths[index] }
          ])
        ),
        margin: { top: 35 },
        didDrawPage: function (data) {
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.text(
            `Page ${data.pageCount} of ${data.pageNumber}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          );
        }
      });

      doc.save(`attendance_${startDate}_to_${endDate}.pdf`);
    } catch (error) {
      console.error('Failed to export attendance data', error);
    }
  };

  const handleExport = () => {
    if (exportType === 'excel') {
      exportToExcel();
    } else {
      exportToPDF();
    }
    setShowExportDialog(false);
  };



  const fetchAttendanceRecords = async () => {
    try {
      setIsAttendanceLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/masters/attendance/?start_date=${selectedDate}&end_date=${selectedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        setAttendanceRecords(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch attendance records', error);
    } finally {
      setIsAttendanceLoading(false);
    }
  };



  useEffect(() => {
    fetchAttendanceRecords();
  }, [selectedDate]);

  // Mirrors the Students page: only treat the very first load as "loading" — subsequent
  // searches/filter changes just refresh the list in place without a full-page flicker.
  useEffect(() => {
    if (!loading) setHasLoadedOnce(true);
  }, [loading]);

  // Mirrors the Students page: keep the search input focused (and cursor position) across
  // the re-renders a debounced search triggers, so typing never gets interrupted.
  useEffect(() => {
    if (loading || !wasSearchFocusedRef.current || !searchInputRef.current) return;
    const input = searchInputRef.current;
    requestAnimationFrame(() => {
      if (document.activeElement !== input) {
        input.focus();
        const end = input.value.length;
        input.setSelectionRange(end, end);
      }
    });
  }, [loading, searchTerm]);

  // Close the cascade-filter dropdown when clicking outside it.
  useEffect(() => {
    const handleClickOutsideFilters = (event) => {
      if (showFilters && !event.target.closest('.filter-container')) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideFilters);
    return () => document.removeEventListener('mousedown', handleClickOutsideFilters);
  }, [showFilters]);

  const handleRefresh = () => {
    refreshStudents();
    refreshSearch();
  };

  const sameId = (a, b) => a != null && b != null && String(a) === String(b);

  const getRecordStudentId = (record) => {
    const student = record?.student;
    if (student == null) return null;
    return typeof student === 'object' ? student.id : student;
  };

  const findAttendanceRecord = (studentId) =>
    attendanceRecords.find((record) => sameId(getRecordStudentId(record), studentId));

  const getAttendanceStatus = (studentId) => {
    if (isAttendanceLoading) {
      return 'loading';
    }
    const record = findAttendanceRecord(studentId);
    if (!record) return 'none';
    return record.is_present ? 'present' : 'absent';
  };

  const isApiSuccess = (response) => {
    if (!response || response.status < 200 || response.status >= 300) return false;
    const status = response.data?.status;
    if (status === 'error' || status === 'fail' || status === 'failed') return false;
    return true;
  };

  const getAttendanceAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  };

  const upsertAttendance = async (studentId, isPresent) => {
    const headers = getAttendanceAuthHeaders();
    const payload = {
      student_id: studentId,
      date: selectedDate,
      is_present: isPresent,
    };
    const existing = findAttendanceRecord(studentId);

    if (existing?.id) {
      const url = `${API_BASE_URL}/masters/attendance/${existing.id}/`;
      try {
        return await axios.put(url, payload, { headers });
      } catch (error) {
        if (error.response?.status === 404) {
          return axios.post(`${API_BASE_URL}/masters/attendance/`, payload, { headers });
        }
        if (error.response?.status === 405) {
          return axios.patch(url, { date: selectedDate, is_present: isPresent }, { headers });
        }
        throw error;
      }
    }

    return axios.post(`${API_BASE_URL}/masters/attendance/`, payload, { headers });
  };

  const applyOptimisticAttendance = (student, isPresent, recordId) => {
    setAttendanceRecords((prev) => {
      const idx = prev.findIndex((record) => sameId(getRecordStudentId(record), student.id));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], is_present: isPresent };
        return next;
      }
      return [
        ...prev,
        {
          id: recordId,
          student: { id: student.id, name: student.name },
          date: selectedDate,
          is_present: isPresent,
        },
      ];
    });
  };

  const getApiErrorMessage = (error, fallback) => {
    const data = error.response?.data;
    if (!data) return error.message || fallback;
    if (typeof data === 'string') return data;
    if (data.message) return data.message;
    if (data.detail) return typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
    if (data.error) return data.error;
    const fieldErrors = Object.entries(data)
      .filter(([, value]) => Array.isArray(value) || typeof value === 'string')
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`);
    if (fieldErrors.length) return fieldErrors.join('\n');
    return error.message || fallback;
  };

  // Calculate attendance counts for mobile view
  const getAttendanceCounts = () => {
    const presentCount = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'present').length;
    const absentCount = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'absent').length;
    const unmarkedCount = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'none').length;

    return { presentCount, absentCount, unmarkedCount };
  };

  // Unmarked students visible on the current (search/filtered) page.
  const getUnmarkedOnPage = () =>
    filteredStudents.filter((student) => getAttendanceStatus(student.id) === 'none');

  // The bulk endpoint resolves the whole filtered roster server-side (every page, not just the
  // ~20 rows loaded here), so whether the action is worth offering can't be read off this page's
  // unmarked count alone — only a search narrows the scope to what's actually on screen.
  const canMarkRemaining = () => {
    if (isAttendanceLoading || filteredStudents.length === 0) return false;
    if (searchTerm.trim()) return getUnmarkedOnPage().length > 0;
    return true;
  };

  // A free-text search can't be expressed via the bulk endpoint's filter ids, so when one is
  // active we fall back to an explicit student_ids roster scoped to this page's search results.
  // Otherwise we hand the server the cascade filter ids so it can resolve the *entire* matching
  // roster (every page), not just the 20 rows currently loaded client-side.
  const buildMarkAllPresentPayload = () => {
    const payload = {
      date: selectedDate,
      overwrite: false,
    };

    if (selectedAcademicYear?.id) {
      payload.academic_year_id = selectedAcademicYear.id;
    }

    if (searchTerm.trim()) {
      payload.student_ids = getUnmarkedOnPage().map((student) => student.id);
    } else {
      if (cascadeFilters.classNameId) payload.class_name_id = cascadeFilters.classNameId;
      if (cascadeFilters.sectionId) payload.section_id = cascadeFilters.sectionId;
      if (cascadeFilters.batchId) payload.batch_id = cascadeFilters.batchId;
      if (cascadeFilters.groupId) payload.group_id = cascadeFilters.groupId;
    }

    return payload;
  };

  // Describe the active scope in plain language for the confirmation modal.
  const getMarkScopeDescription = () => {
    if (searchTerm.trim()) {
      return `students matching "${searchTerm.trim()}"`;
    }

    const parts = [];
    if (cascadeFilters.classNameId) {
      const cls = filterOptions.classes.find((c) => sameId(c.id, cascadeFilters.classNameId));
      parts.push(`Class ${cls?.name || cascadeFilters.classNameId}`);
    }
    if (cascadeFilters.groupId) {
      const grp = filterOptions.groups.find((g) => sameId(g.id, cascadeFilters.groupId));
      parts.push(`Group ${grp?.name || cascadeFilters.groupId}`);
    }
    if (cascadeFilters.sectionId) {
      const sec = filterOptions.sections.find((s) => sameId(s.id, cascadeFilters.sectionId));
      parts.push(`Section ${sec?.name || cascadeFilters.sectionId}`);
    }
    if (cascadeFilters.batchId) {
      const batch = filterOptions.batches.find((b) => sameId(b.id, cascadeFilters.batchId));
      parts.push(`Batch ${batch?.name || cascadeFilters.batchId}`);
    }

    return parts.length ? parts.join(', ') : 'all students';
  };

  // Best-effort extraction of counts from the bulk endpoint's response — field names aren't
  // guaranteed, so probe the common shapes rather than assuming one.
  const summarizeMarkAllPresentResponse = (raw) => {
    const data = raw?.data ?? raw;
    if (!data || typeof data !== 'object') return null;

    const marked =
      data.marked_count ?? data.marked ?? data.present_count ??
      data.created_count ?? data.updated_count ?? data.success_count ??
      (Array.isArray(data.marked_students) ? data.marked_students.length : undefined);
    const skipped =
      data.skipped_count ?? data.skipped ?? data.already_marked_count ??
      (Array.isArray(data.skipped_students) ? data.skipped_students.length : undefined);
    const failed =
      data.failed_count ?? data.failed ??
      (Array.isArray(data.errors) ? data.errors.length : undefined) ??
      (Array.isArray(data.failed_students) ? data.failed_students.length : undefined);

    if (marked === undefined && skipped === undefined && failed === undefined) return null;
    return { marked, skipped, failed };
  };

  // Opens the confirmation modal; the actual API call happens in confirmMarkRemainingAsPresent.
  const handleMarkRemainingAsPresent = () => {
    if (!canMarkRemaining()) return;
    setShowMarkConfirmModal(true);
  };

  const confirmMarkRemainingAsPresent = async () => {
    try {
      setIsMarkingRemaining(true);
      const headers = getAttendanceAuthHeaders();
      const payload = buildMarkAllPresentPayload();

      const response = await axios.post(
        `${API_BASE_URL}/masters/attendance/mark-all-present/`,
        payload,
        { headers }
      );

      if (!isApiSuccess(response)) {
        throw new Error(response?.data?.message || 'Failed to mark remaining students as present');
      }

      setShowMarkConfirmModal(false);
      await fetchAttendanceRecords();
      refreshStudents();

      const summary = summarizeMarkAllPresentResponse(response.data);
      if (summary) {
        const parts = [];
        if (summary.marked !== undefined) {
          parts.push(`${summary.marked} student${summary.marked === 1 ? '' : 's'} marked present`);
        }
        if (summary.skipped) {
          parts.push(`${summary.skipped} already had attendance recorded`);
        }
        if (summary.failed) {
          parts.push(`${summary.failed} failed`);
        }
        alert(parts.length ? parts.join('\n') : 'Remaining students marked as present successfully.');
      } else {
        alert('Remaining students marked as present successfully.');
      }
    } catch (error) {
      console.error('Failed to mark remaining students as present', error);
      alert(getApiErrorMessage(error, 'Failed to mark remaining students as present. Please try again.'));
    } finally {
      setIsMarkingRemaining(false);
    }
  };

  const closeEditModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setSelectedStudent(null);
    setSelectedAttendance(null);
    setInitialAttendance(null);
    setSelectedAttendanceId(null);
    setSaveError('');
  };

  const handleEditAttendance = (student) => {
    if (!student?.id) return;
    const currentAttendance = getAttendanceStatus(student.id);
    if (currentAttendance === 'loading') return;

    const attendanceRecord = findAttendanceRecord(student.id);
    const status = currentAttendance === 'none' ? 'present' : currentAttendance;

    setSelectedStudent(student);
    setSelectedAttendance(status);
    setInitialAttendance(currentAttendance === 'none' ? null : currentAttendance);
    setSelectedAttendanceId(attendanceRecord?.id ?? null);
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleSaveAttendance = async () => {
    if (!selectedStudent || (selectedAttendance !== 'present' && selectedAttendance !== 'absent')) {
      return;
    }

    if (selectedAttendance === initialAttendance) {
      closeEditModal();
      return;
    }

    try {
      setIsSaving(true);
      setSaveError('');
      const isPresent = selectedAttendance === 'present';
      const response = await upsertAttendance(selectedStudent.id, isPresent);

      if (!isApiSuccess(response)) {
        throw new Error(response?.data?.message || 'Failed to save attendance');
      }

      const savedId = response.data?.data?.id || response.data?.id || selectedAttendanceId;
      applyOptimisticAttendance(selectedStudent, isPresent, savedId);
      setIsModalOpen(false);
      setSelectedStudent(null);
      setSelectedAttendance(null);
      setInitialAttendance(null);
      setSelectedAttendanceId(null);
      setSaveError('');
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Failed to save attendance', error);
      setSaveError(getApiErrorMessage(error, 'Failed to save attendance. Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDirectAttendance = async (studentId, isPresent) => {
    try {
      setUpdatingStudentId(studentId);
      const response = await upsertAttendance(studentId, isPresent);

      if (!isApiSuccess(response)) {
        throw new Error(response?.data?.message || 'Failed to mark attendance');
      }

      const student = searchedStudents.find((s) => sameId(s.id, studentId));
      const savedId = response.data?.data?.id || response.data?.id;
      if (student) {
        applyOptimisticAttendance(student, isPresent, savedId);
      }
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Failed to mark attendance', error);
      alert(getApiErrorMessage(error, 'Failed to mark attendance. Please try again.'));
    } finally {
      setUpdatingStudentId(null);
    }
  };

  const filteredStudents = searchedStudents;

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Chip-style toggle: clicking an already-active option clears it, same as the Students page.
  const toggleCascadeFilter = (key, value) => {
    setFilter(key, cascadeFilters[key] === value ? '' : value);
  };

  const getActiveFiltersCount = () => {
    let cnt = 0;
    if (searchTerm.trim()) cnt++;
    if (cascadeFilters.batchId) cnt++;
    if (cascadeFilters.classNameId) cnt++;
    if (cascadeFilters.groupId) cnt++;
    if (cascadeFilters.sectionId) cnt++;
    return cnt;
  };

  const clearAllFilters = () => {
    clearFilters();
  };

  const getAvatarColor = (name) => {
    return 'var(--color-primary)';
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - tableRef.current.offsetLeft);
    setScrollLeft(tableRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tableRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    tableRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const role = resolveRole();
    const inchargeOnly = role === ROLES.INCHARGE;
    setIsInchargeOnly(inchargeOnly);

    // If user is incharge, set date to today and disable date changes
    if (inchargeOnly) {
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    }
  }, []);

  useEffect(() => {
    // Generate quick date options (today, yesterday, last 7 days)
    const dates = [];
    const today = new Date();

    // Today
    dates.push({
      label: 'Today',
      value: today.toISOString().split('T')[0]
    });

    // Yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    dates.push({
      label: 'Yesterday',
      value: yesterday.toISOString().split('T')[0]
    });

    // Last 7 days
    for (let i = 2; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        value: date.toISOString().split('T')[0]
      });
    }

    setQuickDates(dates);
  }, []);

  // Handle escape key for date picker modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showDatePickerModal) {
        closeDatePickerModal();
      }
    };

    if (showDatePickerModal) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showDatePickerModal]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleDateSelect = async (date) => {
    setIsDateChanging(true);
    setSelectedDate(date);
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsDateChanging(false);
  };

  // Enhanced mobile date picker functions
  const openDatePickerModal = () => {
    setTempSelectedDate(selectedDate);
    setShowDatePickerModal(true);
  };

  const closeDatePickerModal = () => {
    setShowDatePickerModal(false);
    setTempSelectedDate('');
  };

  const confirmDateSelection = async () => {
    if (tempSelectedDate) {
      await handleDateSelect(tempSelectedDate);
    }
    closeDatePickerModal();
  };

  // Handle keyboard events for date picker modal
  const handleDatePickerKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeDatePickerModal();
    } else if (e.key === 'Enter' && tempSelectedDate) {
      confirmDateSelection();
    }
  };

  // Detect mobile browser and provide appropriate date picker
  const isMobileBrowser = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  const isAndroid = () => {
    return /Android/.test(navigator.userAgent);
  };

  // Handle native date picker with fallback
  const handleNativeDatePicker = () => {
    if (isMobileBrowser()) {
      // For mobile browsers, use the modal approach for better UX
      openDatePickerModal();
    } else {
      // For desktop, use native date picker
      const input = document.createElement('input');
      input.type = 'date';
      input.value = selectedDate;
      input.style.position = 'absolute';
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      document.body.appendChild(input);
      input.focus();
      input.click();
      input.onchange = (e) => {
        handleDateSelect(e.target.value);
        document.body.removeChild(input);
      };
      input.onblur = () => {
        document.body.removeChild(input);
      };
    }
  };

  // Enhanced date picker with multiple fallback strategies
  const handleAdvancedDatePicker = () => {
    // Strategy 1: Try native date picker first
    if (isMobileBrowser()) {
      // For iOS Safari, try native first
      if (isIOS()) {
        try {
          const input = document.createElement('input');
          input.type = 'date';
          input.value = selectedDate;
          input.style.position = 'fixed';
          input.style.top = '-100px';
          input.style.left = '0';
          input.style.width = '100%';
          input.style.height = '100%';
          input.style.opacity = '0';
          input.style.zIndex = '9999';
          document.body.appendChild(input);

          // Try to focus and show picker
          input.focus();

          // Set up event handlers
          const handleChange = (e) => {
            if (e.target.value) {
              handleDateSelect(e.target.value);
            }
            cleanup();
          };

          const handleBlur = () => {
            setTimeout(() => {
              if (!input.value) {
                // If no date was selected, fall back to modal
                openDatePickerModal();
              }
              cleanup();
            }, 100);
          };

          const cleanup = () => {
            input.removeEventListener('change', handleChange);
            input.removeEventListener('blur', handleBlur);
            document.body.removeChild(input);
          };

          input.addEventListener('change', handleChange);
          input.addEventListener('blur', handleBlur);

          // Try to trigger the picker
          input.click();

          // Fallback timeout
          setTimeout(() => {
            if (document.body.contains(input)) {
              cleanup();
              openDatePickerModal();
            }
          }, 1000);

        } catch (error) {
          console.log('Native date picker failed, using modal fallback');
          openDatePickerModal();
        }
      } else {
        // For Android and other mobile browsers, use modal
        openDatePickerModal();
      }
    } else {
      // Desktop - use native picker
      const input = document.createElement('input');
      input.type = 'date';
      input.value = selectedDate;
      input.style.position = 'absolute';
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      document.body.appendChild(input);
      input.focus();
      input.click();
      input.onchange = (e) => {
        handleDateSelect(e.target.value);
        document.body.removeChild(input);
      };
      input.onblur = () => {
        document.body.removeChild(input);
      };
    }
  };

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && !isSaving) {
        closeEditModal();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isModalOpen, isSaving]);

  const formattedAttendanceDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const hasAttendanceChange = Boolean(selectedAttendance) && selectedAttendance !== initialAttendance;

  const renderEditModal = () => {
    if (!isModalOpen) return null;

    return (
      <ModalOverlay onClick={closeEditModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Edit Attendance</ModalTitle>
            <CloseButton type="button" onClick={closeEditModal} aria-label="Close">
              <FiX />
            </CloseButton>
          </ModalHeader>

          <ModalStudentInfo>
            <ModalStudentName>{selectedStudent?.name}</ModalStudentName>
            <ModalStudentDetails>
              {selectedStudent?.admission_no} • {selectedStudent?.class_name?.name || 'N/A'} {selectedStudent?.section?.name || ''}
            </ModalStudentDetails>
            <ModalDate>{formattedAttendanceDate}</ModalDate>
          </ModalStudentInfo>

          {saveError && <ModalError>{saveError}</ModalError>}

          <AttendanceOptions>
            <AttendanceButton
              type="button"
              selected={selectedAttendance === 'present'}
              onClick={() => setSelectedAttendance('present')}
              disabled={isSaving}
            >
              <span>Present</span>
            </AttendanceButton>
            <AttendanceButton
              type="button"
              selected={selectedAttendance === 'absent'}
              onClick={() => setSelectedAttendance('absent')}
              disabled={isSaving}
            >
              <span>Absent</span>
            </AttendanceButton>
          </AttendanceOptions>

          <SaveButton
            type="button"
            onClick={handleSaveAttendance}
            disabled={isSaving || !hasAttendanceChange}
          >
            {isSaving ? 'Saving...' : hasAttendanceChange ? 'Save Attendance' : 'No changes'}
          </SaveButton>
        </ModalContent>
      </ModalOverlay>
    );
  };

  const renderMarkConfirmModal = () => {
    if (!showMarkConfirmModal) return null;

    const hasSearchTerm = Boolean(searchTerm.trim());
    const unmarkedOnPage = getUnmarkedOnPage().length;
    const scopeDescription = getMarkScopeDescription();

    return (
      <ModalOverlay onClick={() => !isMarkingRemaining && setShowMarkConfirmModal(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Mark Remaining as Present</ModalTitle>
            <CloseButton
              type="button"
              onClick={() => setShowMarkConfirmModal(false)}
              disabled={isMarkingRemaining}
              aria-label="Close"
            >
              <FiX />
            </CloseButton>
          </ModalHeader>

          <ModalStudentInfo>
            <ModalScopeText>
              Every currently unmarked student in <strong>{scopeDescription}</strong> will be marked{' '}
              <strong>Present</strong> for <strong>{formattedAttendanceDate}</strong>
              {hasSearchTerm ? '' : ', across every page'}. Students who already have attendance
              recorded are left untouched.
            </ModalScopeText>
            {hasSearchTerm && (
              <ModalScopeText>
                {unmarkedOnPage} unmarked student{unmarkedOnPage === 1 ? '' : 's'} match this search.
              </ModalScopeText>
            )}
          </ModalStudentInfo>

          <ModalButtonRow>
            <SecondaryButton
              type="button"
              onClick={() => setShowMarkConfirmModal(false)}
              disabled={isMarkingRemaining}
            >
              Cancel
            </SecondaryButton>
            <SaveButton
              type="button"
              onClick={confirmMarkRemainingAsPresent}
              disabled={isMarkingRemaining}
            >
              {isMarkingRemaining ? 'Marking...' : 'Confirm'}
            </SaveButton>
          </ModalButtonRow>
        </ModalContent>
      </ModalOverlay>
    );
  };

  // Single search + filter bar shared verbatim by mobile and desktop, matching the Students
  // page's pattern exactly: one pill search box, one Filter button with an active-count badge
  // that opens a chip-based dropdown (Academic Year / Batch / Class / Group / Section).
  const renderSearchFilterBar = () => {
    const activeFiltersCount = getActiveFiltersCount();

    return (
      <CFSearchFilterBar>
        <CFSearchBar>
          <FiSearch />
          <CFSearchInput
            ref={searchInputRef}
            type="search"
            placeholder={getSearchPlaceholder('Search students')}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => { wasSearchFocusedRef.current = true; }}
            onBlur={() => { wasSearchFocusedRef.current = false; }}
            autoComplete="off"
            enterKeyHint="search"
          />
        </CFSearchBar>

        <CFFilterContainer className="filter-container">
          <CFFilterButton
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            $active={showFilters}
            aria-label="Toggle filters"
          >
            <FiFilter />
            <span className="filter-label">Filter</span>
            {activeFiltersCount > 0 && <CFFilterBadge>{activeFiltersCount}</CFFilterBadge>}
            {showFilters ? <FiChevronUp className="chevron-icon" /> : <FiChevronDown className="chevron-icon" />}
          </CFFilterButton>

          {showFilters && (
            <CFFilterDropdown>
              <CFFilterDropdownHeader>
                <CFFilterDropdownTitle>Filters</CFFilterDropdownTitle>
                <CFDropdownCloseButton type="button" onClick={() => setShowFilters(false)} aria-label="Close filters">
                  <FiX />
                </CFDropdownCloseButton>
              </CFFilterDropdownHeader>

              <CFFilterSection>
                <CFFilterSectionTitle>Academic Year</CFFilterSectionTitle>
                <CFFilterOptions>
                  {academicYears
                    .filter((ay) => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                    .map((ay) => (
                      <CFFilterOption
                        key={ay.id}
                        type="button"
                        $active={sameId(selectedAcademicYear?.id, ay.id)}
                        onClick={() => setSelectedAcademicYearId(ay.id)}
                      >
                        {ay.name.split('-')[0]}
                      </CFFilterOption>
                    ))}
                </CFFilterOptions>
              </CFFilterSection>

              <CFFilterSection>
                <CFFilterSectionTitle>Batch</CFFilterSectionTitle>
                <CFFilterOptions>
                  {filterOptions.batches.map((batch) => (
                    <CFFilterOption
                      key={batch.id}
                      type="button"
                      $active={cascadeFilters.batchId === String(batch.id)}
                      onClick={() => toggleCascadeFilter('batchId', String(batch.id))}
                    >
                      {batch.name}
                    </CFFilterOption>
                  ))}
                </CFFilterOptions>
              </CFFilterSection>

              <CFFilterSection>
                <CFFilterSectionTitle>Class</CFFilterSectionTitle>
                <CFFilterOptions>
                  {filterOptions.classes.map((cls) => (
                    <CFFilterOption
                      key={cls.id}
                      type="button"
                      $active={cascadeFilters.classNameId === String(cls.id)}
                      onClick={() => toggleCascadeFilter('classNameId', String(cls.id))}
                      disabled={!cascadeFilters.batchId}
                    >
                      {cls.name}
                    </CFFilterOption>
                  ))}
                </CFFilterOptions>
              </CFFilterSection>

              <CFFilterSection>
                <CFFilterSectionTitle>Group</CFFilterSectionTitle>
                <CFFilterOptions>
                  {filterOptions.groups.map((grp) => (
                    <CFFilterOption
                      key={grp.id}
                      type="button"
                      $active={cascadeFilters.groupId === String(grp.id)}
                      onClick={() => toggleCascadeFilter('groupId', String(grp.id))}
                      disabled={!cascadeFilters.classNameId}
                    >
                      {grp.name}
                    </CFFilterOption>
                  ))}
                </CFFilterOptions>
              </CFFilterSection>

              <CFFilterSection>
                <CFFilterSectionTitle>Section</CFFilterSectionTitle>
                <CFFilterOptions>
                  {filterOptions.sections.map((sec) => (
                    <CFFilterOption
                      key={sec.id}
                      type="button"
                      $active={cascadeFilters.sectionId === String(sec.id)}
                      onClick={() => toggleCascadeFilter('sectionId', String(sec.id))}
                      disabled={!cascadeFilters.groupId}
                    >
                      {sec.name}
                    </CFFilterOption>
                  ))}
                </CFFilterOptions>
              </CFFilterSection>

              <CFFilterActions>
                <CFActionButton type="button" onClick={clearAllFilters}>
                  Clear All
                </CFActionButton>
                <CFActionButton type="button" $primary onClick={() => setShowFilters(false)}>
                  Apply Filters
                </CFActionButton>
              </CFFilterActions>
            </CFFilterDropdown>
          )}
        </CFFilterContainer>
      </CFSearchFilterBar>
    );
  };

  const renderFilterSummary = () => {
    const activeFiltersCount = getActiveFiltersCount();
    if (activeFiltersCount === 0) return null;

    return (
      <CFFilterSummary>
        <span>Active filters: {activeFiltersCount}</span>
        <CFClearFiltersButton type="button" onClick={clearAllFilters}>
          Clear all
        </CFClearFiltersButton>
      </CFFilterSummary>
    );
  };

  if (isMobileView) {
    const filteredStudentsByStatus = filteredStudents.filter(student => {
      if (selectedFilter === 'all') return true;
      const status = getAttendanceStatus(student.id);
      return selectedFilter === status;
    });

    const { presentCount, absentCount, unmarkedCount } = getAttendanceCounts();
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const twoDaysAgoStr = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Mirrors the Students page: only the very first load blocks the screen; a search refinement
    // just quietly refreshes the list, and an empty result while still in-flight doesn't flash.
    const showInitialPageLoading = loading && !isRefreshing && !hasLoadedOnce;
    const showInlineSearchLoading = loading && hasLoadedOnce && !isRefreshing && !isSearchTypingHint;

    return (
      <>
      <MobileContainer>
        <MobileHeader>
          {renderSearchFilterBar()}
          {renderFilterSummary()}

          {!isInchargeOnly && (
            <MobileDateSelector>
              <MobileDateButton
                active={selectedDate === todayStr}
                onClick={() => handleDateSelect(todayStr)}
                disabled={isDateChanging}
              >
                Today
              </MobileDateButton>
              <MobileDateButtonWrapper>
                <MobileDateButton
                  $pickDate
                  active={false}
                  disabled={isDateChanging}
                  onClick={handleAdvancedDatePicker}
                >
                  Pick Date
                </MobileDateButton>
                <MobileDateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                  min="2020-01-01"
                  max="2030-12-31"
                />
              </MobileDateButtonWrapper>
              <MobileDateButton
                active={selectedDate === yesterdayStr}
                onClick={() => handleDateSelect(yesterdayStr)}
                disabled={isDateChanging}
              >
                Yesterday
              </MobileDateButton>
              <MobileDateButton
                active={selectedDate === twoDaysAgoStr}
                onClick={() => handleDateSelect(twoDaysAgoStr)}
                disabled={isDateChanging}
              >
                2 Days Ago
              </MobileDateButton>
            </MobileDateSelector>
          )}

          {!isInchargeOnly && (
            <CurrentDateDisplay>
              {isDateChanging ? (
                <>
                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px', flexShrink: 0 }} />
                  Changing Date...
                </>
              ) : (
                formattedSelectedDate
              )}
            </CurrentDateDisplay>
          )}

          <AttendanceSummary>
            <SummaryText>Attendance Summary</SummaryText>
            <SummaryCounts>
              <PresentCard>
                <CountLabel>Present</CountLabel>
                <PresentNumber>{presentCount}</PresentNumber>
              </PresentCard>
              <AbsentCard>
                <CountLabel>Absent</CountLabel>
                <AbsentNumber>{absentCount}</AbsentNumber>
              </AbsentCard>
              <UnmarkedCard>
                <CountLabel>Unmarked</CountLabel>
                <UnmarkedNumber>{unmarkedCount}</UnmarkedNumber>
              </UnmarkedCard>
            </SummaryCounts>
          </AttendanceSummary>

          <MobileQuickFilters>
            <MobileQuickFilterChip
              $active={selectedFilter === 'all'}
              onClick={() => handleFilterChange('all')}
            >
              All
            </MobileQuickFilterChip>
            <MobileQuickFilterChip
              $active={selectedFilter === 'present'}
              onClick={() => handleFilterChange('present')}
            >
              Present
            </MobileQuickFilterChip>
            <MobileQuickFilterChip
              $active={selectedFilter === 'absent'}
              onClick={() => handleFilterChange('absent')}
            >
              Absent
            </MobileQuickFilterChip>
            <MobileQuickFilterChip
              $active={selectedFilter === 'none'}
              onClick={() => handleFilterChange('none')}
            >
              Unmarked
            </MobileQuickFilterChip>
          </MobileQuickFilters>
          {canMarkRemaining() && (
            <PresentRemainingButton
              onClick={handleMarkRemainingAsPresent}
              disabled={isMarkingRemaining}
            >
              {isMarkingRemaining ? (
                <>
                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  Marking as Present...
                </>
              ) : (
                <>
                  <FiCheck size={20} />
                  Mark Remaining as Present
                </>
              )}
            </PresentRemainingButton>
          )}
        </MobileHeader>

        {isRefreshing || isAttendanceLoading || showInitialPageLoading ? (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Loading attendance...</LoadingText>
          </LoadingContainer>
        ) : filteredStudentsByStatus.length === 0 && !showInlineSearchLoading ? (
          <EmptyState>
            <h3>{isSearchTypingHint ? 'Keep typing to search' : 'No students found'}</h3>
            <p>{isSearchTypingHint ? searchHint : 'Try adjusting your search or filters'}</p>
          </EmptyState>
        ) : (
          <MobileCardsContainer>
            {filteredStudentsByStatus.map(student => (
              <MobileStudentCard key={student.id}>
                <CardHeader>
                  <StudentAvatar>
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} />
                    ) : (
                      student.name.charAt(0).toUpperCase()
                    )}
                  </StudentAvatar>
                </CardHeader>
                <CardBody>
                  <MobileStudentName>{student.name}</MobileStudentName>
                  <MobileStudentInfo>
                    <strong>Admission No:</strong> {student.admission_no}
                  </MobileStudentInfo>
                  <MobileStudentInfo>
                    <strong>Class:</strong> {student.class_name?.name || 'N/A'} {student.section?.name}
                  </MobileStudentInfo>

                  <Divider />

                  {getAttendanceStatus(student.id) === 'loading' ? (
                    <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px', margin: '0 auto' }} />
                  ) : getAttendanceStatus(student.id) === 'none' ? (
                    <MobileAttendanceButtons>
                      <MobileAttendanceButton
                        type="button"
                        selected={getAttendanceStatus(student.id) === 'absent'}
                        onClick={() => handleDirectAttendance(student.id, false)}
                        disabled={updatingStudentId === student.id}
                      >
                        {updatingStudentId === student.id ? (
                          <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        ) : (
                          <>
                            <FiX size={18} />
                            Mark Absent
                          </>
                        )}
                      </MobileAttendanceButton>
                    </MobileAttendanceButtons>
                  ) : (
                    <>
                      <MobileStatusBadge $status={getAttendanceStatus(student.id)}>
                        {getAttendanceStatus(student.id).charAt(0).toUpperCase() + getAttendanceStatus(student.id).slice(1)}
                      </MobileStatusBadge>
                      <MobileAttendanceButtons>
                        <MobileAttendanceButton
                          type="button"
                          onClick={() => handleEditAttendance(student)}
                        >
                          <FiEdit2 size={18} />
                          Edit Attendance
                        </MobileAttendanceButton>
                      </MobileAttendanceButtons>
                    </>
                  )}
                </CardBody>
              </MobileStudentCard>
            ))}
          </MobileCardsContainer>
        )}

        {/* Enhanced Date Picker Modal */}
        {showDatePickerModal && (
          <DatePickerModal onClick={closeDatePickerModal}>
            <DatePickerContent
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleDatePickerKeyDown}
              tabIndex={-1}
            >
              <DatePickerTitle>Select Date</DatePickerTitle>
              <DatePickerInput
                type="date"
                value={tempSelectedDate}
                onChange={(e) => setTempSelectedDate(e.target.value)}
                min="2020-01-01"
                max="2030-12-31"
                autoFocus
                aria-label="Select date for attendance"
              />
              <DatePickerActions>
                <DatePickerButton
                  onClick={closeDatePickerModal}
                  aria-label="Cancel date selection"
                >
                  Cancel
                </DatePickerButton>
                <DatePickerButton
                  primary
                  onClick={confirmDateSelection}
                  disabled={!tempSelectedDate}
                  aria-label="Confirm selected date"
                >
                  Select Date
                </DatePickerButton>
              </DatePickerActions>
            </DatePickerContent>
          </DatePickerModal>
        )}
      </MobileContainer>
      {renderEditModal()}
      {renderMarkConfirmModal()}
      </>
    );
  }

  if (error) {
    return (
      <Container>
        <TopBar>
          {renderSearchFilterBar()}
        </TopBar>
        <ErrorMessage>
          <FiX size={20} />
          {error}
          <RetryButton onClick={handleRefresh}>
            <FiRefreshCw size={16} />
            Retry
          </RetryButton>
        </ErrorMessage>
      </Container>
    );
  }

  if (loading && !isRefreshing && !hasLoadedOnce) {
    return (
      <Container>
        <TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {renderSearchFilterBar()}
            {!isInchargeOnly && (
              <DateSelector>
                <DateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </DateSelector>
            )}
          </div>
          {!isInchargeOnly && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <CircleIconContainer onClick={() => setShowExportDialog(true)}>
                <FiDownload size={20} strokeWidth={1.3} />
              </CircleIconContainer>
            </div>
          )}
        </TopBar>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading students...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  // Mirrors the Students page: once the list has loaded once, a search refinement just
  // refreshes it quietly — an empty result while still in-flight doesn't flash "no students".
  const showInlineSearchLoading = loading && hasLoadedOnce && !isRefreshing && !isSearchTypingHint;

  return (
    <Container>
      {/* isMobileView is always false here — the true case returns earlier in this component. */}
        <>
          <TopBar>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              {renderSearchFilterBar()}

              {!isInchargeOnly && (
                <DateSelector>
                  <DateInput
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </DateSelector>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {canMarkRemaining() && (
                <PresentRemainingButton
                  onClick={handleMarkRemainingAsPresent}
                  disabled={isMarkingRemaining}
                >
                  {isMarkingRemaining ? (
                    <>
                      <Spinner style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                      Marking as Present...
                    </>
                  ) : (
                    <>
                      <FiCheck size={16} />
                      Mark Remaining Present
                    </>
                  )}
                </PresentRemainingButton>
              )}
              {!isInchargeOnly && (
                <CircleIconContainer onClick={() => setShowExportDialog(true)}>
                  <FiDownload size={20} strokeWidth={1.3} />
                </CircleIconContainer>
              )}
            </div>
          </TopBar>
          {renderFilterSummary()}

          <TableContainer
            ref={tableRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {isRefreshing || isFilterLoading || isAttendanceLoading ? (
              <div style={{ padding: '20px' }}>
                {[...Array(5)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </div>
            ) : filteredStudents.length === 0 && !showInlineSearchLoading ? (
              <EmptyState>
                <h3>{isSearchTypingHint ? 'Keep typing to search' : 'No students found'}</h3>
                <div>{isSearchTypingHint ? searchHint : 'Try adjusting your search or filters'}</div>
              </EmptyState>
            ) : (
              <DraggableTableWrapper>
                <Table>
                  <thead>
                    <Tr>
                      <Th $leftAlign>Student</Th>
                      <Th>Admission No</Th>
                      <Th>Class</Th>
                      <Th>Section</Th>
                      <Th>Batch</Th>
                      <Th>Attendance</Th>
                      <Th>Edit</Th>
                    </Tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <Tr key={student.id}>
                        <Td $leftAlign>
                          <StudentInfoContainer>
                            {student.photo ? (
                              <img
                                src={student.photo}
                                alt={student.name}
                                style={{
                                  width: '5.7vh',
                                  height: '5.7vh',
                                  borderRadius: '0.7vw',
                                  objectFit: 'cover',
                                  marginRight: '0.8vw'
                                }}
                              />
                            ) : (
                              <Avatar>
                                {student.name.charAt(0).toUpperCase()}
                              </Avatar>
                            )}
                            <StudentDetails>
                              <StudentName>{student.name}</StudentName>
                            </StudentDetails>
                          </StudentInfoContainer>
                        </Td>
                        <Td>{student.admission_no}</Td>
                        <Td>
                          <CombinedClass>
                            {student.class_name?.name || 'N/A'}
                          </CombinedClass>
                        </Td>
                        <Td>{student.section?.name || 'N/A'}</Td>
                        <Td>{student.batch}</Td>
                        <Td>
                          {getAttendanceStatus(student.id) === 'loading' ? (
                            <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px', margin: '0 auto' }} />
                          ) : (
                            <StatusBadge $status={getAttendanceStatus(student.id)}>
                              {getAttendanceStatus(student.id)}
                            </StatusBadge>
                          )}
                        </Td>
                        <Td $isEditColumn>
                          {getAttendanceStatus(student.id) === 'loading' ? (
                            <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                          ) : getAttendanceStatus(student.id) === 'none' ? (
                            <AttendanceButtonsContainer>
                              <AttendanceButton
                                onClick={() => handleDirectAttendance(student.id, true)}
                                disabled={updatingStudentId === student.id}
                              >
                                {updatingStudentId === student.id ? (
                                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                                ) : (
                                  'Present'
                                )}
                              </AttendanceButton>
                              <AttendanceButton
                                onClick={() => handleDirectAttendance(student.id, false)}
                                disabled={updatingStudentId === student.id}
                              >
                                {updatingStudentId === student.id ? (
                                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                                ) : (
                                  'Absent'
                                )}
                              </AttendanceButton>
                            </AttendanceButtonsContainer>
                          ) : (
                            <EditButton
                              type="button"
                              aria-label={`Edit attendance for ${student.name}`}
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={() => handleEditAttendance(student)}
                            >
                              <FiEdit2 size={18} />
                            </EditButton>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              </DraggableTableWrapper>
            )}
          </TableContainer>

          <StudentListPagination
            page={page}
            pageSize={pageSize}
            count={count}
            loading={loading || isAttendanceLoading}
            onPageChange={setPage}
          />
        </>

      {renderEditModal()}
      {renderMarkConfirmModal()}

      <ExportDialog
        open={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <ExportDialogTitle>Export Attendance Data</ExportDialogTitle>
        <ExportDialogContent>
          <DateRangeContainer>
            <DateRangeInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <DateRangeInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </DateRangeContainer>
          <ExportOptions>
            <ExportOption
              isActive={exportType === 'excel'}
              onClick={() => setExportType('excel')}
            >
              Excel
            </ExportOption>
            <ExportOption
              isActive={exportType === 'pdf'}
              onClick={() => setExportType('pdf')}
            >
              PDF
            </ExportOption>
          </ExportOptions>
          <FormGroup>
            {columnOptions.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    checked={selectedColumns[column.id]}
                    onChange={() => handleColumnToggle(column.id)}
                  />
                }
                label={column.label}
              />
            ))}
          </FormGroup>
        </ExportDialogContent>
        <ExportDialogActions>
          <Button onClick={() => setShowExportDialog(false)}>Cancel</Button>
          <Button
            onClick={handleExport}
            variant="contained"
            color="primary"
            disabled={!Object.values(selectedColumns).some(Boolean)}
          >
            Export
          </Button>
        </ExportDialogActions>
      </ExportDialog>
    </Container>
  );
};

export default Attendance; 