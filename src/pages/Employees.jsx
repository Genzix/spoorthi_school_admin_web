import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSend, FiCheck, FiX, FiRefreshCw, FiFilter } from 'react-icons/fi';
import searchIcon from '../assets/Search.svg'; 
import Add from '../assets/add.svg'; 
import AddEmployeeDialog from './Dailog/AddEmployeeDialog';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeesContext';
import { employeeHasAssignments } from '../utils/employeeAssignments';
import { fetchEmployeeById } from '../utils/employeeApi';
import ActionIconTooltip from '../components/ActionIconTooltip';
import { EMPLOYEE_TOOLBAR_ACTIONS } from '../utils/toolbarActions';
import BrandSelect from '../components/BrandSelect';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

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
  background-color: #EFEFEF;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  transition: all 0.3s ease;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 0;
    padding-bottom: 24px;
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  margin-bottom: 4vh;
  gap: 0;
  background: #EFEFEF;
  border-radius: 10px;
  transition: all 0.3s ease;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 0;
    margin-bottom: 12px;
    gap: 8px;
    padding-top: 2px;
  }
`;

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 0;
  }
`;

const SearchFilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1;
    min-width: 0;
    gap: 6px;
    width: 100%;
    padding: 4px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
  }
`;

const DesktopFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const DesktopToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const MobileFilterToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: #F5F5F5;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: var(--color-primary-light);
  }

  ${props => props.$active && `
    background: var(--color-primary-light);
  `}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
  }
`;

const FilterCountBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #FF6745;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileFiltersPanel = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: ${props => (props.$open ? 'flex' : 'none')};
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 12px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    margin-top: -2px;
  }
`;

const ActionsRow = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    width: 100%;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
`;

const MobileActions = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    width: 100%;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const MobileActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 10px 14px;
  border: none;
  border-radius: 12px;
  background: var(--color-primary);
  color: var(--color-on-primary, #111111);
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-secondary);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 20vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1;
    width: auto;
    min-width: 0;
  }
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
  box-sizing: border-box;
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 40px;
    padding: 8px 12px 8px 36px;
    border-radius: 10px;
    border: none;
    background: transparent;
    font-size: 14px;
    box-shadow: none;

    &:focus {
      box-shadow: none;
    }
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
    left: 12px;
    height: 16px;
  }
`;

const TableContainer = styled.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;

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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const TableScrollWrapper = styled.div`
  display: inline-block;
  min-width: 100%;
`;

const STICKY_EDIT_WIDTH = 90;
const STICKY_STATUS_WIDTH = 100;

const TABLE_COLUMNS = [
  { key: 'select', width: '44px' },
  { key: 'employee', width: '14%' },
  { key: 'employee_no', width: '9%' },
  { key: 'email', width: '13%' },
  { key: 'phone', width: '8%' },
  { key: 'salary', width: '7%' },
  { key: 'department', width: '8%' },
  { key: 'category', width: '6%' },
  { key: 'assignments', width: '13%' },
  { key: 'sick', width: '5%' },
  { key: 'absent', width: '5%' },
  { key: 'status', width: `${STICKY_STATUS_WIDTH}px` },
  { key: 'edit', width: `${STICKY_EDIT_WIDTH}px` },
];

const MobileCardsList = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const MobileEmployeeCard = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
`;

const MobileCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
`;

const MobileCardMain = styled.div`
  flex: 1;
  min-width: 0;
  cursor: pointer;
`;

const MobileCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;
  margin-bottom: 12px;
`;

const MobileCardField = styled.div`
  min-width: 0;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const MobileCardLabel = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 2px;
`;

const MobileCardValue = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #000000;
  word-break: break-word;
`;

const MobileCardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const MobileCardButton = styled.button`
  flex: 1;
  min-height: 40px;
  border: none;
  border-radius: 10px;
  background: var(--color-primary);
  color: var(--color-on-primary, #111111);
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-secondary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StatusCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

const CellText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const MobileCardsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const MobileOnlySection = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: block;
  }
