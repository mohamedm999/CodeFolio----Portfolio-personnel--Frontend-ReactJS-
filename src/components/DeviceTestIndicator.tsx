import React from 'react';
import { useWindowSize, useBreakpoint } from '../hooks';

/**
 * DeviceTestIndicator - Shows current viewport info for testing
 * Remove this component in production or set SHOW_DEVICE_INDICATOR=false
 */

export const DeviceTestIndicator: React.FC = () => {
  const { width, height } = useWindowSize();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // Only show in development
  if (process.env.NODE_ENV === 'production') return null;

  const getDeviceType = () => {
    if (isMobile) return 'Mobile';
    if (isTablet) return 'Tablet';
    if (isDesktop) return 'Desktop';
    return 'Unknown';
  };

  const getBreakpoint = () => {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  };

  return (
    <div 
      className="fixed bottom-4 left-4 z-50 px-3 py-2 rounded-lg backdrop-blur-xl text-xs font-mono"
      style={{
        background: 'rgba(10, 9, 26, 0.9)',
        border: '1px solid rgba(58, 127, 255, 0.3)',
        color: '#F0F0F0'
      }}
    >
      <div style={{ color: '#3A7FFF' }}>
        {getDeviceType()} ({getBreakpoint()})
      </div>
      <div style={{ color: '#5A6B8C' }}>
        {width} × {height}px
      </div>
    </div>
  );
};
