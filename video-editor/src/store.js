import { create } from 'zustand';

export const useVideoEditorStore = create((set) => ({
  clips: [],
  playHeadPosition: 0,
  selectedClipId: null,

  setPlayHeadPosition: (position) => set({ playHeadPosition: position }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),

  addClip: (clip) =>
    set((state) => ({
      clips: [...state.clips, clip],
    })),
}));

export const useClips = () => useVideoEditorStore((state) => state.clips);
export const usePlayHeadPosition = () => useVideoEditorStore((state) => state.playHeadPosition);
export const useSelectedClipId = () => useVideoEditorStore((state) => state.selectedClipId);

export const useSetPlayHeadPosition = () =>
  useVideoEditorStore((state) => state.setPlayHeadPosition);
export const useSetSelectedClipId = () => useVideoEditorStore((state) => state.setSelectedClipId);
export const useAddClip = () => useVideoEditorStore((state) => state.addClip);
