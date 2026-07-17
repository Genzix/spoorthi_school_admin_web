import { API_BASE_URL } from '@/config/api';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Add from '../../assets/add.svg';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 0;
  }
`;

const DialogContainer = styled.div`
  position: absolute;
  right: 0;
  background: linear-gradient(135deg, #FFE6BB 0%, #FFD89B 50%, #FFC97A 100%);
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
`;

const DialogHeader = styled.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-right: 1rem;
  }

  @media (max-width: 480px) {
    margin-left: 0.75rem;
    margin-top: 0.75rem;
    gap: 0.5rem;
    padding-right: 0.75rem;
  }
`;

const DownloadButton = styled.button`
  padding: 0.8vh 1.2vw;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 0.5vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  margin-right: 0.8vw;
  border: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    gap: 0.4rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.85rem;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    margin-right: 0.4rem;
    gap: 0.3rem;
    min-height: 38px;
  }
`;

const PrintReportButton = styled.button`
  padding: 0.8vh 1.2vw;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
  color: white;
  border: none;
  border-radius: 0.5vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  margin-right: 1.5vw;
  border: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #FF5252 0%, #FF1744 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(255, 107, 107, 0.3);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    gap: 0.4rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.85rem;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    margin-right: 0.4rem;
    gap: 0.3rem;
    min-height: 38px;
  }
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: "Comfortaa", sans-serif;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 2vh;
  padding-right: 2vw;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-top: 0.75rem;
  }
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: linear-gradient(135deg, #FEA592 0%, #FF7E62 100%);
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(254, 165, 146, 0.3);
  flex-shrink: 0;

  &:hover {
    background: linear-gradient(135deg, #FF7E62 0%, #FF6745 100%);
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 6px 20px rgba(254, 165, 146, 0.4);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const StudentInfo = styled.div`
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 1.5vh 1.5vw;
  margin-bottom: 1.5vh;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid rgba(255, 185, 66, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 0.5rem;
  }
`;

const StudentName = styled.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  font-weight: 700;
  background: linear-gradient(135deg, #000 0%, #333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1vh 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #FFB942 0%, #FF7E62 100%);
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 0 0 0.4rem 0;
  }
`;

const StudentDetails = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const TableContainer = styled.div`
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 1.5vh 1.5vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  border: 1px solid rgba(255, 185, 66, 0.1);
  overflow-x: auto;
  max-height: 65vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 0.75rem;
    max-height: calc(100vh - 200px);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 0.5rem;
    max-height: calc(100vh - 180px);
  }
`;

const TestMarkCard = styled.div`
  margin-bottom: 1.5vh;
  padding: 1.5vh 1.2vw;
  background: linear-gradient(135deg, #fff 0%, #fafbfc 100%);
  border-radius: 12px;
  border: 1px solid #e3e6ea;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    border: 1px solid rgba(255, 185, 66, 0.3);
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
    padding: 0.85rem;
    border-radius: 0.5rem;
  }
`;

const TestCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;
  padding-bottom: 0.8vh;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.6rem;
    padding-bottom: 0.6rem;
  }
`;

const TestHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 0.75rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const TestHeaderRight = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
    width: 100%;
  }
`;

const TestTitle = styled.h4`
  margin: 0 0 0.3vh 0;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  color: #000;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 0 0.3rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 0.25rem 0;
  }
`;

const TestDate = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TestMarksDisplay = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  font-weight: 600;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const TestPercentage = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.85vw;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SubjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
  align-items: center;
  line-height: 1.6;

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const SubjectItem = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  color: #000;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SubjectSeparator = styled.span`
  color: #999;
  margin: 0 0.3rem;

  @media (max-width: 768px) {
    margin: 0 0.25rem;
  }

  @media (max-width: 480px) {
    margin: 0 0.2rem;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color || '#4CAF50'};
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 9px;
    height: 9px;
  }
`;

const AbsentBadge = styled.span`
  font-family: "Roboto", sans-serif;
  color: #F44336;
  font-weight: 600;
  font-size: 0.7vw;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SubjectMarks = styled.span`
  font-family: "Roboto", sans-serif;
  color: #666;
  font-weight: 500;
  font-size: 0.75vw;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SubjectPercentage = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  color: ${props => props.color || '#666'};
  font-size: 0.75vw;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SubjectRank = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: ${props => props.color || '#666'};
  font-size: 0.65vw;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;
`;

