import { create } from 'zustand';

export const useVideoEditorStore = create((set) => ({
    clips: [],
    playHeadPosition: 0,
    selectedClipId: null,

    setPlayHeadPosition: (position) => set({ playHeadPosition: position }),

    addClip: (clip) => set((state) => ({
        clips: [...state.clips, clip],
        selectedClipId: clip.id,
    })),
}))
