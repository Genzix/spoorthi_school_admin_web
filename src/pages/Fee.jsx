// src/pages/Fee.jsx
import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import searchIcon from '../assets/Search.svg';
import axios from 'axios';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import FeeReceipt from '../components/FeeReceipt';
import { useStudents } from '../context/StudentsContext';
import { useAcademicYear } from '../context/AcademicYearContext';
import * as XLSX from 'xlsx';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
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

const DashboardContainer = styled.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`;

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`;

const RevenuneContainer = styled.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RevenuneContainer2 = styled.div`
  height: 85vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 39vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;

const RevenuneContainer1 = styled.div`
  height: 70vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;

const AddStudentText3 = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
 font-weight: 700;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  padding: 10px 15px 10px 2.4vw;
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #FFEAC7;
  background-color: #FFEAC7;
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

const FeesRecordsList = styled.div`
  width: 100%;
  margin-top: 2vh;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5vw;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const FeeRecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
`;

const RecordDetail = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;

const FormLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`;

const FormInput = styled.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`;

const DateInput = styled.input`
  padding: 1.2vh 0.5vw;
  border-radius: 0.6vw;
  border: 1px solid #000000;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  background-color: transparent;
  color: #000000;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s;
  width: 8vw;
  height: 4vh;
  box-sizing: border-box;
  
  &:hover {
    background-color: #FFEAC7;
  }
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
    background-color: #FFEAC7;
  }
`;

const FormSelect = styled.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
`;

const FormButton = styled.button`
  padding: 1.5vh 1vw;
  background-color: ${props => props.disabled ? '#cccccc' : '#BEFFB6'};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  min-height: 4vh;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#92FF84'};
  }
`;

const ButtonSpinner = styled.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spin} 1s ease-in-out infinite;
`;

const StudentDropdown = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 20vh;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const DialogContent = styled.div`
  background-color: white;
  padding: 2vw;
  border-radius: 1.5vw;
  width: 35vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1vw;
  right: 1vw;
  background: #f5f5f5;
  border: none;
  width: 1.8vw;
  height: 1.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  font-size: 1.2vw;
  transition: all 0.2s;

  &:hover {
    background-color: #FFEAC7;
    color: #1a1a1a;
    transform: rotate(90deg);
  }
`;

const DialogTitle = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;
`;

const DialogRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;
`;

const DialogDetail = styled.div`
  font-family: "Roboto", sans-serif;
  padding: 0.8vw;
  border-radius: 0.8vw;
  transition: all 0.2s;
  background-color: #fafafa;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3vw;

  &:hover {
    background-color: #FFEAC7;
    transform: translateY(-2px);
  }
`;

