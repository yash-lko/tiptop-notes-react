import React, { useState, useEffect } from 'react';
import {
  SwatchIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  MapPinIcon as MapPinSolid,
} from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';
import ColorPicker from './ColorPicker';
import LabelPicker from './LabelPicker';
import { resolveColor } from '../utils/helpers';
import useNotesStore from '../store/useNotesStore';
import useUIStore    from '../store/useUIStore';

export default function EditModal() {
  const { editNote, closeEdit, showToast } = useUIStore();
  const { updateNote, deleteNote, togglePin } = useNotesStore();

  const [title,      setTitle]      = useState('');
  const [body,       setBody]       = useState('');
  const [color,      setColor]      = useState('default');
  const [labels,     setLabels]     = useState([]);
  const [pinned,     setPinned]     = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setBody(editNote.body);
      setColor(editNote.color);
      setLabels(editNote.labels);
      setPinned(editNote.pinned);
    }
  }, [editNote]);

  if (!editNote) return null;

  const c = resolveColor(color);

  const save = () => {
    updateNote(editNote.id, { title, body, color, labels, pinned });
    closeEdit();
    showToast('Note saved');
  };

  const handleDelete = () => {
    const msg = deleteNote(editNote.id);
    closeEdit();
    showToast(`Note ${msg}`);
  };

  const handlePin = () => {
    togglePin(editNote.id);
    setPinned(p => !p);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) save();
  };

  // Close pickers on outside click
  const handlePickerClose = (e) => {
    if (!e.target.closest('[data-picker]')) {
      setShowColors(false);
      setShowLabels(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[500] flex items-center justify-center p-5
        bg-black/45 animate-fadeIn
      "
      onClick={handleOverlayClick}
      onMouseDown={handlePickerClose}
    >
      <div
        className="
          w-full max-w-[580px] max-h-[80vh] overflow-y-auto
          rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          animate-slideUp border-[1.5px]
        "
        style={{ background: c.bg, borderColor: c.border }}
        onClick={e => e.stopPropagation()}
      >
        {/* Body */}
        <div className="px-6 py-5">
          <input
            className="
              w-full border-none outline-none bg-transparent
              font-nunito text-lg font-extrabold text-gray-800 mb-3
              placeholder:text-gray-300
            "
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="
              w-full border-none outline-none bg-transparent resize-none
              font-nunito text-sm font-medium text-gray-500 leading-relaxed min-h-[120px]
              placeholder:text-gray-300
            "
            placeholder="Note..."
            rows={6}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="
          flex items-center justify-between flex-wrap gap-2
          px-5 py-3 border-t border-black/[0.06]
        ">
          {/* Left: action buttons */}
          <div className="flex items-center gap-0.5">
            {/* Color picker */}
            <div className="relative" data-picker>
              <ModalIconBtn
                icon={<SwatchIcon className="w-[17px] h-[17px]" />}
                title="Change colour"
                onClick={() => { setShowColors(p => !p); setShowLabels(false); }}
              />
              {showColors && (
                <ColorPicker
                  selected={color}
                  onChange={setColor}
                  onClose={() => setShowColors(false)}
                />
              )}
            </div>

            {/* Label picker */}
            <div className="relative" data-picker>
              <ModalIconBtn
                icon={<TagIcon className="w-[17px] h-[17px]" />}
                title="Add label"
                onClick={() => { setShowLabels(p => !p); setShowColors(false); }}
              />
              {showLabels && (
                <LabelPicker selected={labels} onChange={setLabels} />
              )}
            </div>

            {/* Pin toggle */}
            <ModalIconBtn
              icon={pinned
                ? <MapPinSolid className="w-[17px] h-[17px] text-brand-500" />
                : <MapPinIcon  className="w-[17px] h-[17px]" />
              }
              title={pinned ? 'Unpin' : 'Pin'}
              onClick={handlePin}
            />
          </div>

          {/* Right: delete + save */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold
                text-gray-500 hover:bg-red-50 hover:text-red-500
                border-none bg-transparent cursor-pointer transition-colors duration-150
              "
            >
              <TrashIcon className="w-4 h-4" /> Delete
            </button>
            <button
              onClick={save}
              className="
                px-5 py-1.5 rounded-lg text-sm font-bold
                bg-brand-500 text-white hover:bg-brand-600
                border-none cursor-pointer transition-colors duration-150
              "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Small icon button inside the modal ────────────────────────────────────────
function ModalIconBtn({ icon, title, onClick }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="
        w-[34px] h-[34px] flex items-center justify-center
        border-none bg-transparent rounded-full cursor-pointer
        text-gray-500 hover:bg-black/[0.08] hover:text-brand-500
        transition-all duration-150
      "
    >
      {icon}
    </button>
  );
}
