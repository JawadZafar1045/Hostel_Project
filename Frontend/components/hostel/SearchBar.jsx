"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn, debounce } from "@/lib/utils";

export function SearchBar({
  onSearch,
  placeholder = "Search by city (e.g. Bahawalpur)...",
  className,
}) {
  const [value, setValue] = useState("");

  const debouncedSearch = useRef(
    debounce((query) => {
      onSearch(query);
    }, 300),
  ).current;

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-12 pr-12 py-4 text-slate-900 rounded-2xl border border-slate-200 bg-white shadow-sm",
          "placeholder:text-slate-400 transition-all duration-200",

          "focus:!outline-none focus:!ring-0 focus:border-slate-400",

          "hover:border-slate-300",
        )}
      />

      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
