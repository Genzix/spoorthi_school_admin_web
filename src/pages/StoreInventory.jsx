import { API_BASE_URL } from '@/config/api';
import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';
import searchIcon from '../assets/Search.svg';
import arrowIcon from '../assets/arrow.svg';
import Add from '../assets/add.svg';
import Logo from '../assets/logo1.png';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import axios from 'axios';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Styled Components
const Container = styled.div`
  background-color: #EFEFEF;
  min-height: 70vh;
  margin-top: 3vh;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 0;
    padding: 0;
    padding-bottom: 24px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding-bottom: 16px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 15px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
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
  flex: 1;
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
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
    background: #FFE5B9;
  }

  ${props => props.$active && `
    background: #FFE5B9;
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
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const DesktopActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
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
  background: ${props => (props.$danger ? '#FEA592' : '#FFB942')};
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => (props.$danger ? '#FF7E62' : '#FFAC1E')};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatsBar = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 100%;
    margin-bottom: 4px;
  }
`;

const StatChip = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 10px 8px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const StatValue = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;

const StatLabel = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-top: 2px;
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
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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

const SelectArrow = styled.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    right: 14px;
    height: 10px;
  }
`;

const FilterSelectContainer = styled.div`
  position: relative;
  width: fit-content;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
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
  box-sizing: border-box;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: 44px;
    padding: 10px 36px 10px 14px;
    border-radius: 10px;
    font-size: 14px;
  }
`;


const ActionButton = styled.button`
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  background-color: ${props => props.variant === 'primary'
    ? '#4a6cf7'
    : props.variant === 'success'
      ? '#28a745'
      : '#FFB942'};
  border: 1px solid ${props => props.variant === 'primary'
    ? '#4a6cf7'
    : props.variant === 'success'
      ? '#28a745'
      : '#FFB942'};
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  color: black;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 5vh;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.variant === 'primary'
    ? '#3a5bd9'
    : props.variant === 'success'
      ? '#218838'
      : '#FFAC1E'};
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    padding: 14px 20px;
    border-radius: 12px;
    margin-bottom: max(1rem, env(safe-area-inset-bottom));
    min-height: 48px;
  }
`;



const TableContainer = styled.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const MobileOnlySection = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: block;
  }
`;

const MobileCardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MobileItemCard = styled.div`
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
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
`;

const MobileCardActionBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 40px;
  border: none;
  border-radius: 10px;
  background: ${props => (props.$danger ? '#FEA592' : '#FFE5B9')};
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MobileSkeletonCard = styled.div`
  border-radius: 14px;
  height: 180px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Table = styled.table`
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th.withConfig({
  shouldForwardProp: (prop) => !['leftAlign'].includes(prop),
})`
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
  &:nth-child(11) { width: 5vw; }
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
  padding: 2vh 0vw;
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
  background: ${({ status }) => status === 'In Stock' ? '#BEFFB6' : status === 'Low Stock' ? '#FFF9B6' : '#FEA592'};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
  white-space: nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 20px;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  
  &:checked {
    background-color: #FFB942;
    border-color: #FFB942;
    
    &::after {
      content: "✓";
      position: absolute;
      color: black;
      font-size: 12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 16px;
  margin: 0 5px;
  transition: all 0.2s;
  
  &:hover {
    color: #FFB942;
    transform: scale(1.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
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
  font-size: 16px;
  color: #666;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #666;

  h3 {
    margin: 0 0 8px;
    font-family: "Roboto", sans-serif;
    font-size: 1.25rem;
    color: #333;
  }

  p {
    margin: 0;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 32px 16px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }
`;

const ClearFiltersButton = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #FFB942;
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FFAC1E;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    align-items: flex-start;
  }
`;

const DialogContainer = styled.div`
  position: absolute;
  right: 0;
  background-color: #FFE6BB;
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
  }
`;

const DialogHeader = styled.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-left: 1rem;
    margin-top: max(1rem, env(safe-area-inset-top));
    padding-right: 1rem;
  }
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.25rem;
  }
`;

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0 1rem 1rem;
    margin-top: 1rem;
  }
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 1.5rem;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.6vh;
  margin-top: 0vh;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7vw;
  letter-spacing: 0.7px;
  color: #626060;
  font-weight: 400;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;


const FormInput = styled.input`
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  border: 1px solid #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  box-sizing: border-box;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 16px;
  }
`;


const FormSelect = styled.select`
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  border: 1px solid #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  box-sizing: border-box;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 16px;
  }
