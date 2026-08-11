import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { schoolAwarePath } from '@/schools/resolveSchool';

const Fab = styled(Link)`
  position: fixed;
  left: max(1rem, env(safe-area-inset-left));
  bottom: max(1.15rem, env(safe-area-inset-bottom));
  z-index: 61;
  width: 2.65rem;
  height: 2.65rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid color-mix(in srgb, #000 10%, transparent);
  box-shadow: 0 8px 22px rgba(20, 20, 20, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(20, 20, 20, 0.14);
  }

  &:focus-visible {
    outline: 2px solid var(--lp-lime);
    outline-offset: 3px;
  }

  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }

  span {
    font-family: var(--lp-font-display);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--lp-ink);
    font-weight: 600;
  }
`;

const StaffFab = ({ brand }) => {
  const isStaff =
    typeof window !== 'undefined' && !!localStorage.getItem('token');
  const href = schoolAwarePath(isStaff ? '/dashboard' : '/login');
  const label = isStaff ? 'Open dashboard' : 'Staff login';

  return (
    <Fab to={href} aria-label={label} title={label}>
      {brand?.mark ? (
        <img src={brand.mark} alt="" />
      ) : (
        <span>{(brand?.title || 'S').charAt(0)}</span>
      )}
    </Fab>
  );
};

export default StaffFab;
