import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

import NotificationIcon from '../../assets/Notification.svg';
import MenuIcon from '../../assets/menu.svg';
import { useSchool } from '@/context/SchoolContext';
import { isEmployee, clearSession } from '@/auth/roles';
import { rememberSchoolSlug, schoolAwarePath } from '@/schools/resolveSchool';

const NavbarContainer = styled(motion.div)`
  height: 14vh;
  background: #EFEFEF;
  position: fixed;
  top: 0;
  right: 0;
  left: ${props =>
    props.$isMobile || props.hidden
      ? '0vw'
      : props.isCollapsed
        ? '5vw'
        : '14vw'};
  display: flex;
  align-items: center;
  justify-content: ${props => (props.$showMobileMenu ? 'stretch' : 'right')};
  padding: 0 2vw;

  ${props =>
    props.$showMobileMenu &&
    `
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 8px;
  `}
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
    padding: 0 16px;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
`;

const LeftSection = styled.div`
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
`;

const CenterSection = styled.div`
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary-light);
  border: 1px solid var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--color-primary);
  }

  &:active {
    transform: scale(0.96);
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const MobileBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  pointer-events: none;

  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  span {
    font-family: "Comfortaa", sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: -2vh;
  gap: 0.9vw;

  @media (max-width: 768px) {
    gap: 16px;
    margin-top: 0;
    flex-shrink: 0;
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
    color: var(--color-primary);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 1vh;
  right: 0.6vw;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  width: 1.4vh;
  height: 1.4vh;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
  }
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

const LogoutButton = styled.button`
  background: var(--color-primary);
  border: none;
  color: ${props => (props.$isMobile ? '#000000' : '#fff')};
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;

const TopNavbar = ({
  isCollapsed,
  isMobile = false,
  isMobileMenuOpen = false,
  onToggleMobileMenu,
  showMobileMenu = false,
}) => {
  const { school, slug } = useSchool();
  const [showLogout, setShowLogout] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isEmployee()) {
      setHidden(true);
    }
  }, []);

  const handleLogout = () => {
    const tenant = slug || school?.slug;
    clearSession();
    localStorage.clear();
    if (tenant) rememberSchoolSlug(tenant);
    window.location.assign(schoolAwarePath('/login', tenant));
  };

  const showMobileHeader = isMobile && showMobileMenu;
  const displayName = school?.displayName || 'School';
  const logoSrc = school?.logo?.mark;

  return (
    <NavbarContainer
      isCollapsed={isCollapsed}
      $isMobile={isMobile}
      hidden={hidden}
      $showMobileMenu={showMobileHeader}
    >
      <LeftSection $visible={showMobileHeader}>
        <MenuButton
          onClick={onToggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <img src={MenuIcon} alt="" />
        </MenuButton>
      </LeftSection>

      <CenterSection $visible={showMobileHeader}>
        <MobileBrand>
          {logoSrc && <img src={logoSrc} alt={`${displayName} logo`} />}
          <span>{displayName}</span>
        </MobileBrand>
      </CenterSection>

      <RightSection>
        <IconButton>
          <CircleIconContainer>
            <img src={NotificationIcon} alt="Notifications" style={{ width: '2.3vh', height: '2.3vh' }} />
            <NotificationBadge />
          </CircleIconContainer>
        </IconButton>

        {!isMobile && (
          <IconButton
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <CircleIconContainer>
              <AccountCircleIcon style={{ color: 'var(--color-primary)', width: '3.2vh', height: '3.2vh' }} />
            </CircleIconContainer>
            {showLogout && (
              <LogoutDialog
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                <LogoutButton onClick={handleLogout} $isMobile={isMobile}>
                  Logout
                </LogoutButton>
              </LogoutDialog>
            )}
          </IconButton>
        )}
      </RightSection>
    </NavbarContainer>
  );
};

export default TopNavbar;
