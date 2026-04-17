import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { LABELS } from '../utils/constants';

export default function LabelPicker({ selected, onChange }) {
  const toggle = (label) => {
    onChange(
      selected.includes(label)
        ? selected.filter(l => l !== label)
        : [...selected, label]
    );
  };

  return (
    <div className="
      absolute bottom-10 left-0 z-50
      bg-white border border-surface-border rounded-xl p-2 min-w-[160px]
      shadow-[0_4px_16px_rgba(0,0,0,0.12)]
    ">
      {LABELS.map(l => (
        <button
          key={l}
          onClick={() => toggle(l)}
          className="
            w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg
            text-[13px] font-semibold text-gray-600 cursor-pointer
            hover:bg-surface-hover transition-colors duration-100
            border-none bg-transparent text-left
          "
        >
          {l}
          {selected.includes(l) && (
            <CheckIcon className="w-4 h-4 text-brand-500 ml-auto shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
}
