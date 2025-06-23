import { create } from 'zustand';
import { createJSONStorage, persist, devtools, StateStorage } from 'zustand/middleware';

type ThemeStore = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const mockStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

// Create the store
const createThemeStore = () =>
  create<ThemeStore>()(
    devtools(
      persist(
        set => ({
          theme: 'light',
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

// Server store for SSR
const serverStore = createThemeStore();

// Client store
let clientStore: ReturnType<typeof createThemeStore>;

// Hook with proper SSR handling
export const useThemeStore = <T>(selector?: (state: ThemeStore) => T) => {
  // Server-side: return server store
  if (typeof window === 'undefined') {
    return selector ? selector(serverStore.getState()) : serverStore.getState();
  }

  // Client-side: initialize store once
  if (!clientStore) {
    clientStore = createThemeStore();
  }

  // Return selector result or hook call
  if (selector) {
    return clientStore(selector);
  }

  return clientStore();
};
