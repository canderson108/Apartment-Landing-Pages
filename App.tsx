import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Property, ElectricityPlan, EnrollmentStep } from './types';
import { SUMMIT_PROPERTIES, PLANS } from './constants';
import PropertyHeader from './components/PropertyHeader';
import PlanCard from './components/PlanCard';
import EnrollmentForm from './components/EnrollmentForm';
import ResidentInsights from './components/ResidentInsights';
import { SummitFullLogo, GetElectricityLogo } from './components/Logos';
import { 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  Search,
  Zap,
  Home,
  Lock,
  MapPin,
  Scale,
  Eye,
  X,
  Check,
  FileText,
  AlertTriangle,
  Scale as ScaleIcon,
  Gavel,
  Building2,
  Users,
  Send
} from 'lucide-react';
import { analyzeUtilityBill } from './services/geminiService';

const PartnerNetworkModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#1a2a44]/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-3xl overflow-hidden relative z-10 p-8 md:p-12 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <button onClick={onClose} className="absolute top-8 right-8 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100">
          <X size={20} className="text-[#1a2a44]" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-3 text-[#c5a059] font-black text-[11px] uppercase tracking-widest mb-6">
              <Building2 size={18} />
              <span>Expansion Opportunities</span>
            </div>
            <h2 className="text-4xl font-black serif text-[#1a2a44] mb-4 uppercase tracking-tight">Partner with Us.</h2>
            <p className="text-gray-500 text-lg font-light mb-10 leading-relaxed">
              Join the network providing seamless utility experiences to over 5,000,000+ residents across the US.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required placeholder="Contact Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#c5a059] outline-none transition-all" />
                <input required placeholder="Company Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#c5a059] outline-none transition-all" />
              </div>
              <input required type="email" placeholder="Professional Email" className="w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#c5a059] outline-none transition-all" />
              <select className="w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#c5a059] outline-none transition-all text-gray-400">
                <option value="">Interest Level</option>
                <option value="property-management">Property Management Group</option>
                <option value="vendor">Vendor Partnership</option>
                <option value="investor">Institutional Investor</option>
              </select>
              <textarea placeholder="Tell us about your portfolio..." rows={4} className="w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#c5a059] outline-none transition-all resize-none" />
              
              <button disabled={loading} className="w-full py-5 rounded-xl bg-[#1a2a44] text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-xl transition-all">
                {loading ? "Processing..." : (
                  <>
                    Submit Partnership Inquiry
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black serif text-[#1a2a44] mb-4">Inquiry Received</h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              A partnership director from Summit's strategic utility team will contact you within 48 business hours.
            </p>
            <button onClick={onClose} className="px-10 py-4 bg-[#1a2a44] text-white rounded-xl font-bold">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

const QuickViewModal: React.FC<{ property: Property; onClose: () => void; onSelect: () => void }> = ({ property, onClose, onSelect }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#1a2a44]/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-3xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group"
        >
          <X size={20} className="text-[#1a2a44] group-hover:rotate-90 transition-transform" />
        </button>

        <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img src={property.image} alt={property.name} className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={14} />
              Summit Managed Community
            </div>
            <h2 className="text-4xl font-black serif text-[#1a2a44] mb-3 leading-tight">{property.name}</h2>
            <div className="flex items-start gap-2 text-gray-400">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <p className="text-sm font-medium leading-relaxed">{property.address}</p>
            </div>
          </div>

          <div className="flex-grow">
            <p className="text-gray-500 leading-relaxed mb-8 italic font-light text-lg">
              "{property.description || 'Experience luxury living redefined with premium finishes and unmatched resident services.'}"
            </p>

            <div className="mb-10">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1a2a44] mb-6 border-b border-gray-100 pb-2">Community Amenities</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {(property.amenities || ['Resort Pool', 'Fitness Center', 'Private Patios', 'Pet Park']).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-emerald-500" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 mt-auto">
            <button 
              onClick={() => {
                onSelect();
                onClose();
              }}
              className="w-full py-5 rounded-xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              style={{ backgroundColor: property.primaryColor }}
            >
              Enroll in Electricity
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogModal: React.FC<{ type: 'faq' | 'transfer' | 'rights' | 'terms' | 'privacy'; onClose: () => void }> = ({ type, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#1a2a44]/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-3xl overflow-hidden relative z-10 p-8 md:p-16 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-[#1a2a44]" />
        </button>

        {type === 'faq' && (
          <article className="prose prose-stone max-w-none">
            <div className="flex items-center gap-3 text-[#c5a059] font-black text-[11px] uppercase tracking-widest mb-6">
              <FileText size={18} />
              <span>Resident Support Center</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black serif text-[#1a2a44] mb-8 leading-tight uppercase tracking-tight">
              Navigating Your <br/> Utility Move-In.
            </h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
              <p>
                Moving into a new apartment is a whirlwind of logistics, from packing boxes to signing leases. One of the most overlooked hurdles is the "Utility Compliance" requirement. Traditionally, residents had to spend hours researching providers, calling customer service lines, and manually emailing proof of service to their leasing office to avoid hefty administrative fines. This process is prone to error and unnecessary stress.
              </p>
              <div className="p-8 bg-[#f8f9fa] rounded-2xl border-l-[4px] border-[#c5a059] my-10">
                <p className="font-medium text-[#1a2a44] text-xl italic mb-2 serif">The Direct Sync Advantage</p>
                <p className="text-base">We notify your property manager automatically. No emails, no phone calls, no compliance fees.</p>
              </div>
              <p>
                This is where the GetElectricity and Summit partnership changes the game. By choosing a plan through our verified resident portal, the entire move-in process is automated. The moment you enroll, our system initiates a "Direct Sync" with your property manager.
              </p>
              <p>
                We communicate your account information and start date directly to the leasing office, clearing your compliance status instantly. You don't just get power; you get peace of mind knowing that you won't be surprised by "Utility Non-Compliance" fees on your first month's rent. Our platform ensures that your lights are on and your office is notified, allowing you to focus on what matters most: settling into your beautiful new home.
              </p>
            </div>
          </article>
        )}

        {type === 'transfer' && (
          <article className="prose prose-stone max-w-none">
            <div className="flex items-center gap-3 text-red-500 font-black text-[11px] uppercase tracking-widest mb-6">
              <AlertTriangle size={18} />
              <span>Consumer Savings Alert</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black serif text-[#1a2a44] mb-8 leading-tight uppercase tracking-tight">
              The Costly Mistake <br/> of Service Transfers.
            </h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
              <p>
                When you notify your current Retail Electric Provider (REP) that you are moving, their first instinct is to "transfer" your service to your new address. While they frame this as a convenience, it is often a hidden financial trap for residents. Most existing contracts are based on standard retail rates that don't account for the exclusive bulk-discounting available to Summit Property Management communities.
              </p>
              <div className="p-8 bg-red-50 rounded-2xl border-l-[4px] border-red-500 my-10">
                <p className="font-medium text-red-900 text-xl italic mb-2 serif">Why It Costs You More</p>
                <p className="text-base text-red-700">Legacy rates are often 15-20% higher than the bulk partnership rates negotiated specifically for Summit properties.</p>
              </div>
              <p>
                By "transferring," you are carrying over a legacy rate that is significantly higher than the partnership rates we’ve negotiated specifically for this building. Furthermore, many REPs use the move as an opportunity to lock you into another long-term contract at their current market price, which lacks the resident-exclusive benefits of our portal.
              </p>
              <p>
                In Texas, you have the legal right to cancel your current contract without penalty when you move (a "Move-Out" event). Choosing to start a new, verified account through GetElectricity allows you to tap into "Preferred Resident" pricing. These rates are specifically designed for the high efficiency and density of our communities. Don't pay for the convenience of a transfer—save money by choosing a plan built for your new home.
              </p>
            </div>
          </article>
        )}

        {type === 'rights' && (
          <article className="prose prose-stone max-w-none">
            <div className="flex items-center gap-3 text-emerald-600 font-black text-[11px] uppercase tracking-widest mb-6">
              <Gavel size={18} />
              <span>Consumer Protection Guide</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black serif text-[#1a2a44] mb-8 leading-tight uppercase tracking-tight">
              Your Rights as a <br/> Texas Electricity Consumer.
            </h2>
            <div className="space-y-8 text-gray-500 text-lg leading-relaxed font-light">
              <section>
                <h4 className="text-xl font-black text-[#1a2a44] serif italic mb-4">The PUCT Framework</h4>
                <p>
                  As a resident in a deregulated area of Texas, your electricity rights are governed by the <strong>Public Utility Commission of Texas (PUCT)</strong> under the <em>Customer Protection Rules (Subchapter R of Chapter 25)</em>. These regulations are designed to ensure transparency, fairness, and safety for all residents.
                </p>
              </section>
              <p>
                Every resident has the fundamental right to choose their Retail Electric Provider (REP). Under <strong>PUCT Rule §25.475</strong>, providers must disclose all terms of service. Furthermore, one of the most powerful protections for tenants is the <strong>Move-Out Provision</strong>. If you are moving to a new residence, you have the legal right to terminate your current contract without paying an early termination fee.
              </p>
              <p>
                Safety is a priority in the PUCT framework. Providers are prohibited from disconnecting service during an "Extreme Weather Emergency," as defined by the National Weather Service. Additionally, <strong>Rule §25.483</strong> provides critical protections for "Chronic Condition" or "Illness" residents.
              </p>
            </div>
          </article>
        )}

        {type === 'terms' && (
          <article className="prose prose-stone max-w-none">
            <div className="flex items-center gap-3 text-gray-400 font-black text-[11px] uppercase tracking-widest mb-6">
              <ScaleIcon size={18} />
              <span>Legal Framework</span>
            </div>
            <h2 className="text-4xl font-black serif text-[#1a2a44] mb-8 uppercase tracking-tight">Terms of Service.</h2>
            <div className="space-y-6 text-gray-500 text-base leading-relaxed">
              <p>By accessing this resident portal, you agree to the following conditions regarding utility management and lease compliance synchronization.</p>
              <h4 className="font-bold text-[#1a2a44]">1. Resident Eligibility</h4>
              <p>The exclusive rates provided through this platform are reserved solely for residents with valid, active lease agreements within properties managed by Summit Property Management. Misrepresentation of resident status may result in account termination and administrative fees.</p>
              <h4 className="font-bold text-[#1a2a44]">2. Automated Verification</h4>
              <p>You authorize GetElectricity to communicate your account number, enrollment date, and service status directly to your property's leasing office. This sync is intended to fulfill your lease requirement for utility setup and prevent non-compliance penalties.</p>
              <h4 className="font-bold text-[#1a2a44]">3. Rate Structures</h4>
              <p>All electricity rates are fixed for the duration of the term selected. Rates exclude TDU (Transmission and Distribution Utility) delivery charges which are passed through at cost without markup as regulated by the PUCT.</p>
            </div>
          </article>
        )}

        {type === 'privacy' && (
          <article className="prose prose-stone max-w-none">
            <div className="flex items-center gap-3 text-gray-400 font-black text-[11px] uppercase tracking-widest mb-6">
              <Lock size={18} />
              <span>Data Protection</span>
            </div>
            <h2 className="text-4xl font-black serif text-[#1a2a44] mb-8 uppercase tracking-tight">Privacy Policy.</h2>
            <div className="space-y-6 text-gray-500 text-base leading-relaxed">
              <p>Your privacy is central to our partnership with Summit. This policy outlines how we handle your residential and energy data.</p>
              <h4 className="font-bold text-[#1a2a44]">1. Information Collection</h4>
              <p>We collect your name, unit number, email, and usage data only to facilitate your energy enrollment and verify compliance with your landlord. We do not sell your personal data to third-party marketers.</p>
              <h4 className="font-bold text-[#1a2a44]">2. Partnership Data Sharing</h4>
              <p>Specifically, we share your "Active" status and account verification details with Summit Property Management to automate your move-in logistics. This is a secure, encrypted data bridge designed for resident convenience.</p>
              <h4 className="font-bold text-[#1a2a44]">3. Usage Insights</h4>
              <p>Usage data collected via bill analysis is used only to generate the savings predictions shown on this platform and is not stored permanently unless you complete an enrollment.</p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const availableProperties = useMemo(() => 
    SUMMIT_PROPERTIES.filter(p => p.image && p.image.trim() !== ''),
    []
  );

  const [property, setProperty] = useState<Property | null>(null);
  const [step, setStep] = useState<EnrollmentStep>('property-select');
  const [selectedPlan, setSelectedPlan] = useState<ElectricityPlan | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unitQuery, setUnitQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [unitError, setUnitError] = useState<string | null>(null);
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [activeBlog, setActiveBlog] = useState<'faq' | 'transfer' | 'rights' | 'terms' | 'privacy' | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  
  const [suggestions, setSuggestions] = useState<Property[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const unitInputRef = useRef<HTMLInputElement>(null);

  const activePrimary = property?.primaryColor || '#1a2a44';
  const activeAccent = property?.accentColor || '#c5a059';

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const parts = hash.split('/');
      const slugIndex = parts.indexOf('apartments') + 1;
      const slug = parts[slugIndex];
      
      if (slug) {
        const match = availableProperties.find(p => p.slug === slug);
        if (match) {
          setProperty(match);
          setStep('plan-select');
          return;
        }
      }
      
      if (!hash || hash === '') {
        resetAll();
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [availableProperties]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1 && !property) {
      const filtered = availableProperties.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  }, [searchQuery, property, availableProperties]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, property]);

  const handleSelectSuggestion = (p: Property) => {
    setSearchQuery(p.name);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    setSearchError(null);
    setTimeout(() => unitInputRef.current?.focus(), 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setUnitError(null);
    setShowSuggestions(false);
    
    const trimmedSearch = searchQuery.trim();
    const trimmedUnit = unitQuery.trim();

    let hasValidationError = false;
    
    if (!trimmedSearch) {
      setSearchError("Property name is required.");
      hasValidationError = true;
    }
    
    if (!trimmedUnit) {
      setUnitError("Unit number is required.");
      hasValidationError = true;
    }

    if (hasValidationError) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const match = availableProperties.find(p => 
        p.name.toLowerCase() === trimmedSearch.toLowerCase() || 
        p.name.toLowerCase().includes(trimmedSearch.toLowerCase()) || 
        p.address.toLowerCase().includes(trimmedSearch.toLowerCase())
      );
      
      if (match) {
        setProperty(match);
        setIsSearching(false);
        setStep('plan-select');
        window.location.hash = `/electricity/apartments/${match.slug}/${match.cityStateSlug}`;
      } else {
        setSearchError("Community not found. Use verified Summit address.");
        setIsSearching(false);
      }
    }, 800);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const result = await analyzeUtilityBill(base64String);
        setAnalysis(result);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAll = () => {
    setProperty(null);
    setStep('property-select');
    setSelectedPlan(null);
    setAnalysis(null);
    setSearchQuery('');
    setUnitQuery('');
    setSearchError(null);
    setUnitError(null);
    window.location.hash = '';
  };

  const TopLine = () => (
    <div 
      className="w-full py-2 px-4 text-center transition-colors duration-500"
      style={{ backgroundColor: activePrimary }}
    >
      <p 
        className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500"
        style={{ color: activeAccent }}
      >
        Official Resident Portal • Powered by Summit Property Management
      </p>
    </div>
  );

  const selectProperty = (p: Property) => {
    setProperty(p);
    setStep('plan-select');
    window.location.hash = `/electricity/apartments/${p.slug}/${p.cityStateSlug}`;
  };

  if (step === 'confirmation' && property) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
        <TopLine />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-12 rounded-xl shadow-xl max-w-lg w-full border border-gray-100" role="status">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={48} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-black mb-4 serif text-[#1a2a44]">Lease Verified</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your enrollment for <strong>{property.name}</strong>, Unit {unitQuery.trim()} is active. We have sent your confirmation directly to the leasing office.
            </p>
            <div className="space-y-4">
              <button onClick={resetAll} className="w-full py-4 rounded-lg bg-[#1a2a44] text-white font-bold hover:bg-[#0f1a2e] transition-all">
                Return to Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fa]">
      <TopLine />
      {property && <PropertyHeader property={property} onReset={resetAll} />}

      <main className="flex-grow">
        {step === 'property-select' && (
          <div className="relative">
            {quickViewProperty && (
              <QuickViewModal 
                property={quickViewProperty} 
                onClose={() => setQuickViewProperty(null)} 
                onSelect={() => selectProperty(quickViewProperty)}
              />
            )}

            {activeBlog && (
              <BlogModal type={activeBlog} onClose={() => setActiveBlog(null)} />
            )}

            {isPartnerModalOpen && (
              <PartnerNetworkModal onClose={() => setIsPartnerModalOpen(false)} />
            )}

            <div 
              className="text-white pt-24 pb-48 px-6 relative overflow-hidden transition-colors duration-500"
              style={{ backgroundColor: activePrimary }}
            >
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/20 to-transparent"></div>
               </div>

              <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-[11px] font-black mb-10 uppercase tracking-[0.2em]">
                  <Lock size={12} style={{ color: activeAccent }} />
                  <span>Verified Resident Portal • Partnership with Summit</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 serif tracking-tight leading-none max-w-5xl mx-auto">
                  Electricity enrollment <br/><span className="italic" style={{ color: activeAccent }}>for your new home.</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-light">
                  Avoid move-in fees and secure discounted resident rates. We notify your leasing office the moment you enroll.
                </p>

                <div className="max-w-4xl mx-auto" ref={suggestionRef}>
                  <div className="relative z-50">
                    <form 
                      onSubmit={handleSearch} 
                      className="flex flex-col md:flex-row items-stretch gap-0 bg-white p-2 rounded-2xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] relative z-30 overflow-hidden"
                    >
                      <div className="flex-grow flex flex-col items-start px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100" role="combobox" aria-expanded={showSuggestions} aria-haspopup="listbox" aria-owns="property-suggestions-listbox">
                        <div className="flex items-center w-full">
                          <Search className="text-gray-400 mr-5 flex-shrink-0" size={24} />
                          <input 
                            type="text"
                            autoComplete="off"
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              if (searchError) setSearchError(null);
                            }}
                            onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                            onKeyDown={handleKeyDown}
                            aria-autocomplete="list"
                            aria-controls="property-suggestions-listbox"
                            aria-activedescendant={activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : undefined}
                            placeholder="Search Property Name or Address..."
                            className="w-full py-2 text-[#1a2a44] text-xl font-medium outline-none placeholder:text-gray-300 bg-transparent"
                          />
                        </div>
                        {searchError && (
                          <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-1 ml-11 animate-in fade-in slide-in-from-left-1">
                            {searchError}
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-44 flex flex-col items-start px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100">
                        <div className="flex items-center w-full">
                          <Home className="text-gray-400 mr-5 flex-shrink-0" size={24} />
                          <input 
                            ref={unitInputRef}
                            type="text"
                            value={unitQuery}
                            onChange={(e) => {
                              setUnitQuery(e.target.value);
                              if (unitError) setUnitError(null);
                            }}
                            placeholder="Unit #"
                            className="w-full py-2 text-[#1a2a44] text-xl font-medium outline-none placeholder:text-gray-300 bg-transparent"
                          />
                        </div>
                        {unitError && (
                          <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-1 ml-11 animate-in fade-in slide-in-from-left-1">
                            {unitError}
                          </p>
                        )}
                      </div>
                      <button 
                        disabled={isSearching}
                        className="w-full md:w-auto px-12 py-5 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                        style={{ backgroundColor: activePrimary }}
                      >
                        {isSearching ? '...' : 'Enroll Now'}
                      </button>
                    </form>

                    {showSuggestions && (
                      <div 
                        id="property-suggestions-listbox"
                        role="listbox"
                        className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-3xl border border-gray-100 overflow-hidden z-[100] text-left animate-in fade-in slide-in-from-top-2"
                      >
                        {suggestions.map((p, index) => (
                          <button
                            key={p.id}
                            id={`suggestion-${index}`}
                            role="option"
                            aria-selected={index === activeSuggestionIndex}
                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                            onMouseLeave={() => setActiveSuggestionIndex(-1)}
                            onClick={() => handleSelectSuggestion(p)}
                            className={`w-full flex items-center gap-6 px-8 py-6 transition-all border-b border-gray-50 last:border-0 ${
                              index === activeSuggestionIndex 
                                ? 'bg-slate-50 ring-1 ring-inset ring-slate-100' 
                                : 'bg-white'
                            }`}
                          >
                            <MapPin size={20} className={`${index === activeSuggestionIndex ? 'text-[#c5a059]' : 'text-gray-300'} transition-colors`} />
                            <div>
                              <p className={`font-bold text-lg leading-tight mb-1 transition-colors ${index === activeSuggestionIndex ? 'text-[#1a2a44]' : 'text-gray-600'}`}>{p.name}</p>
                              <p className="text-sm text-gray-400 font-medium tracking-wide">{p.address}</p>
                            </div>
                            <ChevronRight size={20} className={`ml-auto transition-transform ${index === activeSuggestionIndex ? 'text-[#c5a059] translate-x-1' : 'text-gray-200'}`} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-16 flex flex-col items-center animate-in fade-in slide-in-from-top-6 duration-1000">
                    <div className="inline-flex flex-col md:flex-row items-center gap-6 px-10 py-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-3xl mb-6">
                      <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 border border-white/20">
                        <Scale size={32} style={{ color: activeAccent }} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                           <ShieldCheck size={14} style={{ color: activeAccent }} />
                           No-Penalty Advocacy
                        </p>
                        <p className="text-sm md:text-base font-medium text-gray-200 leading-relaxed">
                          Protected under PUCT Move-Out rules. We handle the advocacy to ensure your previous provider waives all cancellation fees when you transition to a Summit community.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-px h-6 mb-4 opacity-50"
                        style={{ background: `linear-gradient(to b, ${activeAccent}, transparent)` }}
                      ></div>
                      <p 
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] opacity-80 animate-pulse"
                        style={{ color: activeAccent }}
                      >
                        Other Summit Managed Properties
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {availableProperties.slice(0, 12).map((prop) => (
                  <button 
                    key={prop.id}
                    className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group flex flex-col text-left border border-gray-100/50"
                    onClick={() => selectProperty(prop)}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                      
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <MapPin size={24} style={{ color: activeAccent }} />
                          <p className="text-white text-[11px] font-black uppercase tracking-widest leading-tight mb-2">
                            {prop.address}
                          </p>
                        </div>
                        
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProperty(prop);
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#1a2a44] text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                        >
                          <Eye size={14} />
                          Quick View
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded shadow-sm text-[10px] font-black text-[#1a2a44] uppercase tracking-widest">
                        Summit Managed
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-black text-xl text-[#1a2a44] serif group-hover:text-[#31686b] transition-colors leading-tight mb-2">{prop.name}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-6">{prop.cityStateSlug.replace('-', ', ')}</p>
                      <div className="flex items-center gap-3 text-[#31686b] text-xs font-black uppercase tracking-widest pt-4 border-t border-gray-50">
                        <span>Select Plan</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <section className="py-32 border-t border-gray-100 bg-white">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <SummitFullLogo className="mb-20" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-10 border border-gray-100 shadow-sm">
                      <ShieldCheck size={40} className="text-[#31686b]" />
                    </div>
                    <h3 className="text-2xl font-black serif mb-4 text-[#1a2a44] uppercase tracking-tight">Direct Integration</h3>
                    <p className="text-gray-500 leading-relaxed font-light">
                      We share your enrollment status directly with the leasing office to clear move-in compliance instantly.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-10 border border-gray-100 shadow-sm">
                      <Zap size={40} className="text-[#c5a059]" />
                    </div>
                    <h3 className="text-2xl font-black serif mb-4 text-[#1a2a44] uppercase tracking-tight">Bulk Rates</h3>
                    <p className="text-gray-500 leading-relaxed font-light">
                      Unlock exclusive energy plans that are significantly lower than standard retail market pricing for residents.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-10 border border-gray-100 shadow-sm">
                      <Clock size={40} className="text-[#31686b]" />
                    </div>
                    <h3 className="text-2xl font-black serif mb-4 text-[#1a2a44] uppercase tracking-tight">Day-One Ready</h3>
                    <p className="text-gray-500 leading-relaxed font-light">
                      Digital enrollment ensures your power is active the day your lease starts, without manual paperwork.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <ResidentInsights />
          </div>
        )}

        {property && step === 'plan-select' && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <button onClick={resetAll} className="flex items-center gap-3 text-gray-400 hover:text-[#1a2a44] font-black mb-16 transition-colors text-[10px] uppercase tracking-widest">
              <ArrowLeft size={16} />
              Return to Search
            </button>

            <div className="mb-20">
              <div className="inline-block px-5 py-2 rounded bg-[#31686b]/10 text-[#31686b] text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                Verified Resident Access: {property.name}
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-8 serif text-[#1a2a44] tracking-tight leading-none">Choose your rate.</h2>
              <p className="text-gray-500 text-xl font-light max-w-3xl leading-relaxed">
                Select from exclusive resident-only plans. These rates are locked in through our partnership with Summit and are not available to the general public.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              {PLANS.map(plan => (
                <PlanCard 
                  key={plan.id}
                  plan={plan}
                  property={property}
                  isSelected={selectedPlan?.id === plan.id}
                  onSelect={() => setSelectedPlan(plan)}
                />
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-grow">
                <div className="flex items-center gap-3 text-[#c5a059] font-black text-[11px] uppercase tracking-widest mb-6">
                  <Sparkles size={20} />
                  <span>AI Savings Predictor</span>
                </div>
                <h3 className="text-4xl font-black mb-6 serif text-[#1a2a44] leading-tight uppercase tracking-tight">Compare your current bill.</h3>
                <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-xl">Upload your most recent bill and our AI will automatically calculate your monthly savings at {property.name}.</p>
                <input type="file" id="bill-upload" className="hidden" accept="image/*" onChange={handleFileUpload} />
                <label 
                  htmlFor="bill-upload"
                  className="inline-flex items-center gap-4 py-5 px-12 bg-[#1a2a44] text-white rounded-xl font-black text-sm uppercase tracking-widest cursor-pointer transition-all hover:bg-[#0f1a2e] shadow-xl"
                >
                  {isAnalyzing ? "Analyzing Data..." : "Analyze Current Bill"}
                </label>
              </div>
              {analysis && (
                <div className="md:w-1/2 p-10 bg-[#f8f9fa] rounded-2xl border border-gray-100">
                  <p className="text-lg font-medium text-gray-700 italic leading-relaxed">"{analysis}"</p>
                </div>
              )}
            </div>

            {selectedPlan && (
              <div className="mt-20 flex justify-end">
                <button 
                  onClick={() => setStep('details')}
                  className="py-6 px-20 rounded-xl text-white font-black text-lg uppercase tracking-widest shadow-2xl transition-all flex items-center gap-5"
                  style={{ backgroundColor: property.primaryColor }}
                >
                  Enroll and Notify Office
                  <ChevronRight size={28} />
                </button>
              </div>
            )}
          </div>
        )}

        {property && step === 'details' && selectedPlan && (
          <div className="max-w-4xl mx-auto px-6 py-24">
            <button onClick={() => setStep('plan-select')} className="flex items-center gap-3 text-gray-400 font-black mb-16 text-[10px] uppercase tracking-widest">
              <ArrowLeft size={16} />
              Change Selected Plan
            </button>
            <div className="mb-16 text-center">
              <h1 className="text-5xl md:text-6xl font-black serif mb-6 text-[#1a2a44] tracking-tight">Identity Sync</h1>
              <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Please ensure your details match your {property.name} lease agreement for automated verification.
              </p>
            </div>
            <EnrollmentForm 
              property={property} 
              plan={selectedPlan} 
              onComplete={() => setStep('confirmation')} 
            />
          </div>
        )}
      </main>

      <footer className="bg-[#1a2a44] text-white py-32 px-6 mt-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-8 mb-10">
                <SummitFullLogo color="white" className="!items-start" />
                <div className="w-px h-12 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Powered by</span>
                  <GetElectricityLogo className="text-white" />
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light">
                Providing seamless utility integration for Summit's premium residential portfolio. Our partnership ensures transparency, advocacy, and exclusive pricing for every resident.
              </p>
            </div>
            <nav>
              <h4 className="font-black text-[11px] text-gray-200 uppercase tracking-[0.3em] mb-12">Resident Support</h4>
              <ul className="space-y-6 text-gray-400 text-base font-medium">
                <li><button onClick={() => setActiveBlog('faq')} className="hover:text-[#c5a059] transition-colors text-left">Move-in FAQ</button></li>
                <li><button onClick={() => setActiveBlog('transfer')} className="hover:text-[#c5a059] transition-colors text-left">Transfer Service</button></li>
                <li><button onClick={() => setActiveBlog('rights')} className="hover:text-[#c5a059] transition-colors text-left">Know Your Rights</button></li>
                <li><button onClick={() => setActiveBlog('terms')} className="hover:text-[#c5a059] transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={() => setActiveBlog('privacy')} className="hover:text-[#c5a059] transition-colors text-left">Privacy Policy</button></li>
              </ul>
            </nav>
            <nav>
              <h4 className="font-black text-[11px] text-gray-200 uppercase tracking-[0.3em] mb-12">Management</h4>
              <ul className="space-y-6 text-gray-400 text-base font-medium">
                <li><a href="https://www.summitapm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a059] transition-colors">Summit Portfolio</a></li>
                <li><button onClick={() => setIsPartnerModalOpen(true)} className="hover:text-[#c5a059] transition-colors text-left">Partner Network</button></li>
              </ul>
            </nav>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] text-gray-600 uppercase font-black tracking-[0.4em]">
            <p>© 2025 Summit Property Management Partnership. Registered BRBR230243.</p>
            <div className="flex gap-12">
               <span>Data Protection Verified</span>
               <span>Direct Sync Enabled</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;