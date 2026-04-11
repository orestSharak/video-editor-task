import { usePlayHeadPosition, useSetPlayHeadPosition } from '../../../store';

export function TimelineTrack() {
  const playHeadPosition = usePlayHeadPosition();
  const setPlayHeadPosition = useSetPlayHeadPosition();

  return (
    <div className="flex flex-col gap-3 mb-4">
      <input
        type="range"
        min="0"
        max="100"
        value={playHeadPosition}
        onChange={(e) => setPlayHeadPosition(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
      />
      <p className="text-xs text-muted-foreground mt-2">Position: {playHeadPosition}s</p>
    </div>
  );
}
