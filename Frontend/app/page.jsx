"use client";
import HostelCard from "@/components/hostel/HostelCard";
import HostelScrollGrid from "@/components/hostel/HostelScrollGrid";
import HostelSkeleton from "@/components/hostel/HostelSkeleton";
import HostelGrid from "@/components/hostel/HostelGrid";
import { SearchBar } from "@/components/hostel/SearchBar";
import { useEffect, useState } from "react";

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
    // SIMULATING BACKEND FETCH (2 seconds delay)
    const timer = setTimeout(() => {
      setHostels(TEST_HOSTELS); // Using your TEST_HOSTELS array
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // This is where you will eventually filter your hostels or call Jawad's API
  };
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-tighter">
              Find Your Perfect Hostel
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Verified student accommodation in Bahawalpur and beyond. Starting
              from simple rooms to premium executive stays.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Popular in Bahawalpur
            </h2>
            <p className="text-slate-500 mt-1">
              Top-rated student housing near IUB.
            </p>
          </div>

          {/* SMART GRID LOGIC */}
          <div className="relative group w-full">
            {/* If loading, show 4 skeletons. If ready, show the grid. */}
            {isLoading ? (
              <div className="flex gap-6 overflow-hidden py-8 px-2">
                {[...Array(4)].map((_, i) => (
                  <HostelSkeleton key={i} />
                ))}
              </div>
            ) : (
              <HostelScrollGrid hostels={hostels} />
            )}
          </div>
          {/* SECTION 2: All Listings (The Grid the Tech Lead wants) */}
          <section className="py-10">
            <h2 className="text-2xl font-bold mb-6">Explore All Hostels</h2>
            <HostelGrid hostels={TEST_HOSTELS} isLoading={isLoading} />
          </section>
        </div>
      </section>

      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">
            Are you a Hostel Owner in BWP?
          </h3>
          <p className="text-slate-400 mb-6">
            List your property today and reach thousands of students.
          </p>
          <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm">
            List Property
          </button>
        </div>
      </section>
    </main>
  );
}
