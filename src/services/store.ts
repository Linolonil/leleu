import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isIntroComplete: boolean;
  isBirthdayPopupOpen: boolean;
  quizScore: number;
  setIntroComplete: (value: boolean) => void;
  setBirthdayPopupOpen: (value: boolean) => void;
  setQuizScore: (score: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isIntroComplete: false,
      isBirthdayPopupOpen: false,
      quizScore: 0,
      setIntroComplete: (value) => set({ isIntroComplete: value }),
      setBirthdayPopupOpen: (value) => set({ isBirthdayPopupOpen: value }),
      setQuizScore: (score) => set({ quizScore: score }),
    }),
    {
      name: 'app-storage',
    }
  )
); 