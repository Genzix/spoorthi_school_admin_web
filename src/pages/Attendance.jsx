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
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
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
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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
    background: #FFB942;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #FFAC1E;
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
    background-color: #FFF3DF;
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
        '#FFB942'};
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
  background-color: #FFB942;
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
  font-size: 1vw;
  font-weight: 700;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #000000;
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
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;

const EditButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #FFB942;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.7vh;

  &:hover {
    color: #FFAC1E;
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
  border: 1px solid #FFB942;
  border-radius: 4px;
  background: ${props => props.selected ? '#FFB942' : 'white'};
  color: ${props => props.selected ? 'white' : '#FFB942'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    background: #FFB942;
    color: white;
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
  background: #FFB942;
  border: none;
  border-radius: 1rem;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #FFAC1E;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 185, 66, 0.2);
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
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #3a5bd9;
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
  background-color: ${props => props.isActive ? '#4a6cf7' : '#f5f5f5'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isActive ? '#3a5bd9' : '#e0e0e0'};
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
  background-color: #FFB942;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
  }
`;

const MobileContainer = styled.div`
  padding: 0.8vh;
  background-color: #EFEFEF;
  min-height: 100vh;
  width: 100%;
`;

const MobileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  margin-bottom: 0.8vh;
  position: sticky;
  top: 0;
  background: #EFEFEF;
  padding: 0.8vh 0;
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
  background: ${props => props.active ? '#FFB942' : 'white'};
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
  gap: 1.2vh;
  padding: 1vh 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 0.5vh;
`;

const MobileStudentCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FFB942 0%, #FFAC1E 50%, #FFB942 100%);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 6px 20px rgba(0, 0, 0, 0.06);
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, #FFE5B9 0%, #FFD54F 50%, #FFE5B9 100%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  position: relative;
  // overflow: hidden;
  
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
    background: radial-gradient(circle, rgba(255, 185, 66, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(20px, 20px);
  }
`;

const StudentAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: absolute;
  bottom: -40px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #FFB942;
  border: 4px solid white;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

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
  padding: 3rem 0.8vh 0.8vh;
`;

const MobileStudentName = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.5px;
`;

const MobileStudentInfo = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
  padding: 0.8vh 1rem;
  height: 0.8vh;
  min-height: 40px;
  border: 1px solid #FFB942;
  border-radius: 8px;
  background: ${props => props.selected ? '#FFB942' : 'white'};
  color: ${props => props.selected ? 'white' : '#FFB942'};
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

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
  padding: 0.6vh 1rem;
  height: auto;
  min-height: 32px;
  background: #4CAF50;
  border: none;
  border-radius: 10vw;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.6vh;

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
  padding: 0.8vh;
  border-radius: 8px;
  margin-bottom: 0.8vh;
  margin-top: 0.8vh;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    padding: 1vh 1.5vh;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5vh;
    margin-top: 0.8vh;
  }
`;

const SummaryText = styled.div`
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 1vh;
  font-weight: 400;
  margin-left: 1vw;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 0.8rem;
    font-weight: 400;
    margin-bottom: 1vh;
    color: #2c3e50;
    letter-spacing: 0.5px;
  }
`;

const SummaryCounts = styled.div`
  display: flex;
  gap: 1vh;
  font-size: 0.9rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: stretch;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    gap: 1.5vh;
    font-size: 1rem;
    margin-bottom: 0.5vh;
    justify-content: space-around;
  }
`;

const CountCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8vh 1vh;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-width: 60px;
  border: 1px solid #e0e0e0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.$color || '#FFB942'};
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
  font-size: 0.7rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.3vh;
  text-align: center;
  letter-spacing: 0.3px;
  text-transform: uppercase;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.4vh;
    font-weight: 600;
  }
`;

const CountNumber = styled.div`
  font-size: 1.2rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin: 0.5rem;
  padding: 0.8rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileDateButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#FFB942' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;
  font-weight: 500;

  &:active {
    transform: scale(0.95);
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
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
  display: inline-block;
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
    border-color: #FFB942;
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
    background: #FFB942;
    color: white;
    
    &:hover {
      background: #FFAC1E;
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
  background: linear-gradient(135deg, #FFB942 0%, #FFAC1E 100%);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  margin: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 185, 66, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #FFB942;
  border: none;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 100;
`;

const MobileStatusBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ $status }) =>
    $status === 'present' ? '#BEFFB6' :
      $status === 'absent' ? '#FEA592' :
        '#FFB942'};
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
`;

const Attendance = () => {
  const { academicYears, selectedAcademicYear, setSelectedAcademicYearId } = useAcademicYear();
  const {
    students,
    loading,
    error,
    isRefreshing,
    refreshStudents,
    getFilteredStudents,
    getUniqueValues
  } = useStudents();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    class: '',
    group: '',
    section: ''
  });
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
  const [userEmail, setUserEmail] = useState('');
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
      const studentsResponse = await axios.get('https://spoorthischool.genzix.space/masters/students/', {
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
        `https://spoorthischool.genzix.space/masters/attendance/?start_date=${startDate}&end_date=${endDate}`,
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
      const studentsResponse = await axios.get('https://spoorthischool.genzix.space/masters/students/', {
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
        `https://spoorthischool.genzix.space/masters/attendance/?start_date=${startDate}&end_date=${endDate}`,
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
      const response = await axios.get(`https://spoorthischool.genzix.space/masters/attendance/?start_date=${selectedDate}&end_date=${selectedDate}`, {
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
    if (students.length > 0) {
      fetchAttendanceRecords();
    }
  }, [selectedDate, students]);

  const handleRefresh = () => {
    refreshStudents();
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
              'https://spoorthischool.genzix.space/masters/attendance/',
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
          `https://spoorthischool.genzix.space/masters/attendance/${selectedAttendanceId}/`,
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
          'https://spoorthischool.genzix.space/masters/attendance/',
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
          `https://spoorthischool.genzix.space/masters/attendance/${existingRecord.id}/`,
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
          'https://spoorthischool.genzix.space/masters/attendance/',
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

  const filteredStudents = getFilteredStudents({
    searchTerm,
    batch: filters.batch,
    class: filters.class,
    group: filters.group,
    section: filters.section,
    admissionOnly: true
  });

  const uniqueBatches = getUniqueValues('batch');
  const uniqueClasses = getUniqueValues('class');
  const uniqueGroups = getUniqueValues('group');
  const uniqueSections = getUniqueValues('section');

  // Get filtered groups and sections based on selected class
  const filteredGroups = filters.class
    ? [...new Set(students
      .filter(s => s.class_name?.name === filters.class)
      .map(s => s.group)
      .filter(Boolean))]
    : [];

  const filteredSections = filters.class
    ? [...new Set(students
      .filter(s => s.class_name?.name === filters.class)
      .map(s => s.section?.name)
      .filter(Boolean))]
    : [];

  // Handle class change
  const handleClassChange = async (e) => {
    const selectedClass = e.target.value;
    setIsFilterLoading(true);
    setFilters(prev => ({
      ...prev,
      class: selectedClass,
      group: '', // Reset group when class changes
      section: '' // Reset section when class changes
    }));
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFilterLoading(false);
  };

  // Handle group change
  const handleGroupChange = async (e) => {
    setIsFilterLoading(true);
    setFilters(prev => ({ ...prev, group: e.target.value }));
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFilterLoading(false);
  };

  // Handle section change
  const handleSectionChange = async (e) => {
    setIsFilterLoading(true);
    setFilters(prev => ({ ...prev, section: e.target.value }));
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFilterLoading(false);
  };

  const handleBatchChange = async (e) => {
    setIsFilterLoading(true);
    setFilters(prev => ({ ...prev, batch: e.target.value }));
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFilterLoading(false);
  };

  const getAvatarColor = (name) => {
    return '#FFB942';
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
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    // If user is incharge, set date to today and disable date changes
    if (email === 'incharge@gmail.com') {
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

    return (
      <MobileContainer>
        <MobileHeader>
          <MobileSearchBar>
            <FiSearch size={20} color="#666" />
            <MobileSearchInput
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </MobileSearchBar>

          {/* Mobile Date Selector */}
          {userEmail !== 'incharge@gmail.com' && (
            <MobileDateSelector>
              <MobileDateButton
                active={selectedDate === new Date().toISOString().split('T')[0]}
                onClick={() => handleDateSelect(new Date().toISOString().split('T')[0])}
                disabled={isDateChanging}
              >
                📅 Today
              </MobileDateButton>
              <MobileDateButtonWrapper>
                <MobileDateButton
                  active={false}
                  disabled={isDateChanging}
                  onClick={handleAdvancedDatePicker}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  🗓️ Pick Date
                </MobileDateButton>
                {/* Hidden native date input for better mobile support */}
                <MobileDateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                  min="2020-01-01"
                  max="2030-12-31"
                />
              </MobileDateButtonWrapper>
              <MobileDateButton
                active={selectedDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                onClick={() => handleDateSelect(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
                disabled={isDateChanging}
              >
                ⏪ Yesterday
              </MobileDateButton>
              <MobileDateButton
                active={selectedDate === new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                onClick={() => handleDateSelect(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
                disabled={isDateChanging}
              >
                📆 2 Days Ago
              </MobileDateButton>

            </MobileDateSelector>
          )}

          {/* Current Date Display */}
          {userEmail !== 'incharge@gmail.com' && (
            <CurrentDateDisplay>
              {isDateChanging ? (
                <>
                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px', marginRight: '10px' }} />
                  Changing Date...
                </>
              ) : (
                <>
                  📅 {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </>
              )}
            </CurrentDateDisplay>
          )}

          {/* Attendance Summary */}
          <AttendanceSummary>
            <SummaryText>Attendance Summary for {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</SummaryText>
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

          {/* Present Remaining Button */}
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
        >
          <FilterDialogTitle>Filters</FilterDialogTitle>
          <FilterDialogContent>
            <MobileFilterSection>
              <MobileFilterLabel>Year</MobileFilterLabel>
              <MobileFilterSelect
                value={selectedAcademicYear?.id || ''}
                onChange={(e) => setSelectedAcademicYearId(e.target.value)}
                disabled={isFilterLoading}
              >
                {academicYears
                  .filter(ay => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                  .map((ay) => (
                    <option key={ay.id} value={ay.id}>{ay.name.split('-')[0]}</option>
                  ))
                }
              </MobileFilterSelect>
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Batch</MobileFilterLabel>
              <MobileFilterSelect
                value={filters.batch}
                onChange={handleBatchChange}
                disabled={isFilterLoading}
              >
                <option value="">All Batches</option>
                {uniqueBatches.map((batch) => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </MobileFilterSelect>
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Class</MobileFilterLabel>
              <MobileFilterSelect
                value={filters.class}
                onChange={handleClassChange}
                disabled={isFilterLoading}
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </MobileFilterSelect>
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Group</MobileFilterLabel>
              <MobileFilterSelect
                value={filters.group}
                onChange={handleGroupChange}
                disabled={!filters.class || isFilterLoading}
              >
                <option value="">All Groups</option>
                {filteredGroups.map((grp) => (
                  <option key={grp} value={grp}>{grp}</option>
                ))}
              </MobileFilterSelect>
            </MobileFilterSection>

            <MobileFilterSection>
              <MobileFilterLabel>Section</MobileFilterLabel>
              <MobileFilterSelect
                value={filters.section}
                onChange={handleSectionChange}
                disabled={!filters.class || isFilterLoading}
              >
                <option value="">All Sections</option>
                {filteredSections.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </MobileFilterSelect>
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
                placeholder="Search"
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
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled
              />
            </SearchContainer>

            <FilterSelectContainer>
              <FilterSelect 
                value={selectedAcademicYear?.id || ''} 
                onChange={(e) => setSelectedAcademicYearId(e.target.value)}
              >
                {academicYears
                  .filter(ay => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                  .map((ay) => (
                    <option key={ay.id} value={ay.id}>{ay.name.split('-')[0]}</option>
                  ))
                }
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>

            {userEmail !== 'incharge@gmail.com' && (
              <DateSelector>
                <DateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </DateSelector>
            )}

            <FilterSelectContainer>
              <FilterSelect value={filters.batch} onChange={(e) => setFilters(prev => ({ ...prev, batch: e.target.value }))}>
                <option value="">All Batches</option>
                {uniqueBatches.map((batch) => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>

            <FilterSelectContainer>
              <FilterSelect
                value={filters.class}
                onChange={handleClassChange}
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>

            <FilterSelectContainer>
              <FilterSelect
                value={filters.group}
                onChange={handleGroupChange}
                disabled={!filters.class}
              >
                <option value="">All Groups</option>
                {filteredGroups.map((grp) => (
                  <option key={grp} value={grp}>{grp}</option>
                ))}
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>

            <FilterSelectContainer>
              <FilterSelect
                value={filters.section}
                onChange={handleSectionChange}
                disabled={!filters.class}
              >
                <option value="">All Sections</option>
                {filteredSections.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>
          </div>
          {userEmail !== 'incharge@gmail.com' && (
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
                placeholder="Search students..."
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
              <h3>No students found</h3>
              <p>Try adjusting your search or filters</p>
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

          <FilterButton onClick={() => setShowFilterDialog(true)}>
            <FiFilter size={24} />
          </FilterButton>

          <FilterDialog
            open={showFilterDialog}
            onClose={() => setShowFilterDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <FilterDialogTitle>Filters</FilterDialogTitle>
            <FilterDialogContent>
              <MobileFilterSection>
                <MobileFilterLabel>Batch</MobileFilterLabel>
                <MobileFilterSelect
                  value={filters.batch}
                  onChange={handleBatchChange}
                  disabled={isFilterLoading}
                >
                  <option value="">All Batches</option>
                  {uniqueBatches.map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </MobileFilterSelect>
              </MobileFilterSection>

              <MobileFilterSection>
                <MobileFilterLabel>Class</MobileFilterLabel>
                <MobileFilterSelect
                  value={filters.class}
                  onChange={handleClassChange}
                  disabled={isFilterLoading}
                >
                  <option value="">All Classes</option>
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </MobileFilterSelect>
              </MobileFilterSection>

              <MobileFilterSection>
                <MobileFilterLabel>Group</MobileFilterLabel>
                <MobileFilterSelect
                  value={filters.group}
                  onChange={handleGroupChange}
                  disabled={!filters.class || isFilterLoading}
                >
                  <option value="">All Groups</option>
                  {filteredGroups.map((grp) => (
                    <option key={grp} value={grp}>{grp}</option>
                  ))}
                </MobileFilterSelect>
              </MobileFilterSection>

              <MobileFilterSection>
                <MobileFilterLabel>Section</MobileFilterLabel>
                <MobileFilterSelect
                  value={filters.section}
                  onChange={handleSectionChange}
                  disabled={!filters.class || isFilterLoading}
                >
                  <option value="">All Sections</option>
                  {filteredSections.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </MobileFilterSelect>
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
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchContainer>

              <FilterSelectContainer>
                <FilterSelect 
                  value={selectedAcademicYear?.id || ''} 
                  onChange={(e) => setSelectedAcademicYearId(e.target.value)}
                  disabled={isFilterLoading}
                >
                  {academicYears
                    .filter(ay => ay.name.startsWith('2025') || ay.name.startsWith('2026'))
                    .map((ay) => (
                      <option key={ay.id} value={ay.id}>{ay.name.split('-')[0]}</option>
                    ))
                  }
                </FilterSelect>
                <SelectArrow src={arrowIcon} />
              </FilterSelectContainer>

              {userEmail !== 'incharge@gmail.com' && (
                <DateSelector>
                  <DateInput
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </DateSelector>
              )}

              <FilterSelectContainer>
                <FilterSelect
                  value={filters.batch}
                  onChange={handleBatchChange}
                  disabled={isFilterLoading}
                >
                  <option value="">All Batches</option>
                  {uniqueBatches.map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </FilterSelect>
                <SelectArrow src={arrowIcon} />
              </FilterSelectContainer>

              <FilterSelectContainer>
                <FilterSelect
                  value={filters.class}
                  onChange={handleClassChange}
                  disabled={isFilterLoading}
                >
                  <option value="">All Classes</option>
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </FilterSelect>
                <SelectArrow src={arrowIcon} />
              </FilterSelectContainer>

              <FilterSelectContainer>
                <FilterSelect
                  value={filters.group}
                  onChange={handleGroupChange}
                  disabled={!filters.class || isFilterLoading}
                >
                  <option value="">All Groups</option>
                  {filteredGroups.map((grp) => (
                    <option key={grp} value={grp}>{grp}</option>
                  ))}
                </FilterSelect>
                <SelectArrow src={arrowIcon} />
              </FilterSelectContainer>

              <FilterSelectContainer>
                <FilterSelect
                  value={filters.section}
                  onChange={handleSectionChange}
                  disabled={!filters.class || isFilterLoading}
                >
                  <option value="">All Sections</option>
                  {filteredSections.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </FilterSelect>
                <SelectArrow src={arrowIcon} />
              </FilterSelectContainer>
            </div>
            {userEmail !== 'incharge@gmail.com' && (
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
                <h3>No students found</h3>
                <div>Try adjusting your search or filters</div>
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