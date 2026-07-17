import { API_BASE_URL } from '@/config/api';
// src/pages/BulkMessages.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FiSend, FiUserX, FiMessageCircle, FiCalendar, FiDollarSign, FiUpload, FiFileText, FiX, FiClock, FiRefreshCw, FiEdit2, FiSearch } from 'react-icons/fi';
import { useClassSectionLookup } from '../hooks/useClassSectionLookup';
import { getSectionDisplayLabel } from '../utils/employeeAssignments';
import {
  TARGET_AUDIENCE_OPTIONS,
  CATEGORY_OPTIONS,
  DEFAULT_ANNOUNCEMENT_FORM,
  announcementFormFromApi,
  buildAnnouncementPayload,
  formatAnnouncementAudience,
  getOptionLabel,
  requiresClassSelection,
  requiresSectionSelection,
  validateAnnouncementFields,
} from '../utils/announcements';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

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
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${spin} 1s ease-in-out infinite;
`;

const DashboardContainer = styled.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    height: auto;
    min-height: auto;
    width: 100%;
    gap: 16px;
    overflow-x: hidden;
    padding-bottom: 24px;
    margin-top: -1vh;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    gap: 12px;
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
  width: 40vw;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    margin-top: 16px;
    gap: 16px;
    align-items: stretch;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    margin-top: 12px;
    gap: 12px;
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
    min-height: 120px;
    flex-wrap: wrap;
    gap: 12px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 110px;
  }
`;

const RevenuneContainer2 = styled.div`
  height: 85vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 39vw;
  margin-top: 4vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  ${cardMobileStyles}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: auto;
    max-height: none;
    margin-top: 0;
    overflow-y: visible;
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
    min-height: auto;
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
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 24px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 22px;
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
    font-size: 15px;
    margin-top: 12px;
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
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    margin-top: 12px;
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
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
  }
`;

const CardInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  flex: 1;
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    justify-content: flex-start;
  }
`;

const CardActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    width: 100%;
    align-items: stretch;
    justify-content: flex-start;
  }
`;

const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2vw;
  justify-content: flex-start;
  margin-bottom: 0.45vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 4px;
    margin-bottom: 4px;
  }
`;

const CardBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  justify-content: flex-end;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    justify-content: flex-start;
    width: 100%;
  }
`;

const AnnouncementHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5vh;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 12px;
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

const AbsentStudentsList = styled.div`
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

const AbsentStudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
  transition: all 0.2s;

  &:hover {
    background: #FFEAC7;
    transform: translateY(-1px);
  }
`;

const StudentDetail = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0.7px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 16px;
  }
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
  transition: all 0.3s;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 16px;
    min-height: 44px;
  }
`;

const FormTextArea = styled.textarea`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  min-height: 8vh;
  resize: vertical;
  transition: all 0.3s;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 16px;
    min-height: 120px;
  }
`;

const AnnouncementTextArea = styled(FormTextArea)`
  min-height: 20vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-height: 140px;
  }
`;

const EditAnnouncementTextArea = styled(FormTextArea)`
  min-height: 24vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-height: 160px;
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
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#92FF84'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
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
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 18px;
    height: 18px;
  }
`;

const TemplateButton = styled.button`
  padding: 0.8vh 1vw;
  background: #FFEAC7;
  border: 1px solid #FFB942;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 0.5vw;
  margin-bottom: 0.5vw;

  &:hover {
    background: #FFB942;
    transform: translateY(-1px);
  }
`;

const TemplateSection = styled.div`
  background: #f8f9fa;
  padding: 1.5vh 1vw;
  border-radius: 0.6vw;
  margin-bottom: 1vh;
  border: 1px solid #e9ecef;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 12px;
  }
`;

const TemplateTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  gap: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    margin-bottom: 10px;
    gap: 8px;
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 2vh;
  right: 2vw;
  background-color: ${props => props.$isError ? '#e53935' : '#4CAF50'};
  color: white;
  padding: 1.5vh 2vw;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${props => props.show ? fadeIn : fadeOut} 0.3s ease-in-out;
  display: ${props => props.show ? 'block' : 'none'};
  max-width: 90vw;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    top: 12px;
    right: 12px;
    left: 12px;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: 10px;
    text-align: center;
    max-width: none;
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
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-top: 4px;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    padding: 16px 0;
  }
`;

const UploadContainer = styled.div`
  height: auto;
  min-height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  ${cardMobileStyles}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-height: auto;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${props => props.isDragOver ? '#FFB942' : '#ccc'};
  border-radius: 0.8vw;
  padding: 3.2vh 1.5vw;
  text-align: center;
  background: ${props => props.isDragOver ? '#FFEAC7' : '#fafafa'};
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 14vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6vh;
  box-sizing: border-box;
  width: 100%;

  &:hover {
    border-color: #FFB942;
    background: #FFEAC7;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 12px;
    padding: 28px 20px;
    min-height: 140px;
    gap: 4px;
  }
`;

const UploadIcon = styled.div`
  width: 3.2vw;
  height: 3.2vw;
  min-width: 44px;
  min-height: 44px;
  margin: 0 auto 1vh;
  border-radius: 50%;
  background: #FFEAC7;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    font-size: 22px;
  }
`;

const UploadText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 500;
  color: #212529;
  margin-bottom: 0.3vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    margin-bottom: 4px;
    line-height: 1.4;
  }
