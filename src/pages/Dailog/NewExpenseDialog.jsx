import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Add from '../../assets/add.svg';

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

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }
`;

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 2vh;
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

const FileInputContainer = styled.div`
  margin-top: 1vh;
`;

const FileInputLabel = styled.label`
  display: block;
  margin-bottom: 0.5vh;
  font-size: 0.9rem;
  color: #333;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.8vw;
  border-radius: 0.6vw;
  border: 1px solid #ddd;
  font-size: 0.9rem;
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

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

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      // Append all fields to formData
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
        'https://spoorthischool.genzix.space/employees/expenses/',
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
      setLoading(false);
    }
  };

  if (loading) {
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
                Expense Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
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
                  Quantity *
                </label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
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
                  Price *
                </label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
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
                Transaction ID *
              </label>
              <Input
                type="text"
                name="transaction_id"
                value={formData.transaction_id}
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
                Seller Phone
              </label>
              <Input
                type="text"
                name="seller_phone"
                value={formData.seller_phone}
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
                Date *
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
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
              <FileInputLabel style={{
                display: 'block',
                marginBottom: '0.6vh',
                fontFamily: '"Roboto", sans-serif',
                marginTop: '0vh',
                fontSize: '0.7vw',
                letterSpacing: '0.7px',
                color: '#626060'
              }}>
                Bill Image
              </FileInputLabel>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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
              {previewImage && (
                <div style={{ marginTop: '1vh' }}>
                  <img
                    src={previewImage}
                    alt="Bill preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '0.6vw'
                    }}
                  />
                </div>
              )}
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
              ) : 'Create Expense'}
            </SubmitButton>
          </form>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default NewExpenseDialog;