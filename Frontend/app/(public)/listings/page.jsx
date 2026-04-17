"use client";

import useSWR from "swr";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "@/components/listings/FilterSidebar";
import Pagination from "@/components/ui/Pagination";
import HostelGrid from "@/components/hostel/HostelGrid";
import { fetchHostels } from "@/api/hostel.api";

function ListingsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = {
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    page: searchParams.get("page") || "1",
  };

  const { data, error, isLoading } = useSWR(
    `/api/public/hostels?city=${filters.city}&type=${filters.type}&maxPrice=${filters.maxPrice}&page=${filters.page}&limit=9`,
    fetchHostels,
  );

  const handleUpdateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (!updates.page) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  if (error)
    return (
      <div className="p-20 text-center font-black text-red-500">
        Error loading hostels.
      </div>
    );

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-14">
          {/* DESKTOP SIDEBAR - Remains intact for large screens */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 self-start z-10">
            <FilterSidebar
              currentParams={searchParams}
              onApply={handleUpdateParams}
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
            />
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 w-full min-w-0">
            {/* HEADER SECTION - PUSHED TO ENDS */}
            <div className="mb-12 flex items-center justify-between gap-4">
              {/* LEFT END: Heading & Result Count */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Explore
                </h1>
                {!isLoading && (
                  <p className="text-[10px] font-black text-blue-600 uppercase mt-1.5 tracking-widest px-0.5">
                    {data?.totalResults || 0} Results
                  </p>
                )}
              </div>

              {/* RIGHT END: Filter Button (Visible on Tablet/Mobile) */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2.5 px-5 py-3 bg-slate-900 text-white rounded-2xl active:scale-95 transition-all shadow-xl shadow-slate-200"
              >
                <span className="text-xs font-black uppercase tracking-wider">
                  Filters
                </span>
                <SlidersHorizontal size={18} />
              </button>
            </div>

            {/* THE GRID (3x3 on Desktop) */}
            <HostelGrid
              hostels={data?.data || []}
              isLoading={isLoading}
              limit={9}
            />

            {/* PAGINATION */}
            {!isLoading && data?.totalPages > 1 && (
              <div className="mt-20 flex justify-center pb-12">
                <Pagination
                  currentPage={parseInt(filters.page)}
                  totalPages={data.totalPages}
                  onPageChange={(p) => handleUpdateParams({ page: p })}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER PORTAL */}
      <div className="lg:hidden">
        <FilterSidebar
          currentParams={searchParams}
          onApply={handleUpdateParams}
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
        />
      </div>
    </main>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={null}>
      <ListingsContent />
    </Suspense>
  );
}
