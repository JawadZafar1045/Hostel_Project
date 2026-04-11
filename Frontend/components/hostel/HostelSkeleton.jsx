export default function HostelSkeleton() {
  return (
    <div className="min-w-[80vw] md:min-w-[340px] xl:min-w-[calc(25%-18px)] snap-start">
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
        <div className="aspect-[16/9] bg-slate-200" />

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 rounded-md w-3/4" />
            <div className="h-3 bg-slate-100 rounded-md w-1/2" />
          </div>

          <div className="flex gap-1 py-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 w-3 bg-slate-100 rounded-full" />
            ))}
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
            <div className="h-6 bg-slate-200 rounded-md w-1/3" />
            <div className="h-4 bg-slate-100 rounded-md w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
