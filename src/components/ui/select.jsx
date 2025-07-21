import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ children, value, onValueChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => !disabled && setIsOpen(!isOpen),
            isOpen,
            disabled,
          });
        }
        if (child.type === SelectContent && isOpen) {
          return React.cloneElement(child, {
            onSelect: (selectedValue) => {
              onValueChange(selectedValue);
              setIsOpen(false);
            },
            onClose: () => setIsOpen(false),
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger = ({ children, className = '', onClick, isOpen, disabled }) => {
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export const SelectValue = ({ placeholder = 'Select...', value }) => {
  return <span className="truncate">{value || placeholder}</span>;
};

export const SelectContent = ({ children, className = '', onSelect, onClose }) => {
  return (
    <div className="relative">
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className={`absolute top-1 left-0 right-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-lg ${className}`}>
        <div className="p-1 max-h-60 overflow-y-auto">
          {React.Children.map(children, (child) => {
            if (child.type === SelectItem) {
              return React.cloneElement(child, { onSelect });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

export const SelectItem = ({ children, value, onSelect, className = '' }) => {
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${className}`}
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};
