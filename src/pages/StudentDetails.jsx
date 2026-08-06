import { API_BASE_URL } from '@/config/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Arrow from '../assets/arrow.svg';
import Add from '../assets/add.svg';
import AddStudentDialog from './Dailog/AddStudentDialog';
import TestMarksDialog from './Dailog/TestMarksDialog';
import { normalizeStudentRecord } from '../utils/bulkUploadUtils';
import { fetchTermPendingFees, getOverallPendingFromTerms } from '../utils/feeApi';

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
  border-top-color: var(--color-primary);
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${pulse} 1.5s ease-in-out infinite;
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

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FEA592;
  display: flex;
  cursor: pointer;
  position: fixed;
  top: 3vh;
  border: 1px solid #FEA592;
  align-items: center;
  z-index: 999;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }
`;

const CircleIconContainer1 = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  var(--color-primary);
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-secondary);
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  background-color: #EFEFEF;
  min-height: 90vh;
  transition: all 0.3s ease;
  position: relative;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  margin-top: 4vh;
  margin-bottom: 4vh;
  gap: 15px;
  background: #EFEFEF;
  border-radius: 10px;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 500;
  color: #000000;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: grey;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({ status }) => status === 'admission' ? '#BEFFB6' : '#FEA592'};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
   letter-spacing: 1px;
  font-weight: 500;
  display: inline-block;
  transition: all 0.2s;
`;

const StatusBadge1 = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({ status }) => {
    switch (status) {
      case 'Yes':
        return '#BEFFB6';
      case 'No':
        return '#FEB2B2';
      default:
        return '#FEB2B2'; // fallback
    }
  }};

  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 500;
  letter-spacing: 1px;
  display: inline-block;
  transition: all 0.2s;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vh;
  padding-right: 1vh;
  height: 100%;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;
`;

const CalendarTitle = styled.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  margin-left: 2vw;
  font-weight: 700;
  color: #000000;
`;

const MonthSelect = styled.select`
  padding: 0.5vh 0.4vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
`;

const YearSelect = styled.select`
   padding: 0.5vh 0.2vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  margin-left: 0.5vw;
`;

const WeekdaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5vh;
  padding: 0 0.5vw; 
`;

const Weekday = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
  display: flex;
  justify-content: center; // Center the weekday text
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5vh;
  padding: 0 0.5vw; // Add matching padding
  margin-bottom: -2vh; 
`;

const Day = styled.div`
  text-align: center;
  padding: 1vh 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  width: 1.6vw;
  height: 1.6vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto; // Center the day circle within its grid cell
  background: ${({ isToday, isPresent, isHoliday, isWeekend }) => {
    if (isPresent === true) return '#BEFFB6';
    if (isPresent === false) return '#FEB2B2';
    if (isHoliday) return '#E6E6FA';
    return 'transparent';
  }};
  color: #000;
  font-weight: 400;
`;

const SelectContainer = styled.div`
  display: flex;
  margin-right: 2vw;
  align-items: center;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 0.5vw;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.5vw;
  padding: 1vh 0;
`;

const StatItem = styled.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;

  border-radius: 1vw;
  background: #BEFFB6;
  align-items: center;
`;

const StatItem1 = styled.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;

  border-radius: 1vw;
  background: var(--color-primary-light);
  align-items: center;
`;

const StatItem2 = styled.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;

  border-radius: 1vw;
  background: #FEA592;
  align-items: center;
`;

const StatValue = styled.div`
font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
`;

const StatLabel = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
 color: #000;
`;

const StyledTh = styled.th`
  text-align: left;
   font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`;


const StyledTh1 = styled.div`
  text-align: left;
  font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.2rem;
  }
`;
const StyledTd = styled.td`
  padding:1.1vh 0.6vh;
   font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`;

