"use client";

import useSWR from "swr";
import { fetchHostels } from "@/api/hostel.api";
import HostelCard from "@/components/hostel/HostelCard";
import HostelScrollGrid from "@/components/hostel/HostelScrollGrid";
import HostelSkeleton from "@/components/hostel/HostelSkeleton";
import HostelGrid from "@/components/hostel/HostelGrid";
import { SearchBar } from "@/components/hostel/SearchBar";
import TrustStrip from "@/components/home/TrustStrip";
import HowItWorks from "@/components/home/HowItWorks";
import OwnerCTA from "@/components/home/OwnerCTA";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SectionWrapper = ({ children, className = "", isFullWidth = false }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className={isFullWidth ? "w-full" : "max-w-7xl mx-auto px-6"}>
      {children}
    </div>
  </section>
);

export default function HomePage() {
  const router = useRouter();

  const { data, isLoading } = useSWR(
    "/api/public/hostels?page=1&limit=8",
    fetchHostels,
  );

  const hostels = data?.data || [];

  const handleSearch = (query) => {
    if (!query || query.trim() === "") return;

    router.push(`/listings?city=${encodeURIComponent(query.trim())}`);
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/hero-bg.webp"
          alt="Hostel Hub Background"
          fill
          priority
          className="object-cover z-0"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />

        <div className="container relative z-20 mx-auto px-6 text-center">
          <span className="inline-block text-amber-300 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Pakistan&apos;s #1 Student Housing Platform
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Find Your Perfect Hostel
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-medium">
            Verified student accommodation. Starting from simple rooms to
            premium executive stays.
          </p>
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-3xl">
              <SearchBar onSearch={handleSearch} />
            </div>
            <TrustStrip />
          </div>
        </div>
      </section>

      <SectionWrapper>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Popular Stays
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-2">
            Top-rated student housing verified by our team.
          </p>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <HostelSkeleton key={i} />
            ))}
          </div>
        ) : (
          <HostelScrollGrid hostels={hostels.slice(0, 4)} />
        )}
      </SectionWrapper>

      <div className="bg-slate-50/50 border-y border-slate-100">
        <SectionWrapper>
          <HowItWorks />
        </SectionWrapper>
      </div>

      <SectionWrapper>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Explore All Hostels
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-2">
            Discover more options across Pakistan.
          </p>
        </div>
        <HostelGrid hostels={hostels} isLoading={isLoading} />
      </SectionWrapper>

      <OwnerCTA />
    </main>
  );
}
