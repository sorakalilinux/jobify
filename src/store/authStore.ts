import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  userRole: 'professional' | 'contractor' | null;
  setIsAuthenticated: (value: boolean) => void;
  setUserRole: (role: 'professional' | 'contractor' | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  userRole: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUserRole: (role) => set({ userRole: role }),
  logout: () => set({ isAuthenticated: false, userRole: null }),
}));
