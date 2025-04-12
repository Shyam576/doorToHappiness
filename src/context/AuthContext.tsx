// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { IUser } from '../models/user'; // Adjust path if necessary

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: IUser) => void; // Function to update state after API login
    logout: () => Promise<void>; // Function to call logout API and update state
    checkAuthStatus: () => Promise<void>; // Function to check /api/auth/me
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading initially

    const checkAuthStatus = useCallback(async () => {
         // Don't set loading to true here on every call, only initially
         // setIsLoading(true);
        try {
            const response = await fetch('/api/auth/me'); // Fetch from the 'me' endpoint
             const data = await response.json();

             if (response.ok && data.user) {
                setUser(data.user);
             } else {
                setUser(null);
             }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setUser(null); // Assume logged out on error
        } finally {
            setIsLoading(false); // Set loading to false after check completes
        }
    }, []);

    // Check auth status when the component mounts
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = (userData: IUser) => {
        // This is called *after* successful API login
        setUser(userData);
         setIsLoading(false); // Ensure loading is false after login set
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            // Call the logout API endpoint
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout API call failed:', error);
            // Still log out client-side even if API fails
        } finally {
            setUser(null); // Clear user state
            setIsLoading(false);
        }
    };

    const contextValue: AuthContextType = {
        user,
        isAuthenticated: !!user, // True if user object exists
        isLoading,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};