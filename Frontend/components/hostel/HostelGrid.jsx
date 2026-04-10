import HostelCard from "./HostelCard";
import HostelSkeleton from "./HostelSkeleton";

export default function HostelGrid({ hostels, isLoading }) {
  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <HostelSkeleton key={i} />
        ))}
      </div>
    );
  }

  // 2. EMPTY STATE
  if (!hostels || hostels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          No Hostels Found
        </h3>
        <p className="text-slate-500">
          We couldn't find any hostels matching your criteria in BWP.
        </p>
      </div>
    );
  }

  // 3. POPULATED STATE (1-2-3-4 Col Layout)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {hostels.map((hostel) => (
        <HostelCard key={hostel._id} hostel={hostel} />
      ))}
    </div>
  );
}
