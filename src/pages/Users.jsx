import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSend, FiCheck, FiX, FiRefreshCw, FiDownload } from 'react-icons/fi';
import searchIcon from '../assets/Search.svg'; 
import arrowIcon from '../assets/arrow.svg'; 
import Add from '../assets/add.svg'; 
import AddStudentDialog from './Dailog/AddStudentDialog';
import { useNavigate } from 'react-router-dom'; 
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useStudents } from '../context/StudentsContext';
import { useAcademicYear } from '../context/AcademicYearContext';
import { formatStudentDob } from '../utils/dateUtils';



// Modern loading animation
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
  background-color: #EFEFEF;
  min-height: 100vh;
  transition: all 0.3s ease;
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

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.variant === 'primary' ? '#4a6cf7' : props.variant === 'success' ? '#28a745' : '#6c757d'};
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
    background-color: ${props => props.variant === 'primary' ? '#3a5bd9' : props.variant === 'success' ? '#218838' : '#5a6268'};
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
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

const TABLE_COLUMNS = [
  { key: 'select', width: '3%' },
  { key: 'student', width: '14%' },
  { key: 'pen_no', width: '6%' },
  { key: 'dob', width: '8%' },
  { key: 'phone', width: '9%' },
  { key: 'committed_fee', width: '7%' },
  { key: 'class', width: '7%' },
  { key: 'group', width: '5%' },
  { key: 'section', width: '6%' },
  { key: 'pending_fees', width: '7%' },
  { key: 'status', width: '8%' },
  { key: 'materials', width: '11%' },
  { key: 'action', width: '6%' },
  { key: 'edit', width: '6%' },
];

const Table = styled.table`
  min-width: 1400px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th.withConfig({
  shouldForwardProp: (prop) => !['leftAlign'].includes(prop),
})`
  background: #EFEFEF;
  padding: 1.8vh 0.5vw;
  text-align: ${props => props.leftAlign ? 'left' : 'center'};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  ${props => props.leftAlign && 'padding-left: 1vw;'}
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

const Td = styled.td`
  padding: 2vh 0.5vw;
  text-align: ${props => props.leftAlign ? 'left' : 'center'};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  overflow: hidden;
  box-sizing: border-box;
  ${props => props.leftAlign && 'padding-left: 25px;'}
  word-wrap: break-word;
  transition: all 0.2s;
`;

const StatusCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

const MaterialsCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.35vh;
  width: 100%;
  min-width: 0;
  padding: 0 0.25vw;
  box-sizing: border-box;
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})`
  padding: 0.6vh 0.7vw;
  border-radius: 1vw;
  background: ${({ status }) => status === 'admission' ? '#BEFFB6' : '#FEA592'};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 400;
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  box-sizing: border-box;
  transition: all 0.2s;
`;

const PendingFees = styled.span`
  color: #FF6745;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`;

