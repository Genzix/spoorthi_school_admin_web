import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

import NotificationIcon from '../../assets/Notification.svg';

const NavbarContainer = styled(motion.div)`
  height: 14vh;
  background: #EFEFEF;
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => 
    props.hiddenClassmobile ? '0vw' : 
    (props.hidden ? '0vw' : 
    (props.isCollapsed ? '5vw' : '14vw'))};
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0 2vw;
  padding-top: 4vh;
  padding-bottom: 4vh;
  z-index: 999;
  transition: left 0.3s ease;
  
  @media (max-width: 1024px) {
    left: 0;
    height: 12vh;
    padding-top: 3vh;
    padding-bottom: 3vh;
  }
  
  @media (max-width: 768px) {
    height: 10vh;
    padding: 0 4vw;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: -2vh;
  gap: 0.9vw;
  @media (max-width: 768px) {
    gap: 4vw;
    margin-top: 0;
  }
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid #ddd;
  }
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    color: #FFB942;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 1vh;
  right: 0.6vw;
  background: #FFB942;
  color: white;
  border-radius: 50%;
  width: 1.4vh;
  height: 1.4vh;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutDialog = styled.div`
  position: absolute;
  top: 5vh;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 1000;
`;

const TopNavbar = ({ isCollapsed }) => {
  const [showLogout, setShowLogout] = useState(false);
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

  const handleLogout = () => {
    localStorage.clear(); // or selectively: localStorage.removeItem('token');
    window.location.reload(); // or redirect to login page
  };

  return (
    <NavbarContainer isCollapsed={isCollapsed} hiddenClassmobile={hiddenClassmobile} hidden={hidden}>
      <RightSection>
        <IconButton>
          <CircleIconContainer>
            <img src={NotificationIcon} alt="Notifications" style={{ width: '2.3vh', height: '2.3vh' }} />
            <NotificationBadge />
          </CircleIconContainer>
        </IconButton>

     {!hiddenClassmobile && (
         <IconButton
         onMouseEnter={() => setShowLogout(true)}
         onMouseLeave={() => setShowLogout(false)}
       >
         <CircleIconContainer>
           <AccountCircleIcon style={{ color: '#FFB942', width: '3.2vh', height: '3.2vh' }} />
         </CircleIconContainer>
         {showLogout && (
           <LogoutDialog
             onMouseEnter={() => setShowLogout(true)}
             onMouseLeave={() => setShowLogout(false)}
           >
             <button onClick={handleLogout} style={{
               background: '#FFB942',
               border: 'none',
               color: '#fff',
               padding: '5px 10px',
               borderRadius: '5px',
               cursor: 'pointer',
             }}>Logout</button>
           </LogoutDialog>
         )}

        
       </IconButton>
     )}
        {hiddenClassmobile && (
             <button onClick={handleLogout} style={{
              background: '#FFB942',
              border: 'none',
              color: '#000000',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>Logout</button>
          )}
      </RightSection>
    </NavbarContainer>
  );
};

export default TopNavbar;
