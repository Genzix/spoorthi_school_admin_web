import { API_BASE_URL } from '@/config/api';
// src/pages/Expenses.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import searchIcon from '../assets/Search.svg';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import NewPaymentDialog from './Dailog/NewPaymentDialog';
import NewExpenseDialog from './Dailog/NewExpenseDialog';
import BrandSelect from '../components/BrandSelect';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

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
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
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

const PulseLoader = styled.div`
  width: 50px;
  height: 50px;
  background-color: var(--color-primary);
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const cardMobileStyles = `
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    min-height: auto;
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    border-radius: 12px;
    padding: 14px;
  }
`;

const DashboardContainer = styled.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: auto;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding-bottom: 16px;
  }
`;

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: stretch;
  flex: 1;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 0;
    gap: 16px;
    flex: none;
  }
`;

const RevenuneContainer = styled.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  ${cardMobileStyles}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: 140px;
    flex-wrap: wrap;
    gap: 12px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 130px;
  }
`;

const RevenuneContainer1 = styled.div`
  height: 70vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  ${cardMobileStyles}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: 280px;
    max-height: none;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 240px;
  }
`;

const CardContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  min-width: 0;
  flex: 1;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    justify-content: flex-start;
  }
`;

const CardContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  align-items: flex-end;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    width: 100%;
    align-items: stretch;
    gap: 12px;
  }
`;

const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2vw;
  justify-content: flex-start;
  margin-bottom: 0.45vh;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 6px;
    margin-bottom: 4px;
  }
`;

const CardActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    justify-content: flex-start;
  }
`;

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 22px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 20px;
  }
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 10px;
  }
`;

const AddStudentText2 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
    margin-top: 12px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-top: 10px;
  }
`;

const FilterButton = styled.button`
  width: auto;
  padding: 1.2vh 1vw;
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-primary);
  color: #000000;
  border-radius: 0.6vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 1px;
  cursor: pointer;
  white-space: nowrap;
  min-height: 36px;
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-primary);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px 14px;
    font-size: 13px;
    border-radius: 8px;
    min-height: 40px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 9px 10px;
    font-size: 12px;
  }
`;

const UploadButton = styled.button`
  margin-top: auto;
  align-self: flex-end;
  width: 12vw;
  height: 5.5vh;
  padding: 1vh 0.7vw;
  background-color: var(--color-primary);
  border: none;
  color: var(--color-on-primary, #111111);
  border-radius: 3vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 1px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-secondary);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 44px;
    margin-top: 4px;
    align-self: stretch;
    border-radius: 10px;
    font-size: 14px;
    padding: 12px 16px;
  }
`;

const ActionButton = styled.button`
  margin-top: auto;
  align-self: flex-end;
  width: 25%;
  height: 5.5vh;
  padding: 1vh 0.7vw;
  background-color: #BEFFB6;
  border: none;
  color: #000;
  border-radius: 3vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 1px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 40px;
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 13px;
    margin-top: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 38px;
    font-size: 12px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-top: 0;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  width: 73%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px 10px 2.4vw;
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid var(--color-primary-light);
  background-color: var(--color-primary-light);
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  transition: all 0.3s;
  box-sizing: border-box;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 44px;
    padding: 10px 15px 10px 40px;
    font-size: 14px;
    border-radius: 22px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    height: 42px;
    font-size: 13px;
    padding-left: 36px;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    left: 14px;
    height: 16px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    left: 12px;
    height: 14px;
  }
`;

const SalaryRecordsList = styled.div`
  width: 100%;
  margin-top: 2vh;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5vw;
  -webkit-overflow-scrolling: touch;

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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 12px;
    max-height: min(50vh, 420px);
    padding-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    max-height: min(45vh, 360px);
  }
`;
const SalaryRecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #E5E5E5;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 10px;
    gap: 6px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 8px;
  }
`;

const RecordDetail = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-right: 0;
    width: 100%;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 11px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto', sans-serif;
  margin: auto;
  font-size: 0.8vw;
  color: #666;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    padding: 24px 12px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 13px;
    padding: 20px 10px;
  }
`;

