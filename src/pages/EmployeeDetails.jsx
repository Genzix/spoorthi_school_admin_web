import { API_BASE_URL } from '@/config/api';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Arrow from '../assets/arrow.svg';
import Add from '../assets/add.svg';
import AddEmployeeDialog from './Dailog/AddEmployeeDialog';
import { useClassSectionLookup } from '../hooks/useClassSectionLookup';
import { extractIds } from '../utils/employeeAssignments';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE = '480px';

// Loading animations
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    top: max(12px, env(safe-area-inset-top));
    left: 12px;
  }
`;

const CircleIconContainer1 = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #FFB942;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #FFAC1E;
    transform: scale(1.05);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }
`;

const Container = styled.div`
  background-color: #EFEFEF;
  min-height: 75vh;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding-bottom: 24px;
  }
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
    margin-top: 56px;
    margin-bottom: 16px;
    gap: 12px;
    padding: 0 4px;
  }
`;

const NameRow = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5vw;
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const MobileEditButton = styled.button`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex: 1;
    min-height: 44px;
    padding: 10px 14px;
    border: none;
    border-radius: 12px;
    background: #FFB942;
    color: #000000;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const DesktopEditActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const ContentGrid = styled.div`
  display: flex;
  gap: 2vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    gap: 12px;
    padding: 0 4px;
  }
`;

const InfoCard = styled.div`
  width: 55vw;
  min-height: 40vh;
  background-color: #fff;
  border-radius: 2vw;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    min-height: auto;
    border-radius: 14px;
    flex-direction: column;
    gap: 0;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 5vh 3vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
    gap: 16px;
  }
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1vh;

  &:not(:first-child) {
    margin-top: auto;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 4px;
    width: 100%;

    &:not(:first-child) {
      margin-top: 0;
    }
  }
`;

const CalendarCard = styled.div`
  width: 35vw;
  min-height: 40vh;
  background-color: #fff;
  border-radius: 2vw;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    min-height: auto;
    border-radius: 14px;
  }
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
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin-right: 0;
  }
`;

const AddEmployeeText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const AddEmployeeText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: grey;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }
`;

const StatusBadge = styled.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({ status }) => status ? '#BEFFB6' : '#FEA592'};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 1px;
  font-weight: 500;
  display: inline-block;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-wrap: wrap;
    gap: 10px;
    padding: 16px 16px 8px;
    margin: 0;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vh;
  padding-right: 1vh;
  height: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
    height: auto;
  }
`;

const CalendarTitle = styled.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  margin-left: 2vw;
  font-weight: 700;
  color: #000000;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    margin-left: 0;
  }
`;

const MonthSelect = styled.select`
  padding: 0.5vh 0.4vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 8px;
    border-radius: 8px;
    font-size: 13px;
    min-height: 36px;
  }
`;

const YearSelect = styled.select`
  padding: 0.5vh 0.2vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  margin-left: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 8px;
    border-radius: 8px;
    font-size: 13px;
    min-height: 36px;
    margin-left: 6px;
  }
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
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5vh;
  padding: 0 0.5vw;
  margin-bottom: -2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 4px;
    padding: 0 8px;
    margin-bottom: 8px;
  }
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
  margin: 0 auto;
  background: ${({ isPresent, isHoliday, isSickLeave, isAbsent }) => {
    if (isHoliday) return '#E6E6FA';
    if (isSickLeave) return '#ADD8E6';
    if (isPresent) return '#BEFFB6';
    if (isAbsent) return '#FEA592';
    return 'transparent';
  }};
  color: #000;
  font-weight: 400;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 32px;
    height: 32px;
    font-size: 12px;
    padding: 0;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    width: 28px;
    height: 28px;
    font-size: 11px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  margin-right: 2vw;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-right: 0;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 0.5vw;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.5vw;
  padding: 1vh 0;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-left: 0;
    padding: 12px 8px 16px;
    gap: 8px;
    justify-content: center;
  }
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 999px;
    gap: 4px;
  }
`;

const StatItem1 = styled.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FFDA9B;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 999px;
    gap: 4px;
  }
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 999px;
    gap: 4px;
  }
`;

const StatItem3 = styled.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #ADD8E6;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 999px;
    gap: 4px;
  }
`;

const StatValue = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const StatLabel = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #000;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const AssignmentsPanel = styled.div`
  width: 92vw;
  margin-top: 2vw;
  background-color: #fff;
  border-radius: 2vw;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 2.5vh 2vw;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: calc(100% - 8px);
    margin: 12px 4px 0;
    border-radius: 14px;
    padding: 16px;
  }
