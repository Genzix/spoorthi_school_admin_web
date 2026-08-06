import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/api';
import styled, { keyframes } from 'styled-components';
import grid from '../assets/grid.svg';
import Absent from '../assets/Close-Square.svg';
import Person from '../assets/person.svg';
import Stats from '../assets/stats.svg';
import Recent from '../assets/recent.svg';
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import SEO from '../components/SEO';
import { clearCache, clearSafariCache } from '../utils/cacheUtils';
import { useSchool } from '@/context/SchoolContext';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE_BREAKPOINT = '480px';

const DashboardContainer = styled.div`
  height: 75vh;
  background-color: #EFEFEF;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: auto;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    padding-bottom: 24px;
    margin-top: -1vh;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding-bottom: 16px;
  }
`;

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


const rowMobileStyles = `
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    margin-top: 16px;
    width: 100%;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    gap: 12px;
    margin-top: 12px;
  }
`;

const Container = styled.div`
  height: auto;
  display: flex;
  margin-top: 4vh;
  gap: 2.4vw;
  justify-content: space-between;
  align-items: center;
  ${rowMobileStyles}
`;

const Container1 = styled.div`
  height: auto;
  display: flex;
  margin-top: 3.8vh;
  gap: 2.4vw;
  justify-content: space-between;
  align-items: center;
  ${rowMobileStyles}
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

const RevenuneContainer = styled.div`
  height: 20vh;
  background:#ffffff;
  padding: 1.6vh 2vw;
  border-radius: 1.4vw;
  width: 49vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 27vh;
  background:#ffffff;
  padding: 2.4vh 2vw;
  border-radius: 1.4vw;
  width: 49vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  ${cardMobileStyles}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: 200px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 180px;
  }
`;

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  letter-spacing: 0px;
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

const Logo1 = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.75vw;
  letter-spacing: 0px;
  font-weight: 700;
  color: #000;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 1px;
  display: flex;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 10px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 9px;
  }
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 10px;
  }
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 22px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 20px;
  }
`;

const AddStudentText2 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
    margin-right: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;


const ProgressBarContainer = styled.div`
  position: relative;
  width: 5.5vw;
  height: 90%;
  background: transparent;
  border-radius: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 100px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    width: 38px;
    height: 90px;
    border-radius: 8px;
  }
`;

const ProgressBarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--color-primary);
  width: 100%;
  border-radius: 1.2vw;
  transition: height 0.5s ease;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 10px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    border-radius: 8px;
  }
`;

const MonthLabel = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
`;

const FeeInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1.5vh;
`;

const FeeInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeeAmount = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2vw;
  font-weight: 500;
  color: #000000;
`;

const FeeLabel = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #4F4F4F;
  margin-top: 0.5vh;
`;

const FeePercentage = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  font-weight: 500;
  color: #27AE60;
  margin-top: 0.5vh;
`;

const PieChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ResponsivePieChart = styled(PieChart)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;

  & .MuiPieArc-root {
    stroke: #fff;
    stroke-width: 0px;
  }

  & .MuiChartsArcLabel-root,
  & .MuiPieArcLabel-root {
    display: none !important;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5vw 1vw;
  border-radius: 0.5vw;
  font-size: 0.8vw;
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -100%);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
  }
`;

const RevenueInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1;
    min-width: 0;
    height: auto;
  }
`;

const RevenueTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1vw;
  justify-content: start;
  margin-bottom: 0.35vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 4px;
    margin-bottom: 4px;
  }
`;

const ProgressBarsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 12px;
    height: auto;
    min-height: 100px;
    flex-shrink: 0;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    gap: 10px;
    min-height: 90px;
  }
`;

const AttendanceBar = styled.div`
  height: 8vh;
  width: 100%;
  display: flex;
  position: relative;
  background: ${props => props.$bg || 'var(--color-accent)'};
  border-radius: 1.1vw;
  margin-top: ${props => props.$marginTop || '1.8vh'};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 56px;
    border-radius: 12px;
    margin-top: ${props => props.$marginTopMobile || '12px'};
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    height: 48px;
    border-radius: 10px;
    margin-top: ${props => props.$marginTopMobile || '10px'};
  }
`;

