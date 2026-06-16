// src/pages/BulkMessages.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FiSend, FiUserX, FiMessageCircle, FiCalendar, FiDollarSign, FiUpload, FiFileText, FiX } from 'react-icons/fi';

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
`;

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
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

const AddStudentText3 = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
  font-weight: 700;
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
`;

const FormInput = styled.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#92FF84'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
`;

const ButtonSpinner = styled.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spin} 1s ease-in-out infinite;
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
`;

const SuccessIcon = styled.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto, sans-serif';
  font-size: 0.8vw;
  color: #666;
  margin: auto;
`;

const UploadContainer = styled.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UploadArea = styled.div`
  border: 2px dashed ${props => props.isDragOver ? '#FFB942' : '#ccc'};
  border-radius: 0.8vw;
  padding: 2vh 1vw;
  text-align: center;
  background: ${props => props.isDragOver ? '#FFEAC7' : '#f8f9fa'};
  transition: all 0.3s;
  cursor: pointer;
  min-height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;

  &:hover {
    border-color: #FFB942;
    background: #FFEAC7;
  }
`;

const UploadIcon = styled.div`
  font-size: 2vw;
  color: #666;
  margin-bottom: 0.5vh;
`;

const UploadText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin-bottom: 0.5vh;
`;

const UploadSubtext = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #999;
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
`;

const FileSize = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #666;
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
  margin-top: 1vh;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#92FF84'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.3vh;
  background: #e9ecef;
  border-radius: 0.15vh;
  overflow: hidden;
  margin-top: 1vh;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #FFB942;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const BulkMessages = () => {
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

  // Form state
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

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

  const fetchAbsentStudents = async (date) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get(`https://spoorthi-dev.genzix.space/masters/absent-students/${date}/`, {
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

      const response = await axios.get('https://spoorthi-dev.genzix.space/masters/fees-collection/', {
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
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Reset form
      setFormData({
        subject: '',
        message: ''
      });
      setFormErrors({});

    } catch (error) {
      console.error('Error sending bulk message:', error);
      alert('Failed to send bulk message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendBulkMessage = async () => {
    if (absentStudents.length === 0) {
      alert('No absent students found for the selected date.');
      return;
    }

    setIsSendingBulkMessage(true);

    try {
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        alert('Authentication token not found. Please login again.');
        return;
      }

      // Call the bulk message API without payload as requested
      const response = await axios.post('https://spoorthi-dev.genzix.space/masters/messages/bulk-absent-student/', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        // Show success message
        setSuccessMessage(`Bulk message sent successfully to ${absentCount} absent students!`);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

        console.log('Bulk message sent successfully:', response.data);
      }

    } catch (error) {
      console.error('Error sending bulk message:', error);
      let errorMessage = 'Failed to send bulk message. Please try again.';

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

      alert(errorMessage);
    } finally {
      setIsSendingBulkMessage(false);
    }
  };

  const handleSendFeeMessage = async () => {
    if (!feeData || feeData.total_pending_fees === 0) {
      alert('No pending fees found.');
      return;
    }

    setIsSendingFeeMessage(true);

    try {
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        alert('Authentication token not found. Please login again.');
        return;
      }

      // Call the bulk term pending message API
      const response = await axios.post('https://spoorthi-dev.genzix.space/masters/messages/bulk-term-pending-message/', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        // Show success message
        setSuccessMessage('Fee reminder sent successfully!');
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

        console.log('Bulk term pending message sent successfully:', response.data);
      }

    } catch (error) {
      console.error('Error sending bulk term pending message:', error);
      let errorMessage = 'Failed to send fee reminder. Please try again.';

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

      alert(errorMessage);
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
        'https://spoorthi-dev.genzix.space/masters/test-marks/bulk-upload/',
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
        setSuccessMessage(
          typeof response.data?.message === 'string' && response.data.message.trim()
            ? response.data.message
            : 'Excel file uploaded successfully!'
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

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
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const highlightedButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FFEAC7'
  };

  const sendMessageButtonStyle = {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    width: '12vw',
    height: "5.5vh",
    padding: '1vh 0.7vw',
    backgroundColor: '#BEFFB6',
    border: 'none',
    color: '#000000',
    borderRadius: '3vw',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.8vw',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };

  const sendMessageButtonDisabledStyle = {
    ...sendMessageButtonStyle,
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  };

  const feeButtonStyle = {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    width: '12vw',
    height: "5.5vh",
    padding: '1vh 0.7vw',
    backgroundColor: '#BEFFB6',
    border: 'none',
    color: '#000000',
    borderRadius: '3vw',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.8vw',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };

  const feeButtonDisabledStyle = {
    ...feeButtonStyle,
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
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

  if (loading) {
    return (
      <div style={{ height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </div>
    );
  }

  return (
    <DashboardContainer>
      <SuccessMessage show={showSuccess}>
        <SuccessIcon>✓</SuccessIcon>
        {successMessage}
      </SuccessMessage>

      <Container>
        {/* Absent Students Section */}
        <RevenuneContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'start', marginBottom: '0.45vh' }}>
              <Logo>Students Absent</Logo>
            </div>
            <AddStudentText1 style={{ color: '#FF6745' }}>
              {absentCount} Students
            </AddStudentText1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', justifyContent: 'end' }}>
              <button
                style={displayMode === 'day' ? highlightedButtonStyle : buttonStyle}
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
              </button>
            </div>
            <button
              style={isSendingBulkMessage || absentStudents.length === 0 ? sendMessageButtonDisabledStyle : sendMessageButtonStyle}
              onClick={handleSendBulkMessage}
              disabled={isSendingBulkMessage || absentStudents.length === 0}
            >
              {isSendingBulkMessage ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'center' }}>
                  <ButtonSpinner />
                  Sending...
                </div>
              ) : (
                `Send Message`
              )}
            </button>
          </div>
        </RevenuneContainer>

        {/* Pending Fees Section */}
        <RevenuneContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'start', marginBottom: '0.45vh' }}>
              <Logo>Pending Fees</Logo>
            </div>
            <AddStudentText1 style={{ color: '#FF6745' }}>
              {feeData ? formatCurrency(feeData.total_pending_fees) : '₹0'}
            </AddStudentText1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', justifyContent: 'end' }}>
              <button
                style={highlightedButtonStyle}
                onClick={() => { }}
              >
                {selectedAcademicYear || 'Select Year'}
              </button>
            </div>
            <button
              style={isSendingFeeMessage || !feeData || feeData.total_pending_fees === 0 ? feeButtonDisabledStyle : feeButtonStyle}
              onClick={handleSendFeeMessage}
              disabled={isSendingFeeMessage || !feeData || feeData.total_pending_fees === 0}
            >
              {isSendingFeeMessage ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'center' }}>
                  <ButtonSpinner />
                  Sending...
                </div>
              ) : (
                `Send Fee Reminder`
              )}
            </button>
          </div>
        </RevenuneContainer>

        {/* Test Marks Upload Section */}
        <UploadContainer style={{ height: '30vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2vw', justifyContent: 'start', marginBottom: '1vh' }}>
              <Logo>Upload Test Marks</Logo>
            </div>

            {!selectedFile ? (
              <UploadArea
                isDragOver={isDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ marginTop: '0.6vh', marginBottom: '0.6vh' }}
                onClick={() => document.getElementById('file-input').click()}
              >
                <UploadIcon>
                  <FiUpload />
                </UploadIcon>
                <UploadText>Drag & drop Excel file here or click to browse</UploadText>
                {/* <UploadSubtext>Supports .xls, .xlsx, .xlsm, .xltx (Max 10MB)</UploadSubtext> */}
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
                  <FiFileText style={{ fontSize: '1.2vw', color: '#FFB942' }} />
                  <div>
                    <FileName>{selectedFile.name}</FileName>
                    <FileSize>{formatFileSize(selectedFile.size)}</FileSize>
                  </div>
                </FileInfo>
                <RemoveButton onClick={removeFile}>
                  <FiX style={{ fontSize: '1vw' }} />
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
              onClick={handleFileUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                  <ButtonSpinner />
                  Uploading... {uploadProgress}%
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                  <FiUpload />
                  Upload Excel
                </div>
              )}
            </UploadButton>
          </div>
        </UploadContainer>
      </Container>
    </DashboardContainer>
  );
};

export default BulkMessages; 