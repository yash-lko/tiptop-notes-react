import React from 'react';
export default function IconButton({ icon, onClick, title, className = '' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        w-8 h-8 flex items-center justify-content-center border-none bg-transparent
        rounded-full cursor-pointer text-gray-500
        hover:bg-surface-hover hover:text-brand-500
        transition-all duration-150 justify-center
        ${className}
      `}
    >
      {icon}
    </button>
  );
}
