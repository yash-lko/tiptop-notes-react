
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NoteComposer from './components/NoteComposer';
import NotesGrid from './components/NotesGrid';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import FilterChip from './components/FilterChip';
import useUIStore from './store/useUIStore';
import { VIEWS } from './utils/constants';

export default function App() {
  const view = useUIStore(s => s.view);

  return (
    <div className="flex flex-col min-h-screen bg-surface-muted font-nunito">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 max-w-[1200px]">
          {view === VIEWS.NOTES && <NoteComposer />}
          <FilterChip />
          <NotesGrid />
        </main>
      </div>
      <EditModal />
      <Toast />
    </div>
  );
}
