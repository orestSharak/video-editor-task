import { useClips, useError, useFetchProjects, usePlayHeadPosition, useStatus } from '@/store';
import { Clip } from './Clip';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button, Spinner } from '@/components';

export function ClipsReader() {
  const clips = useClips();
  const playHeadPosition = usePlayHeadPosition();
  const fetchProjects = useFetchProjects();
  const status = useStatus();
  const error = useError();

  useEffect(() => {
    fetchProjects().catch((error) => {
      console.error(error);
    });
  }, [fetchProjects]);

  if (status === 'loading') {
    return (
      <div className="h-60 flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-60 flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-600 mb-2" />
        <p className="text-sm text-red-600 font-semibold">Failed to load</p>
        <Button onClick={() => fetchProjects()} className="mt-4" variant="destructive">
          Try again
        </Button>
      </div>
    );
  }

  if (clips.length === 0) {
    return (
      <div className="h-60 flex flex-col items-center justify-center">
        <p className="text-sm font-semibold">No clips found</p>
      </div>
    );
  }

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
