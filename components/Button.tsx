// components/Button.js
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...rest } : ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium shadow-sm transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;