const AttendanceFill = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1.1vw;
  background: ${props => props.$color};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 12px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    border-radius: 10px;
  }
`;

const AttendanceIcon = styled.img`
  height: 2vh;
  position: absolute;
  left: 1vw;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 20px;
    left: 12px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    height: 18px;
    left: 10px;
  }
`;

const AttendanceCount = styled.div`
  position: absolute;
  right: 1vw;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    right: 12px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    right: 10px;
  }
`;

const SubLabel = styled(AddStudentText2)`
  font-size: 0.65vw;
  color: #4F4F4F;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 10px;
  }
`;

const SideCardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 49vw;
  gap: 2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    gap: 16px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    gap: 12px;
  }
`;

const WorkingDaysCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 12.5vh;
  background: #ffffff;
  border-radius: 1.3vw;
  padding: 2.5vh 1.3vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: 88px;
    border-radius: 16px;
    padding: 16px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 80px;
    border-radius: 12px;
    padding: 14px;
  }
`;

const WorkingDaysValue = styled(AddStudentText1)`
  margin-top: auto;
  font-size: 1.4vw;
  font-family: "Comfortaa", sans-serif;
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin-top: 0;
    white-space: nowrap;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;

const RecentTransactionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12.5vh;
  background: #ffffff;
  border-radius: 1.3vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1vh 1vw;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: 100px;
    border-radius: 16px;
    padding: 14px 16px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 90px;
    border-radius: 12px;
    padding: 12px 14px;
  }
`;

const RecentTransactionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 8px;
    gap: 8px;
  }
`;

const RecentTransactionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7vw;
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 10px;
    flex: 1;
  }
`;

const RecentIconCircle = styled.div`
  width: 2vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-primary-light);
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    width: 32px;
    height: 32px;
  }
`;

const RecentIcon = styled.img`
  height: 1.8vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 18px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    height: 16px;
  }
`;

const PaidBadge = styled.div`
  background: #BEFFB6;
  color: black;
  padding: 0.55vh 0.6vw;
  border-radius: 0.5vw;
  font-size: 0.6vw;
  font-weight: 500;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 11px;
  }
`;

const TransactionRow = styled.div`
  width: 100%;
  display: flex;
  height: 4vh;
  margin-top: 0.7vh;
  border-radius: 0.7vw;
  background: #EFEFEF;
  padding: 0.5vh 1vw;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: auto;
    min-height: 40px;
    margin-top: 8px;
    border-radius: 8px;
    padding: 8px 12px;
    flex-wrap: wrap;
    gap: 4px;
  }
`;

const TransactionText = styled(AddStudentText2)`
  font-size: 0.65vw;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
    line-height: 1.4;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 10px;
  }
`;

const FeeCollectionContent = styled.div`
  display: flex;
  width: 100%;
  height: 82%;
  align-items: center;
  background: #BEFFB6;
  margin-top: 1.8vh;
  border-radius: 1.7vw;
  position: relative;
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: auto;
    min-height: 260px;
    margin-top: 12px;
    border-radius: 16px;
    padding: 14px 12px 16px;
    overflow: visible;
    box-sizing: border-box;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 240px;
    border-radius: 12px;
    padding: 12px 10px 14px;
  }
`;

const FeeStatsIcon = styled.div`
  width: 2.1vw;
  height: 2.1vw;
  position: absolute;
  top: 2vh;
  left: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #FFFFFF;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 36px;
    height: 36px;
    top: 14px;
    left: 14px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    width: 32px;
    height: 32px;
    top: 12px;
    left: 12px;
  }
`;

const FeeStatsIconImage = styled.img`
  height: 2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 18px;
  }
`;

const FeeInfoSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    padding: 0 0 0 52px;
    box-sizing: border-box;
    min-height: 48px;
    justify-content: center;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    padding-left: 46px;
    min-height: 44px;
  }
`;

const FeePercentageValue = styled(AddStudentText1)`
  margin-left: 2vh;
  margin-top: 3vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-left: 0;
    margin-top: 0;
    font-size: 24px;
    line-height: 1.1;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 22px;
  }
`;

