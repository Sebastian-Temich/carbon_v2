import React, { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { logout, signIn, SignInRequest } from '@api/identity-api';
import { IUser } from '@custom-types/user-types';
import userStore from '@store/user-store';
import { ROUTES } from '@utils/routes';

interface AuthContextValues {
  logIn: (data: SignInRequest) => Promise<boolean>;
  logOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);
export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [_, setCurrentUser] = useLocalStorage<IUser | undefined>('currentUser', undefined);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoadingSession] = useState(false);
  const navigate = useNavigate();

  const logIn = async (signInData: SignInRequest): Promise<boolean> => {
    const response = await signIn(signInData);

    if (response) {
      setIsLoadingSession(true);
      await userStore.getUserData();

      const location = userStore.user?.roles[0].name.toLowerCase() || '/login';
      navigate(location);
      setIsLoadingSession(false);
      return true;
    }

    return false;
  };

  const logOut = async () => {
    await logout();
    setCurrentUser(undefined);
    setAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      logIn,
      logOut,
      isAuthenticated, // WORK IN PROGRESS
      setAuthenticated, // WORK IN PROGRESS
    }),
    [isAuthenticated],
  );

  if (isLoading) {
    return <ProgressSpinner className="progress-spinner" />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValues => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('Attempt to use authentication context outside its scope');
  return ctx;
};
