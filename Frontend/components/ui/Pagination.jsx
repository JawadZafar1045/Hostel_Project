"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Pagination({ currentPage, onPageChange, totalPages }) {
  // Logic to determine which page numbers to show (Responsive Windowing)
  const getVisiblePages = () => {
    const delta = 1; // Number of pages to show on each side of current
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage > delta + 2) range.unshift("...");
    range.unshift(1);
    if (currentPage < totalPages - (delta + 1)) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const navigateTo = (page) => {
    if (typeof page !== "number") return;
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const navIconClass =
    "flex items-center justify-center size-8 sm:size-10 rounded-full transition-all flex-shrink-0";
  const disabledClass = "text-slate-200 pointer-events-none";
  const activeIconClass = "text-blue-600 hover:bg-blue-50";
  const boundaryIconClass = "text-slate-400 hover:bg-slate-50";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Mobile Page Indicator */}
      <div className="sm:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </div>

      <nav
        aria-label="Pagination"
        className="flex items-center justify-between sm:justify-center p-1.5 bg-white rounded-full border border-slate-100 shadow-sm w-full sm:w-auto"
      >
        {/* LEFT CONTROLS */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Hide Double Arrows on very small mobile to save space */}
          <button
            onClick={() => navigateTo(1)}
            disabled={currentPage === 1}
            className={`${navIconClass} hidden sm:flex ${currentPage === 1 ? disabledClass : boundaryIconClass}`}
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            onClick={() => navigateTo(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${navIconClass} ${currentPage === 1 ? disabledClass : activeIconClass}`}
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
        </div>

        {/* PAGE NUMBERS - Hidden or truncated on mobile */}
        <div className="flex items-center gap-1 px-2 sm:px-4 sm:border-x border-slate-100 mx-1 sm:mx-2">
          {getVisiblePages().map((p, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(p)}
              disabled={p === "..."}
              className={`flex items-center justify-center size-8 sm:size-10 text-xs sm:text-sm font-bold transition-all rounded-full ${
                p === "..."
                  ? "text-slate-300 cursor-default"
                  : currentPage === p
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              } ${typeof p !== "number" ? "pointer-events-none" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => navigateTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${navIconClass} ${currentPage === totalPages ? disabledClass : activeIconClass}`}
          >
            <ChevronRight size={18} strokeWidth={3} />
          </button>

          <button
            onClick={() => navigateTo(totalPages)}
            disabled={currentPage === totalPages}
            className={`${navIconClass} hidden sm:flex ${currentPage === totalPages ? disabledClass : boundaryIconClass}`}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </nav>
    </div>
  );
}
