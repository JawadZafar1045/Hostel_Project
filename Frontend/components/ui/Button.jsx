const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '' 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] focus:ring-[#7C3AED]',
    secondary: 'bg-purple-50 text-[#7C3AED] hover:bg-purple-100 focus:ring-[#7C3AED]',
    outline: 'border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-purple-50 focus:ring-[#7C3AED]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
