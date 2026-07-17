import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

const RichTooltip = muiStyled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    padding: '8px 10px',
    borderRadius: 10,
    maxWidth: 240,
    boxShadow: '0 10px 28px rgba(15, 23, 42, 0.28)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#1f2937',
  },
}));

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
`;

const TooltipTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.3;
`;

const TooltipDescription = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #d1d5db;
  line-height: 1.35;
`;

const TriggerWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(Boolean(media.matches));
    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
};

const useIsCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const media = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(Boolean(media.matches));
    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return coarse;
};

/**
 * Accessible rich tooltip for circular toolbar icon actions.
 * Supports delayed hover/focus, touch long-press, disabled reasons, and reduced motion.
 */
const ActionIconTooltip = ({
  label,
  description,
  placement = 'bottom',
  disabled = false,
  disabledReason,
  enterDelay = 280,
  leaveDelay = 80,
  children,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const [open, setOpen] = useState(false);

  const tooltipTitle = useMemo(() => {
    const heading = disabled
      ? (disabledReason || `${label} (unavailable)`)
      : label;

    return (
      <TooltipBody>
        <TooltipTitle>{heading}</TooltipTitle>
        {!disabled && description ? (
          <TooltipDescription>{description}</TooltipDescription>
        ) : null}
      </TooltipBody>
    );
  }, [description, disabled, disabledReason, label]);

  const resolvedEnterDelay = prefersReducedMotion
    ? 0
    : isCoarsePointer
      ? Math.max(enterDelay, 600)
      : enterDelay;

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <RichTooltip
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      title={tooltipTitle}
      arrow
      placement={placement}
      enterDelay={resolvedEnterDelay}
      leaveDelay={leaveDelay}
      enterTouchDelay={isCoarsePointer ? 550 : 700}
      leaveTouchDelay={1200}
      describeChild
      slotProps={{
        popper: {
          modifiers: [
            { name: 'offset', options: { offset: [0, 10] } },
            {
              name: 'preventOverflow',
              options: { padding: 8, boundary: 'viewport' },
            },
            { name: 'flip', options: { fallbackPlacements: ['top', 'bottom', 'left', 'right'] } },
          ],
        },
      }}
    >
      <TriggerWrap>{children}</TriggerWrap>
    </RichTooltip>
  );
};

export default ActionIconTooltip;