const FeeYearLabel = styled(AddStudentText)`
  margin-left: 1vw;
  margin-top: 0.2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-left: 0;
    margin-top: 2px;
    font-size: 12px;
  }
`;

/** Spoorthi-only present-bar hexes — keep layout look unchanged for that brand. */
const SPOORTHI_PRESENT_FILL = '#FFC768';
const SPOORTHI_PRESENT_TRACK = 'var(--color-accent)';
const FEE_PENDING_COLOR = '#FF8468';

const FeeChartArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6vw;
  width: 50%;
  height: 100%;
  overflow: visible;
  box-sizing: border-box;
  padding: 0 0.8vw 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 140px;
    gap: 12px;
    margin-top: 8px;
    padding: 0;
    justify-content: center;
  }
`;

const PieChartWrapper = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  margin: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: auto;
    height: auto;
    min-height: 120px;
    flex: 1 1 auto;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 110px;
  }
`;

const FeeChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  padding: 0 0.2vw;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 12px;
    padding: 0;
  }
`;

const FeeLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeeLegendDot = styled.span`
  width: 0.75vw;
  height: 0.75vw;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 12px;
    height: 12px;
  }
`;

const FeeLegendText = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #000000;
  font-weight: 400;
  letter-spacing: 0.4px;
  white-space: nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const FeeCollectionCard = styled(RevenuneContainer1)`
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-height: 320px;
  }

  @media (max-width: ${SMALL_MOBILE_BREAKPOINT}) {
    min-height: 300px;
  }
`;

const MonthSubLabel = styled(SubLabel)`
  margin-top: 0.5vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 4px;
  }
`;

const LoadingWrapper = styled.div`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 60vh;
    min-height: 300px;
  }
