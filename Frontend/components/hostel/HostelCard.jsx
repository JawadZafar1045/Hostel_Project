"use client";

import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";

export default function HostelCard({ hostel }) {
  const priceString = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(hostel.price);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Action: Toggle Favorite for ID: ${hostel._id}`);
  };

  return (
    <Link href={`/listings/${hostel._id}`} className="group block outline-none">
      <article className="relative bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow duration-300 hover:shadow-md isolate">
        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
          {/* Replace the broken <Image> block with this logic */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
            {hostel.image ? (
              <Image
                src={hostel.image}
                alt={hostel.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              /* T3-B: Fallback when src is null - no external request needed */
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-200 text-slate-400">
                <svg
                  className="w-12 h-12 mb-2 opacity-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  No Image Available
                </span>
              </div>
            )}
          </div>
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={hostel.gender} />
          </div>
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all active:scale-90 z-20"
          >
            <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            <div className="h-1 w-1 rounded-full bg-white" />
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <div className="h-1 w-1 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
            {hostel.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">
              {hostel.area}, {hostel.city}
            </span>
          </div>

          <div className="mb-4">
            <StarRating
              rating={hostel.rating}
              reviewCount={hostel.reviewCount}
            />
          </div>

          <div className="flex items-baseline gap-1 pt-3 border-t border-slate-50">
            <span className="text-xs text-slate-500">From</span>
            <span className="text-lg font-bold text-slate-900">
              {priceString}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ month</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