const DialogLabel = styled.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DialogValue = styled.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
`;

const DownloadButton = styled.button`
  background-color: #FFEAC7;
  color: #1a1a1a;
  border: none;
  padding: 1vh 1.5vw;
  border-radius: 0.8vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  font-weight: 400;
  margin-top: 1.5vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  transition: all 0.2s;

  &:hover {
    background-color: #FFB942;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 2vh;
  right: 2vw;
  background-color: #4CAF50;
  color: white;
  padding: 1.5vh 2vw;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${props => props.show ? fadeIn : fadeOut} 0.3s ease-in-out;
  display: ${props => props.show ? 'block' : 'none'};
`;

const SuccessIcon = styled.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`;

const MonthDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MonthDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5vh);
  right: 0;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 10vw;
  max-height: 30vh;
  overflow-y: auto;
  display: ${props => props.show ? 'block' : 'none'};
  animation: ${props => props.show ? fadeIn : fadeOut} 0.2s ease-in-out;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MonthDropdownItem = styled.div`
  padding: 1vh 1.2vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #FFEAC7;
  }

  ${props => props.selected && `
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`;

const YearDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const YearDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5vh);
  right: 0;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 10vw;
  max-height: 30vh;
  overflow-y: auto;
  display: ${props => props.show ? 'block' : 'none'};
  animation: ${props => props.show ? fadeIn : fadeOut} 0.2s ease-in-out;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const YearDropdownItem = styled.div`
  padding: 1vh 1.2vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #FFEAC7;
  }

  ${props => props.selected && `
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`;

const Fee = () => {
  const { students, getFilteredStudents } = useStudents();
  const { academicYears, selectedAcademicYear } = useAcademicYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [feesData, setFeesData] = useState(null);
  const [feesList, setFeesList] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(Math.max(currentYear, 2025));
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const PAYMENT_MODE_CHOICES = [
    { value: 'cash', label: 'Cash' },
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Card' },
    { value: 'cheque', label: 'Cheque' },
  ];

  // Form state
  const [formData, setFormData] = useState({
    student: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    turn: '',
    payment_mode: 'cash',
    transaction_number: '',
    bank_name_id: '',
    academic_year_id: ''
  });

  // Student search state
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedFee, setSelectedFee] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loadingTerms, setLoadingTerms] = useState(false);

  const normalizeValue = (value) => (value ?? '').toString().trim().toLowerCase();

  const getStudentClassSection = (student) => {
    const className =
      student?.class_name?.name ||
      student?.class_name ||
      student?.class ||
      student?.student_class ||
      'N/A';
    const sectionName =
      student?.section?.name ||
      student?.section_name ||
      student?.section ||
      'N/A';

    return { className, sectionName };
  };

  const getStudentDisplayLabel = (student) => {
    const { className, sectionName } = getStudentClassSection(student);
    return `${student.name} (${student.admission_no}) - Class ${className} / Section ${sectionName}`;
  };

  const rankedFilteredStudents = useMemo(() => {
    if (!Array.isArray(filteredStudents)) return [];

    const query = normalizeValue(studentSearchTerm);
    const withRank = filteredStudents.map((student, index) => {
      if (!query) return { student, score: 2, index };

      const { className, sectionName } = getStudentClassSection(student);
      const name = normalizeValue(student.name);
      const admissionNo = normalizeValue(student.admission_no);
      const classLabel = normalizeValue(className);
      const sectionLabel = normalizeValue(sectionName);
      const fullLabel = normalizeValue(
        `${student.name} ${student.admission_no} ${className} ${sectionName}`
      );

      let score = 999;
      if (name.startsWith(query) || admissionNo.startsWith(query)) score = 0;
      else if (
        name.includes(query) ||
        admissionNo.includes(query) ||
        classLabel.includes(query) ||
        sectionLabel.includes(query)
      ) {
        score = 1;
      } else if (fullLabel.includes(query)) {
        score = 2;
      }

      return { student, score, index };
    });

    return withRank
      .filter((item) => item.score < 999)
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, 50)
      .map((item) => item.student);
  }, [filteredStudents, studentSearchTerm]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹');
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If the date is invalid, try to parse it differently
        const parts = dateString.split('-');
        if (parts.length === 3) {
          // Handle YYYY-MM-DD format
          const [year, month, day] = parts;
          const newDate = new Date(year, month - 1, day);
          if (!isNaN(newDate.getTime())) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return newDate.toLocaleDateString('en-US', options);
          }
        }
        return dateString; // Return original if parsing fails
      }
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original if formatting fails
    }
  };

  const getMonthName = (monthNumber) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchFeesData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get('https://spoorthischool.genzix.space/masters/fees-collection/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFeesData(response.data.data);
    } catch (error) {
      console.error('Error fetching fees data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeesList = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get('https://spoorthischool.genzix.space/masters/fees/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFeesList(response.data.data);
      setFilteredFees(response.data.data);
    } catch (error) {
      console.error('Error fetching fees list:', error);
    } finally {
      setLoading(false);
    }
  };



  const fetchBankAccounts = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.get('https://spoorthischool.genzix.space/masters/bank/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  useEffect(() => {
    const filtered = getFilteredStudents({
      searchTerm: studentSearchTerm
    });
    setFilteredStudents(filtered);
  }, [studentSearchTerm, students, getFilteredStudents]);

  useEffect(() => {
    let filtered = feesList;

    // Apply display mode filter first
    if (displayMode === 'day') {
      filtered = feesList.filter(fee => {
        try {
          const feeDate = new Date(fee.payment_date);
          if (isNaN(feeDate.getTime())) return false;
          const feeDateString = feeDate.toISOString().split('T')[0];
          return feeDateString === selectedDate;
        } catch (error) {
          return false;
        }
      });
    } else if (displayMode === 'month') {
      filtered = feesList.filter(fee => {
        try {
          const feeDate = new Date(fee.payment_date);
          if (isNaN(feeDate.getTime())) return false;
          const feeYear = feeDate.getFullYear();
          const feeMonth = feeDate.getMonth() + 1;
          return feeYear === selectedYear && feeMonth === selectedMonth;
        } catch (error) {
          return false;
        }
      });
    } else if (displayMode === 'year') {
      filtered = feesList.filter(fee => {
        try {
          const feeDate = new Date(fee.payment_date);
          if (isNaN(feeDate.getTime())) return false;
          return feeDate.getFullYear() === selectedYear;
        } catch (error) {
          return false;
        }
      });
    }

    // Then apply search filter if any
    if (searchTerm) {
      filtered = filtered.filter(fee => {
        const searchLower = searchTerm.toLowerCase().trim();
        const studentName = fee.student_name ? fee.student_name.toLowerCase() : '';
        const paymentDate = formatDate(fee.payment_date).toLowerCase();
        const receiptNo = fee.receipt_no ? fee.receipt_no.toString().toLowerCase() : '';

        return (
          studentName.includes(searchLower) ||
          paymentDate.includes(searchLower) ||
          receiptNo.includes(searchLower)
        );
      });
    }

    setFilteredFees(filtered);
  }, [searchTerm, feesList, displayMode, selectedDate, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchFeesData();
    fetchFeesList();
    fetchBankAccounts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMonthDropdown && !event.target.closest('.month-dropdown-container')) {
        setShowMonthDropdown(false);
      }
      if (showYearDropdown && !event.target.closest('.year-dropdown-container')) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMonthDropdown, showYearDropdown]);



  const getCurrentMonthAmount = () => {
    if (!feesData) return '₹0';

    const currentMonthData = feesData.monthly_collection.find(
      item => item.month === getMonthName(selectedMonth) && item.year === selectedYear
    );

    return currentMonthData ? formatCurrency(currentMonthData.total) : '₹0';
  };

  const getCurrentYearAmount = () => {
    if (!feesData) return '₹0';

    // Calculate year amount from fees list for selected year
    if (feesList && Array.isArray(feesList)) {
      const yearFees = feesList.filter(fee => {
        try {
          const feeDate = new Date(fee.payment_date);
          if (isNaN(feeDate.getTime())) return false;
          return feeDate.getFullYear() === selectedYear;
        } catch (error) {
          return false;
        }
      });

      const totalYear = yearFees.reduce((sum, fee) => {
        const amount = parseFloat(fee.amount) || 0;
        return sum + amount;
      }, 0);

      return formatCurrency(totalYear);
    }

    // Fallback to API data if available (only for current year)
    if (selectedYear === currentYear && feesData.yearly_revenue) {
      return formatCurrency(feesData.yearly_revenue);
    }

    return '₹0';
  };

  const getCurrentDayAmount = () => {
    if (!feesData) return '₹0';

    // If displayMode is 'day', use selectedDate instead of today
    const targetDate = displayMode === 'day' ? selectedDate : new Date().toISOString().split('T')[0];
    const targetDateObj = new Date(targetDate);
    const targetDay = targetDateObj.getDate();
    const targetMonth = targetDateObj.getMonth() + 1;
    const targetYear = targetDateObj.getFullYear();

    // First try to get from API daily collection data
    if (feesData.daily_collection && Array.isArray(feesData.daily_collection)) {
      const currentDayData = feesData.daily_collection.find(
        item => item.day === targetDay && item.month === getMonthName(targetMonth) && item.year === targetYear
      );

      if (currentDayData) {
        return formatCurrency(currentDayData.total);
      }
    }

    // Fallback: Calculate from fees list
    if (feesList && Array.isArray(feesList)) {
      const targetFees = feesList.filter(fee => {
        try {
          const feeDate = new Date(fee.payment_date);
          if (isNaN(feeDate.getTime())) {
            return false; // Skip invalid dates
          }
          const feeDateString = feeDate.toISOString().split('T')[0];
          return feeDateString === targetDate;
        } catch (error) {
          console.error('Error parsing fee date:', error);
          return false;
        }
      });

      const totalTarget = targetFees.reduce((sum, fee) => {
        const amount = parseFloat(fee.amount) || 0;
        return sum + amount;
      }, 0);

      return formatCurrency(totalTarget);
    }

    return '₹0';
  };

  const downloadExcelForDate = () => {
    try {
      // Get the target date based on display mode
      let targetDate;
      let fileName;

      if (displayMode === 'day') {
        targetDate = selectedDate;
        const dateObj = new Date(selectedDate);
        fileName = `Fees_${dateObj.toISOString().split('T')[0]}`;
      } else if (displayMode === 'month') {
        fileName = `Fees_${selectedYear}_${selectedMonth.toString().padStart(2, '0')}`;
        // For month, we'll filter by month and year
        targetDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`;
      } else if (displayMode === 'year') {
        fileName = `Fees_${selectedYear}`;
        targetDate = selectedYear.toString();
      }

      // Filter fees based on the selected date/mode
      let filteredFees = [];

      if (displayMode === 'day') {
        filteredFees = feesList.filter(fee => {
          try {
            const feeDate = new Date(fee.payment_date);
            if (isNaN(feeDate.getTime())) return false;
            const feeDateString = feeDate.toISOString().split('T')[0];
            return feeDateString === targetDate;
          } catch (error) {
            return false;
          }
        });
      } else if (displayMode === 'month') {
        filteredFees = feesList.filter(fee => {
          try {
            const feeDate = new Date(fee.payment_date);
            if (isNaN(feeDate.getTime())) return false;
            const feeYear = feeDate.getFullYear();
            const feeMonth = feeDate.getMonth() + 1;
            return feeYear === selectedYear && feeMonth === selectedMonth;
          } catch (error) {
            return false;
          }
        });
      } else if (displayMode === 'year') {
        filteredFees = feesList.filter(fee => {
          try {
            const feeDate = new Date(fee.payment_date);
            if (isNaN(feeDate.getTime())) return false;
            return feeDate.getFullYear() === selectedYear;
          } catch (error) {
            return false;
          }
        });
      }

      if (filteredFees.length === 0) {
        alert('No fees found for the selected period.');
        return;
      }

      // Prepare data for Excel
      const excelData = filteredFees.map(fee => ({
        'Receipt No': fee.receipt_no || 'N/A',
        'Student Name': fee.student_name,
        'Payment Date': formatDate(fee.payment_date),
        'Amount': fee.amount,
        'Term': fee.turn,
        'Payment Mode': fee.payment_mode.charAt(0).toUpperCase() + fee.payment_mode.slice(1),
        'Transaction Number': fee.transaction_number || 'N/A',
        'Bank Name': fee.bank_name?.name || 'N/A'
      }));

      // Add summary row
      const totalAmount = filteredFees.reduce((sum, fee) => sum + (parseFloat(fee.amount) || 0), 0);
      const summaryRow = {
        'Receipt No': 'TOTAL',
        'Student Name': '',
        'Payment Date': '',
        'Amount': totalAmount,
        'Term': '',
        'Payment Mode': '',
        'Transaction Number': '',
        'Bank Name': ''
      };

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([...excelData, summaryRow]);

      // Set column widths
      const colWidths = [
        { wch: 15 }, // Receipt No
        { wch: 25 }, // Student Name
        { wch: 15 }, // Payment Date
        { wch: 12 }, // Amount
        { wch: 8 },  // Term
        { wch: 15 }, // Payment Mode
        { wch: 20 }, // Transaction Number
        { wch: 20 }  // Bank Name
      ];
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Fees Report');

      // Generate and download file
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      // Show success message
      setSuccessMessage('Excel file downloaded successfully!');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert('Failed to generate Excel file. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentSelect = async (student) => {
    // Reset form data first
    setFormData(prev => ({
      ...prev,
      student: student.id,
      turn: '',
      amount: ''
    }));
    setStudentSearchTerm(getStudentDisplayLabel(student));
    setShowStudentDropdown(false);
    setFormErrors(prev => ({ ...prev, student: null }));
    setLoadingTerms(true);

    // Fetch pending fee terms for the selected student
    try {
      const token = getToken();
      if (!token) {
        setSelectedStudent({ ...student, fee_terms: [] });
        setLoadingTerms(false);
        return;
      }

      const response = await axios.get(`https://spoorthischool.genzix.space/masters/students/${student.id}/term-pending-fees/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data && response.data.data && response.data.data.terms) {
        // Filter out terms with pending_amount = 0
        const pendingTerms = response.data.data.terms.filter(term => term.pending_amount > 0);

        // Set the complete student object with fee terms
        setSelectedStudent({
          ...student,
          fee_terms: pendingTerms
        });
      } else if (response.data && response.data.data) {
        // Try to find terms in different possible locations
        const terms = response.data.data.terms || response.data.data.fee_terms || [];
        const pendingTerms = terms.filter(term => term.pending_amount > 0);

        setSelectedStudent({
          ...student,
          fee_terms: pendingTerms
        });
      } else {
        // No terms data in response
        setSelectedStudent({
          ...student,
          fee_terms: []
        });
      }
    } catch (error) {
      console.error('Error fetching pending fee terms:', error);
      // If API fails, set student with empty terms array
      setSelectedStudent({
        ...student,
        fee_terms: []
      });
    } finally {
      setLoadingTerms(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedStudent || !formData.student) {
      errors.student = 'Please select a student';
    }

    if (!formData.turn) {
      errors.turn = 'Please select a term';
    }

    if (!formData.amount) {
      errors.amount = 'Please enter an amount';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid amount';
    }

    if (!formData.payment_date) {
      errors.payment_date = 'Please select a payment date';
    }

    if (!formData.payment_mode) {
      errors.payment_mode = 'Please select a payment mode';
    }

    if (formData.payment_mode !== 'cash') {
      if (!formData.transaction_number) {
        errors.transaction_number = 'Please enter transaction number';
      }
      if (!formData.bank_name_id) {
        errors.bank_name_id = 'Please select a bank';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateAndDownloadReceipt = async (receiptData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a new instance of the receipt component
        const receiptComponent = <FeeReceipt data={receiptData} />;

        // Generate PDF
        const pdfDoc = await pdf(receiptComponent);
        const pdfBlob = await pdfDoc.toBlob();

        // Create a new URL for the blob
        const url = window.URL.createObjectURL(pdfBlob);

        // Create a new window for download
        const downloadWindow = window.open(url, '_blank');

        if (downloadWindow) {
          // If window.open was successful
          const formattedDate = new Date(receiptData.originalDate).toISOString().split('T')[0]; // YYYY-MM-DD format
          downloadWindow.document.title = `Fee_Receipt_${receiptData.studentName}_${formattedDate}`;

          // Create download link
          const link = document.createElement('a');
          link.href = url;
          link.download = `Fee_Receipt_${receiptData.studentName}_${formattedDate}.pdf`;

          // Add link to the new window and trigger download
          downloadWindow.document.body.appendChild(link);
          link.click();

          // Close the window after download starts
          setTimeout(() => {
            downloadWindow.close();
            window.URL.revokeObjectURL(url);
            resolve();
          }, 1000);
        } else {
          // If window.open was blocked, try direct download
          const formattedDate = new Date(receiptData.originalDate).toISOString().split('T')[0]; // YYYY-MM-DD format
          const link = document.createElement('a');
          link.href = url;
          link.download = `Fee_Receipt_${receiptData.studentName}_${formattedDate}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Cleanup
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            resolve();
          }, 1000);
        }
      } catch (error) {
        console.error('Error generating receipt:', error);
        reject(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    let paymentSuccessful = false;

    try {
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      // Prepare payload based on payment mode
      const finalAcademicYearId = formData.academic_year_id || selectedAcademicYear?.id;
      const payload = {
        student: formData.student,
        amount: parseFloat(formData.amount),
        payment_date: formData.payment_date,
        turn: parseInt(formData.turn),
        payment_mode: formData.payment_mode,
        academic_year_id: finalAcademicYearId
      };

      // Only include transaction_number and bank details if payment mode is not cash
      if (formData.payment_mode !== 'cash') {
        payload.transaction_number = formData.transaction_number;
        payload.bank_account = formData.bank_name_id;
      }

      const response = await axios.post('https://spoorthischool.genzix.space/masters/fees/', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        paymentSuccessful = true;

        // Calculate remaining balance after this payment
        const currentPaymentAmount = parseFloat(formData.amount) || 0;
        const totalPendingBeforePayment = selectedStudent.fee_terms.reduce((sum, term) => sum + term.pending_amount, 0);
        const remainingBalance = totalPendingBeforePayment - currentPaymentAmount;

        // Prepare receipt data
        const receiptData = {
          receiptNo: response.data.data.receipt_no,
          transactionId: response.data.data.transaction_number,
          studentName: selectedStudent.name,
          admissionNo: selectedStudent.admission_no,
          group: selectedStudent.group || 'N/A',
          batch: selectedStudent.batch || 'N/A',
          fatherName: selectedStudent.father_name || 'N/A',
          paymentDate: formatDate(formData.payment_date),
          originalDate: formData.payment_date, // Add original date for filename
          paymentMode: formData.payment_mode.charAt(0).toUpperCase() + formData.payment_mode.slice(1),
          term: formData.turn,
          amount: formData.amount,
          remainingBalance: remainingBalance > 0 ? `₹${remainingBalance.toFixed(2)}` : '₹0.00',
          academicYear: '2025-2026',
          feeDetails: [
            {
              particulars: `Term ${formData.turn} Fee`,
              amount: formData.amount
            }
          ]
        };

        // Refresh data after successful submission
        await Promise.all([
          fetchFeesList(),
          fetchFeesData()
        ]);

        // Reset form
        setFormData({
          student: '',
          amount: '',
          payment_date: new Date().toISOString().split('T')[0],
          turn: '',
          payment_mode: 'cash',
          transaction_number: '',
          bank_name_id: '',
          academic_year_id: ''
        });
        setSelectedStudent(null);
        setStudentSearchTerm('');
        setFormErrors({});

        // Show success message
        setSuccessMessage('Fee payment recorded successfully!');
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

        // Generate and download receipt after successful payment
        try {
          await generateAndDownloadReceipt(receiptData);
        } catch (pdfError) {
          console.error('Error generating PDF:', pdfError);
          alert('Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.');
        }
      }

    } catch (error) {
      console.error('Error submitting fee payment:', error);
      let errorMessage = 'Failed to record fee payment. Please try again.';

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonStyle = {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    width: 'auto',
    padding: '1.2vh 1vw',
    backgroundColor: 'transparent',
    border: '1px solid #000000',
    color: '#000000',
    borderRadius: '0.6vw',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.8vw',
    letterSpacing: '1px',
    cursor: 'pointer'
  };

  const highlightedButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FFEAC7'
  };

  const uploadButtonStyle = {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    width: '12vw',
    height: "5.5vh",
    padding: '1vh 0.7vw',
    backgroundColor: '#FFEAC7',
    border: 'none',
    color: '#000000',
    borderRadius: '3vw',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.8vw',
    letterSpacing: '1px',
    cursor: 'pointer'
  };

  const AddStudentText2 = styled.div`
    font-family: "Roboto", sans-serif;
    font-size: 0.8vw;
    margin-top: 2vh;
    font-weight: 400;
    margin-right: 0.1vw;
    color: #000000;
    letter-spacing: 0.7px;
    transition: all 0.2s;
  `;

  const handleFeeClick = (fee) => {
    setSelectedFee(fee);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedFee(null);
  };

  const handleDownloadReceipt = async (fee) => {
    try {
      // Fetch student details for the receipt
      const token = getToken();
      const studentResponse = await axios.get(`https://spoorthischool.genzix.space/masters/students/${fee.student}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const student = studentResponse.data.data;

      // Fetch current pending fees to calculate remaining balance
      let remainingBalance = 'N/A';
      try {
        const pendingResponse = await axios.get(`https://spoorthischool.genzix.space/masters/students/${fee.student}/term-pending-fees/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (pendingResponse.data && pendingResponse.data.data && pendingResponse.data.data.terms) {
          const totalPending = pendingResponse.data.data.terms.reduce((sum, term) => sum + term.pending_amount, 0);
          remainingBalance = totalPending > 0 ? `₹${totalPending.toFixed(2)}` : '₹0.00';
        }
      } catch (pendingError) {
        console.error('Error fetching pending fees:', pendingError);
        // Keep remainingBalance as 'N/A' if we can't fetch the data
      }

      // Prepare receipt data
      const receiptData = {
        receiptNo: fee.receipt_no,
        transactionId: fee.transaction_number,
        studentName: student.name,
        admissionNo: student.admission_no,
        group: student.group || 'N/A',
        batch: student.batch || 'N/A',
        fatherName: student.father_name || 'N/A',
        paymentDate: formatDate(fee.payment_date),
        originalDate: fee.payment_date, // Use original date for filename
        paymentMode: fee.payment_mode.charAt(0).toUpperCase() + fee.payment_mode.slice(1),
        term: fee.turn,
        amount: fee.amount,
        remainingBalance: remainingBalance,
        academicYear: '2025-2026',
        feeDetails: [
          {
            particulars: `Term ${fee.turn} Fee`,
            amount: fee.amount
          }
        ]
      };

      // Create a new instance of the receipt component
      const receiptComponent = <FeeReceipt data={receiptData} />;

      // Generate PDF
      const pdfDoc = await pdf(receiptComponent);
      const pdfBlob = await pdfDoc.toBlob();

      // Create a new URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a new window for download
      const downloadWindow = window.open(url, '_blank');

      if (downloadWindow) {
        // If window.open was successful
        const formattedDate = new Date(receiptData.originalDate).toISOString().split('T')[0]; // YYYY-MM-DD format
        downloadWindow.document.title = `Fee_Receipt_${student.name}_${formattedDate}`;

        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `Fee_Receipt_${student.name}_${formattedDate}.pdf`;

        // Add link to the new window and trigger download
        downloadWindow.document.body.appendChild(link);
        link.click();

        // Close the window after download starts
        setTimeout(() => {
          downloadWindow.close();
          window.URL.revokeObjectURL(url);
        }, 1000);
      } else {
        // If window.open was blocked, try direct download
        const formattedDate = new Date(receiptData.originalDate).toISOString().split('T')[0]; // YYYY-MM-DD format
        const link = document.createElement('a');
        link.href = url;
        link.download = `Fee_Receipt_${student.name}_${formattedDate}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ height: ' 75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </div>
    );
  }

  return (
    <DashboardContainer>
      <SuccessMessage show={showSuccess}>
        <SuccessIcon>✓</SuccessIcon>
        {successMessage}
      </SuccessMessage>

      <Container>
        <RevenuneContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'start', marginBottom: '0.45vh' }}>
              <Logo>Fees Collection</Logo>
              <AddStudentText>({
                displayMode === 'day' ? (selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : formatDate(selectedDate)) :
                  displayMode === 'month' ? `${getMonthName(selectedMonth)} ${selectedYear}` :
                    selectedYear
              })</AddStudentText>
            </div>
            <AddStudentText1>
              {feesData ?
                (displayMode === 'month' ? getCurrentMonthAmount() : displayMode === 'year' ? getCurrentYearAmount() : getCurrentDayAmount())
                : '₹0'}
            </AddStudentText1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', justifyContent: 'end' }}>
              {displayMode === 'day' && (
                <DateInput
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              )}
              <button
                style={displayMode === 'day' ? highlightedButtonStyle : buttonStyle}
                onClick={() => {
                  setDisplayMode('day');
                  setSelectedDate(new Date().toISOString().split('T')[0]);
                }}
              >
                Today
              </button>
              <MonthDropdownContainer className="month-dropdown-container">
                <button
                  style={displayMode === 'month' ? highlightedButtonStyle : buttonStyle}
                  onClick={() => {
                    setDisplayMode('month');
                    setShowMonthDropdown(!showMonthDropdown);
                  }}
                >
                  {getMonthName(selectedMonth)}
                </button>
                <MonthDropdown show={showMonthDropdown && displayMode === 'month'}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(monthNum => (
                    <MonthDropdownItem
                      key={monthNum}
                      selected={monthNum === selectedMonth}
                      onClick={() => {
                        setSelectedMonth(monthNum);
                        setShowMonthDropdown(false);
                      }}
                    >
                      {getMonthName(monthNum)}
                    </MonthDropdownItem>
                  ))}
                </MonthDropdown>
              </MonthDropdownContainer>
              <YearDropdownContainer className="year-dropdown-container">
                <button
                  style={displayMode === 'year' ? highlightedButtonStyle : buttonStyle}
                  onClick={() => {
                    setDisplayMode('year');
                    setShowYearDropdown(!showYearDropdown);
                  }}
                >
                  {selectedYear}
                </button>
                <YearDropdown show={showYearDropdown && displayMode === 'year'}>
                  {Array.from({ length: Math.max(1, currentYear - 2025 + 1) }, (_, i) => 2025 + i).map(year => (
                    <YearDropdownItem
                      key={year}
                      selected={year === selectedYear}
                      onClick={() => {
                        setSelectedYear(year);
                        setShowYearDropdown(false);
                      }}
                    >
                      {year}
                    </YearDropdownItem>
                  ))}
                </YearDropdown>
              </YearDropdownContainer>
            </div>
            <button
              style={uploadButtonStyle}
              onClick={downloadExcelForDate}
            >
              Download Excel
            </button>
          </div>
        </RevenuneContainer>

        <RevenuneContainer1>
          <SearchContainer>
            <SearchIcon src={searchIcon} />
            <SearchInput
              type="text"
              placeholder="Search by date, student name, or receipt number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <AddStudentText2>Recent Payments</AddStudentText2>

          <FeesRecordsList>
            {filteredFees.length > 0 ? (
              [...filteredFees].reverse().map((fee) => (
                <FeeRecordItem
                  key={fee.id}
                  onClick={() => handleFeeClick(fee)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    <RecordDetail>
                      {formatDate(fee.payment_date)} - {fee.student_name}
                    </RecordDetail>
                  </div>
                  <RecordDetail>{formatCurrency(fee.amount)}</RecordDetail>
                </FeeRecordItem>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2vh 0',
                fontFamily: 'Roboto, sans-serif',
                margin: 'auto'
              }}>
                No fees records found
              </div>
            )}
          </FeesRecordsList>
        </RevenuneContainer1>
      </Container>

      <Container>
        <RevenuneContainer2>
          <AddStudentText3 style={{ marginBottom: '3vh' }}>Add Fee</AddStudentText3>

          <FormContainer>
            <FormGroup>
              <FormLabel>Academic Year*</FormLabel>
              <FormSelect
                name="academic_year_id"
                value={formData.academic_year_id || selectedAcademicYear?.id || ''}
                onChange={handleInputChange}
                style={{ borderColor: formErrors.academic_year_id ? '#ff4444' : '#ccc' }}
                required
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((ay) => (
                  <option key={ay.id} value={ay.id}>
                    {ay.name}
                  </option>
                ))}
              </FormSelect>
              {formErrors.academic_year_id && <ErrorMessage>{formErrors.academic_year_id}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Student*</FormLabel>
              <StudentDropdown>
                <FormInput
                  type="text"
                  style={{ width: '100%', borderColor: formErrors.student ? '#ff4444' : '#ccc' }}
                  placeholder="Search by student name or admission no"
                  value={studentSearchTerm}
                  onChange={(e) => {
                    setStudentSearchTerm(e.target.value);
                    setShowStudentDropdown(true);
                    if (selectedStudent) {
                      setFormErrors(prev => ({ ...prev, student: null }));
                    }
                  }}
                  onFocus={() => setShowStudentDropdown(true)}
                />
                {formErrors.student && <ErrorMessage>{formErrors.student}</ErrorMessage>}
                {showStudentDropdown && rankedFilteredStudents.length > 0 && (
                  <DropdownList>
                    {rankedFilteredStudents.map(student => (
                      <DropdownItem
                        key={student.id}
                        onClick={() => handleStudentSelect(student)}
                      >
                        {getStudentDisplayLabel(student)}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </StudentDropdown>
              {selectedStudent && (
                <div style={{
                  marginTop: '0.5vh',
                  fontSize: '0.7vw',
                  color: '#666',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  {loadingTerms ? (
                    'Loading pending terms...'
                  ) : selectedStudent.fee_terms ? (
                    selectedStudent.fee_terms.length > 0 ? (
                      `Total pending: ₹${selectedStudent.fee_terms.reduce((sum, term) => sum + term.pending_amount, 0).toFixed(2)}`
                    ) : (
                      'No pending terms available'
                    )
                  ) : (
                    'Student selected'
                  )}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Term*</FormLabel>
              <FormSelect
                name="turn"
                value={formData.turn}
                onChange={(e) => {
                  handleInputChange(e);
                  if (formErrors.turn) {
                    setFormErrors(prev => ({ ...prev, turn: null }));
                  }

                  // Auto-populate amount with pending amount for selected term
                  if (e.target.value) {
                    const selectedTerm = selectedStudent?.fee_terms?.find(term => term.term === parseInt(e.target.value));
                    if (selectedTerm) {
                      setFormData(prev => ({
                        ...prev,
                        amount: selectedTerm.pending_amount.toString()
                      }));
                    }
                  }
                }}
                style={{ borderColor: formErrors.turn ? '#ff4444' : '#ccc' }}
                disabled={loadingTerms || !selectedStudent}
                required
              >
                <option value="">
                  {loadingTerms ? 'Loading terms...' :
                    !selectedStudent ? 'Select a student first' :
                      selectedStudent?.fee_terms?.length === 0 ? 'No pending terms available' :
                        `Select Term (${selectedStudent?.fee_terms?.length || 0} available)`}
                </option>
                {selectedStudent?.fee_terms?.map(term => (
                  <option key={term.term} value={term.term}>
                    Term {term.term} (₹{term.pending_amount.toFixed(2)} pending)
                  </option>
                ))}
              </FormSelect>
              {formErrors.turn && <ErrorMessage>{formErrors.turn}</ErrorMessage>}
              {selectedStudent && selectedStudent.fee_terms && selectedStudent.fee_terms.length === 0 && !loadingTerms && (
                <ErrorMessage>No pending fee terms available for this student</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Amount*</FormLabel>
              <FormInput
                type="number"
                name="amount"
                value={formData.amount}
                onChange={(e) => {
                  handleInputChange(e);
                  if (formErrors.amount) {
                    setFormErrors(prev => ({ ...prev, amount: null }));
                  }
                }}
                placeholder={!selectedStudent ? 'Select a student first' : 'Enter amount'}
                style={{ borderColor: formErrors.amount ? '#ff4444' : '#ccc' }}
                disabled={!selectedStudent}
                required
              />
              {formErrors.amount && <ErrorMessage>{formErrors.amount}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Payment Date*</FormLabel>
              <FormInput
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={(e) => {
                  handleInputChange(e);
                  if (formErrors.payment_date) {
                    setFormErrors(prev => ({ ...prev, payment_date: null }));
                  }
                }}
                style={{ borderColor: formErrors.payment_date ? '#ff4444' : '#ccc' }}
                required
              />
              {formErrors.payment_date && <ErrorMessage>{formErrors.payment_date}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Payment Mode*</FormLabel>
              <FormSelect
                name="payment_mode"
                value={formData.payment_mode}
                onChange={(e) => {
                  handleInputChange(e);
                  if (formErrors.payment_mode) {
                    setFormErrors(prev => ({ ...prev, payment_mode: null }));
                  }
                }}
                style={{ borderColor: formErrors.payment_mode ? '#ff4444' : '#ccc' }}
                required
              >
                {PAYMENT_MODE_CHOICES.map(mode => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </FormSelect>
              {formErrors.payment_mode && <ErrorMessage>{formErrors.payment_mode}</ErrorMessage>}
            </FormGroup>

            {formData.payment_mode !== 'cash' && (
              <>
                <FormGroup>
                  <FormLabel>Transaction Number*</FormLabel>
                  <FormInput
                    type="text"
                    name="transaction_number"
                    value={formData.transaction_number}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.transaction_number) {
                        setFormErrors(prev => ({ ...prev, transaction_number: null }));
                      }
                    }}
                    placeholder="Enter transaction number"
                    style={{ borderColor: formErrors.transaction_number ? '#ff4444' : '#ccc' }}
                    required
                  />
                  {formErrors.transaction_number && <ErrorMessage>{formErrors.transaction_number}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Bank*</FormLabel>
                  <FormSelect
                    name="bank_name_id"
                    value={formData.bank_name_id}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.bank_name_id) {
                        setFormErrors(prev => ({ ...prev, bank_name_id: null }));
                      }
                    }}
                    style={{ borderColor: formErrors.bank_name_id ? '#ff4444' : '#ccc' }}
                    required
                  >
                    <option value="">Select Bank</option>
                    {bankAccounts.map(bank => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name} ({bank.code})
                      </option>
                    ))}
                  </FormSelect>
                  {formErrors.bank_name_id && <ErrorMessage>{formErrors.bank_name_id}</ErrorMessage>}
                </FormGroup>
              </>
            )}

            <FormButton
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ButtonSpinner />
                  Recording Payment...
                </>
              ) : (
                'Record Payment'
              )}
            </FormButton>
          </FormContainer>
        </RevenuneContainer2>
      </Container>

      {showDialog && selectedFee && (
        <Dialog onClick={handleCloseDialog}>
          <DialogContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={handleCloseDialog}>&times;</CloseButton>
            <DialogTitle>Fee Details</DialogTitle>

            <DialogRow>
              <DialogDetail>
                <DialogLabel>Student Name</DialogLabel>
                <DialogValue>{selectedFee.student_name}</DialogValue>
              </DialogDetail>
              <DialogDetail>
                <DialogLabel>Amount</DialogLabel>
                <DialogValue>{formatCurrency(selectedFee.amount)}</DialogValue>
              </DialogDetail>
            </DialogRow>

            <DialogRow>
              <DialogDetail>
                <DialogLabel>Payment Date</DialogLabel>
                <DialogValue>{formatDate(selectedFee.payment_date)}</DialogValue>
              </DialogDetail>
              <DialogDetail>
                <DialogLabel>Term</DialogLabel>
                <DialogValue>{selectedFee.turn}</DialogValue>
              </DialogDetail>
            </DialogRow>

            <DialogRow>
              <DialogDetail>
                <DialogLabel>Payment Mode</DialogLabel>
                <DialogValue>{selectedFee.payment_mode.charAt(0).toUpperCase() + selectedFee.payment_mode.slice(1)}</DialogValue>
              </DialogDetail>
              {selectedFee.transaction_number && (
                <DialogDetail>
                  <DialogLabel>Transaction No</DialogLabel>
                  <DialogValue>{selectedFee.transaction_number}</DialogValue>
                </DialogDetail>
              )}
            </DialogRow>

            {selectedFee.receipt_no && (
              <DialogRow>
                <DialogDetail>
                  <DialogLabel>Receipt No</DialogLabel>
                  <DialogValue>{selectedFee.receipt_no}</DialogValue>
                </DialogDetail>
              </DialogRow>
            )}

            {selectedFee.bank_name && (
              <DialogRow>
                <DialogDetail>
                  <DialogLabel>Bank</DialogLabel>
                  <DialogValue>{selectedFee.bank_name.name}</DialogValue>
                </DialogDetail>
              </DialogRow>
            )}

            <DownloadButton onClick={() => handleDownloadReceipt(selectedFee)}>
              Download Receipt
            </DownloadButton>
          </DialogContent>
        </Dialog>
      )}
    </DashboardContainer>
  );
};

export default Fee;