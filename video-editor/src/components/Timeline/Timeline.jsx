import { Actions } from './Actions';
import { TimelineTrack } from './TimelineTrack';
import { ClipsReader } from './ClipsReader';

export function Timeline() {
  return (
    <section className="w-full bg-muted/30 p-6 rounded-xl border">
      <Actions />
      <TimelineTrack />
      <ClipsReader />
    </section>
  );
}
