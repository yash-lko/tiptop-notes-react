// ─── Note colour palette ──────────────────────────────────────────────────────
export const NOTE_COLORS = [
  { name: 'default', bg: '#ffffff', border: '#e0e0e0', label: 'White'  },
  { name: 'red',     bg: '#FFCDD2', border: '#EF9A9A', label: 'Red'    },
  { name: 'orange',  bg: '#FFE0B2', border: '#FFCC80', label: 'Orange' },
  { name: 'yellow',  bg: '#FFF9C4', border: '#FFF176', label: 'Yellow' },
  { name: 'green',   bg: '#DCEDC8', border: '#C5E1A5', label: 'Green'  },
  { name: 'teal',    bg: '#B2DFDB', border: '#80CBC4', label: 'Teal'   },
  { name: 'blue',    bg: '#BBDEFB', border: '#90CAF9', label: 'Blue'   },
  { name: 'purple',  bg: '#E1BEE7', border: '#CE93D8', label: 'Purple' },
  { name: 'pink',    bg: '#F8BBD0', border: '#F48FB1', label: 'Pink'   },
  { name: 'brown',   bg: '#D7CCC8', border: '#BCAAA4', label: 'Brown'  },
];

// ─── Label list ───────────────────────────────────────────────────────────────
export const LABELS = ['Work', 'Personal', 'Shopping', 'Ideas', 'Important', 'Study'];

// ─── Label dot colours (one per label, same order) ────────────────────────────
export const LABEL_COLORS = [
  '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6',
];

// ─── View identifiers ─────────────────────────────────────────────────────────
export const VIEWS = {
  NOTES:   'notes',
  ARCHIVE: 'archive',
  TRASH:   'trash',
};
