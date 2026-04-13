import { create } from 'zustand';
import * as R from 'ramda';
import { DEFAULT_HISTORY_STEPS, MAX_TIMELINE_DURATION } from './constants';

export const useVideoEditorStore = create((set) => ({
  clips: [],
  playHeadPosition: 0,
  selectedClipId: null,
  past: [],
  future: [],

  setPlayHeadPosition: (position) => set({ playHeadPosition: position }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),

  saveToHistory: (state) => ({
    // pipe: Creates a left-to-right execution flow
    // append: Pushes the current state of clips to the end of the 'past' array
    // takeLast: Truncates the array to keep only the most recent N steps, preventing memory leaks
    past: R.pipe(R.append(state.clips), R.takeLast(DEFAULT_HISTORY_STEPS))(state.past),
    future: [],
  }),

  addClip: (clip) =>
    set((state) => {
      const history = state.saveToHistory(state);
      const nextTrack =
        state.clips.length > 0 ? Math.max(...state.clips.map((clip) => clip.track || 0)) + 1 : 0;

      const newClip = {
        ...clip,
        track: nextTrack,
      };

      const endTime = newClip.startTime + newClip.duration;

      if (endTime > MAX_TIMELINE_DURATION) {
        // Shortening clip to end with a timeline
        newClip.duration = MAX_TIMELINE_DURATION - newClip.startTime;
      }
      // Not adding clip if starting in the timeline end
      if (newClip.duration <= 0) return state;

      return {
        ...history,
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

      const history = state.saveToHistory(state);

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
        ...history,
        clips: newClips,
        selectedClipId: rightClip.id,
      };
    });
  },

  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state;
      // last: Safely extracts the very last element of the 'past' array
      const previousClips = R.last(state.past);
      // init: Returns a new array containing everything except the last element
      const newPast = R.init(state.past);

      return {
        past: newPast,
        clips: previousClips,
        // prepend: Inserts the current, 'to-be-undone' state at the very beginning of the 'future' array
        future: R.prepend(state.clips, state.future),
        selectedClipId: null,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      // head: Safely extracts the very first element of the 'future' array
      const nextClips = R.head(state.future);
      // tail: Returns a new array containing everything except the first element
      const newFuture = R.tail(state.future);

      return {
        // append: Pushes the current state back onto the end of the 'past' array
        past: R.append(state.clips, state.past),
        clips: nextClips,
        future: newFuture,
        selectedClipId: null,
      };
    }),
}));

export const useClips = () => useVideoEditorStore((state) => state.clips);
export const usePlayHeadPosition = () => useVideoEditorStore((state) => state.playHeadPosition);
export const useSelectedClipId = () => useVideoEditorStore((state) => state.selectedClipId);

export const useSetPlayHeadPosition = () =>
  useVideoEditorStore((state) => state.setPlayHeadPosition);
export const useSetSelectedClipId = () => useVideoEditorStore((state) => state.setSelectedClipId);
export const useAddClip = () => useVideoEditorStore((state) => state.addClip);
export const useSplitClip = () => useVideoEditorStore((state) => state.splitClip);
export const useUndo = () => useVideoEditorStore((state) => state.undo);
export const useRedo = () => useVideoEditorStore((state) => state.redo);
export const useCanUndo = () => useVideoEditorStore((state) => state.past?.length > 0);
export const useCanRedo = () => useVideoEditorStore((state) => state.future?.length > 0);
