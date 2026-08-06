import React, { Suspense } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const LazyLoader = ({ children }) => {
  return (
    <Suspense
      fallback={
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoader; 