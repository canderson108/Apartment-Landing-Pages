import React from 'react';
import { ElectricityPlan, Property } from '../types';
import { Check, Leaf } from 'lucide-react';

interface Props {
  plan: ElectricityPlan;
  property: Property;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<Props> = ({ plan, property, isSelected, onSelect }) => {
  return (
    <div 
      className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-lg ${
        isSelected ? 'bg-white' : 'bg-slate-50 border-transparent'
      }`}
      style={{ borderColor: isSelected ? property.primaryColor : 'transparent' }}
      onClick={onSelect}
    >
      {isSelected && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
          style={{ backgroundColor: property.primaryColor }}
        >
          Selected
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-slate-500 text-sm">{plan.term}-Month Fixed Rate</p>
        </div>
        {plan.renewable === 100 && (
          <div className="p-2 bg-green-100 text-green-700 rounded-full">
            <Leaf size={18} />
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900">{plan.rate}¢</span>
          <span className="text-slate-500 font-medium">/ kWh</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">*Excludes TDU delivery charges</p>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
            <div className="mt-1 flex-shrink-0">
              <Check size={14} className="text-green-500 stroke-[3]" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        className={`w-full py-3 rounded-xl font-bold transition-colors ${
          isSelected 
            ? 'text-white' 
            : 'bg-white border-2 text-slate-700'
        }`}
        style={{ 
          backgroundColor: isSelected ? property.primaryColor : 'transparent',
          borderColor: isSelected ? 'transparent' : '#e2e8f0'
        }}
      >
        {isSelected ? 'Enroll and Notify Office' : 'Select Plan'}
      </button>
    </div>
  );
};

export default PlanCard;