import HostelCard from "./HostelCard";
import HostelSkeleton from "./HostelSkeleton";

export default function HostelGrid({ hostels, isLoading, limit = 9 }) {
  // 1. LOADING STATE - Now matches the 3x3 layout
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {[...Array(limit)].map((_, i) => (
          <HostelSkeleton key={i} />
        ))}
      </div>
    );
  }

  // 2. EMPTY STATE
  if (!hostels || hostels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
        <h3 className="text-xl font-black text-slate-900 mb-1">
          No Hostels Found
        </h3>
        <p className="text-slate-500 text-sm font-medium">
          We couldn't find any hostels matching your criteria in BWP.
        </p>
      </div>
    );
  }

  // 3. POPULATED STATE (3-Column Layout for Large Screens)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {hostels.map((hostel) => (
        <HostelCard key={hostel._id} hostel={hostel} />
      ))}
    </div>
  );
}
