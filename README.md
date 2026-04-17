# TipTop Notes — Refactored

A Google-Keep-style notes app rebuilt with **Tailwind CSS**, **Zustand**, and **Heroicons**, split into small focused components.

---

## Quick start

```bash
npm install
npm start
```

---

## Folder structure

```
src/
├── styles/
│   └── index.css          # Tailwind directives + custom utilities (scrollbar, masonry, etc.)
│
├── utils/
│   ├── constants.js       # NOTE_COLORS, LABELS, LABEL_COLORS, VIEWS
│   └── helpers.js         # generateId(), formatDate(), resolveColor()
│
├── store/
│   ├── useNotesStore.js   # Zustand — all notes CRUD (add, update, delete, archive, pin)
│   └── useUIStore.js      # Zustand — UI state (view, search, sidebar, modal, toast)
│
├── components/
│   ├── Navbar.jsx         # Top bar: hamburger, logo, search, grid/list toggle
│   ├── Sidebar.jsx        # Left nav: Notes / Archive / Trash + label list
│   ├── NoteComposer.jsx   # Collapsed/expanded new-note input at top of feed
│   ├── NoteCard.jsx       # Single note card with hover actions
│   ├── NotesGrid.jsx      # Masonry/list grid with pinned + others sections
│   ├── EditModal.jsx      # Full-screen modal for editing an existing note
│   ├── ColorPicker.jsx    # Reusable colour swatch popup
│   ├── LabelPicker.jsx    # Reusable label checkbox popup
│   ├── FilterChip.jsx     # Dismissible chip shown when a label filter is active
│   ├── IconButton.jsx     # Generic circular ghost icon button
│   └── Toast.jsx          # Bottom-center toast notification
│
├── App.js                 # Layout shell — wires all components together
└── index.js               # React root entry point
```

---

## Key decisions

| Topic | Choice | Why |
|---|---|---|
| Styling | Tailwind CSS v3 | Utility-first, co-located, no class name collisions |
| Icons | `@heroicons/react` | Official Tailwind icons, tree-shakable |
| State | Zustand (2 stores) | Minimal boilerplate; `useNotesStore` owns data, `useUIStore` owns UI |
| Persistence | `localStorage` | Simple; written on every `notes` mutation inside the store |
| Layout | CSS columns (`notes-masonry`) | Native masonry without a library |
| CSS | Separate `src/styles/index.css` | Global resets + custom utilities live in one place |
