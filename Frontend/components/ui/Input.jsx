export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3.5 text-gray-400">{leftIcon}</span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full py-2.5 px-4 text-sm rounded-lg border bg-white transition-all outline-none focus:ring-4
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:ring-blue-50 focus:border-blue-500 hover:border-gray-400"
            }
          `}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3.5 text-gray-400 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
