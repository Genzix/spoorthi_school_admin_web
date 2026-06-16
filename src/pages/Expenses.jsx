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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NewPaymentDialog from './Dailog/NewPaymentDialog';
import NewExpenseDialog from './Dailog/NewExpenseDialog';

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
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${spin} 1s ease-in-out infinite;
`;

const PulseLoader = styled.div`
  width: 50px;
  height: 50px;
  background-color: #FFB942;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const DashboardContainer = styled.div`
  height: 75vh;
`;

const Container = styled.div`
  height: auto;
  display: flex;
  margin-top: 4vh;
  gap: 2.4vw;
  justify-content: space-between;
  align-items: center;
`;

const RevenuneContainer = styled.div`
  height: 20vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 49vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RevenuneContainer1 = styled.div`
  height: 57.5vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 49vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
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
  width: 73%;
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

const SalaryRecordsList = styled.div`
  width: 100%;
  margin-top: 2vh;
  max-height: 45vh;  // Fixed maximum height
  overflow-y: auto;  // Enable vertical scrolling
  padding-right: 0.5vw; // Add some padding to prevent scrollbar overlap

  /* Custom scrollbar styling */
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

const SalaryRecordItem = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const RecordDetail = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
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

      let url = 'https://spoorthischool.genzix.space/employees/total-expenses/';
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

      const response = await axios.get('https://spoorthischool.genzix.space/employees/expenses/', {
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

      const response = await axios.get('https://spoorthischool.genzix.space/employees/salary-records/', {
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

  // Button styles
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

  const uploadButtonStyle1 = {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    width: '25%',
    height: "5.5vh",
    padding: '1vh 0.7vw',
    backgroundColor: '#BEFFB6',
    border: 'none',
    color: '#000',
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
      <div style={{ height: ' 75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </div>
    );
  }


  return (
    <DashboardContainer>
      <Container>
        <RevenuneContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'start', marginBottom: '0.45vh' }}>
              <Logo>Employees Payment</Logo>
              <AddStudentText>({getMonthName(selectedMonth)} {selectedYear})</AddStudentText>
            </div>

            <AddStudentText1>
              {expenseData ? formatCurrency(expenseData.total_salaries) : '₹0'}
            </AddStudentText1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', justifyContent: 'end' }}>
              <button
                style={highlightedButtonStyle}
                onClick={handleOpenFilterDialog}
              >
                Filter
              </button>
            </div>
            <button style={uploadButtonStyle}>Upload Excel</button>
          </div>
        </RevenuneContainer>

        <RevenuneContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'start', marginBottom: '0.45vh' }}>
              <Logo>Infra Expense</Logo>
              <AddStudentText>({getMonthName(selectedMonth)} {selectedYear})</AddStudentText>
            </div>
            <AddStudentText1>
              {expenseData ? formatCurrency(expenseData.total_expenses) : '₹0'}
            </AddStudentText1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', justifyContent: 'end' }}>
              <button
                style={highlightedButtonStyle}
                onClick={handleOpenFilterDialog}
              >
                Filter
              </button>
            </div>
            <button style={uploadButtonStyle}>Upload Excel</button>
          </div>
        </RevenuneContainer>
      </Container>

      <Container>
        <RevenuneContainer1>
          <SearchContainer>
            <SearchIcon src={searchIcon} />
            <SearchInput
              type="text"
              placeholder="Search by date or employee name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={uploadButtonStyle1} onClick={() => setOpenNewPaymentDialog(true)}>New Payment</button>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    <RecordDetail>
                      {formatDate(record.payment_date)} - {record.employee_name} - Salary
                    </RecordDetail>
                  </div>
                  <RecordDetail>{formatCurrency(record.total_salary)}</RecordDetail>
                </SalaryRecordItem>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2vh 0',
                fontFamily: 'Roboto, sans-serif',
                margin: 'auto'
              }}>
                No salary records found
              </div>
            )}
          </SalaryRecordsList>
        </RevenuneContainer1>

        <RevenuneContainer1>
          <SearchContainer>
            <SearchIcon src={searchIcon} />
            <SearchInput
              type="text"
              placeholder="Search by date or infra Name"
              value={searchTerm1}
              onChange={(e) => setSearchTerm1(e.target.value)}
            />
            <button style={uploadButtonStyle1} onClick={() => setOpenNewExpenseDialog(true)} >New Expense</button>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    <RecordDetail>
                      {formatDate(expense.date)} - {expense.name} - {expense.quantity} x {formatCurrency(expense.price)}
                    </RecordDetail>
                  </div>
                  <RecordDetail>{formatCurrency(expense.quantity * parseFloat(expense.price))}</RecordDetail>
                </SalaryRecordItem>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2vh 0',
                fontFamily: 'Roboto, sans-serif',
                margin: 'auto'
              }}>
                No expenses records found
              </div>
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
      <Dialog open={openFilterDialog} onClose={handleCloseFilterDialog}>
        <DialogTitle>Select Month and Year</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', padding: '20px' }}>
            <FormControl fullWidth>
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={tempSelectedMonth}
                label="Month"
                onChange={(e) => setTempSelectedMonth(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                  <MenuItem key={month} value={month}>
                    {getMonthName(month)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={tempSelectedYear}
                label="Year"
                onChange={(e) => setTempSelectedYear(e.target.value)}
              >
                {yearOptions.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterDialog}>Cancel</Button>
          <Button onClick={handleApplyFilter}>Apply</Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default Expenses;