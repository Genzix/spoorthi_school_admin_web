import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/menu.svg';
import ChevronLeftIcon from '../../assets/arrow.svg';

import { Dashboard as DashboardIcon, Users as UsersIcon, Settings as SettingsIcon, Employee as EmployeeIcon, Expenses as ExpensesIcon, Fee as FeeIcon, Store as StoreIcon, Miscellaneous as MiscellaneousIcon, Attendance as AttendanceIcon, BulkMessages as BulkMessagesIcon } from './CustomIcons';

const SidebarContainer = styled(motion.div)`
  width: ${props => (props.$isMobile ? 'min(280px, 78vw)' : props.isCollapsed ? '5vw' : '14vw')};
  height: 100vh;
  background: #FFFFFF;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1002;
  display: ${props => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  overflow: visible;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    width: min(280px, 78vw);
    transform: translateX(${props => (props.$isMobileMenuOpen ? '0' : '-100%')});
    box-shadow: ${props => (props.$isMobileMenuOpen ? '4px 0 24px rgba(0, 0, 0, 0.15)' : 'none')};
  }
`;

const SidebarHeader = styled.div`
  height: 12vh;
  display: flex;
  align-items: center;
  padding: 0 ${props => (props.isCollapsed && !props.$isMobile ? '0.5vw' : '1.5vw')};
  position: relative;
  justify-content: ${props => (props.isCollapsed && !props.$isMobile ? 'center' : 'flex-start')};

  @media (max-width: 768px) {
    height: auto;
    min-height: 72px;
    padding: 16px;
  }
`;

const Logo = styled.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 700;
  color: #000000;
  display: flex;
  align-items: center;
  opacity: ${props => (props.isCollapsed && !props.$isMobile ? 0 : 1)};
  transition: opacity 0.3s ease;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 16px;
    opacity: 1;
  }
`;

const LogoImage = styled.img`
  height: 3.8vh;
  border-radius: 50%;
  margin-right: ${props => (props.isCollapsed && !props.$isMobile ? '0' : '0.8vw')};
  filter: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 40px;
    margin-right: 10px;
  }
