import React from 'react';

export const Badge = ({ className = '', variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    destructive: 'bg-red-100 text-red-900 hover:bg-red-200',
    outline: 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
    success: 'bg-green-100 text-green-900 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200',
    info: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
