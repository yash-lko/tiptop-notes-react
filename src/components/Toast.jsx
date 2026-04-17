import React from 'react';
import useUIStore from '../store/useUIStore';

export default function Toast() {
  const toast = useUIStore(s => s.toast);
  if (!toast) return null;

  return (
    <div className="
      fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]
      bg-gray-800 text-white text-[13px] font-semibold
      px-5 py-2.5 rounded-xl
      animate-toastIn pointer-events-none
    ">
      {toast}
    </div>
  );
}
