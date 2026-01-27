import React from 'react';
import { ShieldCheck, Info, ArrowRight, ZapOff, CheckCircle2 } from 'lucide-react';

const ResidentInsights: React.FC = () => {
  return (
    <section className="py-32 bg-[#f8f9fa] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* FAQ / Insight Header */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-gray-400 font-black text-[11px] uppercase mb-8 tracking-[0.3em]">
              <div className="w-5 h-5 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
                <Info size={12} className="text-[#c5a059]" />
              </div>
              <span>Resident Knowledge Center</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-10 serif text-[#1a2a44] tracking-tight leading-none">
              Move-in costs <br/><span className="text-[#c5a059]">simplified.</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-12 font-light">
              We’ve redesigned the utility setup process to be a standard, fee-free part of your lease signing through our partnership with Summit.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#1a2a44] text-white flex items-center justify-center flex-shrink-0">
                  <ZapOff size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg text-[#1a2a44] mb-2 uppercase tracking-tight serif italic">Zero Termination Fees</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Under PUCT rules, you are legally exempt from cancellation fees when moving locations.</p>
                </div>
              </div>
              
              <div className="flex gap-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#c5a059] text-white flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg text-[#1a2a44] mb-2 uppercase tracking-tight serif italic">Direct Office Sync</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Eliminate the need for email proofs. We notify the leasing office the moment you enroll.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Blog Content */}
          <div className="lg:col-span-7 bg-white p-12 md:p-16 rounded-[2rem] shadow-2xl border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10">
               <span className="bg-emerald-50 text-emerald-700 text-[11px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest border border-emerald-100 shadow-sm">
                 Resident Rights 2025
               </span>
             </div>
             
             <article className="prose prose-stone max-w-none">
               <h3 className="text-4xl font-black serif text-[#1a2a44] mb-8 leading-tight uppercase tracking-tight">
                 Understanding Your <br/>
                 <span className="text-gray-300">Move-In Advocacy.</span>
               </h3>
               
               <div className="space-y-8 text-gray-600 text-xl leading-relaxed font-light">
                 <p>
                   Most residents dread the move-in utility setup. Traditionally, you find your ESIID, call a provider, and hope they notify your landlord before a non-compliance fine is added to your account.
                 </p>
                 
                 <div className="p-10 bg-[#f8f9fa] rounded-2xl border-l-[6px] border-[#1a2a44] my-12">
                   <h4 className="font-black text-[#1a2a44] mb-4 uppercase tracking-[0.1em] serif italic text-2xl">The PUCT Protection</h4>
                   <p className="text-lg">
                     The Public Utility Commission mandates that any REP allow you to cancel your current contract <strong>without any early termination fees</strong> if you are moving to a new residence.
                   </p>
                 </div>

                 <p>
                   Many providers rely on residents being unaware of this rule. By using the <strong>Summit Direct Sync Portal</strong>, your transition is automatically flagged as a qualifying move event.
                 </p>
                 
                 <p>
                   This partnership ensures your transition is viewed as a "Move-Out/Move-In" event, legally excluding you from $150-$300 cancellation fees from your prior provider.
                 </p>

                 <div className="flex items-center gap-6 pt-10 border-t border-gray-100 mt-12">
                    <div className="flex -space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white"></div>
                    </div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      Trusted by 1,200+ new Summit residents this month
                    </span>
                 </div>
               </div>
             </article>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResidentInsights;