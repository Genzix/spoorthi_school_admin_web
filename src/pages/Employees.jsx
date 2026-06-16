import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSend, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import searchIcon from '../assets/Search.svg'; 
import arrowIcon from '../assets/arrow.svg'; 
import Add from '../assets/add.svg'; 
import AddEmployeeDialog from './Dailog/AddEmployeeDialog';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeesContext';
import { extractIds } from '../utils/employeeAssignments';

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
`;

const Table = styled.table`
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${props => props.leftAlign ? 'left' : 'center'};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${props => props.leftAlign && 'padding-left: 1vw;'}

  &:nth-child(1) { width: 2vw; }
  &:nth-child(2) { width: 15vw; }
  &:nth-child(3) { width: 7vw; }
  &:nth-child(4) { width: 9vw; }
  &:nth-child(5) { width: 6vw; }
  &:nth-child(6) { width: 6vw; }
  &:nth-child(7) { width: 6vw; }
  &:nth-child(8) { width: 9vw; }
  &:nth-child(9) { width: 9vw; }
  &:nth-child(10) { width: 5vw; }
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
  padding: 2.4vh 0vw;
  text-align: ${props => props.leftAlign ? 'left' : 'center'};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${props => props.leftAlign && 'padding-left: 25px;'}
  word-wrap: break-word;
  transition: all 0.2s;
`;

const StatusBadge = styled.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({ status }) => status ? '#BEFFB6' : '#FEA592'};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
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
  margin-right: 5px;
  transition: all 0.2s;
`;

const SalaryReminderButton = styled.button`
  padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: '#000000';
  margin-left:auto;
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

const SalaryReminderButton1 = styled.button`
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

const EmployeeInfoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
`;

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
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

const AddEmployeeText = styled.div`
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

const AssignmentCell = styled.div`
  max-width: 14vw;
  font-size: 0.75vw;
  line-height: 1.4;
  color: #333;
  white-space: normal;
`;

const Employees = () => {
  const navigate = useNavigate();
  const { 
    employees, 
    loading, 
    error, 
    isRefreshing, 
    fetchEmployees, 
    refreshEmployees, 
    getFilteredEmployees, 
    getUniqueValues,
    assignmentsLookupLoading,
    getAssignmentsSummary,
  } = useEmployees();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    is_active: ''
  });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);

  const handleStudentClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const handleRefresh = () => {
    refreshEmployees();
  };

  const handleSelectEmployee = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(employee => employee.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const sendSalaryReminder = (employeeId) => {
    // Show a temporary loading state for the action
    setEmployees(prevEmployees => 
      prevEmployees.map(employee => 
        employee.id === employeeId 
          ? { ...employee, isSendingReminder: true } 
          : employee
      )
    );

    // Simulate API call
    setTimeout(() => {
      setEmployees(prevEmployees => 
        prevEmployees.map(employee => 
          employee.id === employeeId 
            ? { ...employee, isSendingReminder: false } 
            : employee
        )
      );
      alert(`Salary reminder sent to employee with ID: ${employeeId}`);
    }, 1000);
  };

  const filteredEmployees = getFilteredEmployees({
    searchTerm,
    department: filters.department,
    category: filters.category,
    is_active: filters.is_active
  });

  const uniqueDepartments = getUniqueValues('department');
  const uniqueCategories = getUniqueValues('category');

  const getAvatarColor = (name) => {
    const colors = [
      '#FFB942', 
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  const handleAddEmployeeSuccess = () => {
    refreshEmployees();
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
            <FilterSelectContainer>
              <FilterSelect value="" disabled>
                <option value="">All Employees</option>
              </FilterSelect>
              <SelectArrow src={arrowIcon} />
            </FilterSelectContainer>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
            <FilterSelect value={filters.department} onChange={(e) => setFilters({...filters, department: e.target.value})}>
              <option value="">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </FilterSelect>
            <SelectArrow src={arrowIcon} />
          </FilterSelectContainer>

          <FilterSelectContainer>
            <FilterSelect value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
              <option value="">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </FilterSelect>
            <SelectArrow src={arrowIcon} />
          </FilterSelectContainer>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AddEmployeeText onClick={() => setShowAddEmployeeDialog(true)}>
            Add Employee
          </AddEmployeeText>
          <CircleIconContainer onClick={() => setShowAddEmployeeDialog(true)}>
            <img 
              src={Add} 
              style={{
                height: '1.8vh',
              }}
            />
          </CircleIconContainer>
          {showAddEmployeeDialog && (
            <AddEmployeeDialog onClose={() => setShowAddEmployeeDialog(false)} onSuccess={handleAddEmployeeSuccess} />
          )}
          {selectedEmployees.length > 0 && (
            <SalaryReminderButton1 onClick={() => selectedEmployees.forEach(id => sendSalaryReminder(id))}>
              Send Reminder
            </SalaryReminderButton1>
          )}
        </div>
      </TopBar>

      <TableContainer>
        {isRefreshing ? (
          <div style={{ padding: '20px' }}>
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : filteredEmployees.length === 0 ? (
          <EmptyState>
            <h3>No employees found</h3>
            <AddEmployeeText style={{marginTop:'1vh'}}>Try adjusting your search or filters</AddEmployeeText>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>
                  <Checkbox 
                    checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th leftAlign>Employee</Th>
                <Th>Employee No</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Salary</Th>
                <Th>Department</Th>
                <Th>Category</Th>
                <Th>Classes / Sections</Th>
                <Th>Sick</Th>
                <Th>Absent</Th>
                <Th>Status</Th>
              </Tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <Tr key={employee.id}>
                  <Td>
                    <Checkbox 
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                    />
                  </Td>
                  <Td leftAlign>
                    <EmployeeInfoContainer  onClick={() => handleStudentClick(employee.id)}>
                      {employee.photo ? (
                        <img 
                          src={employee.photo} 
                          alt={employee.name}
                          style={{
                            width: '5.7vh',
                            height: '5.7vh',
                            borderRadius: '0.7vw',
                            objectFit: 'cover',
                            marginRight: '0.8vw'
                          }}
                        />
                      ) : (
                        <Avatar color={getAvatarColor(employee.name)}>
                          <div>{employee.name.charAt(0).toUpperCase()}</div>
                        </Avatar>
                      )}
                      <EmployeeDetails>
                        <div style={{ fontWeight: '400' }}>{employee.name}</div>
                        <div style={{ fontSize: '0.8vw', color: 'grey' }}>{employee.employee_no}</div>
                      </EmployeeDetails>
                    </EmployeeInfoContainer>
                  </Td>
                  <Td>{employee.employee_no || '-'}</Td>
                  <Td>{employee.email}</Td>
                  <Td>{employee.phone}</Td>
                  <Td>₹{employee.salary}</Td>
                  <Td>{employee.department_name}</Td>
                  <Td>{employee.category_name}</Td>
                  <Td>
                    <AssignmentCell>
                      {assignmentsLookupLoading && extractIds(employee.handled_classes).length > 0
                        ? 'Loading...'
                        : getAssignmentsSummary(employee)}
                    </AssignmentCell>
                  </Td>
                  <Td>{employee.sick_leave_count}</Td>
                  <Td>{employee.present_days}</Td>
                  <Td>
                    <StatusBadge status={employee.is_active}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </Td>
                  {/* <Td>
                    <SalaryReminderButton 
                      onClick={() => sendSalaryReminder(employee.id)}
                      disabled={employee.isSendingReminder}
                    >
                      {employee.isSendingReminder ? (
                        <FiRefreshCw className="spin" />
                      ) : (
                        'Send'
                      )}
                    </SalaryReminderButton>
                  </Td> */}
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default Employees;