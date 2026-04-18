import React from "react";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";

const OwnerCTA = () => {
  return (
    <section className="py-12 px-6">
      {" "}
      {/* Reduced section padding */}
      <div className="max-w-6xl mx-auto">
        {" "}
        {/* Narrower container */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-10 lg:p-14 gap-10">
            {/* Left Side: Content */}
            <div className="max-w-lg text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Building2 className="w-3 h-3" />
                Property Owners
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                List your property & <br />
                <span className="text-blue-400">reach students.</span>
              </h2>

              <p className="text-slate-400 text-base mb-8 leading-relaxed">
                Join Pakistan's fastest-growing housing network. Manage
                everything from one dashboard.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 group">
                  List Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3 text-slate-300 hover:text-white rounded-lg font-bold text-sm transition-all">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right Side: Compact Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:w-72">
              {[
                "Zero listing fees",
                "Verified leads",
                "24/7 Support",
                "Direct contact",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/50 p-3 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-slate-300 text-xs font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerCTA;
