import { useVideoEditorStore } from '../../../store';
import { DEFAULT_CLIP_DURATION } from './constants';

export function Actions() {
  const { clips, playHeadPosition, addClip } = useVideoEditorStore();

  const handleAddClip = () => {
    addClip({
      id: `clip-${Date.now()}`,
      name: `Clip-${clips.length + 1}`,
      startTime: playHeadPosition,
      duration: DEFAULT_CLIP_DURATION,
    });
  };

  return (
    <div className="flex justify-between mb-6">
      <button
        onClick={() => console.log('split')}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
      >
        Split Clip
      </button>
      <button
        onClick={handleAddClip}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
      >
        Add Clip
      </button>
    </div>
  );
}
