"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HostelCard from "./HostelCard";
import SeeAllCard from "./SeeAllCard";

export default function HostelGrid({ hostels }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Intelligent scroll tracking
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 30);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 30);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [hostels]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount =
        direction === "left"
          ? -scrollRef.current.clientWidth
          : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group w-full">
      {/* Left Navigation - Always Visible if content exists */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-50 h-12 w-12 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 transition-all hover:bg-slate-50 active:scale-90 md:flex"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-7 h-7 text-slate-900 stroke-[2.5px]" />
        </button>
      )}

      {/* The Scroll Container with Linear Masking */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto overflow-y-visible py-10 scrollbar-hide snap-x snap-mandatory px-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitMaskImage: `linear-gradient(to right, 
            ${showLeft ? "transparent" : "black"} 0%, 
            black 8%, 
            black 92%, 
            ${showRight ? "transparent" : "black"} 100%)`,
          maskImage: `linear-gradient(to right, 
            ${showLeft ? "transparent" : "black"} 0%, 
            black 8%, 
            black 92%, 
            ${showRight ? "transparent" : "black"} 100%)`,
        }}
      >
        {hostels.map((hostel) => (
          <div
            key={hostel._id}
            className="
              min-w-[85vw] 
              md:min-w-[calc(50%-20px)] 
              lg:min-w-[calc(33.33%-20px)] 
              xl:min-w-[calc(25%-18px)] 
              snap-start
            "
          >
            <HostelCard hostel={hostel} />
          </div>
        ))}

        {/* See All Card */}
        <SeeAllCard href="/explore/bahawalpur" />

        {/* End of scroll buffer */}
        <div className="min-w-[20px] shrink-0" />
      </div>

      {/* Right Navigation */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-50 h-12 w-12 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 transition-all hover:bg-slate-50 active:scale-90 md:flex"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-7 h-7 text-slate-900 stroke-[2.5px]" />
        </button>
      )}
    </div>
  );
}
