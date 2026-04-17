import React from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Squares2X2Icon,
  Bars4Icon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import useUIStore from '../store/useUIStore';

export default function Navbar() {
  const {
    searchQuery, setSearchQuery,
    isGridView,  toggleGridView,
    toggleSidebar,
  } = useUIStore();

  return (
    <nav className="
      sticky top-0 z-50 flex items-center gap-3 px-4 h-16
      bg-surface border-b border-surface-border
    ">

      <button
        onClick={toggleSidebar}
        className="icon-nav-btn"
        aria-label="Toggle sidebar"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>

      <a
        href="#"
        onClick={e => e.preventDefault()}
        className="flex items-center gap-2 font-caveat text-[26px] font-semibold
                   text-brand-500 no-underline whitespace-nowrap tracking-tight"
      >
        <DocumentTextIcon className="w-7 h-7 text-brand-500" />
        <span className="hidden sm:inline">TipTop Notes</span>
      </a>

      <div className="
        flex-1 max-w-2xl mx-auto flex items-center gap-2.5 px-3.5
        bg-surface-hover border-[1.5px] border-transparent rounded-xl
        transition-all duration-200
        focus-within:bg-white focus-within:border-brand-500 focus-within:shadow-[0_2px_8px_rgba(230,126,34,0.12)]
      ">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="
            flex-1 border-none bg-transparent outline-none
            font-nunito text-[15px] text-gray-800 py-2.5
            placeholder:text-gray-400
          "
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-brand-500 shrink-0"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <button
        onClick={toggleGridView}
        className="icon-nav-btn"
        title={isGridView ? 'List view' : 'Grid view'}
      >
        {isGridView
          ? <Bars4Icon       className="w-5 h-5" />
          : <Squares2X2Icon  className="w-5 h-5" />
        }
      </button>

      <style>{`
        .icon-nav-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border: none; background: transparent; cursor: pointer;
          border-radius: 9999px; color: #666; transition: all 0.15s; flex-shrink: 0;
        }
        .icon-nav-btn:hover { background: #f0ebe4; color: #e67e22; }
      `}</style>
    </nav>
  );
}
