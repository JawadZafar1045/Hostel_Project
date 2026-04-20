"use client";
import HostelCard from "@/components/hostel/HostelCard";
import HostelScrollGrid from "@/components/hostel/HostelScrollGrid";
import HostelSkeleton from "@/components/hostel/HostelSkeleton";
import HostelGrid from "@/components/hostel/HostelGrid";
import { SearchBar } from "@/components/hostel/SearchBar";
import TrustStrip from "@/components/home/TrustStrip";
import HowItWorks from "@/components/home/HowItWorks";
import OwnerCTA from "@/components/home/OwnerCTA";
import Image from "next/image";
import { useEffect, useState } from "react";

// Standard Section Wrapper to keep everything aligned
const SectionWrapper = ({ children, className = "", isFullWidth = false }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className={isFullWidth ? "w-full" : "max-w-7xl mx-auto px-6"}>
      {children}
    </div>
  </section>
);

export default function HomePage() {
  const TEST_HOSTELS = [
    {
      _id: "1",
      title: "Smart Stay Boys Hostel",
      area: "Sector I-8",
      city: "Islamabad",
      price: 18000,
      rating: 4.5,
      reviewCount: 24,
      gender: "boys",
      isNew: true,
    },
    {
      _id: "2",
      title: "Executive Girls Residency",
      area: "Gulberg III",
      city: "Lahore",
      price: 25000,
      rating: 4.9,
      reviewCount: 42,
      gender: "girls",
      isNew: false,
    },
    {
      _id: "3",
      title: "Peshawar Student Hub",
      area: "University Road",
      city: "Peshawar",
      price: 15000,
      rating: 4.2,
      reviewCount: 18,
      gender: "boys",
      isNew: true,
    },
    {
      _id: "4",
      title: "BWP Luxury Stay",
      area: "Model Town",
      city: "Bahawalpur",
      price: 15000,
      rating: 4.2,
      reviewCount: 18,
      gender: "boys",
      isNew: true,
    },
    {
      _id: "5",
      title: "IUB Executive Hostel",
      area: "Baghdad Campus",
      city: "Bahawalpur",
      price: 15000,
      rating: 4.2,
      reviewCount: 18,
      gender: "boys",
      isNew: true,
    },
    {
      _id: "6",
      title: "QAMC Girls Wing",
      area: "Medical Colony",
      city: "Bahawalpur",
      price: 15000,
      rating: 4.2,
      reviewCount: 18,
      gender: "girls",
      isNew: true,
    },
  ];

  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHostels(TEST_HOSTELS);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => console.log("Searching for:", query);

  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1: HERO */}
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
            Verified student accommodation in Bahawalpur. Starting from simple
            rooms to premium executive stays.
          </p>
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-3xl">
              <SearchBar onSearch={handleSearch} />
            </div>
            <TrustStrip />
          </div>
        </div>
      </section>

      {/* SECTION 2: POPULAR (Horizontal Scroll) */}
      <SectionWrapper>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Popular in Bahawalpur
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-2">
            Top-rated student housing near IUB.
          </p>
        </div>
        <div className="relative">
          {isLoading ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <HostelSkeleton key={i} />
              ))}
            </div>
          ) : (
            <HostelScrollGrid hostels={hostels} />
          )}
        </div>
      </SectionWrapper>

      {/* SECTION 3: HOW IT WORKS (Unified Spacing) */}
      <div className="bg-slate-50/50 border-y border-slate-100">
        <SectionWrapper>
          <HowItWorks />
        </SectionWrapper>
      </div>

      {/* SECTION 4: ALL LISTINGS (Grid) */}
      <SectionWrapper>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Explore All Hostels
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-2">
            Discover more options across the city.
          </p>
        </div>
        <HostelGrid hostels={TEST_HOSTELS} isLoading={isLoading} />
      </SectionWrapper>

      {/* SECTION 5: OWNER CTA */}
      <OwnerCTA />
    </main>
  );
}