const CombinedClass = styled.span`
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
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

const IconWrapper = styled.span`
  color: ${props => props.color || '#28a745'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 5px;
  transition: all 0.2s;
`;

const GivenItem = styled.span`
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 400;
  color: ${props => props.given ? '#28a745' : '#FF866B'};
  transition: all 0.2s;
`;

const FeeReminderButton = styled.button`
  padding: 0.8vh 0.9vw;
  border-radius: 5vw;
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  border: none; 
  font-weight: 400;
  background-color: #FFB942;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FeeReminderButton1 = styled.button`
 padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: '#000000';
  margin-left: 0.1vw;
  height: 5.7vh;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: #FFB942;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PhoneNumbersContainer = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: black;
  font-weight: 400;
`;

const Avatar = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: ${props => props.color || '#4a6cf7'};
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
`;

const StudentDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const PhoneNumber = styled.div`
  font-size: 0.7vw;
  color: #6c757d;
  margin-top: 0.3vh;
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FFB942;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: scale(1.05);
  }
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  cursor: pointer;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  &:hover {
    color: #FFB942;
  }
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

const Users = () => {
  const navigate = useNavigate(); 
  const { 
    students, 
    loading, 
    error, 
    isRefreshing, 
    refreshStudents, 
    getFilteredStudents, 
    getUniqueValues,
    addStudent,
    updateStudent
  } = useStudents();

  const {
    academicYears,
    selectedAcademicYear,
    setSelectedAcademicYear
  } = useAcademicYear();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    status: '',
    group: '',
    academicYear: '',
    hasPendingFees: '',
    class: '',
    section: ''
  });
  const [category, setCategory] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportType, setExportType] = useState('excel');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tableRef = useRef(null);
  const columnOptions = [
    { id: 'name', label: 'Student Name' },
    { id: 'father_name', label: 'Father Name' },
    { id: 'admission_no', label: 'Admission No' },
    { id: 'pen_no', label: 'Pen No' },
    { id: 'phone_numbers', label: 'Phone Numbers' },
    { id: 'academic_year', label: 'Academic Year' },
    { id: 'class_name', label: 'Class' },
    { id: 'section', label: 'Section' },
    { id: 'group', label: 'Group' },
    { id: 'batch', label: 'Batch' },
    { id: 'status', label: 'Status' },
    { id: 'date_of_admission', label: 'Date of Admission' },
    { id: 'dob', label: 'Date of Birth' },
    { id: 'student_aadhar', label: 'Student Aadhar' },
    { id: 'father_aadhar', label: 'Father Aadhar' },
    { id: 'mother_aadhar', label: 'Mother Aadhar' },
    { id: 'no_of_turns', label: 'No of Turns' },
    { id: 'committed_fees', label: 'Committed Fees' },
    { id: 'initial_fee_paid', label: 'Initial Fee Paid' },
    { id: 'pending_fees', label: 'Pending Fees' },
    { id: 'materials', label: 'Materials' },
    { id: 'fee_terms', label: 'Fee Terms' }
  ];

  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    father_name: false,
    admission_no: true,
    pen_no: true,
    phone_numbers: true,
    academic_year: false,
    class_name: false,
    section: false,
    group: false,
    batch: false,
    status: false,
    date_of_admission: false,
    dob: false,
    student_aadhar: false,
    father_aadhar: false,
    mother_aadhar: false,
    no_of_turns: false,
    committed_fees: false,
    initial_fee_paid: false,
    pending_fees: false,
    materials: false,
    fee_terms: false
  });

  const handleStudentClick = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  const handleRefresh = () => {
    refreshStudents();
  };

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const sendFeeReminder = (studentId) => {
    // Show a temporary loading state for the action
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, isSendingReminder: true } 
          : student
      )
    );

    // Simulate API call
    setTimeout(() => {
      setStudents(prevStudents => 
        prevStudents.map(student => 
          student.id === studentId 
            ? { ...student, isSendingReminder: false } 
            : student
        )
      );
    }, 1000);
  };

  const filteredStudents = getFilteredStudents({
    searchTerm,
    category,
    class: filters.class,
    group: filters.group,
    section: filters.section
  });

  const uniqueCategories = getUniqueValues('batch');
  const uniqueClasses = getUniqueValues('class');
  const uniqueGroups = getUniqueValues('group');
  const uniqueSections = getUniqueValues('section');

  const getAvatarColor = (name) => {
    const colors = [
      '#FFB942', 
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  const handleAddStudentSuccess = (studentData) => {
    if (studentData) {
      if (showEditDialog) {
        updateStudent(studentData);
      } else {
        addStudent(studentData);
      }
    } else {
      refreshStudents();
    }
  };

  const handleColumnToggle = (columnId) => {
    setSelectedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const exportToExcel = () => {
    // First, get only the selected column options
    const selectedColumnOptions = columnOptions.filter(col => selectedColumns[col.id]);
    
    const selectedStudents = filteredStudents.map(student => {
      const row = {};
      // Only add columns that are selected
      selectedColumnOptions.forEach(col => {
        switch(col.id) {
          case 'name':
            row['Student Name'] = student.name;
            break;
          case 'father_name':
            row['Father Name'] = student.father_name || 'N/A';
            break;
          case 'admission_no':
            row['Admission No'] = student.admission_no;
            break;
          case 'pen_no':
            row['Pen No'] = student.pen_no || 'N/A';
            break;
          case 'phone_numbers':
            const phoneNumbers = Array.isArray(student.phone_numbers) 
              ? student.phone_numbers.join(', ') 
              : student.phone_numbers?.toString() || 'N/A';
            row['Phone Numbers'] = phoneNumbers;
            break;
          case 'academic_year':
            row['Academic Year'] = student.academic_year?.name || 'N/A';
            break;
          case 'class_name':
            row['Class'] = student.class_name?.name || 'N/A';
            break;
          case 'section':
            row['Section'] = student.section?.name || 'N/A';
            break;
          case 'group':
            row['Group'] = student.group || 'N/A';
            break;
          case 'batch':
            row['Batch'] = student.batch || 'N/A';
            break;
          case 'status':
            row['Status'] = student.status;
            break;
          case 'date_of_admission':
            row['Date of Admission'] = student.date_of_admission || 'N/A';
            break;
          case 'dob':
            row['Date of Birth'] = formatStudentDob(student.dob);
            break;
          case 'student_aadhar':
            row['Student Aadhar'] = student.student_aadhar || 'N/A';
            break;
          case 'father_aadhar':
            row['Father Aadhar'] = student.father_aadhar || 'N/A';
            break;
          case 'mother_aadhar':
            row['Mother Aadhar'] = student.mother_aadhar || 'N/A';
            break;
          case 'no_of_turns':
            row['No of Turns'] = student.no_of_turns;
            break;
          case 'committed_fees':
            row['Committed Fees'] = `₹${student.committed_fees}`;
            break;
          case 'initial_fee_paid':
            row['Initial Fee Paid'] = `₹${student.initial_fee_paid}`;
            break;
          case 'pending_fees':
            row['Pending Fees'] = `₹${student.pending_fees}`;
            break;
          case 'materials':
            row['Materials'] = [
              student.is_bookes_given ? 'Books' : '',
              student.is_uniform_given ? 'Uniform' : '',
              student.is_bag_given ? 'Bag' : ''
            ].filter(Boolean).join(', ');
            break;
          case 'fee_terms':
            row['Fee Terms'] = student.fee_terms?.map(term => 
              `Term ${term.term}: ₹${term.amount} (${term.start_date} to ${term.end_date})`
            ).join('; ') || 'N/A';
            break;
        }
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(selectedStudents);
    
    // Set column widths based on selected columns
    const colWidths = selectedColumnOptions.map(col => {
      switch(col.id) {
        case 'name':
          return { wch: 30 }; // Student Name
        case 'father_name':
          return { wch: 25 }; // Father Name
        case 'admission_no':
          return { wch: 15 }; // Admission No
        case 'pen_no':
          return { wch: 12 }; // Pen No
        case 'phone_numbers':
          return { wch: 25 }; // Phone Numbers
        case 'academic_year':
          return { wch: 15 }; // Academic Year
        case 'class_name':
          return { wch: 15 }; // Class
        case 'section':
          return { wch: 15 }; // Section
        case 'group':
          return { wch: 15 }; // Group
        case 'batch':
          return { wch: 15 }; // Batch
        case 'status':
          return { wch: 15 }; // Status
        case 'date_of_admission':
          return { wch: 20 }; // Date of Admission
        case 'dob':
          return { wch: 20 }; // Date of Birth
        case 'student_aadhar':
          return { wch: 20 }; // Student Aadhar
        case 'father_aadhar':
          return { wch: 20 }; // Father Aadhar
        case 'mother_aadhar':
          return { wch: 20 }; // Mother Aadhar
        case 'no_of_turns':
          return { wch: 15 }; // No of Turns
        case 'committed_fees':
          return { wch: 15 }; // Committed Fees
        case 'initial_fee_paid':
          return { wch: 15 }; // Initial Fee Paid
        case 'pending_fees':
          return { wch: 15 }; // Pending Fees
        case 'materials':
          return { wch: 30 }; // Materials
        case 'fee_terms':
          return { wch: 100 }; // Fee Terms
        default:
          return { wch: 15 };
      }
    });
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(74, 108, 247);
    doc.text('Students List', 14, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const headers = columnOptions
      .filter(col => selectedColumns[col.id])
      .map(col => col.label);

    const data = filteredStudents.map(student => {
      const row = [];
      if (selectedColumns.name) row.push(student.name);
      if (selectedColumns.father_name) row.push(student.father_name || 'N/A');
      if (selectedColumns.admission_no) row.push(student.admission_no);
      if (selectedColumns.pen_no) row.push(student.pen_no || 'N/A');
      if (selectedColumns.phone_numbers) {
        const phoneNumbers = Array.isArray(student.phone_numbers) 
          ? student.phone_numbers.join(', ') 
          : student.phone_numbers?.toString() || 'N/A';
        row.push(phoneNumbers);
      }
      if (selectedColumns.academic_year) row.push(student.academic_year?.name || 'N/A');
      if (selectedColumns.class_name) row.push(student.class_name?.name || 'N/A');
      if (selectedColumns.section) row.push(student.section?.name || 'N/A');
      if (selectedColumns.group) row.push(student.group || 'N/A');
      if (selectedColumns.batch) row.push(student.batch || 'N/A');
      if (selectedColumns.status) row.push(student.status);
      if (selectedColumns.date_of_admission) row.push(student.date_of_admission || 'N/A');
      if (selectedColumns.dob) row.push(formatStudentDob(student.dob));
      if (selectedColumns.student_aadhar) row.push(student.student_aadhar || 'N/A');
      if (selectedColumns.father_aadhar) row.push(student.father_aadhar || 'N/A');
      if (selectedColumns.mother_aadhar) row.push(student.mother_aadhar || 'N/A');
      if (selectedColumns.no_of_turns) row.push(student.no_of_turns);
      if (selectedColumns.committed_fees) row.push(`₹${student.committed_fees}`);
      if (selectedColumns.initial_fee_paid) row.push(`₹${student.initial_fee_paid}`);
      if (selectedColumns.pending_fees) row.push(`₹${student.pending_fees}`);
      if (selectedColumns.materials) {
        row.push([
          student.is_bookes_given ? 'Books' : '',
          student.is_uniform_given ? 'Uniform' : '',
          student.is_bag_given ? 'Bag' : ''
        ].filter(Boolean).join(', '));
      }
      if (selectedColumns.fee_terms) {
        row.push(student.fee_terms?.map(term => 
          `Term ${term.term}: ₹${term.amount} (${term.start_date} to ${term.end_date})`
        ).join('; ') || 'N/A');
      }
      return row;
    });

    // Calculate column widths based on content
    const columnWidths = headers.map((_, index) => {
      const maxContentLength = Math.max(
        ...data.map(row => (row[index] || '').toString().length),
        headers[index].length
      );
      return Math.max(30, Math.min(60, maxContentLength * 2.5)); // Min 30mm, max 60mm
    });

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
      didDrawPage: function(data) {
        // Add footer
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `Page ${data.pageCount} of ${data.pageNumber}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      }
    });

    doc.save('students.pdf');
  };

  const handleExport = () => {
    if (exportType === 'excel') {
      exportToExcel();
    } else {
      exportToPDF();
    }
    setShowExportDialog(false);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShowEditDialog(true);
  };

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
  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setFilters(prev => ({ 
      ...prev, 
      class: selectedClass,
      group: '', // Reset group when class changes
      section: '' // Reset section when class changes
    }));
  };

  // Handle group change
  const handleGroupChange = (e) => {
    setFilters(prev => ({ ...prev, group: e.target.value }));
  };

  // Handle section change
  const handleSectionChange = (e) => {
    setFilters(prev => ({ ...prev, section: e.target.value }));
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
    const walk = (x - startX) * 2; // Scroll speed multiplier
    tableRef.current.scrollLeft = scrollLeft - walk;
  };

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
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                disabled
              >
                <option value="">All Academic Years</option>
                {academicYears.map((ay) => (
                  <option key={ay.id} value={ay.id}>{ay.name}</option>
                ))}
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>

            <FilterSelectContainer>
              <FilterSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Batches</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
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
        </TopBar>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading students...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container >
      <TopBar >
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
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
            >
              <option value="">All Academic Years</option>
              {academicYears.map((ay) => (
                <option key={ay.id} value={ay.id}>{ay.name}</option>
              ))}
            </FilterSelect>
            <SelectArrow src={arrowIcon} />
          </FilterSelectContainer>

          <FilterSelectContainer>
            <FilterSelect value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Batches</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AddStudentText onClick={() => setShowAddStudentDialog(true)}>
            Add Student
          </AddStudentText>
          <CircleIconContainer onClick={() => setShowAddStudentDialog(true)}>
            <img 
              src={Add} 
              style={{
                height: '1.8vh',
              }}
            />
          </CircleIconContainer>
          <CircleIconContainer onClick={() => setShowExportDialog(true)}>
            <FiDownload size={20} strokeWidth={1.3} />
          </CircleIconContainer>
          {showAddStudentDialog && (
  <AddStudentDialog onClose={() => setShowAddStudentDialog(false)}  onSuccess={handleAddStudentSuccess} />
)}
          {selectedStudents.length > 0 && (
            <FeeReminderButton1 onClick={() => selectedStudents.forEach(id => sendFeeReminder(id))}>
              Send Reminder
            </FeeReminderButton1>
          )}
        </div>
      </TopBar>

      <TableContainer 
        ref={tableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {isRefreshing ? (
          <div style={{ padding: '20px' }}>
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : filteredStudents.length === 0 ? (
          <EmptyState>
            <h3>No students found</h3>
            <AddStudentText style={{marginTop:'1vh'}}>Try adjusting your search or filters</AddStudentText>
          </EmptyState>
        ) : (
          <DraggableTableWrapper>
            <Table>
              <colgroup>
                {TABLE_COLUMNS.map((column) => (
                  <col key={column.key} style={{ width: column.width }} />
                ))}
              </colgroup>
              <thead>
                <Tr>
                  <Th>
                    <CustomCheckbox 
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                    />
                  </Th>
                  <Th leftAlign>Student</Th>
                  <Th>Pen No</Th>
                  <Th>Date of Birth</Th>
                  <Th>Phone</Th>
                  <Th>Committed Fee</Th>
                  <Th>Class</Th>
                  <Th>Group</Th>
                  <Th>Section</Th>
                  <Th>Pending Fees</Th>
                  <Th>Status</Th>
                  <Th>Materials</Th>
                  <Th>Action</Th>
                  <Th>Edit</Th>
                </Tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <Tr key={student.id}  >
                    <Td>
                      <CustomCheckbox 
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </Td>
                    <Td leftAlign  onClick={() => handleStudentClick(student.id)} style={{ cursor: 'pointer' }}>
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
                          <Avatar color={getAvatarColor(student.name)}>
                            <div>{student.name.charAt(0).toUpperCase()}</div>
                          </Avatar>
                        )}
                        <StudentDetails>
                          <div style={{ fontWeight: '400' }}>{student.name}</div>
                          <div style={{ fontSize: '0.8vw', color: 'grey' }}>{student.admission_no}</div>
                        </StudentDetails>
                      </StudentInfoContainer>
                    </Td>
                    <Td>{student.pen_no || 'N/A'}</Td>
                    <Td>{formatStudentDob(student.dob)}</Td>
                    <Td>
                      <PhoneNumbersContainer>
                        {student.phone_numbers && student.phone_numbers.length > 0 ? (
                          <>
                            <div>{student.phone_numbers[0]},</div>
                            {student.phone_numbers[1] && <div style={{marginTop:"0.6vh"}}>{student.phone_numbers[1]}</div>}
                          </>
                        ) : (
                          <div>No phone</div>
                        )}
                      </PhoneNumbersContainer>
                    </Td>
                    <Td>₹{student.committed_fees}</Td>
                    <Td>
                      <CombinedClass>
                      {student.class_name?.name || 'N/A'}-({student.batch})
                      </CombinedClass>
                    </Td>
                    <Td>{student.group}</Td>
                    <Td>{student.section?.name || 'N/A'}</Td>
                    <Td>
                      <PendingFees>₹{student.pending_fees}</PendingFees>
                    </Td>
                    <Td>
                      <StatusCell>
                        <StatusBadge status={student.status}>
                          {student.status}
                        </StatusBadge>
                      </StatusCell>
                    </Td>
                    <Td>
                      <MaterialsCell>
                        <GivenItem given={student.is_bookes_given}>
                          <IconWrapper color={student.is_bookes_given ? '#28a745' : '#FF866B'}>
                            {student.is_bookes_given ? <FiCheck /> : <FiX />}
                          </IconWrapper>
                          Books
                        </GivenItem>
                        <GivenItem given={student.is_uniform_given}>
                          <IconWrapper color={student.is_uniform_given ? '#28a745' : '#FF866B'}>
                            {student.is_uniform_given ? <FiCheck /> : <FiX />}
                          </IconWrapper>
                          Uniform
                        </GivenItem>
                        <GivenItem given={student.is_bag_given}>
                          <IconWrapper color={student.is_bag_given ? '#28a745' : '#FF866B'}>
                            {student.is_bag_given ? <FiCheck /> : <FiX />}
                          </IconWrapper>
                          Bag
                        </GivenItem>
                      </MaterialsCell>
                    </Td>
                    <Td>
                      <ActionCell>
                        <FeeReminderButton 
                          onClick={() => sendFeeReminder(student.id)}
                          disabled={student.isSendingReminder}
                        >
                          {student.isSendingReminder ? (
                            <FiRefreshCw className="spin" />
                          ) : (
                            'Send'
                          )}
                        </FeeReminderButton>
                      </ActionCell>
                    </Td>
                    <Td>
                      <ActionCell>
                        <FeeReminderButton 
                          onClick={() => handleEditClick(student)}
                        >
                          Edit
                        </FeeReminderButton>
                      </ActionCell>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </DraggableTableWrapper>
        )}
      </TableContainer>

      {showEditDialog && selectedStudent && (
        <AddStudentDialog 
          onClose={() => {
            setShowEditDialog(false);
            setSelectedStudent(null);
          }}
          onSuccess={handleAddStudentSuccess}
          isEditMode={true}
          initialData={selectedStudent}
        />
      )}

      <ExportDialog
        open={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <ExportDialogTitle>Export Students Data</ExportDialogTitle>
        <ExportDialogContent>
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

export default Users;