`;

const AssignmentsTitle = styled.h3`
  margin: 0 0 1.5vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.95vw;
  font-weight: 500;
  color: #000;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 15px;
    margin-bottom: 12px;
  }
`;

const ClassGroupTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.85vw;
  font-weight: 500;
  color: #000;
  margin-bottom: 0.8vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const SectionChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5vh 0.7vw;
  border-radius: 1vw;
  background-color: #FFE6BB;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #333;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 12px;
  }
`;

const AssignmentsEmpty = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const ClassGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5vh;
    padding-bottom: 1.5vh;
    border-bottom: 1px solid #f0f0f0;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    &:not(:last-child) {
      margin-bottom: 12px;
      padding-bottom: 12px;
    }
  }
`;

const SectionChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
  }
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
`;

const StyledTd = styled.td`
  padding: 1.1vh 0.6vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`;

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  const {
    loading: assignmentsLoading,
    getGroupedAssignments,
  } = useClassSectionLookup();

  const assignmentGroups = useMemo(
    () => (employee ? getGroupedAssignments(employee) : []),
    [employee, getGroupedAssignments]
  );

  const fetchEmployeeDetails = async (month = selectedMonth, year = selectedYear) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [employeeResponse, attendanceResponse] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/employees/employees/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          `${API_BASE_URL}/employees/attendance/employee/${id}/?month=${month + 1}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ]);

      if (employeeResponse.data.status === 'success') {
        setEmployee(employeeResponse.data.data);
      }

      if (attendanceResponse.data.status === 'success') {
        setAttendance(attendanceResponse.data);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleUpdateSuccess = async () => {
    await fetchEmployeeDetails();
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
    setCurrentDate(new Date(selectedYear, newMonth, 1));
    fetchEmployeeDetails(newMonth, selectedYear);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, selectedMonth, 1));
    fetchEmployeeDetails(selectedMonth, newYear);
  };

  const renderDays = () => {
    const year = selectedYear;
    const month = selectedMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startingDay = firstDay.getDay() - 1;
    if (startingDay < 0) startingDay = 6;

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    let days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(<Day key={`empty-${i}`}></Day>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPresent = attendance?.dates.present_dates.includes(dateStr);
      const isAbsent = attendance?.dates.absent_dates.includes(dateStr);
      const isHoliday = attendance?.dates.holiday_dates.includes(dateStr);
      const isSickLeave = attendance?.dates.sick_leave_dates.includes(dateStr);
      const isToday = isCurrentMonth && day === today.getDate();

      days.push(
        <Day
          key={`day-${day}`}
          isToday={isToday}
          isPresent={isPresent}
          isAbsent={isAbsent}
          isHoliday={isHoliday}
          isSickLeave={isSickLeave}
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
        <LoadingText>Loading employee details...</LoadingText>
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

  if (!employee) {
    return (
      <Container>
        <ErrorMessage>
          Employee not found
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
        <NameRow>
          <Logo>
            {employee.name}
          </Logo>
          <AddEmployeeText1>
            ({employee.employee_no})
          </AddEmployeeText1>
        </NameRow>

        <EditActions>
          <DesktopEditActions>
            <AddEmployeeText onClick={handleEditClick}>
              Edit Employee
            </AddEmployeeText>
            <CircleIconContainer1 onClick={handleEditClick}>
              <img
                src={Add}
                style={{ height: '1.8vh' }}
                alt="Edit"
              />
            </CircleIconContainer1>
          </DesktopEditActions>
          <MobileEditButton onClick={handleEditClick}>
            Edit Employee
          </MobileEditButton>
        </EditActions>
      </TopBar>

      <ContentGrid>
        <InfoCard>
          <InfoColumn>
            <InfoField>
              <AddEmployeeText1>Name</AddEmployeeText1>
              <Logo>{employee.name}</Logo>
            </InfoField>
            <InfoField>
              <AddEmployeeText1>Department</AddEmployeeText1>
              <Logo>{employee.department_name}</Logo>
            </InfoField>
            <InfoField>
              <AddEmployeeText1>Category</AddEmployeeText1>
              <Logo>{employee.category_name}</Logo>
            </InfoField>
          </InfoColumn>
          <InfoColumn>
            <InfoField>
              <AddEmployeeText1>Email</AddEmployeeText1>
              <Logo>{employee.email}</Logo>
            </InfoField>
            <InfoField>
              <AddEmployeeText1>Phone</AddEmployeeText1>
              <Logo>{employee.phone}</Logo>
            </InfoField>
            <InfoField>
              <AddEmployeeText1>Status</AddEmployeeText1>
              <Logo>
                <StatusBadge status={employee.is_active}>
                  {employee.is_active ? 'Active' : 'Inactive'}
                </StatusBadge>
              </Logo>
            </InfoField>
          </InfoColumn>
          <InfoColumn>
            <InfoField>
              <AddEmployeeText1>Employee ID</AddEmployeeText1>
              <Logo>{employee.employee_no}</Logo>
            </InfoField>
            <InfoField>
              <AddEmployeeText1>Salary</AddEmployeeText1>
              <Logo>₹{employee.salary}</Logo>
            </InfoField>
            <InfoField>
              <AddEmployeeText1>Joined On</AddEmployeeText1>
              <Logo>{new Date(employee.joining_date).toLocaleDateString()}</Logo>
            </InfoField>
          </InfoColumn>
        </InfoCard>

        <CalendarCard>
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
              {weekdays.map((day, index) => (
                <Weekday key={`${day}-${index}`}>{day}</Weekday>
              ))}
            </WeekdaysContainer>

            <DaysContainer>
              {renderDays()}
            </DaysContainer>
            {attendance && (
              <StatsContainer>
                <StatItem1>
                  <StatValue>{attendance.statistics.holiday_days}</StatValue>
                  <StatLabel>Holidays</StatLabel>
                </StatItem1>
                <StatItem>
                  <StatValue>{attendance.statistics.present_days}</StatValue>
                  <StatLabel>Present</StatLabel>
                </StatItem>
                <StatItem2>
                  <StatValue>{attendance.statistics.absent_days}</StatValue>
                  <StatLabel>Absent</StatLabel>
                </StatItem2>
                <StatItem3>
                  <StatValue>{attendance.statistics.sick_leave_days}</StatValue>
                  <StatLabel>Sick Leave</StatLabel>
                </StatItem3>
              </StatsContainer>
            )}
          </CalendarContainer>
        </CalendarCard>
      </ContentGrid>

      <AssignmentsPanel>
        <AssignmentsTitle>Handled Classes & Sections</AssignmentsTitle>
        {assignmentsLoading && extractIds(employee?.handled_classes).length > 0 ? (
          <AssignmentsEmpty>Loading class and section details...</AssignmentsEmpty>
        ) : assignmentGroups.length === 0 ? (
          <AssignmentsEmpty>No classes or sections assigned to this employee.</AssignmentsEmpty>
        ) : (
          assignmentGroups.map((group) => (
            <ClassGroup key={group.classId}>
              <ClassGroupTitle>
                {group.className}
                {!group.isComplete ? ' (sections pending)' : ''}
              </ClassGroupTitle>
              {group.sections.length > 0 ? (
                <SectionChipList>
                  {group.sections.map((section) => (
                    <SectionChip key={section.id}>{section.label}</SectionChip>
                  ))}
                </SectionChipList>
              ) : (
                <AssignmentsEmpty>No sections selected for this class.</AssignmentsEmpty>
              )}
            </ClassGroup>
          ))
        )}
      </AssignmentsPanel>

      {/* {attendance && (
        <div style={{
          width: '90vw', 
          height: '30vh', 
          backgroundColor: '#fff', 
          borderRadius: '2vw', 
          boxShadow: '0 4px 4px rgba(0,0,0,0.1)', 
          marginTop: '2vw',
          marginBottom: '2vw',
          padding: '2vh 2vw'
        }}>
          <StyledTh1>
            Salary Details for {months[selectedMonth]} {selectedYear}
          </StyledTh1>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2vh'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh'
            }}>
              <AddEmployeeText1>
                Total Working Days
              </AddEmployeeText1>
              <Logo>
                {attendance.statistics.total_working_days}
              </Logo>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh'
            }}>
              <AddEmployeeText1>
                Present Days
              </AddEmployeeText1>
              <Logo>
                {attendance.statistics.present_days}
              </Logo>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh'
            }}>
              <AddEmployeeText1>
                Absent Days
              </AddEmployeeText1>
              <Logo>
                {attendance.statistics.absent_days}
              </Logo>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh'
            }}>
              <AddEmployeeText1>
                Sick Leave Days
              </AddEmployeeText1>
              <Logo>
                {attendance.statistics.sick_leave_days}
              </Logo>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh'
            }}>
              <AddEmployeeText1>
                Calculated Salary
              </AddEmployeeText1>
              <Logo>
                ₹{attendance.salary.total_salary}
              </Logo>
            </div>
          </div>
        </div>
      )} */}

      {showEditDialog && (
        <AddEmployeeDialog
          onClose={() => setShowEditDialog(false)}
          onSuccess={handleUpdateSuccess}
          isEditMode={true}
          initialData={employee}
        />
      )}
    </Container>
  );
};

export default EmployeeDetails;