const Th = styled.th`
  text-align: left;
  padding: 1.5vh 1vw;
  background-color: #F0F0F0;
  font-weight: 500;
  font-size: 0.8vw;
  color: #000;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 1.5vh 1vw;
  font-size: 0.75vw;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const MarksCell = styled(Td)`
  font-weight: 500;
  color: ${props => {
    const percentage = (parseFloat(props.marksObtained) / parseFloat(props.totalMarks)) * 100;
    if (percentage >= 90) return '#2E7D32';
    if (percentage >= 80) return '#388E3C';
    if (percentage >= 70) return '#FF8F00';
    if (percentage >= 60) return '#F57C00';
    return '#D32F2F';
  }};
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 4vh 2vw;
  color: #666;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
`;

const TestMarksDialog = ({ onClose, studentId, studentName }) => {
  const [testMarks, setTestMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format test name
  const formatTestName = (testName) => {
    if (!testName) return 'Test';
    // Convert snake_case to Title Case
    return testName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchAllTestMarks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${API_BASE_URL}/masters/test-marks/student/${studentId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 'success') {
          // Process and calculate total marks from subject marks
          const processedMarks = response.data.data.map(test => {
            // Ensure subject_marks exists and is an array
            if (!test.subject_marks || !Array.isArray(test.subject_marks) || test.subject_marks.length === 0) {
              return {
                ...test,
                marks_obtained: '0.00',
                total_marks: '0.00',
                overall_percentage: '0.0',
                best_subject: null,
                message_sent: false
              };
            }

            // Calculate total marks obtained and total possible marks from subject_marks
            const totalMarksObtained = test.subject_marks.reduce((sum, subject) =>
              sum + (parseFloat(subject.marks_obtained) || 0), 0
            );
            const totalPossibleMarks = test.subject_marks.reduce((sum, subject) =>
              sum + (parseFloat(subject.total_marks) || 0), 0
            );

            // Find best performing subject
            const bestSubject = test.subject_marks.reduce((best, current) => {
              const currentPercentage = totalPossibleMarks > 0 ? (parseFloat(current.marks_obtained || 0) / parseFloat(current.total_marks || 1)) * 100 : 0;
              const bestPercentage = totalPossibleMarks > 0 ? (parseFloat(best.marks_obtained || 0) / parseFloat(best.total_marks || 1)) * 100 : 0;
              return currentPercentage > bestPercentage ? current : best;
            });

            // Calculate overall percentage (avoid division by zero)
            const overallPercentage = totalPossibleMarks > 0 ? (totalMarksObtained / totalPossibleMarks) * 100 : 0;

            return {
              ...test,
              marks_obtained: totalMarksObtained.toFixed(2),
              total_marks: totalPossibleMarks.toFixed(2),
              overall_percentage: overallPercentage.toFixed(1),
              best_subject: bestSubject,
              message_sent: false
            };
          });

          // Sort by date ascending (oldest first, then reverse to show newest first)
          const sortedMarks = processedMarks.sort(
            (a, b) => new Date(a.test_date) - new Date(b.test_date)
          ).reverse();
          setTestMarks(sortedMarks);
        }
      } catch (error) {
        console.error('Failed to fetch test marks', error);
        setError('Failed to load test marks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchAllTestMarks();
    }
  }, [studentId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    return new Date(dateTimeString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculatePercentage = (obtained, total) => {
    return ((parseFloat(obtained) / parseFloat(total)) * 100).toFixed(1);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const downloadMarksAsCSV = () => {
    if (testMarks.length === 0) {
      alert('No test marks available to download');
      return;
    }

    // Collect all unique subjects across all tests
    const allSubjects = new Set();
    testMarks.forEach(test => {
      if (test.subject_marks && test.subject_marks.length > 0) {
        test.subject_marks.forEach(subject => {
          allSubjects.add(subject.subject);
        });
      }
    });

    const subjectList = Array.from(allSubjects).sort();

    // Create CSV header - group marks and rank for each subject
    const headers = [
      'Test Name',
      'Test Date',
      ...subjectList.flatMap(subject => [`${subject} Marks`, `${subject} Rank`]),
      'Obtained Marks',
      'Total Marks',
      'Rank'
    ];

    // Create CSV rows
    const rows = [];
    testMarks.forEach(test => {
      const row = [
        formatTestName(test.test_name),
        formatDate(test.test_date)
      ];

      // Add subject marks and rank together for each subject
      subjectList.forEach(subject => {
        const subjectData = test.subject_marks?.find(s => s.subject === subject);
        if (subjectData) {
          if (subjectData.is_absent) {
            row.push('AB', '');
          } else {
            row.push(
              `${parseFloat(subjectData.marks_obtained || 0).toFixed(0)}/${parseFloat(subjectData.total_marks || 0).toFixed(0)}`,
              subjectData.rank || 'N/A'
            );
          }
        } else {
          row.push('', '');
        }
      });

      // Add overall data at the end
      row.push(
        parseFloat(test.marks_obtained || 0).toFixed(0),
        parseFloat(test.total_marks || 0).toFixed(0),
        test.rank || 'N/A'
      );

      rows.push(row);
    });

    // Convert to CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${studentName}_Test_Marks_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printMarksReport = () => {
    try {
      if (testMarks.length === 0) {
        alert('No test marks available to print');
        return;
      }

      console.log('Starting print generation...');

      // Collect all unique subjects across all tests
      const allSubjects = new Set();
      testMarks.forEach(test => {
        if (test.subject_marks && test.subject_marks.length > 0) {
          test.subject_marks.forEach(subject => {
            allSubjects.add(subject.subject);
          });
        }
      });

      const subjectList = Array.from(allSubjects).sort();
      console.log('Subjects found:', subjectList);

      // Create a new window for printing
      const printWindow = window.open('', '_blank', 'width=800,height=600');

      if (!printWindow) {
        alert('Please allow popups to print the report');
        return;
      }

      // Prepare table data
      const headers = [
        'Test Name',
        'Test Date',
        ...subjectList.flatMap(subject => [`${subject} Marks`, `${subject} Rank`]),
        'Obtained Marks',
        'Total Marks',
        'Rank'
      ];

      const tableData = testMarks.map(test => {
        const row = [
          formatTestName(test.test_name),
          formatDate(test.test_date)
        ];

        // Add subject marks and rank together for each subject
        subjectList.forEach(subject => {
          const subjectData = test.subject_marks?.find(s => s.subject === subject);
          if (subjectData) {
            if (subjectData.is_absent) {
              row.push('AB', '');
            } else {
              row.push(
                `${parseFloat(subjectData.marks_obtained || 0).toFixed(0)}/${parseFloat(subjectData.total_marks || 0).toFixed(0)}`,
                (subjectData.rank || 'N/A').toString()
              );
            }
          } else {
            row.push('', '');
          }
        });

        // Add overall data at the end
        row.push(
          parseFloat(test.marks_obtained || 0).toFixed(0),
          parseFloat(test.total_marks || 0).toFixed(0),
          (test.rank || 'N/A').toString()
        );

        return row;
      });

      // Create HTML content for printing
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${studentName} - Test Marks Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #000;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 15px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #000;
              margin-bottom: 5px;
            }
            .subtitle {
              font-size: 14px;
              color: #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 12px;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f0f0f0;
              color: #000;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .test-name {
              text-align: left;
              font-weight: 500;
            }
            .date {
              text-align: center;
            }
            @media print {
              body { margin: 0; }
              .header { page-break-after: avoid; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              * { -webkit-print-color-adjust: exact; color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${studentName} - Test Marks Report</div>
            <div class="subtitle">Generated on: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableData.map(row => `
                <tr>
                  <td class="test-name">${row[0]}</td>
                  <td class="date">${row[1]}</td>
                  ${row.slice(2).map(cell => `<td>${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      // Write content to the new window
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close the window after printing (optional)
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        }, 250);
      };

      console.log('Print dialog opened');

    } catch (error) {
      console.error('Error generating print report:', error);
      alert('Error generating print report. Please check the console for details.');
    }
  };

  if (loading) {
    return (
      <DialogOverlay>
        <DialogContainer>
          <LoadingContainer>
            <Spinner />
            <LoadingText>Loading test marks...</LoadingText>
          </LoadingContainer>
        </DialogContainer>
      </DialogOverlay>
    );
  }

  return (
    <DialogOverlay>
      <DialogContainer>
        <DialogHeader>
          <CircleIconContainer onClick={onClose}>
            <img
              src={Add}
              style={{
                height: '1.8vh',
                transform: 'rotate(-45deg)',
              }}
              alt="Close"
            />
          </CircleIconContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', flexWrap: 'wrap' }}>
            <DownloadButton onClick={downloadMarksAsCSV}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download CSV
            </DownloadButton>
            <PrintReportButton onClick={printMarksReport}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
              </svg>
              Print Report
            </PrintReportButton>
          </div>
        </DialogHeader>

        <DialogContent>
          {error ? (
            <ErrorMessage>
              {error}
              <RetryButton onClick={() => window.location.reload()}>
                Retry
              </RetryButton>
            </ErrorMessage>
          ) : (
            <>
              <StudentInfo>
                <StudentName>{studentName}</StudentName>
                <StudentDetails>
                  Total Tests: {testMarks.length}
                </StudentDetails>
              </StudentInfo>

              <TableContainer>
                {testMarks.length > 0 ? (
                  <div>
                    {testMarks.map((test, index) => {
                      const testColor = parseFloat(test.overall_percentage) >= 80 ? '#4CAF50' :
                        parseFloat(test.overall_percentage) >= 60 ? '#FF9800' : '#F44336';

                      return (
                        <TestMarkCard key={test.id}>
                          {/* Decorative corner element */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '0',
                            height: '0',
                            borderStyle: 'solid',
                            borderWidth: '0 20px 20px 0',
                            borderColor: `transparent ${testColor} transparent transparent`,
                            opacity: 0.8
                          }}></div>
                          {/* Test Header */}
                          <TestCardHeader>
                            <TestHeaderLeft>
                              <StatusDot color={testColor} />
                              <div>
                                <TestTitle>
                                  {formatTestName(test.test_name)}
                                </TestTitle>
                                <TestDate>
                                  {formatDate(test.test_date)} • Rank: {test.rank || 'N/A'}
                                </TestDate>
                              </div>
                            </TestHeaderLeft>
                            <TestHeaderRight>
                              <TestMarksDisplay>
                                {parseFloat(test.marks_obtained || 0).toFixed(0)}/{parseFloat(test.total_marks || 0).toFixed(0)}
                              </TestMarksDisplay>
                              <TestPercentage>
                                {test.overall_percentage}%
                              </TestPercentage>
                            </TestHeaderRight>
                          </TestCardHeader>

                          {/* Subject List */}
                          {test.subject_marks && test.subject_marks.length > 0 ? (
                            <SubjectGrid>
                              {test.subject_marks.map((subject, index) => {
                                return (
                                  <React.Fragment key={subject.id}>
                                    {index > 0 && <SubjectSeparator>•</SubjectSeparator>}
                                    <SubjectItem>
                                      {subject.subject} = {subject.is_absent ? 'AB' : parseFloat(subject.marks_obtained || 0).toFixed(0)}
                                    </SubjectItem>
                                  </React.Fragment>
                                );
                              })}
                            </SubjectGrid>
                          ) : (
                            <div style={{
                              textAlign: 'center',
                              color: '#666',
                              fontFamily: '"Roboto", sans-serif',
                              fontSize: '0.75vw',
                              padding: '1.5vh 0',
                              background: 'rgba(255, 185, 66, 0.05)',
                              borderRadius: '6px',
                              border: '1px dashed rgba(255, 185, 66, 0.3)'
                            }}>
                              No subject details available
                            </div>
                          )}
                        </TestMarkCard>
                      );
                    })}
                  </div>
                ) : (
                  <NoDataMessage>
                    No test marks available for this student.
                  </NoDataMessage>
                )}
              </TableContainer>
            </>
          )}
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default TestMarksDialog; 