import { API_BASE_URL } from '@/config/api';
// src/pages/Fee.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import searchIcon from '../assets/Search.svg';
import axios from 'axios';
import { pdf } from '@react-pdf/renderer';
import FeeReceipt from '../components/FeeReceipt';
import { useAcademicYear } from '../context/AcademicYearContext';
import {
  fetchTermPendingFees,
  buildFeePaymentPayload,
  createFeePayment,
  fetchFeesCollectionPayments,
  downloadFeesCollectionExcel,
  paymentModeRequiresTxn,
  getOverallPendingFromTerms,
  getMaxPayableFromTerm,
  allocateAcrossTerms,
} from '../utils/feeApi';
import { searchStudents } from '../utils/studentSearchApi';
import {
  MIN_SEARCH_LENGTH,
  SEARCH_DEBOUNCE_MS,
  getSearchHint,
  getSearchPlaceholder,
  resolveSearchQuery,
} from '../utils/searchConfig';
import {
  getPaymentSearchHint,
  getPaymentSearchPlaceholder,
  resolvePaymentSearch,
} from '../utils/paymentSearchUtils';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

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
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: auto;
    flex-direction: column;
    gap: 16px;
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
  height: auto;
  min-height: 20vh;
  background: #ffffff;
  padding: 2.4vh 2vw 2.8vh;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2.4vh;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    min-height: auto;
    padding: 16px;
    border-radius: 14px;
    gap: 16px;
    order: 1;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 14px 12px;
    border-radius: 12px;
    gap: 14px;
  }
`;

const CollectionTopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const CollectionBody = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5vw;
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }
`;

const CollectionStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6vh;
  min-width: 0;
  flex: 1;
`;

const CollectionSubtitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.82vw;
  font-weight: 400;
  color: #8a8a8a;
  letter-spacing: 0.3px;
  line-height: 1.3;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }
`;

const CollectionAmount = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2.1vw;
  font-weight: 500;
  color: #000000;
  letter-spacing: 0.5px;
  line-height: 1.1;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 32px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 28px;
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
    min-height: auto;
    max-height: none;
    padding: 16px;
    border-radius: 14px;
    overflow-y: visible;
    order: 2;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 14px 12px;
    border-radius: 12px;
  }
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
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 280px;
    max-height: none;
    padding: 16px;
    border-radius: 14px;
    flex: 1;
    order: 3;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 14px 12px;
    border-radius: 12px;
    min-height: 240px;
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
  gap: 0.45vw;
  justify-content: flex-end;
  flex-wrap: nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

const PeriodButton = styled.button`
  width: auto;
  padding: 0.9vh 0.95vw;
  background-color: ${(props) => (props.$active ? '#FFEAC7' : 'transparent')};
  border: 1px solid #000000;
  color: #000000;
  border-radius: 0.55vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.78vw;
  letter-spacing: 0.5px;
  cursor: pointer;
  white-space: nowrap;
  min-height: 34px;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => (props.$active ? '#FFEAC7' : '#fff8eb')};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 9px 12px;
    font-size: 13px;
    border-radius: 8px;
    min-height: 38px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const SearchHintText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.7vw;
  color: #888;
  margin-top: 0.4vh;
  min-height: 1em;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-top: 4px;
  }
`;

const DayDateInput = styled.input`
  padding: 0.85vh 0.55vw;
  border-radius: 0.55vw;
  border: 1px solid #000000;
  font-family: 'Roboto', sans-serif;
  font-size: 0.78vw;
  font-weight: 400;
  background-color: ${(props) => (props.$active ? '#FFEAC7' : 'transparent')};
  color: #000000;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  width: auto;
  min-width: 9.5vw;
  height: 34px;
  box-sizing: border-box;
  flex-shrink: 0;

  &:hover {
    background-color: #fff8eb;
  }

  &:focus {
    border-color: #ffb942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
    background-color: #ffeac7;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-width: 140px;
    height: 38px;
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 8px;
  }
`;

const DownloadExcelButton = styled.button`
  flex-shrink: 0;
  width: auto;
  min-width: 11vw;
  height: 5.2vh;
  padding: 1vh 1.4vw;
  background-color: #ffeac7;
  border: none;
  color: #000000;
  border-radius: 3vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #ffb942;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 44px;
    border-radius: 10px;
    font-size: 14px;
    padding: 12px 16px;
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
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 28px;
    margin-right: 0;
    line-height: 1.2;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 24px;
  }
`;

const AddStudentText3 = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
  font-weight: 700;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
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
    font-size: 12px;
    margin-right: 0;
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
  box-sizing: border-box;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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

const FeesRecordsList = styled.div`
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

const FeeRecordItem = styled.div`
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 16px;
    min-height: 44px;
  }
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    max-width: 160px;
    height: 40px;
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 8px;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 16px;
    min-height: 44px;
  }
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
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#92FF84'};
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
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spin} 1s ease-in-out infinite;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 18px;
    height: 18px;
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
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-height: 220px;
    border-radius: 8px;
    z-index: 20;
  }
