import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import searchIcon from '../assets/Search.svg';
import axios from 'axios';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import MiscReceipt from '../components/MiscReceipt';
import { useStudents } from '../context/StudentsContext';

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

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 700;
  color: #000000;
  display: flex;
  align-items: center;
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

const MiscRecordsList = styled.div`
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

const MiscRecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
`;

const RecordDetail = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
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
`;

const FormSelect = styled.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
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
`;

const DropdownItem = styled.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const FormButton = styled.button`
  padding: 1.5vh 1vw;
  background-color: #BEFFB6;
  color: black;
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

  &:hover {
    background-color: #92FF84;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonSpinner = styled.div`
  width: 1vw;
  height: 1vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spin} 1s linear infinite;
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
`;

const DialogTitle = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;
`;

const DialogRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;
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
`;

const DialogLabel = styled.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DialogValue = styled.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
`;

const DownloadButton = styled.button`
  background-color: #FFEAC7;
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

  &:hover {
    background-color: #FFB942;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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

      const response = await axios.get('https://spoorthischool.genzix.space/masters/miscellaneous/', {
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

      const response = await axios.get('https://spoorthischool.genzix.space/masters/bank/', {
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
        const response = await axios.post('https://spoorthischool.genzix.space/masters/miscellaneous/check-payment/', {
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

      const response = await axios.post('https://spoorthischool.genzix.space/masters/miscellaneous/', payload, {
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
      const studentResponse = await axios.get(`https://spoorthischool.genzix.space/masters/students/${misc.student.id}/`, {
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
      <div style={{ height: ' 75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        Miscellaneous payment recorded successfully!
      </SuccessMessage>

      <Container>
        <RevenuneContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'end', gap: '0.2vw', justifyContent: 'start', marginBottom: '0.45vh' }}>
              <Logo>Miscellaneous Collection</Logo>
              <AddStudentText>({displayMode === 'month' ? getMonthName(currentMonth) : currentYear})</AddStudentText>
            </div>
            <AddStudentText1>
              {miscData.reduce((total, misc) => total + parseFloat(misc.paided_amount), 0).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
              }).replace('₹', '₹')}
            </AddStudentText1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', justifyContent: 'end' }}>
              <button
                style={{
                  padding: '0.7vh 1vw',
                  backgroundColor: displayMode === 'year' ? '#FFB942' : '#EFEFEF',
                  border: 'none',
                  borderRadius: '0.4vw',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.65vw',
                  cursor: 'pointer',
                  letterSpacing: '0.7px',
                }}
                onClick={() => setDisplayMode('year')}
              >
                {currentYear}
              </button>
              <button
                style={{
                  padding: '0.7vh 1vw',
                  backgroundColor: displayMode === 'month' ? '#FFB942' : '#EFEFEF',
                  border: 'none',
                  borderRadius: '0.4vw',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.65vw',
                  cursor: 'pointer',
                  letterSpacing: '0.7px',
                }}
                onClick={() => setDisplayMode('month')}
              >
                {getMonthName(currentMonth)}
              </button>
            </div>
          </div>
        </RevenuneContainer>

        <RevenuneContainer2>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    <RecordDetail>
                      {misc.category} - {misc.student.name} ({misc.student.admission_no})
                    </RecordDetail>
                  </div>
                  <RecordDetail>{formatCurrency(misc.paided_amount)}</RecordDetail>
                </MiscRecordItem>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2vh 0',
                fontFamily: 'Roboto, sans-serif',
                margin: 'auto'
              }}>
                No miscellaneous records found
              </div>
            )}
          </MiscRecordsList>
        </RevenuneContainer2>
      </Container>

      <Container>
        <RevenuneContainer2>
          <AddStudentText3 style={{ marginBottom: '3vh' }}>Add Miscellaneous Payment</AddStudentText3>

          <FormContainer>
            <FormGroup>
              <FormLabel>Student*</FormLabel>
              <StudentDropdown>
                <FormInput
                  type="text"
                  style={{ width: '100%', borderColor: formErrors.student_id ? '#ff4444' : '#ccc' }}
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
              <FormSelect
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{ borderColor: formErrors.category ? '#ff4444' : '#ccc' }}
              >
                <option value="">Select Category</option>
                {CATEGORY_CHOICES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </FormSelect>
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
                <div style={{
                  fontSize: '0.7vw',
                  color: '#666',
                  marginTop: '0.3vh',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Total Amount: {formatCurrency(existingMiscPayment.totalAmount)}
                  {existingMiscPayment.totalPaidAmount > 0 && (
                    <span style={{ marginLeft: '1vw' }}>
                      (Paid: {formatCurrency(existingMiscPayment.totalPaidAmount)})
                    </span>
                  )}
                </div>
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
                <div style={{
                  fontSize: '0.7vw',
                  color: '#666',
                  marginTop: '0.3vh',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Pending Amount: {formatCurrency(pendingAmount)}
                </div>
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
              <FormSelect
                name="payment_mode"
                value={formData.payment_mode}
                onChange={handleInputChange}
                style={{ borderColor: formErrors.payment_mode ? '#ff4444' : '#ccc' }}
              >
                {PAYMENT_MODE_CHOICES.map(mode => (
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
                  <FormSelect
                    name="bank_name_id"
                    value={formData.bank_name_id}
                    onChange={handleInputChange}
                    style={{ borderColor: formErrors.bank_name_id ? '#ff4444' : '#ccc' }}
                  >
                    <option value="">Select Bank</option>
                    {bankAccounts.map(bank => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name} ({bank.code})
                      </option>
                    ))}
                  </FormSelect>
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