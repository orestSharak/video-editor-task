import { useCanRedo, useCanUndo, useRedo, useUndo } from '@/store';
import { Button } from '@/components';

export function Header() {
  const undo = useUndo();
  const redo = useRedo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <header className="border-b py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Video Editor</h1>
      <div className="flex gap-2">
        <Button onClick={undo} disabled={!canUndo} size="sm">
          Undo
        </Button>
        <Button onClick={redo} disabled={!canRedo} size="sm">
          Redo
        </Button>
      </div>
    </header>
  );
}
