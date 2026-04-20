"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Wallet,
  RotateCcw,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function FilterSidebar({
  currentParams,
  onApply,
  isOpen,
  setIsOpen,
}) {
  const [local, setLocal] = useState({
    city: currentParams.get("city") || "",
    type: currentParams.get("type") || "",
    maxPrice: currentParams.get("maxPrice") || "",
  });

  useEffect(() => {
    setLocal({
      city: currentParams.get("city") || "",
      type: currentParams.get("type") || "",
      maxPrice: currentParams.get("maxPrice") || "",
    });
  }, [currentParams]);

  // Body scroll lock when drawer is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleApply = (e) => {
    if (e) e.preventDefault();
    onApply({ ...local, page: "1" });
    setIsOpen(false);
  };

  const FilterForm = () => (
    <form
      onSubmit={handleApply}
      className="flex flex-col h-full justify-between"
    >
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-slate-900" />
          <h2 className="text-sm font-black text-slate-900 tracking-tight">
            Filters
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            onApply({ city: "", type: "", maxPrice: "", page: "1" })
          }
          className="p-2 text-slate-400 hover:text-red-500 transition-all"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
            Location
          </label>
          <input
            type="text"
            placeholder="City..."
            value={local.city}
            onChange={(e) => setLocal({ ...local, city: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
            Resident Type
          </label>
          <div className="flex p-1 bg-slate-100 rounded-xl gap-1">
            {["boys", "girls"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setLocal({ ...local, type: local.type === t ? "" : t })
                }
                className={`flex-1 py-2 rounded-lg text-[10px] font-black capitalize transition-all ${local.type === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
            Budget
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Max PKR"
              value={local.maxPrice}
              onChange={(e) => setLocal({ ...local, maxPrice: e.target.value })}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400">
              PKR
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white text-xs font-black rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Apply</span> <ChevronRight size={14} />
        </button>
      </div>
    </form>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR */}
      <div className="hidden lg:block bg-white rounded-[1.5rem] border border-slate-100 p-6 shadow-sm">
        <FilterForm />
      </div>

      {/* 2. MOBILE/TAB BOTTOM SHEET DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-10 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-900">
                Refine Search
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <FilterForm />
          </div>
        </div>
      )}
    </>
  );
}
