import React, { useState } from 'react';
import { Property, ElectricityPlan } from '../types';
import { User, Phone, Mail, Home, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  property: Property;
  plan: ElectricityPlan;
  onComplete: () => void;
}

const EnrollmentForm: React.FC<Props> = ({ property, plan, onComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call and leasing office notification
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-2">
          <ShieldCheck size={14} />
          <span>Sync with {property.name} Leasing Office</span>
        </div>
        <h2 className="text-2xl font-bold mb-3">Resident Verification</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          The information below must match your Summit lease. We will automatically notify <strong>{property.name}</strong> management once you enroll to clear your move-in status and avoid non-compliance fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Lease Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-slate-200 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-300"
              placeholder="First Last"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="email"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-slate-200 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-300"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="tel"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-slate-200 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-300"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Unit Number</label>
          <div className="relative">
            <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-slate-200 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-300"
              placeholder="e.g. 102A"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl mb-8 border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-slate-500">Selected Plan</span>
          <span className="text-sm font-bold text-slate-900">{plan.name}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
          <span className="text-sm font-semibold text-slate-500">Office Sync Status</span>
          <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Pending Enrollment
          </span>
        </div>
      </div>

      <button 
        disabled={loading}
        className="w-full py-5 rounded-2xl text-white font-black text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 transform hover:-translate-y-1 active:scale-95"
        style={{ backgroundColor: property.primaryColor }}
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Syncing with Office...</span>
          </>
        ) : (
          <>
            Complete Resident Enrollment
            <ChevronRight size={24} />
          </>
        )}
      </button>

      <div className="mt-8 pt-8 border-t border-slate-100 flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="text-blue-600" size={20} />
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          By clicking complete, you verify you are a resident of {property.name}. GetElectricity will share your account number and enrollment status directly with Summit to verify your compliance with utility setup requirements. This prevents administrative non-compliance fees from being added to your rent account.
        </p>
      </div>
    </form>
  );
};

export default EnrollmentForm;