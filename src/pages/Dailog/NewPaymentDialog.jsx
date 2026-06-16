import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FiX } from 'react-icons/fi';
import Add from '../../assets/add.svg';
import { useEmployees } from '../../context/EmployeesContext';

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
`;

const DialogHeader = styled.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2vh;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5vh;
  font-size: 0.9rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8vw;
  border-radius: 0.6vw;
  border: 1px solid #ddd;
  font-size: 0.9rem;

  &:focus {
    border-color: #FFB942;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8vw;
  border-radius: 0.6vw;
  border: 1px solid #ddd;
  font-size: 0.9rem;

  &:focus {
    border-color: #FFB942;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1vh;
  background-color: #FFB942;
  color: #000;
  border: none;
  border-radius: 0.6vw;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2vh;

  &:hover {
    background-color: #FFA726;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1vh;
  font-size: 0.8rem;
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FEA592;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }
`;

const LoadingMessage = styled.div`
  color: #666;
  margin-top: 1vh;
  font-size: 0.8rem;
`;

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`;

const NewPaymentDialog = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    total_salary: '',
    is_paid: true,
    payment_date: new Date().toISOString().split('T')[0],
    transcaction_id: ''
  });

  const { employees, loading: employeesLoading, error: employeesError } = useEmployees();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        employee_id: formData.employee_id,
        month: parseInt(formData.month, 10),
        year: parseInt(formData.year, 10),
        total_salary: parseFloat(formData.total_salary),
        is_paid: true,
        payment_date: formData.payment_date,
        transcaction_id: formData.transcaction_id
      };
      const response = await axios.post(
        'https://spoorthischool.genzix.space/employees/salary-records/',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response && response.data) {
        onSuccess();
        onClose();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          if (err.response.data.non_field_errors) {
            setError(err.response.data.non_field_errors[0]);
          } else if (err.response.data) {
            const errorMessages = Object.entries(err.response.data)
              .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
              .join('\n');
            setError(errorMessages);
          }
        } else {
          setError(err.response.data?.message || 'Failed to create salary record');
        }
      } else {
        setError(err.message || 'Failed to create salary record');
      }
    } finally {
      setLoading(false);
    }
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];

  if (loading || employeesLoading) {
    return (
      <DialogOverlay>
        <DialogContainer>
          <LoadingContainer>
            <Spinner />
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
        </DialogHeader>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Select Employee *
              </label>
              <Select
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.employee_no})
                  </option>
                ))}
              </Select>
            </FormGroup>

            <div style={{ display: 'flex', gap: '1vw' }}>
              <FormGroup style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.6vh',
                  fontFamily: '"Roboto", sans-serif',
                  marginTop: '0vh',
                  fontSize: '0.7vw',
                  letterSpacing: '0.7px',
                  color: '#626060'
                }}>
                  Month *
                </label>
                <Select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.6vw',
                    borderRadius: '0.6vw',
                    border: '1px solid #fff',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px'
                  }}
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.6vh',
                  fontFamily: '"Roboto", sans-serif',
                  marginTop: '0vh',
                  fontSize: '0.7vw',
                  letterSpacing: '0.7px',
                  color: '#626060'
                }}>
                  Year *
                </label>
                <Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.6vw',
                    borderRadius: '0.6vw',
                    border: '1px solid #fff',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px'
                  }}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </div>

            <FormGroup>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Total Salary *
              </label>
              <Input
                type="number"
                step="0.01"
                name="total_salary"
                value={formData.total_salary}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
              />
            </FormGroup>

            <FormGroup>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Payment Date *
              </label>
              <Input
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
              />
            </FormGroup>

            <FormGroup>
              <label style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Transaction ID *
              </label>
              <Input
                type="text"
                name="transcaction_id"
                value={formData.transcaction_id}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.6vw',
                borderRadius: '0.6vw',
                backgroundColor: '#FFB942',
                border: '1px solid #FFB942',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '0.8vw',
                letterSpacing: '0.7px',
                marginBottom: '5vh',
              }}
            >
              {loading ? (
                <LoadingContainer>
                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '3px' }} />
                </LoadingContainer>
              ) : 'Create Payment'}
            </SubmitButton>
          </form>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default NewPaymentDialog;