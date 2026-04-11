import { create } from 'zustand';
import * as R from 'ramda';

export const useVideoEditorStore = create((set) => ({
  clips: [],
  playHeadPosition: 0,
  selectedClipId: null,

  setPlayHeadPosition: (position) => set({ playHeadPosition: position }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),

  addClip: (clip) =>
    set((state) => {
      const nextTrack =
        state.clips.length > 0 ? Math.max(...state.clips.map((clip) => clip.track || 0)) + 1 : 0;

      const newClip = {
        ...clip,
        track: nextTrack,
      };

      return {
        // Ramda append for immutability
        clips: R.append(newClip, state.clips),
      };
    }),

  splitClip: () => {
    set((state) => {
      // Check if clip is selected
      if (!state.selectedClipId) return state;

      // Find selected clip
      const targetClip = state.clips.find((clip) => clip.id === state.selectedClipId);
      if (!targetClip) return state;
      // Validate if clip could be split
      const isValid =
        state.playHeadPosition > targetClip.startTime &&
        state.playHeadPosition < targetClip.startTime + targetClip.duration;

      if (!isValid) {
        console.warn('Playhead is outside the selected clip boundaries.');
        return state;
      }

      const leftDuration = state.playHeadPosition - targetClip.startTime;
      const rightDuration = targetClip.duration - leftDuration;

      const leftClip = {
        ...targetClip,
        id: `${targetClip.id}-a`,
        duration: leftDuration,
        name: `${targetClip.name}-a`,
      };

      const rightClip = {
        ...targetClip,
        id: `${targetClip.id}-b`,
        duration: rightDuration,
        startTime: state.playHeadPosition,
        name: `${targetClip.name}-b`,
      };

      // Make flatMap but use Ramda chain
      const newClips = R.chain(
        (clip) => (clip.id === state.selectedClipId ? [leftClip, rightClip] : [clip]),
        state.clips,
      );

      return {
        clips: newClips,
        selectedClipId: rightClip.id,
      };
    });
  },
}));

export const useClips = () => useVideoEditorStore((state) => state.clips);
export const usePlayHeadPosition = () => useVideoEditorStore((state) => state.playHeadPosition);
export const useSelectedClipId = () => useVideoEditorStore((state) => state.selectedClipId);

export const useSetPlayHeadPosition = () =>
  useVideoEditorStore((state) => state.setPlayHeadPosition);
export const useSetSelectedClipId = () => useVideoEditorStore((state) => state.setSelectedClipId);
export const useAddClip = () => useVideoEditorStore((state) => state.addClip);
export const useSplitClip = () => useVideoEditorStore((state) => state.splitClip);
