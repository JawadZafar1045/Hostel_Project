import { Star } from "lucide-react";

export default function StarRating({ rating, reviewCount, size = "sm" }) {
  const iconSize = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  const fontSize = size === "lg" ? "text-sm" : "text-[11px]";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${iconSize} ${
              i <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200"
            }`}
          />
        ))}
      </div>

      {reviewCount !== undefined && (
        <span className={`${fontSize} font-medium text-slate-400`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
