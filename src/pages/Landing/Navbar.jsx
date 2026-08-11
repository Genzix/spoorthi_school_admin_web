import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';
import { schoolAwarePath } from '@/schools/resolveSchool';
import { BtnGold, Container } from './styles';

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: color-mix(in srgb, #fff 82%, transparent);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &[data-scrolled='true'] {
    background: color-mix(in srgb, #fff 94%, transparent);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  }
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.5rem;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--lp-navy);
  min-width: 0;
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  flex-shrink: 0;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  min-width: 0;

  strong {
    font-family: var(--lp-font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  span {
    font-family: var(--lp-font-body);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: color-mix(in srgb, var(--lp-gold) 70%, #8a6a10);
    text-transform: uppercase;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.1rem;

  @media (max-width: 960px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  padding: 0.55rem 0.85rem;
  font-family: var(--lp-font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(p) => (p.$active ? 'var(--lp-navy)' : 'var(--lp-muted)')};
  text-decoration: none;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0.85rem;
    right: 0.85rem;
    bottom: 0.15rem;
    height: 2px;
    background: var(--lp-gold);
    transform: scaleX(${(p) => (p.$active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: var(--lp-navy);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;

  @media (max-width: 960px) {
    display: none;
  }
`;

const StaffLink = styled(Link)`
  font-family: var(--lp-font-body);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--lp-muted);
  text-decoration: none;
  padding: 0.45rem 0.6rem;

  &:hover {
    color: var(--lp-navy);
  }
`;

const MenuBtn = styled.button`
  display: none;
  border: 0;
  background: transparent;
  color: var(--lp-navy);
  font-size: 1.45rem;
  padding: 0.35rem;
  cursor: pointer;

  @media (max-width: 960px) {
    display: inline-flex;
  }
`;

const Drawer = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: ${(p) => (p.$open ? 'block' : 'none')};
    border-top: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
    background: #fff;
    padding: 0.75rem 0 1.25rem;
  }

  a,
  ${StaffLink} {
    display: block;
    padding: 0.85rem 1.25rem;
    font-family: var(--lp-font-body);
    font-weight: 600;
    color: var(--lp-navy);
    text-decoration: none;
  }
`;

const DrawerCta = styled(BtnGold)`
  margin: 0.5rem 1.25rem 0;
  width: calc(100% - 2.5rem);
`;

const Navbar = ({ brand, nav, admissionCta, activeId }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isStaff = typeof window !== 'undefined' && !!localStorage.getItem('token');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);
  const staffHref = schoolAwarePath(isStaff ? '/dashboard' : '/login');
  const staffLabel = isStaff ? 'Dashboard' : 'Staff Login';

  return (
    <Bar data-scrolled={scrolled || open}>
      <Inner>
        <Brand href="#home" onClick={close}>
          {brand.mark ? <Logo src={brand.mark} alt="" /> : null}
          <BrandText>
            <strong>{brand.title}</strong>
            {brand.subtitle ? <span>{brand.subtitle}</span> : null}
          </BrandText>
        </Brand>

        <Nav aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              $active={activeId === item.id}
            >
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <Actions>
          <StaffLink to={staffHref}>{staffLabel}</StaffLink>
          <BtnGold href={admissionCta.href}>{admissionCta.label}</BtnGold>
        </Actions>

        <MenuBtn
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </MenuBtn>
      </Inner>

      <Drawer $open={open}>
        {nav.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={close}>
            {item.label}
          </a>
        ))}
        <StaffLink to={staffHref} onClick={close}>
          {staffLabel}
        </StaffLink>
        <DrawerCta href={admissionCta.href} onClick={close}>
          {admissionCta.label}
        </DrawerCta>
      </Drawer>
    </Bar>
  );
};

export default Navbar;
