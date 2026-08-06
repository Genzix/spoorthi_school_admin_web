import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';
import styled, { keyframes } from 'styled-components';
import searchIcon from '../assets/Search.svg';
import axios from 'axios';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import MiscReceipt from '../components/MiscReceipt';
import { useStudents } from '../context/StudentsContext';
import BrandSelect from '../components/BrandSelect';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  border: 5px solid var(--color-primary-soft);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: ${spin} 1s ease-in-out infinite;
`;

const DashboardContainer = styled.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: auto;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    gap: 14px;
    padding-bottom: 16px;
  }
`;

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 0;
    gap: 16px;
    align-items: stretch;
    display: contents;
  }
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
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 16px;
    border-radius: 14px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    order: 1;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 14px 12px;
    border-radius: 12px;
    gap: 14px;
  }
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
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: ${props => (props.$mobileOrder === 3 ? '280px' : 'auto')};
    max-height: none;
    padding: 16px;
    border-radius: 14px;
    overflow-y: visible;
    order: ${props => props.$mobileOrder ?? 2};
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 14px 12px;
    border-radius: 12px;
    min-height: ${props => (props.$mobileOrder === 3 ? '240px' : 'auto')};
  }
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    justify-content: flex-start;
  }
`;

const SummaryControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    gap: 12px;
  }
`;

const SummaryTitleRow = styled.div`
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

const PeriodButtonRow = styled.div`
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

const PeriodButton = styled.button`
  padding: 0.7vh 1vw;
  background-color: ${props => (props.$active ? 'var(--color-primary)' : '#EFEFEF')};
  color: ${props => (props.$active ? 'var(--color-on-primary, #111111)' : '#000000')};
  border: none;
  border-radius: 0.4vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  letter-spacing: 0.7px;
  white-space: nowrap;
  min-height: 36px;
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props =>
      props.$active ? 'var(--color-secondary)' : 'var(--color-row-hover)'};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px 14px;
    font-size: 13px;
    border-radius: 8px;
    min-height: 40px;
    flex: 1 1 auto;
    min-width: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 9px 10px;
    font-size: 12px;
  }
`;

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 700;
  color: #000000;
  display: flex;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    margin-right: 0;
  }
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-top: 0;
    margin-right: 0;
  }
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  margin-top: 2vh;
  font-weight: 500;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 28px;
    margin-top: 8px;
    margin-right: 0;
    line-height: 1.2;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 24px;
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
    font-size: 16px;
    margin-top: 12px;
    margin-right: 0;
  }
`;

const AddStudentText3 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2vw;
  margin-top: 2vh;
  font-weight: 500;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
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
    padding: 10px 14px 10px 40px;
    border-radius: 22px;
    font-size: 14px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 16px;
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
    height: 18px;
  }
`;

const MiscRecordsList = styled.div`
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

const MiscRecordItem = styled.div`
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
  transition: background-color 0.2s ease;

  &:active {
    background-color: #e5e5e5;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 10px;
    gap: 6px;
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
    font-size: 13px;
    margin-right: 0;
    width: 100%;
  }
`;

const RecordDetailAmount = styled(RecordDetail)`
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-weight: 600;
    font-size: 15px;
    align-self: flex-end;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto', sans-serif;
  margin: auto;
  color: #666;
  font-size: 0.8vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 24px 12px;
    font-size: 14px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 14px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 6px;
  }
`;

const FormLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }
`;

const FormInput = styled.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 16px;
    min-height: 44px;
  }
`;

const FormSelect = styled.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  background-color: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 16px;
    min-height: 44px;
  }
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
  border: 1px solid #eeeeee;
  border-radius: 12px;
  z-index: 10;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  padding: 8px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-height: 220px;
    border-radius: 10px;
    z-index: 20;
  }
`;

const DropdownItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  word-break: break-word;
  border-radius: 20px;
  color: #212529;
  transition: background 0.15s ease;

  &:hover {
    background-color: var(--color-row-hover);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    font-size: 14px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

const FormButton = styled.button`
  padding: 1.5vh 1vw;
  background-color: var(--color-primary);
  color: var(--color-on-primary, #111111);
  border: none;
  border-radius: 0.6vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  width: 100%;
  box-sizing: border-box;
  min-height: 4vh;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-secondary);
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 14px 16px;
    border-radius: 10px;
    font-size: 15px;
    margin-top: 16px;
    min-height: 48px;
    gap: 8px;
  }
`;

const ButtonSpinner = styled.div`
  width: 1vw;
  height: 1vw;
  border: 2px solid var(--color-primary-soft);
  border-radius: 50%;
  border-top-color: var(--color-on-primary, #000);
  animation: ${spin} 1s linear infinite;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 18px;
    height: 18px;
  }
`;

const HelperText = styled.div`
  font-size: 0.7vw;
  color: #666;
  margin-top: 0.3vh;
  font-family: 'Roboto', sans-serif;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
    margin-top: 6px;
  }
`;

const LoadingWrapper = styled.div`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 50vh;
    min-height: 200px;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    top: 12px;
    right: 12px;
    left: 12px;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: 10px;
    text-align: center;
  }
`;

const SuccessIcon = styled.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-right: 6px;
    font-size: 16px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-top: 4px;
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
  padding: 16px;
  box-sizing: border-box;
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
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    max-width: 100%;
    padding: 20px 16px 16px;
    border-radius: 16px;
    max-height: 90vh;
  }
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
    background-color: var(--color-primary-light);
    color: #1a1a1a;
    transform: rotate(90deg);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
`;

const DialogTitle = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin-bottom: 16px;
    padding-right: 36px;
  }
`;

const DialogRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    margin-bottom: 10px;
    gap: 10px;
  }
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
    background-color: var(--color-row-hover);
    transform: translateY(-2px);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px;
    border-radius: 10px;
    gap: 4px;

    &:hover {
      transform: none;
    }
  }
`;

const DialogLabel = styled.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
  }
`;

const DialogValue = styled.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 15px;
  }
`;

const DownloadButton = styled.button`
  background-color: var(--color-primary-light);
  color: #1a1a1a;
  border: none;
  padding: 1vh 1.5vw;
  border-radius: 0.8vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-top: 1.5vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  transition: all 0.2s;
  min-height: 44px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--color-primary);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 14px 16px;
    border-radius: 10px;
    font-size: 15px;
    margin-top: 12px;
    gap: 8px;
  }
