import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  variant: 'primary' | 'danger';
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  loading,
  disabled,
  variant,
  children,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center w-30 px-3 py-1 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 truncate';

  const variantClasses = {
    primary:
      'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300',
    danger:
      'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {loading && (
        <svg
          className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default ActionButton;
