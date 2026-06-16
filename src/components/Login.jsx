import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import logo from '../assets/logo.svg';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 185, 66, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 185, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 185, 66, 0); }
`;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f9fa;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #FFB942 0%, #FFDA9B 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: black;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 20vh;
  }
`;

const LoginFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    box-shadow: none;
    border-radius: 0;
    max-width: 100%;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 0.5rem;
`;

const Title = styled.h1`
  font-family: 'Comfortaa', sans-serif;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #FFB942;
    box-shadow: 0 0 0 3px rgba(255, 185, 66, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #FFB942;
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #FFA51E;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Illustration = styled.img`
  width: 80%;
  max-width: 400px;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const FeatureList = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://spoorthischool.genzix.space/Users/login/', {
        email,
        password
      });

      // Save token and email to local storage
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('email', response.data.user.email);

      // Redirect to dashboard
      navigate('/', { replace: true });
      window.location.reload();

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LeftPanel>
        <h2 style={{ fontFamily: "'Comfortaa', sans-serif", marginBottom: '1rem' }}>Welcome to Spoorthi</h2>
        <p style={{ fontFamily: "'Roboto', sans-serif", maxWidth: '400px', textAlign: 'center', marginBottom: '2rem' }}>
          Manage your school administration with Genzix comprehensive CRM solution
        </p>
        <FeatureList>
          <FeatureItem>Student Management</FeatureItem>
          <FeatureItem>Fee Collection</FeatureItem>
          <FeatureItem>Employee Tracking</FeatureItem>
          <FeatureItem>Inventory Control</FeatureItem>
        </FeatureList>
      </LeftPanel>

      <RightPanel>
        <LoginFormContainer>
          <LogoContainer>
            <Logo src={logo} alt="Logo" />
          </LogoContainer>

          <Title>Sign In</Title>
          <Subtitle>Enter your credentials to access your account</Subtitle>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </LoginFormContainer>
      </RightPanel>
    </LoginContainer>
  );
};

export default Login;