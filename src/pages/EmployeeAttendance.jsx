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
import { useEmployees } from '../context/EmployeesContext';

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

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #FFB942;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
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

  &:nth-child(1) { width: 20vw; }  /* Employee */
  &:nth-child(2) { width: 13vw; }  /* Employee No */
  &:nth-child(3) { width: 7vw; }   /* Attendance */
  &:nth-child(4) { width: 15vw; }  /* Remarks */
  &:nth-child(5) { width: 15vw; }   /* Edit */
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

const EmployeeInfoContainer = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  min-width: 0;
`;

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
  overflow: hidden;
`;

const EmployeeName = styled.div`
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

const ModalEmployeeInfo = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const ModalEmployeeName = styled.h3`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const ModalEmployeeDetails = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
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

const RemarksInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8vw;
  width: 100%;
  margin-top: 8px;
  font-family: "Roboto", sans-serif;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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

const EmployeeAttendance = () => {
  const { employees, loading: employeesLoading, error: employeesError, isRefreshing: employeesRefreshing, refreshEmployees } = useEmployees();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState(null);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportType, setExportType] = useState('excel');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    employee_no: true,
    attendance: true,
    remarks: true
  });

  const columnOptions = [
    { id: 'name', label: 'Employee Name' },
    { id: 'employee_no', label: 'Employee No' },
    { id: 'attendance', label: 'Attendance Status' },
    { id: 'remarks', label: 'Remarks' }
  ];

  const handleColumnToggle = (columnId) => {
    setSelectedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  // Function to get current date in IST
  const getCurrentDateInIST = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(now.getTime() + istOffset);
    return istDate.toISOString().split('T')[0];
  };

  // Function to convert date to IST
  const convertToIST = (date) => {
    const selectedDate = new Date(date);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(selectedDate.getTime() + istOffset);
    return istDate.toISOString().split('T')[0];
  };

  // Function to format date for display
  const formatDateForDisplay = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };



  const fetchAttendanceRecords = async () => {
    try {
      setIsAttendanceLoading(true);
      const token = localStorage.getItem('token');
      // Convert selected date to IST before making the API call
      const istDate = convertToIST(selectedDate);
      const response = await axios.get(
        `https://spoorthi-dev.genzix.space/employees/attendance/?start_date=${istDate}&end_date=${istDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    if (employees.length > 0) {
      fetchAttendanceRecords();
    }
  }, [selectedDate, employees]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshEmployees();
  };

  const getAttendanceStatus = (employeeId) => {
    if (isAttendanceLoading) {
      return 'loading';
    }
    const record = attendanceRecords.find(record =>
      record.employee.id === employeeId &&
      record.date === selectedDate
    );
    if (!record) return 'none';
    return record.is_present ? 'present' : 'absent';
  };

  const handleEditAttendance = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    const currentAttendance = getAttendanceStatus(employeeId);
    const attendanceRecord = attendanceRecords.find(record => record.employee.id === employeeId);
    setSelectedEmployee(employee);
    setSelectedAttendance(currentAttendance);
    setSelectedAttendanceId(attendanceRecord?.id);
    setIsModalOpen(true);
  };

  const handleSaveAttendance = async () => {
    if (!selectedEmployee || !selectedAttendance) return;

    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');

      // Convert selected date to IST
      const istDate = convertToIST(selectedDate);

      // First check if there's an existing attendance record for this employee and date
      const existingRecord = attendanceRecords.find(record =>
        record.employee.id === selectedEmployee.id &&
        record.date === istDate
      );

      let response;
      if (existingRecord) {
        // Update existing record - don't include employee_id in PUT request
        const updateData = {
          date: istDate,
          is_present: selectedAttendance === 'present',
          remarks: selectedAttendance === 'present' ? '' : remarks
        };

        response = await axios.put(
          `https://spoorthi-dev.genzix.space/employees/attendance/${existingRecord.id}/`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }
        );
      } else {
        // Create new record - include employee_id for POST request
        const createData = {
          employee_id: selectedEmployee.id,
          date: istDate,
          is_present: selectedAttendance === 'present',
          remarks: selectedAttendance === 'present' ? '' : remarks
        };

        response = await axios.post(
          'https://spoorthi-dev.genzix.space/employees/attendance/',
          createData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }
        );
      }

      // Check if the response is successful
      if (response.data && response.data.status === 'success') {
        await fetchAttendanceRecords();
        setIsModalOpen(false);
        setRemarks(''); // Reset remarks after successful save
      } else {
        throw new Error(response.data?.message || 'Failed to save attendance');
      }
    } catch (error) {
      console.error('Failed to save attendance:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save attendance. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDirectAttendance = async (employeeId, isPresent) => {
    try {
      // Convert selected date to IST
      const istDate = convertToIST(selectedDate);

      // Check if attendance is already marked
      const existingRecord = attendanceRecords.find(record =>
        record.employee.id === employeeId &&
        record.date === istDate
      );

      if (existingRecord) {
        return; // Don't allow changes if attendance is already marked
      }

      // If marking as absent, open modal to get remarks
      if (!isPresent) {
        setSelectedEmployee(employees.find(e => e.id === employeeId));
        setSelectedAttendance('absent');
        setRemarks('');
        setIsModalOpen(true);
        return;
      }

      setUpdatingEmployeeId(employeeId);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://spoorthi-dev.genzix.space/employees/attendance/',
        {
          employee_id: employeeId,
          date: istDate,
          is_present: isPresent,
          remarks: ''
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
    } catch (error) {
      console.error('Failed to mark attendance', error);
    } finally {
      setUpdatingEmployeeId(null);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const nameMatch = employee.name.toLowerCase().includes(lowerSearchTerm);
    const employeeNoMatch = employee.employee_no.toLowerCase().includes(lowerSearchTerm);

    return nameMatch || employeeNoMatch;
  });

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
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    // If user is incharge, set date to today in IST and disable date changes
    if (email === 'incharge@gmail.com') {
      setSelectedDate(getCurrentDateInIST());
    } else {
      // Set initial date to today in IST
      setSelectedDate(getCurrentDateInIST());
    }
  }, []);

  const exportToExcel = async () => {
    try {
      const token = localStorage.getItem('token');

      // Convert dates to IST
      const istStartDate = convertToIST(startDate);
      const istEndDate = convertToIST(endDate);

      // Get attendance records for the date range
      const response = await axios.get(
        `https://spoorthi-dev.genzix.space/employees/attendance/?start_date=${istStartDate}&end_date=${istEndDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status !== 'success') {
        throw new Error('Failed to fetch attendance records');
      }

      const attendanceData = response.data.data;

      // Create a map of employee attendance by date
      const attendanceByDate = {};
      attendanceData.forEach(record => {
        const date = record.date;
        if (!attendanceByDate[date]) {
          attendanceByDate[date] = {};
        }
        attendanceByDate[date][record.employee.id] = {
          is_present: record.is_present,
          remarks: record.remarks
        };
      });

      // Generate dates between start and end date
      const dates = [];
      const currentDate = new Date(istStartDate);
      const endDateTime = new Date(istEndDate);
      while (currentDate <= endDateTime) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Create data array
      const data = [];

      // Add headers
      data.push(['Employee Name', 'Employee No', 'Status', 'Remarks']);

      // For each date, add a date header and all employees
      dates.forEach(date => {
        // Add date as a header row
        data.push([formatDateForDisplay(date), '', '', '']);

        // Add all employees for this date
        employees.forEach(employee => {
          const status = attendanceByDate[date]?.[employee.id];
          data.push([
            employee.name,
            employee.employee_no,
            status ? (status.is_present ? 'Present' : 'Absent') : 'Not Marked',
            status && !status.is_present ? (status.remarks || '-') : '-'
          ]);
        });

        // Add an empty row after each date's data
        data.push(['', '', '', '']);
      });

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);

      // Set column widths
      const colWidths = [
        { wch: 30 }, // Employee Name
        { wch: 15 }, // Employee No
        { wch: 15 }, // Status
        { wch: 40 }  // Remarks
      ];
      ws['!cols'] = colWidths;

      // Style the date headers
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = 0; R <= range.e.r; R++) {
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: 0 })];
        if (cell && cell.v && cell.v.includes('2024')) { // Date row
          cell.s = {
            font: { bold: true, color: { rgb: "4A6CF7" } },
            alignment: { horizontal: "center" }
          };
        }
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
      XLSX.writeFile(wb, `employee_attendance_${istStartDate}_to_${istEndDate}.xlsx`);
    } catch (error) {
      console.error('Failed to export attendance data', error);
    }
  };

  const exportToPDF = async () => {
    try {
      const token = localStorage.getItem('token');

      // Convert dates to IST
      const istStartDate = convertToIST(startDate);
      const istEndDate = convertToIST(endDate);

      // Get attendance records for the date range
      const response = await axios.get(
        `https://spoorthi-dev.genzix.space/employees/attendance/?start_date=${istStartDate}&end_date=${istEndDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status !== 'success') {
        throw new Error('Failed to fetch attendance records');
      }

      const attendanceData = response.data.data;

      // Create a map of employee attendance by date
      const attendanceByDate = {};
      attendanceData.forEach(record => {
        const date = record.date;
        if (!attendanceByDate[date]) {
          attendanceByDate[date] = {};
        }
        attendanceByDate[date][record.employee.id] = {
          is_present: record.is_present,
          remarks: record.remarks
        };
      });

      // Generate dates between start and end date
      const dates = [];
      const currentDate = new Date(istStartDate);
      const endDateTime = new Date(istEndDate);
      while (currentDate <= endDateTime) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const doc = new jsPDF('l', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 15;
      const headerHeight = 30;
      const tableStartY = headerHeight + 10;

      // Add title and date range
      doc.setFontSize(14);
      doc.setTextColor(74, 108, 247);
      doc.text('Employee Attendance Report', margin, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date Range: ${formatDateForDisplay(istStartDate)} to ${formatDateForDisplay(istEndDate)}`, margin, 30);

      // Prepare headers
      const headers = ['Employee Name', 'Employee No', 'Status', 'Remarks'];
      const columnWidths = [50, 30, 25, 70]; // Adjusted column widths

      let currentY = tableStartY;
      let currentPage = 1;

      // Process each date
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];

        // Check if we need a new page
        if (currentY > pageHeight - margin) {
          doc.addPage();
          currentPage++;
          currentY = margin;
        }

        // Add date header
        doc.setFontSize(12);
        doc.setTextColor(74, 108, 247);
        doc.text(formatDateForDisplay(date), margin, currentY);
        currentY += 8;

        // Prepare data for this date
        const data = employees.map(employee => {
          const status = attendanceByDate[date]?.[employee.id];
          return [
            employee.name,
            employee.employee_no,
            status ? (status.is_present ? 'Present' : 'Absent') : 'Not Marked',
            status && !status.is_present ? (status.remarks || '-') : '-'
          ];
        });

        // Add table for this date
        autoTable(doc, {
          head: [headers],
          body: data,
          startY: currentY,
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
          columnStyles: {
            0: { cellWidth: columnWidths[0], halign: 'left' }, // Employee Name
            1: { cellWidth: columnWidths[1] }, // Employee No
            2: { cellWidth: columnWidths[2] }, // Status
            3: { cellWidth: columnWidths[3], halign: 'left' } // Remarks
          },
          margin: { top: currentY, bottom: margin },
          pageBreak: 'auto',
          didDrawPage: function (data) {
            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(
              `Page ${currentPage}`,
              margin,
              pageHeight - 10
            );
          },
          willDrawCell: function (data) {
            // Truncate long text
            if (data.cell.text && data.cell.text.length > 50) {
              data.cell.text = data.cell.text.substring(0, 47) + '...';
            }
          }
        });

        // Update currentY for next date
        currentY = doc.lastAutoTable.finalY + 10;

        // Add some space between dates
        if (i < dates.length - 1) {
          currentY += 5;
        }
      }

      doc.save(`employee_attendance_${istStartDate}_to_${istEndDate}.pdf`);
    } catch (error) {
      console.error('Failed to export attendance data', error);
      alert('Failed to export PDF. Please try again with a smaller date range.');
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

  if (employeesLoading && !employeesRefreshing) {
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

            {userEmail !== 'incharge@gmail.com' && (
              <DateSelector>
                <DateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </DateSelector>
            )}
          </div>
        </TopBar>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading employees...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

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
            />
          </SearchContainer>

          {userEmail !== 'incharge@gmail.com' && (
            <DateSelector>
              <DateInput
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={getCurrentDateInIST()} // Prevent selecting future dates
              />
            </DateSelector>
          )}
        </div>

        {userEmail !== 'incharge@gmail.com' && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CircleIconContainer onClick={() => setShowExportDialog(true)}>
              <FiDownload size={20} strokeWidth={1.3} />
            </CircleIconContainer>
          </div>
        )}
      </TopBar>

      <TableContainer
        ref={tableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {employeesRefreshing || isAttendanceLoading ? (
          <div style={{ padding: '20px' }}>
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : filteredEmployees.length === 0 ? (
          <EmptyState>
            <h3>No employees found</h3>
            <div>Try adjusting your search</div>
          </EmptyState>
        ) : (
          <DraggableTableWrapper>
            <Table>
              <thead>
                <Tr>
                  <Th $leftAlign>Employee</Th>
                  <Th>Employee No</Th>
                  <Th>Attendance</Th>
                  <Th>Remarks</Th>
                  <Th>Edit</Th>
                </Tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => {
                  const attendanceRecord = attendanceRecords.find(record =>
                    record.employee.id === employee.id &&
                    record.date === selectedDate
                  );
                  return (
                    <Tr key={employee.id}>
                      <Td $leftAlign>
                        <EmployeeInfoContainer>
                          <Avatar>
                            {employee.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <EmployeeDetails>
                            <EmployeeName>{employee.name}</EmployeeName>
                          </EmployeeDetails>
                        </EmployeeInfoContainer>
                      </Td>
                      <Td>{employee.employee_no}</Td>
                      <Td>
                        {getAttendanceStatus(employee.id) === 'loading' ? (
                          <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px', margin: '0 auto' }} />
                        ) : (
                          <StatusBadge $status={getAttendanceStatus(employee.id)}>
                            {getAttendanceStatus(employee.id)}
                          </StatusBadge>
                        )}
                      </Td>
                      <Td>
                        {attendanceRecord?.remarks || '-'}
                      </Td>
                      <Td $isEditColumn>
                        {getAttendanceStatus(employee.id) === 'loading' ? (
                          <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        ) : getAttendanceStatus(employee.id) === 'none' ? (
                          <AttendanceButtonsContainer>
                            <AttendanceButton
                              onClick={() => handleDirectAttendance(employee.id, true)}
                              disabled={updatingEmployeeId === employee.id}
                            >
                              {updatingEmployeeId === employee.id ? (
                                <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                              ) : (
                                'Present'
                              )}
                            </AttendanceButton>
                            <AttendanceButton
                              onClick={() => handleDirectAttendance(employee.id, false)}
                              disabled={updatingEmployeeId === employee.id}
                            >
                              {updatingEmployeeId === employee.id ? (
                                <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                              ) : (
                                'Absent'
                              )}
                            </AttendanceButton>
                          </AttendanceButtonsContainer>
                        ) : (
                          <EditButton onClick={() => handleEditAttendance(employee.id)}>
                            <FiEdit2 size={18} />
                          </EditButton>
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>
          </DraggableTableWrapper>
        )}
      </TableContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Attendance</ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>

            <ModalEmployeeInfo>
              <ModalEmployeeName>{selectedEmployee?.name}</ModalEmployeeName>
              <ModalEmployeeDetails>
                {selectedEmployee?.employee_no}
              </ModalEmployeeDetails>
            </ModalEmployeeInfo>

            <AttendanceOptions>
              <AttendanceButton
                selected={selectedAttendance === 'present'}
                onClick={() => {
                  setSelectedAttendance('present');
                  setRemarks(''); // Clear remarks when switching to present
                }}
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

            {selectedAttendance === 'absent' && (
              <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Remarks (Required)</label>
                <RemarksInput
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter reason for absence"
                  required
                />
              </div>
            )}

            <SaveButton
              onClick={handleSaveAttendance}
              disabled={isSaving || !selectedAttendance || (selectedAttendance === 'absent' && !remarks)}
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
              max={getCurrentDateInIST()}
            />
            <span>to</span>
            <DateRangeInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={getCurrentDateInIST()}
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

export default EmployeeAttendance; 