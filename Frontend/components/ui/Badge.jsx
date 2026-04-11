const styles = {
  approved: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-800",
  boys: "bg-blue-100 text-blue-800",
  girls: "bg-pink-100 text-pink-800",
  mixed: "bg-green-100 text-green-800",
  new: "bg-amber-100 text-amber-900 font-semibold",
  featured: "bg-blue-50 text-blue-700 font-semibold border border-blue-200",
  info: "bg-blue-50 text-blue-700",
};

const defaultLabels = {
  approved: "Approved",
  pending: "Pending Review",
  rejected: "Rejected",
  boys: "Boys Only",
  girls: "Girls Only",
  mixed: "Mixed",
  new: "NEW",
  featured: "Featured",
  info: "Info",
};

export default function Badge({ variant = "info", label, className = "" }) {
  const baseStyles =
    "inline-flex items-center text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap";

  const combinedClasses =
    `${baseStyles} ${styles[variant] || styles.info} ${className}`.trim();

  return (
    <span className={combinedClasses}>{label ?? defaultLabels[variant]}</span>
  );
}
