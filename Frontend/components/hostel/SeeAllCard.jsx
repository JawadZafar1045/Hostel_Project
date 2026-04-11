import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SeeAllCard({ href }) {
  return (
    <Link
      href={href}
      className="min-w-[280px] md:min-w-[340px] snap-start group h-full"
    >
      <div className="relative h-full aspect-[16/9] md:aspect-auto min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854817-5b2260d50c47?q=10')] bg-cover bg-center blur-sm scale-110 opacity-60" />

        <div className="relative z-10 bg-white px-6 py-3 rounded-lg shadow-xl border border-slate-50 flex items-center gap-2 transition-transform group-hover:scale-105 group-active:scale-95">
          <span className="text-red-600 font-bold text-base whitespace-nowrap">
            See All
          </span>
          <ChevronRight className="w-5 h-5 text-red-600 stroke-[3px]" />
        </div>
      </div>
    </Link>
  );
}
