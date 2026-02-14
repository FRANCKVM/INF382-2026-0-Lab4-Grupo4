import React from 'react';
import { ArrowLeft, ChevronRight, X, Delete } from 'lucide-react';

// --- Header ---
interface HeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  rightElement?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, onClose, rightElement, className = '' }) => (
  <div className={`flex items-center justify-between px-6 py-4 bg-white/0 ${className}`}>
    <div className="flex items-center gap-4">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-900" />
        </button>
      )}
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
    </div>
    <div className="flex items-center">
        {rightElement}
        {onClose && (
            <button onClick={onClose} className="p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={24} className="text-slate-900" />
            </button>
        )}
    </div>
  </div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = "py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700",
    secondary: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

// --- Number Pad ---
interface NumberPadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onPress, onDelete }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  return (
    <div className="grid grid-cols-3 gap-y-4 gap-x-8 px-6 mt-8">
      {keys.map((k) => (
        <button 
          key={k}
          onClick={() => onPress(k)}
          className="h-16 text-2xl font-medium text-slate-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          {k}
        </button>
      ))}
      <button 
        onClick={onDelete}
        className="h-16 flex items-center justify-center text-slate-900 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Delete size={28} />
      </button>
    </div>
  );
};

// --- Selection Card ---
interface SelectionCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ icon, title, subtitle, value, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${selected ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
  >
    <div className="flex items-center gap-4">
      {icon && <div className="p-3 bg-gray-50 rounded-xl text-blue-600">{icon}</div>}
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
    <div className="flex items-center gap-3">
        {value && <span className="font-semibold text-slate-900">{value}</span>}
        {selected !== undefined && (
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                {selected && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
        )}
    </div>
  </div>
);