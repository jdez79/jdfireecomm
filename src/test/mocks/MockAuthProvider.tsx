import { ReactNode } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const mockAuthValue = {
    user: { uid: '123', email: 'test@example.com', displayName: 'Test User' },
    loading: false,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
  };

  return <AuthContext.Provider value={mockAuthValue}>{children}</AuthContext.Provider>;
};
