import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,

            setToken: (token) => set({
                token,
                isAuthenticated: !!token
            }),

            setUser: (user) => set({ user }),

            logout: () => set({
                token: null,
                user: null,
                isAuthenticated: false
            }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
