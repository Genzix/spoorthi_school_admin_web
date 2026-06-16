import React, { useEffect, useState } from 'react';
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

const DashboardContainer = styled.div`
  height: 75vh;
   background-color: #EFEFEF;
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
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${spin} 1s ease-in-out infinite;
`;


const Container = styled.div`
   height: auto;
   display: flex;
   margin-top: 4vh;
   gap: 2.4vw;
    justify-content: space-between;
    align-items: center;
`;
const Container1 = styled.div`
   height: auto;
   display: flex;
   margin-top: 3.8vh;
   gap: 2.4vw;
    justify-content: space-between;
    align-items: center;
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
`;

const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`;

const AddStudentText1 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`;

const AddStudentText2 = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
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
`;



const ProgressBarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: #FFB942;
  width: 100%;
  border-radius: 1.2vw;
  transition: height 0.5s ease;
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
  
  & .MuiChartsLegend-root {
    display: none;
  }
  
  & .MuiChartsLegend-series {
    display: none;
  }
  
  & .MuiPieArc-root {
    stroke: #fff;
    stroke-width: 0px;
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
`;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [currentYearData, setCurrentYearData] = useState(null);
  const [feesData, setFeesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.28,
    height: window.innerHeight * 0.28,
  });
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
            preserveLocalStorage: ['token', 'email'],
            preserveSessionStorage: ['token', 'email'],
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

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.5,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = dimensions;

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
          `https://spoorthi-dev.genzix.space/employees/working-days-count/?year=${currentYear}&month=${currentMonth}`,
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
        'https://spoorthi-dev.genzix.space/employees/attendance-status-summary/',
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

      const response = await axios.get(`https://spoorthi-dev.genzix.space/masters/absent-students/${formattedDate}/`, {
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

      const response = await axios.get('https://spoorthi-dev.genzix.space/masters/fees-collection/', {
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
        const response = await fetch(`https://spoorthi-dev.genzix.space/employees/total-expenses/?year=${currentYear}&month=${currentMonth}`, {
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
        const response = await fetch(`https://spoorthi-dev.genzix.space/employees/total-expenses/?year=${currentYear}`, {
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

  // Fee collection data
  const totalFee = (feesData?.total_fees_collected + feesData?.total_pending_fees) || 0;
  const collectedFee = feesData?.total_fees_collected || 0;
  const feeCollectionPercentage = totalFee > 0
    ? Math.min((collectedFee / totalFee) * 100, 100)
    : 0;
  const remainingFeePercentage = 100 - feeCollectionPercentage;

  const pieChartData = [
    { id: 0, value: feeCollectionPercentage, label: 'Collected', color: '#FFB942' },
    { id: 1, value: remainingFeePercentage, label: 'Pending', color: '#FF8468' },
  ];


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
          "url": "https://spoorthi-crm.netlify.app/",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Spoorthi CRM Dashboard",
            "applicationCategory": "EducationalApplication"
          }
        }}
      />
      <DashboardContainer>
        <Container>
          <RevenuneContainer>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.1vw', justifyContent: 'start', marginBottom: '0.35vh' }}>
                <Logo>Revenue</Logo>
                <AddStudentText>({currentYear}-{currentYear + 1})</AddStudentText>
              </div>
              <AddStudentText1>₹ {yearlyRevenue.toLocaleString('en-IN')}</AddStudentText1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '1.5vw' }}>
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
              {/* <ProgressBarContainer>
              <img src={grid} alt="grid" style={{ width: '264%', height: '264%' }} />
              <ProgressBarFill style={{ height: `${progressPercentage2}%` }} />
              <MonthLabel>
                <Logo1>{revenueData2.month}</Logo1>
              </MonthLabel>
            </ProgressBarContainer> */}
            </div>
          </RevenuneContainer>
          <RevenuneContainer>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.1vw', justifyContent: 'start', marginBottom: '0.35vh' }}>
                <Logo>Expense</Logo>
                <AddStudentText>({currentYear}-{currentYear + 1})</AddStudentText>
              </div>
              <AddStudentText1>₹ {totalExpenses.toLocaleString('en-IN')}</AddStudentText1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '1.5vw' }}>
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
            </div>
          </RevenuneContainer>
        </Container>
        <Container1>
          <RevenuneContainer1 style={{ width: '48vw', }}>
            <AddStudentText2>Students Attendance</AddStudentText2>
            <div
              style={{
                height: "8vh",
                width: "100%",
                display: "flex",
                position: "relative",
                background: "#FFEAC7",
                borderRadius: "1.1vw",
                marginTop: "1.8vh",
              }}
            >
              <div
                style={{
                  width: `${attendance.presentPercentage}%`,
                  height: "100%",
                  background: "#FFC768",
                  position: "absolute",
                  borderRadius: '1.1vw',
                  left: 0,
                  top: 0,
                }}
              ></div>
              <img src={Person} style={{ height: '2vh', position: 'absolute', left: '1vw', top: '50%', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', right: '1vw', top: '50%', transform: 'translateY(-50%)', display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AddStudentText2>{attendance.totalWithAttendance}</AddStudentText2>
                <AddStudentText2 style={{ fontSize: '0.65vw', color: '#4F4F4F' }}>Present</AddStudentText2>
              </div>
            </div>
            <div style={{ height: "8vh", width: "100%", display: "flex", position: "relative", background: '#FFCDC2', borderRadius: '1.1vw', marginTop: '2vh' }}>
              <div
                style={{
                  width: `${attendance.absentPercentage}%`,
                  height: "100%",
                  background: "#FF8468",
                  position: "absolute",
                  borderRadius: '1.1vw',
                  left: 0,
                  top: 0,
                }}
              ></div>
              <img src={Absent} style={{ height: '2vh', position: 'absolute', left: '1vw', top: '50%', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', right: '1vw', top: '50%', transform: 'translateY(-50%)', display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AddStudentText2>{attendance.totalAbsent}</AddStudentText2>
                <AddStudentText2 style={{ fontSize: '0.65vw', color: '#4F4F4F' }}>Absent</AddStudentText2>
              </div>
            </div>
          </RevenuneContainer1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '49vw',
              gap: '2vh',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '12.5vh',
                background: '#ffffff',
                borderRadius: '1.3vw',
                padding: '2.5vh 1.3vw',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'start', }}>
                <AddStudentText2>Working Days</AddStudentText2>
                <AddStudentText2 style={{ fontSize: '0.65vw', color: '#4F4F4F', marginTop: '0.5vh' }}>
                  (This Month)
                </AddStudentText2>
              </div>

              <AddStudentText1 style={{ marginTop: 'auto', fontSize: '1.4vw', fontFamily: '"Comfortaa", sans-serif', fontWeight: '500', letterSpacing: '1px', }}>
                {workingDays ? workingDays.working_days : '--'} Days
              </AddStudentText1>

            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '12.5vh',
                background: '#ffffff',
                borderRadius: '1.3vw',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '1vh 1vw',
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5vh'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7vw' }}>
                  <div style={{ width: '2vw', height: '2vw', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#FFDA9B', }}>
                    <img src={Recent} style={{ height: '1.8vh' }} />
                  </div>
                  <AddStudentText2 >Recent Transaction</AddStudentText2>
                </div>
                {feesData?.last_payments?.[0] && (
                  <div style={{
                    background: '#BEFFB6',
                    color: 'black',
                    padding: '0.55vh 0.6vw',
                    borderRadius: '0.5vw',
                    fontSize: '0.6vw',
                    fontWeight: '500'
                  }}>
                    Paid
                  </div>
                )}
              </div>

              {feesData?.last_payments?.[0] ? (
                <div style={{
                  width: '100%',
                  display: 'flex',
                  height: '4vh',
                  marginTop: '0.7vh',
                  borderRadius: '0.7vw',
                  background: '#EFEFEF',
                  padding: '0.5vh 1vw',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <AddStudentText2 style={{ fontSize: '0.65vw', }}>
                    ₹{feesData.last_payments[0].amount.toLocaleString('en-IN')} - {new Date(feesData.last_payments[0].payment_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}-{feesData.last_payments[0].student_name}
                  </AddStudentText2>
                  <AddStudentText2 >

                  </AddStudentText2>
                  <AddStudentText2></AddStudentText2>
                </div>
              ) : (
                <AddStudentText2 style={{ color: '#4F4F4F' }}>No recent transactions</AddStudentText2>
              )}
            </div>
          </div>
        </Container1>

        <Container1>
          <RevenuneContainer1>
            <AddStudentText2>Employee Attendance</AddStudentText2>
            <div style={{ height: "8vh", width: "100%", display: "flex", position: "relative", background: '#FFEAC7', borderRadius: '1.1vw', marginTop: '1.8vh' }}>
              <div
                style={{
                  width: `${(employeeAttendance?.present / employeeAttendance?.total_employees) * 100}%`,
                  height: "100%",
                  background: "#FFC768",
                  position: "absolute",
                  borderRadius: '1.1vw',
                  left: 0,
                  top: 0,
                }}
              ></div>
              <img src={Person} style={{ height: '2vh', position: 'absolute', left: '1vw', top: '50%', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', right: '1vw', top: '50%', transform: 'translateY(-50%)', display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AddStudentText2>{employeeAttendance?.present || 0}</AddStudentText2>
                <AddStudentText2 style={{ fontSize: '0.65vw', color: '#4F4F4F' }}>Present</AddStudentText2>
              </div>
            </div>
            <div style={{ height: "8vh", width: "100%", display: "flex", position: "relative", background: '#FFCDC2', borderRadius: '1.1vw', marginTop: '2vh' }}>

              <img src={Absent} style={{ height: '2vh', position: 'absolute', left: '1vw', top: '50%', transform: 'translateY(-50%)' }} />
              <div
                style={{
                  width: `${(employeeAttendance?.absent / employeeAttendance?.total_employees) * 100}%`,
                  height: "100%",
                  background: "#FF8468",
                  position: "absolute",
                  borderRadius: '1.1vw',
                  left: 0,
                  top: 0,
                }}
              ></div>
              <div style={{ position: 'absolute', right: '1vw', top: '50%', transform: 'translateY(-50%)', display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AddStudentText2>{employeeAttendance?.absent || 0}</AddStudentText2>
                <AddStudentText2 style={{ fontSize: '0.65vw', color: '#4F4F4F' }}>Absent</AddStudentText2>
              </div>
            </div>
          </RevenuneContainer1>

          <RevenuneContainer1>
            <AddStudentText2>Fee Collection</AddStudentText2>
            <div style={{ display: 'flex', width: '100%', height: '82%', alignItems: 'center', background: '#BEFFB6', marginTop: '1.8vh', borderRadius: '1.7vw', position: 'relative' }}>
              {/* <AddStudentText1 style={{ color: '#000', fontSize: '1vw', fontFamily: '"Comfortaa", sans-serif', fontWeight: '700', letterSpacing: '1px', position: 'absolute', bottom: '2vh', right: 'auto', marginLeft:"auto" }}>
  ₹{feesData?.total_fees_collected}
</AddStudentText1> */}
              <div style={{ width: '2.1vw', height: '2.1vw', position: 'absolute', top: '2vh', left: '2vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#FFFFFF', }}>
                <img src={Stats} style={{ height: '2vh' }} />
                <div style={{ position: 'absolute', bottom: '0vh', right: '-5vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                </div>
              </div>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <FeeInfoContainer>
                  <AddStudentText1 style={{ marginLeft: '2vh', marginTop: '3vh' }}>{feeCollectionPercentage.toFixed(1)}%</AddStudentText1>
                  <AddStudentText style={{ marginLeft: '1vw', marginTop: '0.2vh' }}>({currentYear}-{currentYear + 1})</AddStudentText>
                </FeeInfoContainer>
              </div>
              <div style={{ width: '20vw', height: '100%', position: 'relative', padding: '0', marginTop: '4vh', marginRight: '3vw' }}>
                <ResponsivePieChart
                  series={[
                    {
                      data: pieChartData,
                      innerRadius: width * 0.30,
                      outerRadius: width * 0.41,
                      paddingAngle: 2,
                      cornerRadius: 17,
                      startAngle: -90,
                      endAngle: 90,
                      cx: width * 0.47,
                      cy: height * 0.70,
                    },
                  ]}
                  width={width}
                  height={height * 0.5}
                  slotProps={{
                    legend: {
                      hidden: true,
                    },
                  }}
                />
              </div>
            </div>
          </RevenuneContainer1>
        </Container1>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;