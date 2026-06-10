'use client';

import {
  createContext,
  useActionState,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Authcontexttype, Role, User } from '../type';
import { apiClient } from '../lib/apiclient';

type LoginState = {
  error?: string;
  success?: boolean;
  user: User |null;
};

const Authcontext = createContext<Authcontexttype | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [loginState, loginAction, isLoginPending] = useActionState(
    async (
      prevState: LoginState,
      formData: FormData
    ): Promise<LoginState> => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        const data = (await apiClient.login(email, password)) as unknown as{
          user: User;
        };

        setUser(data.user);

        return {
          success: true,
          user: data.user,
        };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : 'Login failed',
          user: null,
        };
      }
    },
    {
      error: undefined,
      success: undefined,
      user: null,
    }
  );

  const logout = async () => {
    try {
      await apiClient.logout();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkPermission = (requiredRole: Role): boolean => {
  if (!user) return false;

  const roleHierarchy: Record<Role, number> = {
    [Role.ADMIN]: 1,
    [Role.USER]: 0,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
};

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await apiClient.getCurrentUser();
        setUser(userData || null);
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUser();
  }, []);

  return (
    <Authcontext.Provider
      value={{
        user,
        login: loginAction,
        logout,
        checkPermission,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
};