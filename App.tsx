import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Property, ElectricityPlan, EnrollmentStep } from './types';
import { SUMMIT_PROPERTIES, PLANS } from './constants';
import PropertyHeader from './components/PropertyHeader';
import PlanCard from './components/PlanCard';
import EnrollmentForm from './components/EnrollmentForm';
import ResidentInsights from './components/ResidentInsights';
import { 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  Zap,
  Home,
  Lock,
  MapPin,
  Scale
} from 'lucide-react';
import { analyzeUtilityBill } from './services/geminiService';

const App: React.FC = () => {
  // Filter properties that have images available
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
  
  const [suggestions, setSuggestions] = useState<Property[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const unitInputRef = useRef<HTMLInputElement>(null);

  // Derived colors based on selected property or defaults
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
    unitInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setShowSuggestions(false);
    
    if (!searchQuery.trim()) {
      setSearchError("Please enter your home address.");
      return;
    }
    
    setIsSearching(true);
    
    setTimeout(() => {
      const match = availableProperties.find(p => 
        p.name.toLowerCase() === searchQuery.toLowerCase() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (match) {
        if (!unitQuery.trim()) {
          setSearchError("Unit number is required for lease synchronization.");
          setIsSearching(false);
          unitInputRef.current?.focus();
          return;
        }
        setProperty(match);
        setIsSearching(false);
        setStep('plan-select');
        window.location.hash = `/electricity/apartments/${match.slug}/${match.cityStateSlug}`;
      } else {
        setSearchError("Community not found. This portal is exclusively for residents of communities managed by Summit.");
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
        Official Resident Portal • Powered by Summit Partnership
      </p>
    </div>
  );

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
              Your enrollment for <strong>{property.name}</strong>, Unit {unitQuery} is active. We have sent your confirmation directly to the leasing office.
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
            {/* Summit Inspired Hero Section */}
            <div 
              className="text-white pt-24 pb-40 px-6 relative overflow-hidden transition-colors duration-500"
              style={{ backgroundColor: activePrimary }}
            >
               {/* Background patterns similar to Summit's premium look */}
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

                <div className="max-w-4xl mx-auto relative" ref={suggestionRef}>
                  <form 
                    onSubmit={handleSearch} 
                    className="flex flex-col md:flex-row items-stretch gap-0 bg-white p-2 rounded-2xl shadow-2xl relative z-30"
                  >
                    <div className="flex-grow flex items-center px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100" role="combobox" aria-expanded={showSuggestions} aria-haspopup="listbox" aria-owns="property-suggestions-listbox">
                      <Search className="text-gray-400 mr-5 flex-shrink-0" size={24} />
                      <input 
                        type="text"
                        autoComplete="off"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        aria-autocomplete="list"
                        aria-controls="property-suggestions-listbox"
                        aria-activedescendant={activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : undefined}
                        placeholder="Property Name or Address..."
                        className="w-full py-2 text-[#1a2a44] text-xl font-medium outline-none placeholder:text-gray-300 bg-transparent"
                      />
                    </div>
                    <div className="w-full md:w-36 flex items-center px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100">
                      <Home className="text-gray-400 mr-5 flex-shrink-0" size={24} />
                      <input 
                        ref={unitInputRef}
                        type="text"
                        value={unitQuery}
                        onChange={(e) => setUnitQuery(e.target.value)}
                        placeholder="Unit"
                        className="w-full py-2 text-[#1a2a44] text-xl font-medium outline-none placeholder:text-gray-300 bg-transparent"
                      />
                    </div>
                    <button 
                      disabled={isSearching}
                      className="w-full md:w-auto px-12 py-5 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ backgroundColor: activePrimary }}
                    >
                      {isSearching ? '...' : 'Enroll Now'}
                    </button>
                  </form>

                  {/* NO-PENALTY ADVOCACY ALERT - High visibility, well spaced */}
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
                    {/* New label requested under the advocacy section */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-px h-6 mb-4 opacity-50"
                        style={{ background: `linear-gradient(to b, ${activeAccent}, transparent)` }}
                      ></div>
                      <p 
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] opacity-80 animate-pulse"
                        style={{ color: activeAccent }}
                      >
                        All Summit Managed Properties
                      </p>
                    </div>
                  </div>

                  {/* Autocomplete Suggestions */}
                  {showSuggestions && (
                    <div 
                      id="property-suggestions-listbox"
                      role="listbox"
                      className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-40 text-left"
                    >
                      {suggestions.map((p, index) => (
                        <button
                          key={p.id}
                          id={`suggestion-${index}`}
                          role="option"
                          aria-selected={index === activeSuggestionIndex}
                          onClick={() => handleSelectSuggestion(p)}
                          className={`w-full flex items-center gap-5 px-8 py-5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${index === activeSuggestionIndex ? 'bg-gray-100' : ''}`}
                        >
                          <MapPin size={20} className="text-gray-300" />
                          <div>
                            <p className="font-bold text-[#1a2a44] text-lg">{p.name}</p>
                            <p className="text-sm text-gray-400 font-medium">{p.address}</p>
                          </div>
                          <ChevronRight size={20} className="ml-auto text-gray-200" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Cards - Summit "Find a Home" Grid Style */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {availableProperties.slice(0, 12).map((prop) => (
                  <button 
                    key={prop.id}
                    className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group flex flex-col text-left border border-gray-100/50"
                    onClick={() => {
                      setProperty(prop);
                      setStep('plan-select');
                      window.location.hash = `/electricity/apartments/${prop.slug}/${prop.cityStateSlug}`;
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                      <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded shadow-sm text-[10px] font-black text-[#1a2a44] uppercase tracking-widest">
                        Summit Managed
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-black text-xl text-[#1a2a44] serif group-hover:text-[#c5a059] transition-colors leading-tight mb-2">{prop.name}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-6">{prop.cityStateSlug.replace('-', ', ')}</p>
                      <div className="flex items-center gap-3 text-[#c5a059] text-xs font-black uppercase tracking-widest pt-4 border-t border-gray-50">
                        <span>Select Plan</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-20 text-center">
                 <p className="text-gray-400 text-[12px] font-black uppercase tracking-[0.4em] mb-20">Browse All {availableProperties.length} Summit Managed Communities</p>
              </div>
            </div>

            {/* core value section */}
            <section className="py-32 border-t border-gray-100 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-10 border border-gray-100 shadow-sm">
                      <ShieldCheck size={40} className="text-[#c5a059]" />
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
                      <Clock size={40} className="text-[#c5a059]" />
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
              <div className="inline-block px-5 py-2 rounded bg-[#c5a059]/10 text-[#c5a059] text-[11px] font-black uppercase tracking-[0.2em] mb-6">
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
              <div className="flex items-center gap-5 mb-10">
                <Zap className="text-[#c5a059]" size={48} fill="currentColor" />
                <span className="text-4xl font-black serif tracking-tighter uppercase">Summit Utilities</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light">
                Providing seamless utility integration for Summit's premium residential portfolio. Our partnership ensures transparency, advocacy, and exclusive pricing for every resident.
              </p>
            </div>
            <nav>
              <h4 className="font-black text-[11px] text-gray-200 uppercase tracking-[0.3em] mb-12">Resident Support</h4>
              <ul className="space-y-6 text-gray-400 text-base font-medium">
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Move-in FAQ</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Transfer Service</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Know Your Rights</a></li>
              </ul>
            </nav>
            <nav>
              <h4 className="font-black text-[11px] text-gray-200 uppercase tracking-[0.3em] mb-12">Management</h4>
              <ul className="space-y-6 text-gray-400 text-base font-medium">
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Summit Portfolio</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Partner Network</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Portal Access</a></li>
              </ul>
            </nav>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] text-gray-600 uppercase font-black tracking-[0.4em]">
            <p>© 2025 Summit Utilities Partnership. Registered REP #10000.</p>
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