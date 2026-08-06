import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { resolveRole, ROLES } from '@/auth/roles';

const MOBILE_BREAKPOINT = 768;

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: #EFEFEF;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1001;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const MainContent = styled.main`
  margin-left: ${props => {
    if (props.isIncharge || props.isPrincipal) return '0';
    if (props.isMobile || props.isEmployee) return '0vw';
    return props.isCollapsed ? '5vw' : '14vw';
  }};
  padding: 10vh 2vw;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    padding: 11vh 16px 24px;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  @media (max-width: 480px) {
    padding: 10vh 12px 20px;
  }
`;

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(() => resolveRole());

  const employeeView = role === ROLES.EMPLOYEE;
  const inchargeView = role === ROLES.INCHARGE;
  const principalView = role === ROLES.PRINCIPAL;
  const showSidebar = !inchargeView && !principalView && !employeeView;

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    setRole(resolveRole());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      closeMobileMenu();
      return;
    }
    setIsCollapsed(prev => !prev);
  };

  return (
    <LayoutContainer>
      {showSidebar && (
        <>
          <Overlay $isOpen={isMobile && isMobileMenuOpen} onClick={closeMobileMenu} />
          <Sidebar
            isCollapsed={isMobile ? false : isCollapsed}
            onToggle={handleSidebarToggle}
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            onCloseMobileMenu={closeMobileMenu}
          />
        </>
      )}
      <TopNavbar
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        showMobileMenu={showSidebar}
      />
      <MainContent
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        isEmployee={employeeView}
        isIncharge={inchargeView}
        isPrincipal={principalView}
      >
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
