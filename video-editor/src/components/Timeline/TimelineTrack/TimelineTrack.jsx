import { usePlayHeadPosition, useSetPlayHeadPosition } from '@/store';
import { Slider } from '@/components';

export function TimelineTrack() {
  const playHeadPosition = usePlayHeadPosition();
  const setPlayHeadPosition = useSetPlayHeadPosition();

  return (
    <div className="py-4">
      <Slider
        value={[playHeadPosition]}
        min={0}
        max={100}
        step={1}
        onValueChange={(vals) => setPlayHeadPosition(vals[0])}
        className="cursor-pointer"
      />
      <div className="text-xs text-muted-foreground mt-3">Position: {playHeadPosition}s</div>
    </div>
  );
}
