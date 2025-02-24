import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "confirm";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-blue-500 text-white hover:bg-blue-700",
    confirm: "bg-confirm text-black hover:bg-blue-300",
    white: "bg-white text-black hover:bg-gray-100 border border-gray-200"
  };

  return (
    <button
      className={`w-full p-3 rounded-lg transition-colors duration-200 text-lg font-medium
                 ${variantStyles[variant]}
                 disabled:bg-gray-400 disabled:cursor-not-allowed
                 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 