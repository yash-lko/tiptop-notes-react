import React from 'react';
import { NOTE_COLORS } from '../utils/constants';

export default function ColorPicker({ selected, onChange, onClose }) {
  return (
    <div className="
      absolute bottom-10 left-0 z-50
      bg-white border border-surface-border rounded-xl p-2.5
      flex flex-wrap gap-1.5 w-48
      shadow-[0_4px_16px_rgba(0,0,0,0.12)]
    ">
      {NOTE_COLORS.map(col => (
        <button
          key={col.name}
          title={col.label}
          onClick={() => { onChange(col.name); onClose(); }}
          className={`
            w-6 h-6 rounded-full cursor-pointer border-2
            transition-transform duration-150 hover:scale-125
            ${selected === col.name ? 'border-gray-700' : 'border-transparent'}
          `}
          style={{ background: col.bg, borderColor: selected === col.name ? '#374151' : col.border }}
        />
      ))}
    </div>
  );
}