const FilterDialogContent = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;

  & > * {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    gap: 16px;
    padding: 12px 8px;
    margin-top: 12px;
  }
`;

const LoadingWrapper = styled.div`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 50vh;
    min-height: 200px;
  }
`;
const DetailImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 0.4vw;
  margin-top: 1vh;
`;

const DetailText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  color: #333;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [expenseData, setExpenseData] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [tempSelectedYear, setTempSelectedYear] = useState(currentYear);
  const [tempSelectedMonth, setTempSelectedMonth] = useState(currentMonth);
  const [openNewPaymentDialog, setOpenNewPaymentDialog] = useState(false);
  const [openNewExpenseDialog, setOpenNewExpenseDialog] = useState(false);
  const [loadingExpenseData, setLoadingExpenseData] = useState(false);
  const [loadingSalaryRecords, setLoadingSalaryRecords] = useState(false);
  const [loadingExpensesList, setLoadingExpensesList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openRecordDialog, setOpenRecordDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

  // Format number to Indian currency format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹');
  };

  const handlePaymentSuccess = () => {
    fetchSalaryRecords(); // Refresh the salary records list
    fetchExpenseData(selectedYear, selectedMonth); // Refresh expense data
    fetchExpensesList(); // Refresh expenses list
  };

  // Get month name from month number
  const getMonthName = (monthNumber) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get token from local storage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch expense data from API
  const fetchExpenseData = async (year = null, month = null) => {
    try {
      setLoading(true);
      setLoadingExpenseData(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      let url = `${API_BASE_URL}/employees/total-expenses/`;
      const params = new URLSearchParams();

      if (year) params.append('year', year);
      if (month) params.append('month', month);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setExpenseData(response.data.data);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    } finally {
      setLoadingExpenseData(false);
      setLoading(false);
    }
  };

  // Fetch expenses list from API
  const fetchExpensesList = async () => {
    try {
      setLoadingExpensesList(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/employees/expenses/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setExpensesList(response.data.data);
      setFilteredExpenses(response.data.data);
    } catch (error) {
      console.error('Error fetching expenses list:', error);
    } finally {
      setLoadingExpensesList(false);
    }
  };

  // Fetch salary records from API
  const fetchSalaryRecords = async () => {
    try {
      setLoadingSalaryRecords(true);
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/employees/salary-records/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setSalaryRecords(response.data.data);
      setFilteredRecords(response.data.data);
    } catch (error) {
      console.error('Error fetching salary records:', error);
    } finally {
      setLoadingSalaryRecords(false);
      setLoading(false);
    }
  };

  // Filter salary records based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = salaryRecords.filter(record =>
        record.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(record.payment_date).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(salaryRecords);
    }
  }, [searchTerm, salaryRecords]);

  // Filter expenses based on search term
  useEffect(() => {
    if (searchTerm1) {
      const filtered = expensesList.filter(expense =>
        expense.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
        formatDate(expense.date).toLowerCase().includes(searchTerm1.toLowerCase())
      );
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expensesList);
    }
  }, [searchTerm1, expensesList]);

  useEffect(() => {
    fetchExpenseData(selectedYear, selectedMonth);
    fetchSalaryRecords();
    fetchExpensesList();
  }, [selectedYear, selectedMonth]);

  const handleOpenFilterDialog = () => {
    setTempSelectedYear(selectedYear);
    setTempSelectedMonth(selectedMonth);
    setOpenFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
  };

  const handleApplyFilter = () => {
    setSelectedYear(tempSelectedYear);
    setSelectedMonth(tempSelectedMonth);
    setOpenFilterDialog(false);
  };

  // Generate year options (current year and previous year)
  const yearOptions = [currentYear, (parseInt(currentYear) - 1).toString()];

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setOpenRecordDialog(true);
  };

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense);
    setOpenExpenseDialog(true);
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </LoadingWrapper>
    );
  }


  return (
    <DashboardContainer>
      <Container>
        <RevenuneContainer>
          <CardContentLeft>
            <CardTitleRow>
              <Logo>Employees Payment</Logo>
              <AddStudentText>({getMonthName(selectedMonth)} {selectedYear})</AddStudentText>
            </CardTitleRow>

            <AddStudentText1>
              {expenseData ? formatCurrency(expenseData.total_salaries) : '₹0'}
            </AddStudentText1>
          </CardContentLeft>
          <CardContentRight>
            <CardActionsRow>
              <FilterButton onClick={handleOpenFilterDialog}>
                Filter
              </FilterButton>
            </CardActionsRow>
            <UploadButton>Upload Excel</UploadButton>
          </CardContentRight>
        </RevenuneContainer>

        <RevenuneContainer1>
          <SearchContainer>
            <SearchInputWrapper>
              <SearchIcon src={searchIcon} alt="" />
              <SearchInput
                type="text"
                placeholder="Search by date or employee name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
            <ActionButton onClick={() => setOpenNewPaymentDialog(true)}>New Payment</ActionButton>
            {openNewPaymentDialog && (
              <NewPaymentDialog
                onClose={() => setOpenNewPaymentDialog(false)}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </SearchContainer>

          <AddStudentText2>Recent transaction</AddStudentText2>

          <SalaryRecordsList>
            {loadingSalaryRecords ? (
              <LoadingContainer style={{ height: '100%' }}>
                <Spinner />
              </LoadingContainer>
            ) : filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <SalaryRecordItem
                  key={record.id}
                  onClick={() => handleRecordClick(record)}
                >
                  <RecordDetail>
                    {formatDate(record.payment_date)} - {record.employee_name} - Salary
                  </RecordDetail>
                  <RecordDetail>{formatCurrency(record.total_salary)}</RecordDetail>
                </SalaryRecordItem>
              ))
            ) : (
              <EmptyState>
                No salary records found
              </EmptyState>
            )}
          </SalaryRecordsList>
        </RevenuneContainer1>
      </Container>

      <Container>
        <RevenuneContainer>
          <CardContentLeft>
            <CardTitleRow>
              <Logo>Infra Expense</Logo>
              <AddStudentText>({getMonthName(selectedMonth)} {selectedYear})</AddStudentText>
            </CardTitleRow>
            <AddStudentText1>
              {expenseData ? formatCurrency(expenseData.total_expenses) : '₹0'}
            </AddStudentText1>
          </CardContentLeft>
          <CardContentRight>
            <CardActionsRow>
              <FilterButton onClick={handleOpenFilterDialog}>
                Filter
              </FilterButton>
            </CardActionsRow>
            <UploadButton>Upload Excel</UploadButton>
          </CardContentRight>
        </RevenuneContainer>

        <RevenuneContainer1>
          <SearchContainer>
            <SearchInputWrapper>
              <SearchIcon src={searchIcon} alt="" />
              <SearchInput
                type="text"
                placeholder="Search by date or infra Name"
                value={searchTerm1}
                onChange={(e) => setSearchTerm1(e.target.value)}
              />
            </SearchInputWrapper>
            <ActionButton onClick={() => setOpenNewExpenseDialog(true)}>New Expense</ActionButton>
            {openNewExpenseDialog && (
              <NewExpenseDialog
                onClose={() => setOpenNewExpenseDialog(false)}
                onSuccess={() => {
                  fetchExpensesList();
                  fetchExpenseData(selectedYear, selectedMonth);
                }}
              />
            )}
          </SearchContainer>

          <AddStudentText2>Recent Expenses</AddStudentText2>

          <SalaryRecordsList>
            {loadingExpensesList ? (
              <LoadingContainer style={{ height: '100%' }}>
                <Spinner />
              </LoadingContainer>
            ) : filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <SalaryRecordItem
                  key={expense.id}
                  onClick={() => handleExpenseClick(expense)}
                >
                  <RecordDetail>
                    {formatDate(expense.date)} - {expense.name} - {expense.quantity} x {formatCurrency(expense.price)}
                  </RecordDetail>
                  <RecordDetail>{formatCurrency(expense.quantity * parseFloat(expense.price))}</RecordDetail>
                </SalaryRecordItem>
              ))
            ) : (
              <EmptyState>
                No expenses records found
              </EmptyState>
            )}
          </SalaryRecordsList>
        </RevenuneContainer1>
      </Container>

      {/* Salary Record Details Dialog */}
      <Dialog
        open={openRecordDialog}
        onClose={() => setOpenRecordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Salary Payment Details</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <>
              <DetailText>
                <DetailLabel>Transaction ID:</DetailLabel>
                {selectedRecord.transcaction_id}
              </DetailText>
              <DetailText>
                <DetailLabel>Payment Date:</DetailLabel>
                {formatDate(selectedRecord.payment_date)}
              </DetailText>
              <DetailText>
                <DetailLabel>Total Salary:</DetailLabel>
                {formatCurrency(selectedRecord.total_salary)}
              </DetailText>
              <DetailText>
                <DetailLabel>Status:</DetailLabel>
                {selectedRecord.is_paid ? 'Paid' : 'Pending'}
              </DetailText>
              <DetailText>
                <DetailLabel>Created On:</DetailLabel>
                {new Date(selectedRecord.created_on).toLocaleString()}
              </DetailText>
              <DetailText>
                <DetailLabel>Year:</DetailLabel>
                {selectedRecord.year}
              </DetailText>
              <DetailText>
                <DetailLabel>Month:</DetailLabel>
                {getMonthName(selectedRecord.month)}
              </DetailText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRecordDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Expense Details Dialog */}
      <Dialog
        open={openExpenseDialog}
        onClose={() => setOpenExpenseDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Expense Details</DialogTitle>
        <DialogContent>
          {selectedExpense && (
            <>
              <DetailText>
                <DetailLabel>Name:</DetailLabel>
                {selectedExpense.name}
              </DetailText>
              <DetailText>
                <DetailLabel>Quantity:</DetailLabel>
                {selectedExpense.quantity}
              </DetailText>
              <DetailText>
                <DetailLabel>Price per unit:</DetailLabel>
                {formatCurrency(selectedExpense.price)}
              </DetailText>
              <DetailText>
                <DetailLabel>Total Amount:</DetailLabel>
                {formatCurrency(selectedExpense.quantity * parseFloat(selectedExpense.price))}
              </DetailText>
              <DetailText>
                <DetailLabel>Transaction ID:</DetailLabel>
                {selectedExpense.transaction_id}
              </DetailText>
              <DetailText>
                <DetailLabel>Seller Phone:</DetailLabel>
                {selectedExpense.seller_phone || 'N/A'}
              </DetailText>
              <DetailText>
                <DetailLabel>Date:</DetailLabel>
                {formatDate(selectedExpense.date)}
              </DetailText>
              {selectedExpense.bill_image && (
                <>
                  <DetailText>
                    <DetailLabel>Bill Image:</DetailLabel>
                  </DetailText>
                  <DetailImage src={selectedExpense.bill_image} alt="Bill" />
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExpenseDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog
        open={openFilterDialog}
        onClose={handleCloseFilterDialog}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
              borderRadius: '12px',
            },
          },
        }}
      >
        <DialogTitle>Select Month and Year</DialogTitle>
        <DialogContent sx={{ overflow: 'visible', pb: 1 }}>
          <FilterDialogContent>
            <BrandSelect
              variant="field"
              aria-label="Month"
              placeholder="Month"
              value={String(tempSelectedMonth)}
              onChange={(e) => setTempSelectedMonth(Number(e.target.value))}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => ({
                value: String(month),
                label: getMonthName(month),
              }))}
            />
            <BrandSelect
              variant="field"
              aria-label="Year"
              placeholder="Year"
              value={String(tempSelectedYear)}
              onChange={(e) => setTempSelectedYear(Number(e.target.value))}
              options={yearOptions.map((year) => ({
                value: String(year),
                label: String(year),
              }))}
            />
          </FilterDialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterDialog}>Cancel</Button>
          <Button
            onClick={handleApplyFilter}
            sx={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary, #111)',
              '&:hover': { backgroundColor: 'var(--color-secondary)' },
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default Expenses;