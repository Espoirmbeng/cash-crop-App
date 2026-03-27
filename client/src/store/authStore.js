import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setTokens: (accessToken, refreshToken) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('agriculnet_access_token', accessToken);
          localStorage.setItem('agriculnet_refresh_token', refreshToken);
        }
        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      setUser: (user) => set({ user }),

      login: async (identifier, password, rememberMe = false) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', {
            identifier,
            password,
            rememberMe
          });
          const { accessToken, refreshToken, user } = data.data;
          get().setTokens(accessToken, refreshToken);
          set({ user, isLoading: false, isAuthenticated: true });
          return { success: true, data: data.data };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.message || 'Login failed',
            errorCode: error.response?.data?.error?.code
          };
        }
      },

      logout: async () => {
        try {
          const refreshToken = localStorage.getItem('agriculnet_refresh_token');
          if (refreshToken) {
            await api.post('/auth/logout', { refreshToken });
          }
        } finally {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('agriculnet_access_token');
            localStorage.removeItem('agriculnet_refresh_token');
          }
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false
          });
        }
      },

      fetchMe: async () => {
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.data.user, isAuthenticated: true });
          return { success: true, data: data.data };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch profile'
          };
        }
      },

      registerFarmer: async (farmerData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register/farmer', farmerData);
          set({ isLoading: false });
          return { success: true, data: data.data };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.message || 'Registration failed',
            errorCode: error.response?.data?.error?.code,
            details: error.response?.data?.error?.details
          };
        }
      },

      registerBuyer: async (buyerData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register/buyer', buyerData);
          set({ isLoading: false });
          return { success: true, data: data.data };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.message || 'Registration failed',
            errorCode: error.response?.data?.error?.code,
            details: error.response?.data?.error?.details
          };
        }
      },

      verifyPhone: async (userId, otp) => {
        try {
          const { data } = await api.post('/auth/verify-phone/confirm', {
            userId,
            otp
          });

          // If tokens are returned (buyer), store them
          if (data.data.accessToken && data.data.refreshToken) {
            get().setTokens(data.data.accessToken, data.data.refreshToken);
            set({ user: data.data.user, isAuthenticated: true });
          }

          return { success: true, data: data.data };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || 'Verification failed',
            errorCode: error.response?.data?.error?.code
          };
        }
      },

      sendOtp: async (userId) => {
        try {
          const { data } = await api.post('/auth/verify-phone/send', { userId });
          return { success: true, data: data.data };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || 'Failed to send OTP'
          };
        }
      },

      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('agriculnet_access_token');
          localStorage.removeItem('agriculnet_refresh_token');
        }
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'agriculnet-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, fetchMe, registerFarmer, registerBuyer, verifyPhone, sendOtp, clearAuth } = useAuthStore();

  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchMe,
    registerFarmer,
    registerBuyer,
    verifyPhone,
    sendOtp,
    clearAuth
  };
};

export default useAuthStore;
