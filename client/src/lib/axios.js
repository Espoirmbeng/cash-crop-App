import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor — attach access token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('agriculnet_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — auto refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 &&
        error.response?.data?.error?.code === 'TOKEN_EXPIRED' &&
        !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem('agriculnet_refresh_token');
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/refresh-token`,
          { refreshToken }
        );
        localStorage.setItem('agriculnet_access_token', data.data.accessToken);
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem('agriculnet_access_token');
        localStorage.removeItem('agriculnet_refresh_token');
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Legacy mock function for compatibility during transition
export async function mockAuthRequest(payload, options = {}) {
  console.warn('mockAuthRequest is deprecated, use api directly');
  return { ok: true, payload };
}