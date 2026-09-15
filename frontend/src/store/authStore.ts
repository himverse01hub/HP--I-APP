import { create } from 'zustand';

interface AuthState {
    token: string | null;
    user: any | null;
    login: (token: string, user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('hpoi_token'),
    user: null, // would fetch or decode from token ideally
    login: (token: string, user: any) => {
        localStorage.setItem('hpoi_token', token);
        set({ token, user });
    },
    logout: () => {
        localStorage.removeItem('hpoi_token');
        set({ token: null, user: null });
    },
}));
