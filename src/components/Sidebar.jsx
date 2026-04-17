import React from 'react';
import {
  DocumentTextIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { LABELS, LABEL_COLORS, VIEWS } from '../utils/constants';
import useUIStore from '../store/useUIStore';

function SidebarItem({ icon: Icon, label, active, onClick, dot }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5
        rounded-r-full mr-2 text-sm font-semibold cursor-pointer
        transition-all duration-150 text-left border-none
        ${active
          ? 'bg-brand-300 text-brand-500'
          : 'text-gray-500 bg-transparent hover:bg-surface-hover hover:text-brand-500'
        }
      `}
    >
      {dot
        ? <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: dot }} />
        : Icon && <Icon className="w-[18px] h-[18px] shrink-0" />
      }
      {label}
    </button>
  );
}

export default function Sidebar() {
  const { view, activeLabel, setView, toggleLabel, sidebarOpen } = useUIStore();

  return (
    <aside
      className={`
        flex-shrink-0 bg-surface border-r border-surface-border
        p-3 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto
        scrollbar-thin transition-all duration-250
        ${sidebarOpen ? 'w-60' : 'w-0 p-0 overflow-hidden'}
      `}
    >
      <SidebarItem
        icon={DocumentTextIcon}
        label="Notes"
        active={view === VIEWS.NOTES && !activeLabel}
        onClick={() => setView(VIEWS.NOTES)}
      />
      <SidebarItem
        icon={ArchiveBoxIcon}
        label="Archive"
        active={view === VIEWS.ARCHIVE}
        onClick={() => setView(VIEWS.ARCHIVE)}
      />
      <SidebarItem
        icon={TrashIcon}
        label="Trash"
        active={view === VIEWS.TRASH}
        onClick={() => setView(VIEWS.TRASH)}
      />
      {LABELS.length > 0 && (
        <>
          <p className="text-[11px] font-bold text-gray-300 tracking-widest uppercase px-4 pt-4 pb-1.5">
            Labels
          </p>
          {LABELS.map((l, i) => (
            <SidebarItem
              key={l}
              label={l}
              dot={LABEL_COLORS[i % LABEL_COLORS.length]}
              active={activeLabel === l}
              onClick={() => toggleLabel(l)}
            />
          ))}
        </>
      )}
    </aside>
  );
}
