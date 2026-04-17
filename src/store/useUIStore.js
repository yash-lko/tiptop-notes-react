import { create } from 'zustand';
import { VIEWS } from '../utils/constants';

// ─── UI state store ───────────────────────────────────────────────────────────
const useUIStore = create((set, get) => ({
  // ── Navigation ─────────────────────────────────────────────────────────────
  view:        VIEWS.NOTES,
  activeLabel: null,
  setView(v)        { set({ view: v, activeLabel: null }); },
  setActiveLabel(l) { set({ activeLabel: l, view: VIEWS.NOTES }); },
  toggleLabel(l)    {
    set({ activeLabel: get().activeLabel === l ? null : l, view: VIEWS.NOTES });
  },

  // ── Search ─────────────────────────────────────────────────────────────────
  searchQuery: '',
  setSearchQuery(q) { set({ searchQuery: q }); },

  // ── Layout ─────────────────────────────────────────────────────────────────
  isGridView:  true,
  sidebarOpen: true,
  toggleGridView()  { set(s => ({ isGridView: !s.isGridView })); },
  toggleSidebar()   { set(s => ({ sidebarOpen: !s.sidebarOpen })); },

  // ── Edit modal ─────────────────────────────────────────────────────────────
  editNote: null,
  openEdit(note)  { set({ editNote: { ...note } }); },
  closeEdit()     { set({ editNote: null }); },
  patchEdit(diff) { set(s => ({ editNote: s.editNote ? { ...s.editNote, ...diff } : null })); },

  // ── Toast ──────────────────────────────────────────────────────────────────
  toast: null,
  _toastTimer: null,
  showToast(msg) {
    if (get()._toastTimer) clearTimeout(get()._toastTimer);
    const t = setTimeout(() => set({ toast: null, _toastTimer: null }), 2200);
    set({ toast: msg, _toastTimer: t });
  },
}));

export default useUIStore;
