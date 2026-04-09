const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-800 shadow-blue active:bg-blue-900",
  secondary:
    "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200",
  ghost: "bg-transparent text-ink-mid hover:bg-gray-100 border border-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  outline:
    "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-md h-8",
  md: "px-4 py-2.5 text-sm rounded-lg h-10",
  lg: "px-5 py-3 text-sm rounded-lg h-12",
  xl: "px-7 py-4 text-base rounded-xl h-14",
};

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  disabled,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none";

  const combinedClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