`;

const UploadSubtext = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #626060;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  margin-top: 1vh;
  border: 1px solid #e9ecef;
  gap: 8px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px;
    border-radius: 10px;
    margin-top: 12px;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const FileName = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  font-weight: 500;
  word-break: break-all;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const FileSize = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #666;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.2vh 0.3vw;
  border-radius: 0.3vw;
  transition: all 0.2s;

  &:hover {
    background: #ffe6e6;
  }
`;

const UploadButton = styled.button`
  padding: 1vh 1.5vw;
  background-color: ${props => props.disabled ? '#cccccc' : '#BEFFB6'};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  transition: all 0.3s;
  align-self: flex-end;
  margin-top: 0.4vh;
  min-height: 4vh;
  box-sizing: border-box;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#92FF84'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    align-self: stretch;
    width: 100%;
    padding: 12px 16px;
    border-radius: 24px;
    font-size: 14px;
    min-height: 44px;
    margin-top: 12px;
    gap: 8px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.3vh;
  background: #e9ecef;
  border-radius: 0.15vh;
  overflow: hidden;
  margin-top: 1vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 4px;
    border-radius: 2px;
    margin-top: 12px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #FFB942;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const FormSelect = styled.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  transition: all 0.3s;
  background: #ffffff;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 16px;
    min-height: 44px;
  }
`;

const SecondaryButton = styled.button`
  padding: 1.2vh 1vw;
  background: #f4f4f4;
  border: 1px solid #d8d8d8;
  border-radius: 0.6vw;
  color: #2d2d2d;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4vw;
  transition: all 0.2s;
  white-space: nowrap;
  box-sizing: border-box;

  &:hover {
    background: #e9e9e9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    gap: 6px;
    min-height: 40px;
    flex: 1;
    white-space: normal;
    text-align: center;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 2vh 2vw;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px;
    align-items: flex-end;
  }
`;

const ModalCard = styled.div`
  width: min(92vw, 1100px);
  max-height: 90vh;
  background: #ffffff;
  border-radius: 1.2vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    max-height: 92vh;
    border-radius: 16px 16px 0 0;
  }
`;

const ModalHeader = styled.div`
  padding: 2vh 1.4vw;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 16px;
  }
`;

const ModalHeaderActions = styled.div`
  display: flex;
  gap: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    width: 100%;
  }
`;

const ModalHeaderTitle = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    gap: 8px;
  }
`;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1vw;
  padding: 1.5vh 1.2vw 2vh;
  overflow: hidden;
  min-height: 56vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px 16px 16px;
    min-height: auto;
    max-height: calc(92vh - 80px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const HistoryPanel = styled.div`
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1vh 0.8vw;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 12px;
    padding: 12px;
    max-height: 280px;
  }
`;

const HistoryToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  margin-bottom: 1vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.9vh 0.8vw;
  border: 1px solid #d7d7d7;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  box-sizing: border-box;
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 16px;
    min-height: 44px;
  }
`;

const HistoryList = styled.div`
  overflow-y: auto;
  padding-right: 0.3vw;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  flex: 1;
  min-height: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
    padding-right: 4px;
  }
`;

const HistoryItem = styled.div`
  border: 1px solid ${props => props.active ? '#ffb942' : '#ececec'};
  background: ${props => props.active ? '#fff8ed' : '#fafafa'};
  border-radius: 0.7vw;
  padding: 1vh 0.8vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 10px;
    padding: 12px;
  }
`;

const HistoryTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.82vw;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5vh;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

const HistoryMeta = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #666;
  margin-bottom: 0.7vh;
  word-break: break-word;
  line-height: 1.4;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const HistoryActions = styled.div`
  display: flex;
  gap: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
  }
`;

const SmallButton = styled.button`
  padding: 0.5vh 0.6vw;
  border: 1px solid #dedede;
  border-radius: 0.5vw;
  background: #fff;
  font-size: 0.68vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    gap: 6px;
    min-height: 36px;
  }
`;

const EditorPanel = styled.div`
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1.2vh 0.9vw;
  overflow-y: auto;
  min-height: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 12px;
    padding: 12px;
    max-height: none;
  }
`;

const CardOutlineButton = styled.button`
  padding: 1.2vh 1vw;
  background-color: transparent;
  border: 1px solid #000000;
  color: #000000;
  border-radius: 0.6vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  white-space: nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;
    min-height: 40px;
    width: 100%;
    max-width: 100%;
  }
`;

const CardHighlightButton = styled(CardOutlineButton)`
  background-color: #FFEAC7;
`;

const CardSendButton = styled.button`
  margin-top: auto;
  align-self: flex-end;
  width: 12vw;
  min-height: 5.5vh;
  padding: 1vh 0.7vw;
  background-color: ${props => props.disabled ? '#cccccc' : '#BEFFB6'};
  border: none;
  color: #000000;
  border-radius: 3vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 1px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #92FF84;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    align-self: stretch;
    width: 100%;
    min-height: 44px;
    padding: 12px 16px;
    border-radius: 24px;
    font-size: 14px;
    margin-top: 8px;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 8px;
  }
`;

const UploadSectionInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.2vh;
  width: 100%;
