import { NOTE_COLORS } from './constants';

// ─── Unique ID ─────────────────────────────────────────────────────────────────
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ─── Human-readable relative date ─────────────────────────────────────────────
export function formatDate(ts) {
  const d   = new Date(ts);
  const now = new Date();
  const diff = now - d;

  if (diff < 60_000)     return 'just now';
  if (diff < 3_600_000)  return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: '2-digit',
  });
}

// ─── Resolve a colour object by name ──────────────────────────────────────────
export function resolveColor(name) {
  return NOTE_COLORS.find(c => c.name === name) ?? NOTE_COLORS[0];
}
