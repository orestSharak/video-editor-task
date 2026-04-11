import { useVideoEditorStore } from '../../../store';

export function ClipsReader() {
  const { clips, playHeadPosition } = useVideoEditorStore();

  return (
    <div className="relative h-60 bg-background border rounded-lg mb-4">
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 ml-2"
        style={{ left: `${playHeadPosition}%` }}
      />
      <div className="h-60 overflow-scroll p-2">
        {clips.map((clip) => (
          <div
            tabIndex="0"
            key={clip.id}
            className="h-12 bg-primary/20 border border-primary/40 rounded flex items-center justify-center text-[14px] mb-1 hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            style={{ width: `${clip.duration}%` }}
          >
            {clip.name}
          </div>
        ))}
      </div>
    </div>
  );
}
