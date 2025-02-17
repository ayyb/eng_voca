import { create } from "zustand";

interface UserState {
  userId: string | null;
  userName: string;
  score: number;
  setUser: (id: string | null, name: string) => void;
  setScore: (score: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  userName: "Guest",
  score: 0,
  setUser: (id, name) => set({ userId: id, userName: name }),
  setScore: (score) => set({ score }),
}));
