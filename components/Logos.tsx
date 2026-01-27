import React from 'react';

export const SummitMountainLogo: React.FC<{ className?: string; color?: string }> = ({ className, color = '#31686b' }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Refined diagonal lines forming the actual Summit logo shape */}
    <path d="M50 10 L85 45" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.4" />
    <path d="M40 10 L85 55" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M30 10 L85 65" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <path d="M20 10 L85 75" stroke={color} strokeWidth="6" strokeLinecap="round" />
    <path d="M10 10 L85 85" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
  </svg>
);

export const GetElectricityLogo: React.FC<{ className?: string; color?: string }> = ({ className, color = '#c5a059' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
    <span className="text-[#1a2a44] font-black italic serif text-lg tracking-tighter">GetElectricity</span>
  </div>
);

export const SummitFullLogo: React.FC<{ className?: string; color?: string }> = ({ className, color = '#31686b' }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className="relative w-16 h-12 mb-2">
      {/* Mountain Icon centered above text */}
      <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="60" y1="5" x2="90" y2="35" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.3" />
        <line x1="50" y1="5" x2="90" y2="45" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        <line x1="40" y1="5" x2="90" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        <line x1="30" y1="5" x2="90" y2="65" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
        <line x1="20" y1="5" x2="90" y2="75" stroke={color} strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col items-center leading-none text-center">
      <span className="font-black text-sm tracking-widest uppercase mb-0.5" style={{ color }}>Summit</span>
      <span className="font-black text-sm tracking-widest uppercase mb-1" style={{ color }}>Property</span>
      <span className="font-medium text-[8px] tracking-[0.4em] uppercase opacity-70" style={{ color }}>Management</span>
    </div>
  </div>
);
