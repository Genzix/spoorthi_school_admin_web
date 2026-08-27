import React from 'react';
import styled, { keyframes } from 'styled-components';

/** Warm art palette — tuned to reference */
export const ART = Object.freeze({
  cream: '#FAF9F6',
  creamDeep: '#F3EDE4',
  peach: '#FDE9DE',
  peachMid: '#F8D8C5',
  peachLight: '#FAD4C0',
  salmon: '#FBCDB9',
  coral: '#E07A5A',
  terracotta: '#C45C3E',
  ink: '#3E2C23',
  inkSoft: '#5C4336',
  accent: '#C44D4D',
  white: '#FFFFFF',
});

const drift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(8px, -10px) scale(1.02); }
`;

const floatSoft = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const SvgRoot = styled.svg`
  position: absolute;
  pointer-events: none;
  overflow: visible;
`;

export const ArtClipDefs = () => (
  <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
    <defs>
      <clipPath id="art-about-blob" clipPathUnits="objectBoundingBox">
        <path d="M0.15,0.05 C0.35,-0.02 0.58,0.04 0.78,0.18 C0.98,0.32 1.02,0.58 0.94,0.78 C0.86,0.98 0.62,1.02 0.4,0.96 C0.18,0.9 0.02,0.72 0.0,0.5 C-0.02,0.28 0.05,0.12 0.15,0.05 Z" />
      </clipPath>
    </defs>
  </svg>
);

const StageBlobSvg = styled.svg`
  position: absolute;
  pointer-events: none;
  overflow: visible;
`;

const DriftingBlob = styled(StageBlobSvg)`
  animation: ${drift} 16s ease-in-out infinite;
`;

/** Organic SVG blobs scoped to the hero image stage */
export const HeroStageBlobs = () => (
  <>
    <StageBlobSvg
      viewBox="0 0 600 600"
      style={{
        width: '118%',
        height: '118%',
        left: '-22%',
        top: '-8%',
        zIndex: 0,
      }}
      aria-hidden
    >
      <path
        fill={ART.peach}
        d="M80,120 C40,220 60,380 180,460 C300,540 480,500 540,380 C600,260 560,120 440,70 C320,20 140,40 80,120 Z"
      />
    </StageBlobSvg>
    <StageBlobSvg
      viewBox="0 0 500 500"
      style={{
        width: '95%',
        height: '95%',
        right: '-18%',
        top: '6%',
        zIndex: 0,
      }}
      aria-hidden
    >
      <path
        fill={ART.salmon}
        d="M60,80 C120,20 280,10 380,90 C480,170 460,340 340,420 C220,500 80,440 40,300 C0,160 20,120 60,80 Z"
      />
    </StageBlobSvg>
    <DriftingBlob
      viewBox="0 0 400 300"
      style={{
        width: '70%',
        height: '55%',
        left: '-10%',
        bottom: '-5%',
        zIndex: 0,
      }}
      aria-hidden
    >
      <path
        fill={ART.peachMid}
        opacity="0.7"
        d="M30,60 C80,10 200,0 280,50 C360,100 340,200 260,250 C180,300 60,260 30,180 C0,100 10,80 30,60 Z"
      />
    </DriftingBlob>
  </>
);

const WaveSvg = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: clamp(4.5rem, 12vw, 8.5rem);
  z-index: 4;
  display: block;
  pointer-events: none;
`;

export const WaveDivider = ({ fill = ART.white }) => (
  <WaveSvg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
    <path
      fill={fill}
      d="M0,64 C180,110 360,20 540,52 C720,84 900,8 1080,40 C1260,72 1350,96 1440,88 L1440,120 L0,120 Z"
    />
  </WaveSvg>
);

const Deco = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 3;
  color: ${(p) => p.$color || ART.accent};
  opacity: ${(p) => p.$opacity ?? 0.75};
  animation: ${floatSoft} ${(p) => p.$duration ?? 5.5}s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay ?? 0}s;
`;

export const FlowerAccent = ({ style, color, size = 48 }) => (
  <Deco style={style} $color={color} $delay={0.3} $duration={5.5}>
    <SvgRoot width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.9" />
      <ellipse cx="24" cy="12" rx="6" ry="10" fill="currentColor" opacity="0.55" />
      <ellipse cx="24" cy="36" rx="6" ry="10" fill="currentColor" opacity="0.55" />
      <ellipse cx="12" cy="24" rx="10" ry="6" fill="currentColor" opacity="0.55" />
      <ellipse cx="36" cy="24" rx="10" ry="6" fill="currentColor" opacity="0.55" />
    </SvgRoot>
  </Deco>
);

export const StarAccent = ({ style, color, size = 20 }) => (
  <Deco style={style} $color={color} $delay={0.8} $duration={4.5}>
    <SvgRoot width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.8 9.2 L21 9.2 L15.1 13.6 L17.2 20.8 L12 16.4 L6.8 20.8 L8.9 13.6 L3 9.2 L10.2 9.2 Z" />
    </SvgRoot>
  </Deco>
);

export const HeartAccent = ({ style, color, size = 18 }) => (
  <Deco style={style} $color={color} $opacity={0.6} $delay={1.2} $duration={5}>
    <SvgRoot width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21 C12 21 3 14.5 3 8.5 C3 5.5 5.5 3 8.5 3 C10.2 3 11.8 3.8 12 5.2 C12.2 3.8 13.8 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14.5 12 21 12 21 Z" />
    </SvgRoot>
  </Deco>
);

export const LeafAccent = ({ style, color, size = 32 }) => (
  <Deco style={style} $color={color} $opacity={0.5} $delay={0.5} $duration={6}>
    <SvgRoot width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 C24 8 28 18 16 30 C4 18 8 8 16 2 Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path d="M16 6 L16 26" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </SvgRoot>
  </Deco>
);

export const ScriptUnderline = styled.svg`
  display: block;
  width: 100%;
  height: 8px;
  margin-top: 2px;
  color: ${ART.coral};
`;
