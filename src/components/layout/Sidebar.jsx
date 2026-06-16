import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg'; 
import MenuIcon from '../../assets/menu.svg'; 
import ChevronLeftIcon from '../../assets/arrow.svg'; 


import { Dashboard as DashboardIcon, Users as UsersIcon, Settings as SettingsIcon, Employee as EmployeeIcon, Expenses as ExpensesIcon , Fee as FeeIcon, Store as StoreIcon, Miscellaneous as MiscellaneousIcon, Attendance as AttendanceIcon, BulkMessages as BulkMessagesIcon} from './CustomIcons';

const SidebarContainer = styled(motion.div)`
  width: ${props => props.isCollapsed ? '5vw' : '14vw'};
  height: 100vh;
  background: #FFFFFF;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  z-index: 1000;
  display: ${props => props.hidden ? 'none' : 'block'};
`;

const SidebarHeader = styled.div`
  height: 12vh;
  display: flex;
  align-items: center;
  padding: 0 ${props => props.isCollapsed ? '0.5vw' : '1.5vw'};
  position: relative;
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
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
  opacity: ${props => props.isCollapsed ? 0 : 1};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #FFDA9B;
  border: 1px solid #FFDA9B;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  top: 3vh;
  right: ${props => props.isCollapsed ? '-2.5vh' : '-1.3vw'};
  position: absolute;
  transition: right 0.3s ease;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    color: #FFB942;
  }

  img {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const MenuItems = styled.div`
  margin-top: 2.5vh;
  padding: 0 ${props => props.isCollapsed ? '0.5vw' : '0'};
`;

const MenuItem = styled(motion.div)`
  padding: 1.2vh ${props => props.isCollapsed ? '0.5vw' : '1.3vw'};
  margin: 1.5vh ${props => props.isCollapsed ? '0.5vw' : '0.75vw'};
  display: flex;
  border-radius: 4vw;  
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
  gap: ${props => props.isCollapsed ? '0' : '0.8vw'};
  cursor: pointer;
  color: ${props => props.active ? '#000000' : '#000000'};
  background: ${props => props.active ? '#FFB942' : 'transparent'};
  transition: all 0.3s ease;
  min-height: 4vh;

  &:hover {
    background: #FFE5B9;
    color: #000000;
  }

  svg {
    width: ${props => props.isCollapsed ? '1.8vh' : '1.5vh'};
    height: ${props => props.isCollapsed ? '1.8vh' : '1.5vh'};
    transition: width 0.3s ease, height 0.3s ease;
  }
`;

const MenuText = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.6px;
  font-weight: 400;
  opacity: ${props => props.isCollapsed ? 0 : 1};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  color: inherit;
  width: ${props => props.isCollapsed ? '0' : 'auto'};
  overflow: hidden;
`;

const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hiddenClassmobile, setHiddenClassmobile] = useState('');
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || '';
    if (savedEmail === 'employee@gmail.com') {
      setHidden(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setHiddenClassmobile(window.innerWidth < 767 ? 'hidden' : '');
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
    // { id: 'settings', icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
  ];

  const isItemActive = (itemPath, currentPath) => {
    if (itemPath === '/Students') {
      return currentPath === '/Students' || currentPath.startsWith('/students/');
    }
    return currentPath === itemPath;
  };

  if (hidden) {
    return null; // This will completely hide the sidebar
  }

  return (
    <SidebarContainer isCollapsed={isCollapsed} hidden={hidden}>
      <SidebarHeader isCollapsed={isCollapsed}>
        <Logo isCollapsed={isCollapsed}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              height: '3.8vh', 
              borderRadius: '50%', 
              marginRight: isCollapsed ? '0' : '0.8vw',
              filter: 'none',
              transition: 'all 0.3s ease'
            }} 
          />
          {!isCollapsed && <span>Spoorthi</span>}
        </Logo>
        {!hiddenClassmobile && (
          <CircleIconContainer 
            isCollapsed={isCollapsed}
            onClick={onToggle}
          >
            <ToggleButton 
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <img 
                src={isCollapsed ? MenuIcon : ChevronLeftIcon} 
                alt={isCollapsed ? 'Menu' : 'Collapse'} 
                style={{
                  transform: isCollapsed ? 'none' : 'rotate(90deg)',
                  height: isCollapsed ? '1.6vh' : '1.2vh',
                  transition: 'transform 0.3s ease, height 0.3s ease'
                }}
              />
            </ToggleButton>
          </CircleIconContainer>
        )}
      </SidebarHeader>
      <MenuItems isCollapsed={isCollapsed}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            active={isItemActive(item.path, location.pathname)}
            onClick={() => navigate(item.path)}
            isCollapsed={isCollapsed}
          >
            {React.cloneElement(item.icon, {})}
            <MenuText isCollapsed={isCollapsed}>{item.text}</MenuText>
          </MenuItem>
        ))}
      </MenuItems>
    </SidebarContainer>
  );
};

export default Sidebar;