`;

const Dashboard = () => {
  const { school, slug, palette } = useSchool();
  // Spoorthi keeps legacy amber present bars; GenCampus + future schools use brand primary.
  const isSpoorthi = slug === 'spoorthi';
  const primaryColor = palette?.primary || 'var(--color-primary)';
  const presentFillColor = isSpoorthi ? SPOORTHI_PRESENT_FILL : primaryColor;
  const presentTrackColor = isSpoorthi
    ? SPOORTHI_PRESENT_TRACK
    : (palette?.primaryLight || 'var(--color-primary-light)');
  const feeCollectedColor = primaryColor;
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [currentYearData, setCurrentYearData] = useState(null);
  const [feesData, setFeesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const getChartDimensions = () => {
    const screenWidth = window.innerWidth;
    const legendReserve = screenWidth <= 768 ? 88 : Math.max(72, screenWidth * 0.045);

    if (screenWidth <= 480) {
      const chartWidth = Math.max(140, screenWidth - 64 - legendReserve);
      return {
        width: chartWidth,
        height: Math.round(chartWidth * 0.55),
      };
    }

    if (screenWidth <= 768) {
      const chartWidth = Math.max(160, screenWidth - 56 - legendReserve);
      return {
        width: chartWidth,
        height: Math.round(chartWidth * 0.5),
      };
    }

    const chartWidth = screenWidth * 0.15;
    return {
      width: chartWidth,
      // Tall enough for a vertically-centered semicircle gauge
      height: Math.max(window.innerHeight * 0.14, chartWidth * 0.58),
    };
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [employeeAttendance, setEmployeeAttendance] = useState(null);
  const [workingDays, setWorkingDays] = useState(null);

  // Clear cache when landing on home page
  useEffect(() => {
    const initializeCacheClear = async () => {
      try {
        // Detect Safari and use appropriate clearing method
        const userAgent = navigator.userAgent.toLowerCase();
        const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('chromium');
        const isIOSSafari = /iphone|ipad|ipod/.test(userAgent) && userAgent.includes('safari');

        let result;
        if (isSafari || isIOSSafari) {
          console.log('Safari detected, using Safari-optimized cache clearing');
          result = await clearSafariCache();
        } else {
          result = await clearCache({
            clearBrowserCache: true
          });
        }

        if (result.success) {
          console.log('Cache cleared successfully on home page load', result.safariOptimized ? '(Safari-optimized)' : '');
        } else {
          console.warn('Cache clearing completed with warnings:', result.message);
        }
      } catch (error) {
        console.error('Error clearing cache on home page load:', error);
      }
    };

    initializeCacheClear();
  }, []); // Empty dependency array means this runs once on component mount

  const [dimensions, setDimensions] = useState(getChartDimensions);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getChartDimensions());
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = dimensions;

  // Semicircle gauge geometry: SVG height ≈ outerRadius so the arc can be vertically centered.
  // Previous bug: cy used full `height` while SVG was `height * 0.55`, so the center sat
  // below the viewport and only the tip of the arc was visible.
  const chartOuterRadius = Math.min(
    width * (isMobileView ? 0.38 : 0.42),
    height * 0.92,
  );
  const chartInnerRadius = chartOuterRadius * 0.72;
  const chartPadY = 6;
  const chartWidth = width;
  const chartHeight = Math.ceil(chartOuterRadius + chartPadY * 2);
  const chartCx = chartWidth / 2;
  const chartCy = chartOuterRadius + chartPadY;

  // Get current date information
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth - 1];
  const prevMonthName = currentMonth > 1 ? monthNames[currentMonth - 2] : monthNames[11];
  const currentMonthKey = `${currentMonthName} ${currentYear}`;
  const prevMonthKey = `${prevMonthName} ${currentYear}`;
  const formattedDate = currentDate.toISOString().split('T')[0];


  useEffect(() => {
    const fetchWorkingDays = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('No authentication token found');
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/employees/working-days-count/?year=${currentYear}&month=${currentMonth}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setWorkingDays(response.data.data);
      } catch (error) {
        console.error('Error fetching working days data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkingDays();
  }, [currentYear, currentMonth]);


  const fetchEmployeeAttendance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/employees/attendance-status-summary/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setEmployeeAttendance(response.data.data);
    } catch (error) {
      console.error('Error fetching employee attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/absent-students/${formattedDate}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch fees data
  const fetchFeesData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/masters/fees-collection/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFeesData(response.data.data);
    } catch (error) {
      console.error('Error fetching fees data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeesData();
    fetchAttendanceData();
    fetchEmployeeAttendance();
  }, []);

  // Fetch current month data
  useEffect(() => {
    const fetchCurrentMonthData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/employees/total-expenses/?year=${currentYear}&month=${currentMonth}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMonthlyData(data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentMonthData();
  }, [currentYear, currentMonth]);

  // Fetch current year data
  useEffect(() => {
    const fetchCurrentYearData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/employees/total-expenses/?year=${currentYear}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCurrentYearData(data);
      } catch (error) {
        console.error("Error fetching yearly data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentYearData();
  }, [currentYear]);

  // Calculate total expenses (expenses + salaries)
  const totalExpenses = currentYearData
    ? (currentYearData.data.total_expenses + currentYearData.data.total_salaries)
    : 0;

  // Get current and previous month data from monthly_summary
  const currentMonthData = monthlyData?.data?.monthly_summary?.[currentMonthKey] || {
    expenses: 0,
    salaries: 0,
    revenue: 0
  };

  const prevMonthData = monthlyData?.data?.monthly_summary?.[prevMonthKey] || {
    expenses: 0,
    salaries: 0,
    revenue: 0
  };

  // Calculate salaries percentage of total (salaries / (expenses + salaries))
  const currentMonthSalariesPercentage = currentMonthData.expenses + currentMonthData.salaries > 0
    ? (currentMonthData.salaries / (currentMonthData.expenses + currentMonthData.salaries)) * 100
    : 0;

  const prevMonthSalariesPercentage = prevMonthData.expenses + prevMonthData.salaries > 0
    ? (prevMonthData.salaries / (prevMonthData.expenses + prevMonthData.salaries)) * 100
    : 0;

  // Get current and previous month revenue from fees data
  const currentMonthRevenue = feesData?.three_month_revenue?.months?.find(
    month => month.month === `${currentMonthName} ${currentYear}`
  )?.amount || 0;

  const prevMonthRevenue = feesData?.three_month_revenue?.months?.find(
    month => month.month === `${prevMonthName} ${currentYear}`
  )?.amount || 0;

  const yearlyRevenue = feesData?.yearly_revenue || 0;

  // Revenue data for progress bars
  const revenueData = {
    target: yearlyRevenue,
    actual: currentMonthRevenue,
    month: currentMonthName
  };

  const revenueData2 = {
    target: yearlyRevenue,
    actual: prevMonthRevenue,
    month: prevMonthName
  };

  // Calculate the percentage of actual revenue compared to target
  const progressPercentage = revenueData.target > 0
    ? Math.min((revenueData.actual / revenueData.target) * 100, 100)
    : 0;

  const progressPercentage2 = revenueData2.target > 0
    ? Math.min((revenueData2.actual / revenueData2.target) * 100, 100)
    : 0;

  const getAttendanceData = () => {
    if (!attendanceData) {
      return {
        totalStudents: 0,
        totalWithAttendance: 0,
        totalPresent: 0,
        totalAbsent: 0,
        presentPercentage: 0,
        absentPercentage: 0
      };
    }

    const { data } = attendanceData;
    const totalStudents = data.attendance_summary.total_students || 0;
    const totalWithAttendance = data.attendance_summary.total_present || 0;
    const totalPresent = data.attendance_summary.total_present || 0;
    const totalAbsent = data.attendance_summary.total_absent || 0;

    const presentPercentage = totalStudents > 0
      ? (totalWithAttendance / totalStudents) * 100
      : 0;

    const absentPercentage = totalStudents > 0
      ? (totalAbsent / totalStudents) * 100
      : 0;

    return {
      totalStudents,
      totalWithAttendance,
      totalPresent,
      totalAbsent,
      presentPercentage,
      absentPercentage
    };
  };

  const attendance = getAttendanceData();


  const presentPercentage = Math.min((attendance.present / attendance.target) * 100, 100);
  const absentPercentage = Math.min((attendance.absent / attendance.target) * 100, 100);

  // Fee collection — clamp to [0, 100], drop zero-value arcs (avoids paddingAngle ghosts)
  const collectedFee = Number(feesData?.total_fees_collected) || 0;
  const pendingFee = Number(feesData?.total_pending_fees) || 0;
  const totalFee = Math.max(0, collectedFee + pendingFee);
  const feeCollectionPercentage = totalFee > 0
    ? Math.min(100, Math.max(0, (collectedFee / totalFee) * 100))
    : 0;
  const remainingFeePercentage = totalFee > 0 ? 100 - feeCollectionPercentage : 100;

  const feeLegendItems = [
    { id: 'collected', label: 'Collected', color: feeCollectedColor },
    { id: 'pending', label: 'Pending', color: FEE_PENDING_COLOR },
  ];

  const pieSlices = [
    feeCollectionPercentage > 0 && {
      id: 'collected',
      value: feeCollectionPercentage,
      label: 'Collected',
      color: feeCollectedColor,
    },
    remainingFeePercentage > 0 && {
      id: 'pending',
      value: remainingFeePercentage,
      label: 'Pending',
      color: FEE_PENDING_COLOR,
    },
  ].filter(Boolean);

  // No fee data yet → full pending arc so the gauge never renders empty
  const pieChartData = pieSlices.length > 0
    ? pieSlices
    : [{
        id: 'pending',
        value: 100,
        label: 'Pending',
        color: FEE_PENDING_COLOR,
      }];


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
    <>
      <SEO
        title="Dashboard"
        description="School management dashboard with attendance tracking, fee management, and student analytics. Monitor key metrics and school performance."
        keywords="school dashboard, attendance tracking, fee management, student analytics, school metrics"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Dashboard",
          "description": "School management dashboard with attendance tracking, fee management, and student analytics.",
          "url": school?.seo?.url || (typeof window !== 'undefined' ? window.location.origin : ''),
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": `${school?.seo?.siteName || school?.displayName || 'School'} Dashboard`,
            "applicationCategory": "EducationalApplication"
          }
        }}
      />
      <DashboardContainer>
        <Container>
          <RevenuneContainer>
            <RevenueInfoColumn>
              <RevenueTitleRow>
                <Logo>Revenue</Logo>
                <AddStudentText>({currentYear}-{currentYear + 1})</AddStudentText>
              </RevenueTitleRow>
              <AddStudentText1>₹ {yearlyRevenue.toLocaleString('en-IN')}</AddStudentText1>
            </RevenueInfoColumn>
            <ProgressBarsRow>
              <ProgressBarContainer>
                <img src={grid} alt="grid" style={{ width: '264%', height: '264%' }} />
                <ProgressBarFill
                  style={{ height: `${progressPercentage}%` }}
                  onMouseEnter={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    setHoveredBar({
                      value: revenueData.actual,
                      month: revenueData.month
                    });
                    setTooltipPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    });
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                <MonthLabel>
                  <Logo1>{revenueData.month}</Logo1>
                </MonthLabel>
              </ProgressBarContainer>
              {hoveredBar && (
                <Tooltip
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`
                  }}
                >
                  Revenue: ₹{hoveredBar.value.toLocaleString('en-IN')}
                </Tooltip>
              )}
              <ProgressBarContainer>
                <img src={grid} alt="grid" style={{ width: '264%', height: '264%' }} />
                <ProgressBarFill
                  style={{ height: `${progressPercentage2}%` }}
                  onMouseEnter={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    setHoveredBar({
                      value: revenueData2.actual,
                      month: revenueData2.month
                    });
                    setTooltipPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    });
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                <MonthLabel>
                  <Logo1>{revenueData2.month}</Logo1>
                </MonthLabel>
              </ProgressBarContainer>
            </ProgressBarsRow>
          </RevenuneContainer>
          <RevenuneContainer>
            <RevenueInfoColumn>
              <RevenueTitleRow>
                <Logo>Expense</Logo>
                <AddStudentText>({currentYear}-{currentYear + 1})</AddStudentText>
              </RevenueTitleRow>
              <AddStudentText1>₹ {totalExpenses.toLocaleString('en-IN')}</AddStudentText1>
            </RevenueInfoColumn>
            <ProgressBarsRow>
              <ProgressBarContainer>
                <img src={grid} alt="grid" style={{ width: '264%', height: '264%' }} />
                <ProgressBarFill style={{ height: `${currentMonthSalariesPercentage}%` }} />
                <MonthLabel>
                  <Logo1>{currentMonthName}</Logo1>
                </MonthLabel>
              </ProgressBarContainer>
              <ProgressBarContainer>
                <img src={grid} alt="grid" style={{ width: '264%', height: '264%' }} />
                <ProgressBarFill style={{ height: `${prevMonthSalariesPercentage}%` }} />
                <MonthLabel>
                  <Logo1>{prevMonthName}</Logo1>
                </MonthLabel>
              </ProgressBarContainer>
            </ProgressBarsRow>
          </RevenuneContainer>
        </Container>
        <Container1>
          <RevenuneContainer1>
            <AddStudentText2>Students Attendance</AddStudentText2>
            <AttendanceBar $bg={presentTrackColor}>
              <AttendanceFill
                $color={presentFillColor}
                style={{ width: `${attendance.presentPercentage}%` }}
              />
              <AttendanceIcon src={Person} alt="Present" />
              <AttendanceCount>
                <AddStudentText2>{attendance.totalWithAttendance}</AddStudentText2>
                <SubLabel>Present</SubLabel>
              </AttendanceCount>
            </AttendanceBar>
            <AttendanceBar $bg="#FFCDC2" $marginTop="2vh" $marginTopMobile="10px">
              <AttendanceFill
                $color="#FF8468"
                style={{ width: `${attendance.absentPercentage}%` }}
              />
              <AttendanceIcon src={Absent} alt="Absent" />
              <AttendanceCount>
                <AddStudentText2>{attendance.totalAbsent}</AddStudentText2>
                <SubLabel>Absent</SubLabel>
              </AttendanceCount>
            </AttendanceBar>
          </RevenuneContainer1>

          <SideCardsColumn>
            <WorkingDaysCard>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'start' }}>
                <AddStudentText2>Working Days</AddStudentText2>
                <MonthSubLabel>(This Month)</MonthSubLabel>
              </div>

              <WorkingDaysValue>
                {workingDays ? workingDays.working_days : '--'} Days
              </WorkingDaysValue>
            </WorkingDaysCard>

            <RecentTransactionCard>
              <RecentTransactionHeader>
                <RecentTransactionTitle>
                  <RecentIconCircle>
                    <RecentIcon src={Recent} alt="Recent" />
                  </RecentIconCircle>
                  <AddStudentText2>Recent Transaction</AddStudentText2>
                </RecentTransactionTitle>
                {feesData?.last_payments?.[0] && (
                  <PaidBadge>Paid</PaidBadge>
                )}
              </RecentTransactionHeader>

              {feesData?.last_payments?.[0] ? (
                <TransactionRow>
                  <TransactionText>
                    ₹{feesData.last_payments[0].amount.toLocaleString('en-IN')} - {new Date(feesData.last_payments[0].payment_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}-{feesData.last_payments[0].student_name}
                  </TransactionText>
                </TransactionRow>
              ) : (
                <SubLabel>No recent transactions</SubLabel>
              )}
            </RecentTransactionCard>
          </SideCardsColumn>
        </Container1>

        <Container1>
          <RevenuneContainer1>
            <AddStudentText2>Employee Attendance</AddStudentText2>
            <AttendanceBar $bg={presentTrackColor}>
              <AttendanceFill
                $color={presentFillColor}
                style={{ width: `${(employeeAttendance?.present / employeeAttendance?.total_employees) * 100 || 0}%` }}
              />
              <AttendanceIcon src={Person} alt="Present" />
              <AttendanceCount>
                <AddStudentText2>{employeeAttendance?.present || 0}</AddStudentText2>
                <SubLabel>Present</SubLabel>
              </AttendanceCount>
            </AttendanceBar>
            <AttendanceBar $bg="#FFCDC2" $marginTop="2vh" $marginTopMobile="10px">
              <AttendanceFill
                $color="#FF8468"
                style={{ width: `${(employeeAttendance?.absent / employeeAttendance?.total_employees) * 100 || 0}%` }}
              />
              <AttendanceIcon src={Absent} alt="Absent" />
              <AttendanceCount>
                <AddStudentText2>{employeeAttendance?.absent || 0}</AddStudentText2>
                <SubLabel>Absent</SubLabel>
              </AttendanceCount>
            </AttendanceBar>
          </RevenuneContainer1>

          <FeeCollectionCard>
            <AddStudentText2>Fee Collection</AddStudentText2>
            <FeeCollectionContent>
              <FeeStatsIcon>
                <FeeStatsIconImage src={Stats} alt="Stats" />
              </FeeStatsIcon>
              <FeeInfoSection>
                <FeeInfoContainer>
                  <FeePercentageValue>{feeCollectionPercentage.toFixed(1)}%</FeePercentageValue>
                  <FeeYearLabel>({currentYear}-{currentYear + 1})</FeeYearLabel>
                </FeeInfoContainer>
              </FeeInfoSection>
              <FeeChartArea>
                <PieChartWrapper>
                  <ResponsivePieChart
                    hideLegend
                    series={[
                      {
                        data: pieChartData,
                        innerRadius: chartInnerRadius,
                        outerRadius: chartOuterRadius,
                        paddingAngle: pieChartData.length > 1 ? 2 : 0,
                        cornerRadius: 17,
                        startAngle: -90,
                        endAngle: 90,
                        cx: chartCx,
                        cy: chartCy,
                        arcLabel: () => '',
                      },
                    ]}
                    width={chartWidth}
                    height={chartHeight}
                    margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  />
                </PieChartWrapper>
                <FeeChartLegend>
                  {feeLegendItems.map((item) => (
                    <FeeLegendItem key={item.id}>
                      <FeeLegendDot $color={item.color} />
                      <FeeLegendText>{item.label}</FeeLegendText>
                    </FeeLegendItem>
                  ))}
                </FeeChartLegend>
              </FeeChartArea>
            </FeeCollectionContent>
          </FeeCollectionCard>
        </Container1>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;