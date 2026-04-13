import { create } from 'zustand';
import { createTimelineSlice } from './timelineSlice';
import { createProjectSlice } from './projectSlice';
import { createHistorySlice } from './historySlice';

export const useVideoEditorStore = create((set, get) => ({
  ...createTimelineSlice(set, get),
  ...createProjectSlice(set, get),
  ...createHistorySlice(set, get),
}));

// SELECTORS

// Timeline & Clips
export const useClips = () => useVideoEditorStore((state) => state.clips);
export const usePlayHeadPosition = () => useVideoEditorStore((state) => state.playHeadPosition);
export const useSelectedClipId = () => useVideoEditorStore((state) => state.selectedClipId);
export const useSetPlayHeadPosition = () =>
  useVideoEditorStore((state) => state.setPlayHeadPosition);
export const useSetSelectedClipId = () => useVideoEditorStore((state) => state.setSelectedClipId);
export const useAddClip = () => useVideoEditorStore((state) => state.addClip);
export const useSplitClip = () => useVideoEditorStore((state) => state.splitClip);

// History
export const useUndo = () => useVideoEditorStore((state) => state.undo);
export const useRedo = () => useVideoEditorStore((state) => state.redo);
export const useCanUndo = () => useVideoEditorStore((state) => state.past?.length > 0);
export const useCanRedo = () => useVideoEditorStore((state) => state.future?.length > 0);

// Project API
export const useStatus = () => useVideoEditorStore((state) => state.status);
export const useError = () => useVideoEditorStore((state) => state.error);
export const useFetchProjects = () => useVideoEditorStore((state) => state.fetchProjects);
export const useSaveProject = () => useVideoEditorStore((state) => state.saveProject);
export const useDeleteProject = () => useVideoEditorStore((state) => state.deleteProject);
