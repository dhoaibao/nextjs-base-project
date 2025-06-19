import { create } from 'zustand';
import { createJSONStorage, persist, devtools, StateStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

const mockStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const createAuthStore = () =>
  create<AuthStore>()(
    devtools(
      persist(
        set => ({
          ...initialState,

          setUser: user => set({ user, isAuthenticated: !!user }),

          setError: error => set({ error }),

          setLoading: isLoading => set({ isLoading }),
        }),
        {
          name: 'auth-storage',
          storage: createJSONStorage(() =>
            typeof window !== 'undefined' ? sessionStorage : mockStorage
          ),
          partialize: state => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
          }),
        }
      ),
      { enabled: process.env.NODE_ENV === 'development' }
    )
  );

// For use in server components
export const authStore = createAuthStore();

// For use in client components
let clientStore: ReturnType<typeof createAuthStore>;

export function useAuthStore() {
  if (typeof window === 'undefined') {
    return authStore;
  }

  if (!clientStore) {
    clientStore = createAuthStore();
  }

  return clientStore;
}
