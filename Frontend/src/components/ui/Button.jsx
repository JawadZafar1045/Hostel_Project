import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-800 shadow-blue active:bg-blue-900",
      secondary:
        "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200",
      ghost:
        "bg-transparent text-ink-mid hover:bg-gray-100 border border-gray-200",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
      outline:
        "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-md gap-1.5 h-8",
      md: "px-4 py-2.5 text-sm rounded-lg gap-2 h-10",
      lg: "px-5 py-3 text-sm rounded-lg gap-2 h-12",
      xl: "px-7 py-4 text-base rounded-xl gap-2.5 h-14",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
          "select-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : leftIcon}
        {isLoading ? size === "sm" ? null : <span>Loading...</span> : children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
