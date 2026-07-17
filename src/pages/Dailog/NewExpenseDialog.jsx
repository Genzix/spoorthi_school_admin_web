import { API_BASE_URL } from '@/config/api';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Add from '../../assets/add.svg';

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
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
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

const FormFileInput = styled.input`
  ${fieldStyles}
  padding: 0.5rem;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0.65rem 0.85rem;
    font-size: 14px;
    min-height: 44px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.6vw;
  background-color: #FFB942;
  color: #000;
  border: 1px solid #FFB942;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  cursor: pointer;
  margin-top: 2vh;
  margin-bottom: 5vh;
  box-sizing: border-box;

  &:hover {
    background-color: #FFA726;
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

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 0.6vw;
  margin-top: 1vh;
  object-fit: contain;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 0.5rem;
    margin-top: 0.75rem;
    max-height: 180px;
  }
`;

const NewExpenseDialog = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    transaction_id: '',
    seller_phone: '',
    date: new Date().toISOString().split('T')[0],
    bill_image: null
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        bill_image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('transaction_id', formData.transaction_id);
      formDataToSend.append('seller_phone', formData.seller_phone);
      formDataToSend.append('date', formData.date);
      if (formData.bill_image) {
        formDataToSend.append('bill_image', formData.bill_image);
      }

      const response = await axios.post(
        `${API_BASE_URL}/employees/expenses/`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.status === 'success') {
        onSuccess();
        onClose();
      } else {
        throw new Error(response.data.message || 'Failed to create expense');
      }
    } catch (err) {
      console.error('Error creating expense:', err);
      setError(err.response?.data?.message || 'Failed to create expense');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>New Expense</DialogTitle>
          <CircleIconContainer onClick={onClose} role="button" aria-label="Close">
            <CloseIcon src={Add} alt="Close" />
          </CircleIconContainer>
        </DialogHeader>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Expense Name *</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </FormGroup>

            <FormRow>
              <FormGroup style={{ flex: 1 }}>
                <FormLabel>Quantity *</FormLabel>
                <FormInput
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </FormGroup>

              <FormGroup style={{ flex: 1 }}>
                <FormLabel>Price *</FormLabel>
                <FormInput
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>Transaction ID *</FormLabel>
              <FormInput
                type="text"
                name="transaction_id"
                value={formData.transaction_id}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Seller Phone</FormLabel>
              <FormInput
                type="tel"
                name="seller_phone"
                value={formData.seller_phone}
                onChange={handleChange}
                disabled={submitting}
                inputMode="tel"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Date *</FormLabel>
              <FormInput
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Bill Image</FormLabel>
              <FormFileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={submitting}
              />
              {previewImage && (
                <ImagePreview src={previewImage} alt="Bill preview" />
              )}
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Expense'}
            </SubmitButton>
          </form>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default NewExpenseDialog;
