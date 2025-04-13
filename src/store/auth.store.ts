import { create } from "zustand";
import { createJSONStorage,persist } from "zustand/middleware";

interface User {
  username: string;
  name: string;
  surname: string;
  photo: {
    url: string;
    id: string;
  };
  token: string;
}

interface AuthState {
  user: User | null;
  login: (username: string, name: string, surname: string, photo?: { url: string; id: string }) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  updateProfile: (updates: Partial<Omit<User, "token">>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (username, name, surname, photo = { url: "", id: "" }) => {
        const token = Math.random().toString(36).substring(2);
        set({
          user: {
            username,
            name,
            surname,
            photo,
            token,
          },
        });
      },
      logout: () => {
        set({ user: null });
      },
      isAuthenticated: () => {
        return get().user !== null;
      },
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...updates,
            },
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