`;

const BulkMessages = () => {
  
  const {
    classes,
    classMap,
    sectionMap,
    sectionsByClass,
    loading: isClassSectionLoading,
  } = useClassSectionLookup();
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('day');
  const [selectedDate, setSelectedDate] = useState(() => {
    // Get current date in Indian timezone (IST - UTC+5:30)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString().split('T')[0];
  });
  const [absentStudents, setAbsentStudents] = useState([]);
  const [filteredAbsentStudents, setFilteredAbsentStudents] = useState([]);
  const [absentCount, setAbsentCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorToast, setIsErrorToast] = useState(false);
  const toastTimeoutRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSendingBulkMessage, setIsSendingBulkMessage] = useState(false);

  // Fee-related state
  const [feeData, setFeeData] = useState(null);
  const [isSendingFeeMessage, setIsSendingFeeMessage] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [isPostingAnnouncement, setIsPostingAnnouncement] = useState(false);
  const [announcementErrors, setAnnouncementErrors] = useState({});
  const [announcementResult, setAnnouncementResult] = useState(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [historySearch, setHistorySearch] = useState('');
  const [isFetchingAnnouncements, setIsFetchingAnnouncements] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState('');
  const [isUpdatingAnnouncement, setIsUpdatingAnnouncement] = useState(false);
  const [editAnnouncementForm, setEditAnnouncementForm] = useState(DEFAULT_ANNOUNCEMENT_FORM);

  // Form state
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [announcementForm, setAnnouncementForm] = useState(DEFAULT_ANNOUNCEMENT_FORM);

  const announcementClassSections = useMemo(
    () => sectionsByClass[announcementForm.class_name] || [],
    [sectionsByClass, announcementForm.class_name]
  );

  const editClassSections = useMemo(
    () => sectionsByClass[editAnnouncementForm.class_name] || [],
    [sectionsByClass, editAnnouncementForm.class_name]
  );

  // Get current date in Indian timezone
  const getCurrentISTDate = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
  };

  const currentISTDate = getCurrentISTDate();
  const currentYear = currentISTDate.getFullYear();
  const currentMonth = currentISTDate.getMonth() + 1;
  const currentDay = currentISTDate.getDate();

  const getMonthName = (monthNumber) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const showToast = (message, isError = false) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setSuccessMessage(message);
    setIsErrorToast(isError);
    setShowSuccess(true);
    toastTimeoutRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const getApiErrorMessage = (error, fallbackMessage) => {
    if (error?.response?.data?.message && typeof error.response.data.message === 'string') {
      return error.response.data.message;
    }
    if (error?.response?.data?.detail && typeof error.response.data.detail === 'string') {
      return error.response.data.detail;
    }
    if (error?.response?.data?.error && typeof error.response.data.error === 'string') {
      return error.response.data.error;
    }
    return fallbackMessage;
  };

  const fetchAbsentStudents = async (date) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/absent-students/${date}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data && response.data.data) {
        const absentData = response.data.data;
        setAbsentStudents(absentData.absent_students || []);
        setFilteredAbsentStudents(absentData.absent_students || []);
        setAbsentCount(absentData.attendance_summary?.total_absent || 0);
      }
    } catch (error) {
      console.error('Error fetching absent students:', error);
      // Set mock data for demonstration
      const mockAbsentStudents = [
        { id: 1, name: 'John Doe', admission_no: 'ST001', group: 'Class 10A', father_name: 'Mr. Doe', phone: '+1234567890' },
        { id: 2, name: 'Jane Smith', admission_no: 'ST002', group: 'Class 9B', father_name: 'Mr. Smith', phone: '+1234567891' },
        { id: 3, name: 'Mike Johnson', admission_no: 'ST003', group: 'Class 8A', father_name: 'Mr. Johnson', phone: '+1234567892' },
        { id: 4, name: 'Sarah Wilson', admission_no: 'ST004', group: 'Class 10B', father_name: 'Mr. Wilson', phone: '+1234567893' },
        { id: 5, name: 'David Brown', admission_no: 'ST005', group: 'Class 9A', father_name: 'Mr. Brown', phone: '+1234567894' }
      ];
      setAbsentStudents(mockAbsentStudents);
      setFilteredAbsentStudents(mockAbsentStudents);
      setAbsentCount(mockAbsentStudents.length);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeeData = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/fees-collection/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data && response.data.data) {
        setFeeData(response.data.data);
        // Set the first academic year as default if available
        if (response.data.data.academic_year_collection && response.data.data.academic_year_collection.length > 0) {
          setSelectedAcademicYear(response.data.data.academic_year_collection[0].academic_year);
        }
      }
    } catch (error) {
      console.error('Error fetching fee data:', error);
      // Set mock data for demonstration
      const mockFeeData = {
        total_fees_collected: 2000.0,
        total_pending_fees: 78000.0,
        three_month_revenue: {
          total: 0.0,
          months: [
            { month: "July 2025", amount: 0.0 },
            { month: "June 2025", amount: 0.0 },
            { month: "May 2025", amount: 0.0 }
          ]
        },
        yearly_revenue: 0.0,
        monthly_collection: [],
        academic_year_collection: [
          { academic_year: "2025-2027", total_collection: 2000.0 }
        ],
        last_payments: []
      };
      setFeeData(mockFeeData);
      setSelectedAcademicYear("2025-2027");
    }
  };

  useEffect(() => {
    const targetDate = displayMode === 'day' ? selectedDate : getCurrentISTDate().toISOString().split('T')[0];
    fetchAbsentStudents(targetDate);
    fetchFeeData();
  }, [selectedDate, displayMode]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      // Format date in Indian locale
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
      };
      return date.toLocaleDateString('en-IN', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAnnouncementInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementForm((prev) => {
      const updated = {
        ...prev,
        [name]: value
      };

      if (name === 'target_audience') {
        updated.class_name = '';
        updated.section = '';
      }

      if (name === 'class_name') {
        updated.section = '';
      }

      return updated;
    });

    if (announcementErrors[name]) {
      setAnnouncementErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (announcementErrors.general) {
      setAnnouncementErrors((prev) => ({ ...prev, general: '' }));
    }
  };

  const validateAnnouncementForm = () => {
    const errors = validateAnnouncementFields(announcementForm);
    setAnnouncementErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();

    if (!validateAnnouncementForm()) {
      return;
    }

    setIsPostingAnnouncement(true);
    setAnnouncementResult(null);

    try {
      const token = getToken();
      if (!token) {
        setAnnouncementErrors({ general: 'Authentication token not found. Please login again.' });
        return;
      }

      const payload = buildAnnouncementPayload(announcementForm);

      const response = await axios.post(`${API_BASE_URL}/masters/announcements/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setAnnouncementResult(response?.data?.data || null);
      if (response?.data?.data) {
        setAnnouncements((prev) => [response.data.data, ...prev.filter((item) => item.id !== response.data.data.id)]);
      }
      showToast(response?.data?.message || 'Announcement created successfully');

      setAnnouncementForm({ ...DEFAULT_ANNOUNCEMENT_FORM });
      setAnnouncementErrors({});
    } catch (error) {
      setAnnouncementErrors({
        general: getApiErrorMessage(error, 'Failed to create announcement. Please try again.')
      });
      console.error('Error creating announcement:', error);
    } finally {
      setIsPostingAnnouncement(false);
    }
  };

  const fetchAnnouncements = async () => {
    setIsFetchingAnnouncements(true);
    setHistoryError('');
    try {
      const token = getToken();
      if (!token) {
        setHistoryError('Authentication token not found. Please login again.');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/announcements/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const list = Array.isArray(response?.data?.data) ? response.data.data : [];
      setAnnouncements(list);

      if (list.length > 0) {
        const firstItem = list[0];
        setSelectedAnnouncementId(firstItem.id);
        setEditAnnouncementForm(announcementFormFromApi(firstItem));
      } else {
        setSelectedAnnouncementId('');
        setEditAnnouncementForm({ ...DEFAULT_ANNOUNCEMENT_FORM });
      }
    } catch (error) {
      setHistoryError(getApiErrorMessage(error, 'Failed to fetch announcements.'));
    } finally {
      setIsFetchingAnnouncements(false);
    }
  };

  const openHistoryDialog = () => {
    setIsHistoryDialogOpen(true);
    fetchAnnouncements();
  };

  const validateEditAnnouncementForm = () => {
    const errors = validateAnnouncementFields(editAnnouncementForm);
    setAnnouncementErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSelectAnnouncement = (announcement) => {
    setSelectedAnnouncementId(announcement.id);
    setEditAnnouncementForm(announcementFormFromApi(announcement));
    setAnnouncementErrors({});
  };

  const handleEditAnnouncementInputChange = (e) => {
    const { name, value } = e.target;
    setEditAnnouncementForm((prev) => {
      const updated = {
        ...prev,
        [name]: value
      };
      if (name === 'target_audience') {
        updated.class_name = '';
        updated.section = '';
      }
      if (name === 'class_name') {
        updated.section = '';
      }
      return updated;
    });
    if (announcementErrors[name]) {
      setAnnouncementErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleUpdateAnnouncement = async (e) => {
    e.preventDefault();
    if (!selectedAnnouncementId) return;
    if (!validateEditAnnouncementForm()) return;

    setIsUpdatingAnnouncement(true);
    try {
      const token = getToken();
      if (!token) {
        setAnnouncementErrors({ general: 'Authentication token not found. Please login again.' });
        return;
      }

      const payload = buildAnnouncementPayload(editAnnouncementForm);

      const response = await axios.put(
        `${API_BASE_URL}/masters/announcements/${selectedAnnouncementId}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const updatedAnnouncement = response?.data?.data || {
        id: selectedAnnouncementId,
        ...payload
      };

      setAnnouncements((prev) => prev.map((item) => (item.id === selectedAnnouncementId ? { ...item, ...updatedAnnouncement } : item)));
      setAnnouncementResult(updatedAnnouncement);
      showToast(response?.data?.message || 'Announcement updated successfully');
      setAnnouncementErrors({});
    } catch (error) {
      setAnnouncementErrors({
        general: getApiErrorMessage(error, 'Failed to update announcement. Please try again.')
      });
    } finally {
      setIsUpdatingAnnouncement(false);
    }
  };

  const filteredAnnouncements = announcements.filter((item) => {
    const query = historySearch.trim().toLowerCase();
    if (!query) return true;
    const audienceLabel = formatAnnouncementAudience(item, classMap, sectionMap).toLowerCase();
    const categoryLabel = getOptionLabel(CATEGORY_OPTIONS, item.category || item.notification_type, '').toLowerCase();
    return (
      item?.title?.toLowerCase().includes(query) ||
      item?.code?.toLowerCase().includes(query) ||
      item?.description?.toLowerCase().includes(query) ||
      item?.target_audience?.toLowerCase().includes(query) ||
      item?.target_type?.toLowerCase().includes(query) ||
      item?.category?.toLowerCase().includes(query) ||
      item?.notification_type?.toLowerCase().includes(query) ||
      audienceLabel.includes(query) ||
      categoryLabel.includes(query)
    );
  });

  const validateForm = () => {
    const errors = {};

    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please enter a message';
    }

    if (absentStudents.length === 0) {
      errors.general = 'No absent students found for the selected date';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const messageTemplates = {
    attendanceAlert: {
      subject: 'Attendance Alert - Student Absent Today',
      message: `Dear Parent/Guardian,

We noticed that your child was absent from school today (${formatDate(selectedDate)}). Please ensure regular attendance for better academic performance.

If this absence was due to illness or any other reason, please inform the school office.

Best regards,
School Administration`
    },
    followUp: {
      subject: 'Follow-up on Student Absence',
      message: `Dear Parent/Guardian,

We hope this message finds you well. We noticed that your child was absent from school on ${formatDate(selectedDate)}.

Please let us know if everything is alright and if there's anything we can do to support your child's education.

Best regards,
School Administration`
    },
    reminder: {
      subject: 'Important Reminder - Student Attendance',
      message: `Dear Parent/Guardian,

This is a friendly reminder that regular school attendance is crucial for your child's academic success. We noticed an absence on ${formatDate(selectedDate)}.

Please ensure your child attends school regularly and inform us in advance if any absence is unavoidable.

Best regards,
School Administration`
    },
    feeReminder: {
      subject: 'Fee Payment Reminder',
      message: `Dear Parent/Guardian,

This is a friendly reminder that there are pending fees for the academic year ${selectedAcademicYear}. 

Total pending amount: ${feeData ? formatCurrency(feeData.total_pending_fees) : '₹0'}

Please clear the pending fees at your earliest convenience to avoid any inconvenience. You can contact the school office for payment options.

Best regards,
School Administration`
    },
    feeUrgent: {
      subject: 'Urgent: Fee Payment Required',
      message: `Dear Parent/Guardian,

This is an urgent reminder regarding pending fees for the academic year ${selectedAcademicYear}.

Total pending amount: ${feeData ? formatCurrency(feeData.total_pending_fees) : '₹0'}

Please clear the pending fees immediately to ensure uninterrupted education for your child. Contact the school office for immediate assistance.

Best regards,
School Administration`
    }
  };

  const applyTemplate = (templateKey) => {
    const template = messageTemplates[templateKey];
    setFormData({
      subject: template.subject,
      message: template.message
    });
    setFormErrors({});
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

      // Prepare payload
      const payload = {
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        recipients: absentStudents.map(student => ({
          name: student.name,
          phone: student.phone || student.father_phone,
          admission_no: student.admission_no
        })),
        date: selectedDate
      };

      // For demo purposes, we'll simulate the API call
      // In production, you would make an actual API call here
      console.log('Sending bulk message:', payload);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      showToast('Bulk message sent successfully');

      // Reset form
      setFormData({
        subject: '',
        message: ''
      });
      setFormErrors({});

    } catch (error) {
      console.error('Error sending bulk message:', error);
      showToast('Failed to send bulk message. Please try again.', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendBulkMessage = async () => {
    if (absentStudents.length === 0) {
      showToast('No absent students found for the selected date.', true);
      return;
    }

    setIsSendingBulkMessage(true);

    try {
      const token = getToken();
      if (!token) {
        showToast('Authentication token not found. Please login again.', true);
        return;
      }

      // Call the bulk message API without payload as requested
      const response = await axios.post(`${API_BASE_URL}/masters/messages/bulk-absent-student/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        showToast(`Bulk message sent successfully to ${absentCount} absent students!`);
        console.log('Bulk message sent successfully:', response.data);
      }

    } catch (error) {
      console.error('Error sending bulk message:', error);
      showToast(getApiErrorMessage(error, 'Failed to send bulk message. Please try again.'), true);
    } finally {
      setIsSendingBulkMessage(false);
    }
  };

  const handleSendFeeMessage = async () => {
    if (!feeData || feeData.total_pending_fees === 0) {
      showToast('No pending fees found.', true);
      return;
    }

    setIsSendingFeeMessage(true);

    try {
      const token = getToken();
      if (!token) {
        showToast('Authentication token not found. Please login again.', true);
        return;
      }

      // Call the bulk term pending message API
      const response = await axios.post(`${API_BASE_URL}/masters/messages/bulk-term-pending-message/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        showToast('Fee reminder sent successfully!');
        console.log('Bulk term pending message sent successfully:', response.data);
      }

    } catch (error) {
      console.error('Error sending bulk term pending message:', error);
      showToast(getApiErrorMessage(error, 'Failed to send fee reminder. Please try again.'), true);
    } finally {
      setIsSendingFeeMessage(false);
    }
  };

  const validateExcelFile = (file) => {
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
      'application/vnd.ms-excel.template.macroEnabled.12'
    ];

    const allowedExtensions = ['.xls', '.xlsx', '.xlsm', '.xltx'];

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      // Check file extension as fallback
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        return 'Please select a valid Excel file (.xls, .xlsx, .xlsm, .xltx)';
      }
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return 'File size should be less than 10MB';
    }

    return null;
  };

  const handleFileSelect = (file) => {
    setUploadError('');

    const validationError = validateExcelFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadError('');
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        `${API_BASE_URL}/masters/test-marks/bulk-upload/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.data) {
        showToast(
          typeof response.data?.message === 'string' && response.data.message.trim()
            ? response.data.message
            : 'Excel file uploaded successfully!'
        );

        // Reset file selection
        setSelectedFile(null);
        setUploadProgress(0);

        console.log('File uploaded successfully:', response.data);
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      let errorMessage = 'Failed to upload file. Please try again.';

      if (error.response) {
        errorMessage = error.response.data.message || error.response.data.error || errorMessage;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
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
      <SuccessMessage show={showSuccess} $isError={isErrorToast}>
        <SuccessIcon>{isErrorToast ? '✕' : '✓'}</SuccessIcon>
        {successMessage}
      </SuccessMessage>

      <Container>
        {/* Absent Students Section */}
        <RevenuneContainer>
          <CardInfoColumn>
            <CardTitleRow>
              <Logo>Students Absent</Logo>
            </CardTitleRow>
            <AddStudentText1 style={{ color: '#FF6745' }}>
              {absentCount} Students
            </AddStudentText1>
          </CardInfoColumn>
          <CardActionsColumn>
            <CardBadgeRow>
              <CardHighlightButton
                type="button"
                onClick={() => {
                  setDisplayMode('day');
                  setSelectedDate(getCurrentISTDate().toISOString().split('T')[0]);
                }}
              >
                {
                  displayMode === 'day' ? formatDate(selectedDate) :
                    displayMode === 'month' ? getMonthName(currentMonth) :
                      currentYear
                }
              </CardHighlightButton>
            </CardBadgeRow>
            <CardSendButton
              type="button"
              onClick={handleSendBulkMessage}
              disabled={isSendingBulkMessage || absentStudents.length === 0}
            >
              {isSendingBulkMessage ? (
                <ButtonContent>
                  <ButtonSpinner />
                  Sending...
                </ButtonContent>
              ) : (
                'Send Message'
              )}
            </CardSendButton>
          </CardActionsColumn>
        </RevenuneContainer>

        {/* Pending Fees Section */}
        <RevenuneContainer>
          <CardInfoColumn>
            <CardTitleRow>
              <Logo>Pending Fees</Logo>
            </CardTitleRow>
            <AddStudentText1 style={{ color: '#FF6745' }}>
              {feeData ? formatCurrency(feeData.total_pending_fees) : '₹0'}
            </AddStudentText1>
          </CardInfoColumn>
          <CardActionsColumn>
            <CardBadgeRow>
              <CardHighlightButton type="button">
                {selectedAcademicYear || 'Select Year'}
              </CardHighlightButton>
            </CardBadgeRow>
            <CardSendButton
              type="button"
              onClick={handleSendFeeMessage}
              disabled={isSendingFeeMessage || !feeData || feeData.total_pending_fees === 0}
            >
              {isSendingFeeMessage ? (
                <ButtonContent>
                  <ButtonSpinner />
                  Sending...
                </ButtonContent>
              ) : (
                'Send Fee Reminder'
              )}
            </CardSendButton>
          </CardActionsColumn>
        </RevenuneContainer>

        {/* Test Marks Upload Section */}
        <UploadContainer>
          <UploadSectionInner>
            <CardTitleRow>
              <Logo>Upload Test Marks</Logo>
            </CardTitleRow>

            {!selectedFile ? (
              <UploadArea
                isDragOver={isDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    document.getElementById('file-input').click();
                  }
                }}
              >
                <UploadIcon>
                  <FiUpload />
                </UploadIcon>
                <UploadText>Drag & drop Excel file here</UploadText>
                <UploadSubtext>or click to browse (.xlsx, .xls, .xlsm, .xltx)</UploadSubtext>
                <FileInput
                  id="file-input"
                  type="file"
                  accept=".xls,.xlsx,.xlsm,.xltx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileInputChange}
                />
              </UploadArea>
            ) : (
              <FilePreview>
                <FileInfo>
                  <FiFileText style={{ color: '#FFB942', flexShrink: 0 }} size={20} />
                  <div>
                    <FileName>{selectedFile.name}</FileName>
                    <FileSize>{formatFileSize(selectedFile.size)}</FileSize>
                  </div>
                </FileInfo>
                <RemoveButton onClick={removeFile} type="button" aria-label="Remove file">
                  <FiX size={18} />
                </RemoveButton>
              </FilePreview>
            )}

            {uploadError && (
              <ErrorMessage style={{ marginTop: '1vh' }}>
                {uploadError}
              </ErrorMessage>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <ProgressBar>
                <ProgressFill progress={uploadProgress} />
              </ProgressBar>
            )}

            <UploadButton
              type="button"
              onClick={handleFileUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <ButtonContent>
                  <ButtonSpinner />
                  Uploading... {uploadProgress}%
                </ButtonContent>
              ) : (
                <ButtonContent>
                  <FiUpload />
                  Upload Excel
                </ButtonContent>
              )}
            </UploadButton>
          </UploadSectionInner>
        </UploadContainer>
      </Container>

      <RevenuneContainer2>
        <AnnouncementHeader>
          <Logo style={{ marginBottom: 0 }}>Post Announcement</Logo>
          <SecondaryButton type="button" onClick={openHistoryDialog}>
            <FiClock />
            Announcement History
          </SecondaryButton>
        </AnnouncementHeader>
        <AddStudentText2 style={{ marginTop: 0, marginBottom: '1.5vh', color: '#626060' }}>
          Create and publish important notices instantly.
        </AddStudentText2>

        <FormContainer as="form" onSubmit={handlePostAnnouncement}>
          <FormGroup>
            <FormLabel htmlFor="announcement-title">Title</FormLabel>
            <FormInput
              id="announcement-title"
              name="title"
              value={announcementForm.title}
              onChange={handleAnnouncementInputChange}
              placeholder="e.g. School closed tomorrow"
              maxLength={120}
              disabled={isPostingAnnouncement}
            />
            {announcementErrors.title && <ErrorMessage>{announcementErrors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="announcement-description">Description</FormLabel>
            <AnnouncementTextArea
              id="announcement-description"
              name="description"
              value={announcementForm.description}
              onChange={handleAnnouncementInputChange}
              placeholder="Enter announcement details..."
              maxLength={1000}
              disabled={isPostingAnnouncement}
            />
            {announcementErrors.description && <ErrorMessage>{announcementErrors.description}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="announcement-target">Target Audience</FormLabel>
            <FormSelect
              id="announcement-target"
              name="target_audience"
              value={announcementForm.target_audience}
              onChange={handleAnnouncementInputChange}
              disabled={isPostingAnnouncement}
            >
              {TARGET_AUDIENCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FormSelect>
            {announcementErrors.target_audience && <ErrorMessage>{announcementErrors.target_audience}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="announcement-category">Category</FormLabel>
            <FormSelect
              id="announcement-category"
              name="category"
              value={announcementForm.category}
              onChange={handleAnnouncementInputChange}
              disabled={isPostingAnnouncement}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FormSelect>
            {announcementErrors.category && <ErrorMessage>{announcementErrors.category}</ErrorMessage>}
          </FormGroup>

          {requiresClassSelection(announcementForm.target_audience) && (
            <FormGroup>
              <FormLabel htmlFor="announcement-class">Class</FormLabel>
              <FormSelect
                id="announcement-class"
                name="class_name"
                value={announcementForm.class_name}
                onChange={handleAnnouncementInputChange}
                disabled={isPostingAnnouncement || isClassSectionLoading}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </FormSelect>
              {announcementErrors.class_name && <ErrorMessage>{announcementErrors.class_name}</ErrorMessage>}
            </FormGroup>
          )}

          {requiresSectionSelection(announcementForm.target_audience) && (
            <FormGroup>
              <FormLabel htmlFor="announcement-section">Section</FormLabel>
              <FormSelect
                id="announcement-section"
                name="section"
                value={announcementForm.section}
                onChange={handleAnnouncementInputChange}
                disabled={isPostingAnnouncement || isClassSectionLoading || !announcementForm.class_name}
              >
                <option value="">{announcementForm.class_name ? 'Select Section' : 'Select a class first'}</option>
                {announcementClassSections.map((sectionItem) => (
                  <option key={sectionItem.id} value={sectionItem.id}>
                    {getSectionDisplayLabel(sectionItem, announcementClassSections)}
                  </option>
                ))}
              </FormSelect>
              {announcementErrors.section && <ErrorMessage>{announcementErrors.section}</ErrorMessage>}
            </FormGroup>
          )}

          {announcementErrors.general && <ErrorMessage>{announcementErrors.general}</ErrorMessage>}

          <FormButton type="submit" disabled={isPostingAnnouncement}>
            {isPostingAnnouncement ? (
              <>
                <ButtonSpinner />
                Posting...
              </>
            ) : (
              <>
                <FiSend />
                Publish Announcement
              </>
            )}
          </FormButton>
        </FormContainer>

        {announcementResult && (
          <TemplateSection style={{ marginTop: '2vh' }}>
            <TemplateTitle>
              <FiMessageCircle />
              Latest Announcement
            </TemplateTitle>
            <AddStudentText2 style={{ marginTop: 0 }}>
              <strong>Code:</strong> {announcementResult.code}
            </AddStudentText2>
            <AddStudentText2 style={{ marginTop: '0.7vh' }}>
              <strong>Title:</strong> {announcementResult.title}
            </AddStudentText2>
            <AddStudentText2 style={{ marginTop: '0.7vh' }}>
              <strong>Audience:</strong> {formatAnnouncementAudience(announcementResult, classMap, sectionMap)}
            </AddStudentText2>
            <AddStudentText2 style={{ marginTop: '0.7vh' }}>
              <strong>Category:</strong> {getOptionLabel(CATEGORY_OPTIONS, announcementResult.category || announcementResult.notification_type)}
            </AddStudentText2>
            <AddStudentText2 style={{ marginTop: '0.7vh' }}>
              <strong>Posted:</strong> {formatDate(announcementResult.date_posted)}
            </AddStudentText2>
          </TemplateSection>
        )}
      </RevenuneContainer2>

      {isHistoryDialogOpen && (
        <ModalOverlay onClick={() => setIsHistoryDialogOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalHeaderTitle>
                <FiClock />
                Announcement History
              </ModalHeaderTitle>
              <ModalHeaderActions>
                <SecondaryButton type="button" onClick={fetchAnnouncements} disabled={isFetchingAnnouncements}>
                  <FiRefreshCw />
                  Refresh
                </SecondaryButton>
                <SecondaryButton type="button" onClick={() => setIsHistoryDialogOpen(false)}>
                  <FiX />
                  Close
                </SecondaryButton>
              </ModalHeaderActions>
            </ModalHeader>

            <ModalBody>
              <HistoryPanel>
                <HistoryToolbar>
                  <FiSearch style={{ color: '#777' }} />
                  <SearchInput
                    placeholder="Search by title, code, audience..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                  />
                </HistoryToolbar>

                {historyError && <ErrorMessage>{historyError}</ErrorMessage>}
                {isFetchingAnnouncements ? (
                  <NoDataMessage>Loading announcements...</NoDataMessage>
                ) : filteredAnnouncements.length === 0 ? (
                  <NoDataMessage>No announcements found.</NoDataMessage>
                ) : (
                  <HistoryList>
                    {filteredAnnouncements.map((item) => (
                      <HistoryItem key={item.id} active={selectedAnnouncementId === item.id}>
                        <HistoryTitle>{item.title || 'Untitled Announcement'}</HistoryTitle>
                        <HistoryMeta>
                          {item.code} | {formatAnnouncementAudience(item, classMap, sectionMap)} | {getOptionLabel(CATEGORY_OPTIONS, item.category || item.notification_type)} | {formatDate(item.date_posted)}
                        </HistoryMeta>
                        <HistoryMeta>{item.description || 'No description'}</HistoryMeta>
                        <HistoryActions>
                          <SmallButton type="button" onClick={() => handleSelectAnnouncement(item)}>
                            <FiEdit2 />
                            Edit
                          </SmallButton>
                        </HistoryActions>
                      </HistoryItem>
                    ))}
                  </HistoryList>
                )}
              </HistoryPanel>

              <EditorPanel>
                <TemplateTitle style={{ marginBottom: '1.4vh' }}>
                  <FiEdit2 />
                  Edit Announcement
                </TemplateTitle>

                {!selectedAnnouncementId ? (
                  <NoDataMessage>Select an announcement to edit.</NoDataMessage>
                ) : (
                  <FormContainer as="form" onSubmit={handleUpdateAnnouncement}>
                    <FormGroup>
                      <FormLabel htmlFor="edit-title">Title</FormLabel>
                      <FormInput
                        id="edit-title"
                        name="title"
                        value={editAnnouncementForm.title}
                        onChange={handleEditAnnouncementInputChange}
                        maxLength={120}
                        disabled={isUpdatingAnnouncement}
                      />
                      {announcementErrors.title && <ErrorMessage>{announcementErrors.title}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="edit-description">Description</FormLabel>
                      <EditAnnouncementTextArea
                        id="edit-description"
                        name="description"
                        value={editAnnouncementForm.description}
                        onChange={handleEditAnnouncementInputChange}
                        maxLength={1000}
                        disabled={isUpdatingAnnouncement}
                      />
                      {announcementErrors.description && <ErrorMessage>{announcementErrors.description}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="edit-target-audience">Target Audience</FormLabel>
                      <FormSelect
                        id="edit-target-audience"
                        name="target_audience"
                        value={editAnnouncementForm.target_audience}
                        onChange={handleEditAnnouncementInputChange}
                        disabled={isUpdatingAnnouncement}
                      >
                        {TARGET_AUDIENCE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </FormSelect>
                      {announcementErrors.target_audience && <ErrorMessage>{announcementErrors.target_audience}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="edit-category">Category</FormLabel>
                      <FormSelect
                        id="edit-category"
                        name="category"
                        value={editAnnouncementForm.category}
                        onChange={handleEditAnnouncementInputChange}
                        disabled={isUpdatingAnnouncement}
                      >
                        {CATEGORY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </FormSelect>
                      {announcementErrors.category && <ErrorMessage>{announcementErrors.category}</ErrorMessage>}
                    </FormGroup>

                    {requiresClassSelection(editAnnouncementForm.target_audience) && (
                      <FormGroup>
                        <FormLabel htmlFor="edit-class-name">Class</FormLabel>
                        <FormSelect
                          id="edit-class-name"
                          name="class_name"
                          value={editAnnouncementForm.class_name}
                          onChange={handleEditAnnouncementInputChange}
                          disabled={isUpdatingAnnouncement || isClassSectionLoading}
                        >
                          <option value="">Select Class</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                          ))}
                        </FormSelect>
                        {announcementErrors.class_name && <ErrorMessage>{announcementErrors.class_name}</ErrorMessage>}
                      </FormGroup>
                    )}

                    {requiresSectionSelection(editAnnouncementForm.target_audience) && (
                      <FormGroup>
                        <FormLabel htmlFor="edit-section-name">Section</FormLabel>
                        <FormSelect
                          id="edit-section-name"
                          name="section"
                          value={editAnnouncementForm.section}
                          onChange={handleEditAnnouncementInputChange}
                          disabled={isUpdatingAnnouncement || isClassSectionLoading || !editAnnouncementForm.class_name}
                        >
                          <option value="">{editAnnouncementForm.class_name ? 'Select Section' : 'Select a class first'}</option>
                          {editClassSections.map((sectionItem) => (
                            <option key={sectionItem.id} value={sectionItem.id}>
                              {getSectionDisplayLabel(sectionItem, editClassSections)}
                            </option>
                          ))}
                        </FormSelect>
                        {announcementErrors.section && <ErrorMessage>{announcementErrors.section}</ErrorMessage>}
                      </FormGroup>
                    )}

                    {announcementErrors.general && <ErrorMessage>{announcementErrors.general}</ErrorMessage>}
                    <FormButton type="submit" disabled={isUpdatingAnnouncement}>
                      {isUpdatingAnnouncement ? (
                        <>
                          <ButtonSpinner />
                          Updating...
                        </>
                      ) : (
                        <>
                          <FiEdit2 />
                          Update Announcement
                        </>
                      )}
                    </FormButton>
                  </FormContainer>
                )}
              </EditorPanel>
            </ModalBody>
          </ModalCard>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

export default BulkMessages; 