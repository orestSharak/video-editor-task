import {
  useAddClip,
  useClips,
  usePlayHeadPosition,
  useSelectedClipId,
  useSplitClip,
} from '@/store';
import { DEFAULT_CLIP_DURATION } from './constants';
import { Button } from '@/components';

export function Actions() {
  const clips = useClips();
  const playHeadPosition = usePlayHeadPosition();
  const selectedClipId = useSelectedClipId();
  const addClip = useAddClip();
  const splitClip = useSplitClip();

  const handleAddClip = () => {
    addClip({
      id: `clip-${Date.now()}`,
      name: `Clip-${clips.length + 1}`,
      startTime: playHeadPosition,
      duration: DEFAULT_CLIP_DURATION,
    });
  };

  return (
    <div className="flex gap-2 mb-6 justify-end">
      <Button onClick={splitClip} disabled={!selectedClipId} size="sm">
        Split Clip
      </Button>
      <Button onClick={handleAddClip} size="sm">
        Add Clip
      </Button>
    </div>
  );
}
