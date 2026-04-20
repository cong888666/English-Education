import { create } from 'zustand';

interface UserState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

interface CourseState {
  courses: any[];
  selectedCourse: any | null;
  isLoading: boolean;
  error: string | null;
  setCourses: (courses: any[]) => void;
  setSelectedCourse: (course: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

interface LearningState {
  progress: Record<string, number>;
  completedModules: string[];
  setProgress: (courseId: string, progress: number) => void;
  markModuleComplete: (moduleId: string) => void;
}

export const useLearningStore = create<LearningState>((set) => ({
  progress: {},
  completedModules: [],
  setProgress: (courseId, progress) => set((state) => ({
    progress: { ...state.progress, [courseId]: progress }
  })),
  markModuleComplete: (moduleId) => set((state) => ({
    completedModules: [...state.completedModules, moduleId]
  })),
}));