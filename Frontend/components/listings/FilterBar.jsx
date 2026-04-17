"use client";

import { MapPin, Search, RotateCcw } from "lucide-react";

export default function FilterBar({ filters, onUpdate, onClear }) {
  return (
    <div className="sticky top-[64px] z-30 bg-white border-b border-slate-100 py-4 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:flex items-end gap-4">
        {/* City Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">
            City
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search city..."
              value={filters.city}
              onChange={(e) => onUpdate({ city: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Type Dropdown */}
        <div className="w-full lg:w-48">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onUpdate({ type: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="boys">Boys Only</option>
            <option value="girls">Girls Only</option>
          </select>
        </div>

        {/* Max Price */}
        <div className="w-full lg:w-48">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">
            Max Price
          </label>
          <input
            type="number"
            placeholder="PKR"
            value={filters.maxPrice}
            onChange={(e) => onUpdate({ maxPrice: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="h-[42px] px-8 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95">
            <Search size={16} /> Search
          </button>
          <button
            onClick={onClear}
            className="h-[42px] w-[42px] flex items-center justify-center bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
