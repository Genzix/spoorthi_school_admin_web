import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: #EFEFEF;
`;

const MainContent = styled.main`
  margin-left: ${props => {
    if (props.isIncharge || props.isPrincipal) return '0';
    if (props.hiddenClassMobile || props.isEmployee) return '0vw';
    return props.isCollapsed ? '5vw' : '14vw';
  }};
  padding: 10vh 2vw;
  transition: margin-left 0.3s ease;
`;

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hiddenClassMobile, setHiddenClassMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const [isIncharge, setIsIncharge] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || '';
    setEmail(savedEmail);
    if (savedEmail === 'employee@gmail.com') {
      setIsEmployee(true);
    }
    if (savedEmail === 'incharge@gmail.com') {
      setIsIncharge(true);
    }
    if (savedEmail === 'principal@gmail.com') {
      setIsPrincipal(true);
    }
  }, [email]);
  
  useEffect(() => {
    const handleResize = () => {
      setHiddenClassMobile(window.innerWidth < 767 ? 'hidden' : '');
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <LayoutContainer>
      {!hiddenClassMobile && !isIncharge && !isPrincipal && (
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      )}
      <TopNavbar isCollapsed={isCollapsed} />
      <MainContent 
        isCollapsed={isCollapsed} 
        hiddenClassMobile={hiddenClassMobile} 
        isEmployee={isEmployee}
        isIncharge={isIncharge}
        isPrincipal={isPrincipal}
      >
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;