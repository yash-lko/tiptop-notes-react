import React, { useState, useRef, useEffect } from 'react';
import {
  PlusIcon,
  SwatchIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import ColorPicker from './ColorPicker';
import LabelPicker from './LabelPicker';
import useNotesStore from '../store/useNotesStore';
import useUIStore    from '../store/useUIStore';

// ─── NoteComposer ─────────────────────────────────────────────────────────────
export default function NoteComposer() {
  const addNote   = useNotesStore(s => s.addNote);
  const showToast = useUIStore(s => s.showToast);

  const [open,       setOpen]       = useState(false);
  const [title,      setTitle]      = useState('');
  const [body,       setBody]       = useState('');
  const [color,      setColor]      = useState('default');
  const [labels,     setLabels]     = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  const wrapRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('[data-picker]')) {
        setShowColors(false);
        setShowLabels(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const save = () => {
    if (!title.trim() && !body.trim()) { setOpen(false); return; }
    addNote({ title, body, color, labels });
    setTitle(''); setBody(''); setColor('default'); setLabels([]);
    setOpen(false);
    showToast('Note added!');
  };

  return (
    <div className="max-w-[680px] mx-auto mb-8">
      <div className={`
        bg-white border-[1.5px] border-surface-border rounded-2xl overflow-hidden
        shadow-sm transition-shadow duration-200
        focus-within:shadow-[0_4px_20px_rgba(230,126,34,0.14)] focus-within:border-brand-500
      `}>
        {!open ? (
       
          <div
            className="flex items-center gap-3 px-4 py-3.5 cursor-text text-gray-400 font-medium text-[15px]"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="w-5 h-5 text-gray-300" />
            Take a note...
          </div>
        ) : (
         
          <>
            <div className="px-4 pt-4">
              <input
                autoFocus
                className="
                  w-full border-none outline-none bg-transparent
                  font-nunito text-base font-bold text-gray-800 mb-2
                  placeholder:text-gray-300 placeholder:font-semibold
                "
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                className="composer-textarea"
                placeholder="Take a note..."
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={3}
                onKeyDown={e => { if (e.key === 'Escape') save(); }}
              />
            </div>

          
            <div className="
              flex items-center justify-between flex-wrap gap-2
              px-3.5 py-2.5 border-t border-surface-hover
            ">
            
              <div className="flex items-center gap-0.5">
              
                <div className="relative" data-picker>
                  <button
                    onClick={() => { setShowColors(p => !p); setShowLabels(false); }}
                    className="icon-action-btn"
                    title="Change colour"
                  >
                    <SwatchIcon className="w-[17px] h-[17px]" />
                  </button>
                  {showColors && (
                    <ColorPicker
                      selected={color}
                      onChange={setColor}
                      onClose={() => setShowColors(false)}
                    />
                  )}
                </div>

              
                <div className="relative" data-picker>
                  <button
                    onClick={() => { setShowLabels(p => !p); setShowColors(false); }}
                    className="icon-action-btn"
                    title="Add label"
                  >
                    <TagIcon className="w-[17px] h-[17px]" />
                  </button>
                  {showLabels && (
                    <LabelPicker selected={labels} onChange={setLabels} />
                  )}
                </div>
              </div>

            
              <div className="flex items-center gap-2">
                {labels.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {labels.map(l => (
                      <span
                        key={l}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/[0.06] text-gray-600"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={save}
                  className="
                    px-4 py-1.5 rounded-lg text-sm font-bold
                    bg-brand-500 text-white hover:bg-brand-600
                    transition-colors duration-150 border-none cursor-pointer
                  "
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>

   
      <style>{`
        .icon-action-btn {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border: none; background: transparent; cursor: pointer;
          border-radius: 9999px; color: #888;
          transition: all 0.15s;
        }
        .icon-action-btn:hover { background: #f0ebe4; color: #e67e22; }
      `}</style>
    </div>
  );
}
