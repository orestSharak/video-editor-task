import { useClips, usePlayHeadPosition } from '@/store';
import { Clip } from './Clip';

export function ClipsReader() {
  const clips = useClips();
  const playHeadPosition = usePlayHeadPosition();

  return (
    <div className="overflow-auto">
      <div className="relative h-80">
        <div className="absolute inset-y-0 left-2 right-2">
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none"
            style={{ left: `${playHeadPosition}%` }}
          />
          <div className="h-80 overflow-y-auto overflow-x-hidden p-2 relative">
            {clips.map((clip) => (
              <Clip key={clip.id} {...clip} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