const TestMarksContainer = styled.div`
  width: 48vw;
  height: 30vh;
  background-color: #fff;
  border-radius: 2vw;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 2vh 2vw;
  transition: all 0.3s ease;
  overflow-y: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 200px;
    padding: 1.5rem 1rem;
    border-radius: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    border-radius: 0.75rem;
    min-height: 180px;
  }
`;

const TestMarksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const TestMarksTitle = styled(StyledTh1)`
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ViewAllLink = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: inline-block;
  min-height: 36px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    background-color: rgba(255, 185, 66, 0.1);
  }

  &:active {
    background-color: rgba(255, 185, 66, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    min-height: 40px;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.55rem 0.9rem;
    min-height: 38px;
    border-radius: 0.4rem;
  }
`;

const TestMarksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.4vh;
  margin-top: 0.6vh;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
`;

const TestMarkItem = styled.div`
  border-radius: 1vw;
  display: flex;
  gap: 1vw;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    gap: 0.5rem;
  }
`;

const TestMarkCard = styled.div`
  display: flex;
  padding: 1.1vh 0.7vw;
  width: 100%;
  background-color: #F0F0F0;
  border-radius: 0.4vw;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    gap: 0.4rem;
  }
`;

const TestMarkInfo = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }
`;

const TestMarkScore = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  letter-spacing: 1px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    white-space: normal;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }
`;

const NoTestMarks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 1.5rem 0.75rem;
  }
`;