`;

const Miscellaneous = () => {
  const { students, getFilteredStudents } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [miscData, setMiscData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('month');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const CATEGORY_CHOICES = [
    { value: 'Bus', label: 'Bus' },
    { value: 'Practical', label: 'Practical' },
    { value: 'Exam', label: 'Exam' },
    { value: 'Books', label: 'Books' },
    { value: 'Building Fund', label: 'Building Fund' },
    { value: 'Record', label: 'Record' },
    { value: 'Other', label: 'Other' },
  ];

  const PAYMENT_MODE_CHOICES = [
    { value: 'cash', label: 'Cash' },
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Card' },
    { value: 'cheque', label: 'Cheque' },
  ];

  // Form state
  const [formData, setFormData] = useState({
    student_id: '',
    category: '',
    amount: '',
    paided_amount: '',
    payment_mode: 'cash',
    payment_date: new Date().toISOString().split('T')[0],
    custom_category: '',
    transaction_number: '',
    bank_name_id: ''
  });

  // Student search state
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedMisc, setSelectedMisc] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [filteredMisc, setFilteredMisc] = useState([]);

  const [existingMiscPayment, setExistingMiscPayment] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(0);

  const [bankAccounts, setBankAccounts] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getMonthName = (monthNumber) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchMiscData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/miscellaneous/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setMiscData(response.data);
    } catch (error) {
      console.error('Error fetching miscellaneous data:', error);
    } finally {
      setLoading(false);
    }
  };



  const fetchBankAccounts = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.get(`${API_BASE_URL}/masters/bank/`, {
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
    if (searchTerm) {
      const filtered = miscData.filter(misc =>
        misc.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(misc.payment_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
        misc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        misc.student.admission_no.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMisc(filtered);
    } else {
      setFilteredMisc(miscData);
    }
  }, [searchTerm, miscData]);

  useEffect(() => {
    fetchMiscData();
    fetchBankAccounts();
  }, []);

  const checkExistingMiscPayment = async (studentId, category) => {
    try {
      const token = getToken();
      if (!token) return;

      // First check if there are any previous payments for this student and category
      const previousPayments = miscData.filter(misc =>
        misc.student.id === studentId &&
        misc.category === category
      );

      if (previousPayments.length > 0) {
        // Get the total amount from the first entry only
        const totalAmount = parseFloat(previousPayments[0].amount);

        // Calculate total paid amount from all entries
        const totalPaidAmount = previousPayments.reduce((sum, payment) =>
          sum + parseFloat(payment.paided_amount), 0
        );

        // Calculate pending amount
        const pendingAmount = totalAmount - totalPaidAmount;

        setExistingMiscPayment({
          totalAmount,
          totalPaidAmount,
          pendingAmount,
          previousPayments
        });

        setPendingAmount(pendingAmount);

        // Set the total amount in the form
        setFormData(prev => ({
          ...prev,
          amount: totalAmount.toString(),
          paided_amount: ''
        }));
      } else {
        // If no previous payments, make API call to check if payment exists
        const response = await axios.post(`${API_BASE_URL}/masters/miscellaneous/check-payment/`, {
          student_id: studentId,
          category: category
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.exists) {
          const existingPayment = response.data.payment;
          setExistingMiscPayment({
            totalAmount: parseFloat(existingPayment.amount),
            totalPaidAmount: 0,
            pendingAmount: parseFloat(existingPayment.amount),
            previousPayments: []
          });
          setPendingAmount(parseFloat(existingPayment.amount));
          setFormData(prev => ({
            ...prev,
            amount: existingPayment.amount,
            paided_amount: ''
          }));
        } else {
          setExistingMiscPayment(null);
          setPendingAmount(0);
          setFormData(prev => ({
            ...prev,
            amount: '',
            paided_amount: ''
          }));
        }
      }
    } catch (error) {
      console.error('Error checking existing payment:', error);
      setExistingMiscPayment(null);
      setPendingAmount(0);
      setFormData(prev => ({
        ...prev,
        amount: '',
        paided_amount: ''
      }));
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFormData(prev => ({
      ...prev,
      student_id: student.id
    }));
    setStudentSearchTerm(`${student.name} (${student.admission_no})`);
    setShowStudentDropdown(false);
    setFormErrors(prev => ({ ...prev, student_id: null }));

    // Reset existing payment when student changes
    setExistingMiscPayment(null);
    setPendingAmount(0);

    // If category is already selected, check for previous payments
    if (formData.category) {
      checkExistingMiscPayment(student.id, formData.category);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check for existing payment when category is selected
    if (name === 'category' && formData.student_id) {
      checkExistingMiscPayment(formData.student_id, value);
    }

    // Clear validation errors when field is modified
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedStudent || !formData.student_id) {
      errors.student_id = 'Please select a student';
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
    }

    if (!formData.amount) {
      errors.amount = 'Please enter an amount';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid amount';
    }

    if (!formData.paided_amount) {
      errors.paided_amount = 'Please enter paid amount';
    } else if (isNaN(formData.paided_amount) || parseFloat(formData.paided_amount) < 0) {
      errors.paided_amount = 'Please enter a valid amount';
    } else if (existingMiscPayment && parseFloat(formData.paided_amount) > pendingAmount) {
      errors.paided_amount = `Paid amount cannot exceed pending amount of ${formatCurrency(pendingAmount)}`;
    }

    if (!formData.payment_date) {
      errors.payment_date = 'Please select a payment date';
    }

    if (!formData.payment_mode) {
      errors.payment_mode = 'Please select a payment mode';
    }

    if (['upi', 'card', 'cheque'].includes(formData.payment_mode)) {
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
        const receiptComponent = <MiscReceipt data={receiptData} />;

        // Generate PDF
        const pdfDoc = await pdf(receiptComponent);
        const pdfBlob = await pdfDoc.toBlob();

        // Create a new URL for the blob
        const url = window.URL.createObjectURL(pdfBlob);

        // Create a new window for download
        const downloadWindow = window.open(url, '_blank');

        if (downloadWindow) {
          // If window.open was successful
          downloadWindow.document.title = `Misc_Receipt_${receiptData.studentName}_${receiptData.paymentDate}`;

          // Create download link
          const link = document.createElement('a');
          link.href = url;
          link.download = `Misc_Receipt_${receiptData.studentName}_${receiptData.paymentDate}.pdf`;

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
          const link = document.createElement('a');
          link.href = url;
          link.download = `Misc_Receipt_${receiptData.studentName}_${receiptData.paymentDate}.pdf`;
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
    try {
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      // Prepare payload based on payment mode
      const payload = { ...formData };

      // Remove bank_name_id and transaction_number for cash payments
      if (payload.payment_mode === 'cash') {
        delete payload.bank_name_id;
        delete payload.transaction_number;
      }

      const response = await axios.post(`${API_BASE_URL}/masters/miscellaneous/`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        // Prepare receipt data
        const receiptData = {
          studentName: selectedStudent.name,
          admissionNo: selectedStudent.admission_no,
          className: selectedStudent.class_name?.name || 'N/A',
          section: selectedStudent.section?.name || 'N/A',
          fatherName: selectedStudent.father_name || 'N/A',
          paymentDate: formatDate(formData.payment_date),
          paymentMode: formData.payment_mode.charAt(0).toUpperCase() + formData.payment_mode.slice(1),
          category: formData.category,
          amount: formData.amount,
          paided_amount: formData.paided_amount,
          academicYear: '2025-2026'
        };

        // Reset form
        setFormData({
          student_id: '',
          category: '',
          amount: '',
          paided_amount: '',
          payment_mode: 'cash',
          payment_date: new Date().toISOString().split('T')[0],
          custom_category: '',
          transaction_number: '',
          bank_name_id: ''
        });
        setSelectedStudent(null);
        setStudentSearchTerm('');
        setFormErrors({});

        // Show success message
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

        // Generate and download receipt
        try {
          await generateAndDownloadReceipt(receiptData);
        } catch (pdfError) {
          console.error('Error generating PDF:', pdfError);
          alert('Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.');
        }

        // Refresh data
        fetchMiscData();
      }
    } catch (error) {
      console.error('Error submitting miscellaneous payment:', error);
      let errorMessage = 'Failed to record payment. Please try again.';

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMiscClick = (misc) => {
    setSelectedMisc(misc);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedMisc(null);
  };

  const handleDownloadReceipt = async (misc) => {
    try {
      // Fetch student details for the receipt
      const token = getToken();
      const studentResponse = await axios.get(`${API_BASE_URL}/masters/students/${misc.student.id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const student = studentResponse.data.data;

      // Prepare receipt data
      const receiptData = {
        studentName: student.name,
        admissionNo: student.admission_no,
        className: student.class_name?.name || 'N/A',
        section: student.section?.name || 'N/A',
        fatherName: student.father_name || 'N/A',
        paymentDate: formatDate(misc.payment_date),
        paymentMode: misc.payment_mode.charAt(0).toUpperCase() + misc.payment_mode.slice(1),
        category: misc.category,
        amount: misc.amount,
        paided_amount: misc.paided_amount,
        academicYear: '2025-2026'
      };

      await generateAndDownloadReceipt(receiptData);
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    }
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
      <SuccessMessage show={showSuccess}>
        <SuccessIcon>✓</SuccessIcon>
        Miscellaneous payment recorded successfully!
      </SuccessMessage>

      <Container>
        <RevenuneContainer>
          <SummarySection>
            <SummaryTitleRow>
              <Logo>Miscellaneous Collection</Logo>
              <AddStudentText>({displayMode === 'month' ? getMonthName(currentMonth) : currentYear})</AddStudentText>
            </SummaryTitleRow>
            <AddStudentText1>
              {miscData.reduce((total, misc) => total + parseFloat(misc.paided_amount), 0).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
              }).replace('₹', '₹')}
            </AddStudentText1>
          </SummarySection>
          <SummaryControlsSection>
            <PeriodButtonRow>
              <PeriodButton
                type="button"
                $active={displayMode === 'year'}
                onClick={() => setDisplayMode('year')}
              >
                {currentYear}
              </PeriodButton>
              <PeriodButton
                type="button"
                $active={displayMode === 'month'}
                onClick={() => setDisplayMode('month')}
              >
                {getMonthName(currentMonth)}
              </PeriodButton>
            </PeriodButtonRow>
          </SummaryControlsSection>
        </RevenuneContainer>

        <RevenuneContainer2 $mobileOrder={3}>
          <SearchContainer>
            <SearchIcon src={searchIcon} />
            <SearchInput
              type="text"
              placeholder="Search by date or student name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <AddStudentText2>Recent Payments</AddStudentText2>

          <MiscRecordsList>
            {filteredMisc.length > 0 ? (
              [...filteredMisc].reverse().map((misc) => (
                <MiscRecordItem
                  key={misc.id}
                  onClick={() => handleMiscClick(misc)}
                >
                  <RecordDetail>
                    {misc.category} - {misc.student.name} ({misc.student.admission_no})
                  </RecordDetail>
                  <RecordDetailAmount>{formatCurrency(misc.paided_amount)}</RecordDetailAmount>
                </MiscRecordItem>
              ))
            ) : (
              <EmptyState>No miscellaneous records found</EmptyState>
            )}
          </MiscRecordsList>
        </RevenuneContainer2>
      </Container>

      <Container>
        <RevenuneContainer2 $mobileOrder={2}>
          <AddStudentText3>Add Miscellaneous Payment</AddStudentText3>

          <FormContainer>
            <FormGroup>
              <FormLabel>Student*</FormLabel>
              <StudentDropdown>
                <FormInput
                  type="text"
                  style={{ borderColor: formErrors.student_id ? '#ff4444' : '#ccc' }}
                  placeholder="Search by student name or admission no"
                  value={studentSearchTerm}
                  onChange={(e) => {
                    setStudentSearchTerm(e.target.value);
                    setShowStudentDropdown(true);
                    if (selectedStudent) {
                      setFormErrors(prev => ({ ...prev, student_id: null }));
                    }
                  }}
                  onFocus={() => setShowStudentDropdown(true)}
                />
                {formErrors.student_id && <ErrorMessage>{formErrors.student_id}</ErrorMessage>}
                {showStudentDropdown && filteredStudents.length > 0 && (
                  <DropdownList>
                    {filteredStudents.map(student => (
                      <DropdownItem
                        key={student.id}
                        onClick={() => handleStudentSelect(student)}
                      >
                        {student.name} ({student.admission_no}) - {student.class_name?.name || 'N/A'}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </StudentDropdown>
            </FormGroup>

            <FormGroup>
              <FormLabel>Category*</FormLabel>
              <BrandSelect
                variant="field"
                name="category"
                aria-label="Category"
                placeholder="Select Category"
                value={formData.category}
                onChange={handleInputChange}
                error={Boolean(formErrors.category)}
                options={[
                  { value: '', label: 'Select Category' },
                  ...CATEGORY_CHOICES.map((category) => ({
                    value: category.value,
                    label: category.label,
                  })),
                ]}
              />
              {formErrors.category && <ErrorMessage>{formErrors.category}</ErrorMessage>}
            </FormGroup>

            {formData.category === 'Other' && (
              <FormGroup>
                <FormLabel>Custom Category</FormLabel>
                <FormInput
                  type="text"
                  name="custom_category"
                  value={formData.custom_category}
                  onChange={handleInputChange}
                  placeholder="Enter custom category"
                />
              </FormGroup>
            )}

            <FormGroup>
              <FormLabel>Amount*</FormLabel>
              <FormInput
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                style={{ borderColor: formErrors.amount ? '#ff4444' : '#ccc' }}
                disabled={existingMiscPayment !== null}
              />
              {existingMiscPayment && (
                <HelperText>
                  Total Amount: {formatCurrency(existingMiscPayment.totalAmount)}
                  {existingMiscPayment.totalPaidAmount > 0 && (
                    <span style={{ marginLeft: '8px' }}>
                      (Paid: {formatCurrency(existingMiscPayment.totalPaidAmount)})
                    </span>
                  )}
                </HelperText>
              )}
              {formErrors.amount && <ErrorMessage>{formErrors.amount}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Paid Amount*</FormLabel>
              <FormInput
                type="number"
                name="paided_amount"
                value={formData.paided_amount}
                onChange={handleInputChange}
                placeholder={pendingAmount > 0 ? `Enter amount (max: ${formatCurrency(pendingAmount)})` : "Enter paid amount"}
                style={{ borderColor: formErrors.paided_amount ? '#ff4444' : '#ccc' }}
              />
              {pendingAmount > 0 && (
                <HelperText>
                  Pending Amount: {formatCurrency(pendingAmount)}
                </HelperText>
              )}
              {formErrors.paided_amount && <ErrorMessage>{formErrors.paided_amount}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Payment Date*</FormLabel>
              <FormInput
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleInputChange}
                style={{ borderColor: formErrors.payment_date ? '#ff4444' : '#ccc' }}
              />
              {formErrors.payment_date && <ErrorMessage>{formErrors.payment_date}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Payment Mode*</FormLabel>
              <BrandSelect
                variant="field"
                name="payment_mode"
                aria-label="Payment Mode"
                placeholder="Payment Mode"
                value={formData.payment_mode}
                onChange={handleInputChange}
                error={Boolean(formErrors.payment_mode)}
                options={PAYMENT_MODE_CHOICES.map((mode) => ({
                  value: mode.value,
                  label: mode.label,
                }))}
              />
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
                    onChange={handleInputChange}
                    placeholder="Enter transaction number"
                    style={{ borderColor: formErrors.transaction_number ? '#ff4444' : '#ccc' }}
                  />
                  {formErrors.transaction_number && <ErrorMessage>{formErrors.transaction_number}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Bank*</FormLabel>
                  <BrandSelect
                    variant="field"
                    name="bank_name_id"
                    aria-label="Bank"
                    placeholder="Select Bank"
                    value={String(formData.bank_name_id || '')}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.bank_name_id)}
                    options={[
                      { value: '', label: 'Select Bank' },
                      ...bankAccounts.map((bank) => ({
                        value: String(bank.id),
                        label: `${bank.name} (${bank.code})`,
                      })),
                    ]}
                  />
                  {formErrors.bank_name_id && <ErrorMessage>{formErrors.bank_name_id}</ErrorMessage>}
                </FormGroup>
              </>
            )}

            <FormButton
              type="submit"
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

      {showDialog && selectedMisc && (
        <Dialog onClick={handleCloseDialog}>
          <DialogContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={handleCloseDialog}>&times;</CloseButton>
            <DialogTitle>Miscellaneous Payment Details</DialogTitle>

            <DialogRow>
              <DialogDetail>
                <DialogLabel>Student Name</DialogLabel>
                <DialogValue>{selectedMisc.student.name}</DialogValue>
              </DialogDetail>
              <DialogDetail>
                <DialogLabel>Amount</DialogLabel>
                <DialogValue>{formatCurrency(selectedMisc.amount)}</DialogValue>
              </DialogDetail>
            </DialogRow>

            <DialogRow>
              <DialogDetail>
                <DialogLabel>Category</DialogLabel>
                <DialogValue>{selectedMisc.category}</DialogValue>
              </DialogDetail>
              <DialogDetail>
                <DialogLabel>Paid Amount</DialogLabel>
                <DialogValue>{formatCurrency(selectedMisc.paided_amount)}</DialogValue>
              </DialogDetail>
            </DialogRow>

            <DialogRow>
              <DialogDetail>
                <DialogLabel>Payment Date</DialogLabel>
                <DialogValue>{formatDate(selectedMisc.payment_date)}</DialogValue>
              </DialogDetail>
              <DialogDetail>
                <DialogLabel>Payment Mode</DialogLabel>
                <DialogValue>{selectedMisc.payment_mode.charAt(0).toUpperCase() + selectedMisc.payment_mode.slice(1)}</DialogValue>
              </DialogDetail>
            </DialogRow>

            {selectedMisc.payment_mode !== 'cash' && (
              <DialogRow>
                <DialogDetail>
                  <DialogLabel>Transaction Number</DialogLabel>
                  <DialogValue>{selectedMisc.transaction_number}</DialogValue>
                </DialogDetail>
                {selectedMisc.bank_name && (
                  <DialogDetail>
                    <DialogLabel>Bank</DialogLabel>
                    <DialogValue>{selectedMisc.bank_name.name}</DialogValue>
                  </DialogDetail>
                )}
              </DialogRow>
            )}

            {selectedMisc.custom_category && (
              <DialogRow>
                <DialogDetail>
                  <DialogLabel>Custom Category</DialogLabel>
                  <DialogValue>{selectedMisc.custom_category}</DialogValue>
                </DialogDetail>
              </DialogRow>
            )}

            <DownloadButton onClick={() => handleDownloadReceipt(selectedMisc)}>
              Download Receipt
            </DownloadButton>
          </DialogContent>
        </Dialog>
      )}
    </DashboardContainer>
  );
};

export default Miscellaneous; 