`;


const AddStudentText = styled.div`
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
  flex-shrink: 0;

  &:hover {
    background-color: #FFAC1E;
    transform: scale(1.05);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`;

const ImagePreview = styled.img`
  width: 13vh;
  height: 13vh;
  border-radius: 2vh;
  object-fit: cover;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ReportDialogContainer = styled(DialogContainer)`
  width: 40vw;
  max-height: 100vh;
  background: white;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

const ReportSummary = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 8px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-wrap: wrap;
    padding: 12px;
  }
`;

const ReportSummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportSummaryLabel = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 5px;
`;

const ReportSummaryValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const ReportTableContainer = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 20px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #FFB942;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #FFAC1E;
  }
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ReportThead = styled.thead`
  position: sticky;
  top: 0;
  background-color: #FFB942;
  z-index: 10;
`;

const ReportTbody = styled.tbody``;

const ReportTr = styled.tr`
  border-bottom: 1px solid #e9ecef;
  background: ${props => props.status === 'Out of Stock' ? '#fff0f0' : 'white'};
  
  &:nth-child(even) {
    background: ${props => props.status === 'Out of Stock' ? '#ffeaea' : '#f8f9fa'};
  }
  
  &:hover {
    background: ${props => props.status === 'Out of Stock' ? '#ffdfdf' : '#f1f3f5'};
  }
`;

const ReportTh = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const ReportTd = styled.td`
  padding: 12px 15px;
  color: #333;
  font-size: 0.9rem;
`;

const FeeReminderButton1 = styled.button`
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

const FeeReminderButton2 = styled.button`
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
  background-color: #FEA592;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FF7E62;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;


const StoreInventory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    status: ''
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    store_category_id: '',
    subcategory_id: '',
    quantity: '',
    unit: '',
    threshold: '',
    location: '',
    supplier: '',
    price: '',
    status: 'In Stock'
  });
  const [showReorderDialog, setShowReorderDialog] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // API base URL
  

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // API headers with authentication
  const getHeaders = () => {
    return {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch inventory items
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/masters/inventory/`, {
        headers: getHeaders()
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/masters/store-categories/`, {
        headers: getHeaders()
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async (categoryId = null) => {
    try {
      let url = `${API_BASE_URL}/masters/subcategories/`;
      if (categoryId) {
        url += `?store_category_id=${categoryId}`;
      }

      const response = await axios.get(url, {
        headers: getHeaders()
      });

      if (categoryId) {
        setFilteredSubCategories(response.data);
      } else {
        setSubCategories(response.data);
        setFilteredSubCategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchInventory(),
          fetchCategories(),
          fetchSubCategories()
        ]);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count += 1;
    if (filters.subCategory) count += 1;
    if (filters.status) count += 1;
    return count;
  };

  const hasActiveFilters = () => {
    return Boolean(searchTerm.trim()) || getActiveFilterCount() > 0;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ category: '', subCategory: '', status: '' });
    setFilteredSubCategories([]);
    setShowMobileFilters(false);
  };

  const inventoryStats = useMemo(() => ({
    total: items.length,
    inStock: items.filter(item => item.status === 'In Stock').length,
    lowStock: items.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length,
  }), [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return items.filter(item => {
      const matchesSearch = !normalizedSearch || [
        item.name,
        item.location,
        item.supplier,
        item.store_category?.name,
        item.subcategory?.name,
      ].some(value => (value || '').toLowerCase().includes(normalizedSearch));

      const matchesCategory = !filters.category
        || String(item.store_category?.id) === String(filters.category);

      const matchesSubCategory = !filters.subCategory
        || String(item.subcategory?.id) === String(filters.subCategory);

      const matchesStatus = !filters.status || item.status === filters.status;

      return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
    }).reverse();
  }, [items, searchTerm, filters]);

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleAddItem = () => {
    setFormData({
      name: '',
      store_category_id: '',
      subcategory_id: '',
      quantity: '',
      unit: '',
      threshold: '',
      location: '',
      supplier: '',
      price: '',
      status: 'In Stock'
    });
    setShowAddDialog(true);
  };


  const generateReorderReport = () => {
    const lowStock = items.filter(item =>
      item.status === 'Low Stock' || item.status === 'Out of Stock'
    );

    if (lowStock.length === 0) {
      alert('No items need reordering at this time.');
      return;
    }

    setLowStockItems(lowStock);
    setShowReorderDialog(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Enhanced Color palette
    const primaryColor = rgb(0.992, 0.843, 0.431); // FDC86E
    const secondaryColor = rgb(0.2, 0.2, 0.2);
    const accentColor = rgb(0.8, 0.2, 0.2);
    const lightBg = rgb(0.98, 0.98, 0.98);
    const white = rgb(1, 1, 1);
    const grayLine = rgb(0.9, 0.9, 0.9);
    const headerBg = rgb(0.15, 0.15, 0.15);
    const warningColor = rgb(0.9, 0.6, 0.1);
    const okColor = rgb(0.2, 0.6, 0.2);

    try {
      const logoBytes = await fetch(Logo).then(res => res.arrayBuffer());
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.3);

      // Rounded rectangle background for logo
      page.drawRectangle({
        x: 40,
        y: height - 90,
        width: logoDims.width + 20,
        height: logoDims.height + 20,
        color: white,
      });

      // Draw logo
      page.drawImage(logoImage, {
        x: 50,
        y: height - 80,
        width: logoDims.width,
        height: logoDims.height,
      });
    } catch (error) {
      console.error('Error loading logo:', error);
      page.drawText('SPOORTHI', {
        x: 50,
        y: height - 60,
        size: 24,
        font: boldFont,
        color: primaryColor,
      });
    }

    // Company name and report title
    page.drawText('Spoorthi', {
      x: 100,
      y: height - 72,
      size: 26,
      font: boldFont,
      color: secondaryColor,
    });

    page.drawText('REORDER REPORT', {
      x: 50,
      y: height - 120,
      size: 18,
      font: boldFont,
      color: secondaryColor,
    });

    page.drawLine({
      start: { x: 50, y: height - 125 },
      end: { x: 250, y: height - 125 },
      thickness: 2,
      color: primaryColor,
    });

    page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
      x: 400,
      y: height - 120,
      size: 10,
      font,
      color: secondaryColor,
    });

    // Table Headers
    const headers = ['Item Name', 'Current Qty', 'Threshold', 'Status', 'Supplier'];
    const columnWidths = [140, 80, 80, 100, 150];

    // Header background with rounded rectangle
    page.drawRectangle({
      x: 45,
      y: height - 160,
      width: width - 90,
      height: 30,
      color: headerBg,
    });

    headers.forEach((header, i) => {
      const x = 50 + (i === 0 ? 10 : columnWidths.slice(0, i).reduce((a, b) => a + b, 0) + 10);
      page.drawText(header, {
        x,
        y: height - 148,
        size: 12,
        font: boldFont,
        color: white,
      });
    });

    // Table rows with visual polish
    lowStockItems.forEach((item, index) => {
      const y = height - 190 - index * 25;
      if (y < 80) {
        page.drawText('-- Continued on next page --', {
          x: 50,
          y: 60,
          size: 10,
          font,
          color: secondaryColor,
        });
        return;
      }

      page.drawRectangle({
        x: 45,
        y: y - 5,
        width: width - 90,
        height: 25,
        color: index % 2 === 0 ? white : lightBg,
        borderWidth: 0.5,
        borderColor: grayLine,
      });

      const rowData = [
        item.name,
        `${item.quantity} ${item.unit}`,
        item.threshold.toString(),
        item.status,
        item.supplier
      ];

      rowData.forEach((text, i) => {
        let color = secondaryColor;
        if (i === 3) {
          color = item.status.toLowerCase().includes('urgent')
            ? accentColor
            : item.status.toLowerCase().includes('warning')
              ? warningColor
              : okColor;
        }

        const x = 50 + (i === 0 ? 10 : columnWidths.slice(0, i).reduce((a, b) => a + b, 0) + 10);
        page.drawText(text, {
          x,
          y: y + 6,
          size: 10,
          font: i === 3 ? boldFont : font,
          color,
          maxWidth: columnWidths[i] - 10,
        });
      });
    });

    // Footer
    page.drawLine({
      start: { x: 50, y: 70 },
      end: { x: width - 50, y: 70 },
      thickness: 1,
      color: primaryColor,
    });

    page.drawText('© 2023 Spoorthi Inventory Management System', {
      x: 50,
      y: 50,
      size: 10,
      font,
      color: secondaryColor,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `Spoorthi_Reorder_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };



  const handleEditItem = async (item) => {
    setCurrentItem(item);

    setFormData({
      name: item.name,
      store_category_id: item.store_category?.id || '',
      subcategory_id: item.subcategory?.id || '',
      quantity: item.quantity,
      unit: item.unit,
      threshold: item.threshold,
      location: item.location,
      supplier: item.supplier,
      price: item.price,
      status: item.status
    });

    // Set image preview if item has an image
    if (item.image) {
      setImagePreview(item.image);
    } else {
      setImagePreview(null);
    }

    if (item.store_category?.id) {
      await fetchSubCategories(item.store_category.id);
    }

    setShowEditDialog(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setDeleteLoading(true);
        await axios.delete(`${API_BASE_URL}/masters/inventory/${itemId}/`, {
          headers: getHeaders()
        });
        await fetchInventory();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) {
      try {
        setDeleteSelectedLoading(true);
        await Promise.all(
          selectedItems.map(id =>
            axios.delete(`${API_BASE_URL}/masters/inventory/${id}/`, {
              headers: getHeaders()
            })
          )
        );
        await fetchInventory();
        setSelectedItems([]);
      } catch (error) {
        console.error('Error deleting selected items:', error);
        alert('Error deleting selected items. Please try again.');
      } finally {
        setDeleteSelectedLoading(false);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showAddDialog) {
      setAddLoading(true);
    } else {
      setEditLoading(true);
    }

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('store_category_id', formData.store_category_id);
      formDataToSend.append('subcategory_id', formData.subcategory_id);
      formDataToSend.append('quantity', parseInt(formData.quantity) || 0);
      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('threshold', parseInt(formData.threshold) || 0);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('supplier', formData.supplier);
      formDataToSend.append('price', parseFloat(formData.price) || 0);
      formDataToSend.append('status', parseInt(formData.quantity) === 0 ? 'Out of Stock' :
        parseInt(formData.quantity) <= parseInt(formData.threshold) ? 'Low Stock' : 'In Stock');

      // Append image if it exists
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const config = {
        headers: {
          ...getHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      };

      if (showAddDialog) {
        await axios.post(`${API_BASE_URL}/masters/inventory/`, formDataToSend, config);
      } else {
        await axios.put(`${API_BASE_URL}/masters/inventory/${currentItem.id}/`, formDataToSend, config);
      }

      await fetchInventory();
      setShowAddDialog(false);
      setShowEditDialog(false);
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please check all required fields and try again.');
    } finally {
      if (showAddDialog) {
        setAddLoading(false);
      } else {
        setEditLoading(false);
      }
    }
  };

  // Update handleCategoryChange to handle both form and filter changes
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    const isFilter = e.target.name === 'filter_category';

    if (isFilter) {
      setFilters(prev => ({
        ...prev,
        category: categoryId,
        subCategory: '' // Reset subcategory filter
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        store_category_id: categoryId,
        subcategory_id: '' // Reset subcategory selection
      }));
    }

    // Fetch subcategories for the selected category
    if (categoryId) {
      await fetchSubCategories(categoryId);
    } else {
      setFilteredSubCategories([]);
    }
  };

  // Update handleSubCategoryChange for filters
  const handleSubCategoryChange = (e) => {
    setFilters(prev => ({
      ...prev,
      subCategory: e.target.value
    }));
  };

  const renderPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const renderEmptyState = () => (
    <EmptyState>
      <h3>No items found</h3>
      <p>
        {items.length === 0
          ? 'Add your first store item to get started'
          : 'Try adjusting your search or filters'}
      </p>
      {hasActiveFilters() && (
        <ClearFiltersButton type="button" onClick={clearFilters}>
          Clear filters
        </ClearFiltersButton>
      )}
      {items.length === 0 && (
        <ClearFiltersButton type="button" onClick={handleAddItem} style={{ marginTop: hasActiveFilters() ? 8 : 16 }}>
          Add Item
        </ClearFiltersButton>
      )}
    </EmptyState>
  );

  const renderFilterSelects = () => (
    <>
      <FilterSelectContainer>
        <FilterSelect
          name="filter_category"
          value={filters.category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </FilterSelect>
        <SelectArrow src={arrowIcon} alt="" />
      </FilterSelectContainer>

      <FilterSelectContainer>
        <FilterSelect
          name="filter_subcategory"
          value={filters.subCategory}
          onChange={handleSubCategoryChange}
          disabled={!filters.category}
        >
          <option value="">All Sub-Categories</option>
          {filteredSubCategories.map(subCat => (
            <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
          ))}
        </FilterSelect>
        <SelectArrow src={arrowIcon} alt="" />
      </FilterSelectContainer>

      <FilterSelectContainer>
        <FilterSelect
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </FilterSelect>
        <SelectArrow src={arrowIcon} alt="" />
      </FilterSelectContainer>
    </>
  );

  const renderItemImage = (item, mobile = false) => {
    const size = mobile ? 44 : 50;
    const commonStyle = {
      width: mobile ? '44px' : `${size}px`,
      height: mobile ? '44px' : `${size}px`,
      borderRadius: mobile ? '10px' : '8px',
      marginRight: mobile ? '10px' : '10px',
      flexShrink: 0,
      objectFit: 'cover',
    };

    if (item.image) {
      return (
        <ItemImage
          src={item.image}
          alt={item.name}
          style={commonStyle}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }

    return (
      <div
        style={{
          ...commonStyle,
          backgroundColor: '#FFE5B9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Roboto", sans-serif',
          fontSize: mobile ? '16px' : '18px',
          fontWeight: 600,
          color: '#333',
        }}
      >
        {(item.name || '?').charAt(0).toUpperCase()}
      </div>
    );
  };

  const renderMobileItemCards = () => (
    <MobileCardsList>
      {filteredItems.map(item => (
        <MobileItemCard key={item.id}>
          <MobileCardHeader>
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelectItem(item.id)}
            />
            <MobileCardMain>
              <ItemInfoContainer>
                {renderItemImage(item, true)}
                <ItemDetails>
                  <div style={{ fontWeight: '500', fontSize: '15px' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                    ₹{renderPrice(item.price)}
                  </div>
                </ItemDetails>
              </ItemInfoContainer>
            </MobileCardMain>
            <StatusBadge status={item.status}>{item.status}</StatusBadge>
          </MobileCardHeader>

          <MobileCardGrid>
            <MobileCardField>
              <MobileCardLabel>Category</MobileCardLabel>
              <MobileCardValue>{item.store_category?.name || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Sub-Category</MobileCardLabel>
              <MobileCardValue>{item.subcategory?.name || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Quantity</MobileCardLabel>
              <MobileCardValue>{item.quantity} {item.unit}</MobileCardValue>
            </MobileCardField>
            <MobileCardField>
              <MobileCardLabel>Location</MobileCardLabel>
              <MobileCardValue>{item.location || '-'}</MobileCardValue>
            </MobileCardField>
            <MobileCardField className="full-width">
              <MobileCardLabel>Supplier</MobileCardLabel>
              <MobileCardValue>{item.supplier || '-'}</MobileCardValue>
            </MobileCardField>
          </MobileCardGrid>

          <MobileCardActions>
            <MobileCardActionBtn
              type="button"
              onClick={() => handleEditItem(item)}
              disabled={editLoading}
            >
              <FiEdit2 size={16} /> Edit
            </MobileCardActionBtn>
            <MobileCardActionBtn
              type="button"
              $danger
              onClick={() => handleDeleteItem(item.id)}
              disabled={deleteLoading}
            >
              <FiTrash2 size={16} /> Delete
            </MobileCardActionBtn>
          </MobileCardActions>
        </MobileItemCard>
      ))}
    </MobileCardsList>
  );

  return (
    <Container>
      <TopBar>
        <StatsBar>
          <StatChip>
            <StatValue>{inventoryStats.total}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatChip>
          <StatChip>
            <StatValue>{inventoryStats.inStock}</StatValue>
            <StatLabel>In Stock</StatLabel>
          </StatChip>
          <StatChip>
            <StatValue>{inventoryStats.lowStock}</StatValue>
            <StatLabel>Low / Out</StatLabel>
          </StatChip>
        </StatsBar>

        <ToolbarRow>
          <SearchFilterBar>
            <SearchContainer>
              <SearchIcon src={searchIcon} alt="" />
              <SearchInput
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <MobileFilterToggle
              onClick={() => setShowMobileFilters(prev => !prev)}
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
        </ToolbarRow>

        <MobileFiltersPanel $open={showMobileFilters}>
          {renderFilterSelects()}
        </MobileFiltersPanel>

        <ActionsRow>
          <DesktopActions>
            <AddStudentText onClick={handleAddItem}>
              Add Item
            </AddStudentText>
            <CircleIconContainer onClick={handleAddItem}>
              <img src={Add} alt="Add item" style={{ height: '1.8vh' }} />
            </CircleIconContainer>
            <FeeReminderButton1 variant="success" onClick={generateReorderReport}>
              Reorder Report
            </FeeReminderButton1>
            {selectedItems.length > 0 && (
              <FeeReminderButton2
                variant="danger"
                onClick={handleDeleteSelected}
                disabled={deleteSelectedLoading}
                style={{
                  opacity: deleteSelectedLoading ? 0.7 : 1,
                  cursor: deleteSelectedLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {deleteSelectedLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                    Deleting...
                  </div>
                ) : (
                  'Delete Selected'
                )}
              </FeeReminderButton2>
            )}
          </DesktopActions>

          <MobileActions>
            <MobileActionButton type="button" onClick={handleAddItem}>
              <img src={Add} alt="" style={{ width: 18, height: 18 }} />
              Add Item
            </MobileActionButton>
            <MobileActionButton type="button" onClick={generateReorderReport}>
              Reorder Report
            </MobileActionButton>
            {selectedItems.length > 0 && (
              <MobileActionButton
                type="button"
                $danger
                onClick={handleDeleteSelected}
                disabled={deleteSelectedLoading}
              >
                {deleteSelectedLoading ? 'Deleting...' : `Delete (${selectedItems.length})`}
              </MobileActionButton>
            )}
          </MobileActions>
        </ActionsRow>
      </TopBar>

      <TableContainer>
        {loading ? (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Loading inventory...</LoadingText>
          </LoadingContainer>
        ) : filteredItems.length === 0 ? (
          renderEmptyState()
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>
                  <Checkbox
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th leftAlign>Item</Th>
                <Th>Category</Th>
                <Th>Sub-Category</Th>
                <Th>Quantity</Th>
                <Th>Location</Th>
                <Th>Supplier</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <Tr key={item.id}>
                  <Td>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </Td>
                  <Td leftAlign>
                    <ItemInfoContainer>
                      {renderItemImage(item)}
                      <ItemDetails>
                        <div style={{ fontWeight: '400' }}>{item.name}</div>
                      </ItemDetails>
                    </ItemInfoContainer>
                  </Td>
                  <Td>{item.store_category?.name || '-'}</Td>
                  <Td>{item.subcategory?.name || '-'}</Td>
                  <Td>{item.quantity} {item.unit}</Td>
                  <Td>{item.location}</Td>
                  <Td>{item.supplier}</Td>
                  <Td>₹{renderPrice(item.price)}</Td>
                  <Td>
                    <StatusBadge status={item.status}>
                      {item.status}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => handleEditItem(item)}
                      disabled={editLoading}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? <Spinner /> : <FiTrash2 />}
                    </IconButton>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>

      <MobileOnlySection>
        {loading ? (
          <MobileCardsList>
            {[...Array(4)].map((_, i) => (
              <MobileSkeletonCard key={i} />
            ))}
          </MobileCardsList>
        ) : filteredItems.length === 0 ? (
          renderEmptyState()
        ) : (
          renderMobileItemCards()
        )}
      </MobileOnlySection>

      {/* Add Item Dialog */}
      {showAddDialog && (
        <DialogOverlay>
          <DialogContainer>
            <DialogHeader>
              <CircleIconContainer onClick={() => setShowAddDialog(false)}>
                <img
                  src={Add}
                  style={{
                    height: '1.8vh',
                    transform: 'rotate(-45deg)',
                  }}
                  alt="Close"
                />
              </CircleIconContainer>
            </DialogHeader>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Item Name *</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Category *</FormLabel>
                    <FormSelect
                      name="store_category_id"
                      value={formData.store_category_id}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Sub-Category</FormLabel>
                    <FormSelect
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleFormChange}
                      disabled={!formData.store_category_id}
                    >
                      <option value="">Select Sub-Category</option>
                      {filteredSubCategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Quantity *</FormLabel>
                    <FormInput
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      required
                      min="0"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Unit *</FormLabel>
                    <FormInput
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Reorder Threshold *</FormLabel>
                    <FormInput
                      type="number"
                      name="threshold"
                      value={formData.threshold}
                      onChange={handleFormChange}
                      required
                      min="1"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Price *</FormLabel>
                    <FormInput
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel>Supplier</FormLabel>
                  <FormInput
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Location</FormLabel>
                  <FormInput
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Item Image</FormLabel>
                  <ImageUploadContainer>
                    {imagePreview ? (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <ImagePreview
                          src={imagePreview}
                          alt="Item Preview"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    ) : (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <div
                          style={{
                            width: '13vh',
                            height: '13vh',
                            borderRadius: '2vh',
                            backgroundColor: '#fff',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{
                            textAlign: 'center',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '0.7vw',
                            letterSpacing: '0.7px'
                          }}>
                            Upload Photo
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}

                    <label style={{
                      display: 'block',
                      marginBottom: '0.6vh',
                      fontFamily: '"Roboto", sans-serif',
                      marginTop: '0.1vh',
                      fontSize: '0.8vw',
                      letterSpacing: '0.7px',
                      color: '#000'
                    }}>
                      Add Item Photo
                    </label>
                  </ImageUploadContainer>
                </FormGroup>

                <DialogActions>
                  <ActionButton
                    type="submit"
                    disabled={addLoading}
                    style={{
                      opacity: addLoading ? 0.7 : 1,
                      cursor: addLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {addLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        Adding...
                      </div>
                    ) : (
                      'Add Item'
                    )}
                  </ActionButton>
                </DialogActions>
              </form>
            </DialogContent>
          </DialogContainer>
        </DialogOverlay>
      )}

      {/* Edit Item Dialog */}
      {showEditDialog && (
        <DialogOverlay>
          <DialogContainer>
            <DialogHeader>
              <CircleIconContainer onClick={() => setShowEditDialog(false)}>
                <img
                  src={Add}
                  style={{
                    height: '1.8vh',
                    transform: 'rotate(-45deg)',
                  }}
                  alt="Close"
                />
              </CircleIconContainer>
            </DialogHeader>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Item Name *</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Category *</FormLabel>
                    <FormSelect
                      name="store_category_id"
                      value={formData.store_category_id}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Sub-Category</FormLabel>
                    <FormSelect
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleFormChange}
                      disabled={!formData.store_category_id}
                    >
                      <option value="">Select Sub-Category</option>
                      {filteredSubCategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Quantity *</FormLabel>
                    <FormInput
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      required
                      min="0"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Unit *</FormLabel>
                    <FormInput
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Reorder Threshold *</FormLabel>
                    <FormInput
                      type="number"
                      name="threshold"
                      value={formData.threshold}
                      onChange={handleFormChange}
                      required
                      min="1"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Price *</FormLabel>
                    <FormInput
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel>Supplier</FormLabel>
                  <FormInput
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Location</FormLabel>
                  <FormInput
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Item Image</FormLabel>
                  <ImageUploadContainer>
                    {imagePreview ? (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <ImagePreview
                          src={imagePreview}
                          alt="Item Preview"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    ) : (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <div
                          style={{
                            width: '13vh',
                            height: '13vh',
                            borderRadius: '2vh',
                            backgroundColor: '#fff',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{
                            textAlign: 'center',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '0.7vw',
                            letterSpacing: '0.7px'
                          }}>
                            Upload Photo
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}

                    <label style={{
                      display: 'block',
                      marginBottom: '0.6vh',
                      fontFamily: '"Roboto", sans-serif',
                      marginTop: '0.1vh',
                      fontSize: '0.8vw',
                      letterSpacing: '0.7px',
                      color: '#000'
                    }}>
                      Add Item Photo
                    </label>
                  </ImageUploadContainer>
                </FormGroup>

                <DialogActions>
                  <ActionButton
                    type="submit"
                    disabled={editLoading}
                    style={{
                      opacity: editLoading ? 0.7 : 1,
                      cursor: editLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {editLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </ActionButton>

                </DialogActions>
              </form>
            </DialogContent>
          </DialogContainer>
        </DialogOverlay>
      )}
      {/* Reorder Report Dialog */}
      {showReorderDialog && (
        <DialogOverlay>
          <ReportDialogContainer>
            <DialogHeader>
              <CircleIconContainer onClick={() => setShowReorderDialog(false)}>
                <img
                  src={Add}
                  style={{
                    height: '1.8vh',
                    transform: 'rotate(-45deg)',
                  }}
                  alt="Close"
                />
              </CircleIconContainer>
            </DialogHeader>
            <DialogContent>
              <ReportSummary>
                <ReportSummaryItem>
                  <ReportSummaryLabel>Total Items:</ReportSummaryLabel>
                  <ReportSummaryValue>{lowStockItems.length}</ReportSummaryValue>
                </ReportSummaryItem>
                <ReportSummaryItem>
                  <ReportSummaryLabel>Low Stock:</ReportSummaryLabel>
                  <ReportSummaryValue>
                    {lowStockItems.filter(item => item.status === 'Low Stock').length}
                  </ReportSummaryValue>
                </ReportSummaryItem>
                <ReportSummaryItem>
                  <ReportSummaryLabel>Out of Stock:</ReportSummaryLabel>
                  <ReportSummaryValue>
                    {lowStockItems.filter(item => item.status === 'Out of Stock').length}
                  </ReportSummaryValue>
                </ReportSummaryItem>
              </ReportSummary>

              <ReportTableContainer>
                <ReportTable>
                  <ReportThead>
                    <ReportTr>
                      <ReportTh>#</ReportTh>
                      <ReportTh>Item Name</ReportTh>
                      <ReportTh>Current Qty</ReportTh>
                      <ReportTh>Threshold</ReportTh>
                      <ReportTh>Status</ReportTh>
                      <ReportTh>Supplier</ReportTh>
                    </ReportTr>
                  </ReportThead>
                  <ReportTbody>
                    {lowStockItems.map((item, index) => (
                      <ReportTr key={item.id} status={item.status}>
                        <ReportTd>{index + 1}</ReportTd>
                        <ReportTd>{item.name}</ReportTd>
                        <ReportTd>{item.quantity} {item.unit}</ReportTd>
                        <ReportTd>{item.threshold}</ReportTd>
                        <ReportTd>
                          <StatusBadge status={item.status}>
                            {item.status}
                          </StatusBadge>
                        </ReportTd>
                        <ReportTd>{item.supplier}</ReportTd>
                      </ReportTr>
                    ))}
                  </ReportTbody>
                </ReportTable>
              </ReportTableContainer>
            </DialogContent>
            <DialogActions style={{ marginLeft: ' 2vw', marginRight: '2vw' }}>
              <ActionButton onClick={generatePDF}>
                Download PDF
              </ActionButton>
            </DialogActions>
          </ReportDialogContainer>
        </DialogOverlay>
      )}
    </Container>
  );
};

export default StoreInventory;