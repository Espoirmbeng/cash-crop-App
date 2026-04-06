import { useCallback } from 'react';
import useAuthStore from '@/store/authStore';

const useAuth = () => {
  const store = useAuthStore();

  const isAdmin = store.user?.role === 'admin' || store.user?.role === 'super_admin';
  const isFarmer = store.user?.role === 'farmer';
  const isBuyer = ['local_buyer', 'international_buyer'].includes(store.user?.role);
  const isLocalBuyer = store.user?.role === 'local_buyer';
  const isInternationalBuyer = store.user?.role === 'international_buyer';

  const redirectToDashboard = useCallback(() => {
    if (!store.user) return '/';

    if (store.user.status === 'pending_review') {
      return '/pending';
    }

    switch (store.user.role) {
      case 'admin':
      case 'super_admin':
        return '/admin/dashboard';
      case 'farmer':
        return '/farmer/dashboard';
      case 'local_buyer':
      case 'international_buyer':
        return '/buyer/dashboard';
      case 'field_agent':
        return '/agent/dashboard';
      default:
        return '/';
    }
  }, [store.user]);

  return {
    ...store,
    isAdmin,
    isFarmer,
    isBuyer,
    isLocalBuyer,
    isInternationalBuyer,
    redirectToDashboard
  };
};

export default useAuth;
