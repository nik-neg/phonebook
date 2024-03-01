import { createContext, useContext, useState } from 'react';
import { IUser, IUserContext, UserProviderProps } from './types';

const UserContext = createContext<IUserContext>({
    userData: null,
    isLoggedIn: false,
    isAuthenticated: false,
    handleLoggedIn: () => {},
    handleAuthenticated: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleLoggedIn = (value: boolean) => setIsLoggedIn(value);
    const handleAuthenticated = (value: boolean) => setIsAuthenticated(value);

    return (
        <UserContext.Provider
            value={{
                userData,
                isLoggedIn,
                isAuthenticated,
                handleLoggedIn,
                handleAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
