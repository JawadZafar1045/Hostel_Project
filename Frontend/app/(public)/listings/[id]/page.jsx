"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { fetchHostelById } from "@/api/hostel.api";

import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";

// Icons
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

  // Gallery State
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
      `Hi, I'm interested in ${hostel.title}. Is it still available?`,
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

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 relative">
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-24">
        <nav className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/listings"
              className="hover:text-blue-600 transition-colors"
            >
              Listings
            </Link>
            <span>/</span>
            <span className="text-slate-900 truncate max-w-[150px]">
              {hostel.title}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
              <Share2 size={16} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
              <Heart size={16} />
            </button>
          </div>
        </nav>

        <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[300px] md:h-[400px] mb-12 overflow-hidden rounded-3xl">
          <div
            onClick={() => openGallery(0)}
            className="md:col-span-2 md:row-span-2 bg-slate-50 border border-slate-100 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[0] ? (
              <img
                src={hostel.images[0]}
                alt="Main View"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                Main View
              </div>
            )}
          </div>

          <div
            onClick={() => openGallery(1)}
            className="hidden md:flex bg-slate-50 border border-slate-100 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[1] ? (
              <img
                src={hostel.images[1]}
                alt="Interior"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <span className="text-slate-200 font-bold text-[10px] uppercase tracking-widest">
                Lobby
              </span>
            )}
          </div>

          <div
            onClick={() => openGallery(2)}
            className="hidden md:flex bg-slate-50 border border-slate-100 relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[2] ? (
              <img
                src={hostel.images[2]}
                alt="Bedroom"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <span className="text-slate-200 font-bold text-[10px] uppercase tracking-widest">
                Bedroom
              </span>
            )}
          </div>

          <div
            onClick={() => openGallery(3)}
            className="hidden md:flex md:col-span-2 bg-slate-50 border border-slate-100 items-center justify-center relative group cursor-pointer overflow-hidden"
          >
            {hostel.images?.[3] ? (
              <img
                src={hostel.images[3]}
                alt="Amenities"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-200 font-bold tracking-widest uppercase text-[10px]">
                Terrace
              </div>
            )}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            <button className="absolute bottom-6 right-6 px-5 py-2.5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-lg shadow-sm border border-slate-200 z-10 hover:bg-slate-50 transition-all">
              {hostel.images?.length > 4
                ? `+${hostel.images.length - 4} Photos`
                : "View All"}
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
          <div className="space-y-12">
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant={hostel.gender} />
                <StarRating
                  rating={hostel.rating}
                  reviewCount={hostel.reviewCount}
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6">
                {hostel.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-[13px] font-bold">
                <p className="flex items-center gap-2 text-slate-500">
                  <MapPin size={16} className="text-blue-600" /> {hostel.area},{" "}
                  {hostel.city}
                </p>
                <button
                  onClick={openMap}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  View on Google Maps
                  <ExternalLink
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>
            </div>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                Description
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {hostel.description}
              </p>
            </section>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-8">
                Facilities & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {AMENITY_LIST.map((item) => {
                  const isActive = hostel.amenities?.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      className={`flex items-center gap-3 ${isActive ? "opacity-100" : "opacity-30 grayscale"}`}
                    >
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <item.icon
                          size={18}
                          strokeWidth={2}
                          className="text-slate-700"
                        />
                      </div>
                      <span className="text-[12px] font-bold text-slate-700">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside>
            <div className="sticky top-10 space-y-4">
              <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Monthly Price
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      PKR {hostel.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mb-8 text-[13px]">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium tracking-tight">
                      Room Type
                    </span>
                    <span className="text-slate-900 font-bold">
                      Standard Sharing
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium tracking-tight">
                      Availability
                    </span>
                    <span className="text-green-600 font-bold">In Stock</span>
                  </div>
                </div>
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} fill="currentColor" />
                  Contact Owner
                </button>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-4 border border-slate-100">
                <ShieldCheck size={20} className="text-blue-600 shrink-0" />
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase">
                  Property verified by{" "}
                  <span className="text-slate-900 font-bold underline decoration-blue-200">
                    HostelVaniya
                  </span>
                  . 100% Secure Listing.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          <div className="absolute top-6 left-6 text-white/40 text-[10px] font-black uppercase tracking-widest">
            {activeImageIndex + 1} / {hostel.images?.length || 0}
          </div>

          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev > 0 ? prev - 1 : (hostel.images?.length || 1) - 1,
                )
              }
              className="absolute left-0 text-white/50 hover:text-white p-4 transition-all"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <img
              src={hostel.images?.[activeImageIndex]}
              alt="Gallery Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev < (hostel.images?.length || 1) - 1 ? prev + 1 : 0,
                )
              }
              className="absolute right-0 text-white/50 hover:text-white p-4 transition-all"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto p-2 max-w-full">
            {hostel.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-16 w-24 shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${activeImageIndex === idx ? "border-blue-500 scale-105" : "border-transparent opacity-50"}`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
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
      <div className="h-[400px] bg-slate-100 rounded-3xl mb-12" />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">
        Hostel Not Found
      </h2>
      <Link
        href="/listings"
        className="mt-4 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline"
      >
        Back to listings
      </Link>
    </div>
  );
}
