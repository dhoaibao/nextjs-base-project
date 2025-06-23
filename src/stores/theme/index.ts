import { create } from 'zustand';
import { createJSONStorage, devtools, persist, StateStorage } from 'zustand/middleware';

type ThemeStore = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const mockStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const createThemeStore = () =>
  create<ThemeStore>()(
    devtools(
      persist(
        set => ({
          theme: 'dark',
          toggleTheme: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
        }),
        {
          name: 'theme-storage',
          storage: createJSONStorage(() =>
            typeof window !== 'undefined' ? localStorage : mockStorage
          ),
          partialize: state => ({
            theme: state.theme,
          }),
        }
      ),
      { enabled: process.env.NODE_ENV === 'development' }
    )
  );

const serverStore = createThemeStore();

let clientStore: ReturnType<typeof createThemeStore>;

export const useThemeStore = () => {
  if (typeof window === 'undefined') {
    return serverStore;
  }

  if (!clientStore) {
    clientStore = createThemeStore();
  }

  return clientStore;
};
