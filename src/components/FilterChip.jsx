import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useUIStore from '../store/useUIStore';

export default function FilterChip() {
  const { activeLabel, setActiveLabel } = useUIStore();
  if (!activeLabel) return null;

  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      <button
        onClick={() => setActiveLabel(null)}
        className="
          flex items-center gap-1.5 px-3 py-1.5
          bg-brand-300 rounded-full
          text-[13px] font-bold text-brand-500 cursor-pointer
          border-[1.5px] border-brand-200
          hover:bg-brand-200 transition-colors duration-150
        "
      >
        {activeLabel}
        <XMarkIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