`;

const DropdownItem = styled.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  word-break: break-word;

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    font-size: 14px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

const PendingAmountText = styled.div`
  margin-top: 0.5vh;
  font-size: 0.7vw;
  color: #666;
  font-family: 'Roboto', sans-serif;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 6px;
    font-size: 13px;
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
    background-color: #FFEAC7;
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
    background-color: #FFEAC7;
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
  min-height: 44px;
  box-sizing: border-box;

  &:hover {
    background-color: #FFB942;
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

const MonthDropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1 1 auto;
    min-width: 0;
  }
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
    left: 0;
    right: auto;
    min-width: 140px;
    max-height: 240px;
    border-radius: 8px;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    font-size: 14px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

const YearDropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1 1 auto;
    min-width: 0;
  }
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
    left: 0;
    right: auto;
    min-width: 100px;
    max-height: 240px;
    border-radius: 8px;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    font-size: 14px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

const Fee = () => {
  const { academicYears, selectedAcademicYear } = useAcademicYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentSearchParams, setPaymentSearchParams] = useState({});
  const [paymentSearchHint, setPaymentSearchHint] = useState('');
  const [paymentsSummary, setPaymentsSummary] = useState(null);
  const [feesList, setFeesList] = useState([]);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(Math.max(currentYear, 2025));
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [paymentsPage, setPaymentsPage] = useState(1);

  const paymentSearchKey = useMemo(
    () =>
      [
        paymentSearchParams.q || '',
        paymentSearchParams.admission_no || '',
        paymentSearchParams.payment_date || '',
      ].join('|'),
    [
      paymentSearchParams.q,
      paymentSearchParams.admission_no,
      paymentSearchParams.payment_date,
    ]
  );

  const PAYMENT_MODE_CHOICES = [
    { value: 'cash', label: 'Cash' },
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Card' },
    { value: 'cheque', label: 'Cheque' },
  ];

  // Payment year/turn come ONLY from selected payable term — never UI filter year
  const [formData, setFormData] = useState({
    student: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    turn: '',
    fee_term_id: '',
    academic_year_id: '',
    payment_mode: 'cash',
    transaction_number: '',
    bank_name_id: '',
  });
  const [searchAcademicYearId, setSearchAcademicYearId] = useState('');

  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [studentSearchHint, setStudentSearchHint] = useState('');
  const [isStudentSearchLoading, setIsStudentSearchLoading] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedPayableTerm, setSelectedPayableTerm] = useState(null);
  const [pendingFeesData, setPendingFeesData] = useState(null);
  const studentSearchRequestRef = useRef(0);

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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })
      .format(amount || 0)
      .replace('₹', '₹');

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        const parts = String(dateString).split('-');
        if (parts.length === 3) {
          const [year, month, day] = parts;
          const newDate = new Date(year, month - 1, day);
          if (!isNaN(newDate.getTime())) {
            return newDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          }
        }
        return dateString;
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return months[monthNumber - 1];
  };

  const getToken = () => localStorage.getItem('token');

  const getMonthDateRange = (year, month) => {
    const start = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    return { startDate: start, endDate: end };
  };

  const buildPaymentsQuery = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const base = {
      q: paymentSearchParams.q || undefined,
      admissionNo: paymentSearchParams.admission_no || undefined,
      paymentDate: paymentSearchParams.payment_date || undefined,
      page: paymentsPage,
      pageSize: 50,
      academicYearId: selectedAcademicYear?.id || undefined,
    };
    if (displayMode === 'day') {
      if (selectedDate === today) return { ...base, period: 'today' };
      return { ...base, date: selectedDate };
    }
    if (displayMode === 'month') {
      const { startDate, endDate } = getMonthDateRange(selectedYear, selectedMonth);
      return { ...base, startDate, endDate };
    }
    return {
      ...base,
      startDate: `${selectedYear}-01-01`,
      endDate: `${selectedYear}-12-31`,
    };
  }, [
    paymentSearchKey,
    paymentsPage,
    selectedAcademicYear?.id,
    displayMode,
    selectedDate,
    selectedYear,
    selectedMonth,
  ]);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFeesCollectionPayments(buildPaymentsQuery());
      setPaymentsSummary(data.summary);
      setFeesList(data.results);
      setPaymentsCount(data.count);
    } catch (error) {
      console.error('Error fetching fees collection payments:', error);
      setPaymentsSummary(null);
      setFeesList([]);
      setPaymentsCount(0);
    } finally {
      setLoading(false);
    }
  }, [buildPaymentsQuery]);

  const fetchBankAccounts = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const response = await axios.get(`${API_BASE_URL}/masters/bank/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const resolved = resolvePaymentSearch(searchTerm, { defaultYear: selectedYear });

      if (!resolved.ready) {
        setPaymentSearchParams({});
        setPaymentSearchHint(resolved.hint || getPaymentSearchHint(searchTerm, { defaultYear: selectedYear }));
        return;
      }

      if (resolved.mode === 'payment_date' && resolved.params.payment_date) {
        const nextDate = resolved.params.payment_date;
        const [yearPart, monthPart] = nextDate.split('-');
        const yearNum = parseInt(yearPart, 10);
        const monthNum = parseInt(monthPart, 10);

        setDisplayMode('day');
        setSelectedDate(nextDate);
        if (!Number.isNaN(yearNum)) setSelectedYear(yearNum);
        if (!Number.isNaN(monthNum)) setSelectedMonth(monthNum);
        setPaymentSearchParams({});
        setPaymentSearchHint(resolved.label);
        return;
      }

      setPaymentSearchParams(resolved.params);
      setPaymentSearchHint(
        resolved.label || getPaymentSearchHint(searchTerm, { defaultYear: selectedYear })
      );
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedYear]);

  useEffect(() => {
    setPaymentsPage(1);
  }, [displayMode, selectedDate, selectedMonth, selectedYear, paymentSearchKey, searchTerm]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    const q = studentSearchTerm.trim();
    if (selectedStudent && q === getStudentDisplayLabel(selectedStudent)) {
      return undefined;
    }

    setStudentSearchHint(getSearchHint(q, MIN_SEARCH_LENGTH));

    if (!q) {
      setFilteredStudents([]);
      setIsStudentSearchLoading(false);
      return undefined;
    }

    const effectiveQ = resolveSearchQuery(q, MIN_SEARCH_LENGTH);
    if (effectiveQ === null) {
      setFilteredStudents([]);
      setIsStudentSearchLoading(false);
      return undefined;
    }

    const requestId = ++studentSearchRequestRef.current;
    setIsStudentSearchLoading(true);
    const timer = setTimeout(async () => {
      try {
        const yearId = searchAcademicYearId || selectedAcademicYear?.id || undefined;
        const result = await searchStudents({
          q: effectiveQ,
          page: 1,
          pageSize: 30,
          academicYearId: yearId,
        });
        if (requestId !== studentSearchRequestRef.current) return;
        setFilteredStudents(result.results);
      } catch (error) {
        if (requestId !== studentSearchRequestRef.current) return;
        console.error('Student search failed:', error);
        setFilteredStudents([]);
      } finally {
        if (requestId === studentSearchRequestRef.current) {
          setIsStudentSearchLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [studentSearchTerm, searchAcademicYearId, selectedAcademicYear?.id, selectedStudent]);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMonthDropdown, showYearDropdown]);

  const getTodayIso = () => new Date().toISOString().split('T')[0];

  const isTodaySelected =
    displayMode === 'day' && selectedDate === getTodayIso();

  const isDayDateActive =
    displayMode === 'day' && !isTodaySelected;

  const collectionSubtitle = useMemo(() => {
    if (displayMode === 'day') {
      return isTodaySelected
        ? 'Fees Collection (Today)'
        : `Fees Collection (${formatDate(selectedDate)})`;
    }
    if (displayMode === 'month') {
      return `Fees Collection (${getMonthName(selectedMonth)} ${selectedYear})`;
    }
    return `Fees Collection (${selectedYear})`;
  }, [displayMode, selectedDate, selectedMonth, selectedYear, isTodaySelected]);

  const handleTodayClick = () => {
    setDisplayMode('day');
    setSelectedDate(getTodayIso());
    setShowMonthDropdown(false);
    setShowYearDropdown(false);
  };

  const handleDayDateChange = (event) => {
    const nextDate = event.target.value;
    if (!nextDate) return;

    const [yearPart, monthPart] = nextDate.split('-');
    const yearNum = parseInt(yearPart, 10);
    const monthNum = parseInt(monthPart, 10);

    setDisplayMode('day');
    setSelectedDate(nextDate);
    if (!Number.isNaN(yearNum)) setSelectedYear(yearNum);
    if (!Number.isNaN(monthNum)) setSelectedMonth(monthNum);
    setShowMonthDropdown(false);
    setShowYearDropdown(false);
  };

  const handleDayDateFocus = () => {
    if (displayMode !== 'day') {
      setDisplayMode('day');
    }
  };

  const handleMonthPillClick = () => {
    setDisplayMode('month');
    setShowYearDropdown(false);
    setShowMonthDropdown((open) => !open);
  };

  const handleYearPillClick = () => {
    setShowMonthDropdown(false);
    setShowYearDropdown((open) => !open);
  };

  const handleYearSelect = (year, { fullYear = false } = {}) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
    if (fullYear) {
      setDisplayMode('year');
      return;
    }
    // Year change keeps current aggregation mode (month/day) but updates context
    if (displayMode === 'day') {
      const [, monthPart, dayPart] = selectedDate.split('-');
      const monthNum = parseInt(monthPart, 10);
      const dayNum = parseInt(dayPart, 10);
      const lastDay = new Date(year, monthNum, 0).getDate();
      const safeDay = Math.min(dayNum, lastDay);
      setSelectedDate(
        `${year}-${String(monthNum).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`
      );
    }
  };

  const summaryAmount =
    paymentsSummary?.total_amount != null
      ? formatCurrency(paymentsSummary.total_amount)
      : '₹0';

  const downloadExcelForDate = async () => {
    try {
      const blob = await downloadFeesCollectionExcel(buildPaymentsQuery());
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const stamp =
        displayMode === 'day'
          ? selectedDate
          : displayMode === 'month'
            ? `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`
            : String(selectedYear);
      link.href = url;
      link.download = `Fees_${stamp}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setSuccessMessage('Excel file downloaded successfully!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert(error.message || 'Failed to generate Excel file. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyPendingFeesToStudent = (student, pendingData) => {
    setPendingFeesData(pendingData);
    setSelectedStudent({
      ...student,
      payable_terms: pendingData.payable_terms,
      fee_terms: pendingData.payable_terms,
      academic_years: pendingData.academic_years,
      overall_pending_fees: pendingData.overall_pending_fees,
    });
  };

  const refetchPayableTerms = async (student) => {
    if (!student?.id) return null;
    const pendingData = await fetchTermPendingFees(student.id);
    applyPendingFeesToStudent(student, pendingData);
    return pendingData;
  };

  const handleStudentSelect = async (student) => {
    setFormData((prev) => ({
      ...prev,
      student: student.id,
      turn: '',
      fee_term_id: '',
      academic_year_id: '',
      amount: '',
    }));
    setSelectedPayableTerm(null);
    setPendingFeesData(null);
    setStudentSearchTerm(getStudentDisplayLabel(student));
    setShowStudentDropdown(false);
    setFormErrors((prev) => ({ ...prev, student: null }));
    setLoadingTerms(true);
    try {
      await refetchPayableTerms(student);
    } catch (error) {
      console.error('Error fetching pending fee terms:', error);
      setSelectedStudent({ ...student, payable_terms: [], fee_terms: [] });
      setPendingFeesData(null);
    } finally {
      setLoadingTerms(false);
    }
  };

  const handlePayableTermSelect = (feeTermId) => {
    const terms = selectedStudent?.payable_terms || selectedStudent?.fee_terms || [];
    const term = terms.find((t) => String(t.fee_term_id) === String(feeTermId));
    if (!term) {
      setSelectedPayableTerm(null);
      setFormData((prev) => ({
        ...prev,
        turn: '',
        fee_term_id: '',
        academic_year_id: '',
        amount: '',
      }));
      return;
    }
    setSelectedPayableTerm(term);
    setFormData((prev) => ({
      ...prev,
      fee_term_id: term.fee_term_id,
      academic_year_id: term.academic_year_id,
      turn: String(term.term),
      amount: term.pending_amount.toString(),
    }));
    setFormErrors((prev) => ({
      ...prev,
      turn: null,
      fee_term_id: null,
      amount: null,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const terms = selectedStudent?.payable_terms || selectedStudent?.fee_terms || [];
    const maxPayable = selectedPayableTerm
      ? getMaxPayableFromTerm(terms, selectedPayableTerm.fee_term_id)
      : 0;

    if (!selectedStudent || !formData.student) errors.student = 'Please select a student';
    if (!selectedPayableTerm || !formData.fee_term_id) {
      errors.turn = 'Please select a payable term';
      errors.fee_term_id = 'Payable term is required';
    }
    if (!formData.amount) {
      errors.amount = 'Please enter an amount';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid amount';
    } else if (selectedPayableTerm && parseFloat(formData.amount) > maxPayable + 0.001) {
      errors.amount = `Amount cannot exceed payable ₹${maxPayable.toFixed(2)} (selected term + later terms)`;
    }
    if (!formData.payment_date) errors.payment_date = 'Please select a payment date';
    if (!formData.payment_mode) errors.payment_mode = 'Please select a payment mode';
    if (paymentModeRequiresTxn(formData.payment_mode) && !formData.transaction_number) {
      errors.transaction_number = 'Please enter transaction number';
    }
    if (formData.payment_mode !== 'cash' && !formData.bank_name_id) {
      errors.bank_name_id = 'Please select a bank';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateAndDownloadReceipt = async (receiptData) => {
    try {
      const receiptComponent = <FeeReceipt data={receiptData} />;
      const pdfDoc = await pdf(receiptComponent);
      const pdfBlob = await pdfDoc.toBlob();
      const url = window.URL.createObjectURL(pdfBlob);
      const downloadWindow = window.open(url, '_blank');
      const formattedDate = new Date(receiptData.originalDate).toISOString().split('T')[0];
      if (downloadWindow) {
        downloadWindow.document.title = `Fee_Receipt_${receiptData.studentName}_${formattedDate}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `Fee_Receipt_${receiptData.studentName}_${formattedDate}.pdf`;
        downloadWindow.document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          downloadWindow.close();
          window.URL.revokeObjectURL(url);
        }, 1000);
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `Fee_Receipt_${receiptData.studentName}_${formattedDate}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
      throw error;
    }
  };

  const resetPaymentForm = () => {
    setFormData({
      student: '',
      amount: '',
      payment_date: new Date().toISOString().split('T')[0],
      turn: '',
      fee_term_id: '',
      academic_year_id: '',
      payment_mode: 'cash',
      transaction_number: '',
      bank_name_id: '',
    });
    setSelectedStudent(null);
    setSelectedPayableTerm(null);
    setPendingFeesData(null);
    setStudentSearchTerm('');
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!selectedPayableTerm?.fee_term_id || !selectedPayableTerm?.academic_year_id) {
      alert('Missing fee_term_id / academic_year_id from payable term. Cannot record payment.');
      return;
    }

    const terms = selectedStudent?.payable_terms || selectedStudent?.fee_terms || [];
    const currentPaymentAmount = parseFloat(formData.amount) || 0;
    const { allocations, leftover } = allocateAcrossTerms(
      currentPaymentAmount,
      terms,
      selectedPayableTerm.fee_term_id
    );

    if (!allocations.length) {
      alert('Could not allocate payment across payable terms.');
      return;
    }
    if (leftover > 0.001) {
      alert('Amount exceeds payable balance across selected and later terms.');
      return;
    }

    setIsSubmitting(true);
    const recordedPayments = [];
    try {
      for (const allocation of allocations) {
        let payload;
        try {
          payload = buildFeePaymentPayload({
            studentId: formData.student,
            amount: allocation.amount,
            paymentDate: formData.payment_date,
            paymentMode: formData.payment_mode,
            transactionNumber: formData.transaction_number,
            bankAccountId: formData.bank_name_id,
            payableTerm: allocation.payableTerm,
          });
        } catch (buildError) {
          alert(buildError.message);
          return;
        }

        const payment = await createFeePayment(payload);
        recordedPayments.push({ payment, allocation });
      }

      const firstPayment = recordedPayments[0]?.payment;
      const totalPendingBeforePayment = getOverallPendingFromTerms(pendingFeesData);
      const remainingBalance = Math.max(0, totalPendingBeforePayment - currentPaymentAmount);
      const academicYearLabel =
        selectedPayableTerm.academic_year_name ||
        academicYears.find((ay) => ay.id === selectedPayableTerm.academic_year_id)?.name ||
        'N/A';
      const termLabel =
        allocations.length === 1
          ? String(allocations[0].payableTerm.term)
          : allocations.map((a) => a.payableTerm.term).join(', ');
      const receiptNos = recordedPayments
        .map((r) => r.payment?.receipt_no)
        .filter(Boolean)
        .join(', ');

      const receiptData = {
        receiptNo: receiptNos || firstPayment?.receipt_no,
        transactionId: firstPayment?.transaction_number || formData.transaction_number,
        studentName: selectedStudent.name,
        admissionNo: selectedStudent.admission_no,
        group: selectedStudent.group || 'N/A',
        batch: selectedStudent.batch || 'N/A',
        fatherName: selectedStudent.father_name || 'N/A',
        paymentDate: formatDate(formData.payment_date),
        originalDate: formData.payment_date,
        paymentMode:
          formData.payment_mode.charAt(0).toUpperCase() + formData.payment_mode.slice(1),
        term: termLabel,
        amount: currentPaymentAmount.toFixed(2),
        remainingBalance: `₹${remainingBalance.toFixed(2)}`,
        academicYear: academicYearLabel,
        feeDetails: allocations.map((allocation) => {
          const yearLabel =
            allocation.payableTerm.academic_year_name ||
            academicYears.find((ay) => ay.id === allocation.payableTerm.academic_year_id)?.name ||
            academicYearLabel;
          return {
            particulars: `${yearLabel} — Term ${allocation.payableTerm.term} Fee`,
            amount: allocation.amount.toFixed(2),
          };
        }),
      };

      await Promise.all([
        refetchPayableTerms(selectedStudent).catch(() => null),
        fetchPayments(),
      ]);
      resetPaymentForm();
      setSuccessMessage(
        allocations.length > 1
          ? `Advance payment recorded across ${allocations.length} terms!`
          : 'Fee payment recorded successfully!'
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      try {
        await generateAndDownloadReceipt(receiptData);
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError);
        alert(
          'Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.'
        );
      }
    } catch (error) {
      console.error('Error submitting fee payment:', error);
      if (recordedPayments.length > 0) {
        await Promise.all([
          refetchPayableTerms(selectedStudent).catch(() => null),
          fetchPayments(),
        ]);
      }
      let errorMessage = 'Failed to record fee payment. Please try again.';
      if (recordedPayments.length > 0) {
        errorMessage = `Partial payment recorded for ${recordedPayments.length} term(s), then failed. Please check recent payments and retry the remainder.\n\n`;
      }
      const apiData = error.response?.data;
      if (apiData?.message) {
        errorMessage += apiData.message;
      } else if (apiData?.errors) {
        errorMessage += Object.entries(apiData.errors)
          .map(
            ([field, messages]) =>
              `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
          )
          .join('\n');
      } else if (typeof apiData === 'object' && apiData !== null) {
        errorMessage += Object.entries(apiData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n');
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      const token = getToken();
      const studentResponse = await axios.get(`${API_BASE_URL}/masters/students/${fee.student}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const student = studentResponse.data.data;
      let remainingBalance = 'N/A';
      const academicYearLabel =
        fee.academic_year_name ||
        fee.academic_year?.name ||
        academicYears.find((ay) => ay.id === (fee.academic_year_id || fee.academic_year))?.name ||
        selectedAcademicYear?.name ||
        'N/A';
      try {
        const pendingData = await fetchTermPendingFees(fee.student);
        const totalPending = getOverallPendingFromTerms(pendingData);
        remainingBalance = totalPending > 0 ? `₹${totalPending.toFixed(2)}` : '₹0.00';
      } catch (pendingError) {
        console.error('Error fetching pending fees:', pendingError);
      }
      const receiptData = {
        receiptNo: fee.receipt_no,
        transactionId: fee.transaction_number,
        studentName: student.name,
        admissionNo: student.admission_no,
        group: student.group || 'N/A',
        batch: student.batch || 'N/A',
        fatherName: student.father_name || 'N/A',
        paymentDate: formatDate(fee.payment_date),
        originalDate: fee.payment_date,
        paymentMode: fee.payment_mode.charAt(0).toUpperCase() + fee.payment_mode.slice(1),
        term: fee.turn,
        amount: fee.amount,
        remainingBalance,
        academicYear: academicYearLabel,
        feeDetails: [{ particulars: `Term ${fee.turn} Fee`, amount: fee.amount }],
      };
      await generateAndDownloadReceipt(receiptData);
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  if (loading && feesList.length === 0 && !paymentsSummary) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </div>
    );
  }

  const payableTerms = selectedStudent?.payable_terms || selectedStudent?.fee_terms || [];
  const overallPendingDisplay = pendingFeesData
    ? getOverallPendingFromTerms(pendingFeesData)
    : null;
  const maxPayableAmount = selectedPayableTerm
    ? getMaxPayableFromTerm(payableTerms, selectedPayableTerm.fee_term_id)
    : 0;
  const allocationPreview =
    selectedPayableTerm && formData.amount && !isNaN(formData.amount) && parseFloat(formData.amount) > 0
      ? allocateAcrossTerms(parseFloat(formData.amount), payableTerms, selectedPayableTerm.fee_term_id)
          .allocations
      : [];

  return (
    <DashboardContainer>
      <SuccessMessage show={showSuccess}>
        <SuccessIcon>✓</SuccessIcon>
        {successMessage}
      </SuccessMessage>

      <Container>
        <RevenuneContainer>
          <CollectionTopBar>
            <PeriodButtonRow>
              <DayDateInput
                type="date"
                value={selectedDate}
                onChange={handleDayDateChange}
                onFocus={handleDayDateFocus}
                $active={isDayDateActive}
                max={getTodayIso()}
                aria-label="Select fees collection date"
                title="Pick a specific date"
              />

              <PeriodButton
                type="button"
                $active={isTodaySelected}
                onClick={handleTodayClick}
                title="Jump to today"
              >
                Today
              </PeriodButton>

              <MonthDropdownContainer className="month-dropdown-container">
                <PeriodButton
                  type="button"
                  $active={displayMode === 'month'}
                  onClick={handleMonthPillClick}
                >
                  {getMonthName(selectedMonth)}
                </PeriodButton>
                <MonthDropdown show={showMonthDropdown}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthNum) => (
                    <MonthDropdownItem
                      key={monthNum}
                      selected={monthNum === selectedMonth}
                      onClick={() => {
                        setDisplayMode('month');
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
                <PeriodButton
                  type="button"
                  $active={displayMode === 'year'}
                  onClick={handleYearPillClick}
                >
                  {selectedYear}
                </PeriodButton>
                <YearDropdown show={showYearDropdown}>
                  {Array.from(
                    { length: Math.max(1, currentYear - 2025 + 1) },
                    (_, i) => 2025 + i
                  ).map((year) => (
                    <YearDropdownItem
                      key={year}
                      selected={year === selectedYear}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </YearDropdownItem>
                  ))}
                  <YearDropdownItem
                    selected={displayMode === 'year'}
                    onClick={() => handleYearSelect(selectedYear, { fullYear: true })}
                    style={{ borderTop: '1px solid #e8e8e8', fontWeight: 600 }}
                  >
                    View full year {selectedYear}
                  </YearDropdownItem>
                </YearDropdown>
              </YearDropdownContainer>
            </PeriodButtonRow>
          </CollectionTopBar>

          <CollectionBody>
            <CollectionStats>
              <CollectionSubtitle>{collectionSubtitle}</CollectionSubtitle>
              <CollectionAmount>{summaryAmount}</CollectionAmount>
            </CollectionStats>
            <DownloadExcelButton type="button" onClick={downloadExcelForDate}>
              Download Excel
            </DownloadExcelButton>
          </CollectionBody>
        </RevenuneContainer>

        <RevenuneContainer1>
          <SearchContainer>
            <SearchIcon src={searchIcon} />
            <SearchInput
              type="text"
              placeholder={getPaymentSearchPlaceholder(MIN_SEARCH_LENGTH)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          {paymentSearchHint && <SearchHintText>{paymentSearchHint}</SearchHintText>}

          <AddStudentText2>
            Recent Payments{paymentsCount ? ` (${paymentsCount})` : ''}
          </AddStudentText2>

          <FeesRecordsList>
            {feesList.length > 0 ? (
              feesList.map((fee) => (
                <FeeRecordItem key={fee.id} onClick={() => handleFeeClick(fee)}>
                  <RecordDetail>
                    {formatDate(fee.payment_date)} - {fee.student_name}
                    {fee.academic_year_name ? ` · ${fee.academic_year_name}` : ''}
                  </RecordDetail>
                  <RecordDetailAmount>{formatCurrency(fee.amount)}</RecordDetailAmount>
                </FeeRecordItem>
              ))
            ) : (
              <EmptyState>No fees records found</EmptyState>
            )}
          </FeesRecordsList>
        </RevenuneContainer1>
      </Container>

      <Container>
        <RevenuneContainer2>
          <AddStudentText3>Add Fee</AddStudentText3>

          <FormContainer>
            <FormGroup>
              <FormLabel>Student search year (filter only)</FormLabel>
              <FormSelect
                value={searchAcademicYearId || selectedAcademicYear?.id || ''}
                onChange={(e) => setSearchAcademicYearId(e.target.value)}
              >
                <option value="">All Academic Years</option>
                {academicYears.map((ay) => (
                  <option key={ay.id} value={ay.id}>
                    {ay.name}
                  </option>
                ))}
              </FormSelect>
              <PendingAmountText>
                Does not set payment year — payment uses the selected payable term.
              </PendingAmountText>
            </FormGroup>

            <FormGroup>
              <FormLabel>Student*</FormLabel>
              <StudentDropdown>
                <FormInput
                  type="text"
                  style={{ width: '100%', borderColor: formErrors.student ? '#ff4444' : '#ccc' }}
                  placeholder={getSearchPlaceholder('Search students')}
                  value={studentSearchTerm}
                  onChange={(e) => {
                    setStudentSearchTerm(e.target.value);
                    setShowStudentDropdown(true);
                    if (selectedStudent) {
                      setSelectedStudent(null);
                      setSelectedPayableTerm(null);
                      setPendingFeesData(null);
                      setFormData((prev) => ({
                        ...prev,
                        student: '',
                        turn: '',
                        fee_term_id: '',
                        academic_year_id: '',
                        amount: '',
                      }));
                    }
                  }}
                  onFocus={() => setShowStudentDropdown(true)}
                />
                {formErrors.student && <ErrorMessage>{formErrors.student}</ErrorMessage>}
                {studentSearchHint && <SearchHintText>{studentSearchHint}</SearchHintText>}
                {isStudentSearchLoading && (
                  <SearchHintText>Searching students...</SearchHintText>
                )}
                {showStudentDropdown && rankedFilteredStudents.length > 0 && (
                  <DropdownList>
                    {rankedFilteredStudents.map((student) => (
                      <DropdownItem key={student.id} onClick={() => handleStudentSelect(student)}>
                        {getStudentDisplayLabel(student)}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </StudentDropdown>
              {selectedStudent && (
                <PendingAmountText>
                  {loadingTerms
                    ? 'Loading pending terms...'
                    : overallPendingDisplay != null
                      ? `Overall pending: ₹${overallPendingDisplay.toFixed(2)} (${payableTerms.length} payable term${payableTerms.length === 1 ? '' : 's'})`
                      : 'Student selected'}
                </PendingAmountText>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Payable Term*</FormLabel>
              <FormSelect
                name="fee_term_id"
                value={formData.fee_term_id}
                onChange={(e) => handlePayableTermSelect(e.target.value)}
                style={{ borderColor: formErrors.turn || formErrors.fee_term_id ? '#ff4444' : '#ccc' }}
                disabled={loadingTerms || !selectedStudent}
                required
              >
                <option value="">
                  {loadingTerms
                    ? 'Loading terms...'
                    : !selectedStudent
                      ? 'Select a student first'
                      : payableTerms.length === 0
                        ? 'No pending terms available'
                        : `Select Term (${payableTerms.length} available)`}
                </option>
                {payableTerms.map((term) => (
                  <option key={term.fee_term_id || `${term.academic_year_id}-${term.term}`} value={term.fee_term_id}>
                    {term.label}
                  </option>
                ))}
              </FormSelect>
              {(formErrors.turn || formErrors.fee_term_id) && (
                <ErrorMessage>{formErrors.turn || formErrors.fee_term_id}</ErrorMessage>
              )}
              {selectedPayableTerm && (
                <PendingAmountText>
                  Starts at {selectedPayableTerm.academic_year_name || 'selected year'} — Term{' '}
                  {selectedPayableTerm.term}. Excess auto-applies to later terms (max ₹
                  {maxPayableAmount.toFixed(2)})
                </PendingAmountText>
              )}
              {selectedStudent && payableTerms.length === 0 && !loadingTerms && (
                <ErrorMessage>No pending fee terms available for this student</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Amount*</FormLabel>
              <FormInput
                type="number"
                name="amount"
                value={formData.amount}
                max={maxPayableAmount || undefined}
                step="0.01"
                onChange={(e) => {
                  handleInputChange(e);
                  if (formErrors.amount) {
                    setFormErrors((prev) => ({ ...prev, amount: null }));
                  }
                }}
                placeholder={
                  !selectedPayableTerm
                    ? 'Select a payable term first'
                    : `Max ₹${maxPayableAmount.toFixed(2)} (advance allowed)`
                }
                style={{ borderColor: formErrors.amount ? '#ff4444' : '#ccc' }}
                disabled={!selectedPayableTerm}
                required
              />
              {formErrors.amount && <ErrorMessage>{formErrors.amount}</ErrorMessage>}
              {!formErrors.amount && allocationPreview.length > 1 && (
                <PendingAmountText>
                  Advance split:{' '}
                  {allocationPreview
                    .map(
                      (item) =>
                        `Term ${item.payableTerm.term} ₹${item.amount.toFixed(2)}`
                    )
                    .join(' → ')}
                </PendingAmountText>
              )}
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
                    setFormErrors((prev) => ({ ...prev, payment_date: null }));
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
                    setFormErrors((prev) => ({ ...prev, payment_mode: null }));
                  }
                }}
                style={{ borderColor: formErrors.payment_mode ? '#ff4444' : '#ccc' }}
                required
              >
                {PAYMENT_MODE_CHOICES.map((mode) => (
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
                  <FormLabel>Transaction Number{paymentModeRequiresTxn(formData.payment_mode) ? '*' : ''}</FormLabel>
                  <FormInput
                    type="text"
                    name="transaction_number"
                    value={formData.transaction_number}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.transaction_number) {
                        setFormErrors((prev) => ({ ...prev, transaction_number: null }));
                      }
                    }}
                    placeholder="Enter transaction number"
                    style={{ borderColor: formErrors.transaction_number ? '#ff4444' : '#ccc' }}
                    required={paymentModeRequiresTxn(formData.payment_mode)}
                  />
                  {formErrors.transaction_number && (
                    <ErrorMessage>{formErrors.transaction_number}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Bank*</FormLabel>
                  <FormSelect
                    name="bank_name_id"
                    value={formData.bank_name_id}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.bank_name_id) {
                        setFormErrors((prev) => ({ ...prev, bank_name_id: null }));
                      }
                    }}
                    style={{ borderColor: formErrors.bank_name_id ? '#ff4444' : '#ccc' }}
                    required
                  >
                    <option value="">Select Bank</option>
                    {bankAccounts.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name} ({bank.code})
                      </option>
                    ))}
                  </FormSelect>
                  {formErrors.bank_name_id && <ErrorMessage>{formErrors.bank_name_id}</ErrorMessage>}
                </FormGroup>
              </>
            )}

            <FormButton onClick={handleSubmit} disabled={isSubmitting}>
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
          <DialogContent onClick={(e) => e.stopPropagation()}>
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
                <DialogValue>
                  {selectedFee.payment_mode.charAt(0).toUpperCase() + selectedFee.payment_mode.slice(1)}
                </DialogValue>
              </DialogDetail>
              {selectedFee.transaction_number && (
                <DialogDetail>
                  <DialogLabel>Transaction No</DialogLabel>
                  <DialogValue>{selectedFee.transaction_number}</DialogValue>
                </DialogDetail>
              )}
            </DialogRow>

            {(selectedFee.academic_year_name || selectedFee.academic_year) && (
              <DialogRow>
                <DialogDetail>
                  <DialogLabel>Academic Year</DialogLabel>
                  <DialogValue>
                    {selectedFee.academic_year_name ||
                      selectedFee.academic_year?.name ||
                      selectedFee.academic_year}
                  </DialogValue>
                </DialogDetail>
              </DialogRow>
            )}

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