const BottomSection = styled.div`
  display: flex;
  gap: 2vw;
  margin-top: 2vw;
  margin-bottom: 2vw;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.75vh 1.25vw;
  background-color: var(--color-primary);
  border: none;
  border-radius: 0.45vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.75vw;
  cursor: pointer;
  letter-spacing: 0.7px;
  color: #000;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 32px;

  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    border-radius: 0.45rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 1.2rem;
    font-size: 0.85rem;
    border-radius: 0.4rem;
    min-height: 38px;
  }
`;

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [feeTerms, setFeeTerms] = useState(null);
  const [testMarks, setTestMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showTestMarksDialog, setShowTestMarksDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    holidays: 0
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  // Helper function to format test name
  const formatTestName = (testName) => {
    if (!testName) return 'Test';
    // Convert snake_case to Title Case
    return testName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const fetchTestMarks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/masters/test-marks/student/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 'success') {
        // Process and calculate total marks from subject marks
        const processedMarks = response.data.data.map(test => {
          // Ensure subject_marks exists and is an array
          if (!test.subject_marks || !Array.isArray(test.subject_marks) || test.subject_marks.length === 0) {
            return {
              ...test,
              marks_obtained: '0.00',
              total_marks: '0.00',
              overall_percentage: '0.0',
              best_subject: null,
              message_sent: false
            };
          }

          // Calculate total marks obtained and total possible marks from subject_marks
          const totalMarksObtained = test.subject_marks.reduce((sum, subject) =>
            sum + (parseFloat(subject.marks_obtained) || 0), 0
          );
          const totalPossibleMarks = test.subject_marks.reduce((sum, subject) =>
            sum + (parseFloat(subject.total_marks) || 0), 0
          );

          // Find best performing subject
          const bestSubject = test.subject_marks.reduce((best, current) => {
            const currentPercentage = totalPossibleMarks > 0 ? (parseFloat(current.marks_obtained || 0) / parseFloat(current.total_marks || 1)) * 100 : 0;
            const bestPercentage = totalPossibleMarks > 0 ? (parseFloat(best.marks_obtained || 0) / parseFloat(best.total_marks || 1)) * 100 : 0;
            return currentPercentage > bestPercentage ? current : best;
          });

          // Calculate overall percentage (avoid division by zero)
          const overallPercentage = totalPossibleMarks > 0 ? (totalMarksObtained / totalPossibleMarks) * 100 : 0;

          return {
            ...test,
            marks_obtained: totalMarksObtained.toFixed(2),
            total_marks: totalPossibleMarks.toFixed(2),
            overall_percentage: overallPercentage.toFixed(1),
            best_subject: bestSubject,
            // Add a flag to indicate if message was sent (you can modify this based on your API)
            message_sent: false // Default value, update based on your API response
          };
        });

        // Sort by date ascending (oldest first, then reverse to show newest first) and take first 4
        const sortedMarks = processedMarks
          .sort((a, b) => new Date(a.test_date) - new Date(b.test_date))
          .reverse()
          .slice(0, 4);
        setTestMarks(sortedMarks);
      }
    } catch (error) {
      console.error('Failed to fetch test marks', error);
    }
  };

  const fetchFeeTerms = async () => {
    try {
      const pendingData = await fetchTermPendingFees(id);
      setFeeTerms(pendingData);
    } catch (error) {
      console.error('Failed to fetch fee terms', error);
    }
  };

  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [studentResponse, attendanceResponse] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/masters/students/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          `${API_BASE_URL}/masters/attendance/student/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ]);

      if (studentResponse.data.status === 'success') {
        setStudent(normalizeStudentRecord(studentResponse.data.data));
      }

      if (attendanceResponse.data.status === 'success') {
        // Convert the array of attendance records into a date-keyed object for easier lookup
        const attendanceMap = {};
        attendanceResponse.data.data.forEach(record => {
          attendanceMap[record.date] = record;
        });
        setAttendance(attendanceMap);
        calculateAttendanceStats(attendanceResponse.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAttendanceStats = (attendanceData) => {
    let present = 0;
    let absent = 0;
    let holidays = 0;

    const filteredData = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === selectedMonth &&
        recordDate.getFullYear() === selectedYear
      );
    });


    filteredData.forEach(record => {
      if (record.is_holiday) {
        holidays++;
      } else if (record.is_present) {
        present++;
      } else if (record.is_present === false) {
        absent++;
      }
    });

    setAttendanceStats({
      present,
      absent,
      holidays
    });
  };

  useEffect(() => {
    if (attendance && Object.keys(attendance).length > 0) {
      const attendanceArray = Object.values(attendance);
      calculateAttendanceStats(attendanceArray);
    }
  }, [selectedMonth, selectedYear, attendance]);

  useEffect(() => {
    fetchFeeTerms();
    fetchStudentDetails();
    fetchTestMarks();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleTestMarksClick = () => {
    setShowTestMarksDialog(true);
  };

  const handleUpdateSuccess = async () => {
    fetchStudentDetails();
    fetchFeeTerms();
  };


  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
    setCurrentDate(new Date(selectedYear, newMonth, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, selectedMonth, 1));
  };

  const getAttendanceForDate = (date) => {
    // Format date as YYYY-MM-DD to match the API response format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return attendance[dateStr];
  };

  const renderDays = () => {
    const year = selectedYear;
    const month = selectedMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Adjust starting day to make Monday (1) the first day of the week
    let startingDay = firstDay.getDay() - 1;
    if (startingDay < 0) startingDay = 6; // If Sunday (0), make it 6 (last day of week)

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    let days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<Day key={`empty-${i}`}></Day>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const attendanceData = getAttendanceForDate(date);
      const isToday = isCurrentMonth && day === today.getDate();

      days.push(
        <Day
          key={`day-${day}`}
          isToday={isToday}
          isPresent={attendanceData?.is_present}
          isHoliday={attendanceData?.is_holiday}
          isWeekend={attendanceData?.is_weekend}
        >
          {day}
        </Day>
      );
    }

    return days;
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading student details...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          {error}
          <RetryButton onClick={() => window.location.reload()}>
            Retry
          </RetryButton>
        </ErrorMessage>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container>
        <ErrorMessage>
          Student not found
          <RetryButton onClick={() => window.location.reload()}>
            Retry
          </RetryButton>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <CircleIconContainer onClick={handleGoBack} style={{ cursor: 'pointer' }}>
        <img
          src={Arrow}
          style={{
            height: '1.2vh',
            transform: 'rotate(90deg)',
          }}
          alt="Close"
        />
      </CircleIconContainer>

      <TopBar>
        <div style={{ display: 'flex', alignItems: 'end', gap: '0.5vw' }}>
          <Logo>
            {student.name}
          </Logo>
          <AddStudentText1 >
            ({student.admission_no})
          </AddStudentText1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AddStudentText onClick={handleEditClick}>
            Edit Student
          </AddStudentText>
          <CircleIconContainer1 onClick={handleEditClick} >
            <img
              src={Add}
              style={{
                height: '1.8vh',
              }}
            />
          </CircleIconContainer1>
        </div>
      </TopBar>

      <div style={{ display: 'flex', gap: '2vw' }}>
        <div style={{ width: '55vw', height: '40vh', backgroundColor: '#fff', borderRadius: '2vw', boxShadow: '0 4px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '3vw', paddingRight: '3vw' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh' }}>
              <AddStudentText1 >
                Name
              </AddStudentText1>
              <Logo>
                {student.name}
              </Logo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh', marginTop: 'auto' }}>
              <AddStudentText1 >
                Class
              </AddStudentText1>
              <Logo>
                {student.class_name?.name || 'N/A'}-({student.batch})
              </Logo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh', marginTop: 'auto' }}>
              <AddStudentText1 >
                Committed Fee
              </AddStudentText1>
              <Logo>
                ₹{student.committed_fees}
              </Logo>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '3vw', paddingRight: '3vw' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh' }}>
              <AddStudentText1 >
                Phone No
              </AddStudentText1>
              <Logo>
                {Array.isArray(student.phone_numbers)
                  ? (student.phone_numbers[0] || 'N/A')
                  : (student.phone_numbers || 'N/A')}
              </Logo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh', marginTop: 'auto' }}>
              <AddStudentText1 >
                Group
              </AddStudentText1>
              <Logo>
                {student.group} - {student.section?.name || 'N/A'}
              </Logo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh', marginTop: 'auto' }}>
              <AddStudentText1 >
                Pending Fee
              </AddStudentText1>
              <Logo style={{ color: '#FF6745' }}>
                ₹{feeTerms
                  ? getOverallPendingFromTerms(feeTerms)
                  : student.overall_pending_fees ?? student.pending_fees}
              </Logo>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '3vw', paddingRight: '3vw' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh' }}>
              <AddStudentText1 >
                Pen No
              </AddStudentText1>
              <Logo>
                {student.pen_no || 'N/A'}
              </Logo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh', marginTop: 'auto' }}>
              <AddStudentText1 >
                Status
              </AddStudentText1>
              <Logo>
                <StatusBadge status={student.status}>
                  {student.status}
                </StatusBadge>
              </Logo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1vh', marginTop: 'auto' }}>
              <AddStudentText1 >
                Is Left
              </AddStudentText1>
              <Logo>
                <StatusBadge1 status={student.is_join ? 'joined' : 'not-joined'}>
                  {student.is_join ? 'No' : 'yes'}
                </StatusBadge1>
              </Logo>
            </div>
          </div>
        </div>

        {/* Calendar Component */}
        <div style={{ width: '35vw', height: '40vh', backgroundColor: '#fff', borderRadius: '2vw', boxShadow: '0 4px 4px rgba(0,0,0,0.1)' }}>
          <CalendarContainer>
            <CalendarHeader>
              <CalendarTitle>Attendance</CalendarTitle>
              <SelectContainer>
                <MonthSelect value={selectedMonth} onChange={handleMonthChange}>
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </MonthSelect>
                <YearSelect value={selectedYear} onChange={handleYearChange}>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </YearSelect>
              </SelectContainer>
            </CalendarHeader>

            <WeekdaysContainer>
              {weekdays.map(day => (
                <Weekday key={day}>{day}</Weekday>
              ))}
            </WeekdaysContainer>

            <DaysContainer>
              {renderDays()}
            </DaysContainer>

            <StatsContainer>
              <StatItem1>
                <StatValue>{attendanceStats.holidays}</StatValue>
                <StatLabel>Holidays</StatLabel>
              </StatItem1>
              <StatItem>
                <StatValue>{attendanceStats.present}</StatValue>
                <StatLabel>Present</StatLabel>
              </StatItem>
              <StatItem2>
                <StatValue>{attendanceStats.absent}</StatValue>
                <StatLabel>Absent</StatLabel>
              </StatItem2>

            </StatsContainer>
          </CalendarContainer>
        </div>
      </div>

      <BottomSection>
        <div style={{ width: '48vw', height: '30vh', backgroundColor: '#fff', borderRadius: '2vw', boxShadow: '0 4px 4px rgba(0,0,0,0.1)', padding: '2vh 2vw' }}>
          {feeTerms ? (
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <StyledTh style={{ textAlign: 'center' }}>Year</StyledTh>
                    <StyledTh style={{ textAlign: 'center' }}>Term</StyledTh>
                    <StyledTh style={{ textAlign: 'center' }}>Amount</StyledTh>
                    <StyledTh style={{ textAlign: 'center' }}>Paid</StyledTh>
                    <StyledTh style={{ textAlign: 'center' }}>Pending</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {(feeTerms.terms || feeTerms.payable_terms || []).map((term, index) => (
                    <tr key={term.fee_term_id || `${term.academic_year_id}-${term.term}-${index}`}>
                      <StyledTd style={{ textAlign: 'center' }}>
                        {term.academic_year_name || '—'}
                      </StyledTd>
                      <StyledTd style={{ textAlign: 'center' }}>Term {term.term}</StyledTd>
                      <StyledTd style={{ textAlign: 'center' }}>₹{term.amount}</StyledTd>
                      <StyledTd style={{ textAlign: 'center' }}>₹{term.paid_amount}</StyledTd>
                      <StyledTd style={{ textAlign: 'center', color: '#FF6745' }}>
                        ₹{term.pending_amount}
                      </StyledTd>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <LoadingContainer style={{ height: '100%' }}>
              <Spinner />
              <LoadingText>Loading fee terms...</LoadingText>
            </LoadingContainer>
          )}
        </div>


        <TestMarksContainer>
          <TestMarksHeader>
            <TestMarksTitle>
              Latest Test Marks
            </TestMarksTitle>
            <ViewAllLink onClick={handleTestMarksClick}>
              View All →
            </ViewAllLink>
          </TestMarksHeader>
          {testMarks.length > 0 ? (
            <TestMarksGrid>
              {testMarks.map((test) => (
                <TestMarkItem key={test.id}>
                  <TestMarkCard>
                    <TestMarkInfo>
                      {new Date(test.test_date).toLocaleDateString()} - {formatTestName(test.test_name)}
                    </TestMarkInfo>
                    <TestMarkScore>
                      {parseFloat(test.marks_obtained).toFixed(0)}/{parseFloat(test.total_marks).toFixed(0)} ({test.overall_percentage}%) - Rank {test.rank || 'N/A'}
                    </TestMarkScore>
                  </TestMarkCard>
                </TestMarkItem>
              ))}
            </TestMarksGrid>
          ) : (
            <NoTestMarks>
              No test marks available
            </NoTestMarks>
          )}
        </TestMarksContainer>
      </BottomSection>

      {showEditDialog && (
        <AddStudentDialog
          onClose={() => setShowEditDialog(false)}
          onSuccess={handleUpdateSuccess}
          isEditMode={true}
          initialData={student}
        />
      )}

      {showTestMarksDialog && (
        <TestMarksDialog
          onClose={() => setShowTestMarksDialog(false)}
          studentId={id}
          studentName={student?.name || 'Student'}
        />
      )}
    </Container>
  );
};

export default StudentDetails;