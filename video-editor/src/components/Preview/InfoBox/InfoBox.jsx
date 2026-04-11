import { useClips, usePlayHeadPosition } from '../../../store';

export function InfoBox() {
  const clips = useClips();
  const playHeadPosition = usePlayHeadPosition();

  const activeClips = clips.filter(
    (clip) =>
      playHeadPosition >= clip.startTime && playHeadPosition < clip.startTime + clip.duration,
  );

  return (
    <div className="h-80 w-80 bg-primary-foreground rounded-2xl flex flex-col items-start justify-start border-2 mb-2 p-4 overflow-auto">
      <p className="text-sm uppercase text-muted-foreground mb-2">
        {activeClips.length ? 'Currently Playing' : 'No Active Clips'}
      </p>
      {activeClips.length > 0 && (
        <div className="z-10 text-center flex flex-col gap-2">
          {activeClips.map((clip) => (
            <div
              key={`preview-${clip.id}`}
              className="bg-background/80 px-4 py-2 rounded shadow-sm border border-border"
            >
              <p className="font-semibold text-foreground">{clip.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
