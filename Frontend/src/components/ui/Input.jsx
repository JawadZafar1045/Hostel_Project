"use client";

import { forwardRef, useState } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef(
  (
    {
      label,
      error,
      success,
      hint,
      leftIcon,
      rightElement,
      showCount,
      className,
      id,
      value,
      onChange,
      maxLength,
      required,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const charCount = typeof value === "string" ? value.length : 0;

    // Logic to ensure label stays up if there is text or focus
    const isFloating = isFocused || (value && value.length > 0);

    // Precision 1px border logic with semantic state colors
    const stateClasses = error
      ? "border-red-500"
      : success
        ? "border-emerald-500"
        : isFocused
          ? "border-blue-600"
          : "border-gray-200";

    const labelColor = error
      ? "text-red-600"
      : success
        ? "text-emerald-600"
        : isFocused
          ? "text-blue-600"
          : "text-gray-500";

    return (
      <div
        className={cn("relative flex flex-col w-full group pt-2", className)}
      >
        <div
          className={cn(
            "relative flex items-center w-full rounded-lg border transition-all duration-200 bg-white h-12",
            stateClasses,
          )}
        >
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-20 bg-white leading-none",
                isFloating
                  ? "-top-2 text-[10px] font-bold uppercase tracking-widest"
                  : "top-1/2 -translate-y-1/2 text-sm font-medium",
                labelColor,
                leftIcon && !isFloating && "ml-8",
              )}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}

          {leftIcon && (
            <span
              className={cn(
                "absolute left-4 transition-colors duration-200 z-10",
                isFocused ? "text-blue-600" : "text-gray-400",
              )}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full bg-transparent border-none px-4 text-sm font-medium text-gray-900 outline-none z-10 h-full",
              leftIcon && "pl-11",
              rightElement && "pr-11",
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-4 flex items-center z-20">
              {rightElement}
            </div>
          )}
        </div>

        {/* Messaging & Count */}
        <div className="flex items-center justify-between mt-1.5 px-1 min-h-4">
          <div className="flex-1">
            {error && (
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-tight">
                {error}
              </p>
            )}
            {success && (
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">
                {success}
              </p>
            )}
            {hint && !error && !success && (
              <p className="text-[10px] text-gray-400 font-medium italic">
                {hint}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <span className="text-[9px] font-mono text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
