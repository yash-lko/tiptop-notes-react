import { create } from 'zustand';
import { generateId } from '../utils/helpers';

// ─── Persist notes in localStorage ───────────────────────────────────────────
const load = () => {
  try { return JSON.parse(localStorage.getItem('notes_v2') || '[]'); }
  catch { return []; }
};
const save = (notes) => localStorage.setItem('notes_v2', JSON.stringify(notes));

// ─── Zustand store ────────────────────────────────────────────────────────────
const useNotesStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  notes: load(),

  // ── Helpers ────────────────────────────────────────────────────────────────
  _update(id, changes) {
    const notes = get().notes.map(n =>
      n.id === id ? { ...n, ...changes, updatedAt: Date.now() } : n
    );
    save(notes);
    set({ notes });
  },

  // ── CRUD ───────────────────────────────────────────────────────────────────
  addNote({ title, body, color, labels }) {
    const note = {
      id: generateId(),
      title:    title.trim(),
      body:     body.trim(),
      color:    color || 'default',
      labels:   labels || [],
      pinned:   false,
      archived: false,
      trashed:  false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const notes = [note, ...get().notes];
    save(notes);
    set({ notes });
  },

  updateNote(id, changes) {
    get()._update(id, changes);
  },

  deleteNote(id) {
    const note = get().notes.find(n => n.id === id);
    if (note?.trashed) {
      // Permanent delete
      const notes = get().notes.filter(n => n.id !== id);
      save(notes);
      set({ notes });
      return 'permanently deleted';
    } else {
      get()._update(id, { trashed: true, archived: false, pinned: false });
      return 'moved to trash';
    }
  },

  archiveNote(id) {
    const note = get().notes.find(n => n.id === id);
    if (!note) return;
    if (note.archived) {
      get()._update(id, { archived: false });
      return 'unarchived';
    } else {
      get()._update(id, { archived: true, pinned: false });
      return 'archived';
    }
  },

  restoreNote(id) {
    get()._update(id, { trashed: false });
  },

  togglePin(id) {
    const note = get().notes.find(n => n.id === id);
    if (!note) return;
    get()._update(id, { pinned: !note.pinned });
  },
}));

export default useNotesStore;
