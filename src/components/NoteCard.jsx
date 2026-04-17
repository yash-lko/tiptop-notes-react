import React from 'react';
import {
  MapPinIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
import { resolveColor, formatDate } from '../utils/helpers';
import useNotesStore from '../store/useNotesStore';
import useUIStore    from '../store/useUIStore';

export default function NoteCard({ note }) {
  const { deleteNote, archiveNote, restoreNote, togglePin } = useNotesStore();
  const { openEdit, showToast } = useUIStore();

  const c = resolveColor(note.color);

  const handleDelete = (e) => {
    e.stopPropagation();
    const msg = deleteNote(note.id);
    showToast(`Note ${msg}`);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    const msg = archiveNote(note.id);
    showToast(`Note ${msg}`);
  };

  const handleRestore = (e) => {
    e.stopPropagation();
    restoreNote(note.id);
    showToast('Note restored');
  };

  const handlePin = (e) => {
    e.stopPropagation();
    togglePin(note.id);
  };

  return (
    <div
      className="
        relative rounded-2xl border-[1.5px] p-3.5 cursor-pointer
        transition-all duration-200 animate-noteIn
        hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]
        group
      "
      style={{ background: c.bg, borderColor: c.border }}
      onClick={() => openEdit(note)}
    >
    
      {note.pinned && (
        <div className="absolute top-2.5 right-2.5 text-brand-500">
          <MapPinSolid className="w-4 h-4" />
        </div>
      )}

    
      {note.title && (
        <p className="text-[15px] font-bold text-gray-800 mb-1.5 leading-snug break-words pr-5">
          {note.title}
        </p>
      )}

   
      {note.body && (
        <p className="text-[13px] font-medium text-gray-500 leading-relaxed break-words note-body-clamp">
          {note.body}
        </p>
      )}

  
      <div className="flex items-center justify-between flex-wrap gap-1.5 mt-2.5">
        <div className="flex gap-1 flex-wrap">
          {note.labels.map(l => (
            <span
              key={l}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/[0.06] text-gray-500"
            >
              {l}
            </span>
          ))}
        </div>
        <span className="text-[11px] font-semibold text-gray-400">
          {formatDate(note.updatedAt)}
        </span>
      </div>

    
      <div
        className="
          absolute bottom-2.5 left-1 flex gap-0.5
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
        "
        onClick={e => e.stopPropagation()}
      >
        {!note.trashed && (
          <>
            <ActionBtn
              icon={note.pinned
                ? <MapPinSolid className="w-4 h-4" />
                : <MapPinIcon  className="w-4 h-4" />
              }
              title={note.pinned ? 'Unpin' : 'Pin'}
              onClick={handlePin}
            />
            <ActionBtn
              icon={<ArchiveBoxIcon className="w-4 h-4" />}
              title={note.archived ? 'Unarchive' : 'Archive'}
              onClick={handleArchive}
            />
          </>
        )}
        {note.trashed && (
          <ActionBtn
            icon={<ArrowUturnLeftIcon className="w-4 h-4" />}
            title="Restore"
            onClick={handleRestore}
          />
        )}
        <ActionBtn
          icon={<TrashIcon className="w-4 h-4" />}
          title="Delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

function ActionBtn({ icon, title, onClick }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="
        w-7 h-7 flex items-center justify-center rounded-full
        border-none bg-black/[0.05] text-gray-500 cursor-pointer
        hover:bg-brand-500 hover:text-white
        transition-all duration-150
      "
    >
      {icon}
    </button>
  );
}
