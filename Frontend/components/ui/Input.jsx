import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={props.id || props.name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all w-full ${
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:ring-purple-100 focus:border-[#7C3AED]'
        } ${className}`}
        {...props}
      />
      {error && typeof error === 'string' && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
