import { ReactNode } from 'react';

export interface UserProviderProps {
    children: ReactNode;
}

export interface IUserContext {
    userData: IUser | null;
    isAuthenticated: boolean;
    isLoggedIn: boolean;
    handleLoggedIn: (value: boolean) => void;
    handleAuthenticated: (value: boolean) => void;
}

export interface IUser {
    id: number;
    email: string;
    password: string;
    access_token: string;
}
