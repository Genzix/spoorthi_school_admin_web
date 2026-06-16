import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import Add from '../../assets/add.svg';

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

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
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

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const UploadButton = styled.label`
  padding: 8px 16px;
  background-color: #FFB942;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFA726;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1.2vw;
  height: 1.2vw;
  margin-left: 0.4vw;
  cursor: pointer;
  border-radius: 8px;
  background-color: white;
  border: 0px solid #e0e0e0;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  transition: all 0.2s;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  
  &:checked {
    background-color: #FFB942;
    border-color: #FFB942;
    
    &::after {
      content: "✓";
      position: absolute;
      color: black;
      font-size: 0.8vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  &:hover {
    border-color: #FFB942;
  }
`;

const AddEmployeeDialog = ({ onClose, onSuccess, isEditMode = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    employee_no: initialData?.employee_no || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    salary: initialData?.salary || '',
    department: initialData?.department || '',
    category: initialData?.category || '',
    is_active: initialData?.is_active ?? true,
    photo: null,
    joining_date: initialData?.joining_date || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fetchingDepartments, setFetchingDepartments] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialData?.photo ? `https://spoorthi-dev.genzix.space${initialData.photo}` : null
  );

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        setFetchingDepartments(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://spoorthi-dev.genzix.space/employees/departments/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setDepartments(response.data.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to fetch departments');
      } finally {
        setFetchingDepartments(false);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setFetchingCategories(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://spoorthi-dev.genzix.space/employees/categories/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setCategories(response.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories');
      } finally {
        setFetchingCategories(false);
        setLoading(false);
      }
    };

    fetchDepartments();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('employee_no', formData.employee_no);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('salary', formData.salary);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('is_active', formData.is_active);
      formDataToSend.append('joining_date', formData.joining_date);

      // Only append photo if a new one was selected
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      } else if (isEditMode && !imagePreview) {
        // If in edit mode and no image preview, it means the photo was removed
        formDataToSend.append('photo', '');
      }

      const url = isEditMode
        ? `https://spoorthi-dev.genzix.space/employees/employees/${initialData.id}/`
        : 'https://spoorthi-dev.genzix.space/employees/employees/';

      const method = isEditMode ? 'put' : 'post';

      const response = await axios[method](
        url,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(isEditMode ? 'Employee updated successfully:' : 'Employee added successfully:', response.data);
      onClose();
      onSuccess();
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} employee:`, err);
      setError(err.response?.data?.message || err.message || `Failed to ${isEditMode ? 'update' : 'add'} employee`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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
          {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <ImageUploadContainer>
              {imagePreview ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <label style={{ display: 'contents', cursor: 'pointer' }}>
                    <ImagePreview
                      src={imagePreview}
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
                      alt="Employee Preview"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.5)',
                      border: 'none',
                      borderRadius: '50%',
                      color: 'white',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <FiX size={16} />
                  </button>
                </div>
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
                    <span style={{ fontSize: '12px', textAlign: 'center' }}>Upload Photo</span>
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
                Add Employee Photo
              </label>
            </ImageUploadContainer>

            {/* Rest of your form fields remain the same */}
            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
                maxLength={100}
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="text"
                name="employee_no"
                placeholder="Employee No"
                value={formData.employee_no}
                onChange={handleChange}
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
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="number"
                name="salary"
                placeholder="Salary *"
                value={formData.salary}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6vw',
                  borderRadius: '0.6vw',
                  border: '1px solid #fff',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '0.8vw',
                  letterSpacing: '0.7px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2.4vh' }}>
              <input
                type="date"
                name="joining_date"
                placeholder="Joining Date"
                value={formData.joining_date}
                onChange={handleChange}
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
            </div>

            <div style={{ display: 'flex', gap: '1vw', marginBottom: '2.4vh' }}>
              <div style={{ flex: 1 }}>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.6vw',
                    borderRadius: '0.6vw',
                    border: '1px solid #fff',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px'
                  }}
                  disabled={fetchingDepartments}
                  required
                >
                  <option value="">Select Department *</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.6vw',
                    borderRadius: '0.6vw',
                    border: '1px solid #fff',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '0.8vw',
                    letterSpacing: '0.7px'
                  }}
                  disabled={fetchingCategories}
                  required
                >
                  <option value="">Select Category *</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
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
              disabled={loading}
            >
              {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Employee' : 'Add Employee')}
            </button>
          </form>
        </DialogContent>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default AddEmployeeDialog;