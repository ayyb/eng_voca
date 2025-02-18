"use client";
import { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
}

const Alert = ({ message, type, isOpen, onClose }: AlertProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const alertStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`
        px-6 py-4 rounded-lg border
        ${alertStyles[type]}
        transition-all duration-300 ease-in-out
        shadow-lg
        text-center font-medium text-lg
        transform animate-fade-in
      `}>
        {message}
      </div>
    </div>
  );
};

export default Alert; 