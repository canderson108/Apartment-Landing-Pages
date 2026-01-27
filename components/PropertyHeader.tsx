import React from 'react';
import { Property } from '../types';
import { SummitMountainLogo } from './Logos';

interface Props {
  property: Property;
  onReset: () => void;
}

const PropertyHeader: React.FC<Props> = ({ property, onReset }) => {
  return (
    <header 
      className="sticky top-0 z-50 w-full bg-white border-b shadow-md transition-all duration-500"
      style={{ borderTop: `4px solid ${property.accentColor || '#c5a059'}` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <button 
          className="flex items-center gap-4 text-left outline-none transition-transform active:scale-95 group" 
          onClick={onReset}
          aria-label="Return to Community Search"
        >
          <div className="flex flex-col items-center">
             <svg viewBox="0 0 100 80" className="w-10 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="60" y1="5" x2="90" y2="35" stroke="#31686b" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
                <line x1="50" y1="5" x2="90" y2="45" stroke="#31686b" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
                <line x1="40" y1="5" x2="90" y2="55" stroke="#31686b" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
                <line x1="30" y1="5" x2="90" y2="65" stroke="#31686b" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
                <line x1="20" y1="5" x2="90" y2="75" stroke="#31686b" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-[7px] font-black uppercase tracking-tighter text-[#31686b]">Summit</span>
                <span className="text-[5px] font-medium uppercase tracking-[0.2em] text-[#31686b]/70">Management</span>
              </div>
          </div>
          <div>
            <h1 className="font-black text-xl leading-none text-[#1a2a44] serif tracking-tight uppercase">{property.name}</h1>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase mt-1">Resident Portal</p>
          </div>
        </button>

        <div className="hidden md:flex items-center">
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1">Management</span>
             <span className="text-xs font-black text-[#31686b] uppercase tracking-widest">{property.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PropertyHeader;