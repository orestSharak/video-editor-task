import { Actions } from './Actions';
import { TimelineInfo } from './TimelineInfo';
import { ClipsReader } from './ClipsReader';
import { TimelineSlider } from './TimeLineSlider';
import { TimeRuler } from './TimeRuler';

export function Timeline() {
  return (
    <div className="w-full mb-4 flex-1 bg-muted pt-5 border-t px-6">
      <div className="flex justify-between items-center">
        <TimelineInfo />
        <Actions />
      </div>
      <div className="border rounded-2xl p-3 bg-white">
        <div className="pl-2">
          <TimelineSlider />
          <TimeRuler />
        </div>
        <ClipsReader />
      </div>
    </div>
  );
}
