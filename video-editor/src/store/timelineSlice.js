import * as R from 'ramda';
import { MAX_TIMELINE_DURATION } from '@/constants';

export const createTimelineSlice = (set) => ({
  clips: [],
  playHeadPosition: 0,
  selectedClipId: null,

  setPlayHeadPosition: (position) => set({ playHeadPosition: position }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),

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
});
