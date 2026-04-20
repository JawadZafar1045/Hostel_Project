"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { fetchHostelById } from "@/api/hostel.api";

import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";

import {
  MapPin,
  Wifi,
  Wind,
  Utensils,
  Shirt,
  Zap,
  Camera,
  BookOpen,
  ChevronLeft,
  Share2,
  Heart,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  X,
  ChevronRight,
} from "lucide-react";

const AMENITY_LIST = [
  { name: "WiFi", icon: Wifi },
  { name: "AC", icon: Wind },
  { name: "Meals Included", icon: Utensils },
  { name: "Laundry", icon: Shirt },
  { name: "Generator", icon: Zap },
  { name: "CCTV", icon: Camera },
  { name: "Study Room", icon: BookOpen },
];

export default function HostelDetailPage() {
  const { id } = useParams();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const {
    data: hostel,
    error,
    isLoading,
  } = useSWR(id ? `/api/public/hostels/${id}` : null, fetchHostelById);

  if (isLoading) return <LoadingSkeleton />;
  if (error || !hostel) return <NotFoundState />;

  const openGallery = (index) => {
    setActiveImageIndex(index);
    setIsGalleryOpen(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I'm interested in ${hostel.title}. Is it available?`,
    );
    window.open(`https://wa.me/${hostel.whatsapp}?text=${msg}`, "_blank");
  };

  const openMap = () => {
    const query = encodeURIComponent(`${hostel.area}, ${hostel.city}`);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: hostel.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 relative">
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-32 md:pb-24">
        {/* BREADCRUMBS - Hide on very small screens to save space */}
        <nav className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link
              href="/listings"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={14} className="md:hidden" /> Listings
            </Link>
            <span className="hidden md:inline">/</span>
            <span className="text-slate-900 truncate max-w-[120px] md:max-w-[200px] hidden md:inline">
              {hostel.title}
            </span>
          </div>
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-all"
            >
              <Share2 size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-red-500 transition-all">
              <Heart size={18} />
            </button>
          </div>
        </nav>

        {/* 2. RESPONSIVE BENTO GALLERY */}
        {/* 2. RESPONSIVE BENTO GALLERY */}
        <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 md:gap-3 h-[250px] md:h-[450px] mb-8 md:mb-12 overflow-hidden rounded-2xl md:rounded-3xl">
          {/* Main Image: Takes 2 cols and both rows on the left */}
          <div
            onClick={() => openGallery(0)}
            className="md:col-span-2 md:row-span-2 bg-slate-50 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[0] && (
              <img
                src={hostel.images[0]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Main"
              />
            )}
          </div>

          {/* Image 2: Top Right (1st slot) */}
          <div
            onClick={() => openGallery(1)}
            className="hidden md:flex bg-slate-50 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[1] && (
              <img
                src={hostel.images[1]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all"
                alt=""
              />
            )}
          </div>

          {/* Image 3: Top Right (2nd slot) */}
          <div
            onClick={() => openGallery(2)}
            className="hidden md:flex bg-slate-50 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[2] && (
              <img
                src={hostel.images[2]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all"
                alt=""
              />
            )}
          </div>

          {/* Image 4: Bottom Right (Wide slot) */}
          {/* Changed col-span to 2 so it fills the remaining space under images 2 and 3 */}
          <div
            onClick={() => openGallery(3)}
            className="hidden md:flex md:col-span-2 bg-slate-50 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[3] && (
              <img
                src={hostel.images[3]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all"
                alt=""
              />
            )}

            {hostel.images?.length > 4 && (
              <button className="absolute bottom-6 right-6 px-5 py-2.5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-lg shadow-sm z-10 hover:bg-slate-50">
                +{hostel.images.length - 4} Photos
              </button>
            )}
          </div>
        </section>

        {/* 3. CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-20">
          <div className="space-y-10 md:space-y-12">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant={hostel.gender} />
                <StarRating
                  rating={hostel.rating}
                  reviewCount={hostel.reviewCount}
                />
              </div>
              <h1 className="text-2xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4 md:mb-6">
                {hostel.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[12px] md:text-[13px] font-bold">
                <p className="flex items-center gap-2 text-slate-500">
                  <MapPin size={16} className="text-blue-600" /> {hostel.area},{" "}
                  {hostel.city}
                </p>
                <button
                  onClick={openMap}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 underline md:no-underline"
                >
                  View on Map
                </button>
              </div>
            </div>

            <section className="border-t border-slate-100 pt-8">
              <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                Description
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {hostel.description}
              </p>
            </section>

            <section className="border-t border-slate-100 pt-8">
              <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">
                Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {AMENITY_LIST.map((item) => {
                  const isActive = hostel.amenities?.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      className={`flex items-center gap-3 ${isActive ? "opacity-100" : "opacity-30"}`}
                    >
                      <div className="p-2 md:p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <item.icon size={18} className="text-slate-700" />
                      </div>
                      <span className="text-[11px] md:text-[12px] font-bold text-slate-700">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-10 space-y-4">
              <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Monthly Price
                </p>
                <h3 className="text-3xl font-black text-slate-900 mb-8">
                  PKR {hostel.price?.toLocaleString()}
                </h3>
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all"
                >
                  <MessageSquare size={16} fill="currentColor" /> Contact Owner
                </button>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-4 border border-slate-100">
                <ShieldCheck size={20} className="text-blue-600 shrink-0" />
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase">
                  Property verified by{" "}
                  <span className="font-bold underline decoration-blue-200 text-slate-900">
                    HostelVaniya
                  </span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 z-50 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Monthly
          </p>
          <p className="text-lg font-black text-slate-900">
            PKR {hostel.price?.toLocaleString()}
          </p>
        </div>
        <button
          onClick={handleWhatsApp}
          className="bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <MessageSquare size={16} fill="currentColor" /> Contact
        </button>
      </div>

      {/* 4. LIGHTBOX MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>
          <div className="absolute top-6 left-6 text-white/40 text-[10px] font-black uppercase tracking-widest">
            {activeImageIndex + 1} / {hostel.images?.length || 0}
          </div>
          <div className="relative w-full max-w-5xl h-[60vh] md:h-[75vh] flex items-center justify-center">
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev > 0 ? prev - 1 : (hostel.images?.length || 1) - 1,
                )
              }
              className="absolute left-0 text-white/50 hover:text-white p-2 md:p-4"
            >
              <ChevronLeft size={40} />
            </button>
            <img
              src={hostel.images?.[activeImageIndex]}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev < (hostel.images?.length || 1) - 1 ? prev + 1 : 0,
                )
              }
              className="absolute right-0 text-white/50 hover:text-white p-2 md:p-4"
            >
              <ChevronRight size={40} />
            </button>
          </div>
          <div className="mt-8 flex gap-2 overflow-x-auto p-2 w-full max-w-4xl justify-start md:justify-center scrollbar-hide">
            {hostel.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-12 w-16 md:h-16 md:w-24 shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${activeImageIndex === idx ? "border-blue-500 scale-105" : "border-transparent opacity-50"}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 animate-pulse">
      <div className="h-4 w-48 bg-slate-100 mb-8 rounded" />
      <div className="h-[300px] md:h-[400px] bg-slate-100 rounded-3xl mb-12" />
      <div className="h-10 w-2/3 bg-slate-100 rounded-lg mb-6" />
      <div className="h-32 w-full bg-slate-100 rounded-xl" />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">
        Hostel Not Found
      </h2>
      <Link
        href="/listings"
        className="text-blue-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-600 pb-1"
      >
        Return to listings
      </Link>
    </div>
  );
}
