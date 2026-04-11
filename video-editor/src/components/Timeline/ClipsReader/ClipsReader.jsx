import {
  useClips,
  usePlayHeadPosition,
  useSelectedClipId,
  useSetSelectedClipId,
} from '../../../store';

export function ClipsReader() {
  const clips = useClips();
  const playHeadPosition = usePlayHeadPosition();
  const selectedClipId = useSelectedClipId();
  const setSelectedClipId = useSetSelectedClipId();

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedClipId(id);
    }
  };

  return (
    <div className="relative h-60 bg-background border rounded-lg mb-4">
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 ml-2 pointer-events-none"
        style={{ left: `${playHeadPosition}%` }}
      />
      <div className="h-60 overflow-y-auto overflow-x-hidden p-2 relative">
        {clips.map((clip, index) => {
          const { id, name, startTime, duration } = clip;
          const isSelected = selectedClipId === id;

          return (
            <div
              key={clip.id}
              tabIndex="0"
              onClick={() => setSelectedClipId(id)}
              // Accessibility: Allow selection via Keyboard (Space or Enter)
              onKeyDown={(e) => handleKeyDown(e, id)}
              className={`absolute h-12 rounded flex items-center justify-center text-sm cursor-pointer transition-all select-none ml-2
                ${
                  isSelected
                    ? 'bg-primary/40 border border-primary/40 hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-primary'
                    : 'bg-primary/20 border border-primary/40 hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-primary'
                }
              `}
              style={{
                left: `${startTime}%`,
                width: `${duration}%`,
                // 8px (base top padding) + index * 52px (48px clip height [h-12] + 4px gap)
                top: `${index * 52 + 8}px`,
              }}
            >
              <span className="truncate px-2">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