`;

const CircleIconContainer = styled.button`
  position: fixed;
  top: 3vh;
  left: ${props => (props.$isCollapsed ? '5vw' : '14vw')};
  transform: translateX(-50%);
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #FFDA9B;
  border: 1px solid #FFDA9B;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 1100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: left 0.3s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #FFB942;
    border-color: #FFB942;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
  }

  &:active {
    transform: translateX(-50%) scale(0.96);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCloseButton = styled.button`
  display: none;
  background: #FFDA9B;
  border: 1px solid #FFDA9B;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 768px) {
    display: flex;
  }

  img {
    height: 14px;
    transform: rotate(90deg);
  }
`;

const MenuItems = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 2.5vh;
  padding: 0 ${props => (props.isCollapsed && !props.$isMobile ? '0.5vw' : '0')};

  @media (max-width: 768px) {
    margin-top: 8px;
    padding: 0 8px 16px;
  }
`;

const MenuItem = styled(motion.div)`
  padding: 1.2vh ${props => (props.isCollapsed && !props.$isMobile ? '0.5vw' : '1.3vw')};
  margin: 1.5vh ${props => (props.isCollapsed && !props.$isMobile ? '0.5vw' : '0.75vw')};
  display: flex;
  border-radius: 4vw;
  align-items: center;
  justify-content: ${props => (props.isCollapsed && !props.$isMobile ? 'center' : 'flex-start')};
  gap: ${props => (props.isCollapsed && !props.$isMobile ? '0' : '0.8vw')};
  cursor: pointer;
  color: ${props => (props.active ? '#000000' : '#000000')};
  background: ${props => (props.active ? '#FFB942' : 'transparent')};
  transition: all 0.3s ease;
  min-height: 4vh;

  &:hover {
    background: #FFE5B9;
    color: #000000;
  }

  svg {
    width: ${props => (props.isCollapsed && !props.$isMobile ? '1.8vh' : '1.5vh')};
    height: ${props => (props.isCollapsed && !props.$isMobile ? '1.8vh' : '1.5vh')};
    transition: width 0.3s ease, height 0.3s ease;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    margin: 8px 8px;
    border-radius: 24px;
    min-height: 44px;
    gap: 12px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const MenuText = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.6px;
  font-weight: 400;
  opacity: ${props => (props.isCollapsed && !props.$isMobile ? 0 : 1)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  color: inherit;
  width: ${props => (props.isCollapsed && !props.$isMobile ? '0' : 'auto')};
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
    opacity: 1;
    width: auto;
  }
`;

const SidebarFooter = styled.div`
  display: none;
  flex-shrink: 0;
  padding: 16px;
  border-top: 1px solid #EFEFEF;
  background: #FFFFFF;

  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  background: #FFB942;
  border: none;
  color: #000000;
  padding: 12px 16px;
  border-radius: 24px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #FFDA9B;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Sidebar = ({
  isCollapsed,
  onToggle,
  isMobile = false,
  isMobileMenuOpen = false,
  onCloseMobileMenu,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || '';
    if (savedEmail === 'employee@gmail.com') {
      setHidden(true);
    }
  }, []);

  useEffect(() => {
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  }, [location.pathname, isMobile, onCloseMobileMenu]);

  const menuItems = [
    { id: 'dashboard', icon: <DashboardIcon />, text: 'Dashboard', path: '/' },
    { id: 'Students', icon: <UsersIcon />, text: 'Students', path: '/Students' },
    { id: 'Employees', icon: <EmployeeIcon />, text: 'Employees', path: '/employees' },
    { id: 'Expenses', icon: <ExpensesIcon />, text: 'Expenses', path: '/expenses' },
    { id: 'Fee', icon: <FeeIcon />, text: 'Fee', path: '/fee' },
    { id: 'Miscellaneous', icon: <MiscellaneousIcon />, text: 'Miscellaneous', path: '/miscellaneous' },
    { id: 'Store', icon: <StoreIcon />, text: 'Store', path: '/store' },
    { id: 'Attendance', icon: <AttendanceIcon />, text: 'Student Attendance', path: '/attendance' },
    { id: 'EmployeeAttendance', icon: <AttendanceIcon />, text: 'Employee Attendance', path: '/employee-attendance' },
    { id: 'BulkMessages', icon: <BulkMessagesIcon />, text: 'Bulk Messages', path: '/bulk-messages' },
    { id: 'Settings', icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
  ];

  const isItemActive = (itemPath, currentPath) => {
    if (itemPath === '/Students') {
      return currentPath === '/Students' || currentPath.startsWith('/students/');
    }
    return currentPath === itemPath;
  };

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (hidden) {
    return null;
  }

  const showExpanded = isMobile || !isCollapsed;

  return (
    <SidebarContainer
      isCollapsed={isCollapsed}
      $isMobile={isMobile}
      $isMobileMenuOpen={isMobileMenuOpen}
      hidden={hidden}
    >
      <SidebarHeader isCollapsed={isCollapsed} $isMobile={isMobile}>
        <Logo isCollapsed={isCollapsed} $isMobile={isMobile}>
          <LogoImage src={logo} alt="Logo" isCollapsed={isCollapsed} $isMobile={isMobile} />
          {showExpanded && <span>Spoorthi</span>}
        </Logo>
        {isMobile ? (
          <MobileCloseButton onClick={onToggle} aria-label="Close menu">
            <img src={ChevronLeftIcon} alt="Close" />
          </MobileCloseButton>
        ) : (
          <CircleIconContainer
            $isCollapsed={isCollapsed}
            onClick={onToggle}
            type="button"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <img
              src={isCollapsed ? MenuIcon : ChevronLeftIcon}
              alt=""
              aria-hidden="true"
              style={{
                transform: isCollapsed ? 'none' : 'rotate(90deg)',
                height: isCollapsed ? '1.6vh' : '1.2vh',
                transition: 'transform 0.3s ease, height 0.3s ease',
                pointerEvents: 'none',
              }}
            />
          </CircleIconContainer>
        )}
      </SidebarHeader>
      <MenuItems isCollapsed={isCollapsed} $isMobile={isMobile}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            active={isItemActive(item.path, location.pathname)}
            onClick={() => handleMenuClick(item.path)}
            isCollapsed={isCollapsed}
            $isMobile={isMobile}
          >
            {React.cloneElement(item.icon, {})}
            <MenuText isCollapsed={isCollapsed} $isMobile={isMobile}>{item.text}</MenuText>
          </MenuItem>
        ))}
      </MenuItems>
      {isMobile && (
        <SidebarFooter>
          <LogoutButton type="button" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </SidebarFooter>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
