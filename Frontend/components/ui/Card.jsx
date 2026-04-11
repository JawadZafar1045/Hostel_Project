export default function Card({ children, className = "", padding = true }) {
  const baseStyles =
    "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden w-full";

  const paddingStyle = padding ? "p-4 md:p-6" : "";

  return (
    <div className={`${baseStyles} ${paddingStyle} ${className}`}>
      {children}
    </div>
  );
}
