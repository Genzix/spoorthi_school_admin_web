import { API_BASE_URL } from '@/config/api';
import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios';
import { FiRefreshCw, FiX, FiEdit2, FiDownload, FiSearch, FiFilter, FiCheck } from 'react-icons/fi';
import searchIcon from '../assets/Search.svg';
import arrowIcon from '../assets/arrow.svg';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useStudents } from '../context/StudentsContext';
import { useAcademicYear } from '../context/AcademicYearContext';
import { useStudentListQuery } from '../hooks/useStudentListQuery';
import StudentListPagination from '../components/StudentListPagination';
import BrandSelect from '../components/BrandSelect';
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

const SearchContainer = styled.div`
  position: relative;
  width: 20vw;
`;

const SearchInput = styled.input`
  padding: 10px 15px 10px 2.4vw;
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #FFFFFF;
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  transition: all 0.3s;
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
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
  &:nth-child(3) { width: 7vw; }  /* Class */
  &:nth-child(4) { width: 7vw; }  /* Group */
  &:nth-child(5) { width: 7vw; }  /* Section */
  &:nth-child(6) { width: 7vw; }  /* Batch */
  &:nth-child(7) { width: 7vw; }   /* Edit */
   &:nth-child(8) { width: 15vw; }   /* Edit */
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
  width: 5.7vh;
  height: 5.7vh;
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

const MobileSearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
`;

const MobileSearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  background: transparent;
`;

const MobileFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileFilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 'var(--color-primary)' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
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
  background: #4CAF50;
  border: none;
  border-radius: 12px;
  color: white;
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
    padding: 0.8vh 1.5vh;
    height: auto;
    min-height: 36px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    background: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    
    &:hover {
      background: #45A049;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
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

const MobileFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MobileFilterLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.2rem;
`;

const MobileFilterSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  width: 100%;
  appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8.825L1.175 4 2.05 3.125 6 7.075 9.95 3.125 10.825 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
`;

const FilterDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
  }
`;

const FilterDialogTitle = styled(DialogTitle)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
`;

const FilterDialogContent = styled(DialogContent)`
  padding: 20px !important;
