import { useCanRedo, useCanUndo, useRedo, useUndo } from '../../store';

export function Header() {
  const undo = useUndo();
  const redo = useRedo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <header className="border-b py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Video Editor</h1>
      <div className="flex gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Redo
        </button>
      </div>
    </header>
  );
}
