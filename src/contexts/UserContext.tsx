import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useGetMeQuery, GetMeQuery } from '../gql/graphql';

type User = GetMeQuery['getMe'];

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  // `useGetMeQuery` is only executed if the token exists
  const { data, loading, refetch } = useGetMeQuery({
    skip: !localStorage.getItem('authToken'), // Skip query if no token
    fetchPolicy: 'network-only', // Always fetch fresh data
  });

  // Handle user data when query completes
  useEffect(() => {
    if (data && data.getMe) {
      setUser(data.getMe);
    } else if (!loading) {
      setUser(null);
    }
    setIsFetching(loading); // Update fetching state
  }, [data, loading]);

  // Listen for changes to the `authToken` in localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken') {
        if (event.newValue) {
          refetch(); // Fetch user data when token is added
        } else {
          setUser(null); // Clear user when token is removed
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refetch]);

  // Provide a refetch function for manual user data updates
  const refetchUser = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsFetching(true);
      refetch()
        .catch((error) => {
          console.error('Error refetching user:', error);
          setUser(null);
        })
        .finally(() => setIsFetching(false));
    } else {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading: isFetching, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
