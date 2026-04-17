import { DocumentTextIcon } from '@heroicons/react/24/outline';
import NoteCard  from './NoteCard';
import useUIStore    from '../store/useUIStore';
import useNotesStore from '../store/useNotesStore';
import { VIEWS } from '../utils/constants';

function SectionTitle({ label }) {
  return (
    <p className="text-[11px] font-extrabold text-gray-300 tracking-[1.2px] uppercase mb-3.5 pl-1">
      {label}
    </p>
  );
}


function EmptyState({ view, searchQuery }) {
  const msg =
    view === VIEWS.TRASH   ? { h: 'Trash is empty',   sub: '' } :
    view === VIEWS.ARCHIVE ? { h: 'Nothing archived', sub: '' } :
    searchQuery            ? { h: 'No notes found',   sub: '' } :
                             { h: 'No notes yet',     sub: 'Click above to create your first note!' };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-300 text-center">
      <DocumentTextIcon className="w-20 h-20 mb-5 opacity-40 "/>
      <h3 className="text-lg font-bold mb-2">{msg.h}</h3>
      {msg.sub && <p className="text-sm font-medium">{msg.sub}</p>}
    </div>
  );
}

export default function NotesGrid() {
  const notes       = useNotesStore(s => s.notes);
  const { view, activeLabel, searchQuery, isGridView } = useUIStore();

 
  const filtered = notes.filter(n => {
    if (view === VIEWS.ARCHIVE) return n.archived && !n.trashed;
    if (view === VIEWS.TRASH)   return n.trashed;
    return !n.archived && !n.trashed;
  }).filter(n => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
  }).filter(n => {
    if (!activeLabel) return true;
    return n.labels.includes(activeLabel);
  });

  const pinned   = filtered.filter(n => n.pinned);
  const unpinned = filtered.filter(n => !n.pinned);

  const gridClass = isGridView ? 'notes-masonry' : 'notes-list';

  if (filtered.length === 0) {
    return <EmptyState view={view} searchQuery={searchQuery} />;
  }

  return (
    <>
      {pinned.length > 0 && (
        <section className="mb-6">
          <SectionTitle label="Pinned" />
          <div className={gridClass}>
            {pinned.map(n => <NoteCard key={n.id} note={n} />)}
          </div>
        </section>
      )}

      {unpinned.length > 0 && (
        <section>
          {pinned.length > 0 && <SectionTitle label="Others" />}
          <div className={gridClass}>
            {unpinned.map(n => <NoteCard key={n.id} note={n} />)}
          </div>
        </section>
      )}
    </>
  );
}
