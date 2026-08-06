import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import arrowIcon from '@/assets/arrow.svg';

const MOBILE_BREAKPOINT = '768px';

const Root = styled.div`
  position: relative;
  width: ${(p) => (p.$variant === 'field' ? '100%' : 'fit-content')};
  min-width: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6vw;
  padding: ${(p) => (p.$variant === 'field' ? '0.6vw' : '10px 2vw 10px 1.2vw')};
  height: ${(p) => (p.$variant === 'field' ? 'auto' : '5.5vh')};
  min-height: ${(p) => (p.$variant === 'field' ? '2.8vw' : '5.5vh')};
  min-width: ${(p) => (p.$variant === 'field' ? '0' : '8vw')};
  width: 100%;
  border-radius: ${(p) => (p.$variant === 'field' ? '0.6vw' : '5vw')};
  border: 1px solid #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: ${(p) => (p.$variant === 'field' ? '0.7px' : 'normal')};
  background-color: #ffffff;
  color: #111111;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, opacity 0.2s;
  box-sizing: border-box;
  text-align: left;
  appearance: none;

  &:hover:not(:disabled) {
    border-color: var(--color-primary-light);
  }

  &:focus-visible {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  &[aria-expanded='true'] {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: ${(p) => (p.$variant === 'field' ? 'auto' : '44px')};
    min-height: 44px;
    min-width: 0;
    padding: ${(p) => (p.$variant === 'field' ? '0.65rem 0.85rem' : '10px 36px 10px 14px')};
    border-radius: ${(p) => (p.$variant === 'field' ? '0.75rem' : '10px')};
    font-size: ${(p) => (p.$variant === 'field' ? '15px' : '14px')};
  }
`;

const TriggerLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Chevron = styled.img`
  width: auto;
  height: 1vh;
  flex-shrink: 0;
  pointer-events: none;
  transition: transform 0.2s ease;
  transform: ${(p) => (p.$open ? 'rotate(180deg)' : 'rotate(0deg)')};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    position: absolute;
    right: 14px;
    height: 10px;
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  min-width: 100%;
  max-height: min(280px, 50vh);
  overflow-y: auto;
  margin: 0;
  padding: 6px;
  list-style: none;
  z-index: 1200;
  border-radius: 12px;
  background: #2b2b2b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    left: 0;
    right: 0;
    border-radius: 10px;
  }
`;

const Option = styled.li`
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  color: #f5f5f5;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-active='true'],
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &[data-selected='true'] {
    background: var(--color-primary);
    color: var(--color-on-primary, #111111);
    font-weight: 500;
  }

  &[aria-disabled='true'] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    padding: 12px 14px;
  }
`;

/**
 * School-aware select — selected option uses brand primary (Spoorthi amber /
 * GenCampus blue / future schools). Native <select> cannot theme the open list.
 *
 * @param {{
 *   value: string,
 *   onChange: (event: { target: { value: string } }) => void,
 *   options: Array<{ value: string, label: string, disabled?: boolean }>,
 *   placeholder?: string,
 *   disabled?: boolean,
 *   variant?: 'toolbar' | 'field',
 *   'aria-label'?: string,
 *   className?: string,
 * }} props
 */
const BrandSelect = ({
  value = '',
  onChange,
  options = [],
  placeholder = 'Select',
  disabled = false,
  variant = 'toolbar',
  'aria-label': ariaLabel,
  className,
}) => {
  const listId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalized = useMemo(
    () =>
      options.map((opt) => ({
        value: String(opt.value ?? ''),
        label: String(opt.label ?? opt.value ?? ''),
        disabled: Boolean(opt.disabled),
      })),
    [options]
  );

  const selected = useMemo(
    () => normalized.find((opt) => opt.value === String(value ?? '')) || null,
    [normalized, value]
  );

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const commit = useCallback(
    (nextValue) => {
      if (disabled) return;
      onChange?.({ target: { value: nextValue } });
      close();
    },
    [close, disabled, onChange]
  );

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    const idx = normalized.findIndex((opt) => opt.value === String(value ?? ''));
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, normalized, value]);

  const moveActive = (delta) => {
    if (!normalized.length) return;
    let next = activeIndex;
    for (let i = 0; i < normalized.length; i += 1) {
      next = (next + delta + normalized.length) % normalized.length;
      if (!normalized[next]?.disabled) {
        setActiveIndex(next);
        return;
      }
    }
  };

  const onTriggerKeyDown = (event) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) setOpen(true);
        else moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!open) setOpen(true);
        else moveActive(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open) setOpen(true);
        else if (activeIndex >= 0 && !normalized[activeIndex]?.disabled) {
          commit(normalized[activeIndex].value);
        }
        break;
      case 'Escape':
        if (open) {
          event.preventDefault();
          close();
        }
        break;
      default:
        break;
    }
  };

  return (
    <Root ref={rootRef} className={className} $variant={variant}>
      <Trigger
        type="button"
        $variant={variant}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel || placeholder}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <TriggerLabel>{selected?.label || placeholder}</TriggerLabel>
        <Chevron src={arrowIcon} alt="" $open={open} />
      </Trigger>

      {open && !disabled && (
        <Menu id={listId} role="listbox" aria-label={ariaLabel || placeholder}>
          {normalized.map((opt, index) => {
            const isSelected = opt.value === String(value ?? '');
            return (
              <Option
                key={`${opt.value}-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                data-selected={isSelected}
                data-active={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  if (opt.disabled) return;
                  commit(opt.value);
                }}
              >
                {opt.label}
              </Option>
            );
          })}
        </Menu>
      )}
    </Root>
  );
};

export default BrandSelect;
