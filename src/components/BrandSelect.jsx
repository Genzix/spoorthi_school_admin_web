import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import arrowIcon from '@/assets/arrow.svg';

const MOBILE_BREAKPOINT = '768px';
const MENU_GAP = 6;
const MENU_MAX_HEIGHT = 280;

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
  border: 1px solid ${(p) => {
    if (p.$error) return '#ff4444';
    return p.$variant === 'field' ? '#d0d0d0' : '#ffffff';
  }};
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
    border-color: ${(p) => {
      if (p.$error) return '#ff4444';
      return p.$variant === 'field' ? 'var(--color-primary)' : 'var(--color-primary-light)';
    }};
  }

  &:focus-visible {
    border-color: ${(p) => (p.$error ? '#ff4444' : 'var(--color-primary)')};
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => (p.$error ? 'rgba(255, 68, 68, 0.2)' : 'var(--color-primary-soft)')};
  }

  &[aria-expanded='true'] {
    border-color: ${(p) => (p.$error ? '#ff4444' : 'var(--color-primary)')};
    box-shadow: 0 0 0 2px ${(p) => (p.$error ? 'rgba(255, 68, 68, 0.2)' : 'var(--color-primary-soft)')};
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

/** Fixed + portaled so MUI Dialog / overflow parents cannot clip the list. */
const Menu = styled.ul`
  position: fixed;
  top: ${(p) => `${p.$top}px`};
  left: ${(p) => `${p.$left}px`};
  width: ${(p) => `${p.$width}px`};
  max-height: ${(p) => `${p.$maxHeight}px`};
  overflow-y: auto;
  margin: 0;
  padding: 8px;
  list-style: none;
  z-index: 10050;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  overscroll-behavior: contain;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 10px;
    padding: 6px;
  }
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #212529;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid transparent;

  &[data-active='true']:not([data-selected='true']),
  &:hover:not([data-selected='true']):not([aria-disabled='true']) {
    background: var(--color-row-hover);
  }

  &[data-selected='true'] {
    background: var(--color-primary-light);
    border-color: var(--color-primary);
    color: #111111;
    font-weight: 500;
  }

  &[aria-disabled='true'] {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const OptionCheck = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  line-height: 1;
  color: var(--color-primary);
  opacity: ${(p) => (p.$visible ? 1 : 0)};
`;

const computeMenuPosition = (triggerEl) => {
  const rect = triggerEl.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const viewportW = window.innerWidth;
  const spaceBelow = viewportH - rect.bottom - MENU_GAP;
  const spaceAbove = rect.top - MENU_GAP;
  const preferredMax = Math.min(MENU_MAX_HEIGHT, Math.floor(viewportH * 0.5));

  const openUp = spaceBelow < Math.min(preferredMax, 160) && spaceAbove > spaceBelow;
  const available = openUp ? spaceAbove : spaceBelow;
  const maxHeight = Math.max(120, Math.min(preferredMax, available));

  let top = openUp ? rect.top - MENU_GAP - maxHeight : rect.bottom + MENU_GAP;
  // Keep within viewport if flip math undershoots
  top = Math.max(8, Math.min(top, viewportH - maxHeight - 8));

  let left = rect.left;
  const width = Math.max(rect.width, 140);
  if (left + width > viewportW - 8) {
    left = Math.max(8, viewportW - width - 8);
  }

  return { top, left, width, maxHeight, openUp };
};

/**
 * School-aware select — light menu + primary selection (Students-page pattern).
 * Menu is portaled to document.body so dialogs never clip the list.
 */
const BrandSelect = ({
  value = '',
  onChange,
  options = [],
  placeholder = 'Select',
  disabled = false,
  variant = 'toolbar',
  error = false,
  name,
  'aria-label': ariaLabel,
  className,
}) => {
  const listId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [coords, setCoords] = useState(null);

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
    setCoords(null);
  }, []);

  const commit = useCallback(
    (nextValue) => {
      if (disabled) return;
      onChange?.({ target: { value: nextValue, name: name || undefined } });
      close();
    },
    [close, disabled, name, onChange]
  );

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    setCoords(computeMenuPosition(triggerRef.current));
  }, []);

  useLayoutEffect(() => {
    if (!open) return undefined;
    updatePosition();

    const onReposition = () => updatePosition();
    window.addEventListener('resize', onReposition);
    // Capture scroll from dialogs / nested overflow containers
    window.addEventListener('scroll', onReposition, true);
    return () => {
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [open, updatePosition, normalized.length]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      const t = event.target;
      if (rootRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      close();
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

  // Keep highlighted option in view while keyboard-navigating
  useEffect(() => {
    if (!open || activeIndex < 0 || !menuRef.current) return;
    const el = menuRef.current.querySelector(`[data-option-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

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

  const menu =
    open && !disabled && coords
      ? createPortal(
          <Menu
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-label={ariaLabel || placeholder}
            $top={coords.top}
            $left={coords.left}
            $width={coords.width}
            $maxHeight={coords.maxHeight}
          >
            {normalized.map((opt, index) => {
              const isSelected = opt.value === String(value ?? '');
              return (
                <Option
                  key={`${opt.value}-${index}`}
                  role="option"
                  data-option-index={index}
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
                  <span>{opt.label}</span>
                  <OptionCheck $visible={isSelected} aria-hidden="true">✓</OptionCheck>
                </Option>
              );
            })}
          </Menu>,
          document.body
        )
      : null;

  return (
    <Root ref={rootRef} className={className} $variant={variant}>
      <Trigger
        ref={triggerRef}
        type="button"
        $variant={variant}
        $error={error}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error || undefined}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel || placeholder}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <TriggerLabel>{selected?.label || placeholder}</TriggerLabel>
        <Chevron src={arrowIcon} alt="" $open={open} />
      </Trigger>
      {menu}
    </Root>
  );
};

export default BrandSelect;
