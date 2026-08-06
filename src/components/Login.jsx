import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useSchool } from '@/context/SchoolContext';
import { getApiBaseUrl } from '@/api/client';
import {
  persistSession,
  assertSchoolMatch,
  clearSession,
} from '@/auth/roles';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  background: var(--gradient-primary, linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%));
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
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

const PasswordField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(Input)`
  padding-right: 2.75rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: #888;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #555;
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-primary);
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
    background-color: var(--color-secondary);
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
  const { school, slug } = useSchool();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const base = getApiBaseUrl() || school?.apiBaseUrl;
      const response = await axios.post(`${base}/Users/login/`, {
        email,
        password,
      });

      const user = response.data.user || {};
      const match = assertSchoolMatch(user, slug);
      if (!match.ok) {
        clearSession();
        setError(match.message);
        return;
      }

      persistSession({
        token: response.data.access,
        user,
        schoolSlug: slug,
      });

      navigate('/', { replace: true });
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const displayName = school?.displayName || 'School';
  const logoSrc = school?.logo?.mark;

  return (
    <LoginContainer>
      <LeftPanel>
        <h2 style={{ fontFamily: "'Comfortaa', sans-serif", marginBottom: '1rem' }}>
          Welcome to {displayName}
        </h2>
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            maxWidth: '400px',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
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
            {logoSrc && <Logo src={logoSrc} alt={`${displayName} logo`} />}
          </LogoContainer>

          <Title>Sign In</Title>
          <Subtitle>Enter your credentials to access your account</Subtitle>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="login-password">Password</Label>
              <PasswordField>
                <PasswordInput
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={togglePasswordVisibility}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </PasswordToggle>
              </PasswordField>
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
