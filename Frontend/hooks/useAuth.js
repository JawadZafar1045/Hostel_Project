import { useState } from 'react';

/**
 * Custom hook for authentication state.
 * To be connected to auth store/API later.
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return {
    user,
    isLoading,
    setUser
  };
};

export default useAuth;
