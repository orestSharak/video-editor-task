import { Actions } from './Actions';
import { TimelineTrack } from './TimelineTrack';
import { ClipsReader } from './ClipsReader';
import { Card, CardContent } from '@/components';

export function Timeline() {
  return (
    <Card className="w-full bg-muted/30">
      <CardContent className="p-5">
        <Actions />
        <TimelineTrack />
        <ClipsReader />
      </CardContent>
    </Card>
  );
}
