"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, LayoutDashboard } from "lucide-react";

const OwnerCTA = () => {
  return (
    <section className="bg-white py-24 px-6 border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-12">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <LayoutDashboard size={14} strokeWidth={3} /> Owner Portal
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.05]">
                List your property <br />
                on <span className="text-blue-600">HostelVaniya.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                Reach thousands of students and manage your rooms, bookings, and
                payments from one simple place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-12">
              {/* Card 1: Free Listing */}
              <div className="group cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <span className="text-[10px] font-black">01</span>
                  </div>
                  <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">
                    Free Listing
                  </h4>
                </div>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 font-medium">
                  Zero upfront fees. Create your professional account and list
                  your property in minutes.
                </p>
                <Link
                  href="/owner/dashboard"
                  className="text-slate-900 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-blue-600 transition-colors"
                >
                  Sign Up{" "}
                  <ArrowRight
                    size={12}
                    strokeWidth={3}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Card 2: Real Students */}
              <div className="group cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <span className="text-[10px] font-black">02</span>
                  </div>
                  <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">
                    Real Students
                  </h4>
                </div>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 font-medium">
                  Every lead is verified through phone numbers and ID checks to
                  ensure high-intent inquiries.
                </p>
                <Link
                  href="/contact"
                  className="text-slate-900 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-blue-600 transition-colors"
                >
                  Contact Us{" "}
                  <ArrowRight
                    size={12}
                    strokeWidth={3}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Blue Block with Wireframe */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-blue-600 p-12 text-center shadow-2xl shadow-blue-200/60 min-h-[450px] flex flex-col justify-center">
            {/* Wireframe Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 450"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#ffffff" strokeWidth="0.5" fill="none">
                  {[...Array(20)].map((_, i) => (
                    <line key={`v-${i}`} x1={i * 25} y1="0" x2="250" y2="225" />
                  ))}
                  {[...Array(15)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 30}
                      x2="500"
                      y2={i * 30}
                    />
                  ))}
                </g>
              </svg>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-2xl">
                <Building2 size={28} strokeWidth={2.5} />
              </div>

              <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">
                The easiest way to <br />
                rent out your hostel.
              </h3>

              <Link
                href="/owner/dashboard"
                className="inline-flex px-10 py-5 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl active:scale-95 items-center gap-3"
              >
                Get Started <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerCTA;