`;

const MobileSkeletonCard = styled.div`
  border-radius: 14px;
  height: 160px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Table = styled.table`
  min-width: 1280px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th.withConfig({
  shouldForwardProp: (prop) => !['leftAlign', '$right', '$edgeShadow'].includes(prop),
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
  ${props => props.$right !== undefined && `
    position: sticky;
    right: ${props.$right}px;
    z-index: ${props.$right === 0 ? 4 : 3};
    ${props.$edgeShadow ? 'box-shadow: -4px 0 6px -2px rgba(0, 0, 0, 0.1);' : ''}
  `}
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
  shouldForwardProp: (prop) => !['leftAlign', '$right', '$edgeShadow'].includes(prop),
})`
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
  transition: background-color 0.2s;
  ${props => props.$right !== undefined && `
    position: sticky;
    right: ${props.$right}px;
    z-index: ${props.$right === 0 ? 2 : 1};
    background: #EFEFEF;
    ${props.$edgeShadow ? 'box-shadow: -4px 0 6px -2px rgba(0, 0, 0, 0.1);' : ''}
  `}

  tr:hover & {
    background-color: ${props => props.$right !== undefined ? 'var(--color-row-hover)' : 'inherit'};
  }
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})`
  padding: 0.6vh 0.7vw;
  border-radius: 1vw;
  background: ${({ status }) => status ? '#BEFFB6' : '#FEA592'};
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
  box-sizing: border-box;
  transition: all 0.2s;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
  }
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
  flex-shrink: 0;
  
  &:checked {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    
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
    border-color: var(--color-primary);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    margin-left: 0;

    &:checked::after {
      font-size: 14px;
    }
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
  color: var(--color-on-primary, #111111);
  margin-left:auto;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SalaryReminderButton1 = styled.button`
  padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: var(--color-on-primary, #111111);
  margin-left: 0.1vw;
  height: 5.7vh;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
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

const Avatar = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: ${props => props.color || 'var(--color-primary)'};
  color: var(--color-on-primary, #111111);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 700;
  margin-right: 0.8vw;
  transition: all 0.2s;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    font-size: 16px;
    margin-right: 10px;
  }
`;

const EmployeeInfoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 0;
  width: 100%;
`;

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
  flex: 1;

  div:first-child {
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  div:last-child {
    font-size: 0.8vw;
    color: grey;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    div:last-child {
      font-size: 12px;
    }
  }
`;

const CircleIconContainer = styled.button`
  width: 5.7vh;
  height: 5.7vh;
  border: none;
  padding: 0;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-secondary);
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid #1f2937;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }
`;

const AddEmployeeText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  cursor: pointer;
  color: #000000;
  letter-spacing: 0.7px;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    padding: 24px 16px;
    background: #ffffff;
    border-radius: 14px;
    margin: 0 4px;
  }
`;

const AssignmentCell = styled.div`
  font-size: 0.75vw;
  line-height: 1.4;
  color: #333;
  white-space: normal;
  word-break: break-word;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35vw;
`;

const AssignmentChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25vh 0.45vw;
  border-radius: 999px;
  background: var(--color-panel, #FFE6BB);
  font-size: 0.7vw;
  color: #333;
  line-height: 1.3;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 4px 8px;
    font-size: 11px;
  }
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
    getAssignmentChips,
  } = useEmployees();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    is_active: ''
  });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editLoadingId, setEditLoadingId] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const renderAssignmentChips = (employee) => {
    if (assignmentsLookupLoading && employeeHasAssignments(employee)) {
      return 'Loading...';
    }

    const chips = getAssignmentChips(employee);
    if (chips.length === 0) {
      return getAssignmentsSummary(employee);
    }

    return chips.map((chip) => (
      <AssignmentChip key={chip.key}>{chip.label}</AssignmentChip>
    ));
  };

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
      'var(--color-primary)', 
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  const handleAddEmployeeSuccess = () => {
    refreshEmployees();
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setSelectedEmployee(null);
  };

  const handleEditClick = async (employee) => {
    if (editLoadingId) return;

    setEditLoadingId(employee.id);
    try {
      const employeeData = await fetchEmployeeById(employee.id);
      setSelectedEmployee(employeeData);
      setShowEditDialog(true);
    } catch (err) {
      console.error('Failed to fetch employee for edit:', err);
      alert(err.message || 'Failed to load employee details. Please try again.');
    } finally {
      setEditLoadingId(null);
    }
  };

  const handleEditSuccess = () => {
    refreshEmployees();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.department) count += 1;
    if (filters.category) count += 1;
    if (filters.is_active) count += 1;
    return count;
  };

  const renderFilterSelects = () => (
    <>
      <BrandSelect
        aria-label="Department"
        placeholder="All Departments"
        value={filters.department}
        onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        options={[
          { value: '', label: 'All Departments' },
          ...uniqueDepartments.map((dept) => ({ value: dept, label: dept })),
        ]}
      />

      <BrandSelect
        aria-label="Category"
        placeholder="All Categories"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        options={[
          { value: '', label: 'All Categories' },
          ...uniqueCategories.map((cat) => ({ value: cat, label: cat })),
        ]}
      />
    </>
  );

  const renderEmployeeAvatar = (employee, mobile = false) => {
    if (employee.photo) {
      return (
        <img
          src={employee.photo}
          alt={employee.name}
          style={{
            width: mobile ? '44px' : '5.7vh',
            height: mobile ? '44px' : '5.7vh',
            borderRadius: mobile ? '10px' : '0.7vw',
            objectFit: 'cover',
            marginRight: mobile ? '10px' : '0.8vw',
            flexShrink: 0,
          }}
        />
      );
    }

    return (
      <Avatar color={getAvatarColor(employee.name)}>
        <div>{employee.name.charAt(0).toUpperCase()}</div>
      </Avatar>
    );
  };

  const renderMobileEmployeeCards = () => (
    <MobileCardsList>
      {filteredEmployees.map((employee) => (
        <MobileEmployeeCard key={employee.id}>
          <MobileCardHeader>
            <Checkbox
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => handleSelectEmployee(employee.id)}
            />
            <MobileCardMain onClick={() => handleStudentClick(employee.id)}>
              <EmployeeInfoContainer>
                {renderEmployeeAvatar(employee, true)}
                <EmployeeDetails>
                  <div>{employee.name}</div>
                  <div>{employee.employee_no || 'No ID'}</div>
                </EmployeeDetails>
              </EmployeeInfoContainer>
            </MobileCardMain>
            <StatusBadge status={employee.is_active}>
              {employee.is_active ? 'Active' : 'Inactive'}
            </StatusBadge>
          </MobileCardHeader>

          <MobileCardGrid>
            <MobileCardField>
              <MobileCardLabel>Email</MobileCardLabel>
              <MobileCardValue>{employee.email || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Phone</MobileCardLabel>
              <MobileCardValue>{employee.phone || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Salary</MobileCardLabel>
              <MobileCardValue>₹{employee.salary}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Department</MobileCardLabel>
              <MobileCardValue>{employee.department_name || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Category</MobileCardLabel>
              <MobileCardValue>{employee.category_name || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Sick / Absent</MobileCardLabel>
              <MobileCardValue>{employee.sick_leave_count} / {employee.present_days}</MobileCardValue>
            </MobileCardField>
            <MobileCardField className="full-width">
              <MobileCardLabel>Classes / Sections</MobileCardLabel>
              <MobileCardValue>
                <AssignmentCell>
                  {renderAssignmentChips(employee)}
                </AssignmentCell>
              </MobileCardValue>
            </MobileCardField>
          </MobileCardGrid>

          <MobileCardActions>
            <MobileCardButton
              onClick={() => handleEditClick(employee)}
              disabled={editLoadingId === employee.id}
            >
              {editLoadingId === employee.id ? 'Loading...' : 'Edit'}
            </MobileCardButton>
          </MobileCardActions>
        </MobileEmployeeCard>
      ))}
    </MobileCardsList>
  );

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
            <BrandSelect
              aria-label="Employees filter"
              placeholder="All Employees"
              value=""
              disabled
              options={[{ value: '', label: 'All Employees' }]}
            />
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
        <ToolbarRow>
          <SearchFilterBar>
            <SearchContainer>
              <SearchIcon src={searchIcon} alt="" />
              <SearchInput
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <MobileFilterToggle
              onClick={() => setShowMobileFilters((prev) => !prev)}
              aria-expanded={showMobileFilters}
              aria-label="Toggle filters"
              $active={showMobileFilters || getActiveFilterCount() > 0}
            >
              <FiFilter size={18} />
              {getActiveFilterCount() > 0 && (
                <FilterCountBadge>{getActiveFilterCount()}</FilterCountBadge>
              )}
            </MobileFilterToggle>
          </SearchFilterBar>

          <DesktopFilters>
            {renderFilterSelects()}
          </DesktopFilters>

          <DesktopToolbarActions>
            {selectedEmployees.length > 0 && (
              <SalaryReminderButton1 onClick={() => selectedEmployees.forEach(id => sendSalaryReminder(id))}>
                Send Reminder
              </SalaryReminderButton1>
            )}
            <AddEmployeeText onClick={() => setShowAddEmployeeDialog(true)}>
              Add Employee
            </AddEmployeeText>
            <ActionIconTooltip
              label={EMPLOYEE_TOOLBAR_ACTIONS.add.label}
              description={EMPLOYEE_TOOLBAR_ACTIONS.add.description}
            >
              <CircleIconContainer
                type="button"
                onClick={() => setShowAddEmployeeDialog(true)}
                aria-label={EMPLOYEE_TOOLBAR_ACTIONS.add.ariaLabel}
              >
                <img
                  src={Add}
                  alt=""
                  style={{ height: '1.8vh' }}
                />
              </CircleIconContainer>
            </ActionIconTooltip>
          </DesktopToolbarActions>
        </ToolbarRow>

        <MobileFiltersPanel $open={showMobileFilters}>
          {renderFilterSelects()}
        </MobileFiltersPanel>

        <ActionsRow>
          <MobileActions>
            <MobileActionButton onClick={() => setShowAddEmployeeDialog(true)}>
              <img src={Add} alt="" style={{ width: 18, height: 18 }} />
              Add Employee
            </MobileActionButton>
            {selectedEmployees.length > 0 && (
              <MobileActionButton onClick={() => selectedEmployees.forEach(id => sendSalaryReminder(id))}>
                Send Reminder ({selectedEmployees.length})
              </MobileActionButton>
            )}
          </MobileActions>
        </ActionsRow>
      </TopBar>

      {showAddEmployeeDialog && (
        <AddEmployeeDialog onClose={() => setShowAddEmployeeDialog(false)} onSuccess={handleAddEmployeeSuccess} />
      )}

      {showEditDialog && selectedEmployee && (
        <AddEmployeeDialog
          onClose={handleCloseEditDialog}
          onSuccess={handleEditSuccess}
          isEditMode={true}
          initialData={selectedEmployee}
        />
      )}

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
            <AddEmployeeText style={{ marginTop: '1vh' }}>Try adjusting your search or filters</AddEmployeeText>
          </EmptyState>
        ) : (
          <TableScrollWrapper>
            <Table>
              <colgroup>
                {TABLE_COLUMNS.map((column) => (
                  <col key={column.key} style={{ width: column.width }} />
                ))}
              </colgroup>
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
                  <Th $right={STICKY_EDIT_WIDTH} $edgeShadow>Status</Th>
                  <Th $right={0}>Edit</Th>
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
                      <EmployeeInfoContainer onClick={() => handleStudentClick(employee.id)}>
                        {renderEmployeeAvatar(employee)}
                        <EmployeeDetails>
                          <div>{employee.name}</div>
                          <div>{employee.employee_no}</div>
                        </EmployeeDetails>
                      </EmployeeInfoContainer>
                    </Td>
                    <Td>
                      <CellText title={employee.employee_no || '-'}>
                        {employee.employee_no || '-'}
                      </CellText>
                    </Td>
                    <Td>
                      <CellText title={employee.email || '-'}>
                        {employee.email || '-'}
                      </CellText>
                    </Td>
                    <Td>
                      <CellText title={employee.phone || '-'}>
                        {employee.phone || '-'}
                      </CellText>
                    </Td>
                    <Td>₹{employee.salary}</Td>
                    <Td>
                      <CellText title={employee.department_name || '-'}>
                        {employee.department_name || '-'}
                      </CellText>
                    </Td>
                    <Td>
                      <CellText title={employee.category_name || '-'}>
                        {employee.category_name || '-'}
                      </CellText>
                    </Td>
                    <Td>
                      <AssignmentCell>
                        {renderAssignmentChips(employee)}
                      </AssignmentCell>
                    </Td>
                    <Td>{employee.sick_leave_count ?? '-'}</Td>
                    <Td>{employee.present_days ?? '-'}</Td>
                    <Td $right={STICKY_EDIT_WIDTH} $edgeShadow>
                      <StatusCell>
                        <StatusBadge status={employee.is_active}>
                          {employee.is_active ? 'Active' : 'Inactive'}
                        </StatusBadge>
                      </StatusCell>
                    </Td>
                    <Td $right={0}>
                      <ActionCell>
                        <SalaryReminderButton
                          onClick={() => handleEditClick(employee)}
                          disabled={editLoadingId === employee.id}
                        >
                          {editLoadingId === employee.id ? 'Loading...' : 'Edit'}
                        </SalaryReminderButton>
                      </ActionCell>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableScrollWrapper>
        )}
      </TableContainer>

      <MobileOnlySection>
        {isRefreshing ? (
          <MobileCardsStack>
            {[...Array(4)].map((_, i) => (
              <MobileSkeletonCard key={i} />
            ))}
          </MobileCardsStack>
        ) : filteredEmployees.length === 0 ? (
          <EmptyState>
            <h3>No employees found</h3>
            <AddEmployeeText style={{ marginTop: '8px' }}>Try adjusting your search or filters</AddEmployeeText>
          </EmptyState>
        ) : (
          renderMobileEmployeeCards()
        )}
      </MobileOnlySection>
    </Container>
  );
};

export default Employees;