`;

const FilterButton = styled.button`
  position: fixed;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  right: calc(16px + env(safe-area-inset-right, 0px));
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  border: none;
  color: var(--color-on-primary, #ffffff);
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px var(--color-primary-pulse);
  z-index: 100;
  touch-action: manipulation;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.94);
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    right: calc(12px + env(safe-area-inset-right, 0px));
  }
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
    isBelowMinLength,
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
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [isMarkingRemaining, setIsMarkingRemaining] = useState(false);
  const [isDateChanging, setIsDateChanging] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState('');
  const [markingProgress, setMarkingProgress] = useState({ processed: 0, total: 0, failed: 0 });

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

  const handleRefresh = () => {
    refreshStudents();
    refreshSearch();
  };

  const getAttendanceStatus = (studentId) => {
    if (isAttendanceLoading) {
      return 'loading';
    }
    const record = attendanceRecords.find(record => record.student.id === studentId);
    if (!record) return 'none';
    return record.is_present ? 'present' : 'absent';
  };

  // Calculate attendance counts for mobile view
  const getAttendanceCounts = () => {
    const presentCount = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'present').length;
    const absentCount = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'absent').length;
    const unmarkedCount = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'none').length;

    return { presentCount, absentCount, unmarkedCount };
  };

  // Handle marking remaining students as present with batch processing
  const handleMarkRemainingAsPresent = async () => {
    const unmarkedStudents = filteredStudents.filter(student => getAttendanceStatus(student.id) === 'none');

    if (unmarkedStudents.length === 0) {
      return;
    }

    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to mark ${unmarkedStudents.length} remaining student${unmarkedStudents.length > 1 ? 's' : ''} as present?\n\nThis action cannot be undone.`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setIsMarkingRemaining(true);
      setMarkingProgress({ processed: 0, total: unmarkedStudents.length, failed: 0 });
      const token = localStorage.getItem('token');

      // Batch processing configuration
      const BATCH_SIZE = 25; // Process 10 students at a time
      const BATCH_DELAY = 500; // Wait 500ms between batches to avoid overwhelming the server
      let processed = 0;
      let failed = 0;
      const errors = [];

      // Process students in batches
      for (let i = 0; i < unmarkedStudents.length; i += BATCH_SIZE) {
        const batch = unmarkedStudents.slice(i, i + BATCH_SIZE);

        // Process current batch and track results
        const batchPromises = batch.map(async (student) => {
          try {
            await axios.post(
              `${API_BASE_URL}/masters/attendance/`,
              {
                student_id: student.id,
                date: selectedDate,
                is_present: true
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return { success: true, student };
          } catch (error) {
            console.error(`Failed to mark ${student.name} as present:`, error);
            return { success: false, student, error: error.message };
          }
        });

        // Wait for current batch to complete and update progress
        const results = await Promise.allSettled(batchPromises);

        // Update counters based on results
        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            if (result.value.success) {
              processed++;
            } else {
              failed++;
              errors.push({ student: result.value.student.name, error: result.value.error });
            }
          } else {
            // Handle promise rejection (shouldn't happen but just in case)
            failed++;
            errors.push({ student: 'Unknown', error: result.reason?.message || 'Unknown error' });
          }
        });

        // Update progress state after each batch completes
        setMarkingProgress({ processed, total: unmarkedStudents.length, failed });

        // Add delay before next batch (except for the last batch)
        if (i + BATCH_SIZE < unmarkedStudents.length) {
          await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
      }

      // Refresh attendance records after all batches complete
      await fetchAttendanceRecords();

      // Refresh student details
      refreshStudents();

      // Show success/failure message
      if (failed === 0) {
        alert(`Successfully marked ${processed} student${processed > 1 ? 's' : ''} as present!`);
      } else {
        const message = `Processed ${processed} student${processed > 1 ? 's' : ''} successfully.\n${failed} student${failed > 1 ? 's' : ''} failed to mark.\n\nPlease try again for failed students.`;
        alert(message);
        console.error('Failed students:', errors);
      }

    } catch (error) {
      console.error('Failed to mark remaining students as present', error);
      alert('Failed to mark students as present. Please try again.');
    } finally {
      setIsMarkingRemaining(false);
      setMarkingProgress({ processed: 0, total: 0, failed: 0 });
    }
  };

  const handleEditAttendance = (studentId) => {
    const student = students.find(s => s.id === studentId);
    const currentAttendance = getAttendanceStatus(studentId);
    const attendanceRecord = attendanceRecords.find(record => record.student.id === studentId);
    setSelectedStudent(student);
    setSelectedAttendance(currentAttendance);
    setSelectedAttendanceId(attendanceRecord?.id);
    setIsModalOpen(true);
  };

  const handleSaveAttendance = async () => {
    if (!selectedStudent || !selectedAttendance) return;

    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');

      if (selectedAttendanceId) {
        const response = await axios.put(
          `${API_BASE_URL}/masters/attendance/${selectedAttendanceId}/`,
          {
            student_id: selectedStudent.id,
            date: selectedDate,
            is_present: selectedAttendance === 'present'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 'success') {
          await fetchAttendanceRecords();
          setIsModalOpen(false);
        }
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/masters/attendance/`,
          {
            student_id: selectedStudent.id,
            date: selectedDate,
            is_present: selectedAttendance === 'present'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 'success') {
          await fetchAttendanceRecords();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Failed to save attendance', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDirectAttendance = async (studentId, isPresent) => {
    try {
      setUpdatingStudentId(studentId);
      const token = localStorage.getItem('token');

      // Check if attendance is already marked
      const existingRecord = attendanceRecords.find(record => record.student.id === studentId);

      if (existingRecord) {
        // Update existing record
        const response = await axios.put(
          `${API_BASE_URL}/masters/attendance/${existingRecord.id}/`,
          {
            student_id: studentId,
            date: selectedDate,
            is_present: isPresent
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 'success') {
          await fetchAttendanceRecords();
        }
      } else {
        // Create new record
        const response = await axios.post(
          `${API_BASE_URL}/masters/attendance/`,
          {
            student_id: studentId,
            date: selectedDate,
            is_present: isPresent
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 'success') {
          await fetchAttendanceRecords();
        }
      }
    } catch (error) {
      console.error('Failed to mark attendance', error);
    } finally {
      setUpdatingStudentId(null);
    }
  };

  const filteredStudents = searchedStudents;

  const handleBatchChange = (e) => setFilter('batchId', e.target.value);
  const handleClassChange = (e) => setFilter('classNameId', e.target.value);
  const handleGroupChange = (e) => setFilter('groupId', e.target.value);
  const handleSectionChange = (e) => setFilter('sectionId', e.target.value);

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

    return (
      <MobileContainer>
        <MobileHeader>
          <MobileSearchBar>
            <FiSearch size={20} color="#666" />
            <MobileSearchInput
              type="text"
              placeholder={getSearchPlaceholder('Search students')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </MobileSearchBar>

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
          {unmarkedCount > 0 && (
            <PresentRemainingButton
              onClick={handleMarkRemainingAsPresent}
              disabled={isMarkingRemaining}
            >
              {isMarkingRemaining ? (
                <>
                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  Marking {markingProgress.processed}/{markingProgress.total} as Present...
                  {markingProgress.failed > 0 && ` (${markingProgress.failed} failed)`}
                </>
              ) : (
                <>
                  <FiCheck size={20} />
                  Mark {unmarkedCount} Remaining as Present
                </>
              )}
            </PresentRemainingButton>
          )}
        </MobileHeader>

        {isRefreshing || isAttendanceLoading ? (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Loading attendance...</LoadingText>
          </LoadingContainer>
        ) : filteredStudentsByStatus.length === 0 ? (
          <EmptyState>
            <h3>No students found</h3>
            <p>Try adjusting your search or filters</p>
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
                  ) : getAttendanceStatus(student.id) === 'absent' ? (
                    <MobileAttendanceButtons>
                      <MobileAttendanceButton
                        selected={true}
                        onClick={() => handleDirectAttendance(student.id, true)}
                        disabled={updatingStudentId === student.id}
                      >
                        {updatingStudentId === student.id ? (
                          <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        ) : (
                          <>
                            <FiCheck size={18} />
                            Change to Present
                          </>
                        )}
                      </MobileAttendanceButton>
                    </MobileAttendanceButtons>
                  ) : (
                    <MobileStatusBadge $status={getAttendanceStatus(student.id)}>
                      {getAttendanceStatus(student.id).charAt(0).toUpperCase() + getAttendanceStatus(student.id).slice(1)}
                    </MobileStatusBadge>
                  )}
                </CardBody>
              </MobileStudentCard>
            ))}
          </MobileCardsContainer>
        )}

        <FilterButton onClick={() => setShowFilterDialog(true)}>
          <FiFilter size={24} />
        </FilterButton>

        <FilterDialog
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                overflow: 'visible',
                borderRadius: '12px',
              },
            },
          }}
        >
          <FilterDialogTitle>Filters</FilterDialogTitle>
          <FilterDialogContent>
            <MobileFilterSection>
              <MobileFilterLabel>Year</MobileFilterLabel>
              <BrandSelect
                variant="field"
                aria-label="Academic year"
                placeholder="Year"
                value={String(selectedAcademicYear?.id || '')}
                onChange={(e) => setSelectedAcademicYearId(e.target.value)}
                disabled={isFilterLoading}
                options={academicYears
                  .filter((ay) => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                  .map((ay) => ({
                    value: String(ay.id),
                    label: ay.name.split('-')[0],
                  }))}
              />
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Batch</MobileFilterLabel>
              <BrandSelect
                variant="field"
                aria-label="Batch"
                placeholder="All Batches"
                value={String(cascadeFilters.batchId || '')}
                onChange={handleBatchChange}
                disabled={isFilterLoading}
                options={[
                  { value: '', label: 'All Batches' },
                  ...filterOptions.batches.map((batch) => ({
                    value: String(batch.id),
                    label: batch.name,
                  })),
                ]}
              />
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Class</MobileFilterLabel>
              <BrandSelect
                variant="field"
                aria-label="Class"
                placeholder="All Classes"
                value={String(cascadeFilters.classNameId || '')}
                onChange={handleClassChange}
                disabled={isFilterLoading}
                options={[
                  { value: '', label: 'All Classes' },
                  ...filterOptions.classes.map((cls) => ({
                    value: String(cls.id),
                    label: cls.name,
                  })),
                ]}
              />
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Group</MobileFilterLabel>
              <BrandSelect
                variant="field"
                aria-label="Group"
                placeholder="All Groups"
                value={String(cascadeFilters.groupId || '')}
                onChange={handleGroupChange}
                disabled={!cascadeFilters.classNameId || isFilterLoading}
                options={[
                  { value: '', label: 'All Groups' },
                  ...filterOptions.groups.map((grp) => ({
                    value: String(grp.id),
                    label: grp.name,
                  })),
                ]}
              />
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Section</MobileFilterLabel>
              <BrandSelect
                variant="field"
                aria-label="Section"
                placeholder="All Sections"
                value={String(cascadeFilters.sectionId || '')}
                onChange={handleSectionChange}
                disabled={!cascadeFilters.groupId || isFilterLoading}
                options={[
                  { value: '', label: 'All Sections' },
                  ...filterOptions.sections.map((sec) => ({
                    value: String(sec.id),
                    label: sec.name,
                  })),
                ]}
              />
            </MobileFilterSection>

            <MobileFilterContainer>
              <MobileFilterButton
                active={selectedFilter === 'all'}
                onClick={() => handleFilterChange('all')}
              >
                All
              </MobileFilterButton>
              <MobileFilterButton
                active={selectedFilter === 'present'}
                onClick={() => handleFilterChange('present')}
              >
                Present
              </MobileFilterButton>
              <MobileFilterButton
                active={selectedFilter === 'absent'}
                onClick={() => handleFilterChange('absent')}
              >
                Absent
              </MobileFilterButton>
              <MobileFilterButton
                active={selectedFilter === 'none'}
                onClick={() => handleFilterChange('none')}
              >
                Unmarked
              </MobileFilterButton>
            </MobileFilterContainer>
          </FilterDialogContent>
          <DialogActions>
            <Button onClick={() => setShowFilterDialog(false)}>Close</Button>
          </DialogActions>
        </FilterDialog>

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
    );
  }

  if (error) {
    return (
      <Container>
        <TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <SearchContainer>
              <SearchIcon src={searchIcon} />
              <SearchInput
                type="text"
                placeholder={getSearchPlaceholder('Search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled
              />
            </SearchContainer>
          </div>
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

  if (loading && !isRefreshing) {
    return (
      <Container>
        <TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <SearchContainer>
              <SearchIcon src={searchIcon} />
              <SearchInput
                type="text"
                placeholder={getSearchPlaceholder('Search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled
              />
            </SearchContainer>

            <BrandSelect
              aria-label="Academic year"
              placeholder="Year"
              value={String(selectedAcademicYear?.id || '')}
              onChange={(e) => setSelectedAcademicYearId(e.target.value)}
              options={academicYears
                .filter((ay) => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                .map((ay) => ({
                  value: String(ay.id),
                  label: ay.name.split('-')[0],
                }))}
            />

            {!isInchargeOnly && (
              <DateSelector>
                <DateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </DateSelector>
            )}

            <BrandSelect
              aria-label="Batch"
              placeholder="All Batches"
              value={String(cascadeFilters.batchId || '')}
              onChange={handleBatchChange}
              options={[
                { value: '', label: 'All Batches' },
                ...filterOptions.batches.map((batch) => ({
                  value: String(batch.id),
                  label: batch.name,
                })),
              ]}
            />

            <BrandSelect
              aria-label="Class"
              placeholder="All Classes"
              value={String(cascadeFilters.classNameId || '')}
              onChange={handleClassChange}
              options={[
                { value: '', label: 'All Classes' },
                ...filterOptions.classes.map((cls) => ({
                  value: String(cls.id),
                  label: cls.name,
                })),
              ]}
            />

            <BrandSelect
              aria-label="Group"
              placeholder="All Groups"
              value={String(cascadeFilters.groupId || '')}
              onChange={handleGroupChange}
              disabled={!cascadeFilters.classNameId}
              options={[
                { value: '', label: 'All Groups' },
                ...filterOptions.groups.map((grp) => ({
                  value: String(grp.id),
                  label: grp.name,
                })),
              ]}
            />

            <BrandSelect
              aria-label="Section"
              placeholder="All Sections"
              value={String(cascadeFilters.sectionId || '')}
              onChange={handleSectionChange}
              disabled={!cascadeFilters.groupId}
              options={[
                { value: '', label: 'All Sections' },
                ...filterOptions.sections.map((sec) => ({
                  value: String(sec.id),
                  label: sec.name,
                })),
              ]}
            />
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

  return (
    <Container>
      {isMobileView ? (
        <MobileContainer>
          <MobileHeader>
            <MobileSearchBar>
              <FiSearch size={20} color="#666" />
              <MobileSearchInput
                type="text"
                placeholder={getSearchPlaceholder('Search students')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </MobileSearchBar>
          </MobileHeader>

          {isRefreshing || isAttendanceLoading ? (
            <LoadingContainer>
              <Spinner />
              <LoadingText>Loading attendance...</LoadingText>
            </LoadingContainer>
          ) : filteredStudents.length === 0 ? (
            <EmptyState>
              <h3>{isBelowMinLength ? 'Keep typing to search' : 'No students found'}</h3>
              <p>{isBelowMinLength ? searchHint : 'Try adjusting your search or filters'}</p>
            </EmptyState>
          ) : (
            <MobileCardsContainer>
              {filteredStudents.map(student => (
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
                    ) : getAttendanceStatus(student.id) === 'absent' ? (
                      <MobileAttendanceButtons>
                        <MobileAttendanceButton
                          selected={true}
                          onClick={() => handleDirectAttendance(student.id, true)}
                          disabled={updatingStudentId === student.id}
                        >
                          {updatingStudentId === student.id ? (
                            <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                          ) : (
                            <>
                              <FiCheck size={18} />
                              Change to Present
                            </>
                          )}
                        </MobileAttendanceButton>
                      </MobileAttendanceButtons>
                    ) : (
                      <MobileStatusBadge $status={getAttendanceStatus(student.id)}>
                        {getAttendanceStatus(student.id).charAt(0).toUpperCase() + getAttendanceStatus(student.id).slice(1)}
                      </MobileStatusBadge>
                    )}
                  </CardBody>
                </MobileStudentCard>
              ))}
            </MobileCardsContainer>
          )}

          <StudentListPagination
            page={page}
            pageSize={pageSize}
            count={count}
            loading={loading || isAttendanceLoading}
            onPageChange={setPage}
          />

          <FilterButton onClick={() => setShowFilterDialog(true)}>
            <FiFilter size={24} />
          </FilterButton>

          <FilterDialog
            open={showFilterDialog}
            onClose={() => setShowFilterDialog(false)}
            maxWidth="sm"
            fullWidth
            slotProps={{
              paper: {
                sx: {
                  overflow: 'visible',
                  borderRadius: '12px',
                },
              },
            }}
          >
            <FilterDialogTitle>Filters</FilterDialogTitle>
            <FilterDialogContent>
              <MobileFilterSection>
                <MobileFilterLabel>Batch</MobileFilterLabel>
                <BrandSelect
                  variant="field"
                  aria-label="Batch"
                  placeholder="All Batches"
                  value={String(cascadeFilters.batchId || '')}
                  onChange={handleBatchChange}
                  disabled={isFilterLoading}
                  options={[
                    { value: '', label: 'All Batches' },
                    ...filterOptions.batches.map((batch) => ({
                      value: String(batch.id),
                      label: batch.name,
                    })),
                  ]}
                />
              </MobileFilterSection>

              <MobileFilterSection>
                <MobileFilterLabel>Class</MobileFilterLabel>
                <BrandSelect
                  variant="field"
                  aria-label="Class"
                  placeholder="All Classes"
                  value={String(cascadeFilters.classNameId || '')}
                  onChange={handleClassChange}
                  disabled={isFilterLoading}
                  options={[
                    { value: '', label: 'All Classes' },
                    ...filterOptions.classes.map((cls) => ({
                      value: String(cls.id),
                      label: cls.name,
                    })),
                  ]}
                />
              </MobileFilterSection>

              <MobileFilterSection>
                <MobileFilterLabel>Group</MobileFilterLabel>
                <BrandSelect
                  variant="field"
                  aria-label="Group"
                  placeholder="All Groups"
                  value={String(cascadeFilters.groupId || '')}
                  onChange={handleGroupChange}
                  disabled={!cascadeFilters.classNameId || isFilterLoading}
                  options={[
                    { value: '', label: 'All Groups' },
                    ...filterOptions.groups.map((grp) => ({
                      value: String(grp.id),
                      label: grp.name,
                    })),
                  ]}
                />
              </MobileFilterSection>

              <MobileFilterSection>
                <MobileFilterLabel>Section</MobileFilterLabel>
                <BrandSelect
                  variant="field"
                  aria-label="Section"
                  placeholder="All Sections"
                  value={String(cascadeFilters.sectionId || '')}
                  onChange={handleSectionChange}
                  disabled={!cascadeFilters.groupId || isFilterLoading}
                  options={[
                    { value: '', label: 'All Sections' },
                    ...filterOptions.sections.map((sec) => ({
                      value: String(sec.id),
                      label: sec.name,
                    })),
                  ]}
                />
              </MobileFilterSection>

              <MobileFilterContainer>
                <MobileFilterButton
                  active={selectedFilter === 'all'}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </MobileFilterButton>
                <MobileFilterButton
                  active={selectedFilter === 'present'}
                  onClick={() => handleFilterChange('present')}
                >
                  Present
                </MobileFilterButton>
                <MobileFilterButton
                  active={selectedFilter === 'absent'}
                  onClick={() => handleFilterChange('absent')}
                >
                  Absent
                </MobileFilterButton>
                <MobileFilterButton
                  active={selectedFilter === 'none'}
                  onClick={() => handleFilterChange('none')}
                >
                  Unmarked
                </MobileFilterButton>
              </MobileFilterContainer>
            </FilterDialogContent>
            <DialogActions>
              <Button onClick={() => setShowFilterDialog(false)}>Close</Button>
            </DialogActions>
          </FilterDialog>
        </MobileContainer>
      ) : (
        <>
          <TopBar>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <SearchContainer>
                <SearchIcon src={searchIcon} />
                <SearchInput
                  type="text"
                  placeholder={getSearchPlaceholder('Search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchContainer>

              <BrandSelect
                aria-label="Academic year"
                placeholder="Year"
                value={String(selectedAcademicYear?.id || '')}
                onChange={(e) => setSelectedAcademicYearId(e.target.value)}
                disabled={isFilterLoading}
                options={academicYears
                  .filter((ay) => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                  .map((ay) => ({
                    value: String(ay.id),
                    label: ay.name.split('-')[0],
                  }))}
              />

              {!isInchargeOnly && (
                <DateSelector>
                  <DateInput
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </DateSelector>
              )}

              <BrandSelect
                aria-label="Batch"
                placeholder="All Batches"
                value={String(cascadeFilters.batchId || '')}
                onChange={handleBatchChange}
                disabled={isFilterLoading}
                options={[
                  { value: '', label: 'All Batches' },
                  ...filterOptions.batches.map((batch) => ({
                    value: String(batch.id),
                    label: batch.name,
                  })),
                ]}
              />

              <BrandSelect
                aria-label="Class"
                placeholder="All Classes"
                value={String(cascadeFilters.classNameId || '')}
                onChange={handleClassChange}
                disabled={isFilterLoading}
                options={[
                  { value: '', label: 'All Classes' },
                  ...filterOptions.classes.map((cls) => ({
                    value: String(cls.id),
                    label: cls.name,
                  })),
                ]}
              />

              <BrandSelect
                aria-label="Group"
                placeholder="All Groups"
                value={String(cascadeFilters.groupId || '')}
                onChange={handleGroupChange}
                disabled={!cascadeFilters.classNameId || isFilterLoading}
                options={[
                  { value: '', label: 'All Groups' },
                  ...filterOptions.groups.map((grp) => ({
                    value: String(grp.id),
                    label: grp.name,
                  })),
                ]}
              />

              <BrandSelect
                aria-label="Section"
                placeholder="All Sections"
                value={String(cascadeFilters.sectionId || '')}
                onChange={handleSectionChange}
                disabled={!cascadeFilters.groupId || isFilterLoading}
                options={[
                  { value: '', label: 'All Sections' },
                  ...filterOptions.sections.map((sec) => ({
                    value: String(sec.id),
                    label: sec.name,
                  })),
                ]}
              />
            </div>
            {!isInchargeOnly && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CircleIconContainer onClick={() => setShowExportDialog(true)}>
                  <FiDownload size={20} strokeWidth={1.3} />
                </CircleIconContainer>
              </div>
            )}
          </TopBar>

          {/* Desktop Attendance Summary */}
          {/* <AttendanceSummary style={{ marginBottom: '2vh', marginTop: '1vh' }}>
            <SummaryText>Attendance Summary for {selectedDate}</SummaryText>
            <SummaryCounts>
              <PresentCard>
                <CountLabel>Present</CountLabel>
                <PresentNumber>{getAttendanceCounts().presentCount}</PresentNumber>
              </PresentCard>
              <AbsentCard>
                <CountLabel>Absent</CountLabel>
                <AbsentNumber>{getAttendanceCounts().absentCount}</AbsentNumber>
              </AbsentCard>
              <UnmarkedCard>
                <CountLabel>Unmarked</CountLabel>
                <UnmarkedNumber>{getAttendanceCounts().unmarkedCount}</UnmarkedNumber>
              </UnmarkedCard>
              {getAttendanceCounts().unmarkedCount > 0 && (
              <PresentRemainingButton
                onClick={handleMarkRemainingAsPresent}
                disabled={isMarkingRemaining}
                style={{ marginTop: '1vh', width: 'auto', padding: '0.8vh 2vh' }}
              >
                {isMarkingRemaining ? (
                  <>
                    <Spinner style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                    Marking {getAttendanceCounts().unmarkedCount} as Present...
                  </>
                ) : (
                  <>
                    <FiCheck size={16} />
                    Mark {getAttendanceCounts().unmarkedCount} Remaining as Present
                  </>
                )}
              </PresentRemainingButton>
            )}
            </SummaryCounts>
            
          </AttendanceSummary> */}

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
            ) : filteredStudents.length === 0 ? (
              <EmptyState>
                <h3>{isBelowMinLength ? 'Keep typing to search' : 'No students found'}</h3>
                <div>{isBelowMinLength ? searchHint : 'Try adjusting your search or filters'}</div>
              </EmptyState>
            ) : (
              <DraggableTableWrapper>
                <Table>
                  <thead>
                    <Tr>
                      <Th $leftAlign>Student</Th>
                      <Th>Admission No</Th>
                      <Th>Class</Th>
                      <Th>Group</Th>
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
                        <Td>{student.group || 'N/A'}</Td>
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
                            <EditButton onClick={() => handleEditAttendance(student.id)}>
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
      )}

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Attendance</ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>

            <ModalStudentInfo>
              <ModalStudentName>{selectedStudent?.name}</ModalStudentName>
              <ModalStudentDetails>
                {selectedStudent?.admission_no} • {selectedStudent?.class_name?.name} {selectedStudent?.section?.name}
              </ModalStudentDetails>
            </ModalStudentInfo>

            <AttendanceOptions>
              <AttendanceButton
                selected={selectedAttendance === 'present'}
                onClick={() => setSelectedAttendance('present')}
              >
                <span>Present</span>
              </AttendanceButton>
              <AttendanceButton
                selected={selectedAttendance === 'absent'}
                onClick={() => setSelectedAttendance('absent')}
              >
                <span>Absent</span>
              </AttendanceButton>
            </AttendanceOptions>

            <SaveButton
              onClick={handleSaveAttendance}
              disabled={isSaving || !selectedAttendance}
            >
              {isSaving ? 'Saving...' : 'Save Attendance'}
            </SaveButton>
          </ModalContent>
        </ModalOverlay>
      )}

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