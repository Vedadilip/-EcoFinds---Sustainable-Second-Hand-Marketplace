
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { USERS } from '../constants';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    signup: (email: string, username: string, password: string) => boolean;
    updateUser: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => {
        try {
            const localUsers = localStorage.getItem('ecofinds_users');
            return localUsers ? JSON.parse(localUsers) : USERS;
        } catch (error) {
            return USERS;
        }
    });

    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('ecofinds_user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('ecofinds_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ecofinds_user');
        }
    }, [user]);

     useEffect(() => {
        localStorage.setItem('ecofinds_users', JSON.stringify(users));
    }, [users]);

    const login = (email: string, password: string): boolean => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const { password: _, ...userToStore } = foundUser;
            setUser(userToStore);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const signup = (email: string, username: string, password: string): boolean => {
        if (users.some(u => u.email === email)) {
            return false; // User already exists
        }
        const newUser: User = { id: `user-${Date.now()}`, email, username, password };
        setUsers(prevUsers => [...prevUsers, newUser]);
        const { password: _, ...userToStore } = newUser;
        setUser(userToStore);
        return true;
    };

    const updateUser = (updatedUser: User) => {
        if (user && user.id === updatedUser.id) {
            setUser(updatedUser);
            setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u));
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
