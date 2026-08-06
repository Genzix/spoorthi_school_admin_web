import { API_BASE_URL } from '@/config/api';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Add from '../../assets/add.svg';
import { useEmployees } from '../../context/EmployeesContext';
import BrandSelect from '../../components/BrandSelect';

const MOBILE_BREAKPOINT = '768px';
const SMALL_MOBILE = '480px';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  background-color: var(--color-panel, #FFE6BB);
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

  @media (max-width: ${SMALL_MOBILE}) {
    margin-left: 0.75rem;
    margin-top: max(0.75rem, env(safe-area-inset-top));
    padding-right: 0.75rem;
  }
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: block;
    font-size: 1.1rem;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    font-size: 1rem;
  }
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #FEA592;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
`;

const CloseIcon = styled.img`
  height: 1.8vh;
  transform: rotate(-45deg);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 18px;
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
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }

  @media (max-width: ${SMALL_MOBILE}) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-top: 0.75rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 1rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.6vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  letter-spacing: 0.7px;
  color: #626060;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    font-size: 0.8rem;
  }
`;

const fieldStyles = `
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  border: 1px solid #fff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  box-sizing: border-box;
  background-color: #fff;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0.75rem 1rem;
    font-size: 16px;
    border-radius: 0.5rem;
    min-height: 44px;
  }

  @media (max-width: ${SMALL_MOBILE}) {
    padding: 0.65rem 0.85rem;
    font-size: 15px;
    min-height: 42px;
  }
`;

const FormInput = styled.input`
  ${fieldStyles}
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.6vw;
  background-color: var(--color-primary);
  color: var(--color-on-primary, #111111);
  border: 1px solid var(--color-primary);
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  cursor: pointer;
  margin-top: 2vh;
  margin-bottom: 5vh;
  box-sizing: border-box;

  &:hover {
    background-color: var(--color-secondary);
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0.85rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    min-height: 48px;
    margin-top: 1rem;
    margin-bottom: max(1.5rem, env(safe-area-inset-bottom));
  }

  @media (max-width: ${SMALL_MOBILE}) {
    font-size: 0.95rem;
    min-height: 46px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1vh;
  font-size: 0.8rem;
  white-space: pre-line;
  font-family: "Roboto", sans-serif;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.875rem;
    margin-top: 0.75rem;
    padding: 0.75rem;
    background-color: rgba(255, 0, 0, 0.08);
    border-radius: 0.5rem;
  }
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

  const { employees, loading: employeesLoading } = useEmployees();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employee_id) {
      setError('Please select an employee');
      return;
    }
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
        `${API_BASE_URL}/employees/salary-records/`,
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

  if (employeesLoading) {
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
    <DialogOverlay onClick={onClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>New Payment</DialogTitle>
          <CircleIconContainer onClick={onClose} role="button" aria-label="Close">
            <CloseIcon src={Add} alt="Close" />
          </CircleIconContainer>
        </DialogHeader>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Select Employee *</FormLabel>
              <BrandSelect
                variant="field"
                aria-label="Select Employee"
                placeholder="Select Employee"
                value={String(formData.employee_id)}
                disabled={loading}
                onChange={(e) =>
                  handleChange({ target: { name: 'employee_id', value: e.target.value } })
                }
                options={[
                  { value: '', label: 'Select Employee' },
                  ...employees.map((emp) => ({
                    value: String(emp.id),
                    label: `${emp.name} (${emp.employee_no})`,
                  })),
                ]}
              />
            </FormGroup>

            <FormRow>
              <FormGroup style={{ flex: 1 }}>
                <FormLabel>Month *</FormLabel>
                <BrandSelect
                  variant="field"
                  aria-label="Month"
                  placeholder="Month"
                  value={String(formData.month)}
                  disabled={loading}
                  onChange={(e) =>
                    handleChange({ target: { name: 'month', value: e.target.value } })
                  }
                  options={months.map((month) => ({
                    value: String(month.value),
                    label: month.label,
                  }))}
                />
              </FormGroup>

              <FormGroup style={{ flex: 1 }}>
                <FormLabel>Year *</FormLabel>
                <BrandSelect
                  variant="field"
                  aria-label="Year"
                  placeholder="Year"
                  value={String(formData.year)}
                  disabled={loading}
                  onChange={(e) =>
                    handleChange({ target: { name: 'year', value: e.target.value } })
                  }
                  options={years.map((year) => ({
                    value: String(year),
                    label: String(year),
                  }))}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>Total Salary *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                name="total_salary"
                value={formData.total_salary}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Payment Date *</FormLabel>
              <FormInput
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Transaction ID *</FormLabel>
              <FormInput
                type="text"
                name="transcaction_id"
                value={formData.transcaction_id}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Payment'}
            </SubmitButton>
          </form>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default NewPaymentDialog;
