import React from 'react';
import { Property } from '../types';
import { ShieldCheck, Zap } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          className="flex items-center gap-4 text-left outline-none transition-transform active:scale-95" 
          onClick={onReset}
          aria-label="Return to Community Search"
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: property.primaryColor }}
          >
            <ShieldCheck size={24} aria-hidden="true" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-lg leading-tight text-[#1a2a44] serif tracking-tight uppercase">{property.name}</h1>
            <p className="text-[9px] text-gray-400 font-black tracking-[0.2em] uppercase">Resident Portal</p>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8 pl-8 border-l border-gray-100 h-10">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] mb-0.5 text-right">Utility Partner</span>
            <div className="flex items-center gap-1.5 text-[#1a2a44] font-black text-xs">
              <Zap size={12} className="text-[#c5a059]" fill="currentColor" />
              <span className="tracking-tighter serif italic">GetElectricity</span>
            </div>
          </div>
          <div className="w-px h-6 bg-gray-100"></div>
          <div className="flex flex-col items-start">
             <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] mb-0.5">Management</span>
             <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Summit</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PropertyHeader;